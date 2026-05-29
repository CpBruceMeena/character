import { registerTemplate } from "../registry";

registerTemplate({
  id: "fantasy-knight",
  name: "Knight",
  category: "fantasy",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Helmet -->
    <ellipse cx="30" cy="24" rx="12" ry="13" fill="#8B8B8B"/>
    <!-- Visor slit -->
    <rect x="22" y="22" width="16" height="3" rx="1" fill="#3D2314"/>
    <!-- Plume -->
    <path d="M30 11c0 0-8 2-10 8c-2 6 4 4 6-2s4-6 4-6z" fill="#C0392B"/>
    <!-- Armor body -->
    <rect x="16" y="38" width="28" height="28" rx="6" fill="#A0A0A0"/>
    <!-- Belt -->
    <rect x="16" y="56" width="28" height="4" rx="1" fill="#6B4226"/>
    <!-- Shield -->
    <path d="M8 44l6-4v18l-6-4V44z" fill="#C0392B"/>
  </svg>`,

  layers: [
    // ── Torso (chainmail base) ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "chainmail", name: "Chainmail", selector: "chainmail", defaultColor: "#9E9E9E", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="100" rx="34" ry="42" data-colorzone="chainmail" fill="#9E9E9E"/>
        <rect x="24" y="60" width="18" height="56" rx="8" data-colorzone="chainmail" fill="#9E9E9E"/>
        <rect x="78" y="60" width="18" height="56" rx="8" data-colorzone="chainmail" fill="#9E9E9E"/>
        <rect x="28" y="136" width="24" height="36" rx="6" data-colorzone="chainmail" fill="#9E9E9E"/>
        <rect x="68" y="136" width="24" height="36" rx="6" data-colorzone="chainmail" fill="#9E9E9E"/>
        <ellipse cx="40" cy="172" rx="16" ry="6" data-colorzone="chainmail" fill="#9E9E9E"/>
        <ellipse cx="80" cy="172" rx="16" ry="6" data-colorzone="chainmail" fill="#9E9E9E"/>
      </svg>`,
    },

    // ── Armour plates ──
    {
      id: "armor",
      name: "Armour",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Armour Primary", selector: "armor-primary", defaultColor: "#6B7280", propertyPath: "outfitColors.primary" },
        { id: "armor-accent", name: "Armour Accent", selector: "armor-accent", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Chest plate -->
        <path d="M32 66c0-4 6-8 12-8h32c6 0 12 4 12 8v40c0 6-6 10-12 10H44c-6 0-12-4-12-10V66z" data-colorzone="armor-primary" fill="#6B7280"/>
        <!-- Chest emblem -->
        <path d="M52 84l8-6 8 6-3 10h-10l-3-10z" data-colorzone="armor-accent" fill="#C0392B"/>
        <!-- Shoulder pauldrons -->
        <ellipse cx="26" cy="68" rx="10" ry="12" data-colorzone="armor-primary" fill="#6B7280"/>
        <ellipse cx="94" cy="68" rx="10" ry="12" data-colorzone="armor-primary" fill="#6B7280"/>
        <!-- Pauldron accents -->
        <circle cx="26" cy="68" r="4" data-colorzone="armor-accent" fill="#C0392B"/>
        <circle cx="94" cy="68" r="4" data-colorzone="armor-accent" fill="#C0392B"/>
        <!-- Belt -->
        <rect x="28" y="102" width="64" height="6" rx="2" data-colorzone="armor-accent" fill="#6B4226"/>
        <!-- Belt buckle -->
        <rect x="56" y="100" width="8" height="10" rx="2" fill="#FBBF24"/>
        <!-- Greaves -->
        <rect x="30" y="130" width="22" height="34" rx="4" data-colorzone="armor-primary" fill="#6B7280"/>
        <rect x="68" y="130" width="22" height="34" rx="4" data-colorzone="armor-primary" fill="#6B7280"/>
        <!-- Boots -->
        <ellipse cx="41" cy="170" rx="16" ry="7" data-colorzone="armor-accent" fill="#6B4226"/>
        <ellipse cx="79" cy="170" rx="16" ry="7" data-colorzone="armor-accent" fill="#6B4226"/>
      </svg>`,
    },

    // ── Head / Face ──
    {
      id: "head",
      name: "Head",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [
        { id: "skin", name: "Skin", selector: "skin", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="32" rx="24" ry="28" data-colorzone="skin" fill="#D4A574"/>
      </svg>`,
    },

    // ── Eyes ──
    {
      id: "eyes",
      name: "Eyes",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="48" cy="30" rx="5" ry="6" fill="#FFFFFF"/>
        <circle cx="49" cy="30" r="3.5" fill="#3D2314"/>
        <circle cx="47" cy="28" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="72" cy="30" rx="5" ry="6" fill="#FFFFFF"/>
        <circle cx="71" cy="30" r="3.5" fill="#3D2314"/>
        <circle cx="69" cy="28" r="1.5" fill="#FFFFFF"/>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  MOUTH EXPRESSION VARIANTS (visible when helmet is off)
    // ════════════════════════════════════════════════════════

    // ── Mouth: neutral ──
    {
      id: "mouth-neutral",
      name: "Mouth (Neutral)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["neutral"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52 46c2 4 14 4 16 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: happy ──
    {
      id: "mouth-happy",
      name: "Mouth (Happy)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["happy"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 44c4 6 20 6 24 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: serious ──
    {
      id: "mouth-serious",
      name: "Mouth (Serious)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["serious"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52 48c2-2 14-2 16 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Helmet ──
    {
      id: "helmet",
      name: "Helmet",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "helmet", name: "Helmet", selector: "helmet", defaultColor: "#6B7280", propertyPath: "outfitColors.primary" },
        { id: "visor", name: "Visor", selector: "visor", defaultColor: "#374151", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Helmet dome -->
        <ellipse cx="60" cy="28" rx="26" ry="24" data-colorzone="helmet" fill="#6B7280"/>
        <!-- Visor slit -->
        <rect x="42" y="26" width="36" height="4" rx="2" data-colorzone="visor" fill="#374151"/>
        <!-- Nose guard -->
        <rect x="58" y="22" width="4" height="16" rx="1" fill="#6B7280"/>
        <!-- Helmet rim -->
        <ellipse cx="60" cy="44" rx="24" ry="6" data-colorzone="helmet" fill="#6B7280"/>
        <!-- Plume / crest -->
        <path d="M60 4c0 0-18 4-22 18c-4 14 10 10 14-4s8-14 8-14z" data-colorzone="visor" fill="#C0392B"/>
        <path d="M60 4c0 0 14 2 18 12c4 10-6 12-10 2s-8-14-8-14z" data-colorzone="visor" fill="#C0392B"/>
      </svg>`,
    },

    // ── Cape ──
    {
      id: "cape",
      name: "Cape",
      zIndex: 1,
      defaultVisible: true,
      colorZones: [
        { id: "cape", name: "Cape", selector: "cape", defaultColor: "#8B0000", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 60c-4 14-8 50-12 70c-2 10 6 16 14 10c6-4 12-8 18-8s12 4 18 8c8 6 16 0 14-10c-4-20-8-56-12-70H30z" data-colorzone="cape" fill="#8B0000"/>
      </svg>`,
    },

    // ── Shield ──
    {
      id: "shield",
      name: "Shield",
      zIndex: 8,
      defaultVisible: true,
      colorZones: [
        { id: "shield", name: "Shield", selector: "shield", defaultColor: "#6B7280", propertyPath: "outfitColors.primary" },
        { id: "shield-crest", name: "Shield Crest", selector: "shield-crest", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shield body -->
        <path d="M16 60l6-8h12l6 8v28c0 8-12 16-12 16s-12-8-12-16V60z" data-colorzone="shield" fill="#6B7280"/>
        <!-- Shield emblem -->
        <path d="M20 64l-2 4v22c0 6 8 12 10 14c2-2 10-8 10-14V68l-2-4H20z" data-colorzone="shield-crest" fill="#C0392B"/>
        <!-- Shield border -->
        <path d="M16 60l6-8h12l6 8" stroke="#4A5568" stroke-width="2" fill="none"/>
      </svg>`,
    },

    // ── Pendant ──
    {
      id: "pendant",
      name: "Pendant",
      zIndex: 6,
      defaultVisible: false,
      colorZones: [
        { id: "pendant-gem", name: "Gem", selector: "pendant-gem", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Chain -->
        <path d="M46 50c4 6 8 10 14 14" stroke="#C0A060" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2.5"/>
        <path d="M74 50c-4 6-8 10-14 14" stroke="#C0A060" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2.5"/>
        <!-- Amulet setting -->
        <path d="M52 78l8-10 8 10-4 12h-8l-4-12z" fill="#C0A060"/>
        <path d="M52 78l8-10 8 10" stroke="#D4A84B" stroke-width="1" fill="none"/>
        <!-- Gem -->
        <path d="M56 78l4-6 4 6-2 8h-4l-2-8z" data-colorzone="pendant-gem" fill="#C0392B"/>
        <!-- Gem highlight -->
        <path d="M58 78l2-4 2 4-1 6h-2l-1-6z" fill="#FFFFFF" opacity="0.3"/>
      </svg>`,
    },

    // ── Pauldron variant (elite) ──
    {
      id: "pauldron-variant",
      name: "Pauldrons (Elite)",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "pauldron-metal", name: "Pauldron Metal", selector: "pauldron-metal", defaultColor: "#6B7280", propertyPath: "outfitColors.primary" },
        { id: "pauldron-accent", name: "Pauldron Accent", selector: "pauldron-accent", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left pauldron overlay -->
        <path d="M14 56c-6 4-8 16-6 24c1 4 4 8 8 6s8-12 8-24c0-6-4-10-10-6z" data-colorzone="pauldron-metal" fill="#6B7280"/>
        <!-- Right pauldron overlay -->
        <path d="M106 56c6 4 8 16 6 24c-1 4-4 8-8 6s-8-12-8-24c0-6 4-10 10-6z" data-colorzone="pauldron-metal" fill="#6B7280"/>
        <!-- Left spikes -->
        <path d="M12 60l-6-4 4-6z" data-colorzone="pauldron-accent" fill="#C0392B"/>
        <path d="M14 68l-8-2 2-6z" data-colorzone="pauldron-accent" fill="#C0392B"/>
        <!-- Right spikes -->
        <path d="M108 60l6-4-4-6z" data-colorzone="pauldron-accent" fill="#C0392B"/>
        <path d="M106 68l8-2-2-6z" data-colorzone="pauldron-accent" fill="#C0392B"/>
        <!-- Accent studs -->
        <circle cx="18" cy="74" r="2.5" data-colorzone="pauldron-accent" fill="#C0392B"/>
        <circle cx="102" cy="74" r="2.5" data-colorzone="pauldron-accent" fill="#C0392B"/>
      </svg>`,
    },

    // ── Belt pouch ──
    {
      id: "belt-pouch",
      name: "Belt Pouch",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "pouch-leather", name: "Pouch Leather", selector: "pouch-leather", defaultColor: "#6B4226", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Pouch body -->
        <path d="M72 104c-4 0 -6 10 -2 16c2 4 8 6 12 0c4-6 2-16 -2-16H72z" data-colorzone="pouch-leather" fill="#6B4226"/>
        <!-- Pouch flap -->
        <path d="M70 104c0 0 2-4 10-4s10 4 10 4" data-colorzone="pouch-leather" fill="#5A3520"/>
        <!-- Gold buckle -->
        <rect x="78" y="104" width="6" height="4" rx="1.5" fill="#D4A84B"/>
        <!-- Decorative stitching -->
        <circle cx="76" cy="112" r="1" fill="#8B6914" opacity="0.5"/>
        <circle cx="80" cy="114" r="1" fill="#8B6914" opacity="0.5"/>
        <circle cx="84" cy="112" r="1" fill="#8B6914" opacity="0.5"/>
      </svg>`,
    },
  ],

  controls: [
    // Identity
    { id: "gender", type: "select", label: "Gender", section: "identity", targets: ["gender"], options: [
      { label: "Masculine", value: "masculine" },
      { label: "Feminine", value: "feminine" },
      { label: "Androgynous", value: "androgynous" },
    ]},
    { id: "body-type", type: "select", label: "Build", section: "identity", targets: ["bodyType"], options: [
      { label: "Slim", value: "slim" },
      { label: "Athletic", value: "athletic" },
      { label: "Broad", value: "broad" },
    ]},

    // Body
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 60 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 40 },

    // Face
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin"], defaultValue: "#D4A574" },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
    ]},

    // Hair is hidden under helmet — no hair controls for this template

    // Clothing / Armour
    { id: "armor-color", type: "color", label: "Armour Color", section: "clothing", targets: ["armor-primary", "outfitColors.primary"], defaultValue: "#6B7280" },
    { id: "armor-accent", type: "color", label: "Accent Color", section: "clothing", targets: ["armor-accent", "outfitColors.accent"], defaultValue: "#C0392B" },
    { id: "cape-color", type: "color", label: "Cape Color", section: "clothing", targets: ["cape", "outfitColors.secondary"], defaultValue: "#8B0000" },

    // Accessories
    { id: "helmet", type: "toggle", label: "Helmet", section: "accessories", targets: ["helmet"], defaultValue: true },
    { id: "shield", type: "toggle", label: "Shield", section: "accessories", targets: ["shield"], defaultValue: true },
    { id: "pendant", type: "toggle", label: "Pendant", section: "accessories", targets: ["pendant"], defaultValue: false },
    { id: "pauldron-variant", type: "toggle", label: "Pauldrons (Elite)", section: "accessories", targets: ["pauldron-variant"], defaultValue: false },
    { id: "belt-pouch", type: "toggle", label: "Belt Pouch", section: "accessories", targets: ["belt-pouch"], defaultValue: false },
  ],
});
