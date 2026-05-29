"use client";

/* ── Feature data ── */

interface Feature {
  id: string;
  title: string;
  description: string;
  graphic: "template" | "canvas" | "controls" | "export";
  color: "amber" | "coral" | "teal";
}

const features: Feature[] = [
  {
    id: "templates",
    title: "Start from anywhere",
    description:
      "Browse 50+ templates across fantasy, sci-fi, modern, and historical genres. Each template comes with hand-tuned layers, color zones, and part visibility presets — ready to remix.",
    graphic: "template",
    color: "amber",
  },
  {
    id: "canvas",
    title: "See it happen, instantly",
    description:
      "Every slider nudge, color pick, and toggle redraws the canvas in under 100ms. No save button, no loading spinner — just you and your character, live.",
    graphic: "canvas",
    color: "teal",
  },
  {
    id: "controls",
    title: "Tune every atom",
    description:
      "Precise controls for hair, eyes, skin, outfit, and accessories. Sliders, color swatches, toggles, and combo boxes — grouped by body part so you never hunt for a setting.",
    graphic: "controls",
    color: "coral",
  },
  {
    id: "export",
    title: "Ship in any format",
    description:
      "Export as PNG, SVG, WebP, or JPEG at any resolution up to 4K. Need a transparent headshot? A full-body sprite sheet? One click, done. Your character, your way.",
    graphic: "export",
    color: "amber",
  },
];

/* ── Decorative feature graphics (pure SVG) ── */

function FeatureGraphic({ type, color }: { type: Feature["graphic"]; color: Feature["color"] }) {
  const fillColor =
    color === "amber"
      ? "fill-amber-100"
      : color === "coral"
        ? "fill-coral-100"
        : "fill-teal-100";

  const accentColor =
    color === "amber"
      ? "fill-amber-400"
      : color === "coral"
        ? "fill-coral-400"
        : "fill-teal-400";

  const accentColor2 =
    color === "amber"
      ? "fill-amber-500"
      : color === "coral"
        ? "fill-coral-500"
        : "fill-teal-500";

  if (type === "template") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
        {/* Stacked layers */}
        <rect x="12" y="8" width="136" height="104" rx="12" className={fillColor} strokeWidth={1.5} />
        <rect x="24" y="16" width="112" height="88" rx="8" className="fill-bg-card" stroke="#e5e0da" strokeWidth={1.5} />
        {/* Layer stripes */}
        <rect x="36" y="28" width="88" height="8" rx="4" className={accentColor} opacity={0.6} />
        <rect x="36" y="44" width="64" height="8" rx="4" className={accentColor2} opacity={0.4} />
        <rect x="36" y="60" width="76" height="8" rx="4" className={accentColor} opacity={0.3} />
        <rect x="36" y="76" width="52" height="8" rx="4" className={accentColor2} opacity={0.2} />
        {/* File icon dots */}
        <circle cx="118" cy="86" r="4" className={accentColor} />
        <circle cx="130" cy="86" r="4" className={accentColor2} />
        <circle cx="124" cy="74" r="4" className={accentColor} />
      </svg>
    );
  }

  if (type === "canvas") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
        {/* Canvas frame */}
        <rect x="16" y="10" width="128" height="100" rx="8" className={fillColor} strokeWidth={1.5} />
        {/* Character silhouette inside canvas */}
        <circle cx="80" cy="46" r="18" className="fill-bg-card" />
        <path d="M48 88c0-18 14-32 32-32s32 14 32 32v8H48v-8z" className="fill-bg-card" />
        {/* Control dots */}
        <circle cx="44" cy="24" r="5" className={accentColor} />
        <circle cx="116" cy="24" r="5" className={accentColor} />
        <rect x="54" y="96" width="52" height="4" rx="2" className={accentColor2} opacity={0.5} />
      </svg>
    );
  }

  if (type === "controls") {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
        {/* Slider track */}
        <rect x="20" y="20" width="120" height="6" rx="3" className="fill-gray-200" />
        <circle cx="60" cy="23" r="10" className={accentColor} />
        {/* Second slider */}
        <rect x="20" y="52" width="120" height="6" rx="3" className="fill-gray-200" />
        <circle cx="100" cy="55" r="10" className={accentColor2} />
        {/* Swatches */}
        <rect x="20" y="82" width="24" height="24" rx="6" className="fill-gray-200" />
        <rect x="52" y="82" width="24" height="24" rx="6" className={accentColor} />
        <rect x="84" y="82" width="24" height="24" rx="6" className={accentColor2} />
        <rect x="116" y="82" width="24" height="24" rx="6" className="fill-teal-200" />
      </svg>
    );
  }

  // export
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
      {/* Download arrow */}
      <path
        d="M80 28v52M60 60l20 20 20-20"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={accentColor2}
      />
      {/* Format badges */}
      <rect x="16" y="90" width="30" height="20" rx="4" className={fillColor} strokeWidth={1} />
      <rect x="54" y="90" width="30" height="20" rx="4" className={fillColor} strokeWidth={1} />
      <rect x="92" y="90" width="30" height="20" rx="4" className={fillColor} strokeWidth={1} />
      <rect x="130" y="90" width="20" height="20" rx="4" className={fillColor} strokeWidth={1} />
      {/* Format labels */}
      <text x="20" y="104" fontSize="9" fontWeight="600" fill="#6b645c" fontFamily="DM Sans">SVG</text>
      <text x="58" y="104" fontSize="9" fontWeight="600" fill="#6b645c" fontFamily="DM Sans">PNG</text>
      <text x="96" y="104" fontSize="9" fontWeight="600" fill="#6b645c" fontFamily="DM Sans">WEBP</text>
    </svg>
  );
}

/* ── Section ── */

export function Features() {
  return (
    <section id="features" className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-14 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display-fredoka)] text-4xl font-bold leading-tight text-amber-800 sm:text-5xl">
            Build characters, not complexity.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-text-secondary">
            Every tool in CharacterForge Pro is built around one question:
            &ldquo;Does this make creating characters faster and more fun?&rdquo;
          </p>
        </div>

        {/* Feature grid — varied, asymmetric layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 — spans 2 cols (hero treatment) */}
          {features.slice(0, 1).map((f) => (
            <div
              key={f.id}
              className="group relative col-span-1 overflow-hidden rounded-[16px] border border-border bg-bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md sm:col-span-2 sm:p-8"
            >
              <div className="flex items-start gap-6 sm:gap-8">
                <div className="hidden h-28 w-40 flex-shrink-0 sm:block md:h-36 md:w-52">
                  <FeatureGraphic type={f.graphic} color={f.color} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-display-fredoka)] text-xl font-semibold text-amber-700 sm:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-text-secondary">
                    {f.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-500">
                    Browse templates
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Features 2-4 — 3-column grid */}
          {features.slice(1).map((f) => (
            <div
              key={f.id}
              className="group rounded-[16px] border border-border bg-bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 h-24 w-full">
                <FeatureGraphic type={f.graphic} color={f.color} />
              </div>
              <h3 className="font-[family-name:var(--font-display-fredoka)] text-lg font-semibold text-amber-700">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
