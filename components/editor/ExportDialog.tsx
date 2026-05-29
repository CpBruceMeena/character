"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCharacterStore } from "@/lib/stores/character-store";
import { getTemplate } from "@/lib/templates/registry";
import { exportCharacter, EXPORT_PRESETS, type ExportFormat } from "@/lib/canvas/export";
import { downloadBlob } from "@/lib/utils/download";
import { renderCharacter } from "@/lib/canvas/renderer";

/* ── Types ── */

type ScaleValue = 1 | 2 | 4;

/* ── Helpers ── */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ── Tab label for preset icons ── */

function PresetIcon({ preset }: { preset: (typeof EXPORT_PRESETS)[number] }) {
  if (preset.id === "social") {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    );
  }
  if (preset.id === "profile") {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  );
}

/* ── Component ── */

export function ExportDialog() {
  const isOpen = useUIStore((s) => s.isExportDialogOpen);
  const close = useUIStore((s) => s.setExportDialogOpen);

  const charName = useCharacterStore((s) => s.charName);
  const categoryId = useCharacterStore((s) => s.categoryId);
  const templateId = useCharacterStore((s) => s.templateId);

  // Format & scale state
  const [format, setFormat] = useState<ExportFormat>("png");
  const [scale, setScale] = useState<ScaleValue>(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>("fullbody");

  // Export progress
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [lastExport, setLastExport] = useState<{
    sizeBytes: number;
    filename: string;
  } | null>(null);

  // Preview canvas ref
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Determine dimensions from preset or scale
  const resolveDimensions = useCallback(() => {
    if (activePreset) {
      const preset = EXPORT_PRESETS.find((p) => p.id === activePreset);
      if (preset) {
        if (preset.id === "fullbody") {
          // Full body uses the scale factor applied to a 600×800 base
          const baseW = 600;
          const baseH = 800;
          return { width: baseW * scale, height: baseH * scale };
        }
        return { width: preset.width, height: preset.height };
      }
    }
    // Default: scale from 600×800
    return { width: 600 * scale, height: 800 * scale };
  }, [activePreset, scale]);

  const resolveFormat = useCallback((): ExportFormat => {
    if (activePreset) {
      const preset = EXPORT_PRESETS.find((p) => p.id === activePreset);
      if (preset) return preset.format;
    }
    return format;
  }, [activePreset, format]);

  const resolveTransparent = useCallback((): boolean => {
    if (activePreset) {
      const preset = EXPORT_PRESETS.find((p) => p.id === activePreset);
      if (preset) return preset.transparent;
    }
    return format === "png";
  }, [activePreset, format]);

  // Render preview when dialog opens or format/preset/scale changes
  useEffect(() => {
    if (!isOpen) return;

    const preview = previewRef.current;
    if (!preview) return;

    const template = getTemplate(templateId ?? "");
    if (!template) return;

    setPreviewLoaded(false);

    const state = useCharacterStore.getState();

    // Render a small preview (max 200px wide)
    const dims = resolveDimensions();
    const previewW = Math.min(200, dims.width);
    const aspect = dims.height / dims.width;
    const previewH = Math.round(previewW * aspect);

    // For the preview, use the current background mode
    const isTransparent = resolveTransparent();

    renderCharacter({
      template,
      state: {
        ...state,
        backgroundMode: isTransparent ? "none" : state.backgroundMode,
      } as unknown as Record<string, unknown>,
      width: previewW * 2, // render at 2x for crisp preview
      height: previewH * 2,
    }).then((rendered) => {
      if (!previewRef.current) return;
      const ctx = previewRef.current.getContext("2d");
      if (!ctx) return;

      const canvas = previewRef.current;
      canvas.width = previewW * 2;
      canvas.height = previewH * 2;
      canvas.style.width = `${previewW}px`;
      canvas.style.height = `${previewH}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(rendered, 0, 0);
      setPreviewLoaded(true);
    });
  }, [isOpen, format, scale, activePreset, templateId, resolveDimensions, resolveFormat, resolveTransparent]);

  // Handle preset selection
  const applyPreset = (presetId: string) => {
    setActivePreset(presetId);
    const preset = EXPORT_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setFormat(preset.format);
      setExportError(null);
      setLastExport(null);
    }
  };

  // Handle format change (clear preset if switching from a preset)
  const handleFormatChange = (newFormat: ExportFormat) => {
    setFormat(newFormat);
    setActivePreset(null);
    setExportError(null);
    setLastExport(null);
  };

  // Handle scale change
  const handleScaleChange = (newScale: ScaleValue) => {
    setScale(newScale);
    setExportError(null);
    setLastExport(null);
  };

  // Handle download
  const handleDownload = async () => {
    setExportError(null);
    setLastExport(null);

    const template = getTemplate(templateId ?? "");
    if (!template) {
      setExportError("No template selected. Please select a character template first.");
      return;
    }

    setExporting(true);

    try {
      const dims = resolveDimensions();
      const result = await exportCharacter({
        template,
        state: useCharacterStore.getState() as unknown as Record<string, unknown>,
        width: dims.width,
        height: dims.height,
        format: resolveFormat(),
        scale: 1, // dimensions already include scale
        transparent: resolveTransparent(),
      });

      downloadBlob(result.blob, result.filename);
      setLastExport({
        sizeBytes: result.sizeBytes,
        filename: result.filename,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Export failed. Please try again.";
      setExportError(message);
    } finally {
      setExporting(false);
    }
  };

  const currentFormat = resolveFormat();
  const currentTransparent = resolveTransparent();
  const dims = resolveDimensions();

  return (
    <Modal isOpen={isOpen} onClose={() => close(false)} title="Export Character">
      <div className="space-y-5">
        {/* ── Presets ── */}
        <div>
          <p className="mb-2 text-xs font-medium text-text-tertiary uppercase tracking-wide">Quick presets</p>
          <div className="grid grid-cols-3 gap-2">
            {EXPORT_PRESETS.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-[10px] border p-3 text-center transition-all ${
                    isActive
                      ? "border-amber-400 bg-amber-50 text-amber-800 shadow-sm"
                      : "border-border text-text-secondary hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-label={`${preset.label} — ${preset.description}`}
                  aria-pressed={isActive}
                >
                  <span className={isActive ? "text-amber-500" : "text-text-tertiary"}>
                    <PresetIcon preset={preset} />
                  </span>
                  <span className="text-xs font-semibold leading-tight">{preset.label}</span>
                  <span className="text-[10px] leading-tight opacity-70">
                    {preset.id === "fullbody" ? "Variable" : `${preset.width}×${preset.height}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Format & Scale ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Format */}
          <div>
            <p className="mb-2 text-xs font-medium text-text-tertiary uppercase tracking-wide">Format</p>
            <div className="flex gap-2">
              {(["png", "jpeg", "svg"] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleFormatChange(fmt)}
                  className={`flex-1 rounded-[8px] border px-3 py-2 text-sm font-medium transition-all ${
                    currentFormat === fmt
                      ? "border-amber-400 bg-amber-50 text-amber-800"
                      : "border-border text-text-secondary hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-pressed={currentFormat === fmt}
                >
                  {fmt.toUpperCase()}
                  <span className="block text-[10px] font-normal opacity-70">
                    {fmt === "png" ? "with alpha" : fmt === "jpeg" ? "solid bg" : "vector, scalable"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scale (hidden for SVG — vector format doesn't need scaling) */}
          {currentFormat !== "svg" && (
            <div>
              <p className="mb-2 text-xs font-medium text-text-tertiary uppercase tracking-wide">Scale</p>
              <div className="flex gap-2">
                {([1, 2, 4] as ScaleValue[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleScaleChange(s)}
                    className={`flex-1 rounded-[8px] border px-3 py-2 text-sm font-medium transition-all ${
                      scale === s
                        ? "border-amber-400 bg-amber-50 text-amber-800"
                        : "border-border text-text-secondary hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-pressed={scale === s}
                  >
                    {s}×
                    <span className="block text-[10px] font-normal opacity-70">
                      {dims.width}×{dims.height}px
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* SVG info */}
          {currentFormat === "svg" && (
            <div>
              <p className="mb-2 text-xs font-medium text-text-tertiary uppercase tracking-wide">Format details</p>
              <div className="rounded-[8px] border border-border bg-bg-page px-3 py-2 text-xs text-text-tertiary">
                SVG exports at {dims.width}×{dims.height}px viewport. Perfectly scalable — no quality loss at any size.
                Layers use inline SVGs with embedded color zones.
              </div>
            </div>
          )}
        </div>

        {/* ── Preview ── */}
        <div>
          <p className="mb-2 text-xs font-medium text-text-tertiary uppercase tracking-wide">Preview</p>
          <div
            className={`flex items-center justify-center rounded-[12px] border border-border bg-bg-page p-4 ${
              currentTransparent ? "bg-[repeating-conic-gradient(#e5e0da_0%_25%,#f0ede8_0%_50%)_0_0_/_20px_20px]" : ""
            }`}
          >
            <canvas
              ref={previewRef}
              className="max-h-[200px] max-w-full rounded-[8px]"
              aria-label="Export preview"
            />
            {!previewLoaded && (
              <div className="flex items-center justify-center py-12">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* ── Status ── */}
        {exportError && (
          <div
            role="alert"
            className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {exportError}
          </div>
        )}

        {lastExport && (
          <div className="rounded-[8px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            Downloaded — <span className="font-medium">{formatBytes(lastExport.sizeBytes)}</span> ({lastExport.filename})
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <span className="mr-auto text-xs text-text-tertiary">
            {currentFormat === "svg" ? "SVG · vector, infinitely scalable" : `${dims.width} × ${dims.height}px · ${currentFormat.toUpperCase()}${currentTransparent ? " · Transparent" : ""}`}
          </span>
          <Button variant="secondary" size="sm" onClick={() => close(false)}>
            Cancel
          </Button>
          <Button
            variant="coral"
            size="sm"
            onClick={handleDownload}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Exporting…
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
