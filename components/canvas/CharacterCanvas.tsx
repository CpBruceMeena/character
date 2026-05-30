"use client";

import { useRef, useEffect, useState, useCallback } from "react";

import { useCharacterStore } from "@/lib/stores/character-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { getTemplate } from "@/lib/templates/registry";
import { renderCharacter, drawBackground } from "@/lib/canvas/renderer";
import { clearLayerCache } from "@/lib/canvas/render-cache";
import { CacheIndicator } from "@/components/canvas/CacheIndicator";
import type { ControlSection } from "@/lib/stores/ui-store";

/* ── Click-to-edit mapping ──
 * Maps approximate y-regions of the character to control sections.
 * clickY ranges from -1 (top of character) to 1 (bottom).
 */
function regionForClick(
  clickY: number,
): ControlSection {
  // Top: head/face/hair region
  if (clickY < -0.15) {
    // Sub-region: above eyes = hair, eye level = face, below = identity
    if (clickY < -0.5) return "hair";
    if (clickY < -0.3) return "face";
    return "identity";
  }
  // Middle: torso/clothing region
  if (clickY < 0.3) return "clothing";
  // Bottom: accessories/legs region
  return "accessories";
}

interface CharacterCanvasProps {
  categoryId: string;
  templateId: string;
}

