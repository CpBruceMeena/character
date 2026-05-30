import { describe, it, expect, beforeEach } from "vitest";
import {
  getCachedLayer,
  setCachedLayer,
  clearLayerCache,
  getCacheStats,
  invalidateTemplateCache,
} from "../render-cache";

// Helper: create a minimal off-screen canvas for test entries
function makeCanvas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 10;
  c.height = 10;
  return c;
}

const TEST_STATE: Record<string, unknown> = {
  outfitColors: { primary: "#4A6FA5", accent: "#C0392B" },
};

describe("render-cache", () => {
  beforeEach(() => {
    clearLayerCache();
  });

  describe("basic get/set", () => {
    it("returns null for a cache miss", () => {
      const result = getCachedLayer(
        "test-template", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"],
      );
      expect(result).toBeNull();
    });

    it("returns a canvas for a cache hit", () => {
      const canvas = makeCanvas();
      setCachedLayer(
        "test-template", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas,
      );
      const result = getCachedLayer(
        "test-template", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"],
      );
      expect(result).not.toBeNull();
      expect(result!.width).toBe(10);
    });
  });

  describe("color hash sensitivity", () => {
    it("misses when a color zone value changes", () => {
      const canvas = makeCanvas();
      setCachedLayer(
        "test-template", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas,
      );

      const differentState: Record<string, unknown> = {
        outfitColors: { primary: "#FF0000", accent: "#C0392B" },
      };
      const result = getCachedLayer(
        "test-template", "layer-1", 100, 100, differentState, ["outfitColors.primary"], ["#000"],
      );
      expect(result).toBeNull();
    });

    it("misses when dimensions change", () => {
      const canvas = makeCanvas();
      setCachedLayer(
        "test-template", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas,
      );
      const result = getCachedLayer(
        "test-template", "layer-1", 200, 200, TEST_STATE, ["outfitColors.primary"], ["#000"],
      );
      expect(result).toBeNull();
    });
  });

  describe("stats", () => {
    it("reports hit/miss counts", () => {
      // Miss
      getCachedLayer("t", "l", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"]);

      // Hit
      const canvas = makeCanvas();
      setCachedLayer("t", "l", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas);
      getCachedLayer("t", "l", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"]);

      // Another miss (different dimensions)
      getCachedLayer("t", "l", 200, 200, TEST_STATE, ["outfitColors.primary"], ["#000"]);

      const stats = getCacheStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(2);
      expect(stats.hitRate).toBe(33); // 1/3 ≈ 33%
    });

    it("reports entry count", () => {
      const canvas = makeCanvas();
      setCachedLayer("t1", "l1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas);
      setCachedLayer("t1", "l2", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], canvas);

      const stats = getCacheStats();
      expect(stats.entryCount).toBe(2);
    });
  });

  describe("LRU eviction", () => {
    it("evicts oldest entries when cache exceeds max size", () => {
      // The cache maxes out at 32 entries. Fill it with 33.
      const state33: Record<string, unknown> = { outfitColors: { primary: "#4A6FA5" } };

      for (let i = 0; i < 32; i++) {
        const c = makeCanvas();
        // Each call uses a different color so it generates a unique cache key
        const color = `#${String((0x1000000 + i).toString(16)).slice(1)}`;
        setCachedLayer(
          "eviction", `layer-${i}`, 100, 100,
          { outfitColors: { primary: color } },
          ["outfitColors.primary"], ["#000"], c,
        );
      }

      // Cache should be full (32 entries)
      expect(getCacheStats().entryCount).toBe(32);

      // Add one more — triggers eviction
      const newCanvas = makeCanvas();
      setCachedLayer(
        "eviction", "new-layer", 100, 100, state33, ["outfitColors.primary"], ["#000"], newCanvas,
      );

      // Still 32 entries (one evicted)
      expect(getCacheStats().entryCount).toBe(32);
    });
  });

  describe("invalidation", () => {
    it("clears entries for a specific template", () => {
      const c1 = makeCanvas();
      const c2 = makeCanvas();
      setCachedLayer("template-a", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], c1);
      setCachedLayer("template-b", "layer-1", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], c2);

      expect(getCacheStats().entryCount).toBe(2);

      invalidateTemplateCache("template-a");
      expect(getCacheStats().entryCount).toBe(1);
    });
  });

  describe("clear", () => {
    it("resets all state", () => {
      const c = makeCanvas();
      setCachedLayer("t", "l", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"], c);
      getCachedLayer("t", "l", 100, 100, TEST_STATE, ["outfitColors.primary"], ["#000"]);

      clearLayerCache();

      const stats = getCacheStats();
      expect(stats.entryCount).toBe(0);
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
    });
  });
});
