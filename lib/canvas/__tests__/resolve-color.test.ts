import { describe, it, expect } from "vitest";
import { resolveColor } from "../resolve-color";

describe("resolveColor", () => {
  const state: Record<string, unknown> = {
    skinTone: "#D4A574",
    outfitColors: {
      primary: "#4A6FA5",
      secondary: "#D4A574",
      accent: "#C0392B",
    },
    hairColor: "#3D2314",
    background: {
      type: "solid",
      color: "#f0ede8",
    },
  };

  it("resolves a top-level property", () => {
    expect(resolveColor(state, "skinTone", "#000000")).toBe("#D4A574");
  });

  it("resolves a nested dot-path property", () => {
    expect(resolveColor(state, "outfitColors.primary", "#000000")).toBe("#4A6FA5");
    expect(resolveColor(state, "outfitColors.accent", "#000000")).toBe("#C0392B");
  });

  it("returns default for missing property", () => {
    expect(resolveColor(state, "outfitColors.nonexistent", "#FF0000")).toBe("#FF0000");
  });

  it("returns default for missing top-level property", () => {
    expect(resolveColor(state, "eyeColor", "#00FF00")).toBe("#00FF00");
  });

  it("returns default when the resolved value is not a hex string", () => {
    const badState: Record<string, unknown> = {
      outfitColors: { primary: "red" },
    };
    expect(resolveColor(badState, "outfitColors.primary", "#000000")).toBe("#000000");
  });

  it("returns default when intermediate value is null", () => {
    const nullState: Record<string, unknown> = {
      outfitColors: null,
    };
    expect(resolveColor(nullState, "outfitColors.primary", "#000000")).toBe("#000000");
  });

  it("returns default when state is empty", () => {
    expect(resolveColor({}, "any.path", "#123456")).toBe("#123456");
  });

  it("resolves deeply nested properties", () => {
    const deepState: Record<string, unknown> = {
      a: { b: { c: "#ABCDEF" } },
    };
    expect(resolveColor(deepState, "a.b.c", "#000000")).toBe("#ABCDEF");
  });
});
