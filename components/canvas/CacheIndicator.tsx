"use client";

import { useState, useEffect } from "react";
import { subscribeCacheEvent, type CacheEvent } from "@/lib/canvas/render-cache";

/* ── Colour palette ── */

const HIT_COLOR = "#22c55e"; // emerald-500
const MISS_COLOR = "#ef4444"; // red-500

/* ── Helpers ── */

/** Convert "eyebrows" or "armor-primary" to "Eyebrows" / "Armor Primary" */
function prettyLayerId(id: string): string {
  return id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── CSS keyframes (injected once) ── */

const KEYFRAMES_ID = "cforge-cache-indicator-keyframes";

if (typeof document !== "undefined" && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes cforge-cache-pulse {
      0%   { opacity: 1; transform: scale(1); }
      15%  { opacity: 1; transform: scale(1.02); }
      100% { opacity: 0; transform: scale(1); }
    }

    @keyframes cforge-label-fade {
      0%   { opacity: 1; transform: translateY(0); }
      20%  { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(style);
}

/* ── Component ── */

export function CacheIndicator() {
  // Track the *latest* cache event by incrementing a counter each time.
  // useSyncExternalStore would give us the event directly, but we want
  // to restart the CSS animation on every new event (different key).
  const [eventKey, setEventKey] = useState(0);
  const [pendingEvent, setPendingEvent] = useState<CacheEvent | null>(null);

  // Subscribe to real-time cache events (not throttled like stats)
  useEffect(() => {
    const unsub = subscribeCacheEvent((evt) => {
      setPendingEvent(evt);
      setEventKey((k) => k + 1);
    });
    return unsub;
  }, []);

  if (!pendingEvent) return null;

  const isHit = pendingEvent.type === "hit";
  const color = isHit ? HIT_COLOR : MISS_COLOR;
  const label = isHit ? "HIT" : "MISS";
  const layerName = prettyLayerId(pendingEvent.layerId);

  return (
    <div
      key={eventKey}
      className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[16px]"
      onAnimationEnd={() => setPendingEvent(null)}
      style={{
        border: `2px solid ${color}`,
        boxShadow: `inset 0 0 12px ${color}44, 0 0 12px ${color}44`,
        animation: "cforge-cache-pulse 700ms ease-out forwards",
      }}
    >
      <div
        style={{
          animation: "cforge-label-fade 700ms ease-out forwards",
          background: `${color}22`,
          border: `1px solid ${color}66`,
          borderRadius: "8px",
          padding: "4px 12px",
          fontSize: "13px",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontWeight: 600,
          color,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
        <span>{label}</span>
        <span
          style={{
            opacity: 0.6,
            fontWeight: 400,
          }}
        >
          {layerName}
        </span>
      </div>
    </div>
  );
}
