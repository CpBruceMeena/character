"use client";

/**
 * Resolve a dot-path like `"outfitColors.primary"` from a character state
 * object. Returns `defaultColor` when the path cannot be resolved or the
 * resolved value is not a valid hex colour string.
 *
 * This is the single source of truth for colour resolution — both the
 * renderer (`applyColorZones`) and the render cache (`computeColorHash`)
 * use this function so their colour resolution logic stays in sync.
 */
export function resolveColor(
  state: Record<string, unknown>,
  path: string,
  defaultColor: string,
): string {
  const parts = path.split(".");
  let value: unknown = state;
  for (const part of parts) {
    if (value === null || typeof value !== "object") return defaultColor;
    value = (value as Record<string, unknown>)[part];
  }
  return typeof value === "string" && value.startsWith("#") ? value : defaultColor;
}
