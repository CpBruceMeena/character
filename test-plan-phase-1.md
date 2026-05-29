# Test Plan: CharacterForge Pro — Phase 1

**Generated:** 2026-05-29 | **Branch:** main | **Source:** /autoplan pre-gate verification

## Test Stack

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Stores (character, UI), utils (colors, download), template schema, canvas renderer (dirty tracking, caching), share URL encode/decode, analytics events |
| Integration | Vitest | Store + component interactions, export pipeline, loader + registry, canvas RAF loop integration |
| E2E | Playwright | Full user flows: landing → editor → customize → export, share URL roundtrip, responsive breakpoints, keyboard navigation, accessibility audit |
| Visual | Playwright (screenshot diff) | Responsive layout at 4 breakpoints, landing page sections, export dialog states, error/empty states |

## Test Coverage by Area

### Unit Tests (~25 tests)

| Area | File | Tests | Priority |
|------|------|-------|----------|
| **Character store** | `lib/stores/__tests__/character-store.test.ts` | 8 | P1 |
| - Initial state | | default values correct | |
| - Actions | | setGender, setBodyType, setHeight, etc. update correctly | |
| - Template selection | | selectCategory loads templates, selectTemplate sets template | |
| - Randomize | | produces valid character within constraints | |
| - Reset | | returns to base template defaults | |
| **UI store** | `lib/stores/__tests__/ui-store.test.ts` | 4 | P1 |
| - Initial state | | panels closed, first section active | |
| - Panel toggles | | sidebar, export dialog, control panel | |
| - Toast management | | add, dismiss, max 3 toasts | |
| **Undo/Redo (temporal)** | `lib/stores/__tests__/history-store.test.ts` | 5 | P1 |
| - Single undo | | reverts last action | |
| - Multiple undo | | reverts N actions | |
| - Redo after undo | | reapplies reverted action | |
| - Max history (100) | | oldest states pruned | |
| - Template change clears | | history reset on template change | |
| **Canvas renderer** | `lib/canvas/__tests__/renderer.test.ts` | 5 | P2 |
| - Dirty flag tracking | | markDirty, clearDirty, isDirty | |
| - No-op on clean | | RAF loop skips when no dirty layers | |
| - Layer composition order | | zIndex sorting | |
| - Cache hit/miss | | cached layers not re-rendered | |
| - Context loss handler | | re-initialize on contextlost event | |
| **Share URL** | `lib/utils/__tests__/share-url.test.ts` | 3 | P2 |
| - Encode/decode roundtrip | | serialization preserves all state | |
| - Version prefix | | decode checks version, rejects unknown | |
| - Malformed URL | | graceful error, no crash | |

### Integration Tests (~12 tests)

| Area | Test | Priority |
|------|------|----------|
| **Template loading** | Registry → loader → store receives templates | P1 |
| **Template select → canvas** | Store change triggers canvas layer load | P1 |
| **Slider → state → canvas** | User drag → store update → canvas redraws | P1 |
| **Color change → state → canvas** | Color picker → store update → canvas recolors | P1 |
| **Export pipeline** | Store state → off-screen canvas → Blob → correct format | P1 |
| **Export presets** | Each preset (Social/Profile/Full Body) → correct dimensions | P2 |
| **Dark mode toggle** | Toggle → CSS variable swap → persistent across reload | P2 |
| **Onboarding tooltips** | First visit → tooltips shown, dismiss → not shown again | P2 |
| **Concurrent actions** | Export during template load → button disabled | P2 |
| **Resize → canvas** | Window resize → canvas dimensions correct | P2 |
| **Error state rendering** | Template load failure → error component shown | P2 |
| **Analytics events** | Control interaction → event logged (structure only, no values) | P3 |

### E2E Tests (~8 Playwright tests)

| # | Flow | Priority |
|---|------|----------|
| 1 | **Full creation flow** — Landing → Start Creating → select category → select template → canvas renders → modify 3 controls → export PNG → file downloaded | P1 |
| 2 | **Undo/redo mid-flow** — Modify 5 controls → undo 2 → state matches → redo 1 → state matches | P1 |
| 3 | **Share URL roundtrip** — Create character → copy share URL → open in new tab → read-only viewer renders same character | P1 |
| 4 | **Responsive 1200px** — Screenshot at 1440px → 3-column layout correct | P2 |
| 5 | **Responsive 768px** — Screenshot at 768px → 2-column, controls below | P2 |
| 6 | **Responsive 360px** — Screenshot at 360px → single column, bottom drawer | P2 |
| 7 | **Keyboard navigation** — Tab through all controls → focus visible → escape from modal → focus returns | P2 |
| 8 | **Accessibility audit** — Run axe-core on landing page + editor + export dialog → 0 critical violations | P1 |

### Visual Regression Tests (~6 screenshots)

| View | Breakpoint | Elements |
|------|-----------|----------|
| Landing page | 1440px, 768px, 360px | Hero, features, gallery, categories, footer |
| Editor | 1440px | 3-column layout with canvas + both sidebars |
| Editor | 768px | 2-column layout with controls below |
| Export dialog | 1440px | Modal with format + size + preview |
| Error state | 1440px | Template load failure banner |
| Empty state | 1440px | Canvas with "Select a category" prompt |

## Test Execution

```bash
# Unit + Integration (Vitest)
npx vitest run                     # all tests
npx vitest run lib/stores          # store tests only
npx vitest run lib/canvas          # canvas tests only

# E2E (Playwright)
npx playwright test                # all E2E
npx playwright test --grep "full creation"  # single flow

# All checks (CI)
npm test                           # vitest + playwright
```

## Coverage Targets

- **Unit:** 85%+ line coverage on stores, utils, renderer
- **Integration:** All critical paths (template load, export, canvas render)
- **E2E:** Full user journey + accessibility audit (0 critical violations)
