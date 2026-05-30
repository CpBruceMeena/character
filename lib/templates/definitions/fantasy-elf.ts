import { registerTemplate } from "../registry";

registerTemplate({
  id: "fantasy-elf",
  name: "Elf Archer",
  category: "fantasy",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="22" rx="12" ry="16" fill="#D4A574"/>
    <ellipse cx="30" cy="54" rx="14" ry="20" fill="#D4A574"/>
    <ellipse cx="24" cy="16" rx="3" ry="8" fill="#D4A574"/>
    <ellipse cx="36" cy="16" rx="3" ry="8" fill="#D4A574"/>
    <circle cx="26" cy="20" r="2" fill="#22D3EE"/>
    <circle cx="34" cy="20" r="2" fill="#22D3EE"/>
    <path d="M22 72l-6-12 10 4" stroke="#22C55E" stroke-width="1.5"/>
  </svg>`,

  layers: [
    // ── Torso ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "skin-body", name: "Body Skin", selector: "skin-body", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="48" y="50" width="24" height="16" rx="4" data-colorzone="skin-body" fill="#D4A574"/>
        <ellipse cx="60" cy="104" rx="30" ry="36" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="14" y="68" width="20" height="56" rx="10" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="86" y="68" width="20" height="56" rx="10" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="32" y="134" width="22" height="34" rx="8" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="66" y="134" width="22" height="34" rx="8" data-colorzone="skin-body" fill="#D4A574"/>
      </svg>`,
    },

    // ── Head ──
    {
      id: "head",
      name: "Head",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [
        { id: "skin-head", name: "Head Skin", selector: "skin-head", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="40" rx="26" ry="32" data-colorzone="skin-head" fill="#D4A574"/>
        <!-- Pointed ears -->
        <path d="M34 38c-6-2-10 4-8 12c2 6 6 8 8 4c2-4 2-8 0-16z" data-colorzone="skin-head" fill="#D4A574"/>
        <path d="M86 38c6-2 10 4 8 12c-2 6-6 8-8 4c-2-4-2-8 0-16z" data-colorzone="skin-head" fill="#D4A574"/>
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
        <ellipse cx="46" cy="36" rx="6" ry="7" fill="#FFFFFF"/>
        <circle cx="47" cy="37" r="3.5" fill="#22D3EE"/>
        <circle cx="45" cy="34" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="74" cy="36" rx="6" ry="7" fill="#FFFFFF"/>
        <circle cx="73" cy="37" r="3.5" fill="#22D3EE"/>
        <circle cx="71" cy="34" r="1.5" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Eyebrows ──
    {
      id: "eyebrows",
      name: "Eyebrows",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 24c4-4 12-4 16-2" data-colorzone="brows" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M68 22c4-2 12-2 16 2" data-colorzone="brows" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth ──
    {
      id: "mouth",
      name: "Mouth",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 52c4 4 16 4 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Hair (long elven style) ──
    {
      id: "hair",
      name: "Hair",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "hair", name: "Hair", selector: "hair", defaultColor: "#FFD460", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 36c0-18 12-28 26-28s26 10 26 28c0 10-4 14-8 16c-4 2-8 2-8 2l-8 8c0 4 2 12 4 16c2 6 0 8-4 8c-4 0-8-2-10-8c-2-4-4-12-4-16l-8-8s-4 0-8-2c-4-2-8-6-8-16z" data-colorzone="hair" fill="#FFD460"/>
      </svg>`,
    },

    // ── Tunic ──
    {
      id: "tunic",
      name: "Tunic",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "tunic-primary", name: "Tunic", selector: "tunic-primary", defaultColor: "#22C55E", propertyPath: "outfitColors.primary" },
        { id: "tunic-trim", name: "Trim", selector: "tunic-trim", defaultColor: "#FBBF24", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 70c0-4 4-8 10-8h28c6 0 10 4 10 8v50c0 4-4 8-10 8H46c-6 0-10-4-10-8V70z" data-colorzone="tunic-primary" fill="#22C55E"/>
        <path d="M46 62l14 16 14-16" data-colorzone="tunic-trim" fill="#FBBF24"/>
        <rect x="38" y="126" width="20" height="34" rx="4" data-colorzone="tunic-primary" fill="#22C55E"/>
        <rect x="62" y="126" width="20" height="34" rx="4" data-colorzone="tunic-primary" fill="#22C55E"/>
        <!-- Belt -->
        <rect x="38" y="106" width="44" height="6" rx="3" fill="#8B5E3C"/>
        <rect x="56" y="104" width="8" height="10" rx="2" fill="#FBBF24"/>
      </svg>`,
    },

    // ── Boots ──
    {
      id: "boots",
      name: "Boots",
      zIndex: 6,
      defaultVisible: true,
      colorZones: [
        { id: "boots", name: "Boots", selector: "boots", defaultColor: "#5C3A21", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="32" y="154" width="22" height="18" rx="4" data-colorzone="boots" fill="#5C3A21"/>
        <rect x="66" y="154" width="22" height="18" rx="4" data-colorzone="boots" fill="#5C3A21"/>
      </svg>`,
    },

    // ── Cloak ──
    {
      id: "cloak",
      name: "Cloak",
      zIndex: 3,
      defaultVisible: false,
      colorZones: [
        { id: "cloak-zone", name: "Cloak", selector: "cloak-zone", defaultColor: "#1A1A2E", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 60c0-4 8-8 20-8s20 4 20 8c0 8-4 16-8 24c-4 8-8 20-12 28c-4-8-8-20-12-28c-4-8-8-16-8-24z" data-colorzone="cloak-zone" fill="#1A1A2E" opacity="0.8"/>
        <rect x="38" y="56" width="44" height="6" rx="2" fill="#FBBF24" opacity="0.6"/>
      </svg>`,
    },

    // ── Bow ──
    {
      id: "bow",
      name: "Bow",
      zIndex: 8,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Bow arc (on the left side) -->
        <path d="M20 60c-8 14-10 40 0 64" stroke="#8B5E3C" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Bow string -->
        <line x1="20" y1="60" x2="20" y2="124" stroke="#D4A574" stroke-width="1"/>
        <!-- Arrow -->
        <line x1="20" y1="100" x2="50" y2="90" stroke="#3D2314" stroke-width="1.5"/>
        <path d="M50 90l-4-4v8z" fill="#C0392B"/>
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
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 45 },
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 60 },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
    ]},
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin-head", "skin-body"], defaultValue: "#D4A574" },
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair", "brows"], defaultValue: "#FFD460" },
    { id: "outfit-primary", type: "color", label: "Tunic Color", section: "clothing", targets: ["tunic-primary", "outfitColors.primary"], defaultValue: "#22C55E" },
    { id: "outfit-secondary", type: "color", label: "Boots/Cloak Color", section: "clothing", targets: ["boots", "cloak-zone", "outfitColors.secondary"], defaultValue: "#5C3A21" },
    { id: "accent-color", type: "color", label: "Trim Color", section: "clothing", targets: ["tunic-trim", "outfitColors.accent"], defaultValue: "#FBBF24" },
    { id: "cloak", type: "toggle", label: "Cloak", section: "accessories", targets: ["cloak"], defaultValue: false },
    { id: "bow", type: "toggle", label: "Bow", section: "accessories", targets: ["bow"], defaultValue: false },
  ],
});
