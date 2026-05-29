"use client";

/**
 * Layer-level render cache — memoises the off-screen canvas for each
 * template layer so that changing a single slider only re-renders the
 * layers whose colour zones reference the changed property, instead of
 * recompositing all SVG layers from scratch.
 *
 * ## Cache key
 *
 *   `${templateId}::${w}x${h}::${layerId}::${colorHash}`
 *
 * where `colorHash` is a deterministic string built from the resolved
 * colour values of the layer's colour zones.  Two renders that produce
 * the same colour on every zone of a layer share one cache entry.
 *
 * ## LRU eviction
 *
 * The cache is capped at 32 entries.  When full, the least-recently-
 * accessed entry is evicted.  This keeps memory bounded even on long
 * editing sessions with many template / size / colour combinations.
 *
 * ## DevTools
 *
 * Hit/miss counters and per-entry details are exposed via
 * {@link getCacheStats} for the CacheDevTools panel.
 * The stats version + listener pattern lets React components
 * observe cache mutations without polling.
 */

type StatsListener = () => void;

let statsVersion = 0;
const statsListeners = new Set<StatsListener>();

function bumpStatsVersion() {
  statsVersion++;
  statsListeners.forEach((fn) => fn());
}

/** @internal Subscribe to cache stats changes (used by CacheDevTools) */
export function subscribeStats(callback: StatsListener): () => void {
  statsListeners.add(callback);
  return () => statsListeners.delete(callback);
}

/** @internal Snapshot of the current stats version */
export function getStatsVersion(): number {
  return statsVersion;
}

import { resolveColor } from "@/lib/canvas/resolve-color";

/* ── Cache event types (for live indicator) ── */

export type CacheEventType = "hit" | "miss";

export interface CacheEvent {
  type: CacheEventType;
  timestamp: number;
  layerId: string;
}

type EventListener = (event: CacheEvent) => void;

const eventListeners = new Set<EventListener>();
let lastEvent: CacheEvent | null = null;

/** @internal Subscribe to cache hit/miss events for the live indicator */
export function subscribeCacheEvent(callback: EventListener): () => void {
  eventListeners.add(callback);
  return () => eventListeners.delete(callback);
}

/** @internal Get the most recent cache event (or null) */
export function getLastCacheEvent(): CacheEvent | null {
  return lastEvent;
}

/** Fire a cache event to all listeners */
function fireCacheEvent(type: CacheEventType, layerId: string) {
  const event: CacheEvent = { type, timestamp: Date.now(), layerId };
  lastEvent = event;
  eventListeners.forEach((fn) => fn(event));
}

/* ── Types ── */

interface CacheEntry {
  /** The rendered off-screen canvas for this layer + colour hash */
  canvas: HTMLCanvasElement;
  /** Timestamp of the most recent cache hit (for LRU eviction) */
  lastAccessed: number;
}

/** Parsed info about a single cache entry, exposed via DevTools */
export interface CacheEntryInfo {
  rawKey: string;
  templateId: string;
  layerId: string;
  dimensions: string;
  colorHash: string;
  lastAccessed: number;
  age: number;
}

/** Snapshot of cache state for the DevTools panel */
export interface CacheStats {
  hits: number;
  misses: number;
  entryCount: number;
  maxSize: number;
  hitRate: number; // 0–100 percentage
  entries: CacheEntryInfo[];
}

/* ── Constants ── */

const MAX_CACHE_SIZE = 32;

/* ── State ── */

const layerCache = new Map<string, CacheEntry>();
let hitCounter = 0;
let missCounter = 0;

/* ── Helpers ── */

/**
 * Build a deterministic colour-hash string for a layer's colour zones
 * given the current character state.  Two identical hashes mean the
 * layer would render identically.
 */
function computeColorHash(
  state: Record<string, unknown>,
  propertyPaths: string[],
  defaultColors: string[],
): string {
  return propertyPaths
    .map((path, i) => resolveColor(state, path, defaultColors[i] ?? "#000000"))
    .join("|");
}

/**
 * Parse a cache key into its constituent parts.
 */
