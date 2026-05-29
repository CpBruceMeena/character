import { registerTemplate } from "../registry";

registerTemplate({
  id: "sci-fi-armor",
  name: "Space Armor",
  category: "sci-fi",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Futuristic helmet -->
    <ellipse cx="30" cy="22" rx="11" ry="12" fill="#4A90D9"/>
    <!-- Visor -->
    <path d="M22 22c2-3 14-3 16 0l-4 6H26l-4-6z" fill="#1A1A2E"/>
    <!-- Armor body -->
    <rect x="18" y="36" width="24" height="26" rx="4" fill="#2C3E50"/>
    <!-- Chest emitter -->
    <circle cx="30" cy="46" r="4" fill="#00BCD4"/>
    <!-- Legs -->
    <rect x="20" y="60" width="8" height="16" rx="2" fill="#4A90D9"/>
    <rect x="32" y="60" width="8" height="16" rx="2" fill="#4A90D9"/>
  </svg>`,

  layers: [
    // ── Body suit (undersuit) ──
    {
      id: "undersuit",
      name: "Under Suit",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "undersuit", name: "Under Suit", selector: "undersuit", defaultColor: "#1E293B", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Torso base -->
        <ellipse cx="60" cy="100" rx="32" ry="40" data-colorzone="undersuit" fill="#1E293B"/>
        <!-- Arms -->
        <rect x="14" y="66" width="20" height="58" rx="8" data-colorzone="undersuit" fill="#1E293B"/>
        <rect x="86" y="66" width="20" height="58" rx="8" data-colorzone="undersuit" fill="#1E293B"/>
        <!-- Legs -->
        <rect x="28" y="136" width="24" height="36" rx="6" data-colorzone="undersuit" fill="#1E293B"/>
        <rect x="68" y="136" width="24" height="36" rx="6" data-colorzone="undersuit" fill="#1E293B"/>
        <!-- Boots -->
        <ellipse cx="40" cy="172" rx="14" ry="6" fill="#0F172A"/>
        <ellipse cx="80" cy="172" rx="14" ry="6" fill="#0F172A"/>
      </svg>`,
    },

    // ── Armor plates ──
    {
      id: "armor",
      name: "Armor Plates",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Armor Primary", selector: "armor-primary", defaultColor: "#4A90D9", propertyPath: "outfitColors.primary" },
        { id: "armor-accent", name: "Armor Accent", selector: "armor-accent", defaultColor: "#00BCD4", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Chest plate -->
        <path d="M34 64c0-4 6-8 12-8h28c6 0 12 4 12 8v34c0 6-6 10-12 10H46c-6 0-12-4-12-10V64z" data-colorzone="armor-primary" fill="#4A90D9"/>
        <!-- Chest details -->
        <path d="M46 70h28v8H46z" data-colorzone="armor-accent" fill="#00BCD4" opacity="0.6"/>
        <!-- Shoulder pauldrons -->
        <path d="M18 62c-4 0-8 4-8 8v6c0 4 4 8 8 8V62z" data-colorzone="armor-primary" fill="#4A90D9"/>
        <path d="M102 62c4 0 8 4 8 8v6c0 4-4 8-8 8V62z" data-colorzone="armor-primary" fill="#4A90D9"/>
        <!-- Shoulder lights -->
        <circle cx="18" cy="70" r="3" data-colorzone="armor-accent" fill="#00BCD4"/>
        <circle cx="102" cy="70" r="3" data-colorzone="armor-accent" fill="#00BCD4"/>
        <!-- Belt -->
        <rect x="34" y="96" width="52" height="5" rx="2" fill="#0F172A"/>
        <!-- Belt buckle emitter -->
        <circle cx="60" cy="98" r="4" data-colorzone="armor-accent" fill="#00BCD4"/>
        <!-- Knee guards -->
        <rect x="28" y="144" width="16" height="10" rx="3" data-colorzone="armor-primary" fill="#4A90D9"/>
        <rect x="76" y="144" width="16" height="10" rx="3" data-colorzone="armor-primary" fill="#4A90D9"/>
      </svg>`,
    },

    // ── Head ──
    {
      id: "head",
      name: "Head",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [
        { id: "skin", name: "Skin", selector: "skin", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="32" rx="22" ry="26" data-colorzone="skin" fill="#D4A574"/>
        <!-- Neck seal -->
        <rect x="48" y="52" width="24" height="8" rx="3" fill="#0F172A"/>
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

    // Mouth variants (same expressions as cartoon)
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
        { id: "helmet", name: "Helmet", selector: "helmet", defaultColor: "#4A90D9", propertyPath: "outfitColors.primary" },
        { id: "visor", name: "Visor", selector: "visor", defaultColor: "#1A1A2E", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Helmet dome -->
        <ellipse cx="60" cy="28" rx="24" ry="22" data-colorzone="helmet" fill="#4A90D9"/>
        <!-- Visor -->
        <path d="M38 24c4-6 12-6 16 0l6 10H32l6-10z" data-colorzone="visor" fill="#1A1A2E"/>
        <!-- Visor glow line -->
        <path d="M40 30c4-2 12-2 16 0" stroke="#00BCD4" stroke-width="1.5" fill="none" opacity="0.8"/>
        <!-- Helmet rim -->
        <ellipse cx="60" cy="42" rx="22" ry="5" data-colorzone="helmet" fill="#4A90D9"/>
        <!-- Ear pieces -->
        <rect x="32" y="26" width="6" height="14" rx="2" data-colorzone="helmet" fill="#4A90D9"/>
        <rect x="82" y="26" width="6" height="14" rx="2" data-colorzone="helmet" fill="#4A90D9"/>
        <!-- Top antenna -->
        <line x1="60" y1="6" x2="60" y2="14" stroke="#00BCD4" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="5" r="3" data-colorzone="armor-accent" fill="#00BCD4"/>
      </svg>`,
    },

    // ── Jetpack ──
    {
      id: "jetpack",
      name: "Jetpack",
      zIndex: 1,
      defaultVisible: true,
      colorZones: [
        { id: "jetpack", name: "Jetpack", selector: "jetpack", defaultColor: "#2C3E50", propertyPath: "outfitColors.primary" },
        { id: "thruster", name: "Thruster", selector: "thruster", defaultColor: "#00BCD4", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Jetpack body -->
        <rect x="8" y="60" width="18" height="50" rx="6" data-colorzone="jetpack" fill="#2C3E50"/>
        <rect x="94" y="60" width="18" height="50" rx="6" data-colorzone="jetpack" fill="#2C3E50"/>
        <!-- Thruster vents -->
        <rect x="12" y="106" width="10" height="6" rx="2" data-colorzone="thruster" fill="#00BCD4"/>
        <rect x="98" y="106" width="10" height="6" rx="2" data-colorzone="thruster" fill="#00BCD4"/>
        <!-- Glow effect -->
        <ellipse cx="17" cy="114" rx="6" ry="3" fill="#00BCD4" opacity="0.4"/>
        <ellipse cx="103" cy="114" rx="6" ry="3" fill="#00BCD4" opacity="0.4"/>
      </svg>`,
    },

    // ── Energy shield ──
    {
      id: "energy-shield",
      name: "Energy Shield",
      zIndex: 8,
      defaultVisible: false,
      colorZones: [
        { id: "shield", name: "Shield", selector: "shield", defaultColor: "#00BCD4", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shield bubble -->
        <ellipse cx="38" cy="88" rx="24" ry="32" data-colorzone="shield" fill="#00BCD4" opacity="0.25"/>
        <!-- Shield arc lines -->
        <path d="M16 70c6 4 10 12 10 18" stroke="#00BCD4" stroke-width="1.5" opacity="0.6" fill="none"/>
        <path d="M14 80c8 2 16 8 20 16" stroke="#00BCD4" stroke-width="1.5" opacity="0.6" fill="none"/>
        <!-- Emitter bracer -->
        <rect x="22" y="64" width="10" height="14" rx="3" fill="#2C3E50"/>
        <circle cx="27" cy="68" r="3" data-colorzone="shield" fill="#00BCD4"/>
      </svg>`,
    },

    // ── Hologram drone ──
    {
      id: "hologram-drone",
      name: "Hologram Drone",
      zIndex: 30,
      defaultVisible: false,
      colorZones: [
        { id: "drone", name: "Drone Core", selector: "drone", defaultColor: "#00BCD4", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Drone body -->
        <ellipse cx="60" cy="10" rx="12" ry="4" data-colorzone="drone" fill="#00BCD4"/>
        <!-- Core glow -->
        <circle cx="60" cy="10" r="2" fill="#FFFFFF" opacity="0.8"/>
        <!-- Light beams -->
        <line x1="52" y1="10" x2="48" y2="2" stroke="#00BCD4" stroke-width="1" opacity="0.4"/>
        <line x1="68" y1="10" x2="72" y2="2" stroke="#00BCD4" stroke-width="1" opacity="0.4"/>
      </svg>`,
    },

    // ── Data pad (hip accessory) ──
    {
      id: "data-pad",
      name: "Data Pad",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "datapad", name: "Data Pad", selector: "datapad", defaultColor: "#00BCD4", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Pad body -->
        <rect x="70" y="96" width="18" height="24" rx="3" fill="#2C3E50"/>
        <!-- Screen -->
        <rect x="72" y="98" width="14" height="10" rx="1" data-colorzone="datapad" fill="#00BCD4" opacity="0.3"/>
        <!-- Screen data lines -->
        <line x1="74" y1="101" x2="84" y2="101" stroke="#00BCD4" stroke-width="0.8"/>
        <line x1="74" y1="104" x2="80" y2="104" stroke="#00BCD4" stroke-width="0.8"/>
        <!-- Button -->
        <circle cx="79" cy="114" r="2" fill="#1E293B"/>
      </svg>`,
    },
  ],

  controls: [
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
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },

    // Face
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin"], defaultValue: "#D4A574" },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
    ]},

    // Clothing / Armor
    { id: "armor-color", type: "color", label: "Armor Color", section: "clothing", targets: ["armor-primary", "undersuit", "outfitColors.primary"], defaultValue: "#4A90D9" },
    { id: "accent-color", type: "color", label: "Accent Color", section: "clothing", targets: ["armor-accent", "outfitColors.accent"], defaultValue: "#00BCD4" },

    // Accessories
    { id: "helmet", type: "toggle", label: "Helmet", section: "accessories", targets: ["helmet"], defaultValue: true },
    { id: "jetpack", type: "toggle", label: "Jetpack", section: "accessories", targets: ["jetpack"], defaultValue: true },
    { id: "energy-shield", type: "toggle", label: "Energy Shield", section: "accessories", targets: ["energy-shield"], defaultValue: false },
    { id: "hologram-drone", type: "toggle", label: "Hologram Drone", section: "accessories", targets: ["hologram-drone"], defaultValue: false },
    { id: "data-pad", type: "toggle", label: "Data Pad", section: "accessories", targets: ["data-pad"], defaultValue: false },
  ],
});
