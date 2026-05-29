import type {
  CategoryDefinition,
  CategoryId,
  TemplateDefinition,
  TemplateRegistry,
} from "./schema";

/* ── Built-in category definitions ── */

const categories: CategoryDefinition[] = [
  {
    id: "cartoon",
    label: "Cartoon",
    description: "Bold, expressive characters with simplified shapes",
    templateIds: ["cartoon-base-a"],
    order: 0,
  },
  {
    id: "fantasy",
    label: "Fantasy",
    description: "Mythical heroes, knights, and enchanted beings",
    templateIds: ["fantasy-knight"],
    order: 1,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Contemporary urban and casual styles",
    templateIds: [],
    order: 2,
  },
  {
    id: "historical",
    label: "Historical",
    description: "Period-inspired costumes and classic archetypes",
    templateIds: [],
    order: 3,
  },
];

/* ── Lazy-loaded template map (populated via registerTemplate) ── */

const templateMap = new Map<string, TemplateDefinition>();

/**
 * Register a template definition at module-load time.
 * Call this from each template definition file's side effect.
 */
export function registerTemplate(template: TemplateDefinition): void {
  templateMap.set(template.id, template);
}

/* ── Public API ── */

/** All registered categories, sorted by display order */
export function getCategories(): CategoryDefinition[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

/** Look up a single category by ID */
export function getCategory(id: CategoryId): CategoryDefinition | undefined {
  return categories.find((c) => c.id === id);
}

/** Look up a single template by ID */
export function getTemplate(id: string): TemplateDefinition | undefined {
  return templateMap.get(id);
}

/** All templates for a given category (only those registered) */
export function getTemplatesForCategory(
  categoryId: CategoryId
): TemplateDefinition[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  return cat.templateIds
    .map((tid) => templateMap.get(tid))
    .filter((t): t is TemplateDefinition => t !== undefined);
}

/** Convenience: category + its resolved templates in one call */
export function getCategoryWithTemplates(
  categoryId: CategoryId
): { category: CategoryDefinition; templates: TemplateDefinition[] } | null {
  const category = getCategory(categoryId);
  if (!category) return null;
  return {
    category,
    templates: getTemplatesForCategory(categoryId),
  };
}

/** Export the full registry (useful for debugging / dev tools) */
export function getFullRegistry(): TemplateRegistry {
  return {
    categories: getCategories(),
    templates: Object.fromEntries(templateMap),
  };
}
