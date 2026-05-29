"use client";

interface Format {
  id: string;
  label: string;
  description: string;
  bestFor: string;
}

const formats: Format[] = [
  {
    id: "png",
    label: "PNG",
    description: "Lossless raster with transparency. Best for web, social media, and game engines.",
    bestFor: "Web & games",
  },
  {
    id: "svg",
    label: "SVG",
    description: "Resolution-independent vector. Scale infinitely, edit paths in any vector tool.",
    bestFor: "Print & vector editing",
  },
  {
    id: "webp",
    label: "WebP",
    description: "Modern compressed format. Smaller files than PNG with identical quality.",
    bestFor: "Web performance",
  },
  {
    id: "jpeg",
    label: "JPEG",
    description: "Universal format with adjustable compression. Works everywhere, no questions asked.",
    bestFor: "Universal compatibility",
  },
];

const formatIcons: Record<string, string> = {
  png: "#22d3ee",
  svg: "#f59e0b",
  webp: "#f85a3e",
  jpeg: "#06b6d4",
};

export function ExportFormats() {
  return (
    <section className="border-t border-border bg-bg-page px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-4 max-w-xl">
          <h2 className="font-[family-name:var(--font-display-fredoka)] text-4xl font-bold leading-tight text-amber-800 sm:text-5xl">
            Export ready.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-text-secondary">
            No lock-in. Download your character in any format, at any resolution
            up to 4K. Transparent backgrounds, sprite sheets, or full-body renders.
          </p>
        </div>

        {/* Format cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((fmt) => (
            <div
              key={fmt.id}
              className="group rounded-[16px] border border-border bg-bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
            >
              {/* Format badge */}
              <div className="mb-3 inline-flex items-center gap-2">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-sm font-bold text-white"
                  style={{ backgroundColor: formatIcons[fmt.id] }}
                >
                  {fmt.label.slice(0, 2)}
                </span>
                <span className="font-[family-name:var(--font-display-fredoka)] text-lg font-semibold text-amber-700">
                  .{fmt.label.toLowerCase()}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                {fmt.description}
              </p>

              <span className="mt-3 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                {fmt.bestFor}
              </span>
            </div>
          ))}
        </div>

        {/* Resolution note */}
        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-[12px] border border-amber-200 bg-amber-50/50 px-5 py-4 text-sm text-amber-700">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Up to <strong>4K (3840×2160)</strong> resolution
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Transparent background support
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Composable sprite sheets
          </span>
        </div>
      </div>
    </section>
  );
}
