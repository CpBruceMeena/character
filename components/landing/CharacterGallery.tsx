"use client";

import { GalleryCharacterCard } from "./GalleryCharacterCard";
import { GALLERY_EXAMPLES } from "@/lib/gallery/examples";

export function CharacterGallery() {
  return (
    <section className="border-t border-border bg-bg-page px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="font-[family-name:var(--font-display-fredoka)] text-2xl font-semibold text-text-primary sm:text-3xl">
            Get Inspired
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            Explore example characters created with CharacterForge Pro. Each
            style is fully customizable — pick one and make it your own.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          {GALLERY_EXAMPLES.map((example) => (
            <GalleryCharacterCard key={example.id} example={example} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="/editor"
            className="inline-flex items-center gap-2 rounded-[12px] bg-amber-500 px-6 py-3 font-[family-name:var(--font-display-fredoka)] text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-amber-600 active:scale-[0.97]"
          >
            Start Creating
            <svg
              className="h-4 w-4"
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
      </div>
    </section>
  );
}
