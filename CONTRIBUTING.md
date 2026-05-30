# Contributing to CharacterForge Pro

Thank you for considering contributing! This document covers everything you need to get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Commands](#project-commands)
- [Code Style & Conventions](#code-style--conventions)
- [Testing](#testing)
- [Adding a New Template](#adding-a-new-template)
- [Adding a New Control Type](#adding-a-new-control-type)
- [Pull Request Process](#pull-request-process)
- [Design System Reference](#design-system-reference)

---

## Development Setup

### Prerequisites

- **Node.js** 20+
- **npm** — package manager (pnpm/bun also work)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/characterforge-pro.git
cd characterforge-pro

# Install dependencies
npm install

# Start the development server
npm run dev

# Open in your browser
open http://localhost:3000
```

---

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Next.js with Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run full test suite (Vitest) |
| `npm run lint` | Run ESLint across the project |
| `npx tsc --noEmit` | Type-check without emitting files |

---

## Code Style & Conventions

### TypeScript

- **Strict mode** is enabled. Avoid `any` casts — prefer proper typing or `unknown` with narrowing.
- Use `interface` over `type` for object shapes, `type` for unions and utility types.
- Access modifiers: default to `public`. Only use `private`/`protected` when encapsulation is strictly needed.

### React

- Use **functional components** with hooks throughout. No class components.
- Prefer `useCallback` and `useMemo` for callbacks/computations passed as props or used in effect dependencies.
- Keep components focused — if a file exceeds ~200 lines, consider splitting.
- Colocate tests next to the component they test (e.g., `ComponentName.test.tsx` in a `__tests__` directory).

### State Management (Zustand)

- Character state and undo history live in `lib/stores/character-store.ts`.
- UI state (active tab, panel visibility, theme) lives in `lib/stores/ui-store.ts`.
- Use `zundo` temporal middleware for undo/redo — do not implement custom history.

### Styling (Tailwind CSS v4)

- Reference design tokens from `DESIGN.md` via Tailwind utility classes.
- Use the custom `@theme` tokens defined in `globals.css` for brand colors (amber, coral, teal).
- Prefer utility classes over custom CSS. Extract repeated patterns into components, not custom classes.
- Dark mode uses the `dark` class strategy on `<html>`.

### Naming

- **Files:** `kebab-case.ts`, `PascalCase.tsx` for components.
- **Components:** `PascalCase` (`SliderControl`, `CharacterCanvas`).
- **Functions/Variables:** `camelCase` (`getTemplate`, `renderControls`).
- **Stores:** Use Zustand's `create` pattern with separate `interface` for state + actions.
- **Test files:** `ComponentName.test.tsx` or `feature.test.ts`.

### Imports

Use the `@/` path alias for imports from the project root:

```ts
import { Button } from "@/components/shared/Button";
import { useCharacterStore } from "@/lib/stores/character-store";
```

Order imports: built-in modules → third-party → `@/` aliases → relative imports.

---

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run a specific test file
npx vitest run lib/templates/__tests__/template-definitions.test.ts

# Run tests in watch mode during development
npx vitest
```

### Writing Tests

- **Unit tests:** Cover stores, utilities, and pure functions. Mock external dependencies.
- **Integration tests:** Cover component + store interactions. Use `@testing-library/react` and `@testing-library/user-event`.
- Test files live in `__tests__` directories next to the code they test.
- Use `describe`/`it` blocks with clear descriptions of the expected behavior.

### Test Conventions

- Import and register templates in test setup files when testing template-dependent components.
- Use Zustand store actions directly to set state before asserting UI behavior.
- For canvas/rendering tests, mock the Canvas 2D API where needed.

---

## Adding a New Template

This is the most common contribution. Each template is a self-contained definition file.

### Step 1: Create the definition file

Create `lib/templates/definitions/my-template.ts`:

```ts
import { registerTemplate } from "@/lib/templates/registry";

registerTemplate({
  id: "my-template",
  name: "My Template",
  category: "fantasy",       // must match an existing category
  description: "A brave explorer with weather-worn gear.",
  controls: [
    {
      id: "cape-color",
      type: "color",
      section: "clothing",
      label: "Cape Color",
      targets: [{ element: "cape", attribute: "fill" }],
      defaultValue: "#8B4513",
    },
    {
      id: "boot-style",
      type: "select",
      section: "clothing",
      label: "Boot Style",
      targets: [{ element: "boots", attribute: "variant" }],
      defaultValue: "tall",
      options: [
        { label: "Short", value: "short" },
        { label: "Tall", value: "tall" },
      ],
    },
  ],
  defaultState: {
    "cape-color": "#8B4513",
    "boot-style": "tall",
  },
});
```

### Step 2: Register the template

Import the definition file in `components/editor/EditorLayout.tsx`:

```ts
import "@/lib/templates/definitions/my-template";
```

This triggers the module-level `registerTemplate()` call and makes the template available in the editor.

### Step 3: Add a gallery example (optional)

Add an example entry in `lib/gallery/examples.ts` so the template appears on the landing page gallery.

### Step 4: Run validation

```bash
npx tsc --noEmit          # Type-check
npm run test               # Run all tests
npm run lint               # Lint
```

---

## Adding a New Control Type

If a template needs a control type that doesn't exist yet (e.g., a gradient picker or pattern selector):

### Step 1: Update the schema

Add the type to `ControlType` in `lib/templates/schema.ts`:

```ts
export type ControlType = "slider" | "select" | "toggle" | "color" | "gradient";
```

### Step 2: Create the component

Create `components/editor/GradientControl.tsx` following the pattern of existing controls:

- Accept `ControlDefinition` and current value as props.
- Call the appropriate store action on change.
- Display the current value and label.

### Step 3: Update the dispatcher

Add the new type to `ControlRenderer.tsx`:

```tsx
case "gradient":
  return <GradientControl key={control.id} control={control} value={value} />;
```

### Step 4: Handle rendering

If the control affects visual output, update the render pipeline in `lib/canvas/` to apply the new property.

---

## Pull Request Process

1. **Create a branch** from `main` with a descriptive name:
   - `feat/add-viking-template`
   - `fix/control-panel-duplicate-labels`
   - `docs/update-readme`

2. **Make your changes** following the conventions above.

3. **Run validation** before opening a PR:
   ```bash
   npx tsc --noEmit
   npm run test
   npm run lint
   ```

4. **Open a pull request** against `main` with:
   - A clear title describing the change.
   - A description of what was changed and why.
   - Screenshots for UI changes (before/after).
   - Any relevant issue numbers.

5. **Address review feedback** — all discussions must be resolved before merging.

### PR Checklist

- [ ] TypeScript compiles with zero errors
- [ ] All tests pass (existing + new)
- [ ] ESLint reports no errors
- [ ] No `any` types added
- [ ] New templates render correctly in the editor
- [ ] Dark mode works with the new addition
- [ ] Responsive layout is not broken

---

## Design System Reference

The full design system is documented in [`DESIGN.md`](./DESIGN.md) and includes:

- **Color palette:** Warm amber (primary), coral (action), teal (secondary) with semantic tokens
- **Typography:** Fredoka (display, headings) / DM Sans (body, UI)
- **Spacing:** 4px-based scale (`space-1` through `space-12`)
- **Component styles:** Buttons, inputs, sliders, tabs, cards, modals, toasts
- **Motion:** 150ms hover transitions, 300ms page/modal transitions
- **Anti-patterns:** What not to do (purple gradients, 3-column icon grids, etc.)

A live preview is available at `design-system-preview.html` — open in any browser.

**Golden rule:** When in doubt, match the existing code. Consistency matters more than perfection.

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
