"use client";

/**
 * Canvas rendering pipeline for CharacterForge Pro.
 *
 * Compositing order:
 *   1. Background (checker / solid / gradient)
 *   2. Each template layer in ascending zIndex, with color zones applied
 *      from the current character store state.
 *
 * ## Caching
 *
 * Individual layer renders are memoised via {@link getCachedLayer} /
 * {@link setCachedLayer} so that changing a single slider re-renders
 * only the layers whose colour zones reference the changed property.
 * Background and visibility checks are always fast-path (no cache).
 */

import type { TemplateDefinition } from "@/lib/templates/schema";
import { applyColorZones, layerConditionMet } from "@/lib/canvas/render-svg";
import {
  getCachedLayer,
  setCachedLayer,
} from "@/lib/canvas/render-cache";

/* ── SVG → Off-screen canvas ── */

/**
 * Render an SVG string to an off-screen `<canvas>` at the given dimensions.
 * Returns a promise that resolves once the SVG has been fully drawn.
 */
function renderSvgToCanvas(
  svgString: string,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Failed to get 2D context"));
      return;
    }

    const img = new Image();
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG failed to render"));
    };

    img.src = url;
  });
}

/* ── Layer visibility ── */

/**
 * Determine whether a layer should be rendered.
 *
 * If the layer ID exists in the accessory toggle map, the toggle value
 * controls visibility (checked first so toggles override everything).
 * Otherwise the layer's `defaultVisible` is used — this lets accessory
 * layers start hidden while body/face layers start visible.
 *
 * If the layer has an optional `condition` (expression / eye-size match),
 * the shared `layerConditionMet` utility checks it against the current state.
 */
function isLayerVisible(
  layerId: string,
  toggles: Record<string, boolean>,
  defaultVisible: boolean,
  condition?: { expression?: string[]; eyeSize?: { min?: number; max?: number } },
  state?: Record<string, unknown>,
): boolean {
  if (layerId in toggles) return toggles[layerId];
  if (!defaultVisible) return false;

  // hairStyle="bald" → hide the hair layer
  const hairStyle = state?.hairStyle as string | undefined;
  if (hairStyle === "bald" && (layerId === "hair" || layerId.startsWith("hair-"))) {
    return false;
  }

  if (condition && state) {
    return layerConditionMet(condition, state);
  }
  return true;
}

/* ── Render options ── */

export interface RenderCharacterOptions {
  /** The active template definition */
  template: TemplateDefinition;
  /** Current character store state */
  state: Record<string, unknown>;
  /** Output canvas width in physical pixels */
  width: number;
  /** Output canvas height in physical pixels */
  height: number;
}

/* ── Background drawing ── */

/**
 * Background types rendered behind the character.
 * `"none"` skips drawing entirely (leaves canvas transparent).
 */
export type BackgroundType = "checker" | "solid" | "gradient" | "none";

/** Options for drawing the background behind a character. */
export interface BackgroundDrawOptions {
  type: BackgroundType;
  /** Solid fill colour (for "solid" and secondary for "gradient") */
  color?: string;
  /** Secondary gradient colour (for "gradient") */
  secondaryColor?: string;
}

/**
 * Default colours used when the character state doesn't specify custom values.
 */
const DEFAULT_BACKGROUNDS: Record<string, BackgroundDrawOptions> = {
  checker: { type: "checker" as BackgroundType },
  solid: { type: "solid" as BackgroundType, color: "#ffffff" },
  gradient: {
    type: "gradient" as BackgroundType,
    color: "#fffbeb",
    secondaryColor: "#cffafe",
  },
  none: { type: "none" as BackgroundType },
};

/**
 * Resolve the effective background draw options from character state.
 * Falls back to sensible defaults for any missing values.
 */
export function resolveBackgroundOptions(
  state: Record<string, unknown>,
  mode?: string,
): BackgroundDrawOptions {
  const bgMode = (mode ?? state.backgroundMode ?? "checker") as BackgroundType;
  if (bgMode === "none") return { type: "none" };

  const bg = state.background as
    | { type?: string; color?: string; secondaryColor?: string }
    | undefined;

  const defaults = DEFAULT_BACKGROUNDS[bgMode] ?? DEFAULT_BACKGROUNDS.checker;

  return {
    type: bgMode,
    color: bg?.color ?? defaults.color,
    secondaryColor: bg?.secondaryColor ?? defaults.secondaryColor,
  };
}

/**
 * Draw a background pattern onto a canvas context using the provided options.
 */
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  options: BackgroundDrawOptions,
): void {
  switch (options.type) {
    case "checker": {
      const size = 12;
      ctx.fillStyle = "#f0ede8";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#e5e0da";
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          if ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 1) {
            ctx.fillRect(x, y, size, size);
          }
        }
      }
      break;
    }
    case "solid":
      ctx.fillStyle = options.color ?? "#ffffff";
      ctx.fillRect(0, 0, w, h);
      break;
    case "gradient": {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, options.color ?? "#fffbeb");
      grad.addColorStop(1, options.secondaryColor ?? "#cffafe");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case "none":
      // Leave canvas transparent — no-op for PNG exports
      break;
  }
}

/* ── Helper — draw a layer canvas with optional body transform ── */

