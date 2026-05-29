import { registerTemplate } from "../registry";

registerTemplate({
  id: "samurai",
  name: "Samurai",
  category: "historical",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Kabuto helmet -->
    <ellipse cx="30" cy="20" rx="11" ry="12" fill="#8B4513"/>
    <!-- Helmet crest -->
    <path d="M26 8c2-4 6-4 8 0l-4 4-4-4z" fill="#C0392B"/>
    <!-- Menpo face -->
    <path d="M22 20c2-4 14-4 16 0l-2 8H24l-2-8z" fill="#6B4226"/>
    <!-- Do armor -->
    <rect x="18" y="34" width="24" height="22" rx="3" fill="#8B4513"/>
    <!-- Sode shoulder -->
    <rect x="8" y="32" width="10" height="14" rx="2" fill="#8B4513"/>
    <rect x="42" y="32" width="10" height="14" rx="2" fill="#8B4513"/>
    <!-- Katana -->
    <path d="M44 36l10 40" stroke="#9E9E9E" stroke-width="2"/>
    <path d="M48 40l4 4" stroke="#8B4513" stroke-width="1.5"/>
    <!-- Legs -->
    <rect x="20" y="56" width="8" height="18" rx="2" fill="#5C4033"/>
    <rect x="32" y="56" width="8" height="18" rx="2" fill="#5C4033"/>
  </svg>`,

  layers: [
    // ── Torso (shitagi undergarment base) ──
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
        <!-- Torso base -->
        <ellipse cx="60" cy="104" rx="32" ry="38" fill="#D4A574"/>
        <!-- Arms -->
        <rect x="12" y="68" width="22" height="58" rx="10" fill="#D4A574"/>
        <rect x="86" y="68" width="22" height="58" rx="10" fill="#D4A574"/>
        <!-- Hands -->
        <circle cx="23" cy="126" r="9" fill="#D4A574"/>
        <circle cx="97" cy="126" r="9" fill="#D4A574"/>
        <!-- Legs -->
        <rect x="28" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
        <rect x="68" y="138" width="24" height="34" rx="8" fill="#D4A574"/>
        <!-- Feet -->
        <ellipse cx="40" cy="172" rx="14" ry="6" fill="#D4A574"/>
        <ellipse cx="80" cy="172" rx="14" ry="6" fill="#D4A574"/>
      </svg>`,
    },

    // ── Hakama (pleated pants) ──
    {
      id: "hakama",
      name: "Hakama",
      zIndex: 2,
      defaultVisible: true,
      colorZones: [
        { id: "hakama", name: "Hakama", selector: "hakama", defaultColor: "#5C4033", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hakama waistband -->
        <rect x="28" y="124" width="64" height="6" rx="2" data-colorzone="hakama" fill="#5C4033"/>
        <!-- Left leg -->
        <path d="M28 130c-2 0-6 4-6 8v34c0 4 4 8 8 8h20c4 0 6-4 6-8v-34c0-4-2-8-6-8H28z" data-colorzone="hakama" fill="#5C4033"/>
        <!-- Right leg -->
        <path d="M62 130c-2 0-6 4-6 8v34c0 4 4 8 8 8h20c4 0 6-4 6-8v-34c0-4-2-8-6-8H62z" data-colorzone="hakama" fill="#5C4033"/>
        <!-- Pleat lines left -->
        <line x1="36" y1="132" x2="36" y2="170" stroke="#4A3525" stroke-width="0.8" opacity="0.4"/>
        <line x1="44" y1="132" x2="44" y2="170" stroke="#4A3525" stroke-width="0.8" opacity="0.4"/>
        <!-- Pleat lines right -->
        <line x1="76" y1="132" x2="76" y2="170" stroke="#4A3525" stroke-width="0.8" opacity="0.4"/>
        <line x1="84" y1="132" x2="84" y2="170" stroke="#4A3525" stroke-width="0.8" opacity="0.4"/>
        <!-- Footwear -->
        <ellipse cx="40" cy="172" rx="14" ry="6" fill="#4A3525"/>
        <ellipse cx="80" cy="172" rx="14" ry="6" fill="#4A3525"/>
        <!-- Tabi split toe -->
        <line x1="40" y1="167" x2="40" y2="172" stroke="#D4A574" stroke-width="2"/>
        <line x1="80" y1="167" x2="80" y2="172" stroke="#D4A574" stroke-width="2"/>
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left eye -->
        <ellipse cx="46" cy="34" rx="5" ry="5" fill="#FFFFFF"/>
        <circle cx="47" cy="34" r="3" fill="#3D2314"/>
        <circle cx="45" cy="32" r="1.2" fill="#FFFFFF"/>
        <!-- Right eye -->
        <ellipse cx="74" cy="34" rx="5" ry="5" fill="#FFFFFF"/>
        <circle cx="73" cy="34" r="3" fill="#3D2314"/>
        <circle cx="71" cy="32" r="1.2" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Eyebrows ──
    {
      id: "eyebrows",
      name: "Eyebrows",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Thick, straight samurai brows -->
        <path d="M36 22c4-3 10-3 14 0" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
        <path d="M70 22c4-3 10-3 14 0" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  MOUTH EXPRESSION VARIANTS
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
        <path d="M50 52c4 4 16 4 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
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
        <path d="M46 48c6 10 22 10 28 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
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
        <path d="M50 56c4-2 16-2 20 0" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: surprised ──
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

    // ── Mouth: sad ──
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

    // ── Hair (chonmage topknot) ──
    {
      id: "hair",
      name: "Chonmage Topknot",
      zIndex: 26,
      defaultVisible: true,
      colorZones: [
        { id: "hair", name: "Hair", selector: "hair", defaultColor: "#1A1A1A", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hair base/sides -->
        <path d="M34 28c-2-18 12-26 26-26s28 8 26 26c0 6-4 10-8 12H42c-4-2-8-6-8-12z" data-colorzone="hair" fill="#1A1A1A"/>
        <!-- Shaved pate (top of head exposed) -->
        <ellipse cx="60" cy="16" rx="16" ry="6" fill="#D4A574"/>
        <!-- Topknot -->
        <ellipse cx="60" cy="4" rx="8" ry="6" data-colorzone="hair" fill="#1A1A1A"/>
        <!-- Topknot tail -->
        <path d="M56 4c2 6 6 8 8 2" fill="#1A1A1A"/>
        <!-- Side hair tufts -->
        <path d="M30 36c-2-4 2-8 6-10" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M90 36c2-4-2-8-6-10" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Do (chest armor) ──
    {
      id: "do",
      name: "Do Chest Armor",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Armor", selector: "armor-primary", defaultColor: "#8B4513", propertyPath: "outfitColors.primary" },
        { id: "armor-lacing", name: "Lacing", selector: "armor-lacing", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Do body (chest plate) -->
        <path d="M32 66c0-4 6-8 12-8h32c6 0 12 4 12 8v40c0 6-6 10-12 10H44c-6 0-12-4-12-10V66z" data-colorzone="armor-primary" fill="#8B4513"/>
        <!-- Horizontal lacing rows -->
        <path d="M34 74c2-2 10-3 18-3h16c8 0 16 1 18 3" data-colorzone="armor-lacing" stroke="#C0392B" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M34 84c2-2 10-3 18-3h16c8 0 16 1 18 3" data-colorzone="armor-lacing" stroke="#C0392B" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M34 94c2-2 10-3 18-3h16c8 0 16 1 18 3" data-colorzone="armor-lacing" stroke="#C0392B" stroke-width="2" fill="none" opacity="0.7"/>
        <!-- Center seam -->
        <line x1="60" y1="62" x2="60" y2="106" stroke="#5C3010" stroke-width="1.5" opacity="0.4"/>
        <!-- Armor rivets -->
        <circle cx="40" cy="78" r="1.5" fill="#FBBF24"/>
        <circle cx="40" cy="88" r="1.5" fill="#FBBF24"/>
        <circle cx="80" cy="78" r="1.5" fill="#FBBF24"/>
        <circle cx="80" cy="88" r="1.5" fill="#FBBF24"/>
        <!-- Mon/family crest on chest -->
        <circle cx="60" cy="82" r="8" fill="#5C3010" opacity="0.6"/>
        <circle cx="60" cy="82" r="6" fill="none" stroke="#FBBF24" stroke-width="1" opacity="0.8"/>
        <!-- Crest petals -->
        <path d="M60 76l4 6h-8l4-6z" fill="#FBBF24" opacity="0.7"/>
        <path d="M60 88l4-6h-8l4 6z" fill="#FBBF24" opacity="0.7"/>
        <!-- Lower armor skirt (kusa-zuri) -->
        <rect x="34" y="100" width="52" height="14" rx="2" data-colorzone="armor-primary" fill="#8B4513"/>
        <line x1="40" y1="104" x2="40" y2="114" stroke="#5C3010" stroke-width="1" opacity="0.5"/>
        <line x1="50" y1="104" x2="50" y2="114" stroke="#5C3010" stroke-width="1" opacity="0.5"/>
        <line x1="60" y1="104" x2="60" y2="114" stroke="#5C3010" stroke-width="1" opacity="0.5"/>
        <line x1="70" y1="104" x2="70" y2="114" stroke="#5C3010" stroke-width="1" opacity="0.5"/>
        <line x1="80" y1="104" x2="80" y2="114" stroke="#5C3010" stroke-width="1" opacity="0.5"/>
      </svg>`,
    },

    // ── Sode (shoulder boards) ──
    {
      id: "sode",
      name: "Sode Shoulder Guards",
      zIndex: 7,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Sode", selector: "sode", defaultColor: "#8B4513", propertyPath: "outfitColors.primary" },
        { id: "armor-lacing", name: "Sode Lacing", selector: "sode-lacing", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left sode -->
        <rect x="8" y="60" width="22" height="32" rx="3" data-colorzone="sode" fill="#8B4513"/>
        <rect x="8" y="60" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
        <rect x="8" y="72" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
        <rect x="8" y="84" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
        <!-- Right sode -->
        <rect x="90" y="60" width="22" height="32" rx="3" data-colorzone="sode" fill="#8B4513"/>
        <rect x="90" y="60" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
        <rect x="90" y="72" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
        <rect x="90" y="84" width="22" height="4" rx="1.5" data-colorzone="sode-lacing" fill="#C0392B" opacity="0.8"/>
      </svg>`,
    },

    // ── Kote (arm guards) ──
    {
      id: "kote",
      name: "Kote Arm Guards",
      zIndex: 6,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Kote", selector: "kote", defaultColor: "#7A3B10", propertyPath: "outfitColors.primary" },
        { id: "armor-lacing", name: "Kote Accent", selector: "kote-accent", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left arm guard -->
        <rect x="14" y="72" width="18" height="40" rx="5" data-colorzone="kote" fill="#7A3B10"/>
        <rect x="14" y="74" width="18" height="4" rx="1.5" data-colorzone="kote-accent" fill="#C0392B" opacity="0.8"/>
        <rect x="14" y="88" width="18" height="4" rx="1.5" data-colorzone="kote-accent" fill="#C0392B" opacity="0.8"/>
        <!-- Right arm guard -->
        <rect x="88" y="72" width="18" height="40" rx="5" data-colorzone="kote" fill="#7A3B10"/>
        <rect x="88" y="74" width="18" height="4" rx="1.5" data-colorzone="kote-accent" fill="#C0392B" opacity="0.8"/>
        <rect x="88" y="88" width="18" height="4" rx="1.5" data-colorzone="kote-accent" fill="#C0392B" opacity="0.8"/>
      </svg>`,
    },

    // ── Suneate (shin guards) ──
    {
      id: "suneate",
      name: "Suneate Shin Guards",
      zIndex: 4,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Suneate", selector: "suneate", defaultColor: "#7A3B10", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left shin guard -->
        <rect x="28" y="144" width="16" height="22" rx="4" data-colorzone="suneate" fill="#7A3B10"/>
        <!-- Right shin guard -->
        <rect x="76" y="144" width="16" height="22" rx="4" data-colorzone="suneate" fill="#7A3B10"/>
      </svg>`,
    },

    // ── Haidate (thigh guard skirt) ──
    {
      id: "haidate",
      name: "Haidate Thigh Guards",
      zIndex: 3,
      defaultVisible: false,
      colorZones: [
        { id: "armor-primary", name: "Haidate", selector: "haidate", defaultColor: "#8B4513", propertyPath: "outfitColors.primary" },
        { id: "armor-lacing", name: "Haidate Lacing", selector: "haidate-lacing", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Haidate skirt panels -->
        <path d="M28 116c0-2 4-4 8-4h48c4 0 8 2 8 4v14c0 2-4 4-8 4H36c-4 0-8-2-8-4v-14z" data-colorzone="haidate" fill="#8B4513"/>
        <rect x="28" y="118" width="64" height="3" rx="1" data-colorzone="haidate-lacing" fill="#C0392B" opacity="0.7"/>
        <rect x="28" y="126" width="64" height="3" rx="1" data-colorzone="haidate-lacing" fill="#C0392B" opacity="0.7"/>
        <!-- Panel dividers -->
        <line x1="44" y1="116" x2="44" y2="130" stroke="#5C3010" stroke-width="1" opacity="0.4"/>
        <line x1="60" y1="116" x2="60" y2="130" stroke="#5C3010" stroke-width="1" opacity="0.4"/>
        <line x1="76" y1="116" x2="76" y2="130" stroke="#5C3010" stroke-width="1" opacity="0.4"/>
      </svg>`,
    },

    // ── Obi (belt/sash) ──
    {
      id: "obi",
      name: "Obi Belt",
      zIndex: 6,
      defaultVisible: true,
      colorZones: [
        { id: "obi", name: "Obi", selector: "obi", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Obi sash -->
        <rect x="32" y="106" width="56" height="8" rx="2" data-colorzone="obi" fill="#C0392B"/>
        <!-- Obijime cord -->
        <rect x="34" y="108" width="52" height="2" rx="1" fill="#FBBF24" opacity="0.6"/>
        <!-- Obi knot -->
        <rect x="54" y="104" width="12" height="12" rx="3" data-colorzone="obi" fill="#A02020"/>
        <circle cx="60" cy="110" r="2.5" fill="#FBBF24"/>
      </svg>`,
    },

    // ── Kabuto (helmet) ──
    {
      id: "kabuto",
      name: "Kabuto Helmet",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Kabuto", selector: "kabuto", defaultColor: "#8B4513", propertyPath: "outfitColors.primary" },
        { id: "armor-accent", name: "Crest", selector: "kabuto-crest", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Kabuto dome -->
        <ellipse cx="60" cy="28" rx="24" ry="22" data-colorzone="kabuto" fill="#8B4513"/>
        <!-- Kabuto brim (mabizashi) -->
        <path d="M36 28c4-6 16-6 20 0l8 8H28l8-8z" data-colorzone="kabuto" fill="#7A3B10"/>
        <!-- Helmet rivets -->
        <circle cx="42" cy="20" r="2" fill="#FBBF24"/>
        <circle cx="60" cy="16" r="2" fill="#FBBF24"/>
        <circle cx="78" cy="20" r="2" fill="#FBBF24"/>
        <!-- Shikoro (neck guard flaps) -->
        <rect x="36" y="42" width="48" height="4" rx="1.5" data-colorzone="kabuto" fill="#7A3B10"/>
        <rect x="38" y="48" width="44" height="4" rx="1.5" data-colorzone="kabuto" fill="#7A3B10"/>
        <rect x="40" y="54" width="40" height="4" rx="1.5" data-colorzone="kabuto" fill="#7A3B10"/>
        <!-- Maedate (front crest) -->
        <path d="M52 6c2-6 14-6 16 0l-8 12-8-12z" data-colorzone="kabuto-crest" fill="#C0392B"/>
        <!-- Crest detail -->
        <path d="M56 6c2-3 6-3 8 0l-4 6-4-6z" fill="#FBBF24" opacity="0.6"/>
        <!-- Ear cups (fukigaeshi) -->
        <path d="M36 26l-4 8h6v-4c0-2-1-4-2-4z" data-colorzone="kabuto" fill="#7A3B10"/>
        <path d="M84 26l4 8h-6v-4c0-2 1-4 2-4z" data-colorzone="kabuto" fill="#7A3B10"/>
      </svg>`,
    },

    // ── Menpo (face mask) ──
    {
      id: "menpo",
      name: "Menpo Face Mask",
      zIndex: 22,
      defaultVisible: false,
      colorZones: [
        { id: "armor-primary", name: "Menpo", selector: "menpo", defaultColor: "#6B4226", propertyPath: "outfitColors.primary" },
        { id: "armor-accent", name: "Menpo Detail", selector: "menpo-detail", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Menpo face plate -->
        <path d="M40 24c4-6 16-6 20 0l6 18c0 4-6 8-12 8H46c-6 0-12-4-12-8l6-18z" data-colorzone="menpo" fill="#6B4226"/>
        <!-- Menpo nose ridge -->
        <path d="M56 22c2-2 6-2 8 0l2 18c0 2-2 4-4 4h-4c-2 0-4-2-4-4l2-18z" data-colorzone="menpo" fill="#5A3520"/>
        <!-- Teeth detail (scary) -->
        <rect x="46" y="38" width="28" height="2" rx="1" fill="#FFFFFF" opacity="0.8"/>
        <!-- Painted mouth (kuroi) -->
        <path d="M48 36c2-2 8-2 10 0l2 2H46l2-2z" data-colorzone="menpo-detail" fill="#C0392B"/>
        <!-- Ventilation holes -->
        <circle cx="48" cy="30" r="1" fill="#1A1A1A" opacity="0.5"/>
        <circle cx="52" cy="28" r="1" fill="#1A1A1A" opacity="0.5"/>
        <circle cx="56" cy="36" r="1" fill="#1A1A1A" opacity="0.5"/>
        <circle cx="64" cy="36" r="1" fill="#1A1A1A" opacity="0.5"/>
        <circle cx="68" cy="28" r="1" fill="#1A1A1A" opacity="0.5"/>
        <circle cx="72" cy="30" r="1" fill="#1A1A1A" opacity="0.5"/>
      </svg>`,
    },

    // ── Katana (long sword, fixed colors) ──
    {
      id: "katana",
      name: "Katana",
      zIndex: 8,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Blade (at side, angled) -->
        <path d="M94 40l8 82" stroke="#E5E7EB" stroke-width="3" stroke-linecap="round"/>
        <!-- Blade edge (hamon line) -->
        <path d="M93 42l7 78" stroke="#9CA3AF" stroke-width="1" opacity="0.5"/>
        <!-- Tsuba (guard) -->
        <ellipse cx="94" cy="38" rx="6" ry="4" fill="#C0392B"/>
        <ellipse cx="94" cy="38" rx="4" ry="2.5" fill="none" stroke="#FBBF24" stroke-width="0.8"/>
        <!-- Tsuka (hilt) -->
        <path d="M88 38c-2-2-4-6-4-10v-8c0-4 2-6 4-8h2c2 2 4 6 4 10v8c0 4-2 6-4 8h-2z" fill="#1A1A1A"/>
        <!-- Hilt wrap (ito) -->
        <line x1="89" y1="24" x2="91" y2="36" stroke="#FBBF24" stroke-width="1" opacity="0.6"/>
        <line x1="91" y1="26" x2="93" y2="34" stroke="#FBBF24" stroke-width="1" opacity="0.6"/>
        <!-- Pommel -->
        <circle cx="87" cy="20" r="3" fill="#FBBF24"/>
      </svg>`,
    },

    // ── Wakizashi (short sword, fixed colors) ──
    {
      id: "wakizashi",
      name: "Wakizashi",
      zIndex: 8,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Blade -->
        <path d="M22 114l6 58" stroke="#E5E7EB" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Tsuba -->
        <ellipse cx="22" cy="112" rx="5" ry="3.5" fill="#C0392B"/>
        <!-- Tsuka -->
        <path d="M18 112c-2-2-3-5-3-8v-6c0-3 1-5 3-7h1c2 2 3 5 3 8v6c0 3-1 5-3 7h-1z" fill="#1A1A1A"/>
        <!-- Pommel -->
        <circle cx="18" cy="98" r="2.5" fill="#FBBF24"/>
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
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 40 },

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
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair"], defaultValue: "#1A1A1A" },

    // Clothing / Armor
    { id: "armor-color", type: "color", label: "Armor Color", section: "clothing", targets: ["armor-primary", "outfitColors.primary"], defaultValue: "#8B4513" },
    { id: "lacing-color", type: "color", label: "Lacing Color", section: "clothing", targets: ["armor-lacing", "outfitColors.accent"], defaultValue: "#C0392B" },
    { id: "leather-color", type: "color", label: "Leather Color", section: "clothing", targets: ["hakama", "obi", "outfitColors.secondary"], defaultValue: "#5C4033" },

    // Accessories
    { id: "kabuto", type: "toggle", label: "Kabuto Helmet", section: "accessories", targets: ["kabuto"], defaultValue: true },
    { id: "menpo", type: "toggle", label: "Menpo Face Mask", section: "accessories", targets: ["menpo"], defaultValue: false },
    { id: "katana", type: "toggle", label: "Katana", section: "accessories", targets: ["katana"], defaultValue: true },
    { id: "wakizashi", type: "toggle", label: "Wakizashi", section: "accessories", targets: ["wakizashi"], defaultValue: false },
    { id: "haidate", type: "toggle", label: "Haidate Thigh Guards", section: "accessories", targets: ["haidate"], defaultValue: false },
    { id: "sode", type: "toggle", label: "Sode Shoulder Guards", section: "accessories", targets: ["sode"], defaultValue: true },
    { id: "kote", type: "toggle", label: "Kote Arm Guards", section: "accessories", targets: ["kote"], defaultValue: true },
  ],
});
