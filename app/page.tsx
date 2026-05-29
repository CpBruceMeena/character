import { Hero } from "@/components/landing/Hero";
import { CategoryShowcase } from "@/components/landing/CategoryShowcase";
import { CharacterGallery } from "@/components/landing/CharacterGallery";
import { Features } from "@/components/landing/Features";
import { ExportFormats } from "@/components/landing/ExportFormats";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-bg-card/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="/"
            className="font-[family-name:var(--font-display-fredoka)] text-lg font-semibold text-amber-700"
          >
            CharacterForge Pro
          </a>
          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#features"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-amber-600"
            >
              Features
            </a>
            <a
              href="/templates"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-amber-600"
            >
              Templates
            </a>
            <a
              href="/editor"
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-amber-600"
            >
              Open editor
              <svg
                className="h-3.5 w-3.5"
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
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <Hero />

      {/* ── Category Showcase ── */}
      <CategoryShowcase />

      {/* ── Character Gallery ── */}
      <CharacterGallery />

      {/* ── Features ── */}
      <Features />

      {/* ── Export Formats ── */}
      <ExportFormats />

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
