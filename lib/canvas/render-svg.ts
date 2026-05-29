"use client";

import type { ColorZone, LayerCondition, TemplateDefinition } from "@/lib/templates/schema";
import { resolveColor } from "@/lib/canvas/resolve-color";

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
export function applyColorZones(
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

/**
 * Check whether a layer condition is satisfied by the current character state.
 * Returns `true` if there's no condition (unconditional layer).
 *
 * Exported so the canvas renderer can use the same logic.
 */
export function layerConditionMet(
  condition: LayerCondition | undefined,
  state: Record<string, unknown>,
): boolean {
  if (!condition) return true;

  const currentExpression = state.expression as string | undefined;
  const currentEyeSize = state.eyeSize as number | undefined;

  if (condition.expression && currentExpression) {
    if (!condition.expression.includes(currentExpression)) return false;
  }

  if (condition.eyeSize && currentEyeSize !== undefined) {
    if (
      condition.eyeSize.min !== undefined &&
      currentEyeSize < condition.eyeSize.min
    ) {
      return false;
    }
    if (
      condition.eyeSize.max !== undefined &&
      currentEyeSize >= condition.eyeSize.max
    ) {
      return false;
    }
  }

  return true;
}

/* ── Layer compositing for inline SVG rendering ── */

/**
 * Take a template's layers, apply color zones from the given state,
 * strip outer `<svg>` wrappers, and produce a single composite SVG string.
 *
 * Used by the gallery for inline character previews (no canvas needed).
 */
export function composeCharacterSvg(
  template: TemplateDefinition,
  state: Record<string, unknown>,
): string {
  const visibleLayers = template.layers
    .filter((l) => l.defaultVisible && layerConditionMet(l.condition, state))
    .sort((a, b) => a.zIndex - b.zIndex);

  const innerMarkup = visibleLayers
    .map((layer) => {
      const colored = applyColorZones(layer.inlineSvg, layer.colorZones, state);
      // Strip the outer <svg>…</svg> tags, keeping only inner content
      const inner = colored.replace(/<svg[^>]*>/, "").replace(/<\/svg>$/, "");
      return inner;
    })
    .join("\n");

  return `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">\n${innerMarkup}\n</svg>`;
}

