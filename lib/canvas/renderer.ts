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

import type { TemplateDefinition, ColorZone } from "@/lib/templates/schema";
import { resolveColor } from "@/lib/canvas/resolve-color";
import {
  getCachedLayer,
  setCachedLayer,
} from "@/lib/canvas/render-cache";

/* ── SVG colour-zone application ── */

/**
 * Parse an SVG string, find all `[data-colorzone]` elements, and apply
 * the corresponding colour from the character state.
 *
 * - For `<g>` elements: set the CSS `color` property (so `currentColor`
 *   strokes/fills on child elements inherit the zone colour).
 * - For all other elements: set the `fill` attribute.
 *
 * Returns the modified SVG as a string.
 */
function applyColorZones(
  svgString: string,
  colorZones: ColorZone[],
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  state: Record<string, any>,
): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const elements = doc.querySelectorAll("[data-colorzone]");
  const zoneMap = new Map(colorZones.map((z) => [z.selector, z]));

  elements.forEach((el) => {
    const zoneId = el.getAttribute("data-colorzone");
    if (!zoneId) return;

    const zone = zoneMap.get(zoneId);
    if (!zone) return;

    const color = resolveColor(
      state as Record<string, unknown>,
      zone.propertyPath,
      zone.defaultColor,
    );

    if (el.tagName.toLowerCase() === "g") {
      // Groups use CSS color so `currentColor` on child elements inherits
      (el as SVGElement).style.setProperty("color", color);
    } else {
      el.setAttribute("fill", color);
    }
  });

  return new XMLSerializer().serializeToString(doc.documentElement);
}

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
 * Determine whether a layer should be rendered based on the current
 * accessory toggle state. A layer is hidden when its `id` matches a
 * toggle that is explicitly `false`.
 */
function isLayerVisible(
  layerId: string | undefined,
  toggles: Record<string, boolean>,
): boolean {
  if (!layerId) return true;
  const val = toggles[layerId];
  // Only hide if the toggle is explicitly false (undefined = not toggled = visible)
  return val !== false;
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
 */
export type BackgroundType = "checker" | "solid" | "gradient";

/**
 * Draw a background pattern onto a canvas context.
 */
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  type: BackgroundType,
): void {
  switch (type) {
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
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      break;
    case "gradient": {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#fffbeb");
      grad.addColorStop(1, "#cffafe");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      break;
    }
  }
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
  const bgMode = (state.backgroundMode ?? "checker") as BackgroundType;
  drawBackground(ctx, width, height, bgMode);

  // 2. Composite each visible layer
  for (const layer of sortedLayers) {
    if (!isLayerVisible(layer.id, toggles)) continue;

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

    if (cached) {
      ctx.drawImage(cached, 0, 0);
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

      ctx.drawImage(layerCanvas, 0, 0);
    } catch {
      // Silently skip layers that fail to render
      console.warn(`[renderer] Failed to render layer "${layer.id}"`);
    }
  }

  return result;
}
