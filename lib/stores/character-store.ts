import { create } from "zustand";
import { temporal, type TemporalState } from "zundo";

/* ── Types ── */

export type Gender = "masculine" | "feminine" | "androgynous";
export type BackgroundType = "solid" | "gradient" | "transparent";
export type BackgroundMode = "checker" | "solid" | "gradient";

export interface Background {
  type: BackgroundType;
  color: string;
  secondaryColor?: string;
}

export interface CharacterState {
  // Identity
  charName: string;
  gender: Gender;
  bodyType: string;

  // Template
  categoryId: string | null;
  templateId: string | null;

  // Body
  height: number;
  width: number;
  headSize: number;
  limbProportions: number;
  leftRightVariation: Record<string, number>;
  partVisibility: Record<string, boolean>;

  // Face
  eyeSize: number;
  expression: string;
  skinTone: string;

  // Hair
  hairStyle: string;
  hairColor: string;

  // Clothing
  outfit: string;
  outfitColors: Record<string, string>;

  // Accessories — toggles + options split per eng review
  accessories: {
    toggles: Record<string, boolean>;
    options: Record<string, string>;
  };

  // Background
  background: Background;
  backgroundMode: BackgroundMode;
}

export interface CharacterActions {
  setName: (name: string) => void;
  setGender: (gender: Gender) => void;
  setBodyType: (type: string) => void;
  selectCategory: (id: string) => void;
  selectTemplate: (id: string) => void;
  setHeight: (v: number) => void;
  setWidth: (v: number) => void;
  setHeadSize: (v: number) => void;
  setLimbProportions: (v: number) => void;
  setLeftRightVariation: (part: string, value: number) => void;
  setPartVisibility: (part: string, visible: boolean) => void;
  setEyeSize: (v: number) => void;
  setExpression: (e: string) => void;
  setSkinTone: (t: string) => void;
  setHairStyle: (s: string) => void;
  setHairColor: (c: string) => void;
  setOutfit: (o: string) => void;
  setOutfitColor: (zone: string, color: string) => void;
  toggleAccessory: (id: string) => void;
  setAccessoryOption: (id: string, value: string) => void;
  setBackground: (bg: Background) => void;
  setBackgroundMode: (mode: BackgroundMode) => void;
  randomize: () => void;
  reset: () => void;
}

/* ── Default state ── */

export const defaultCharacterState: CharacterState = {
  charName: "My Character",
  gender: "masculine",
  bodyType: "athletic",

  categoryId: "cartoon",
  templateId: "base-a",

  height: 55,
  width: 50,
  headSize: 45,
  limbProportions: 50,
  leftRightVariation: {},
  partVisibility: {
    head: true,
    torso: true,
    arms: true,
    legs: true,
  },

  eyeSize: 60,
  expression: "neutral",
  skinTone: "#D4A574",

  hairStyle: "short",
  hairColor: "#3D2314",

  outfit: "casual",
  outfitColors: {
    primary: "#4A6FA5",
    secondary: "#D4A574",
    accent: "#C0392B",
  },

  accessories: {
    toggles: {},
    options: {},
  },

  background: {
    type: "solid",
    color: "#f0ede8",
  },
  backgroundMode: "checker",
};

/* ── Store with temporal middleware (undo/redo) ── */

