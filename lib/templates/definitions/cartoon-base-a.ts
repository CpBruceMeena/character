import { registerTemplate } from "../registry";

registerTemplate({
  id: "cartoon-base-a",
  name: "Base A",
  category: "cartoon",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="22" r="14" fill="#D4A574"/>
    <ellipse cx="30" cy="56" rx="16" ry="20" fill="#D4A574"/>
    <circle cx="25" cy="20" r="2" fill="#3D2314"/>
    <circle cx="35" cy="20" r="2" fill="#3D2314"/>
    <path d="M26 28c2 3 6 3 8 0" stroke="#3D2314" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  layers: [
    // ── Body / Torso ──
    {
      id: "torso",
      name: "Torso",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "skin-body", name: "Body Skin", selector: "skin-body", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Neck -->
        <rect x="48" y="50" width="24" height="16" rx="4" data-colorzone="skin-body" fill="#D4A574"/>
        <!-- Torso -->
        <ellipse cx="60" cy="104" rx="32" ry="38" data-colorzone="skin-body" fill="#D4A574"/>
        <!-- Arms -->
        <rect x="12" y="68" width="22" height="60" rx="10" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="86" y="68" width="22" height="60" rx="10" data-colorzone="skin-body" fill="#D4A574"/>
        <!-- Hands -->
        <circle cx="23" cy="128" r="10" data-colorzone="skin-body" fill="#D4A574"/>
        <circle cx="97" cy="128" r="10" data-colorzone="skin-body" fill="#D4A574"/>
        <!-- Legs -->
        <rect x="30" y="138" width="24" height="34" rx="8" data-colorzone="skin-body" fill="#D4A574"/>
        <rect x="66" y="138" width="24" height="34" rx="8" data-colorzone="skin-body" fill="#D4A574"/>
        <!-- Feet -->
        <ellipse cx="42" cy="172" rx="16" ry="6" data-colorzone="skin-body" fill="#D4A574"/>
        <ellipse cx="78" cy="172" rx="16" ry="6" data-colorzone="skin-body" fill="#D4A574"/>
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
        <!-- Head shape -->
        <ellipse cx="60" cy="40" rx="28" ry="32" data-colorzone="skin-head" fill="#D4A574"/>
        <!-- Ears -->
        <ellipse cx="32" cy="38" rx="8" ry="12" data-colorzone="skin-head" fill="#D4A574"/>
        <ellipse cx="88" cy="38" rx="8" ry="12" data-colorzone="skin-head" fill="#D4A574"/>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  EYE SIZE VARIANTS (pick one based on eyeSize slider)
    // ════════════════════════════════════════════════════════

    // ── Eyes: small ──
    {
      id: "eyes-small",
      name: "Eyes (Small)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { eyeSize: { max: 40 } },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left eye white -->
        <ellipse cx="46" cy="36" rx="5" ry="6" fill="#FFFFFF"/>
        <!-- Left pupil -->
        <circle cx="47" cy="36" r="3" fill="#3D2314"/>
        <!-- Left highlight -->
        <circle cx="45" cy="34" r="1" fill="#FFFFFF"/>
        <!-- Right eye white -->
        <ellipse cx="74" cy="36" rx="5" ry="6" fill="#FFFFFF"/>
        <!-- Right pupil -->
        <circle cx="73" cy="36" r="3" fill="#3D2314"/>
        <!-- Right highlight -->
        <circle cx="71" cy="34" r="1" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Eyes: default ──
    {
      id: "eyes-default",
      name: "Eyes (Default)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { eyeSize: { min: 40, max: 80 } },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left eye white -->
        <ellipse cx="46" cy="36" rx="7" ry="8" fill="#FFFFFF"/>
        <!-- Left pupil -->
        <circle cx="47" cy="36" r="4" fill="#3D2314"/>
        <!-- Left highlight -->
        <circle cx="45" cy="34" r="1.5" fill="#FFFFFF"/>
        <!-- Right eye white -->
        <ellipse cx="74" cy="36" rx="7" ry="8" fill="#FFFFFF"/>
        <!-- Right pupil -->
        <circle cx="73" cy="36" r="4" fill="#3D2314"/>
        <!-- Right highlight -->
        <circle cx="71" cy="34" r="1.5" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Eyes: large ──
    {
      id: "eyes-large",
      name: "Eyes (Large)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { eyeSize: { min: 80 } },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left eye white -->
        <ellipse cx="46" cy="36" rx="9" ry="11" fill="#FFFFFF"/>
        <!-- Left pupil -->
        <circle cx="47" cy="37" r="5.5" fill="#3D2314"/>
        <!-- Left highlight -->
        <circle cx="44" cy="33" r="2" fill="#FFFFFF"/>
        <!-- Right eye white -->
        <ellipse cx="74" cy="36" rx="9" ry="11" fill="#FFFFFF"/>
        <!-- Right pupil -->
        <circle cx="73" cy="37" r="5.5" fill="#3D2314"/>
        <!-- Right highlight -->
        <circle cx="71" cy="33" r="2" fill="#FFFFFF"/>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  EYEBROW EXPRESSION VARIANTS (pick one based on expression)
    // ════════════════════════════════════════════════════════

    // ── Eyebrows: neutral ──
    {
      id: "eyebrows-neutral",
      name: "Eyebrows (Neutral)",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      condition: { expression: ["neutral"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M36 24c4-4 10-4 14-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 22c4-2 10-2 14 2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ── Eyebrows: happy ──
    {
      id: "eyebrows-happy",
      name: "Eyebrows (Happy)",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      condition: { expression: ["happy"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M34 18c6-6 12-4 16-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 16c4-6 10-6 16-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ── Eyebrows: serious ──
    {
      id: "eyebrows-serious",
      name: "Eyebrows (Serious)",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      condition: { expression: ["serious"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M36 28c4-2 10 0 14 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 28c4-2 10 0 14 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ── Eyebrows: surprised ──
    {
      id: "eyebrows-surprised",
      name: "Eyebrows (Surprised)",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      condition: { expression: ["surprised"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M34 14c6-8 12-6 16-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 12c4-8 10-8 16-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ── Eyebrows: sad ──
    {
      id: "eyebrows-sad",
      name: "Eyebrows (Sad)",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "brows", name: "Eyebrows", selector: "brows", defaultColor: "#3D2314", propertyPath: "hairColor" },
      ],
      condition: { expression: ["sad"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g data-colorzone="brows" color="#3D2314">
          <path d="M34 22c6-4 12 0 16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 22c4-4 10 0 16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  MOUTH EXPRESSION VARIANTS (pick one based on expression)
    // ════════════════════════════════════════════════════════

    // ── Mouth: neutral (slight smile) ──
    {
      id: "mouth-neutral",
      name: "Mouth (Neutral)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["neutral"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 52c4 6 16 6 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: happy (big smile) ──
    {
      id: "mouth-happy",
      name: "Mouth (Happy)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["happy"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 50c6 14 26 14 32 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: serious (straight line) ──
    {
      id: "mouth-serious",
      name: "Mouth (Serious)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["serious"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 56c4-2 16-2 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    },

    // ── Mouth: surprised (open O) ──
    {
      id: "mouth-surprised",
      name: "Mouth (Surprised)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["surprised"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="54" rx="7" ry="9" fill="#3D2314"/>
        <ellipse cx="60" cy="53" rx="6" ry="7" fill="#C0392B"/>
      </svg>`,
    },

    // ── Mouth: sad (frown) ──
    {
      id: "mouth-sad",
      name: "Mouth (Sad)",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      condition: { expression: ["sad"] },
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 56c6-4 18-4 24 2" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
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
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Hair base -->
        <path d="M32 36c0-20 16-28 28-28s28 8 28 28c0 8-4 12-8 14c-4 2-8 2-8 2s-4 8-12 8-12-8-12-8-4 0-8-2c-4-2-8-6-8-14z" data-colorzone="hair" fill="#3D2314"/>
      </svg>`,
    },

    // ── Outfit ──
    {
      id: "outfit",
      name: "Outfit",
      zIndex: 5,
      defaultVisible: true,
      colorZones: [
        { id: "outfit-primary", name: "Outfit Primary", selector: "outfit-primary", defaultColor: "#4A6FA5", propertyPath: "outfitColors.primary" },
        { id: "outfit-secondary", name: "Outfit Secondary", selector: "outfit-secondary", defaultColor: "#D4A574", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shirt -->
        <path d="M32 72c0-4 4-8 8-8h40c4 0 8 4 8 8v56c0 4-4 8-8 8H40c-4 0-8-4-8-8V72z" data-colorzone="outfit-primary" fill="#4A6FA5"/>
        <!-- Collar -->
        <path d="M48 64l12 12 12-12" data-colorzone="outfit-secondary" fill="#D4A574"/>
        <!-- Pants -->
        <rect x="34" y="130" width="22" height="36" rx="4" data-colorzone="outfit-primary" fill="#4A6FA5"/>
        <rect x="64" y="130" width="22" height="36" rx="4" data-colorzone="outfit-primary" fill="#4A6FA5"/>
      </svg>`,
    },

    // ════════════════════════════════════════════════════════
    //  ACCESSORIES (hidden by default, toggled in ControlPanel)
    // ════════════════════════════════════════════════════════

    // ── Backpack (behind body) ──
    {
      id: "backpack",
      name: "Backpack",
      zIndex: -1,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Bag body -->
        <rect x="8" y="64" width="20" height="34" rx="6" fill="#8B5E3C"/>
        <!-- Flap -->
        <rect x="8" y="60" width="20" height="10" rx="4" fill="#6B4226"/>
        <!-- Buckle -->
        <rect x="16" y="68" width="4" height="4" rx="1" fill="#FBBF24"/>
        <!-- Strap visible on shoulder -->
        <path d="M16 54c4-6 12-10 18-12" stroke="#6B4226" stroke-width="2.5" fill="none"/>
      </svg>`,
    },

    // ── Scarf ──
    {
      id: "scarf",
      name: "Scarf",
      zIndex: 6,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Scarf wrap around neck -->
        <path d="M38 50c0-4 4-6 10-6h24c6 0 10 2 10 6v14c0 6-4 10-10 10H48c-6 0-10-4-10-10V50z" fill="#2ECC71"/>
        <!-- Scarf tail hanging down -->
        <path d="M72 66c4-2 8 2 8 8v8c0 6-4 10-8 8" fill="#27AE60"/>
      </svg>`,
    },

    // ── Necklace ──
    {
      id: "necklace",
      name: "Necklace",
      zIndex: 7,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Chain -->
        <path d="M44 50c2 6 6 16 16 16c10 0 14-10 16-16" stroke="#FBBF24" stroke-width="1.5" fill="none"/>
        <!-- Pendant -->
        <circle cx="60" cy="68" r="4" fill="#FBBF24"/>
        <!-- Gem -->
        <circle cx="60" cy="68" r="2" fill="#C0392B"/>
      </svg>`,
    },

    // ── Earrings ──
    {
      id: "earrings",
      name: "Earrings",
      zIndex: 16,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left earring -->
        <circle cx="32" cy="48" r="3" fill="#FBBF24"/>
        <circle cx="32" cy="54" r="3" fill="#FBBF24"/>
        <!-- Right earring -->
        <circle cx="88" cy="48" r="3" fill="#FBBF24"/>
        <circle cx="88" cy="54" r="3" fill="#FBBF24"/>
      </svg>`,
    },

    // ── Glasses ──
    {
      id: "glasses",
      name: "Glasses",
      zIndex: 22,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left frame -->
        <circle cx="46" cy="36" r="9" stroke="#3D2314" stroke-width="2" fill="none"/>
        <!-- Right frame -->
        <circle cx="74" cy="36" r="9" stroke="#3D2314" stroke-width="2" fill="none"/>
        <!-- Bridge -->
        <path d="M55 34c2 2 6 2 8 0" stroke="#3D2314" stroke-width="2" fill="none"/>
        <!-- Temple arms -->
        <path d="M37 34c-4 0-8-2-10-4" stroke="#3D2314" stroke-width="1.5" fill="none"/>
        <path d="M83 34c4 0 8-2 10-4" stroke="#3D2314" stroke-width="1.5" fill="none"/>
      </svg>`,
    },

    // ── Mask ──
    {
      id: "mask",
      name: "Mask",
      zIndex: 22,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Mask shape -->
        <path d="M42 28c6-4 12-4 18 0c6 4 8 10 8 14c0 2-2 4-4 4H38c-2 0-4-2-4-4c0-4 2-10 8-14z" fill="#3D2314" opacity="0.85"/>
        <!-- Eye holes -->
        <ellipse cx="48" cy="32" rx="4" ry="5" fill="#D4A574"/>
        <ellipse cx="72" cy="32" rx="4" ry="5" fill="#D4A574"/>
      </svg>`,
    },

    // ── Headband ──
    {
      id: "headband",
      name: "Headband",
      zIndex: 27,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Headband arc across forehead -->
        <path d="M32 32c2-6 16-8 28-8s26 2 28 8c2 4-2 6-4 6H36c-2 0-6-2-4-6z" fill="#22D3EE"/>
        <!-- Knot on side -->
        <circle cx="86" cy="34" r="3" fill="#06B6D4"/>
      </svg>`,
    },

    // ── Hat (beanie) ──
    {
      id: "hat",
      name: "Hat",
      zIndex: 30,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Beanie body -->
        <path d="M34 42c0-14 6-24 26-24s26 10 26 24v4H34v-4z" fill="#E94560"/>
        <!-- Ribbed brim -->
        <rect x="32" y="44" width="56" height="6" rx="3" fill="#C0392B"/>
        <!-- Pompom -->
        <circle cx="60" cy="16" r="6" fill="#FFFFFF"/>
      </svg>`,
    },

    // ── Crown ──
    {
      id: "crown",
      name: "Crown",
      zIndex: 30,
      defaultVisible: false,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Crown body with points -->
        <path d="M36 48l-6-16l10 6l8-12l8 12l10-6l-6 16H36z" fill="#FBBF24"/>
        <!-- Crown band -->
        <rect x="36" y="42" width="30" height="6" rx="2" fill="#F59E0B"/>
        <!-- Jewels -->
        <circle cx="46" cy="36" r="2" fill="#C0392B"/>
        <circle cx="56" cy="40" r="2" fill="#22D3EE"/>
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
      { label: "Curvy", value: "curvy" },
      { label: "Broad", value: "broad" },
      { label: "Petite", value: "petite" },
    ]},

    // Body
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 45 },
    { id: "limb-prop", type: "slider", label: "Limb Proportion", section: "body", targets: ["limbProportions"], min: 0, max: 100, step: 1, defaultValue: 50 },

    // Face
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 60 },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Serious", value: "serious" },
      { label: "Surprised", value: "surprised" },
      { label: "Sad", value: "sad" },
    ]},
    { id: "skin-tone", type: "color", label: "Skin Tone", section: "face", targets: ["skinTone", "skin-head", "skin-body"], defaultValue: "#D4A574" },

    // Hair
    { id: "hair-style", type: "select", label: "Style", section: "hair", targets: ["hairStyle"], options: [
      { label: "Short", value: "short" },
      { label: "Long", value: "long" },
      { label: "Curly", value: "curly" },
      { label: "Wavy", value: "wavy" },
      { label: "Bald", value: "bald" },
      { label: "Ponytail", value: "ponytail" },
      { label: "Bun", value: "bun" },
    ]},
    { id: "hair-color", type: "color", label: "Hair Color", section: "hair", targets: ["hairColor", "hair"], defaultValue: "#3D2314" },

    // Clothing
    { id: "outfit", type: "select", label: "Style", section: "clothing", targets: ["outfit"], options: [
      { label: "Casual", value: "casual" },
      { label: "Formal", value: "formal" },
      { label: "Sporty", value: "sporty" },
      { label: "Armor", value: "armor" },
      { label: "Robe", value: "robe" },
    ]},
    { id: "outfit-primary", type: "color", label: "Primary Color", section: "clothing", targets: ["outfit-primary", "outfitColors.primary"], defaultValue: "#4A6FA5" },
    { id: "outfit-secondary", type: "color", label: "Secondary Color", section: "clothing", targets: ["outfit-secondary", "outfitColors.secondary"], defaultValue: "#D4A574" },

    // Accessories
    { id: "backpack", type: "toggle", label: "Backpack", section: "accessories", targets: ["backpack"], defaultValue: false },
    { id: "scarf", type: "toggle", label: "Scarf", section: "accessories", targets: ["scarf"], defaultValue: false },
    { id: "necklace", type: "toggle", label: "Necklace", section: "accessories", targets: ["necklace"], defaultValue: false },
    { id: "earrings", type: "toggle", label: "Earrings", section: "accessories", targets: ["earrings"], defaultValue: false },
    { id: "glasses", type: "toggle", label: "Glasses", section: "accessories", targets: ["glasses"], defaultValue: false },
    { id: "mask", type: "toggle", label: "Mask", section: "accessories", targets: ["mask"], defaultValue: false },
    { id: "headband", type: "toggle", label: "Headband", section: "accessories", targets: ["headband"], defaultValue: false },
    { id: "hat", type: "toggle", label: "Hat", section: "accessories", targets: ["hat"], defaultValue: false },
    { id: "crown", type: "toggle", label: "Crown", section: "accessories", targets: ["crown"], defaultValue: false },
  ],
});
