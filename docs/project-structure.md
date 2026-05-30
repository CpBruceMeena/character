# Project Structure & API Reference

> Developer documentation for CharacterForge Pro. This covers the codebase architecture, key APIs, and extension points.

---

## Directory Layout

```
app/
├── favicon.ico            # Browser tab icon
├── icon.svg               # SVG favicon (Next.js App Router)
├── globals.css            # Global styles, design tokens, dark mode
├── layout.tsx             # Root layout — fonts, metadata, theme script
├── page.tsx               # Landing page (Hero, Gallery, Features, Export, Footer)
└── editor/
    └── page.tsx           # Editor page — imports EditorLayout

components/
├── landing/               # Landing page sections
│   ├── Hero.tsx           # Hero section with CTA
│   ├── CategoryShowcase.tsx  # Category grid
│   ├── CharacterGallery.tsx  # Gallery grid
│   ├── GalleryCharacterCard.tsx  # Individual gallery card
│   ├── Features.tsx       # Feature cards
│   ├── ExportFormats.tsx  # Format cards
│   └── Footer.tsx         # Site footer
├── editor/                # Editor components
│   ├── EditorLayout.tsx   # Main editor shell (sidebar + canvas + control panel)
│   ├── ControlPanel.tsx   # Right-side control panel with tabs
│   ├── ControlSection.tsx # Collapsible control group wrapper
│   ├── SliderControl.tsx  # Range slider control
│   ├── SelectControl.tsx  # Dropdown/combo box control
│   ├── ToggleControl.tsx  # Boolean toggle / switch
│   ├── ColorPickerControl.tsx  # Color picker with swatches
│   ├── ControlRenderer.tsx # Dispatches to the right control type
│   ├── CategorySidebar.tsx # Left sidebar with categories & templates
│   ├── TopBar.tsx         # Top toolbar (theme toggle, undo/redo, export)
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── ExportDialog.tsx   # Export format & resolution picker
│   └── OnboardingTooltip.tsx  # Guided tour tooltip
├── canvas/                # Canvas components
│   ├── CharacterCanvas.tsx  # SVG renderer with pan/zoom
│   └── CanvasControls.tsx   # Zoom, reset, and fit buttons
├── shared/                # Shared UI primitives
│   ├── Button.tsx         # Multi-variant button
│   └── ErrorBoundary.tsx  # React error boundary
└── debug/                 # Dev-only tools
    └── CacheDevTools.tsx  # Render cache inspector

lib/
├── templates/             # Template system (core)
│   ├── registry.ts        # Template/category registration
│   ├── schema.ts          # TypeScript types for templates & controls
│   ├── definitions/       # Individual template definition files
│   │   ├── cartoon-base-a.ts
│   │   ├── cartoon-pet.ts
│   │   ├── fantasy-knight.ts
│   │   ├── fantasy-elf.ts
│   │   ├── sci-fi-armor.ts
│   │   ├── sci-fi-cyborg.ts
│   │   ├── steampunk-explorer.ts
│   │   ├── modern-casual.ts
│   │   ├── victorian-gentleman.ts
│   │   └── samurai.ts
│   └── __tests__/
│       └── template-definitions.test.ts
├── canvas/                # Canvas rendering engine
│   ├── renderer.ts        # Main render orchestrator
│   ├── render-svg.ts      # SVG element generation
│   ├── render-cache.ts    # Render result caching
│   └── resolve-color.ts   # Color resolution & overrides
├── stores/                # State management (Zustand)
│   ├── character-store.ts # Character state & undo history
│   └── ui-store.ts        # UI state (panels, tabs, theme)
├── gallery/               # Gallery examples
│   └── examples.ts        # Example character configurations
├── utils/                 # Utilities
│   ├── use-theme.ts       # Dark mode hook & inline script
│   ├── use-onboarding.ts  # Guided tour state
│   └── use-url-sharing.ts # URL state encoding/decoding
├── tests/                 # Test files
│   └── ...
```

---

## Core Architecture

### Data Flow

```
User interacts with control (Slider, Select, etc.)
        │
        ▼
Zustand store update (character-store.ts)
        │
        ▼
React re-render → CharacterCanvas reads new state
        │
        ▼
Renderer (renderer.ts) resolves colors + builds SVG
        │
        ▼
Render cache (render-cache.ts) diffs + caches result
        │
        ▼
SVG injected into DOM (react-svg or innerHTML)
```

### Template System

Templates are registered via side-effect imports in `EditorLayout.tsx`:

```ts
import "@/lib/templates/definitions/cartoon-base-a";
```

Each definition file calls `registerTemplate()` from `registry.ts`:

```ts
registerTemplate({
  id: "cartoon-base-a",
  name: "Base A",
  category: "cartoon",
  controls: [ /* ControlDefinition[] */ ],
  defaultState: { /* Partial<CharacterState> */ },
});
```

### State Shape

```ts
interface CharacterState {
  templateId: string | null;
  categoryId: string | null;
  overrides: Record<string, number | string | boolean>;
  // plus history (undo/redo via zundo)
}
```

### Control Definitions

Each control has a type (`slider`, `select`, `toggle`, `color`) and a `targets` array that maps to SVG element attributes:

```ts
interface ControlDefinition {
  id: string;
  type: "slider" | "select" | "toggle" | "color";
  section: "body" | "face" | "hair" | "clothing" | "accessories";
  label: string;
  targets: { element: string; attribute: string }[];
  defaultValue: number | string | boolean;
  // type-specific options (min/max for sliders, options for selects, etc.)
}
```

---

## Key Extension Points

### Adding a New Template

1. Create `lib/templates/definitions/my-template.ts` with a `registerTemplate()` call
2. Import it in `components/editor/EditorLayout.tsx`
3. Add an example in `lib/gallery/examples.ts`

### Adding a New Control Type

1. Add the type to `ControlType` in `lib/templates/schema.ts`
2. Create the component in `components/editor/`
3. Add the dispatch case in `ControlRenderer.tsx`
4. Handle the value in the renderer if needed

---

## Testing

```bash
# Run all tests
npm run test

# Run specific test file
npx vitest run lib/templates/__tests__/template-definitions.test.ts
```
