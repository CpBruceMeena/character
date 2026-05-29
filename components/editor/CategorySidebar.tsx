"use client";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface Template {
  id: string;
  label: string;
  thumbnail: string;
}

interface CategorySidebarProps {
  categories: Category[];
  templates: Template[];
  selectedCategory: string;
  selectedTemplate: string;
  onSelectCategory: (id: string) => void;
  onSelectTemplate: (id: string) => void;
  isOpen: boolean;
}

/* ── Category icon SVGs ── */
function CategoryIcon({ id }: { id: string }) {
  const cls = "h-4 w-4";
  switch (id) {
    case "cartoon":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="8" r="5" className="fill-amber-400" />
          <path d="M4 16c0-4 3-7 6-7s6 3 6 7" className="fill-amber-300" />
        </svg>
      );
    case "sci-fi":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none">
          <path d="M10 2l6 4v8l-6 4-6-4V6l6-4z" className="fill-teal-400" />
          <circle cx="10" cy="10" r="3" className="fill-teal-300" />
        </svg>
      );
    case "modern":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1.5" className="fill-amber-400" />
          <rect x="11" y="3" width="6" height="6" rx="1.5" className="fill-amber-300" />
          <rect x="3" y="11" width="6" height="6" rx="1.5" className="fill-amber-300" />
          <rect x="11" y="11" width="6" height="6" rx="1.5" className="fill-amber-200" />
        </svg>
      );
    case "historical":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none">
          <path d="M10 3l6 3v6c0 4-6 8-6 8s-6-4-6-8V6l6-3z" className="fill-amber-400" />
          <path d="M7 9l2 3 4-5" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <div className="h-4 w-4 rounded-full bg-gray-300" />;
  }
}

/* ── Template thumbnail placeholder ── */
function TemplateThumb({ label, selected }: { label: string; selected: boolean }) {
  return (
    <div
      className={`flex aspect-[3/4] cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 p-2 transition-all duration-150 ${
        selected
          ? "border-amber-400 bg-amber-50 shadow-sm"
          : "border-border bg-bg-card hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-5 4-8 8-8s8 3 8 8" />
        </svg>
      </div>
      <span className={`text-[11px] font-medium ${selected ? "text-amber-700" : "text-text-tertiary"}`}>
        {label}
      </span>
    </div>
  );
}

export function CategorySidebar({
  categories,
  templates,
  selectedCategory,
  selectedTemplate,
  onSelectCategory,
  onSelectTemplate,
  isOpen,
}: CategorySidebarProps) {
  const currentCat = categories.find((c) => c.id === selectedCategory);

  return (
    <aside
      data-onboarding-target="sidebar-categories"
      className={`flex flex-col border-r border-border bg-bg-card transition-all duration-200 ${
        isOpen ? "w-[220px] min-w-[220px]" : "w-0 min-w-0 overflow-hidden"
      }`}
    >
      <div className="flex-1 overflow-y-auto p-3">
        {/* Category list */}
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
          Categories
        </h3>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectTemplate("base-a");
                }}
                className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-amber-100 font-medium text-amber-800"
                    : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                }`}
              >
                <CategoryIcon id={cat.id} />
                <span className="flex-1">{cat.label}</span>
                <span className="text-[11px] text-text-tertiary">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="my-3 border-t border-border" />

        {/* Templates for selected category */}
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
          {currentCat?.label ?? "Category"} Templates
        </h3>

        {templates.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelectTemplate(tmpl.id)}
                aria-label={`Select ${tmpl.label} template`}
              >
                <TemplateThumb label={tmpl.label} selected={selectedTemplate === tmpl.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[10px] border border-dashed border-border bg-gray-50/50 p-4 text-center text-xs text-text-tertiary">
            No templates yet for this category.
            <br />
            <span className="italic">Coming soon!</span>
          </div>
        )}

        {/* Loading skeleton placeholder */}
        <div className="mt-2 animate-pulse space-y-2">
          <div className="h-2 w-2/3 rounded bg-gray-200" />
          <div className="h-2 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </aside>
  );
}
