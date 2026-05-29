#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEFAULT_PORT=3000
PIDFILE="/tmp/cforge-dev.pid"

# ── Print usage ──────────────────────────────────────────────────────
usage() {
  echo "Usage: $0 {start|stop|restart} [port]" >&2
  echo "  start   — Launch the dev server (default command)" >&2
  echo "  stop    — Stop the running dev server" >&2
  echo "  restart — Stop then start the dev server" >&2
  echo "  port    — Optional; defaults to $DEFAULT_PORT" >&2
  exit 1
}

# ── Check if the port is in use ──────────────────────────────────────
is_port_in_use() {
  local port="$1"
  if command -v lsof &>/dev/null; then
    lsof -ti "tcp:$port" &>/dev/null
    return $?
  elif command -v ss &>/dev/null; then
    ss -tlnp "sport = :$port" 2>/dev/null | grep -q LISTEN
    return $?
  else
    # fallback: try a quick TCP bind check via /dev/tcp (bash builtin)
    timeout 1 bash -c "echo >/dev/tcp/127.0.0.1/$port" 2>/dev/null
    return $?
  fi
}

# ── Find the next free port (scanning upward) ────────────────────────
find_free_port() {
  local port="$1"
  while is_port_in_use "$port"; do
    echo "  ⚠ Port $port is in use, trying $((port + 1))..." >&2
    port=$((port + 1))
  done
  echo "$port"
}

# ── Stop the dev server ──────────────────────────────────────────────
stop_server() {
  local pid
  if [ -f "$PIDFILE" ]; then
    pid="$(cat "$PIDFILE")"
    if kill "$pid" 2>/dev/null; then
      echo "  ✓ Dev server (PID $pid) stopped."
    else
      echo "  ⚠ No process with PID $pid found (stale PID file)."
    fi
    rm -f "$PIDFILE"
  else
    echo "  ⚠ No PID file found ($PIDFILE)."
  fi

  # Also kill any process on the given port (cleanup)
  local port="${1:-}"
  if [ -n "$port" ] && is_port_in_use "$port"; then
    local stale_pid
    stale_pid="$(lsof -ti "tcp:$port" 2>/dev/null || true)"
    if [ -n "$stale_pid" ]; then
      kill "$stale_pid" 2>/dev/null || true
      echo "  ✓ Freed port $port (was held by PID $stale_pid)."
    fi
  fi
}

# ── Start the dev server ─────────────────────────────────────────────
start_server() {
  local port="$1"

  # If something is already listening, free it first
  if is_port_in_use "$port"; then
    stop_server "$port"
    sleep 1
  fi

  local free_port
  free_port="$(find_free_port "$port")"

  if [ "$free_port" != "$port" ]; then
    echo ""
    echo "  Default port $port was taken — using port $free_port instead."
    echo ""
  fi

  cd "$ROOT_DIR"

  echo "  Starting CharacterForge Pro dev server on http://localhost:$free_port"
  echo ""

  pnpm dev --port "$free_port" &

  local pid=$!
  echo "$pid" > "$PIDFILE"

  # Wait a moment then confirm it started
  sleep 3
  if kill -0 "$pid" 2>/dev/null; then
    echo "  ✓ Dev server running (PID $pid)."
  else
    echo "  ✗ Dev server failed to start — check the logs above." >&2
    rm -f "$PIDFILE"
    exit 1
  fi
}

# ── Main ──────────────────────────────────────────────────────────────
COMMAND="${1:-start}"
PORT="$DEFAULT_PORT"

case "$COMMAND" in
  start|--start|stop|--stop|restart|--restart)
    shift 2>/dev/null || true
    PORT="${1:-$DEFAULT_PORT}"
    ;;
  *)
    # Backward compatibility: bare number → treat as port for start
    if [[ "$COMMAND" =~ ^[0-9]+$ ]]; then
      PORT="$COMMAND"
      COMMAND="start"
    else
      usage
    fi
    ;;
esac

case "$COMMAND" in
  start|--start)
    start_server "$PORT"
    ;;
  stop|--stop)
    stop_server "$PORT"
    ;;
  restart|--restart)
    stop_server "$PORT"
    sleep 1
    start_server "$PORT"
    ;;
esac
