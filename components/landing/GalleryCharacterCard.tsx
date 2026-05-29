"use client";

import { useState, useEffect } from "react";
import { getTemplate } from "@/lib/templates/registry";
import { composeCharacterSvg } from "@/lib/canvas/render-svg";
import type { GalleryExample } from "@/lib/gallery/examples";

// Import template definitions so registry is populated
import "@/lib/templates/definitions/cartoon-base-a";
import "@/lib/templates/definitions/fantasy-knight";

interface GalleryCharacterCardProps {
  example: GalleryExample;
}

/**
 * Render a skeleton placeholder during SSR, then compute the SVG on the client
 * (DOMParser is browser-only so we cannot SSR the coloured SVG).
 */
function CardSkeleton() {
  return (
    <div className="flex aspect-[2/3] flex-col overflow-hidden rounded-[24px] border border-border bg-bg-card shadow-sm">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="h-full w-full animate-pulse rounded-[12px] bg-gray-100" />
      </div>
      <div className="border-t border-border px-4 py-3">
        <div className="mb-1 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-2 w-full animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export function GalleryCharacterCard({ example }: GalleryCharacterCardProps) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const template = getTemplate(example.templateId);
    if (!template) {
      setSvg(null);
      return;
    }
    const result = composeCharacterSvg(template, example.state);
    setSvg(result);
  }, [example]);

  // During SSR and before hydration, show a skeleton (svg is null)
  if (!svg) {
    return <CardSkeleton />;
  }

  if (!svg) {
    return (
      <div className="flex aspect-[2/3] items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-gray-50 p-4">
        <p className="text-xs text-gray-400">Template not found</p>
      </div>
    );
  }

  return (
    <div className="group relative flex aspect-[2/3] flex-col overflow-hidden rounded-[24px] border border-border bg-bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
      {/* Category tag */}
      <div className="absolute left-3 top-3 z-10">
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 shadow-sm backdrop-blur-sm">
          {example.category}
        </span>
      </div>

      {/* SVG preview — hidden from assistive tech, card text conveys the info */}
      <div
        className="flex flex-1 items-center justify-center p-4"
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden="true"
      />

      {/* Card footer */}
      <div className="border-t border-border bg-bg-card/80 px-4 py-3 backdrop-blur-sm">
        <h3 className="font-[family-name:var(--font-display-fredoka)] text-sm font-semibold text-text-primary">
          {example.name}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary line-clamp-2">
          {example.description}
        </p>
      </div>

      {/* Hover overlay → editor link */}
      <a
        href="/editor"
        className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-[24px] bg-amber-500/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-label={`Open ${example.name} in editor`}
      >
        <span className="font-[family-name:var(--font-display-fredoka)] text-base font-semibold text-white">
          Create yours
        </span>
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </div>
  );
}
