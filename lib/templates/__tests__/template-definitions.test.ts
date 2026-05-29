import { describe, it, expect } from "vitest";
import type { CategoryId } from "../schema";
import { getFullRegistry, getCategories, getTemplate, getTemplatesForCategory } from "../registry";

// Import all template side effects to register them at module load time
import "../definitions/cartoon-base-a";
import "../definitions/fantasy-knight";
import "../definitions/sci-fi-armor";
import "../definitions/steampunk-explorer";
import "../definitions/modern-casual";
import "../definitions/samurai";

// Registry is populated synchronously by the side-effect imports above
const registry = getFullRegistry();

const TEMPLATE_IDS = ["cartoon-base-a", "fantasy-knight", "sci-fi-armor", "steampunk-explorer", "modern-casual", "samurai"];

const EXPECTED_META: Record<string, { category: CategoryId; name: string }> = {
  "cartoon-base-a": { category: "cartoon", name: "Base A" },
  "fantasy-knight": { category: "fantasy", name: "Knight" },
  "sci-fi-armor": { category: "sci-fi", name: "Space Armor" },
  "steampunk-explorer": { category: "modern", name: "Steampunk Explorer" },
  "modern-casual": { category: "modern", name: "Street Style" },
  "samurai": { category: "historical", name: "Samurai" },
};

describe("Template Registry", () => {
  it("registers all 6 templates", () => {
    expect(Object.keys(registry.templates).sort()).toEqual([...TEMPLATE_IDS].sort());
  });

  it("has 5 category definitions", () => {
    expect(registry.categories).toHaveLength(5);
  });

  it("maps each category to correct template IDs", () => {
    const cat = getCategories().find((c) => c.id === "cartoon");
    expect(cat?.templateIds).toContain("cartoon-base-a");

    const fantasy = getCategories().find((c) => c.id === "fantasy");
    expect(fantasy?.templateIds).toContain("fantasy-knight");

    const scifi = getCategories().find((c) => c.id === "sci-fi");
    expect(scifi?.templateIds).toContain("sci-fi-armor");

    const modern = getCategories().find((c) => c.id === "modern");
    expect(modern?.templateIds).toContain("steampunk-explorer");
    expect(modern?.templateIds).toContain("modern-casual");

    const historical = getCategories().find((c) => c.id === "historical");
    expect(historical?.templateIds).toContain("samurai");
  });

  it("returns templates for each category", () => {
    const cartoonTemplates = getTemplatesForCategory("cartoon");
    expect(cartoonTemplates).toHaveLength(1);
    expect(cartoonTemplates[0].id).toBe("cartoon-base-a");

    const modernTemplates = getTemplatesForCategory("modern");
    expect(modernTemplates).toHaveLength(2);

    const historicalTemplates = getTemplatesForCategory("historical");
    expect(historicalTemplates).toHaveLength(1);
    expect(historicalTemplates[0].id).toBe("samurai");
  });

  it("returns all 6 templates from getAllTemplates if available", () => {
    const all = Object.values(registry.templates);
    expect(all).toHaveLength(6);
  });

  it("getTemplate returns correct template by ID", () => {
    const t = getTemplate("fantasy-knight");
    expect(t).toBeDefined();
    expect(t?.name).toBe("Knight");
  });

  it("getTemplate returns undefined for missing ID", () => {
    expect(getTemplate("non-existent")).toBeUndefined();
  });

  it("categories are sorted by order", () => {
    const cats = getCategories();
    for (let i = 1; i < cats.length; i++) {
      expect(cats[i].order).toBeGreaterThanOrEqual(cats[i - 1].order);
    }
  });

  it("categories have unique IDs", () => {
    const ids = registry.categories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each category has required fields", () => {
    for (const cat of registry.categories) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(typeof cat.description).toBe("string");
      expect(Array.isArray(cat.templateIds)).toBe(true);
      expect(typeof cat.order).toBe("number");
    }
  });

  it("template IDs in categories exist in registry", () => {
    for (const cat of registry.categories) {
      for (const tid of cat.templateIds) {
        expect(registry.templates[tid]).toBeDefined();
      }
    }
  });
});

