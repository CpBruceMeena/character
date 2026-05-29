import { registerTemplate } from "../registry";

registerTemplate({
  id: "steampunk-explorer",
  name: "Steampunk Explorer",
  category: "modern",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Explorer hat -->
    <ellipse cx="30" cy="18" rx="14" ry="8" fill="#5C4033"/>
    <rect x="22" y="10" width="16" height="10" rx="3" fill="#5C4033"/>
    <!-- Goggles -->
    <circle cx="25" cy="22" r="5" fill="#6B4226" stroke="#B8860B" stroke-width="1.5"/>
    <circle cx="35" cy="22" r="5" fill="#6B4226" stroke="#B8860B" stroke-width="1.5"/>
    <rect x="16" y="22" width="28" height="3" rx="1" fill="#B8860B"/>
    <!-- Body/vest -->
    <rect x="18" y="36" width="24" height="28" rx="4" fill="#8B5E3C"/>
    <!-- Gear emblem -->
    <circle cx="30" cy="48" r="5" fill="#B8860B"/>
    <!-- Legs -->
    <rect x="20" y="62" width="8" height="16" rx="2" fill="#5C4033"/>
    <rect x="32" y="62" width="8" height="16" rx="2" fill="#5C4033"/>
  </svg>`,

  layers: [
    // ── Body / Torso ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "shirt", name: "Shirt", selector: "shirt", defaultColor: "#F5F0EB", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Neck -->
        <rect x="48" y="54" width="24" height="14" rx="3" fill="#D4A574"/>
        <!-- Torso -->
        <ellipse cx="60" cy="104" rx="32" ry="38" data-colorzone="shirt" fill="#F5F0EB"/>
        <!-- Arms -->
        <rect x="12" y="68" width="22" height="56" rx="10" data-colorzone="shirt" fill="#F5F0EB"/>
        <rect x="86" y="68" width="22" height="56" rx="10" data-colorzone="shirt" fill="#F5F0EB"/>
        <!-- Hands -->
        <circle cx="23" cy="124" r="9" fill="#D4A574"/>
        <circle cx="97" cy="124" r="9" fill="#D4A574"/>
        <!-- Legs -->
        <rect x="28" y="138" width="24" height="34" rx="8" fill="#5C4033"/>
        <rect x="68" y="138" width="24" height="34" rx="8" fill="#5C4033"/>
        <!-- Boots -->
        <ellipse cx="40" cy="172" rx="16" ry="7" fill="#4A3525"/>
        <ellipse cx="80" cy="172" rx="16" ry="7" fill="#4A3525"/>
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <ellipse cx="60" cy="38" rx="26" ry="30" data-colorzone="skin" fill="#D4A574"/>
        <ellipse cx="34" cy="36" rx="7" ry="10" data-colorzone="skin" fill="#D4A574"/>
        <ellipse cx="86" cy="36" rx="7" ry="10" data-colorzone="skin" fill="#D4A574"/>
      </svg>`,
    },

    // ── Eyes ──
    {
      id: "eyes",
      name: "Eyes",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <ellipse cx="46" cy="34" rx="5" ry="6" fill="#FFFFFF"/>
        <circle cx="47" cy="34" r="3.5" fill="#3D2314"/>
        <circle cx="45" cy="32" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="74" cy="34" rx="5" ry="6" fill="#FFFFFF"/>
        <circle cx="73" cy="34" r="3.5" fill="#3D2314"/>
        <circle cx="71" cy="32" r="1.5" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Eyebrows ──
    {
      id: "eyebrows",
      name: "Eyebrows",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M36 22c4-3 10-3 14 0" stroke="#3D2314" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M70 22c4-3 10-3 14 0" stroke="#3D2314" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth variants ──
    {
      id: "mouth-neutral",
      name: "Mouth (Neutral)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["neutral"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M50 52c4 4 16 4 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },
    {
      id: "mouth-happy",
      name: "Mouth (Happy)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["happy"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M46 48c6 10 22 10 28 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },
    {
      id: "mouth-serious",
      name: "Mouth (Serious)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["serious"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M50 56c4-2 16-2 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },
    {
      id: "mouth-surprised",
      name: "Mouth (Surprised)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["surprised"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <ellipse cx="60" cy="52" rx="6" ry="8" fill="#3D2314"/>
        <ellipse cx="60" cy="51" rx="5" ry="6" fill="#C0392B"/>
      </svg>`,
    },
    {
      id: "mouth-sad",
      name: "Mouth (Sad)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["sad"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M50 56c4-2 16-2 20 2" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Hair ──
    {
      id: "hair",
      name: "Hair",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "hair", name: "Hair", selector: "hair", defaultColor: "#5C4033", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M34 30c-2-16 12-24 26-24s28 8 26 24c0 6-4 10-8 12H42c-4-2-8-6-8-12z" data-colorzone="hair" fill="#5C4033"/>
      </svg>`,
    },

    // ── Vest (steampunk explorer vest) ──
    {
      id: "vest",
      name: "Explorer Vest",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "vest-primary", name: "Vest", selector: "vest-primary", defaultColor: "#8B5E3C", propertyPath: "outfitColors.secondary" },
        { id: "vest-trim", name: "Vest Trim", selector: "vest-trim", defaultColor: "#B8860B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Vest body -->
        <path d="M38 68c-4 0-8 4-8 8v44c0 4 4 8 8 8h16V66H38z" data-colorzone="vest-primary" fill="#8B5E3C"/>
        <path d="M66 66h16c4 0 8 4 8 8v44c0 4-4 8-8 8H66V66z" data-colorzone="vest-primary" fill="#8B5E3C"/>
        <!-- Vest trim/buttons -->
        <line x1="60" y1="72" x2="60" y2="118" stroke="#B8860B" stroke-width="1.5" stroke-dasharray="4 6"/>
        <circle cx="60" cy="76" r="2.5" data-colorzone="vest-trim" fill="#B8860B"/>
        <circle cx="60" cy="90" r="2.5" data-colorzone="vest-trim" fill="#B8860B"/>
        <circle cx="60" cy="104" r="2.5" data-colorzone="vest-trim" fill="#B8860B"/>
        <!-- Pocket -->
        <rect x="42" y="96" width="14" height="10" rx="2" fill="#7A5232"/>
      </svg>`,
    },

    // ── Explorer Hat ──
    {
      id: "explorer-hat",
      name: "Explorer Hat",
      zIndex: 30,
      defaultVisible: true,
      colorZones: [
        { id: "hat", name: "Hat", selector: "hat", defaultColor: "#5C4033", propertyPath: "outfitColors.secondary" },
        { id: "hat-band", name: "Hat Band", selector: "hat-band", defaultColor: "#B8860B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Hat brim -->
        <ellipse cx="60" cy="30" rx="32" ry="8" data-colorzone="hat" fill="#5C4033"/>
        <!-- Hat crown -->
        <path d="M38 30c0-14 8-20 22-20s22 6 22 20H38z" data-colorzone="hat" fill="#5C4033"/>
        <!-- Hat band -->
        <rect x="38" y="22" width="44" height="5" rx="2" data-colorzone="hat-band" fill="#B8860B"/>
        <!-- Hat buckle -->
        <rect x="56" y="21" width="8" height="7" rx="1.5" fill="#D4A84B"/>
        <rect x="58" y="23" width="4" height="3" rx="0.5" fill="#5C4033"/>
      </svg>`,
    },

    // ── Goggles (pushed up on hat) ──
    {
      id: "goggles",
      name: "Goggles",
      zIndex: 28,
      defaultVisible: false,
      colorZones: [
        { id: "goggle-lens", name: "Goggle Lens", selector: "goggle-lens", defaultColor: "#6B8E23", propertyPath: "outfitColors.accent" },
        { id: "goggle-rim", name: "Goggle Rim", selector: "goggle-rim", defaultColor: "#B8860B", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Goggle strap -->
        <path d="M30 42c0-2 4-4 10-4h40c6 0 10 2 10 4" stroke="#4A3525" stroke-width="3" fill="none"/>
        <!-- Left goggle -->
        <circle cx="44" cy="38" r="10" data-colorzone="goggle-rim" fill="#B8860B"/>
        <circle cx="44" cy="38" r="7" data-colorzone="goggle-lens" fill="#6B8E23" opacity="0.6"/>
        <ellipse cx="43" cy="36" rx="2" ry="2.5" fill="#FFFFFF" opacity="0.3"/>
        <!-- Right goggle -->
        <circle cx="76" cy="38" r="10" data-colorzone="goggle-rim" fill="#B8860B"/>
        <circle cx="76" cy="38" r="7" data-colorzone="goggle-lens" fill="#6B8E23" opacity="0.6"/>
        <ellipse cx="75" cy="36" rx="2" ry="2.5" fill="#FFFFFF" opacity="0.3"/>
        <!-- Bridge -->
        <path d="M54 38c2-2 10-2 12 0" stroke="#B8860B" stroke-width="2" fill="none"/>
      </svg>`,
    },

    // ── Scarf ──
    {
      id: "scarf",
      name: "Scarf",
      zIndex: 6,
      defaultVisible: true,
      colorZones: [
        { id: "scarf", name: "Scarf", selector: "scarf", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Scarf wrap -->
        <path d="M36 58c0-4 6-8 12-8h24c6 0 12 4 12 8v8c0 6-6 10-12 10H48c-6 0-12-4-12-10v-8z" data-colorzone="scarf" fill="#C0392B"/>
        <!-- Scarf stripe -->
        <path d="M36 62c0-2 6-4 12-4h24c6 0 12 2 12 4" stroke="#FFD460" stroke-width="1.5" opacity="0.6"/>
        <!-- Scarf tail -->
        <path d="M78 70c4-2 10 0 10 6v12c0 8-6 12-10 10" fill="#C0392B"/>
      </svg>`,
    },

    // ── Gear emblem (chest accessory) ──
    {
      id: "gear-emblem",
      name: "Gear Emblem",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "gear", name: "Gear", selector: "gear", defaultColor: "#B8860B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Gear outer ring -->
        <circle cx="60" cy="90" r="12" data-colorzone="gear" fill="#B8860B"/>
        <!-- Gear teeth -->
        <rect x="52" y="76" width="16" height="6" rx="2" data-colorzone="gear" fill="#B8860B"/>
        <rect x="52" y="98" width="16" height="6" rx="2" data-colorzone="gear" fill="#B8860B"/>
        <rect x="46" y="82" width="6" height="16" rx="2" data-colorzone="gear" fill="#B8860B"/>
        <rect x="68" y="82" width="6" height="16" rx="2" data-colorzone="gear" fill="#B8860B"/>
        <!-- Gear inner hole -->
        <circle cx="60" cy="90" r="5" fill="#F5F0EB"/>
        <!-- Center pin -->
        <circle cx="60" cy="90" r="2.5" data-colorzone="gear" fill="#D4A84B"/>
      </svg>`,
    },

    // ── Compass (belt accessory) ──
    {
      id: "compass",
      name: "Compass",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "compass-body", name: "Compass", selector: "compass-body", defaultColor: "#B8860B", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Compass body -->
        <circle cx="44" cy="108" r="8" data-colorzone="compass-body" fill="#B8860B"/>
        <circle cx="44" cy="108" r="6" fill="#F5F0EB"/>
        <!-- Compass face -->
        <line x1="44" y1="103" x2="44" y2="107" stroke="#C0392B" stroke-width="1.2"/>
        <line x1="44" y1="109" x2="44" y2="113" stroke="#3D2314" stroke-width="1.2"/>
        <line x1="40" y1="107" x2="43" y2="107" stroke="#3D2314" stroke-width="0.8"/>
        <line x1="45" y1="107" x2="48" y2="107" stroke="#3D2314" stroke-width="0.8"/>
        <!-- Chain -->
        <path d="M44 100c0-4 4-8 8-10" stroke="#B8860B" stroke-width="0.8" fill="none" stroke-dasharray="1 1.5"/>
      </svg>`,
    },

    // ── Satchel ──
    {
      id: "satchel",
      name: "Satchel",
      zIndex: 1,
      defaultVisible: false,
      colorZones: [
        { id: "satchel", name: "Satchel", selector: "satchel", defaultColor: "#5C4033", propertyPath: "outfitColors.secondary" },
        { id: "satchel-buckle", name: "Buckle", selector: "satchel-buckle", defaultColor: "#B8860B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Satchel body -->
        <rect x="8" y="80" width="24" height="28" rx="4" data-colorzone="satchel" fill="#5C4033"/>
        <!-- Satchel flap -->
        <path d="M8 84c4-4 20-4 24 0v4H8v-4z" data-colorzone="satchel" fill="#7A5232"/>
        <!-- Buckle -->
        <rect x="17" y="86" width="6" height="5" rx="1" data-colorzone="satchel-buckle" fill="#B8860B"/>
        <!-- Strap -->
        <path d="M12 76c4-6 12-10 18-12" stroke="#5C4033" stroke-width="3" fill="none"/>
      </svg>`,
    },

    // ── Belt ──
    {
      id: "belt",
      name: "Belt",
      zIndex: 6,
      defaultVisible: false,
      colorZones: [
        { id: "belt", name: "Belt", selector: "belt", defaultColor: "#4A3525", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Belt strap -->
        <rect x="32" y="104" width="56" height="6" rx="2" data-colorzone="belt" fill="#4A3525"/>
        <!-- Belt buckle -->
        <rect x="54" y="102" width="12" height="10" rx="2" fill="#B8860B"/>
        <rect x="58" y="104" width="4" height="6" rx="0.5" fill="#4A3525"/>
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
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 45 },

    // Face
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 50 },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
      { label: "Surprised", value: "surprised" },
      { label: "Sad", value: "sad" },
    ]},
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin"], defaultValue: "#D4A574" },

    // Hair
    { id: "hair-style", type: "select", label: "Style", section: "hair", targets: ["hairStyle"], options: [
      { label: "Short", value: "short" },
      { label: "Long", value: "long" },
      { label: "Curly", value: "curly" },
      { label: "Wavy", value: "wavy" },
      { label: "Ponytail", value: "ponytail" },
    ]},
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair"], defaultValue: "#5C4033" },

    // Clothing
    { id: "outfit", type: "select", label: "Style", section: "clothing", targets: ["outfit"], options: [
      { label: "Casual", value: "casual" },
      { label: "Explorer", value: "explorer" },
      { label: "Formal", value: "formal" },
    ]},
    { id: "vest-color", type: "color", label: "Vest Color", section: "clothing", targets: ["vest-primary", "outfitColors.secondary"], defaultValue: "#8B5E3C" },
    { id: "accent-color", type: "color", label: "Accent Color", section: "clothing", targets: ["vest-trim", "outfitColors.accent"], defaultValue: "#B8860B" },

    // Accessories
    { id: "explorer-hat", type: "toggle", label: "Explorer Hat", section: "accessories", targets: ["explorer-hat"], defaultValue: true },
    { id: "goggles", type: "toggle", label: "Goggles", section: "accessories", targets: ["goggles"], defaultValue: false },
    { id: "scarf", type: "toggle", label: "Scarf", section: "accessories", targets: ["scarf"], defaultValue: true },
    { id: "gear-emblem", type: "toggle", label: "Gear Emblem", section: "accessories", targets: ["gear-emblem"], defaultValue: false },
    { id: "compass", type: "toggle", label: "Compass", section: "accessories", targets: ["compass"], defaultValue: false },
    { id: "satchel", type: "toggle", label: "Satchel", section: "accessories", targets: ["satchel"], defaultValue: false },
    { id: "belt", type: "toggle", label: "Belt", section: "accessories", targets: ["belt"], defaultValue: false },
  ],
});
