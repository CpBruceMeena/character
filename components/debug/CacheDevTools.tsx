"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import {
  getCacheStats,
  clearLayerCache,
  subscribeStats,
  getStatsVersion,
  type CacheStats,
} from "@/lib/canvas/render-cache";

/* ── Helpers ── */

function formatAge(ms: number): string {
  if (ms < 1_000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1_000).toFixed(1)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function truncatedKey(key: string, max = 60): string {
  if (key.length <= max) return key;
  return key.slice(0, max - 3) + "...";
}

/* ── Hit-rate colour ── */

function hitRateColor(rate: number): string {
  if (rate >= 80) return "text-emerald-400";
  if (rate >= 50) return "text-amber-400";
  return "text-red-400";
}

function hitRateBar(rate: number): string {
  if (rate >= 80) return "bg-emerald-500";
  if (rate >= 50) return "bg-amber-500";
  return "bg-red-500";
}

/* ── Component ── */

export function CacheDevTools() {
  const [isOpen, setIsOpen] = useState(false);

  // Re-read stats whenever the version bumps (i.e. after a cache operation)
  useSyncExternalStore(subscribeStats, getStatsVersion, getStatsVersion);

  const stats: CacheStats = getCacheStats();

  const handleClear = useCallback(() => {
    clearLayerCache();
  }, []);

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleEntry = useCallback((key: string) => {
    setExpanded((prev) => (prev === key ? null : key));
  }, []);

  /* ── Collapsed badge ── */

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group absolute bottom-2 right-2 z-50 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-[11px] leading-none text-white/70 shadow-lg backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
        title="Open render cache DevTools"
      >
        <span className="font-mono text-[10px] tracking-tight">🧪</span>
        <span className="font-medium">Cache</span>
        <span className="ml-1 rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] tabular-nums">
          {stats.entryCount}/{stats.maxSize}
        </span>
        <span
          className={`ml-0.5 font-mono text-[10px] tabular-nums ${hitRateColor(stats.hitRate)}`}
        >
          {stats.hitRate}%
        </span>
      </button>
    );
  }

  /* ── Expanded panel ── */

  return (
    <div className="absolute bottom-2 right-2 z-50 w-80 overflow-hidden rounded-xl border border-white/10 bg-black/85 text-[11px] leading-normal text-white shadow-2xl backdrop-blur-xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="flex items-center gap-1.5 font-semibold text-white/90">
          <span className="text-[13px]">🧪</span>
          Render Cache
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClear}
            className="rounded-md px-2 py-1 text-[10px] font-medium text-red-400/80 transition-colors hover:bg-white/10 hover:text-red-400"
          >
            Clear
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-5 w-5 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="space-y-1.5 border-b border-white/10 px-3 py-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/50">Hit rate</span>
          <span
            className={`font-mono text-xs font-bold tabular-nums ${hitRateColor(stats.hitRate)}`}
          >
            {stats.hitRate}%
          </span>
        </div>
        {/* Bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${hitRateBar(stats.hitRate)}`}
            style={{ width: `${stats.hitRate}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px]">
          <span className="text-white/50">
            Hits <span className="font-mono text-white/80">{stats.hits}</span>
          </span>
          <span className="text-white/50">
            Misses{" "}
            <span className="font-mono text-white/80">{stats.misses}</span>
          </span>
          <span className="text-white/50">
            Entries{" "}
            <span className="font-mono text-white/80">
              {stats.entryCount}
              <span className="text-white/40">/{stats.maxSize}</span>
            </span>
          </span>
        </div>
      </div>

      {/* ── Entry list ── */}
      <div className="max-h-64 overflow-y-auto">
        {stats.entries.length === 0 ? (
          <div className="px-3 py-4 text-center text-[11px] text-white/30">
            No cached entries yet
          </div>
        ) : (
          stats.entries.map((entry) => {
            const isEntryOpen = expanded === entry.rawKey;
            return (
              <div key={entry.rawKey}>
                <button
                  onClick={() => toggleEntry(entry.rawKey)}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors hover:bg-white/5"
                >
                  <span className="shrink-0 font-mono text-[10px] text-white/30">
                    {isEntryOpen ? "▾" : "▸"}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-white/70">
                    {entry.layerId}
                  </span>
                  <span className="shrink-0 text-[10px] text-white/30">
                    {entry.dimensions}
                  </span>
                  <span className="shrink-0 text-[10px] text-white/30">
                    {formatAge(entry.age)}
                  </span>
                </button>

                {isEntryOpen && (
                  <div className="border-t border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-[10px] leading-relaxed text-white/40">
                    <div>
                      <span className="text-white/30">template: </span>
                      {entry.templateId}
                    </div>
                    <div>
                      <span className="text-white/30">dimensions: </span>
                      {entry.dimensions}
                    </div>
                    <div>
                      <span className="text-white/30">layer: </span>
                      {entry.layerId}
                    </div>
                    <div className="break-all">
                      <span className="text-white/30">colorHash: </span>
                      {entry.colorHash || <span className="italic">(none)</span>}
                    </div>
                    <div className="mt-1 break-all text-white/20">
                      {truncatedKey(entry.rawKey, 100)}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Footer note ── */}
      <div className="border-t border-white/5 px-3 py-1.5 text-[10px] text-white/20">
        Stats reset on template switch
      </div>
    </div>
  );
}
