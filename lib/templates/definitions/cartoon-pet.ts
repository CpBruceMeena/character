import { registerTemplate } from "../registry";

registerTemplate({
  id: "cartoon-pet",
  name: "Pet",
  category: "cartoon",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="50" rx="16" ry="18" fill="#D4A574"/>
    <ellipse cx="30" cy="26" rx="12" ry="14" fill="#D4A574"/>
    <ellipse cx="24" cy="20" rx="6" ry="10" fill="#D4A574"/>
    <ellipse cx="36" cy="20" rx="6" ry="10" fill="#D4A574"/>
    <circle cx="26" cy="24" r="2" fill="#3D2314"/>
    <circle cx="34" cy="24" r="2" fill="#3D2314"/>
    <ellipse cx="30" cy="30" rx="3" ry="2" fill="#3D2314"/>
  </svg>`,

  layers: [
    // ── Tail ──
    {
      id: "tail",
      name: "Tail",
      zIndex: -1,
      defaultVisible: true,
      colorZones: [
        { id: "tail-zone", name: "Tail", selector: "tail-zone", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 100c10-8 18-20 14-28c-4-8-12-4-16 4c-4 8-2 20 2 24z" data-colorzone="tail-zone" fill="#D4A574"/>
      </svg>`,
    },

    // ── Body ──
    {
      id: "body",
      name: "Body",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "body-fur", name: "Body Fur", selector: "body-fur", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Torso -->
        <ellipse cx="60" cy="110" rx="34" ry="40" data-colorzone="body-fur" fill="#D4A574"/>
        <!-- Chest patch -->
        <ellipse cx="60" cy="100" rx="20" ry="24" fill="#F5D6C6" opacity="0.4"/>
        <!-- Front legs -->
        <rect x="30" y="136" width="16" height="30" rx="8" data-colorzone="body-fur" fill="#D4A574"/>
        <rect x="74" y="136" width="16" height="30" rx="8" data-colorzone="body-fur" fill="#D4A574"/>
        <!-- Paws -->
        <ellipse cx="38" cy="166" rx="10" ry="5" data-colorzone="body-fur" fill="#D4A574"/>
        <ellipse cx="82" cy="166" rx="10" ry="5" data-colorzone="body-fur" fill="#D4A574"/>
        <!-- Back legs -->
        <ellipse cx="52" cy="148" rx="12" ry="8" data-colorzone="body-fur" fill="#D4A574"/>
        <ellipse cx="68" cy="148" rx="12" ry="8" data-colorzone="body-fur" fill="#D4A574"/>
      </svg>`,
    },

    // ── Head ──
    {
      id: "head",
      name: "Head",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [
        { id: "head-fur", name: "Head Fur", selector: "head-fur", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head -->
        <ellipse cx="60" cy="52" rx="30" ry="28" data-colorzone="head-fur" fill="#D4A574"/>
        <!-- Face patch -->
        <ellipse cx="60" cy="58" rx="20" ry="16" fill="#F5D6C6" opacity="0.5"/>
      </svg>`,
    },

    // ── Ears ──
    {
      id: "ears",
      name: "Ears",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [
        { id: "ears-fur", name: "Ears Fur", selector: "ears-fur", defaultColor: "#D4A574", propertyPath: "skinTone" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Left ear -->
        <ellipse cx="34" cy="28" rx="10" ry="16" data-colorzone="ears-fur" fill="#D4A574"/>
        <ellipse cx="34" cy="28" rx="6" ry="10" fill="#F5D6C6" opacity="0.6"/>
        <!-- Right ear -->
        <ellipse cx="86" cy="28" rx="10" ry="16" data-colorzone="ears-fur" fill="#D4A574"/>
        <ellipse cx="86" cy="28" rx="6" ry="10" fill="#F5D6C6" opacity="0.6"/>
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
        <ellipse cx="46" cy="50" rx="6" ry="7" fill="#FFFFFF"/>
        <circle cx="47" cy="51" r="4" fill="#3D2314"/>
        <circle cx="45" cy="49" r="1.5" fill="#FFFFFF"/>
        <!-- Right eye -->
        <ellipse cx="74" cy="50" rx="6" ry="7" fill="#FFFFFF"/>
        <circle cx="73" cy="51" r="4" fill="#3D2314"/>
        <circle cx="71" cy="49" r="1.5" fill="#FFFFFF"/>
        <!-- Eyebrows (small dots above) -->
        <circle cx="46" cy="38" r="2" fill="#3D2314" opacity="0.5"/>
        <circle cx="74" cy="38" r="2" fill="#3D2314" opacity="0.5"/>
      </svg>`,
    },

    // ── Nose & Mouth ──
    {
      id: "nose-mouth",
      name: "Nose & Mouth",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Nose -->
        <ellipse cx="60" cy="60" rx="5" ry="4" fill="#3D2314"/>
        <!-- Mouth -->
        <path d="M54 66c2 4 10 4 12 0" stroke="#3D2314" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Whiskers left -->
        <line x1="32" y1="58" x2="46" y2="60" stroke="#3D2314" stroke-width="1" opacity="0.5"/>
        <line x1="32" y1="64" x2="46" y2="62" stroke="#3D2314" stroke-width="1" opacity="0.5"/>
        <!-- Whiskers right -->
        <line x1="74" y1="60" x2="88" y2="58" stroke="#3D2314" stroke-width="1" opacity="0.5"/>
        <line x1="74" y1="62" x2="88" y2="64" stroke="#3D2314" stroke-width="1" opacity="0.5"/>
      </svg>`,
    },

    // ── Collar ──
    {
      id: "collar",
      name: "Collar",
      zIndex: 12,
      defaultVisible: false,
      colorZones: [
        { id: "collar-zone", name: "Collar", selector: "collar-zone", defaultColor: "#C0392B", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 72c0-4 4-6 12-6h28c8 0 12 2 12 6v6c0 4-4 6-12 6H46c-8 0-12-2-12-6v-6z" data-colorzone="collar-zone" fill="#C0392B"/>
        <circle cx="60" cy="78" r="3" fill="#FBBF24"/>
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
    { id: "height", type: "slider", label: "Height", section: "body", targets: ["height"], min: 0, max: 100, step: 1, defaultValue: 55 },
    { id: "width", type: "slider", label: "Width", section: "body", targets: ["width"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 50 },
    { id: "eye-size", type: "slider", label: "Eye Size", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 60 },
    { id: "expression", type: "select", label: "Expression", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Happy", value: "happy" },
      { label: "Surprised", value: "surprised" },
      { label: "Sad", value: "sad" },
    ]},
    { id: "skin-tone", type: "color", label: "Fur Color", section: "face", targets: ["skinTone", "body-fur", "head-fur", "ears-fur", "tail-zone"], defaultValue: "#D4A574" },
    { id: "hair-color", type: "color", label: "Accent Color", section: "hair", targets: ["hairColor"], defaultValue: "#3D2314" },
    { id: "outfit-primary", type: "color", label: "Primary Color", section: "clothing", targets: ["outfitColors.primary"], defaultValue: "#4A6FA5" },
    { id: "outfit-secondary", type: "color", label: "Secondary Color", section: "clothing", targets: ["outfitColors.secondary"], defaultValue: "#D4A574" },
    { id: "collar", type: "toggle", label: "Collar", section: "accessories", targets: ["collar"], defaultValue: false },
  ],
});
