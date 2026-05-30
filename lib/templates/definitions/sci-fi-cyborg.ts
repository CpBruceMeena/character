import { registerTemplate } from "../registry";

registerTemplate({
  id: "sci-fi-cyborg",
  name: "Cyborg",
  category: "sci-fi",
  thumbnailSvg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="22" rx="12" ry="14" fill="#94A3B8"/>
    <rect x="18" y="36" width="24" height="28" rx="4" fill="#64748B"/>
    <circle cx="30" cy="20" r="2" fill="#22D3EE"/>
    <circle cx="22" cy="18" r="1" fill="#22D3EE"/>
    <circle cx="38" cy="18" r="1" fill="#22D3EE"/>
    <circle cx="30" cy="44" r="3" fill="#22D3EE"/>
  </svg>`,

  layers: [
    // ── Torso Core ──
    {
      id: "torso",
      name: "Torso Core",
      zIndex: 0,
      defaultVisible: true,
      colorZones: [
        { id: "armor-primary", name: "Armor", selector: "armor-primary", defaultColor: "#475569", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Neck joint -->
        <rect x="48" y="48" width="24" height="14" rx="4" fill="#64748B"/>
        <!-- Chest armor -->
        <path d="M32 66c0-6 6-10 14-10h28c8 0 14 4 14 10v48c0 6-6 10-14 10H46c-8 0-14-4-14-10V66z" data-colorzone="armor-primary" fill="#475569"/>
        <!-- Shoulder pads -->
        <path d="M18 66c-4 0-8 4-8 8v20c0 4 4 8 8 8c4 0 8-4 8-8V74c0-4-4-8-8-8z" data-colorzone="armor-primary" fill="#475569"/>
        <path d="M102 66c4 0 8 4 8 8v20c0 4-4 8-8 8c-4 0-8-4-8-8V74c0-4 4-8 8-8z" data-colorzone="armor-primary" fill="#475569"/>
        <!-- Arm plating -->
        <rect x="14" y="88" width="18" height="44" rx="6" data-colorzone="armor-primary" fill="#475569"/>
        <rect x="88" y="88" width="18" height="44" rx="6" data-colorzone="armor-primary" fill="#475569"/>
        <!-- Leg armor -->
        <rect x="30" y="124" width="24" height="36" rx="6" data-colorzone="armor-primary" fill="#475569"/>
        <rect x="66" y="124" width="24" height="36" rx="6" data-colorzone="armor-primary" fill="#475569"/>
      </svg>`,
    },

    // ── Energy Core ──
    {
      id: "energy-core",
      name: "Energy Core",
      zIndex: 3,
      defaultVisible: true,
      colorZones: [
        { id: "core-glow", name: "Core Glow", selector: "core-glow", defaultColor: "#22D3EE", propertyPath: "outfitColors.accent" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Energy core circle -->
        <circle cx="60" cy="90" r="12" data-colorzone="core-glow" fill="#22D3EE" opacity="0.8"/>
        <circle cx="60" cy="90" r="6" fill="#FFFFFF" opacity="0.6"/>
        <!-- Energy lines -->
        <line x1="60" y1="78" x2="60" y2="70" stroke="#22D3EE" stroke-width="2" opacity="0.6"/>
        <line x1="60" y1="102" x2="60" y2="110" stroke="#22D3EE" stroke-width="2" opacity="0.6"/>
        <line x1="48" y1="90" x2="40" y2="90" stroke="#22D3EE" stroke-width="2" opacity="0.6"/>
        <line x1="72" y1="90" x2="80" y2="90" stroke="#22D3EE" stroke-width="2" opacity="0.6"/>
      </svg>`,
    },

    // ── Head ──
    {
      id: "head",
      name: "Head",
      zIndex: 10,
      defaultVisible: true,
      colorZones: [
        { id: "head-armor", name: "Head Armor", selector: "head-armor", defaultColor: "#64748B", propertyPath: "outfitColors.primary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Helmeted head -->
        <ellipse cx="60" cy="38" rx="28" ry="30" data-colorzone="head-armor" fill="#64748B"/>
        <!-- Face visor area -->
        <ellipse cx="60" cy="42" rx="20" ry="18" fill="#334155"/>
        <!-- Jaw line -->
        <path d="M44 52c4 6 8 8 16 8s12-2 16-8" stroke="#1E293B" stroke-width="2" fill="none"/>
      </svg>`,
    },

    // ── Visor Eyes ──
    {
      id: "eyes",
      name: "Visor Eyes",
      zIndex: 20,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Visor strip -->
        <rect x="40" y="32" width="40" height="8" rx="4" fill="#22D3EE" opacity="0.9"/>
        <!-- Left eye glow -->
        <circle cx="48" cy="36" r="3" fill="#FFFFFF" opacity="0.8"/>
        <!-- Right eye glow -->
        <circle cx="72" cy="36" r="3" fill="#FFFFFF" opacity="0.8"/>
        <!-- Scanning line -->
        <line x1="40" y1="36" x2="80" y2="36" stroke="#FFFFFF" stroke-width="1" opacity="0.4"/>
      </svg>`,
    },

    // ── Antenna ──
    {
      id: "antenna",
      name: "Antenna",
      zIndex: 15,
      defaultVisible: true,
      colorZones: [],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="60" y1="8" x2="60" y2="20" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="6" r="3" fill="#22D3EE"/>
      </svg>`,
    },

    // ── Cyber Hair ──
    {
      id: "hair",
      name: "Cyber Hair",
      zIndex: 25,
      defaultVisible: true,
      colorZones: [
        { id: "hair", name: "Cyber Hair", selector: "hair", defaultColor: "#1A1A2E", propertyPath: "hairColor" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Spiky cyber hair -->
        <path d="M34 30c-2-10 4-18 10-22l4 8c2-6 8-12 14-16l-2 10c4-6 12-8 18-8c-4 6-2 14-4 20c-4-2-10 0-14 4c-6-4-14-2-18 4c-4-4-10-4-14-4l6 4z" data-colorzone="hair" fill="#1A1A2E"/>
      </svg>`,
    },

    // ── Jetpack ──
    {
      id: "jetpack",
      name: "Jetpack",
      zIndex: -1,
      defaultVisible: false,
      colorZones: [
        { id: "jetpack-zone", name: "Jetpack", selector: "jetpack-zone", defaultColor: "#334155", propertyPath: "outfitColors.secondary" },
      ],
      inlineSvg: `<svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="60" width="18" height="40" rx="6" data-colorzone="jetpack-zone" fill="#334155"/>
        <rect x="94" y="60" width="18" height="40" rx="6" data-colorzone="jetpack-zone" fill="#334155"/>
        <!-- Thrusters -->
        <ellipse cx="17" cy="102" rx="6" ry="3" fill="#22D3EE" opacity="0.6"/>
        <ellipse cx="103" cy="102" rx="6" ry="3" fill="#22D3EE" opacity="0.6"/>
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
    { id: "head-size", type: "slider", label: "Head Size", section: "body", targets: ["headSize"], min: 0, max: 100, step: 1, defaultValue: 48 },
    { id: "eye-size", type: "slider", label: "Visor Brightness", section: "face", targets: ["eyeSize"], min: 20, max: 100, step: 1, defaultValue: 60 },
    { id: "expression", type: "select", label: "Mode", section: "face", targets: ["expression"], options: [
      { label: "Neutral", value: "neutral" },
      { label: "Combat", value: "serious" },
      { label: "Scan", value: "surprised" },
    ]},
    { id: "hair-color", type: "color", label: "Hair/Antenna Color", section: "hair", targets: ["hairColor", "hair"], defaultValue: "#1A1A2E" },
    { id: "armor-color", type: "color", label: "Armor Color", section: "clothing", targets: ["armor-primary", "head-armor", "outfitColors.primary"], defaultValue: "#475569" },
    { id: "accents-color", type: "color", label: "Accent Color", section: "clothing", targets: ["core-glow", "outfitColors.accent"], defaultValue: "#22D3EE" },
    { id: "jetpack-color", type: "color", label: "Jetpack Color", section: "clothing", targets: ["jetpack-zone", "outfitColors.secondary"], defaultValue: "#334155" },
    { id: "jetpack", type: "toggle", label: "Jetpack", section: "accessories", targets: ["jetpack"], defaultValue: false },
  ],
});
