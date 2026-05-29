"use client";

import { IconButton } from "@/components/shared/IconButton";
import { useCharacterStore } from "@/lib/stores/character-store";
import { useUIStore } from "@/lib/stores/ui-store";

export function CanvasControls() {
  const zoom = useUIStore((s) => s.canvasZoom);
  const setCanvasZoom = useUIStore((s) => s.setCanvasZoom);
  const resetCanvasView = useUIStore((s) => s.resetCanvasView);
  const bgMode = useCharacterStore((s) => s.backgroundMode);
  const setBgMode = useCharacterStore((s) => s.setBackgroundMode);

  return (
    <div className="flex items-center justify-between border-t border-border bg-bg-card px-4 py-2">
      {/* Background selector */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-text-tertiary">Background</span>
        <button
          onClick={() => setBgMode("checker")}
          className={`h-6 w-6 rounded-[6px] border transition-colors ${
            bgMode === "checker" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-border hover:border-gray-400"
          } bg-[#f0ede8]`}
          aria-label="Checkerboard background"
          title="Checkerboard"
        />
        <button
          onClick={() => setBgMode("solid")}
          className={`h-6 w-6 rounded-[6px] border transition-colors ${
            bgMode === "solid" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-border hover:border-gray-400"
          } bg-white`}
          aria-label="Solid white background"
          title="Solid white"
        />
        <button
          onClick={() => setBgMode("gradient")}
          className={`h-6 w-6 rounded-[6px] border transition-colors ${
            bgMode === "gradient" ? "border-amber-400 ring-2 ring-amber-400/30" : "border-border hover:border-gray-400"
          } bg-gradient-to-br from-amber-50 to-teal-100`}
          aria-label="Gradient background"
          title="Gradient"
        />
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        {/* Fit to view */}
        <IconButton
          label="Reset view"
          onClick={resetCanvasView}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
          </svg>
        </IconButton>

        <div className="mx-1 h-5 w-px bg-border" />

        <IconButton
          label="Zoom out"
          onClick={() => setCanvasZoom(Math.max(25, zoom - 10))}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </IconButton>

        <button
          onClick={resetCanvasView}
          className="min-w-[36px] text-center text-xs tabular-nums text-text-secondary transition-colors hover:text-text-primary"
          title="Reset view"
        >
          {zoom}%
        </button>

        <IconButton
          label="Zoom in"
          onClick={() => setCanvasZoom(Math.min(300, zoom + 10))}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
