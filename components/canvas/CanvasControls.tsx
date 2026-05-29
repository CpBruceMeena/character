"use client";

import { useState } from "react";
import { IconButton } from "@/components/shared/IconButton";
import { useCharacterStore } from "@/lib/stores/character-store";

export function CanvasControls() {
  const [zoom, setZoom] = useState(100);
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
        <IconButton
          label="Zoom out"
          onClick={() => setZoom((z) => Math.max(25, z - 10))}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </IconButton>

        <span className="min-w-[36px] text-center text-xs tabular-nums text-text-secondary">
          {zoom}%
        </span>

        <IconButton
          label="Zoom in"
          onClick={() => setZoom((z) => Math.min(200, z + 10))}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
