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

const sciFiState = {
  categoryId: "sci-fi",
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
  // ── Cartoon Pet ──
  {
    id: "pet-golden",
    name: "Golden Retriever",
    description: "A friendly golden-furred pet with floppy ears and a warm, wagging personality.",
    category: "Cartoon",
    templateId: "cartoon-pet",
    state: {
      ...cartoonState,
      skinTone: "#D4A574",
      expression: "happy",
      backgroundMode: "solid",
      background: { type: "solid", color: "#ecfdf5" },
    },
  },
  {
    id: "pet-snow",
    name: "Snow Puff",
    description: "A snowy-white pet with bright eyes, perfect for winter adventures.",
    category: "Cartoon",
    templateId: "cartoon-pet",
    state: {
      ...cartoonState,
      skinTone: "#F5D6C6",
      expression: "neutral",
      backgroundMode: "solid",
      background: { type: "solid", color: "#f0f9ff" },
    },
  },
  // ── Fantasy Elf ──
  {
    id: "elf-verdant",
    name: "Verdant Archer",
    description: "An elven archer in green tunic with a longbow, moving silently through ancient forests.",
    category: "Fantasy",
    templateId: "fantasy-elf",
    state: {
      ...fantasyState,
      skinTone: "#D4A574",
      hairColor: "#FFD460",
      expression: "neutral",
      outfitColors: {
        primary: "#22C55E",
        secondary: "#5C3A21",
        accent: "#FBBF24",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#052e16" },
    },
  },
  {
    id: "elf-moon",
    name: "Moon Shadow",
    description: "A mysterious elven ranger in midnight-blue cloak, eyes gleaming under starlight.",
    category: "Fantasy",
    templateId: "fantasy-elf",
    state: {
      ...fantasyState,
      skinTone: "#C68642",
      hairColor: "#1A1A2E",
      expression: "serious",
      outfitColors: {
        primary: "#1E3A5F",
        secondary: "#0F172A",
        accent: "#94A3B8",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#020617" },
    },
  },
  // ── Sci-Fi Cyborg ──
  {
    id: "cyborg-cobalt",
    name: "Cobalt Unit",
    description: "A cybernetic warrior in cobalt-blue armor with a glowing energy core and scanning visor.",
    category: "Sci-Fi",
    templateId: "sci-fi-cyborg",
    state: {
      ...sciFiState,
      expression: "neutral",
      outfitColors: {
        primary: "#475569",
        secondary: "#334155",
        accent: "#22D3EE",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#020617" },
    },
  },
  {
    id: "cyborg-phantom",
    name: "Phantom Unit",
    description: "A stealth cybernetic operative in dark matte armor with crimson energy accents.",
    category: "Sci-Fi",
    templateId: "sci-fi-cyborg",
    state: {
      ...sciFiState,
      expression: "serious",
      outfitColors: {
        primary: "#1F2937",
        secondary: "#111827",
        accent: "#EF4444",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#000000" },
    },
  },
  // ── Steampunk Explorer ──
  {
    id: "steampunk-brass",
    name: "Brass Navigator",
    description: "A steampunk explorer in a brass-trimmed vest and goggles, ready for adventure.",
    category: "Historical",
    templateId: "steampunk-explorer",
    state: {
      categoryId: "historical",
      skinTone: "#D4A574",
      hairColor: "#5C4033",
      expression: "happy",
      outfitColors: {
        primary: "#F5F0EB",
        secondary: "#8B5E3C",
        accent: "#B8860B",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#fef3c7" },
    },
  },
  {
    id: "steampunk-crimson",
    name: "Crimson Voyager",
    description: "A daring explorer in a deep crimson vest with polished brass and a compass at their side.",
    category: "Historical",
    templateId: "steampunk-explorer",
    state: {
      categoryId: "historical",
      skinTone: "#C68642",
      hairColor: "#4A3525",
      expression: "serious",
      outfitColors: {
        primary: "#F5F0EB",
        secondary: "#8B0000",
        accent: "#D4A84B",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#1c1917" },
    },
  },
  // ── Modern Casual (Street Style) ──
  {
    id: "casual-ocean",
    name: "Ocean Breeze",
    description: "A relaxed street-style look with a blue hoodie and crisp white sneakers.",
    category: "Modern",
    templateId: "modern-casual",
    state: {
      categoryId: "modern",
      skinTone: "#F5D6C6",
      hairColor: "#3D2314",
      hairStyle: "long",
      expression: "happy",
      outfitColors: {
        primary: "#3B82F6",
        secondary: "#1F2937",
        accent: "#FFFFFF",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#eff6ff" },
    },
  },
  {
    id: "casual-ember",
    name: "Ember Night",
    description: "A cozy street-style character in a warm red hoodie and dark jeans.",
    category: "Modern",
    templateId: "modern-casual",
    state: {
      categoryId: "modern",
      skinTone: "#8B5E3C",
      hairColor: "#1A1A2E",
      hairStyle: "short",
      expression: "serious",
      outfitColors: {
        primary: "#DC2626",
        secondary: "#111827",
        accent: "#9CA3AF",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#0f0f1a" },
    },
  },
  // ── Sci-Fi: Celestial Envoy ──
  {
    id: "celestial-envoy",
    name: "Celestial Envoy",
    description: "An ethereal cosmic being clad in luminous energy armour with a shimmering visor and holographic escort.",
    category: "Sci-Fi",
    templateId: "sci-fi-armor",
    state: {
      ...sciFiState,
      skinTone: "#C68642",
      expression: "neutral",
      outfitColors: {
        primary: "#7C3AED",
        secondary: "#06B6D4",
        accent: "#FBBF24",
      },
      backgroundMode: "gradient",
      background: { type: "gradient", color: "#0f0f1a", secondaryColor: "#1a0533" },
    },
  },
  // ── Sci-Fi: Shadow Agent ──
  {
    id: "shadow-agent",
    name: "Shadow Agent",
    description: "A covert operative in matte-black tactical armour with a stealth energy shield and silent drone escort.",
    category: "Sci-Fi",
    templateId: "sci-fi-armor",
    state: {
      ...sciFiState,
      skinTone: "#5C3A21",
      expression: "serious",
      outfitColors: {
        primary: "#111827",
        secondary: "#374151",
        accent: "#22D3EE",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#030712" },
    },
  },
  // ── Victorian Gentleman ──
  {
    id: "victorian-charcoal",
    name: "The Duke",
    description: "A distinguished gentleman in a charcoal tailcoat with a burgundy cravat and polished top hat.",
    category: "Historical",
    templateId: "victorian-gentleman",
    state: {
      categoryId: "historical",
      skinTone: "#D4A574",
      hairColor: "#1A1A1A",
      hairStyle: "slicked",
      expression: "serious",
      outfitColors: {
        primary: "#1F2937",
        secondary: "#8B5E3C",
        accent: "#C0392B",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#f5f0eb" },
    },
  },
  {
    id: "victorian-crimson",
    name: "Lord Crimson",
    description: "A bold aristocrat in a crimson tailcoat with gold accents and a gleaming monocle.",
    category: "Historical",
    templateId: "victorian-gentleman",
    state: {
      categoryId: "historical",
      skinTone: "#C68642",
      hairColor: "#4A3525",
      hairStyle: "parted",
      expression: "happy",
      outfitColors: {
        primary: "#8B0000",
        secondary: "#D4A84B",
        accent: "#C0A060",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#1a1a2e" },
    },
  },

  // ── Samurai ──
  {
    id: "samurai-crimson",
    name: "Crimson Daimyo",
    description: "A noble samurai in crimson-laced armor with a katana at their side, bearing an ancient family crest.",
    category: "Historical",
    templateId: "samurai",
    state: {
      categoryId: "historical",
      skinTone: "#D4A574",
      hairColor: "#1A1A1A",
      expression: "serious",
      outfitColors: {
        primary: "#8B4513",
        secondary: "#5C4033",
        accent: "#C0392B",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#1a1a2e" },
    },
  },
  {
    id: "samurai-shadow",
    name: "Shadow Ronin",
    description: "A wandering ronin in dark armour with an onyx menpo face mask, both blades gleaming in the dark.",
    category: "Historical",
    templateId: "samurai",
    state: {
      categoryId: "historical",
      skinTone: "#8B5E3C",
      hairColor: "#0D0D0D",
      expression: "neutral",
      outfitColors: {
        primary: "#374151",
        secondary: "#1F2937",
        accent: "#7C3AED",
      },
      backgroundMode: "solid",
      background: { type: "solid", color: "#030712" },
    },
  },
];
