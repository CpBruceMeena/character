/* ── Template Schema — PRD Section 20.5 ── */

/** Category identifiers used across the app */
export type CategoryId = "cartoon" | "fantasy" | "modern" | "historical";

/** Control sections that map to editor tabs */
export type ControlSection = "identity" | "body" | "face" | "hair" | "clothing" | "accessories";

/** Type of control shown in the editor panel */
export type ControlType = "slider" | "color" | "toggle" | "select" | "group";

/* ── Color Zone ── */

/**
 * A color zone marks a fillable region inside a layer's SVG.
 * The `selector` is a `data-colorzone` attribute value, **not** a CSS selector,
 * because SVG optimisers (svgo) strip classes/IDs by default.
 *
 * Per eng review finding #1: use `data-colorzone="<zone-id>"` on SVG elements
 * instead of relying on class names or element IDs.
 */
export interface ColorZone {
  id: string;
  name: string;
  /** Value of the `data-colorzone` attribute on the target SVG element */
  selector: string;
  /** Default hex colour (e.g. "#D4A574") */
  defaultColor: string;
  /**
   * Dot-path into CharacterState to resolve the current colour.
   * E.g. "skinTone", "outfitColors.primary", "hairColor".
   */
  propertyPath: string;
}

/* ── Layer Definition ── */

/**
 * A single composable layer in a character template.
 *
 * The layer can either reference an external SVG file (`svgPath`) or
 * contain inline SVG markup (`inlineSvg`). Phase 1 uses inline SVGs
 * for simplicity; Phase 2+ can switch to file-based asset loading.
 */
export interface LayerDefinition {
  id: string;
  name: string;
  /** Inline SVG markup (used in Phase 1). Elements should carry `data-colorzone` attrs. */
  inlineSvg: string;
  /** Rendering order — higher zIndex renders on top */
  zIndex: number;
  /** Whether this layer is shown by default */
  defaultVisible: boolean;
  /** Colour zones that the user can recolor */
  colorZones: ColorZone[];
  /** If set, this layer only renders when the parent layer is visible */
  parentLayer?: string;
}

/* ── Control Definition ── */

/**
 * Maps a UI control (slider, color picker, toggle, etc.) to the
 * character store properties and the template layers it affects.
 *
 * The `targets` array references:
 *   - Store property paths for value controls (e.g. "eyeSize", "hairColor")
 *   - `LayerDefinition.id` values for visibility toggles (e.g. "hat")
 */
export interface ControlDefinition {
  id: string;
  type: ControlType;
  label: string;
  section: ControlSection;
  /** Which layers / store properties this control affects */
  targets: string[];

  // ── type-specific props ──

  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string | boolean;
  options?: { label: string; value: string }[];
}

/* ── Template Definition ── */

export interface TemplateDefinition {
  id: string;
  name: string;
  category: CategoryId;
  /** Inline SVG thumbnail markup for sidebar previews */
  thumbnailSvg: string;
  /** Ordered list of renderable layers */
  layers: LayerDefinition[];
  /** Controls that drive the editor panels */
  controls: ControlDefinition[];
}

/* ── Category Definition ── */

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  /** Short description shown in tooltips / empty states */
  description: string;
  /** Template IDs belonging to this category */
  templateIds: string[];
  /** Display order (lower = first) */
  order: number;
}

/* ── Registry Types ── */

export interface TemplateRegistry {
  categories: CategoryDefinition[];
  templates: Record<string, TemplateDefinition>;
}