function parseCacheKey(key: string): Omit<CacheEntryInfo, "lastAccessed" | "age"> {
  const parts = key.split("::");
  const templateId = parts[0] ?? "";
  const dimensions = parts[1] ?? "";
  const layerId = parts[2] ?? "";
  const colorHash = parts.slice(3).join("::");
  return { rawKey: key, templateId, layerId, dimensions, colorHash };
}

/* ── Eviction ── */

function evictLru(): void {
  if (layerCache.size < MAX_CACHE_SIZE) return;

  let oldestKey = "";
  let oldestTime = Infinity;
  for (const [key, entry] of layerCache) {
    if (entry.lastAccessed < oldestTime) {
      oldestTime = entry.lastAccessed;
      oldestKey = key;
    }
  }
  if (oldestKey) layerCache.delete(oldestKey);
}

/* ── Throttled version bump for live stats ── */

let bumpRafId: number | null = null;

/**
 * Schedule a stats version bump on the next animation frame.
 * Throttles rapid successive calls (e.g. during slider dragging)
 * into a single React re-render.
 */
function bumpStatsVersionThrottled() {
  if (bumpRafId !== null) return;
  bumpRafId = requestAnimationFrame(() => {
    bumpRafId = null;
    bumpStatsVersion();
  });
}

/* ── Public API ── */

/**
 * Try to retrieve a cached off-screen canvas for a layer.
 * Returns `null` on cache miss (layer must be rendered fresh).
 */
export function getCachedLayer(
  templateId: string,
  layerId: string,
  width: number,
  height: number,
  state: Record<string, unknown>,
  propertyPaths: string[],
  defaultColors: string[],
): HTMLCanvasElement | null {
  const colorHash = computeColorHash(state, propertyPaths, defaultColors);
  const key = `${templateId}::${width}x${height}::${layerId}::${colorHash}`;
  const entry = layerCache.get(key);
  if (entry) {
    hitCounter++;
    entry.lastAccessed = Date.now();
    bumpStatsVersionThrottled();
    fireCacheEvent("hit", layerId);
    return entry.canvas;
  }
  missCounter++;
  fireCacheEvent("miss", layerId);
  return null;
}

/**
 * Store a rendered off-screen canvas in the cache so subsequent renders
 * with the same colour state can skip the SVG → canvas pipeline.
 */
export function setCachedLayer(
  templateId: string,
  layerId: string,
  width: number,
  height: number,
  state: Record<string, unknown>,
  propertyPaths: string[],
  defaultColors: string[],
  canvas: HTMLCanvasElement,
): void {
  evictLru();

  const colorHash = computeColorHash(state, propertyPaths, defaultColors);
  const key = `${templateId}::${width}x${height}::${layerId}::${colorHash}`;
  layerCache.set(key, { canvas, lastAccessed: Date.now() });
  bumpStatsVersionThrottled();
}

/**
 * Clear the entire layer cache — used when switching templates or
 * when the rendering pipeline needs a full reset.
 * Also resets hit/miss counters so stats reflect the current session.
 * Notifies DevTools listeners so the UI updates reactively.
 */
export function clearLayerCache(): void {
  layerCache.clear();
  hitCounter = 0;
  missCounter = 0;
  bumpStatsVersion();
}

/**
 * Invalidate all cache entries for a given template (e.g. when the
 * template definition itself changes at runtime).
 */
export function invalidateTemplateCache(templateId: string): void {
  const prefix = `${templateId}::`;
  for (const key of layerCache.keys()) {
    if (key.startsWith(prefix)) layerCache.delete(key);
  }
}

/**
 * Return a snapshot of the current cache state for the DevTools panel.
 */
export function getCacheStats(): CacheStats {
  const now = Date.now();
  const total = hitCounter + missCounter;
  const entries: CacheEntryInfo[] = [];

  for (const [key, entry] of layerCache) {
    const parsed = parseCacheKey(key);
    entries.push({
      ...parsed,
      lastAccessed: entry.lastAccessed,
      age: now - entry.lastAccessed,
    });
  }

  // Sort by last accessed (most recent first)
  entries.sort((a, b) => b.lastAccessed - a.lastAccessed);

  return {
    hits: hitCounter,
    misses: missCounter,
    entryCount: layerCache.size,
    maxSize: MAX_CACHE_SIZE,
    hitRate: total > 0 ? Math.round((hitCounter / total) * 100) : 0,
    entries,
  };
}
