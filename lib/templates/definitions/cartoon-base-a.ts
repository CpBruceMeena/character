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

    // ── Eyes ──
    {
      id: "eyes",
      name: "Eyes",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
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
        <g data-colorzone="brows" color="#3D2314">
          <path d="M36 24c4-4 10-4 14-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M70 22c4-2 10-2 14 2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </g>
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
        <path d="M50 52c4 6 16 6 20 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
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
  ],
});
