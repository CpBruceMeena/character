"use client";

import { useRef, useEffect, useState } from "react";

import { useCharacterStore } from "@/lib/stores/character-store";
import { getTemplate } from "@/lib/templates/registry";
import { renderCharacter, drawBackground } from "@/lib/canvas/renderer";
import { clearLayerCache } from "@/lib/canvas/render-cache";
import { CacheIndicator } from "@/components/canvas/CacheIndicator";

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

/* ── Character Canvas ── */

export function CharacterCanvas({ categoryId, templateId }: CharacterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<number>(0);
  const [resizeKey, setResizeKey] = useState(0);

  // Individual selectors trigger re-render only when the specific value changes
  const skinTone = useCharacterStore((s) => s.skinTone);
  const hairColor = useCharacterStore((s) => s.hairColor);
  const hairStyle = useCharacterStore((s) => s.hairStyle);
  const outfit = useCharacterStore((s) => s.outfit);
  const outfitColors = useCharacterStore((s) => s.outfitColors);
  const accessories = useCharacterStore((s) => s.accessories);
  const bgMode = useCharacterStore((s) => s.backgroundMode);

  // Clear the layer render cache when switching templates
  useEffect(() => {
    clearLayerCache();
  }, [templateId]);

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
    const container = canvas.parentElement!;
    const rect = container.getBoundingClientRect();
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
  }, [templateId, skinTone, hairColor, hairStyle, outfit, outfitColors, accessories, bgMode, resizeKey, categoryId]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <div
        ref={containerRef}
        className="relative flex w-full max-w-[600px] flex-1 items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full rounded-[16px]"
          aria-label="Character preview"
        />
        <CacheIndicator />
      </div>
    </div>
  );
}
