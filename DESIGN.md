# CharacterForge Pro — Design System

> **Aesthetic:** Playful-Studio — a creative workshop that feels inspiring, not intimidating.
> **Memorable thing:** "Creative and playful" — users should feel like they've entered a space where making something is fun.

---

## 1. Brand Color Palette

### Primary — Amber (Warm, Inviting)

| Token | Hex | Usage |
|-------|-----|-------|
| `--amber-50` | `#fffbeb` | Light backgrounds, hover fills |
| `--amber-100` | `#fef3c7` | Card highlights, tag backgrounds |
| `--amber-200` | `#fde68a` | Active state backgrounds |
| `--amber-300` | `#fcd34d` | Secondary accents, badges |
| `--amber-400` | `#fbbf24` | Hover state for primary CTA |
| `--amber-500` | `#f59e0b` | **Primary CTA, brand mark** |
| `--amber-600` | `#d97706` | CTA hover state |
| `--amber-700` | `#b45309` | Display headlines |
| `--amber-800` | `#92400e` | High-emphasis text on light bg |
| `--amber-900` | `#78350f` | Extreme contrast accent |

### Action — Coral (Energy, Urgency)

| Token | Hex | Usage |
|-------|-----|-------|
| `--coral-100` | `#ffd5d0` | Light warning backgrounds |
| `--coral-200` | `#ffbbb3` | Hover state fills |
| `--coral-300` | `#ff8a7a` | Secondary danger indicators |
| `--coral-400` | `#ff6b56` | Warning text |
| `--coral-500` | `#f85a3e` | **Destructive/export buttons** |
| `--coral-600` | `#e0452a` | Destructive hover |
| `--coral-700` | `#c0351e` | High-emphasis warning |

### Secondary — Teal (Calm, Trust)

| Token | Hex | Usage |
|-------|-----|-------|
| `--teal-100` | `#cffafe` | Info card backgrounds |
| `--teal-200` | `#a5f3fc` | Selected info states |
| `--teal-400` | `#22d3ee` | Secondary info icons |
| `--teal-500` | `#06b6d4` | Info badges |
| `--teal-600` | `#0891b2` | **Secondary accent** |
| `--teal-700` | `#0e7490` | Info text |
| `--teal-900` | `#164e63` | High-emphasis info text |

### Neutral — Warm Gray

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-page` | `#faf8f5` | Page background |
| `--bg-canvas` | `#f0ede8` | Preview canvas background |
| `--bg-card` | `#ffffff` | Card/surface background |
| `--border` | `#e5e0da` | Default border |
| `--border-hover` | `#d4cdc5` | Hover border |
| `--gray-100` | `#f3f4f6` | Disabled backgrounds |
| `--gray-200` | `#e5e7eb` | Skeleton shimmer |
| `--gray-300` | `#d1d5db` | Disabled borders |
| `--text-tertiary` | `#9c9288` | Placeholder, muted text |
| `--text-secondary` | `#6b645c` | Body text |
| `--text-primary` | `#1a1614` | Headlines, high emphasis |

