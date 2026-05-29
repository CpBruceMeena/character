export interface GalleryExample {
  id: string;
  name: string;
  description: string;
  category: string;
  templateId: string;
  /** State overrides applied on top of each template's defaults */
  state: Record<string, unknown>;
}

const cartoonState = {
  categoryId: "cartoon",
} as const;

const fantasyState = {
  categoryId: "fantasy",
} as const;

export const GALLERY_EXAMPLES: GalleryExample[] = [
  {
    id: "cartoon-cheerful",
    name: "Sunny",
    description: "A bright, cheerful cartoon character with a warm smile and casual style.",
    category: "Cartoon",
    templateId: "cartoon-base-a",
    state: {
      ...cartoonState,
      skinTone: "#F5D6C6",
      hairColor: "#E94560",
      hairStyle: "curly",
      expression: "happy",
      outfit: "casual",
      outfitColors: {
        primary: "#F07B3F",
        secondary: "#FFD460",
        accent: "#C0392B",
      },
      height: 55,
      width: 50,
      headSize: 48,
      limbProportions: 50,
      backgroundMode: "solid",
      background: { type: "solid", color: "#fffbeb" },
    },
  },
  {
    id: "cartoon-serious",
    name: "Nova",
    description: "Cool and collected with a sharp formal look and a piercing expression.",
    category: "Cartoon",
    templateId: "cartoon-base-a",
    state: {
      ...cartoonState,
      skinTone: "#C68642",
      hairColor: "#1A1A2E",
      hairStyle: "short",
      expression: "serious",
      outfit: "formal",
      outfitColors: {
        primary: "#2D4059",
        secondary: "#D4A574",
        accent: "#6C8EBF",
      },
      height: 60,
      width: 45,
      headSize: 42,
      limbProportions: 55,
      backgroundMode: "solid",
      background: { type: "solid", color: "#f0ede8" },
    },
  },
  {
    id: "cartoon-sporty",
    name: "Rocket",
    description: "Energetic and athletic with a sporty outfit and vibrant colours.",
    category: "Cartoon",
    templateId: "cartoon-base-a",
    state: {
      ...cartoonState,
      skinTone: "#D4A574",
      hairColor: "#3D2314",
      hairStyle: "ponytail",
      expression: "happy",
      outfit: "sporty",
      outfitColors: {
        primary: "#2ECC71",
        secondary: "#A3DE83",
        accent: "#27AE60",
      },
      height: 50,
      width: 52,
      headSize: 45,
      limbProportions: 60,
      backgroundMode: "solid",
      background: { type: "solid", color: "#ecfdf5" },
    },
  },
  {
    id: "knight-crimson",
    name: "Crimson Knight",
    description: "A stalwart knight in gleaming armour with a flowing crimson cape.",
    category: "Fantasy",
    templateId: "fantasy-knight",
    state: {
      ...fantasyState,
      skinTone: "#D4A574",
      expression: "neutral",
      outfitColors: {
        primary: "#6B7280",
        secondary: "#8B0000",
        accent: "#C0392B",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#1a1a2e" },
    },
  },
  {
    id: "knight-golden",
    name: "Golden Sentinel",
    description: "A regal protector adorned in gold-trimmed armour with a royal purple cape.",
    category: "Fantasy",
    templateId: "fantasy-knight",
    state: {
      ...fantasyState,
      skinTone: "#F5D6C6",
      expression: "serious",
      outfitColors: {
        primary: "#B8860B",
        secondary: "#533483",
        accent: "#FBBF24",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#fffbeb" },
    },
  },
  {
    id: "knight-shadow",
    name: "Shadow Warden",
    description: "An enigmatic warrior draped in dark steel with haunting violet accents.",
    category: "Fantasy",
    templateId: "fantasy-knight",
    state: {
      ...fantasyState,
      skinTone: "#8B5E3C",
      expression: "neutral",
      outfitColors: {
        primary: "#374151",
        secondary: "#2D1B4E",
        accent: "#7C3AED",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#0f0f1a" },
    },
  },
];