/* ── Canvas-drawn placeholder (no template loaded) ── */

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  category: string,
) {
  // Background
  drawBackground(ctx, w, h, { type: "checker" });

  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h) / 260;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const color =
    category === "cartoon"
      ? "#f59e0b"
      : category === "sci-fi"
        ? "#06b6d4"
        : category === "modern"
          ? "#f97316"
          : "#d97706";

  // Head
  ctx.beginPath();
  ctx.arc(0, -40, 36, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.8;
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(-48, 40);
  ctx.lineTo(-48, 120);
  ctx.lineTo(48, 120);
  ctx.lineTo(48, 40);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.6;
  ctx.fill();

  // Legs
  ctx.fillRect(-40, 120, 16, 36);
  ctx.fillRect(24, 120, 16, 36);

  // Eyes
  ctx.fillStyle = "#1a1614";
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(-12, -44, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(12, -44, 3, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.moveTo(-14, -28);
  ctx.quadraticCurveTo(0, -22, 14, -28);
  ctx.strokeStyle = "#1a1614";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Category label
  ctx.fillStyle = "#6b645c";
  ctx.font = "11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.globalAlpha = 0.7;
  ctx.fillText(
    `${category.charAt(0).toUpperCase() + category.slice(1)}`,
    0,
    170,
  );

  ctx.restore();
}

/* ── Character Canvas with Zoom/Pan ── */

export function CharacterCanvas({ categoryId, templateId }: CharacterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<number>(0);
  const [resizeKey, setResizeKey] = useState(0);

  // Drag state for panning
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; panX: number; panY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  });
  // Use a ref (not state) for drag detection so onClick can reliably check it
  // before React batches the state reset from mouseUp.
  const didDragRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Zoom/pan from UI store
  const canvasZoom = useUIStore((s) => s.canvasZoom);
  const canvasPanX = useUIStore((s) => s.canvasPanX);
  const canvasPanY = useUIStore((s) => s.canvasPanY);
  const setCanvasZoom = useUIStore((s) => s.setCanvasZoom);
  const setCanvasPan = useUIStore((s) => s.setCanvasPan);
  const resetCanvasView = useUIStore((s) => s.resetCanvasView);

  // Individual selectors trigger re-render only when the specific value changes
  const skinTone = useCharacterStore((s) => s.skinTone);
  const hairColor = useCharacterStore((s) => s.hairColor);
  const hairStyle = useCharacterStore((s) => s.hairStyle);
  const outfit = useCharacterStore((s) => s.outfit);
  const outfitColors = useCharacterStore((s) => s.outfitColors);
  const accessories = useCharacterStore((s) => s.accessories);
  const bgMode = useCharacterStore((s) => s.backgroundMode);
  const expression = useCharacterStore((s) => s.expression);
  const eyeSize = useCharacterStore((s) => s.eyeSize);
  const bgColor = useCharacterStore((s) => s.background.color);
  const bgSecondaryColor = useCharacterStore((s) => s.background.secondaryColor);
  const gender = useCharacterStore((s) => s.gender);
  const bodyType = useCharacterStore((s) => s.bodyType);
  const height = useCharacterStore((s) => s.height);
  const width = useCharacterStore((s) => s.width);
  const headSize = useCharacterStore((s) => s.headSize);
  const limbProportions = useCharacterStore((s) => s.limbProportions);
  const partVisibility = useCharacterStore((s) => s.partVisibility);

  // Clear the layer render cache when switching templates
  useEffect(() => {
    clearLayerCache();
    resetCanvasView();
  }, [templateId, resetCanvasView]);

  // Observe container size changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() =>
      setResizeKey((k) => k + 1),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Render on any state / template / size change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderId = ++renderRef.current;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (w === 0 || h === 0) return;

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const template = getTemplate(templateId);

    if (!template) {
      drawPlaceholder(ctx, w, h, categoryId);
      return;
    }

    // Send the full store state so all color-zone propertyPaths resolve
    const storeState = useCharacterStore.getState();

    renderCharacter({
      template,
      state: storeState as unknown as Record<string, unknown>,
      width: w,
      height: h,
    }).then((rendered) => {
      if (renderId !== renderRef.current) return; // superseded by newer render
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(rendered, 0, 0);
    });
  }, [templateId, skinTone, hairColor, hairStyle, outfit, outfitColors, accessories, bgMode, expression, eyeSize, bgColor, bgSecondaryColor, gender, bodyType, height, width, headSize, limbProportions, partVisibility, resizeKey, categoryId]);

  // ── Wheel zoom handler ──
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      const newZoom = Math.max(25, Math.min(300, canvasZoom + delta));
      setCanvasZoom(newZoom);
    },
    [canvasZoom, setCanvasZoom],
  );

  // ── Click-on-canvas: clicking character selects corresponding tab ──
  const setActiveTab = useUIStore((s) => s.setActiveControlSection);
  const activeTab = useUIStore((s) => s.activeControlSection);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't trigger if user was dragging (panning). Use ref to avoid
      // React batching issues — state resets before click event fires.
      if (didDragRef.current) {
        didDragRef.current = false;
        return;
      }
      const viewport = viewportRef.current;
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      // Compute click position relative to viewport center (-1 to 1)
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      // Only register clicks within the character area (not too far from center)
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0.9) return; // too far — probably background
      const section = regionForClick(dy);
      // Only switch if different, to avoid unnecessary re-renders
      if (section !== activeTab) {
        setActiveTab(section);
      }
    },
    [activeTab, setActiveTab],
  );

  // ── Mouse drag handlers ──
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only drag with left button
      if (e.button !== 0) return;
      // Record starting position for drag detection
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        panX: canvasPanX,
        panY: canvasPanY,
      };
    },
    [canvasPanX, canvasPanY],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = Math.abs(e.clientX - dragRef.current.startX);
      const dy = Math.abs(e.clientY - dragRef.current.startY);
      // Only consider it dragging after moving 4+ pixels (debounce threshold)
      if (dx > 4 || dy > 4) {
        setIsDragging(true);
        didDragRef.current = true;
      }
      if (!isDragging) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      setCanvasPan(dragRef.current.panX + deltaX, dragRef.current.panY + deltaY);
    },
    [isDragging, setCanvasPan],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current.active = false;
  }, []);

  // ── Reset drag state on mouse leave ──
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    dragRef.current.active = false;
    didDragRef.current = false;
  }, []);

  // ── Double-click reset ──
  const handleDoubleClick = useCallback(() => {
    resetCanvasView();
  }, [resetCanvasView]);

  const zoomPercent = canvasZoom / 100;

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <div
        ref={containerRef}
        className="relative flex w-full max-w-[600px] flex-1 items-center justify-center overflow-hidden"
      >
        {/* Viewport — handles zoom/pan transform */}
        <div
          ref={viewportRef}
          className={`absolute inset-0 flex items-center justify-center ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
          onDoubleClick={handleDoubleClick}
          style={{
            transform: `scale(${zoomPercent}) translate(${canvasPanX / zoomPercent}px, ${canvasPanY / zoomPercent}px)`,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full rounded-[16px]"
            aria-label="Character preview"
          />
        </div>
        {process.env.NODE_ENV !== "production" && <CacheIndicator />}
      </div>
    </div>
  );
}
