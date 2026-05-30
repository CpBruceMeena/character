import { getCategories, getTemplate, getTemplatesForCategory } from "./registry";
import type { CategoryId, TemplateDefinition } from "./schema";

/* ── Simple import-based preloader ── */

/**
 * Import all template definition files for a given category.
 * This fires their `registerTemplate()` side effects so the
 * registry is populated.
 *
 * In Phase 1 all templates are registered via static imports.
 * In Phase 2+ this can switch to dynamic `import()` for code splitting.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for future dynamic import support
async function preloadCategoryTemplates(_categoryId: CategoryId): Promise<void> {
  // Static imports at the top of the file already handle registration.
  // This function exists as an extension point for dynamic loading later.
  //
  // Phase 2 example:
  //   const mods = import.meta.glob(`./definitions/${categoryId}/*.ts`);
  //   await Promise.all(Object.values(mods).map((mod) => mod()));
  return Promise.resolve();
}

/* ── Loader cache ── */

const templateCache = new Map<string, TemplateDefinition[]>();

/**
 * Ensure templates for a category are registered and cached.
 * Returns the resolved template definitions.
 */
export async function loadTemplatesForCategory(
  categoryId: CategoryId
): Promise<TemplateDefinition[]> {
  const cached = templateCache.get(categoryId);
  if (cached) return cached;

  await preloadCategoryTemplates(categoryId);
  const templates = getTemplatesForCategory(categoryId);

  if (templates.length === 0) {
    console.warn(
      `[loader] No templates registered for category "${categoryId}". ` +
        "Did you forget to import the definition file?"
    );
  }

  templateCache.set(categoryId, templates);
  return templates;
}

/**
 * Load a single template by ID. Returns undefined if not found.
 */
export async function loadTemplate(
  templateId: string
): Promise<TemplateDefinition | undefined> {
  const cat = getCategoryForTemplate(templateId);
  if (cat) await preloadCategoryTemplates(cat);
  return getTemplate(templateId);
}

/* ── Helpers ── */

/** Find which category a template belongs to (walks all categories) */
function getCategoryForTemplate(templateId: string): CategoryId | undefined {
  // Lazy scan — fine for Phase 1's small registry
  for (const cat of getCategories()) {
    if (cat.templateIds.includes(templateId)) return cat.id;
  }
  return undefined;
}


