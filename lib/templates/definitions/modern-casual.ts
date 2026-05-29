import { registerTemplate } from "../registry";

registerTemplate({
  id: "modern-casual",
  name: "Street Style",
  category: "modern",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Head -->
    <ellipse cx="30" cy="20" rx="10" ry="11" fill="#D4A574"/>
    <!-- Cap -->
    <path d="M20 18c2-6 18-6 20 0v2H20v-2z" fill="#3B82F6"/>
    <!-- Hoodie body -->
    <rect x="16" y="36" width="28" height="30" rx="6" fill="#3B82F6"/>
    <!-- Hood -->
    <path d="M18 36c-2 0-4-2-4-4v-2c0-4 6-6 16-6s16 2 16 6v2c0 2-2 4-4 4H18z" fill="#3B82F6"/>
    <!-- Legs -->
    <rect x="20" y="64" width="8" height="14" rx="3" fill="#1F2937"/>
    <rect x="32" y="64" width="8" height="14" rx="3" fill="#1F2937"/>
    <!-- Sneakers -->
    <ellipse cx="24" cy="79" rx="7" ry="3" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="0.5"/>
    <ellipse cx="36" cy="79" rx="7" ry="3" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="0.5"/>
  </svg>`,

  layers: [
    // ── Body / Torso ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "skin", name: "Skin", selector: "skin", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Neck -->
        <rect x="48" y="52" width="24" height="16" rx="4" fill="#D4A574"/>
        <!-- Torso base -->
        <ellipse cx="60" cy="104" rx="34" ry="38" fill="#D4A574"/>
        <!-- Arms -->
        <rect x="10" y="68" width="24" height="58" rx="10" fill="#D4A574"/>
        <rect x="86" y="68" width="24" height="58" rx="10" fill="#D4A574"/>
        <!-- Hands -->
        <circle cx="22" cy="126" r="10" fill="#D4A574"/>
        <circle cx="98" cy="126" r="10" fill="#D4A574"/>
        <!-- Legs -->
        <rect x="28" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
        <rect x="68" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <ellipse cx="60" cy="36" rx="26" ry="30" data-colorzone="skin-head" fill="#D4A574"/>
        <ellipse cx="32" cy="34" rx="8" ry="11" data-colorzone="skin-head" fill="#D4A574"/>
        <ellipse cx="88" cy="34" rx="8" ry="11" data-colorzone="skin-head" fill="#D4A574"/>
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
      colorZones: [
        { id: "brows", name: "Brows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M36 22c4-3 10-3 14 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 22c4-3 10-3 14 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
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
        { id: "hair", name: "Hair", selector: "hair", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <path d="M34 28c-2-18 12-26 26-26s28 8 26 26c0 6-4 10-8 12H42c-4-2-8-6-8-12z" data-colorzone="hair" fill="#3D2314"/>
      </svg>`,
    },

    // ── Hoodie ──
    {
      id: "hoodie",
      name: "Hoodie",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "hoodie", name: "Hoodie", selector: "hoodie", defaultColor: "#3B82F6", propertyPath: "outfitColors.primary" },
        { id: "hoodie-lining", name: "Hood Lining", selector: "hoodie-lining", defaultColor: "#60A5FA", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Hoodie body -->
        <path d="M30 66c-2 0-6-2-8-6v-4c0-6 8-10 16-12h44c8 2 16 6 16 12v4c-2 4-6 6-8 6H30z" data-colorzone="hoodie" fill="#3B82F6"/>
        <!-- Hoodie body extended -->
        <path d="M22 66c-4 0-8 4-8 8v40c0 6 4 10 10 10h72c6 0 10-4 10-10V74c0-4-4-8-8-8H22z" data-colorzone="hoodie" fill="#3B82F6"/>
        <!-- Hood opening / lining -->
        <path d="M36 56c-2 4-4 6-6 6" stroke="#3D2314" stroke-width="1.5" opacity="0.3"/>
        <path d="M84 56c2 4 4 6 6 6" stroke="#3D2314" stroke-width="1.5" opacity="0.3"/>
        <!-- Drawstrings -->
        <path d="M56 62c-2 6-4 14-2 18" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        <path d="M64 62c2 6 4 14 2 18" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        <!-- Front pocket -->
        <path d="M40 96c0-4 8-6 20-6s20 2 20 6v2c0 4-8 6-20 6s-20-2-20-6v-2z" data-colorzone="hoodie-lining" fill="#60A5FA" opacity="0.5"/>
        <!-- Sleeve cuffs -->
        <rect x="12" y="58" width="18" height="10" rx="4" data-colorzone="hoodie" fill="#2563EB"/>
        <rect x="90" y="58" width="18" height="10" rx="4" data-colorzone="hoodie" fill="#2563EB"/>
        <!-- Hem -->
        <rect x="24" y="120" width="72" height="8" rx="3" data-colorzone="hoodie" fill="#2563EB"/>
      </svg>`,
    },

    // ── Pants / Jeans ──
    {
      id: "pants",
      name: "Pants",
      zIndex: 3,
      defaultVisible: true,
      colorZones: [
        { id: "pants", name: "Pants", selector: "pants", defaultColor: "#1F2937", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Left leg -->
        <rect x="26" y="136" width="26" height="32" rx="4" data-colorzone="pants" fill="#1F2937"/>
        <!-- Right leg -->
        <rect x="68" y="136" width="26" height="32" rx="4" data-colorzone="pants" fill="#1F2937"/>
        <!-- Belt loops -->
        <rect x="34" y="134" width="4" height="6" rx="1" fill="#FFFFFF" opacity="0.3"/>
        <rect x="82" y="134" width="4" height="6" rx="1" fill="#FFFFFF" opacity="0.3"/>
      </svg>`,
    },

    // ── Sneakers ──
    {
      id: "sneakers",
      name: "Sneakers",
      zIndex: 4,
      defaultVisible: true,
      colorZones: [
        { id: "sneakers", name: "Sneakers", selector: "sneakers", defaultColor: "#FFFFFF", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Left sneaker -->
        <ellipse cx="39" cy="172" rx="16" ry="7" data-colorzone="sneakers" fill="#FFFFFF"/>
        <!-- Left sole -->
        <rect x="24" y="172" width="30" height="5" rx="2" fill="#9CA3AF"/>
        <!-- Left stripe -->
        <line x1="28" y1="170" x2="50" y2="170" stroke="#3B82F6" stroke-width="1.5" opacity="0.7"/>
        <!-- Left ankle -->
        <rect x="30" y="165" width="18" height="5" rx="1.5" data-colorzone="sneakers" fill="#FFFFFF"/>
        <!-- Right sneaker -->
        <ellipse cx="81" cy="172" rx="16" ry="7" data-colorzone="sneakers" fill="#FFFFFF"/>
        <!-- Right sole -->
        <rect x="66" y="172" width="30" height="5" rx="2" fill="#9CA3AF"/>
        <!-- Right stripe -->
        <line x1="70" y1="170" x2="92" y2="170" stroke="#3B82F6" stroke-width="1.5" opacity="0.7"/>
        <!-- Right ankle -->
        <rect x="72" y="165" width="18" height="5" rx="1.5" data-colorzone="sneakers" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Baseball Cap ──
    {
      id: "baseball-cap",
      name: "Baseball Cap",
      zIndex: 30,
      defaultVisible: false,
      colorZones: [
        { id: "cap", name: "Cap", selector: "cap", defaultColor: "#1F2937", propertyPath: "outfitColors.primary" },
        { id: "cap-brim", name: "Brim", selector: "cap-brim", defaultColor: "#111827", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Cap dome -->
        <path d="M32 28c0-14 10-20 28-20s28 6 28 20v2H32v-2z" data-colorzone="cap" fill="#1F2937"/>
        <!-- Cap brim -->
        <path d="M28 30c4-4 28-6 32-6s28 2 32 6c-4 2-28 4-32 4s-28-2-32-4z" data-colorzone="cap-brim" fill="#111827"/>
        <!-- Button on top -->
        <circle cx="60" cy="8" r="3" fill="#374151"/>
        <!-- Ventilation holes -->
        <circle cx="52" cy="16" r="1" fill="#374151"/>
        <circle cx="60" cy="14" r="1" fill="#374151"/>
        <circle cx="68" cy="16" r="1" fill="#374151"/>
      </svg>`,
    },

    // ── Headphones ──
    {
      id: "headphones",
      name: "Headphones",
      zIndex: 27,
      defaultVisible: false,
      colorZones: [
        { id: "headphones", name: "Headphones", selector: "headphones", defaultColor: "#111827", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Headband -->
        <path d="M36 26c-4-14 16-22 24-22s28 8 24 22" stroke="#111827" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Left ear cup -->
        <ellipse cx="32" cy="34" rx="10" ry="12" data-colorzone="headphones" fill="#111827"/>
        <ellipse cx="32" cy="34" rx="6" ry="8" fill="#374151"/>
        <!-- Right ear cup -->
        <ellipse cx="88" cy="34" rx="10" ry="12" data-colorzone="headphones" fill="#111827"/>
        <ellipse cx="88" cy="34" rx="6" ry="8" fill="#374151"/>
        <!-- Brand mark -->
        <rect x="54" y="14" width="12" height="4" rx="1" fill="#3B82F6" opacity="0.6"/>
      </svg>`,
    },

    // ── Watch ──
    {
      id: "watch",
      name: "Watch",
      zIndex: 8,
      defaultVisible: false,
      colorZones: [
        { id: "watch", name: "Watch", selector: "watch", defaultColor: "#111827", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Watch face -->
        <circle cx="104" cy="80" r="7" data-colorzone="watch" fill="#111827"/>
        <circle cx="104" cy="80" r="5.5" fill="#1A1A2E"/>
        <!-- Watch hands -->
        <line x1="104" y1="80" x2="104" y2="76" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round"/>
        <line x1="104" y1="80" x2="107" y2="80" stroke="#FFFFFF" stroke-width="0.6" stroke-linecap="round"/>
        <!-- Watch band -->
        <rect x="100" y="74" width="8" height="28" rx="2" fill="#374151"/>
      </svg>`,
    },

    // ── Backpack ──
    {
      id: "backpack",
      name: "Backpack",
      zIndex: 1,
      defaultVisible: false,
      colorZones: [
        { id: "backpack", name: "Backpack", selector: "backpack", defaultColor: "#2563EB", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg\">
        <!-- Backpack body -->
        <rect x="10" y="66" width="22" height="40" rx="6" data-colorzone="backpack" fill="#2563EB"/>
        <!-- Backpack flap -->
        <path d="M10 72c4-6 18-6 22 0v4H10v-4z" fill="#1D4ED8"/>
        <!-- Zipper -->
        <line x1="21" y1="74" x2="21" y2="104" stroke="#FFFFFF" stroke-width="1" opacity="0.5" stroke-dasharray="2 2"/>
        <!-- Side pocket -->
        <rect x="10" y="86" width="8" height="12" rx="2" fill="#1D4ED8"/>
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
      { label: "Curvy", value: "curvy" },
      { label: "Broad", value: "broad" },
      { label: "Petite", value: "petite" },
    ]},

    // Body
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 48 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 45 },

    // Face
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 55 },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
      { label: "Surprised", value: "surprised" },
      { label: "Sad", value: "sad" },
    ]},
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin", "skin-head"], defaultValue: "#D4A574" },

    // Hair
    { id: "hair-style", type: "select", label: "Style", section: "hair", targets: ["hairStyle"], options: [
      { label: "Short", value: "short" },
      { label: "Long", value: "long" },
      { label: "Curly", value: "curly" },
      { label: "Wavy", value: "wavy" },
      { label: "Ponytail", value: "ponytail" },
      { label: "Bun", value: "bun" },
    ]},
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair"], defaultValue: "#3D2314" },

    // Clothing
    { id: "outfit", type: "select", label: "Style", section: "clothing", targets: ["outfit"], options: [
      { label: "Casual", value: "casual" },
      { label: "Sporty", value: "sporty" },
      { label: "Formal", value: "formal" },
    ]},
    { id: "hoodie-color", type: "color", label: "Hoodie Color", section: "clothing", targets: ["hoodie", "outfitColors.primary"], defaultValue: "#3B82F6" },
    { id: "pants-color", type: "color", label: "Pants Color", section: "clothing", targets: ["pants", "outfitColors.secondary"], defaultValue: "#1F2937" },
    { id: "sneaker-color", type: "color", label: "Sneaker Color", section: "clothing", targets: ["sneakers", "outfitColors.accent"], defaultValue: "#FFFFFF" },

    // Accessories
    { id: "baseball-cap", type: "toggle", label: "Baseball Cap", section: "accessories", targets: ["baseball-cap"], defaultValue: false },
    { id: "headphones", type: "toggle", label: "Headphones", section: "accessories", targets: ["headphones"], defaultValue: false },
    { id: "watch", type: "toggle", label: "Watch", section: "accessories", targets: ["watch"], defaultValue: false },
    { id: "backpack", type: "toggle", label: "Backpack", section: "accessories", targets: ["backpack"], defaultValue: false },
  ],
});
