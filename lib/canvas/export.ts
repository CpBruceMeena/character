/**
 * Export pipeline for CharacterForge Pro.
 *
 * Renders the full character to an off-screen canvas at the requested
 * resolution, converts to the chosen image format (PNG / JPEG), and
 * returns a Blob ready for download.
 *
 * ## Export presets (E-03)
 *
 * | Preset          | Size        | Format | Background  |
 * |-----------------|-------------|--------|-------------|
 * | Social          | 1080 × 1080 | JPEG   | Solid white |
 * | Profile Picture | 500 × 500   | PNG    | Transparent |
 * | Full Body       | 1200 × 1600 | PNG    | Transparent |
 *
 * ## Custom export
 *
 * The user can also pick a format (PNG / JPEG) and a scale multiplier
 * (1× / 2× / 4×) that is applied to the current canvas dimensions.
 * PNG exports can optionally include a transparent background.
 *
 * @module lib/canvas/export
 */

import { renderCharacter } from "@/lib/canvas/renderer";
import type { TemplateDefinition } from "@/lib/templates/schema";

/* ── Types ── */

export type ExportFormat = "png" | "jpeg";

export interface ExportOptions {
  /** Active template definition */
  template: TemplateDefinition;
  /** Full character store state */
  state: Record<string, unknown>;
  /** Output canvas width in **logical** pixels (before scale) */
  width: number;
  /** Output canvas height in **logical** pixels (before scale) */
  height: number;
  /** Target image format */
  format: ExportFormat;
  /** Scale multiplier (1 = 1×, 2 = 2×, 4 = 4×) */
  scale: 1 | 2 | 4;
  /**
   * Render with a transparent background.
   * Only meaningful for PNG (JPEG does not support alpha).
   * When true, the background is skipped entirely.
   * When false, the current state `backgroundMode` is used.
   */
  transparent?: boolean;
}

export interface ExportResult {
  blob: Blob;
  filename: string;
  width: number;
  height: number;
  sizeBytes: number;
}

/* ── Export presets ── */

export interface ExportPreset {
  id: "social" | "profile" | "fullbody";
  label: string;
  description: string;
  width: number;
  height: number;
  format: ExportFormat;
  transparent: boolean;
}

export const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: "social",
    label: "Social Media",
    description: "1080×1080 — JPEG with background",
    width: 1080,
    height: 1080,
    format: "jpeg",
    transparent: false,
  },
  {
    id: "profile",
    label: "Profile Picture",
    description: "500×500 — PNG, transparent background",
    width: 500,
    height: 500,
    format: "png",
    transparent: true,
  },
  {
    id: "fullbody",
    label: "Full Body",
    description: "PNG — full resolution, transparent background",
    width: 0, // filled from canvas dimensions
    height: 0,
    format: "png",
    transparent: true,
  },
];

/* ── Helpers ── */

/**
 * Build a safe filename from the character name, format, and scale.
 */
function buildFilename(
  charName: string,
  format: ExportFormat,
  scale: number,
): string {
  const safe = charName
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase() || "character";
  const scaleLabel = scale > 1 ? `@${scale}x` : "";
  return `${safe}${scaleLabel}.${format}`;
}

/* ── Main export function ── */

/**
 * Render the full character and produce a downloadable Blob.
 *
 * 1. Determines output physical dimensions (width × height × scale).
 * 2. If `transparent` is true, patches the background mode so the
 *    renderer skips background painting.
 * 3. Calls {@link renderCharacter} at the target resolution.
 * 4. Converts the result canvas to a Blob via `canvas.toBlob()`.
 * 5. Returns the Blob together with metadata (filename, dimensions).
 */
export async function exportCharacter(
  options: ExportOptions,
): Promise<ExportResult> {
  const {
    template,
    state,
    width,
    height,
    format,
    scale,
    transparent = false,
  } = options;

  // Ensure minimum dimensions
  const logicalW = Math.max(64, width);
  const logicalH = Math.max(64, height);
  const physW = logicalW * scale;
  const physH = logicalH * scale;

  // Patch the background mode — transparent exports skip background entirely
  const bgModeType = state.backgroundMode as string;
  const resolvedMode =
    transparent && format === "png"
      ? "none"
      : bgModeType === "checker" || bgModeType === "solid" || bgModeType === "gradient"
        ? bgModeType
        : "checker";

  const exportState = {
    ...state,
    backgroundMode: resolvedMode,
  };

  const rendered = await renderCharacter({
    template,
    state: exportState as Record<string, unknown>,
    width: physW,
    height: physH,
  });

  return new Promise<ExportResult>((resolve, reject) => {
    const mimeType = format === "png" ? "image/png" : "image/jpeg";
    const quality = format === "jpeg" ? 0.92 : undefined;

    rendered.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Export failed — canvas.toBlob returned null"));
          return;
        }

        const charName = (state.charName as string) ?? "character";
        const filename = buildFilename(charName, format, scale);

        resolve({
          blob,
          filename,
          width: physW,
          height: physH,
          sizeBytes: blob.size,
        });
      },
      mimeType,
      quality,
    );
  });
}
