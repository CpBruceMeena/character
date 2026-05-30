import { describe, it, expect } from "vitest";
import { exportCharacter, type ExportOptions } from "../export";

// A minimal mock template for export testing
const mockTemplate = {
  id: "test-template",
  name: "Test Template",
  category: "cartoon" as const,
  thumbnailSvg: `<svg viewBox="0 0 60 80"><rect width="60" height="80" fill="red"/></svg>`,
  layers: [
    {
      id: "body",
      name: "Body",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "skin", name: "Skin", selector: "skin", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180"><ellipse cx="60" cy="80" rx="40" ry="60" data-colorzone="skin" fill="#D4A574"/></svg>`,
    },
    {
      id: "eyes",
      name: "Eyes",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180"><circle cx="45" cy="40" r="5" fill="#000"/><circle cx="75" cy="40" r="5" fill="#000"/></svg>`,
    },
  ],
  controls: [],
};

const mockState: Record<string, unknown> = {
  charName: "Test Character",
  skinTone: "#D4A574",
  outfitColors: { primary: "#4A6FA5", secondary: "#D4A574", accent: "#C0392B" },
  backgroundMode: "checker",
};

function makeOptions(overrides?: Partial<ExportOptions>): ExportOptions {
  return {
    template: mockTemplate as unknown as ExportOptions["template"],
    state: mockState,
    width: 120,
    height: 180,
    format: "svg",
    scale: 1,
    ...overrides,
  };
}

describe("exportCharacter (SVG)", () => {
  it("exports SVG format as a blob with correct MIME type", async () => {
    const result = await exportCharacter(makeOptions());

    expect(result.blob.type).toBe("image/svg+xml;charset=utf-8");
    expect(result.filename).toMatch(/\.svg$/);
  });

  it("generates a valid SVG string", async () => {
    const result = await exportCharacter(makeOptions());

    const svgText = await result.blob.text();
    expect(svgText).toContain("<svg");
    expect(svgText).toContain("</svg>");
    expect(svgText).toContain("viewBox");
  });

  it("includes SVG namespace", async () => {
    const result = await exportCharacter(makeOptions());
    const svgText = await result.blob.text();
    expect(svgText).toContain("xmlns");
  });

  it("includes the adjusted viewBox from width/height params", async () => {
    const result = await exportCharacter(makeOptions({ width: 200, height: 300 }));
    const svgText = await result.blob.text();
    expect(svgText).toMatch(/viewBox="0 0 200 300"/);
  });

  it("generates a safe filename from the character name", async () => {
    const result = await exportCharacter(makeOptions());
    expect(result.filename).toBe("test-character.svg");
  });

  it("handles special characters in charName", async () => {
    const specialState = { ...mockState, charName: "My!!! Character_42" };
    const result = await exportCharacter(makeOptions({ state: specialState }));
    expect(result.filename).toBe("my-character_42.svg");
  });

  it("reports the correct byte size", async () => {
    const result = await exportCharacter(makeOptions());
    expect(result.sizeBytes).toBeGreaterThan(0);
    expect(result.sizeBytes).toBe(result.blob.size);
  });

  it("reports dimensions matching width * scale", async () => {
    const result = await exportCharacter(makeOptions({ width: 120, height: 180 }));
    expect(result.width).toBe(120);
    expect(result.height).toBe(180);
  });
});