export const useCharacterStore = create<CharacterState & CharacterActions>()(
  temporal(
    (set, get) => ({
      ...defaultCharacterState,

      setName: (name) => set({ charName: name }),
      setGender: (gender) => set({ gender }),
      setBodyType: (bodyType) => set({ bodyType }),

      selectCategory: (categoryId) =>
        set({
          categoryId,
          templateId: null,
          partVisibility: {
            head: true,
            torso: true,
            arms: true,
            legs: true,
          },
        }),

      selectTemplate: (templateId) => set({ templateId }),

      setHeight: (height) => set({ height }),
      setWidth: (width) => set({ width }),
      setHeadSize: (headSize) => set({ headSize }),
      setLimbProportions: (limbProportions) => set({ limbProportions }),
      setLeftRightVariation: (part, value) =>
        set((s) => ({
          leftRightVariation: { ...s.leftRightVariation, [part]: value },
        })),
      setPartVisibility: (part, visible) =>
        set((s) => ({
          partVisibility: { ...s.partVisibility, [part]: visible },
        })),

      setEyeSize: (eyeSize) => set({ eyeSize }),
      setExpression: (expression) => set({ expression }),
      setSkinTone: (skinTone) => set({ skinTone }),

      setHairStyle: (hairStyle) => set({ hairStyle }),
      setHairColor: (hairColor) => set({ hairColor }),

      setOutfit: (outfit) => set({ outfit }),
      setOutfitColor: (zone, color) =>
        set((s) => ({
          outfitColors: { ...s.outfitColors, [zone]: color },
        })),

      toggleAccessory: (id) =>
        set((s) => ({
          accessories: {
            ...s.accessories,
            toggles: {
              ...s.accessories.toggles,
              [id]: !s.accessories.toggles[id],
            },
          },
        })),

      setAccessoryOption: (id, value) =>
        set((s) => ({
          accessories: {
            ...s.accessories,
            options: { ...s.accessories.options, [id]: value },
          },
        })),

      setBackground: (background) => set({ background }),

      setBackgroundMode: (backgroundMode) => set({ backgroundMode }),

      // Atomic randomize — one undo step per eng review
      randomize: () =>
        set({
          gender: (["masculine", "feminine", "androgynous"] as const)[
            Math.floor(Math.random() * 3)
          ],
          bodyType: (["slim", "athletic", "curvy", "broad", "petite"] as const)[
            Math.floor(Math.random() * 5)
          ],
          height: Math.floor(Math.random() * 60) + 20,
          width: Math.floor(Math.random() * 60) + 20,
          headSize: Math.floor(Math.random() * 50) + 25,
          limbProportions: Math.floor(Math.random() * 60) + 20,
          eyeSize: Math.floor(Math.random() * 60) + 20,
          expression: (["neutral", "happy", "serious", "surprised", "sad"] as const)[
            Math.floor(Math.random() * 5)
          ],
          skinTone: ["#D4A574", "#C68642", "#8B5E3C", "#F5D6C6", "#E8B89D"][
            Math.floor(Math.random() * 5)
          ],
          hairStyle: (["short", "long", "curly", "wavy", "ponytail", "bun"] as const)[
            Math.floor(Math.random() * 6)
          ],
          hairColor: ["#3D2314", "#1A1A2E", "#E94560", "#FFD460", "#A3DE83"][
            Math.floor(Math.random() * 5)
          ],
          outfit: (["casual", "formal", "sporty", "armor", "robe"] as const)[
            Math.floor(Math.random() * 5)
          ],
          outfitColors: {
            primary: ["#4A6FA5", "#2ECC71", "#E94560", "#F07B3F", "#533483"][
              Math.floor(Math.random() * 5)
            ],
            secondary: ["#D4A574", "#A3DE83", "#FFD460", "#88B0D9", "#F5D6C6"][
              Math.floor(Math.random() * 5)
            ],
            accent: ["#C0392B", "#27AE60", "#2D4059", "#EA5455", "#6C8EBF"][
              Math.floor(Math.random() * 5)
            ],
          },
          backgroundMode: (["checker", "solid", "gradient"] as const)[
            Math.floor(Math.random() * 3)
          ],
        }),

      // Atomic reset
      reset: () => set({ ...defaultCharacterState }),
    }),
    {
      limit: 100,
      partialize: undefined,
    }
  )
);

/* ── Temporal store accessors (undo/redo) ── */

export type CharacterTemporalState = TemporalState<Partial<CharacterState>>;

// Hook to get temporal store state + helpers for reactive components
export function getTemporalState(): CharacterTemporalState {
  return (useCharacterStore as any).temporal.getState() as CharacterTemporalState;
}

export function undo() {
  getTemporalState().undo();
}

export function redo() {
  getTemporalState().redo();
}

export function clearHistory() {
  getTemporalState().clear();
}
