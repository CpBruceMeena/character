"use client";

import { Button } from "@/components/shared/Button";

/* ── Inline hero illustration (pure CSS/SVG, zero deps) ── */
function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Decorative ring */}
      <div className="absolute h-[320px] w-[320px] rounded-full border-2 border-amber-200/40 sm:h-[400px] sm:w-[400px]" />
      <div className="absolute h-[240px] w-[240px] rounded-full border-2 border-coral-200/30 sm:h-[300px] sm:w-[300px]" />

      {/* Stylised character silhouette */}
      <svg
        viewBox="0 0 200 200"
        className="relative h-72 w-72 drop-shadow-xl sm:h-80 sm:w-80"
        fill="none"
      >
        {/* Head */}
        <circle cx="100" cy="72" r="36" fill="url(#hero-grad-head)" />
        {/* Body */}
        <path
          d="M60 130c0-22 18-40 40-40s40 18 40 40v50H60v-50z"
          fill="url(#hero-grad-body)"
        />
        {/* Crown / sparkle */}
        <g className="origin-center animate-pulse">
          <path
            d="M76 48l8 12 16-8-8 14 16 8-16 6 4 16-14-8-4 16-8-14-16 6 8-14-16-8 14-8-8-14z"
            fill="#fbbf24"
            opacity={0.7}
          />
        </g>
        {/* Eye dots */}
        <circle cx="88" cy="68" r="3" fill="#1a1614" />
        <circle cx="112" cy="68" r="3" fill="#1a1614" />
        {/* Smile */}
        <path
          d="M88 82c4 5 12 6 18 2"
          stroke="#1a1614"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="hero-grad-head" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="hero-grad-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_#fffbeb_0%,_transparent_60%),radial-gradient(ellipse_at_bottom_right,_#cffafe_0%,_transparent_50%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Text side — left aligned, not centered */}
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-display-fredoka)] text-5xl font-bold leading-[1.1] tracking-tight text-amber-800 sm:text-6xl lg:text-7xl">
            Characters that
            <span className="relative ml-2 whitespace-nowrap text-amber-500">
              pop.
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full"
                viewBox="0 0 120 12"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 10c23-6 49-8 78-5 13 1 26 0 38-3"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={0.5}
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-text-secondary sm:text-xl">
            Pick a template, tune every detail with precision controls, see
            changes in real time, and export your character in any format.
            No design skills required.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/editor">
              <Button variant="coral" size="lg">
                Start creating
                <svg
                  className="ml-1.5 h-4 w-4"
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
              </Button>
            </a>
            <a href="#features">
              <Button variant="secondary" size="lg">
                See what&apos;s possible
              </Button>
            </a>
          </div>

          {/* Social proof / stat line */}
          <div className="mt-8 flex items-center gap-6 text-sm text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-teal-400" />
              50+ templates
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
              6 export formats
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-coral-400" />
              Full undo history
            </span>
          </div>
        </div>

        {/* Visual side */}
        <div className="hidden md:flex md:items-center md:justify-center">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