describe("Template Structural Validation", () => {
  for (const id of TEMPLATE_IDS) {
    const template = registry.templates[id];
    if (!template) continue;

    const meta = EXPECTED_META[id];

    describe(`${meta.name} (${id})`, () => {
      it("has all required top-level fields", () => {
        expect(template.id).toBe(id);
        expect(template.name).toBeTruthy();
        expect(template.category).toBe(meta.category);
        expect(template.thumbnailSvg).toContain("<svg");
        expect(Array.isArray(template.layers)).toBe(true);
        expect(Array.isArray(template.controls)).toBe(true);
      });

      it("has at least one layer", () => {
        expect(template.layers.length).toBeGreaterThan(0);
      });

      it("has at least one control", () => {
        expect(template.controls.length).toBeGreaterThan(0);
      });

      it("has a valid category", () => {
        const validCategories: CategoryId[] = ["cartoon", "fantasy", "sci-fi", "modern", "historical"];
        expect(validCategories).toContain(template.category);
      });

      // ── Layer validation ──

      it("has unique layer IDs", () => {
        const ids = template.layers.map((l) => l.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("has unique layer names", () => {
        const names = template.layers.map((l) => l.name);
        expect(new Set(names).size).toBe(names.length);
      });

      it("all layers have required fields", () => {
        for (const layer of template.layers) {
          expect(layer.id).toBeTruthy();
          expect(layer.name).toBeTruthy();
          expect(typeof layer.zIndex).toBe("number");
          expect(typeof layer.defaultVisible).toBe("boolean");
          expect(layer.inlineSvg).toContain("<svg");
          expect(layer.inlineSvg).toContain("</svg>");
          expect(Array.isArray(layer.colorZones)).toBe(true);
        }
      });

      it("all layers have integer zIndex values", () => {
        for (const layer of template.layers) {
          expect(Number.isInteger(layer.zIndex)).toBe(true);
        }
      });

      it("layer conditions reference valid expression values", () => {
        const validExpressions = ["neutral", "happy", "serious", "surprised", "sad"];
        for (const layer of template.layers) {
          if (layer.condition?.expression) {
            for (const expr of layer.condition.expression) {
              expect(validExpressions).toContain(expr);
            }
          }
          if (layer.condition?.eyeSize) {
            const es = layer.condition.eyeSize;
            if (es.min !== undefined && es.max !== undefined) {
              expect(es.max).toBeGreaterThan(es.min);
            }
          }
        }
      });

      it("layer parentLayer references an existing layer", () => {
        const layerIds = new Set(template.layers.map((l) => l.id));
        for (const layer of template.layers) {
          if (layer.parentLayer) {
            expect(layerIds.has(layer.parentLayer)).toBe(true);
          }
        }
      });

      it("self-parenting is not allowed", () => {
        for (const layer of template.layers) {
          expect(layer.parentLayer).not.toBe(layer.id);
        }
      });

      it("color zones on layers have valid hex colors", () => {
        for (const layer of template.layers) {
          for (const cz of layer.colorZones) {
            expect(cz.id).toBeTruthy();
            expect(cz.selector).toBeTruthy();
            expect(cz.defaultColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
            expect(cz.propertyPath).toBeTruthy();
          }
        }
      });

      it("conditional layers are visible by default", () => {
        for (const layer of template.layers) {
          if (layer.condition) {
            expect(layer.defaultVisible).toBe(true);
          }
        }
      });

      // ── Control validation ──

      it("has unique control IDs", () => {
        const ids = template.controls.map((c) => c.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("all controls have required fields", () => {
        for (const ctrl of template.controls) {
          expect(ctrl.id).toBeTruthy();
          expect(ctrl.type).toMatch(/^(slider|toggle|color|select|group)$/);
          expect(ctrl.label).toBeTruthy();
          expect(ctrl.section).toMatch(/^(identity|body|face|hair|clothing|accessories)$/);
          expect(Array.isArray(ctrl.targets)).toBe(true);
          expect(ctrl.targets.length).toBeGreaterThan(0);
        }
      });

      it("slider controls have valid range fields", () => {
        for (const ctrl of template.controls) {
          if (ctrl.type === "slider") {
            expect(ctrl.min).toBeDefined();
            expect(ctrl.max).toBeDefined();
            expect(ctrl.step).toBeDefined();
            expect(typeof ctrl.defaultValue).toBe("number");
            expect(ctrl.min).toBeLessThan(ctrl.max!);
          }
        }
      });

      it("select controls have valid options", () => {
        for (const ctrl of template.controls) {
          if (ctrl.type === "select") {
            expect(Array.isArray(ctrl.options)).toBe(true);
            expect(ctrl.options!.length).toBeGreaterThanOrEqual(2);
            const values = ctrl.options!.map((o) => o.value);
            expect(new Set(values).size).toBe(values.length);
          }
        }
      });

      it("toggle controls have boolean default", () => {
        for (const ctrl of template.controls) {
          if (ctrl.type === "toggle") {
            expect(typeof ctrl.defaultValue).toBe("boolean");
          }
        }
      });

      it("color controls have valid hex default", () => {
        for (const ctrl of template.controls) {
          if (ctrl.type === "color") {
            expect(ctrl.defaultValue).toMatch(/^#[0-9A-Fa-f]{6}$/);
          }
        }
      });
    });
  }
});

describe("Thumbnail Validation", () => {
  for (const id of TEMPLATE_IDS) {
    const template = registry.templates[id];
    if (!template) continue;

    it(`${template.name} has a valid thumbnail SVG`, () => {
      expect(template.thumbnailSvg).toContain("<svg");
      expect(template.thumbnailSvg).toContain("</svg>");
      expect(template.thumbnailSvg).toMatch(/viewBox="\d+ \d+ \d+ \d+"/);
    });
  }
});

describe("Cross-template Validation", () => {
  it("all templates have at least one color zone somewhere", () => {
    for (const template of Object.values(registry.templates)) {
      const hasZone = template.layers.some((l) => l.colorZones.length > 0);
      expect(hasZone).toBe(true);
    }
  });

  it("all templates have at least one toggle control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasToggle = template.controls.some((c) => c.type === "toggle");
      expect(hasToggle).toBe(true);
    }
  });

  it("all templates have at least one color control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasColor = template.controls.some((c) => c.type === "color");
      expect(hasColor).toBe(true);
    }
  });

  it("all templates have at least one slider control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasSlider = template.controls.some((c) => c.type === "slider");
      expect(hasSlider).toBe(true);
    }
  });

  it("all templates have an identity section control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasIdentity = template.controls.some((c) => c.section === "identity");
      expect(hasIdentity).toBe(true);
    }
  });

  it("all templates have a face section control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasFace = template.controls.some((c) => c.section === "face");
      expect(hasFace).toBe(true);
    }
  });

  it("all templates have a body section control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasBody = template.controls.some((c) => c.section === "body");
      expect(hasBody).toBe(true);
    }
  });

  it("all templates have a clothing section control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasClothing = template.controls.some((c) => c.section === "clothing");
      expect(hasClothing).toBe(true);
    }
  });

  it("all templates have an accessories section control", () => {
    for (const template of Object.values(registry.templates)) {
      const hasAcc = template.controls.some((c) => c.section === "accessories");
      expect(hasAcc).toBe(true);
    }
  });

  it("all templates have at least one visible by default layer", () => {
    for (const template of Object.values(registry.templates)) {
      const hasVisible = template.layers.some((l) => l.defaultVisible);
      expect(hasVisible).toBe(true);
    }
  });

  it("conditional layers have valid eyeSize ranges when specified", () => {
    for (const template of Object.values(registry.templates)) {
      for (const layer of template.layers) {
        if (layer.condition?.eyeSize) {
          const es = layer.condition.eyeSize;
          if (es.min !== undefined && es.max !== undefined) {
            expect(es.max).toBeGreaterThan(es.min);
          }
        }
      }
    }
  });
});