### Shadow Tokens

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.06)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.08)` |

### Corner Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small controls, badges |
| `--radius-md` | `10px` | Default buttons, inputs |
| `--radius-lg` | `16px` | Cards, modals |
| `--radius-xl` | `24px` | Large containers, dialog |
| `--radius-full` | `9999px` | Pills, tags |

---

## 2. Typography

### Headings — Fredoka (Display)

A round, friendly sans-serif with bouncy letterforms. Conveys playfulness and approachability.

| Level | Weight | Size | Line Height | Usage |
|-------|--------|------|-------------|-------|
| H1 | 700 | `4rem` (64px) | 1.1 | Hero headline |
| H2 | 700 | `2.5rem` (40px) | 1.15 | Section headings |
| H3 | 600 | `1.5rem` (24px) | 1.2 | Subsection headings |
| H4 | 500 | `1.1rem` (18px) | 1.3 | Card titles, category names |

### Body — DM Sans (System)

Clean, geometric sans-serif with approachable warmth. Comfortable for long reading.

| Level | Weight | Size | Line Height | Usage |
|-------|--------|------|-------------|-------|
| Body Large | 400 | `1.15rem` (18px) | 1.7 | Lead paragraphs |
| Body | 400 | `1rem` (16px) | 1.6 | Default body text |
| Body Small | 500 | `0.875rem` (14px) | 1.5 | Meta, labels, captions |
| Button | 600 | `0.95rem` (15px) | 1 | Button text |
| Caption | 500 | `0.75rem` (12px) | 1.4 | Tags, timestamps |

**Code:** `input-field`, `slider-value`, hex values: `SF Mono`, `Fira Code`, or system monospace.

---

## 3. Spacing Scale

All spacing derives from a 4px base unit.

| Token | Value | Example |
|-------|-------|---------|
| `--space-1` | 4px | Tight icon padding |
| `--space-2` | 8px | Button inner padding, small gap |
| `--space-3` | 12px | Input padding, label gap |
| `--space-4` | 16px | Card padding, button outer |
| `--space-5` | 24px | Section inner spacing |
| `--space-6` | 32px | Between component groups |
| `--space-8` | 48px | Between sections |
| `--space-10` | 64px | Major section breaks |
| `--space-12` | 80px | Page-level margins |

---

## 4. Component Design

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `--amber-500` | White | None | `--amber-600` |
| **Coral (export)** | `--coral-500` | White | None | `--coral-600` |
| **Secondary** | `--bg-card` | `--text-primary` | `--border` | `--gray-50`, darker border |
| **Ghost** | Transparent | `--text-secondary` | None | `--gray-100` |
| **Disabled** | `--gray-100` | `--gray-400` | `--gray-200` | None |

All buttons: `border-radius: --radius-md`, `font-weight: 600`, `font-family: --font-body`.
Active state: `transform: scale(0.97)`.

### Inputs

- Background: `--bg-card`
- Border: `--border`, `border-radius: --radius-md`
- Focus: `--amber-400` border + `3px rgba(245, 158, 11, 0.15)` ring
- Placeholder: `--text-tertiary`

### Sliders

- Track: `6px` height, `--gray-200` background, `3px` radius
- Thumb: `20px` circle, `--amber-500` background, hover scale 1.15

### Tabs (Control Panel)

- Background: `--gray-100`, `border-radius: --radius-md`
- Active tab: `--bg-card`, `--shadow-sm`
- Inactive: `--text-secondary`, hover → `--text-primary`

### Cards (Category)

- Background: `--bg-card`
- Border: `--border`, `border-radius: --radius-lg`
- Hover: `--amber-300` border, `2px` amber ring, translate -2px
- Shadow: `--shadow-md` on hover

### Toast Notifications

| Type | Background | Text | Border |
|------|-----------|------|--------|
| Success | `#ecfdf5` | `#065f46` | `#a7f3d0` |
| Error | `#fef2f2` | `#991b1b` | `#fecaca` |
| Info | `--amber-50` | `--amber-800` | `--amber-200` |

Enter animation: slide in from top, 300ms ease-out.

### Modals (Export Dialog)

- Overlay: `rgba(0,0,0,0.3)` backdrop
- Content: `--bg-card`, `border-radius: --radius-xl`, `--shadow-lg`
- Close button: top-right, ghost style

---

## 5. Loading & Empty States

### Skeleton Loading

- Background: `linear-gradient(90deg, --gray-200 25%, --gray-100 50%, --gray-200 75%)`
- Animation: `shimmer` 1.8s ease-in-out infinite
- Background size: `200% 100%`

### Empty States

- Centered layout
- Icon at `2.5rem`, 50% opacity
- Fredoka heading + DM Sans description
- CTA button below text
- Borders: `2px dashed --border`

### Error States

- Inline banner or toast
- Coral/red theme for destructive errors
- Info/amber theme for recoverable errors
- Always include retry/dismiss action

---

## 6. Responsive Behavior

| Breakpoint | Layout | Notes |
|-----------|--------|-------|
| ≥ 1200px | 3-column editor | Canvas center, sidebars full |
| 900–1199px | Collapsed right panel | Tabs become icons; expand on click |
| 600–899px | Stacked layout | Canvas full-width, controls below |
| < 600px | Single column | Hidden left panel, slide-out controls |

Landing page stacks vertically at all sizes. Hero resizes proportionally.

---

## 7. Motion & Interaction

- **Hover transitions:** 150ms ease-out on all interactive elements
- **Page transitions:** < 300ms
- **Canvas updates:** < 100ms from control change to preview refresh
- **Modal open:** 200ms ease-out, slight scale-up from 0.95
- **Toast enter:** 300ms ease-out slide-down
- **Skeleton shimmer:** 1.8s infinite
- **No unnecessary motion on initial page load** — progressive enhancement

---

## 8. Anti-Patterns (Do Not Use)

- ❌ Purple/violet/indigo gradient backgrounds
- ❌ 3-column icon-circle-card feature blocks
- ❌ Decorative blobs, floating circles, wavy SVG dividers
- ❌ Colored left-border accent on cards
- ❌ `system-ui` / `-apple-system` as display font
- ❌ Centered everything layout
- ❌ Marketing fluff copy ("revolutionary", "powerful", "game-changing")
- ❌ Predictable section rhythm (hero → 3 features → testimonials → pricing → CTA)

---

## 9. Design Preview

A live design system preview is available at `design-system-preview.html` in the project root. Open in any browser to see colors, typography, spacing, and component examples rendered.
