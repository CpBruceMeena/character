import { registerTemplate } from "../registry";

registerTemplate({
  id: "victorian-gentleman",
  name: "Victorian Gentleman",
  category: "historical",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Top hat -->
    <rect x="22" y="4" width="16" height="16" rx="2" fill="#1A1A1A"/>
    <ellipse cx="30" cy="20" rx="14" ry="4" fill="#1A1A1A"/>
    <!-- Head -->
    <ellipse cx="30" cy="26" rx="9" ry="10" fill="#D4A574"/>
    <!-- Cravat -->
    <rect x="24" y="34" width="12" height="4" rx="1" fill="#C0392B"/>
    <!-- Tailcoat -->
    <rect x="16" y="40" width="28" height="24" rx="4" fill="#1F2937"/>
    <!-- Waistcoat -->
    <rect x="22" y="40" width="16" height="16" rx="2" fill="#8B5E3C"/>
    <!-- Pants -->
    <rect x="20" y="62" width="8" height="14" rx="2" fill="#374151"/>
    <rect x="32" y="62" width="8" height="14" rx="2" fill="#374151"/>
    <!-- Boots -->
    <ellipse cx="24" cy="78" rx="6" ry="3" fill="#1A1A1A"/>
    <ellipse cx="36" cy="78" rx="6" ry="3" fill="#1A1A1A"/>
    <!-- Monocle -->
    <circle cx="34" cy="24" r="3.5" fill="none" stroke="#D4A84B" stroke-width="0.8"/>
    <!-- Cane -->
    <line x1="46" y1="38" x2="44" y2="78" stroke="#5C4033" stroke-width="1.5"/>
  </svg>`,

  layers: [
    // ── Torso (skin base) ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "skin", name: "Skin", selector: "skin", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Neck -->
        <rect x="48" y="52" width="24" height="16" rx="4" fill="#D4A574"/>
        <!-- Torso -->
        <ellipse cx="60" cy="104" rx="34" ry="38" fill="#D4A574"/>
        <!-- Arms -->
        <rect x="10" y="68" width="22" height="58" rx="10" fill="#D4A574"/>
        <rect x="88" y="68" width="22" height="58" rx="10" fill="#D4A574"/>
        <!-- Hands -->
        <circle cx="21" cy="126" r="9" fill="#D4A574"/>
        <circle cx="99" cy="126" r="9" fill="#D4A574"/>
        <!-- Legs -->
        <rect x="28" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
        <rect x="68" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
      </svg>`,
    },

    // ── Shirt (with collar) ──
    {
      id: "shirt",
      name: "Shirt",
      zIndex: 1,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shirt body -->
        <ellipse cx="60" cy="102" rx="32" ry="36" fill="#F5F0EB"/>
        <rect x="14" y="70" width="18" height="54" rx="8" fill="#F5F0EB"/>
        <rect x="88" y="70" width="18" height="54" rx="8" fill="#F5F0EB"/>
        <!-- Wing collar -->
        <path d="M46 56l4 8c0 4-2 6-4 6h-4c-2 0-4-2-4-6l4-8h4z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5"/>
        <path d="M74 56l-4 8c0 4 2 6 4 6h4c2 0 4-2 4-6l-4-8h-4z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5"/>
        <!-- Collar stud -->
        <circle cx="60" cy="64" r="2" fill="#D4A84B"/>
        <!-- Shirt placket -->
        <rect x="58" y="64" width="4" height="60" rx="1" fill="#E5E7EB" opacity="0.5"/>
        <!-- Buttons -->
        <circle cx="60" cy="76" r="1.5" fill="#D4A84B"/>
        <circle cx="60" cy="90" r="1.5" fill="#D4A84B"/>
        <circle cx="60" cy="104" r="1.5" fill="#D4A84B"/>
        <!-- Cuffs -->
        <rect x="14" y="120" width="18" height="6" rx="2" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5"/>
        <rect x="88" y="120" width="18" height="6" rx="2" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.5"/>
      </svg>`,
    },

    // ── Trousers ──
    {
      id: "pants",
      name: "Trousers",
      zIndex: 2,
      defaultVisible: true,
      colorZones: [
        { id: "pants", name: "Trousers", selector: "pants", defaultColor: "#374151", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left leg -->
        <rect x="26" y="136" width="26" height="34" rx="4" data-colorzone="pants" fill="#374151"/>
        <!-- Right leg -->
        <rect x="68" y="136" width="26" height="34" rx="4" data-colorzone="pants" fill="#374151"/>
        <!-- Crease lines -->
        <line x1="39" y1="138" x2="39" y2="168" stroke="#2D3748" stroke-width="0.5" opacity="0.5"/>
        <line x1="81" y1="138" x2="81" y2="168" stroke="#2D3748" stroke-width="0.5" opacity="0.5"/>
        <!-- Waistband -->
        <rect x="26" y="134" width="68" height="4" rx="1" data-colorzone="pants" fill="#2D3748"/>
      </svg>`,
    },

    // ── Boots ──
    {
      id: "boots",
      name: "Boots",
      zIndex: 3,
      defaultVisible: true,
      colorZones: [
        { id: "boots", name: "Boots", selector: "boots", defaultColor: "#1A1A1A", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left boot shaft -->
        <rect x="28" y="162" width="22" height="10" rx="2" data-colorzone="boots" fill="#1A1A1A"/>
        <!-- Right boot shaft -->
        <rect x="70" y="162" width="22" height="10" rx="2" data-colorzone="boots" fill="#1A1A1A"/>
        <!-- Left boot -->
        <ellipse cx="39" cy="174" rx="16" ry="6" data-colorzone="boots" fill="#1A1A1A"/>
        <!-- Right boot -->
        <ellipse cx="81" cy="174" rx="16" ry="6" data-colorzone="boots" fill="#1A1A1A"/>
        <!-- Left heel -->
        <rect x="26" y="170" width="8" height="4" rx="1" fill="#111827"/>
        <!-- Right heel -->
        <rect x="86" y="170" width="8" height="4" rx="1" fill="#111827"/>
        <!-- Left shine highlight -->
        <ellipse cx="35" cy="172" rx="6" ry="2" fill="#FFFFFF" opacity="0.1"/>
        <!-- Right shine highlight -->
        <ellipse cx="85" cy="172" rx="6" ry="2" fill="#FFFFFF" opacity="0.1"/>
      </svg>`,
    },

    // ── Tailcoat ──
    {
      id: "tailcoat",
      name: "Tailcoat",
      zIndex: 4,
      defaultVisible: true,
      colorZones: [
        { id: "tailcoat", name: "Tailcoat", selector: "tailcoat", defaultColor: "#1F2937", propertyPath: "outfitColors.primary" },
        { id: "tailcoat-lapels", name: "Lapels", selector: "tailcoat-lapels", defaultColor: "#111827", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Tailcoat body -->
        <path d="M30 68c-4 0-8 4-8 8v36c0 6 4 10 10 10h56c6 0 10-4 10-10V76c0-4-4-8-8-8H30z" data-colorzone="tailcoat" fill="#1F2937"/>
        <!-- Tailcoat tails -->
        <path d="M22 112c0 6 6 14 10 16h16V112H22z" data-colorzone="tailcoat" fill="#1F2937"/>
        <path d="M72 112v16h16c4-2 10-10 10-16H72z" data-colorzone="tailcoat" fill="#1F2937"/>
        <!-- Lapels (left) -->
        <path d="M40 68l-4 8v18l8-4V72l-4-4z" data-colorzone="tailcoat-lapels" fill="#111827"/>
        <!-- Lapels (right) -->
        <path d="M80 68l4 8v18l-8-4V72l4-4z" data-colorzone="tailcoat-lapels" fill="#111827"/>
        <!-- Sleeves -->
        <rect x="10" y="68" width="22" height="56" rx="8" data-colorzone="tailcoat" fill="#1F2937"/>
        <rect x="88" y="68" width="22" height="56" rx="8" data-colorzone="tailcoat" fill="#1F2937"/>
        <!-- Tailcoat buttons -->
        <circle cx="48" cy="82" r="2" fill="#D4A84B"/>
        <circle cx="48" cy="94" r="2" fill="#D4A84B"/>
        <circle cx="48" cy="106" r="2" fill="#D4A84B"/>
        <!-- Pocket square -->
        <rect x="70" y="90" width="10" height="4" rx="1" fill="#FFFFFF" opacity="0.8"/>
        <path d="M72 90c2-2 6-2 8 0l-2 2H74l-2-2z" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Waistcoat ──
    {
      id: "waistcoat",
      name: "Waistcoat",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "waistcoat", name: "Waistcoat", selector: "waistcoat", defaultColor: "#8B5E3C", propertyPath: "outfitColors.secondary" },
        { id: "waistcoat-buttons", name: "Buttons", selector: "waistcoat-buttons", defaultColor: "#D4A84B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Waistcoat body -->
        <path d="M36 68c-2 0-4 2-4 4v46c0 4 2 6 6 6h12V66H36z" data-colorzone="waistcoat" fill="#8B5E3C"/>
        <path d="M72 66h12c4 0 6-2 6-6V68c0-2-2-4-4-4H72z" data-colorzone="waistcoat" fill="#8B5E3C"/>
        <!-- Waistcoat left panel -->
        <path d="M36 68c-2 0-4 2-4 4v42c0 4 2 6 6 6h12V66H36z" data-colorzone="waistcoat" fill="#7A5232"/>
        <path d="M70 66v54h12c4 0 6-2 6-6V72c0-2-2-4-4-4H70z" data-colorzone="waistcoat" fill="#7A5232"/>
        <!-- V-neck opening -->
        <path d="M48 66l4 20h16l4-20" fill="#F5F0EB"/>
        <!-- Waistcoat buttons -->
        <circle cx="60" cy="80" r="2" data-colorzone="waistcoat-buttons" fill="#D4A84B"/>
        <circle cx="60" cy="92" r="2" data-colorzone="waistcoat-buttons" fill="#D4A84B"/>
        <circle cx="60" cy="104" r="2" data-colorzone="waistcoat-buttons" fill="#D4A84B"/>
        <!-- Pocket -->
        <rect x="44" y="100" width="12" height="2" rx="1" fill="#6B4226" opacity="0.6"/>
        <rect x="76" y="100" width="12" height="2" rx="1" fill="#6B4226" opacity="0.6"/>
      </svg>`,
    },

    // ── Cravat (necktie) ──
    {
      id: "cravat",
      name: "Cravat",
      zIndex: 6,
      defaultVisible: true,
      colorZones: [
        { id: "cravat", name: "Cravat", selector: "cravat", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cravat knot -->
        <ellipse cx="60" cy="64" rx="8" ry="5" data-colorzone="cravat" fill="#C0392B"/>
        <!-- Cravat folds -->
        <path d="M52 64c-2 2-6 8-6 14c0 6 4 8 6 6c2-2 4-4 8-4s6 2 8 4c2 2 6 0 6-6c0-6-4-12-6-14" data-colorzone="cravat" fill="#C0392B"/>
        <!-- Cravat pin -->
        <circle cx="60" cy="70" r="2" fill="#D4A84B"/>
        <!-- Fold detail -->
        <line x1="56" y1="68" x2="56" y2="80" stroke="#A02020" stroke-width="0.5" opacity="0.4"/>
        <line x1="64" y1="68" x2="64" y2="80" stroke="#A02020" stroke-width="0.5" opacity="0.4"/>
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
        <ellipse cx="60" cy="36" rx="24" ry="30" data-colorzone="skin-head" fill="#D4A574"/>
        <ellipse cx="36" cy="34" rx="7" ry="10" data-colorzone="skin-head" fill="#D4A574"/>
        <ellipse cx="84" cy="34" rx="7" ry="10" data-colorzone="skin-head" fill="#D4A574"/>
        <!-- Ears -->
        <ellipse cx="34" cy="36" rx="4" ry="6" fill="#D4A574"/>
        <ellipse cx="86" cy="36" rx="4" ry="6" fill="#D4A574"/>
        <!-- Cheekbone shadows -->
        <ellipse cx="44" cy="42" rx="6" ry="3" fill="#C68642" opacity="0.15"/>
        <ellipse cx="76" cy="42" rx="6" ry="3" fill="#C68642" opacity="0.15"/>
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
        <!-- Left eye -->
        <ellipse cx="48" cy="34" rx="5" ry="5" fill="#FFFFFF"/>
        <circle cx="49" cy="34" r="3" fill="#3D2314"/>
        <circle cx="47" cy="32" r="1.2" fill="#FFFFFF"/>
        <!-- Right eye -->
        <ellipse cx="72" cy="34" rx="5" ry="5" fill="#FFFFFF"/>
        <circle cx="71" cy="34" r="3" fill="#3D2314"/>
        <circle cx="69" cy="32" r="1.2" fill="#FFFFFF"/>
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <!-- Left brow -->
          <path d="M38 22c3-3 8-3 12 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Right brow -->
          <path d="M70 22c3-3 8-3 12 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ═══════════════════════════════════
    //  MOUTH EXPRESSION VARIANTS
    // ═══════════════════════════════════

    {
      id: "mouth-neutral",
      name: "Mouth (Neutral)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["neutral"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 56c4-2 16-2 20 0" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    },
    {
      id: "mouth-surprised",
      name: "Mouth (Surprised)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["surprised"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 56c4-2 16-2 20 2" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Hair (slicked back / side-parted) ──
    {
      id: "hair",
      name: "Hair",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "hair", name: "Hair", selector: "hair", defaultColor: "#1A1A1A", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Side-parted hair -->
        <path d="M34 28c-2-18 12-26 26-26 10 0 18 4 22 12c4 8 4 14 2 18c-2 4-6 6-10 6H42c-4 0-8-2-8-10z" data-colorzone="hair" fill="#1A1A1A"/>
        <!-- Side part line -->
        <path d="M52 6c2 4 0 10-2 16" stroke="#111827" stroke-width="1" opacity="0.4"/>
        <!-- Slicked back sides -->
        <path d="M28 32c-2-6 2-14 8-18" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M92 32c2-6-2-14-8-18" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Sideburns -->
        <path d="M36 34c-2 4 0 10 2 12" stroke="#1A1A1A" stroke-width="2.5" fill="none"/>
        <path d="M84 34c2 4 0 10-2 12" stroke="#1A1A1A" stroke-width="2.5" fill="none"/>
      </svg>`,
    },

    // ── Mustache ──
    {
      id: "mustache",
      name: "Mustache",
      zIndex: 22,
      defaultVisible: false,
      colorZones: [
        { id: "mustache", name: "Mustache", selector: "mustache", defaultColor: "#1A1A1A", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Handlebar mustache -->
        <path d="M40 48c4-4 8-2 12 0c2-1 6-1 8 0c4-4 8-2 12 0" stroke="#1A1A1A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Left curl -->
        <path d="M40 48c-2 2-2 4 0 4c2 0 4-2 4-4" stroke="#1A1A1A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Right curl -->
        <path d="M80 48c2 2 2 4 0 4c-2 0-4-2-4-4" stroke="#1A1A1A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Mustache fill -->
        <path d="M44 48c2-2 6 0 8 2c2-2 6-4 10-2c4-2 8 0 10 2c2-2 6-4 8 0" data-colorzone="mustache" fill="#1A1A1A" opacity="0.8"/>
      </svg>`,
    },

    // ── Top Hat ──
    {
      id: "top-hat",
      name: "Top Hat",
      zIndex: 30,
      defaultVisible: true,
      colorZones: [
        { id: "top-hat", name: "Top Hat", selector: "top-hat", defaultColor: "#1A1A1A", propertyPath: "outfitColors.primary" },
        { id: "hat-band", name: "Hat Band", selector: "hat-band", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hat crown -->
        <rect x="38" y="4" width="44" height="22" rx="3" data-colorzone="top-hat" fill="#1A1A1A"/>
        <!-- Hat brim -->
        <ellipse cx="60" cy="26" rx="32" ry="6" data-colorzone="top-hat" fill="#1A1A1A"/>
        <!-- Hat band -->
        <rect x="38" y="20" width="44" height="5" rx="1.5" data-colorzone="hat-band" fill="#C0392B"/>
        <!-- Hat brim top -->
        <ellipse cx="60" cy="4" rx="22" ry="3" data-colorzone="top-hat" fill="#2D2D2D"/>
        <!-- Hat highlight -->
        <path d="M42 6c0-2 16-4 20-2" stroke="#FFFFFF" stroke-width="0.8" opacity="0.15" fill="none"/>
        <!-- Hat band buckle -->
        <rect x="56" y="19" width="8" height="7" rx="1.5" fill="#D4A84B"/>
        <rect x="58" y="21" width="4" height="3" rx="0.5" fill="#1A1A1A"/>
      </svg>`,
    },

    // ── Monocle ──
    {
      id: "monocle",
      name: "Monocle",
      zIndex: 27,
      defaultVisible: false,
      colorZones: [
        { id: "monocle-rim", name: "Monocle Rim", selector: "monocle-rim", defaultColor: "#D4A84B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Monocle rim -->
        <circle cx="72" cy="34" r="9" data-colorzone="monocle-rim" fill="none" stroke="#D4A84B" stroke-width="2"/>
        <!-- Lens glass -->
        <circle cx="72" cy="34" r="7" fill="#FFFFFF" opacity="0.08"/>
        <!-- Lens glare -->
        <path d="M67 30c0-2 2-3 4-2" stroke="#FFFFFF" stroke-width="1" opacity="0.4" fill="none"/>
        <!-- Chain -->
        <path d="M72 25c0-6 4-10 8-12" stroke="#D4A84B" stroke-width="1" fill="none" stroke-dasharray="1.5 2"/>
        <!-- Chain end -->
        <circle cx="80" cy="18" r="1.5" fill="#D4A84B"/>
      </svg>`,
    },

    // ── Walking Cane ──
    {
      id: "walking-cane",
      name: "Walking Cane",
      zIndex: 8,
      defaultVisible: false,
      colorZones: [
        { id: "cane-shaft", name: "Cane Shaft", selector: "cane-shaft", defaultColor: "#5C4033", propertyPath: "outfitColors.secondary" },
        { id: "cane-handle", name: "Cane Handle", selector: "cane-handle", defaultColor: "#D4A84B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cane shaft -->
        <line x1="110" y1="36" x2="108" y2="172" data-colorzone="cane-shaft" stroke="#5C4033" stroke-width="3" stroke-linecap="round"/>
        <!-- Cane handle (curved) -->
        <path d="M110 36c0-8-6-14-14-12" data-colorzone="cane-handle" stroke="#D4A84B" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Cane ferrule (tip) -->
        <rect x="106" y="168" width="6" height="6" rx="1" fill="#D4A84B"/>
        <!-- Handle detail -->
        <circle cx="96" cy="25" r="1.5" fill="#C0A060"/>
      </svg>`,
    },

    // ── Pocket Watch ──
    {
      id: "pocket-watch",
      name: "Pocket Watch",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [
        { id: "pocket-watch", name: "Pocket Watch", selector: "pocket-watch", defaultColor: "#D4A84B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Chain -->
        <path d="M60 92c-2 6-4 14-2 20" stroke="#D4A84B" stroke-width="1.2" fill="none" stroke-dasharray="1.5 2"/>
        <!-- Watch body -->
        <circle cx="58" cy="116" r="8" data-colorzone="pocket-watch" fill="#D4A84B"/>
        <!-- Watch face -->
        <circle cx="58" cy="116" r="6" fill="#F5F0EB"/>
        <!-- Watch hands -->
        <line x1="58" y1="116" x2="58" y2="112" stroke="#1A1A1A" stroke-width="0.8" stroke-linecap="round"/>
        <line x1="58" y1="116" x2="61" y2="116" stroke="#1A1A1A" stroke-width="0.6" stroke-linecap="round"/>
        <!-- Crown -->
        <circle cx="58" cy="107" r="2" fill="#D4A84B"/>
        <!-- Numbers -->
        <circle cx="58" cy="111" r="0.5" fill="#1A1A1A" opacity="0.4"/>
        <circle cx="62" cy="116" r="0.5" fill="#1A1A1A" opacity="0.4"/>
        <circle cx="58" cy="121" r="0.5" fill="#1A1A1A" opacity="0.4"/>
        <circle cx="54" cy="116" r="0.5" fill="#1A1A1A" opacity="0.4"/>
      </svg>`,
    },

    // ── Gloves ──
    {
      id: "gloves",
      name: "Gloves",
      zIndex: 6,
      defaultVisible: false,
      colorZones: [
        { id: "gloves", name: "Gloves", selector: "gloves", defaultColor: "#FFFFFF", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left glove -->
        <path d="M12 108c0-8 6-12 10-12v24c0 4-2 8-6 8c-4 0-6-4-6-8l2-12z" data-colorzone="gloves" fill="#FFFFFF"/>
        <circle cx="21" cy="124" r="8" data-colorzone="gloves" fill="#FFFFFF"/>
        <!-- Right glove -->
        <path d="M98 108c0-8-6-12-10-12v24c0 4 2 8 6 8c4 0 6-4 6-8l-2-12z" data-colorzone="gloves" fill="#FFFFFF"/>
        <circle cx="99" cy="124" r="8" data-colorzone="gloves" fill="#FFFFFF"/>
        <!-- Glove cuffs -->
        <rect x="12" y="110" width="10" height="6" rx="2" data-colorzone="gloves" fill="#E5E7EB"/>
        <rect x="98" y="110" width="10" height="6" rx="2" data-colorzone="gloves" fill="#E5E7EB"/>
        <!-- Glove seams -->
        <line x1="16" y1="108" x2="16" y2="132" stroke="#D1D5DB" stroke-width="0.5" opacity="0.5"/>
        <line x1="104" y1="108" x2="104" y2="132" stroke="#D1D5DB" stroke-width="0.5" opacity="0.5"/>
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
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 58 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 48 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 42 },

    // Face
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 50 },
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
      { label: "Slicked Back", value: "slicked" },
      { label: "Side Part", value: "parted" },
      { label: "Curly", value: "curly" },
      { label: "Bald", value: "bald" },
    ]},
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair", "mustache"], defaultValue: "#1A1A1A" },

    // Clothing
    { id: "coat-color", type: "color", label: "Coat Color", section: "clothing", targets: ["tailcoat", "boots", "outfitColors.primary"], defaultValue: "#1F2937" },
    { id: "vest-color", type: "color", label: "Vest Color", section: "clothing", targets: ["waistcoat", "pants", "outfitColors.secondary"], defaultValue: "#8B5E3C" },
    { id: "accent-color", type: "color", label: "Accent Color", section: "clothing", targets: ["cravat", "waistcoat-buttons", "hat-band", "pocket-watch", "outfitColors.accent"], defaultValue: "#C0392B" },

    // Accessories
    { id: "top-hat", type: "toggle", label: "Top Hat", section: "accessories", targets: ["top-hat"], defaultValue: true },
    { id: "monocle", type: "toggle", label: "Monocle", section: "accessories", targets: ["monocle"], defaultValue: false },
    { id: "cravat", type: "toggle", label: "Cravat", section: "accessories", targets: ["cravat"], defaultValue: true },
    { id: "walking-cane", type: "toggle", label: "Walking Cane", section: "accessories", targets: ["walking-cane"], defaultValue: false },
    { id: "pocket-watch", type: "toggle", label: "Pocket Watch", section: "accessories", targets: ["pocket-watch"], defaultValue: false },
    { id: "gloves", type: "toggle", label: "Gloves", section: "accessories", targets: ["gloves"], defaultValue: false },
    { id: "mustache", type: "toggle", label: "Mustache", section: "accessories", targets: ["mustache"], defaultValue: false },
  ],
});
