#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${1:-3000}"

# ── Kill anything on the given port ──────────────────────────────────
kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti "tcp:$port" 2>/dev/null || true)"
  if [ -n "$pids" ]; then
    echo "  ⚠ Port $port is in use by PID(s): $pids"
    kill $pids 2>/dev/null || true
    sleep 1
    # Force kill if still alive
    pids="$(lsof -ti "tcp:$port" 2>/dev/null || true)"
    if [ -n "$pids" ]; then
      echo "  ⚠ Force-killing stubborn process(es)..."
      kill -9 $pids 2>/dev/null || true
      sleep 1
    fi
    echo "  ✓ Port $port freed."
  fi
}

# ── Start the dev server ─────────────────────────────────────────────
echo "  CharacterForge Pro — starting on http://localhost:$PORT"
echo ""
kill_port "$PORT"

cd "$ROOT_DIR"
npm run dev -- --port "$PORT"
