import { describe, it, expect, beforeEach } from "vitest";

// Import the store directly
import { useCharacterStore, defaultCharacterState } from "@/lib/stores/character-store";

describe("URL sharing (store integration)", () => {
  beforeEach(() => {
    // Reset the store before each test
    useCharacterStore.getState().reset();
  });

  it("has default state matching expected values", () => {
    const state = useCharacterStore.getState();
    expect(state.charName).toBe("My Character");
    expect(state.gender).toBe("masculine");
    expect(state.categoryId).toBe("cartoon");
    expect(state.templateId).toBe("cartoon-base-a");
    expect(state.skinTone).toBe("#D4A574");
    expect(state.hairColor).toBe("#3D2314");
    expect(state.backgroundMode).toBe("checker");
  });

  it("can set and get gender", () => {
    const store = useCharacterStore.getState();
    store.setGender("feminine");
    expect(useCharacterStore.getState().gender).toBe("feminine");
  });

  it("can set and get skinTone", () => {
    const store = useCharacterStore.getState();
    store.setSkinTone("#FF0000");
    expect(useCharacterStore.getState().skinTone).toBe("#FF0000");
  });

  it("can select a category and reset template", () => {
    const store = useCharacterStore.getState();
    store.selectCategory("fantasy");
    const state = useCharacterStore.getState();
    expect(state.categoryId).toBe("fantasy");
    // Template is nulled when switching categories
    expect(state.templateId).toBeNull();
  });

  it("can set outfit colors", () => {
    const store = useCharacterStore.getState();
    store.setOutfitColor("primary", "#FF5733");
    expect(useCharacterStore.getState().outfitColors.primary).toBe("#FF5733");
  });

  it("can toggle accessory state", () => {
    const store = useCharacterStore.getState();
    store.toggleAccessory("hat");
    expect(useCharacterStore.getState().accessories.toggles.hat).toBe(true);
    store.toggleAccessory("hat");
    expect(useCharacterStore.getState().accessories.toggles.hat).toBe(false);
  });

  it("can randomize all properties atomically", () => {
    const before = useCharacterStore.getState();
    useCharacterStore.getState().randomize();
    const after = useCharacterStore.getState();
    // After randomize, at least some properties should differ
    // (very unlikely that all props stay the same after randomizing)
    const changed =
      before.gender !== after.gender ||
      before.bodyType !== after.bodyType ||
      before.skinTone !== after.skinTone ||
      before.hairColor !== after.hairColor;
    expect(changed).toBe(true);
  });

  it("can reset to default state", () => {
    const store = useCharacterStore.getState();
    store.setGender("feminine");
    store.setSkinTone("#000000");
    store.setHairColor("#FFFFFF");

    store.reset();

    const state = useCharacterStore.getState();
    expect(state.gender).toBe(defaultCharacterState.gender);
    expect(state.skinTone).toBe(defaultCharacterState.skinTone);
    expect(state.hairColor).toBe(defaultCharacterState.hairColor);
  });
});