/**
 * Compute a canvas transform (scaleX, scaleY) for a layer based on
 * the character's body properties (height, width, headSize).
 *
 * Returns `null` when the transform is identity (no change)
 * so callers can skip the save/restore overhead.
 */
function getLayerBodyTransform(
  layerId: string,
  layerName: string,
  state: Record<string, unknown>,
): { scaleX: number; scaleY: number } | null {
  const h = (state.height as number) ?? 55;
  const w = (state.width as number) ?? 50;
  const hs = (state.headSize as number) ?? 45;

  // Base scale: default values map to 1.0 (no change)
  const scaleY = 1 + (h - 55) * 0.01;
  const scaleX = 1 + (w - 50) * 0.01;

  // Head-adjacent layers get an additional headSize scale
  const isHeadLayer =
    layerId === "head" ||
    layerId.startsWith("head") ||
    layerName.toLowerCase().includes("head") ||
    layerId.includes("hair") ||
    layerId.includes("eye") ||
    layerId.includes("brow") ||
    layerId.includes("mouth") ||
    layerId.includes("face") ||
    layerId.includes("ear") ||
    layerId.includes("nose") ||
    layerId === "helmet" ||
    layerId === "kabuto" ||
    layerId === "menpo";

  const headScale = isHeadLayer ? 1 + (hs - 45) * 0.01 : 1;

  const totalScaleX = scaleX * headScale;
  const totalScaleY = scaleY * headScale;

  // Skip identity transform (no change — within tolerance)
  if (
    Math.abs(totalScaleX - 1) < 0.01 &&
    Math.abs(totalScaleY - 1) < 0.01
  ) {
    return null;
  }

  return { scaleX: totalScaleX, scaleY: totalScaleY };
}

/**
 * Draw a layer canvas onto the result canvas, optionally with a
 * body-proportion transform applied around the center.
 */
function drawLayerWithTransform(
  ctx: CanvasRenderingContext2D,
  layerCanvas: HTMLCanvasElement,
  canvasWidth: number,
  canvasHeight: number,
  transform: { scaleX: number; scaleY: number } | null,
): void {
  if (!transform) {
    ctx.drawImage(layerCanvas, 0, 0);
    return;
  }
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.scale(transform.scaleX, transform.scaleY);
  ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
  ctx.drawImage(layerCanvas, 0, 0);
  ctx.restore();
}

/* ── Main entry point ── */

/**
 * Render the full character (background + all visible layers with
 * colour zones applied) to an off-screen canvas.
 *
 * Each layer's rendered canvas is cached via its colour-zone state so
 * that subsequent renders with the same colour values skip SVG parsing,
 * DOMParser, XML serialisation, and Blob → Image → drawImage — they
 * jump straight to compositing the cached canvas onto the result.
 *
 * Returns a promise that resolves once every layer has been composited.
 */
export async function renderCharacter(
  options: RenderCharacterOptions,
): Promise<HTMLCanvasElement> {
  const { template, state, width, height } = options;

  // Gather accessory toggles from state
  const accessories = state.accessories as
    | { toggles?: Record<string, boolean> }
    | undefined;
  const toggles: Record<string, boolean> = accessories?.toggles ?? {};

  // Sort layers by zIndex (ascending = bottom first)
  const sortedLayers = [...template.layers].sort(
    (a, b) => a.zIndex - b.zIndex,
  );

  const result = document.createElement("canvas");
  result.width = width;
  result.height = height;
  const ctx = result.getContext("2d")!;

  // 1. Draw background (not cached — cheap path always)
  const bgOptions = resolveBackgroundOptions(state);
  drawBackground(ctx, width, height, bgOptions);

  // 2. Composite each visible layer
  for (const layer of sortedLayers) {
    if (
      !isLayerVisible(
        layer.id,
        toggles,
        layer.defaultVisible,
        layer.condition,
        state,
      )
    )
      continue;

    const propertyPaths = layer.colorZones.map((z) => z.propertyPath);
    const defaultColors = layer.colorZones.map((z) => z.defaultColor);

    // Fast-path: try cache first
    const cached = getCachedLayer(
      template.id,
      layer.id,
      width,
      height,
      state as Record<string, unknown>,
      propertyPaths,
      defaultColors,
    );

    const bodyTransform = getLayerBodyTransform(
      layer.id,
      layer.name,
      state,
    );

    if (cached) {
      drawLayerWithTransform(ctx, cached, width, height, bodyTransform);
      continue;
    }

    // Cold path: apply colour zones, render SVG to canvas, cache
    const modifiedSvg = applyColorZones(
      layer.inlineSvg,
      layer.colorZones,
      state,
    );

    try {
      const layerCanvas = await renderSvgToCanvas(modifiedSvg, width, height);

      setCachedLayer(
        template.id,
        layer.id,
        width,
        height,
        state as Record<string, unknown>,
        propertyPaths,
        defaultColors,
        layerCanvas,
      );

      drawLayerWithTransform(ctx, layerCanvas, width, height, bodyTransform);
    } catch {
      // Silently skip layers that fail to render
      console.warn(`[renderer] Failed to render layer "${layer.id}"`);
    }
  }

  return result;
}
