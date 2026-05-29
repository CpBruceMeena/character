"use client";

/* ── Template category data ── */

interface Category {
  id: string;
  label: string;
  count: number;
  color: string;       // Tailwind border/ring color
  bgColor: string;     // Card background
  accent: string;      // Accent element color
  icon: "fantasy" | "sci-fi" | "modern" | "historical";
}

const categories: Category[] = [
  {
    id: "fantasy",
    label: "Fantasy",
    count: 18,
    color: "border-coral-300 group-hover:border-coral-400",
    bgColor: "bg-coral-50",
    accent: "fill-coral-400",
    icon: "fantasy",
  },
  {
    id: "scifi",
    label: "Sci-Fi",
    count: 14,
    color: "border-teal-300 group-hover:border-teal-400",
    bgColor: "bg-teal-50",
    accent: "fill-teal-500",
    icon: "sci-fi",
  },
  {
    id: "modern",
    label: "Modern",
    count: 12,
    color: "border-amber-300 group-hover:border-amber-400",
    bgColor: "bg-amber-50",
    accent: "fill-amber-500",
    icon: "modern",
  },
  {
    id: "historical",
    label: "Historical",
    count: 10,
    color: "border-amber-200 group-hover:border-amber-300",
    bgColor: "bg-amber-50/50",
    accent: "fill-amber-400",
    icon: "historical",
  },
];

/* ── Category icon SVGs ── */

function CategoryIcon({ type, fillClass }: { type: Category["icon"]; fillClass: string }) {
  if (type === "fantasy") {
    return (
      <svg viewBox="0 0 48 48" className={fillClass} fill="none">
        {/* Star/crystal shape */}
        <path d="M24 4l6 14 16 2-12 10 4 16-14-8-14 8 4-16L2 20l16-2L24 4z" className={fillClass} opacity={0.7} />
        <circle cx="24" cy="22" r="6" fill="white" opacity={0.3} />
      </svg>
    );
  }
  if (type === "sci-fi") {
    return (
      <svg viewBox="0 0 48 48" className={fillClass} fill="none">
        {/* Hexagon */}
        <path d="M24 4l16 9v18L24 44 8 31V13l16-9z" className={fillClass} opacity={0.7} />
        <circle cx="24" cy="24" r="8" fill="white" opacity={0.3} />
        <rect x="22" y="12" width="4" height="24" rx="2" fill="white" opacity={0.15} />
      </svg>
    );
  }
  if (type === "modern") {
    return (
      <svg viewBox="0 0 48 48" className={fillClass} fill="none">
        {/* Grid/tiles */}
        <rect x="6" y="6" width="16" height="16" rx="4" className={fillClass} opacity={0.7} />
        <rect x="26" y="6" width="16" height="16" rx="4" className={fillClass} opacity={0.5} />
        <rect x="6" y="26" width="16" height="16" rx="4" className={fillClass} opacity={0.5} />
        <rect x="26" y="26" width="16" height="16" rx="4" className={fillClass} opacity={0.3} />
      </svg>
    );
  }
  // historical
  return (
    <svg viewBox="0 0 48 48" className={fillClass} fill="none">
      {/* Shield */}
      <path d="M24 4l16 8v16c0 12-16 20-16 20S8 40 8 28V12l16-8z" className={fillClass} opacity={0.7} />
      <path d="M18 22l4 6 8-10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
    </svg>
  );
}

/* ── Section ── */

export function CategoryShowcase() {
  return (
    <section className="bg-bg-page px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading row */}
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-[family-name:var(--font-display-fredoka)] text-4xl font-bold leading-tight text-amber-800 sm:text-5xl">
            Pick your world.
          </h2>
        </div>
        <p className="mb-12 max-w-lg text-lg leading-relaxed text-text-secondary">
          Fantasy, sci-fi, modern, or historical — each category comes with
          curated templates, color palettes, and part presets.
        </p>

        {/* Category cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/templates/${cat.id}`}
              className={`group relative flex flex-col items-center rounded-[16px] border-2 ${cat.color} ${cat.bgColor} p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Icon */}
              <div className="mb-4 h-16 w-16">                  <CategoryIcon type={cat.icon} fillClass={cat.accent} />
              </div>

              {/* Label */}
              <h3 className="font-[family-name:var(--font-display-fredoka)] text-xl font-semibold text-amber-800">
                {cat.label}
              </h3>

              {/* Count */}
              <p className="mt-1 text-sm text-text-tertiary">
                {cat.count} template{cat.count !== 1 ? "s" : ""}
              </p>

              {/* Explore link */}
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-amber-500 opacity-0 transition-all duration-200 group-hover:opacity-100">
                Explore {cat.label.toLowerCase()}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <a href="/templates" className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 underline-offset-4 hover:underline">
            View all {categories.reduce((sum, c) => sum + c.count, 0)} templates
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
