<!-- /autoplan restore point: /Users/cpbrucemeena/.gstack/projects/CpBruceMeena-character/HEAD-autoplan-restore-20260529-013225.md -->

Product Requirements Document (PRD)
Project: CharacterForge Pro
Version: 3.0
Status: Updated Draft
Platform: Web (desktop-first, fully responsive)
Roadmap: Phases 1-6
1. Product Summary
CharacterForge Pro is a web-based character creation tool that lets users design and customize characters from a wide range of character archetypes, including cartoons, web-series-inspired styles, movie-inspired styles, and other famous-personality-inspired archetypes, using original, non-infringing base assets and generalized design templates. The first release focuses on 2D character creation and export, with the product architecture kept modular so it can support more advanced character systems, including future 3D characters.

The website will provide a simple, guided experience with a strong landing page, intuitive editing controls, and one-click export in multiple image formats.

2. Product Vision
CharacterForge Pro aims to become a flexible character customization platform that evolves from a simple web editor into a broader character creation suite. The near-term goal is to deliver a clean, easy-to-use, highly customizable 2D creation experience; the long-term goal is to support richer character styles, more advanced rendering, and potentially 3D character creation in future phases.

3. Objectives
Let users create and customize characters quickly with minimal friction.

Support multiple character categories and generalized archetype-based templates.

Provide downloadable exports in common image formats.

Keep the system modular so future 3D support can be added without redesigning the product from scratch.

Make the interface accessible, simple, and easy to use for non-technical users.

Provide a landing page that clearly explains the product and its features.

4. Scope by Phase
Phase 1: Core 2D Character Creation
Phase 1 delivers the minimum complete product for creating a character, adjusting basic attributes, and exporting the result. Users can choose a category, customize appearance, preview changes in real time, and download the final character image.

Phase 2: Expanded Character Variety
Phase 2 introduces richer base templates, more styling choices, improved body options, and additional category-specific customization. The goal is to make the character library feel broader and more expressive.

Phase 3: Advanced Visual Control
Phase 3 adds more detailed control over proportions, expressions, clothing layers, accessories, and scene/background presentation. This phase should improve depth without making the experience overly complex.

Phase 4: Template and Export Enhancements
Phase 4 improves export flexibility, supports additional file formats where practical, and introduces more robust preset management. It may also add improved randomization and saved character variations.

Phase 5: Platform Expansion Readiness
Phase 5 prepares the product architecture for broader content sets and possible future support for advanced character systems, including 3D-ready modular components.

Phase 6: Future Advanced Creation
Phase 6 is reserved for future expansion into more advanced character generation workflows, including 3D character support, richer rendering pipelines, and enhanced creation tools.

5. Target Users
Persona	Description	Key Need
Creator	Wants to design a custom character quickly.	Simple controls and high-quality export.
Fan Builder	Wants to create generalized characters inspired by popular styles.	Broad archetype coverage and visual flexibility.
Casual User	Wants a fun and easy character maker.	Clear landing page and low learning curve.
Future Power User	Wants deeper customization and modular control.	More advanced editing options over time.
6. Landing Page Requirements
The landing page must clearly explain what the product does, who it is for, and what users can do inside the tool. It should immediately communicate that this is a web-based character creator with customization and export features.

Landing Page Content
Product name and short tagline.

Clear description of character creation and export workflow.

Feature highlights such as style selection, customization, preview, and download.

Primary call-to-action to start creating a character.

Secondary call-to-action to explore features or view examples.

Brief section explaining supported character categories.

Brief section explaining supported export formats.

Accessibility-friendly layout with readable typography and strong contrast.

Landing Page Goals
Help first-time users understand the product in seconds.

Reduce confusion about how the tool works.

Make the start of the creation journey obvious.

Present the product as simple, creative, and polished.

7. Functional Requirements
7.1 Character Categories
ID	Feature	Description
F-01	Category selection	User can choose from generalized character categories before editing begins.
F-02	Cartoon styles	Cartoon-based templates with simplified and expressive styling.
F-03	Web-series-inspired styles	Generalized original archetypes inspired by popular media genres.
F-04	Movie-inspired styles	Generalized original archetypes inspired by film character types and genres.
F-05	Famous-personality-inspired styles	Generalized and non-literal archetypes inspired by public-facing personas, without copying real likenesses directly.
F-06	Future 3D readiness	Product structure must remain modular enough to support 3D character creation later.
7.2 Character Base and Identity
ID	Feature	Description
F-07	Gender presentation	Masculine, feminine, and androgynous presentation options.
F-08	Body type presets	Slim, athletic, curvy, broad, petite, and other presets as needed.
F-09	Base template selection	User can start from one of several character base templates within a category.
7.3 Body and Appearance Controls
ID	Feature	Description
F-10	Body part visibility	User can show or hide major body parts where supported by the selected template.
F-11	Left-right variation	User can adjust certain parts independently when supported.
F-12	Height and width controls	User can modify overall proportions using sliders.
F-13	Head and limb scaling	Head size and limb proportions can be adjusted within allowed ranges.
F-14	Facial detail controls	Eye size, expression, and similar facial traits can be adjusted.
F-15	Skin and tone options	Preset and custom color options should be supported where relevant.
F-16	Hair options	Hair style and hair color controls should be available.
F-17	Clothing options	Users can select and customize clothing styles and layers.
F-18	Outfit colors	Outfit color zones can be edited independently when supported.
F-19	Accessories	Optional accessories such as glasses, hats, scarves, jewelry, and themed items.
F-20	Background options	Solid color, gradient, transparent, or themed backgrounds.
7.4 Editing Experience
ID	Feature	Description
F-21	Real-time preview	Every change updates the preview instantly or near-instantly.
F-22	Undo and redo	Users can revert and restore recent changes.
F-23	Randomize	Users can generate a coherent random character based on the selected category.
F-24	Presets	Users can save and reapply preset configurations within the session or future versions.
F-25	Reset	Users can reset the character to the original base template.
7.5 Export Requirements
ID	Feature	Description
F-26	Image export	Users can download the final character as PNG, JPEG, or other supported image formats.
F-27	Multiple formats	Export format selection must be easy to understand and simple to use.
F-28	High-resolution output	Export should support high-resolution downloads suitable for sharing and reuse.
F-29	Transparent background export	PNG export should support transparency where applicable.
F-30	Future export extensibility	Export system should remain flexible for future format additions.
8. Non-Functional Requirements
Accessibility
The product must be usable by a wide audience and should follow accessibility best practices. The interface must support readable typography, sufficient contrast, keyboard-friendly controls where applicable, and clear labels for interactive elements.

Usability
The interface should remain simple enough for first-time users to understand quickly. Editing controls should be grouped logically, and the user should always understand how to make and preview changes.

Responsiveness
The website should work well on desktop and adapt cleanly to tablet-sized screens. Desktop remains the primary design target, but the layout should not break on smaller screens.

Performance
The editor should feel responsive during character editing, and export should complete quickly for normal use. Rendering should be efficient enough to keep the experience smooth even as the character set expands.

Maintainability
The codebase should be modular so that new character templates, categories, and future 3D capabilities can be added without major refactoring.

Reliability
The application should handle invalid combinations, export failures, and missing assets gracefully, with user-friendly feedback.

9. Content and IP Policy
The product should use original, generalized, and non-infringing base assets. Character categories may be inspired by broad genres, styles, and archetypes, but must not directly copy protected characters, logos, or trademarked visual identities.

Where users create characters inspired by public figures or entertainment properties, the system should keep the output generic and stylized rather than duplicating real likenesses or specific copyrighted designs.

10. User Workflow
User arrives on the landing page and understands the product quickly.

User clicks to start creating a character.

User selects a category and base template.

User customizes appearance, clothing, and other visual elements.

User previews the result in real time.

User downloads the character in the preferred image format.

11. Success Metrics
Goal	Metric
Landing page clarity	Most users understand the product purpose within the first visit.
Creation completion	High percentage of users complete at least one character download.
Ease of use	Users can make basic edits without guidance.
Export success	Export should succeed reliably in common scenarios.
Future readiness	Architecture should support additional phases without major redesign.
12. Open Questions
Which exact categories should be included in Phase 1 versus later phases?

Which image formats beyond PNG and JPEG should be officially supported in the first release?

Should the product include saved presets in Phase 1 or later?

Should the landing page include example characters or a walkthrough section?

Should future 3D support be documented as architecture-only for now, or as a planned product initiative?13. Design System

A complete design system is documented in `DESIGN.md` in the project root. The system defines:
- Warm amber + coral + teal color palette with semantic tokens
- Fredoka (display) + DM Sans (body) typography pair
- 4px-based spacing scale (space-1 through space-12)
- Component designs for buttons, inputs, sliders, tabs, cards, toasts, modals, and skeletons
- Loading, empty, and error state patterns
- Responsive breakpoints (3-column editor → stacked)
- Motion guidelines (150ms–300ms transitions)
- Anti-patterns to avoid (purple gradients, 3-column icon grids, etc.)

All implementation must reference `DESIGN.md` for color tokens, type scale, spacing, and component variants. A live design preview is available at `design-system-preview.html`.

14. Phase Guidance

Phase 1 should focus on a polished and simple 2D creation and export experience. Later phases should progressively add depth, variety, and advanced control while preserving ease of use.

The product should grow in a way that keeps the core workflow stable: select a base, customize, preview, and export.

15. Design Appendix — Information Architecture

The product has three main screens: Landing Page, Character Creator, and Export Dialog.

15.1 Screen Flow
```
LANDING PAGE ──[Start Creating]──> CHARACTER CREATOR ──[Export]──> EXPORT DIALOG
     │                                    │                          │
     │                                    └──[Back to Editor]────────┘
     │                                    │
     │                                    └──[Reset/Randomize]──> Updated canvas
     └──[Explore Features]──> Scroll to details, then Start Creating
```

15.2 Landing Page Layout
```
+------------------------------------------------------------------+
| [Logo] CharacterForge Pro                    [Start Creating]     |
|                     Create Your Character                        |
|     Design and customize characters from any style or genre.     |
|                    [Start Creating ->]                            |
+------------------------------------------------------------------+
|  Why CharacterForge?                                             |
|  [Categories]  [Customize]  [Preview]  [Export]                  |
|  Pick a style  Tune every    See changes  Download your          |
|  and template  detail       in real time  character              |
+------------------------------------------------------------------+
|  Explore Character Categories                                     |
|  [Cartoon] [Web-Series] [Movie] [Personality]                    |
+------------------------------------------------------------------+
|  Export Formats                                                   |
|  PNG (with transparency) | JPEG | High Resolution                |
+------------------------------------------------------------------+
|  [Start Creating ->]                         [Learn More]         |
|  Footer: Product info, usage tips                                 |
+------------------------------------------------------------------+
```

15.3 Character Creator Layout (the main workspace)
```
+------------------------------------------------------------------+
| [Logo] CharacterForge Pro      [Undo] [Redo] [Randomize] [Reset] |
| Character Name: __________                      [Export ->]       |
+------------------+-------------------------------+----------------+
| CATEGORY & BASE  |   LIVE PREVIEW CANVAS         | APPEARANCE     |
|                  |                               | CONTROLS       |
| [Cartoon]        |      +-----------------+      | [Identity]     |
|   > Base A       |      |                 |      |   > Gender     |
|   > Base B       |      |   Character     |      |   > Body type  |
|   > Base C       |      |   Preview       |      |               |
|                  |      |   (canvas)      |      | [Body]         |
| [Web-Series]     |      |                 |      |   > Height     |
|   > Base X       |      |                 |      |   > Width      |
|   > Base Y       |      +-----------------+      |   > Head size  |
|                  |                               |   > Limb prop  |
| [Movie]          |    Background: [Dropdown]     |               |
|   > Base M       |    Zoom: [-=====+]      | [Face]          |
|   > Base N       |                               |   > Eye size   |
|                  |                               |   > Expression |
| [Personality]    |                               |   > Skin tone  |
|   > Base P       |                               |               |
|                  |                               | [Hair]         |
|                  |                               |   > Style      |
|                  |                               |   > Color      |
|                  |                               |               |
|                  |                               | [Clothing]     |
|                  |                               |   > Outfit     |
|                  |                               |   > Colors     |
|                  |                               |               |
|                  |                               | [Accessories]  |
|                  |                               |   > Glasses    |
|                  |                               |   > Hats       |
|                  |                               |   > Jewelry    |
+------------------+-------------------------------+----------------+
| Status: [Category] — [Base Template] — Changes saved              |
+------------------------------------------------------------------+
```

15.4 Export Dialog (overlay/modal)
```
+----------------------------------------------------------------+
|  Export Character                     [X]                        |
|                                                                  |
|  Format:  (o) PNG (with transparency)                            |
|           ( ) JPEG                                                |
|                                                                  |
|  Size:    [1x] [2x] [4x]                                        |
|                                                                  |
|  Preview: [Character thumbnail at selected size]                 |
|                                                                  |
|  [Cancel]                              [Download ->]             |
+----------------------------------------------------------------+
```

15.5 Navigation Rules
- Landing page is the default entry point. No forced onboarding or splash screen.
- "Start Creating" always navigates to the Character Creator with a default category selected.
- The Creator loads in its own stateful view — browser back returns to landing page.
- Export dialog is a modal overlay on top of the Creator.
- Closing/dismissing export returns to the Creator with the character unchanged.
- All controls are accessible without scrolling on a 1440px viewport.

15.6 Interaction State Coverage

For each key feature area, the following states must be designed and implemented:

| Feature Area | Loading | Empty | Error | Success | Partial / Edge |
|---|---|---|---|---|---|
| **Category/Template selection** | Skeleton cards with pulse animation for each category. "Loading character types…" label. | "No categories available" with a friendly illustration and a "Refresh" button. Explain this might be a connection issue. | Banner: "Couldn't load character types. Check your connection." Retry button. Graceful fallback with cached/default categories if available. | Category grid appears with smooth entrance animation. Selected category highlighted. | Timeout after 15s shows error state. Offline detection shows cached list with freshness indicator. |
| **Canvas preview** | Animated character outline skeleton with "Building your character…" label. Takes <500ms for initial render. | No character selected: show a centered prompt with an illustrative icon, text "Select a category and template to get started", and a shortcut button "Choose Category" linking to the sidebar. | Toast or inline error: "Preview unavailable. Try resetting the character." Character reverts to last valid state. Error details logged for debugging. | Preview renders with a subtle entrance animation. Canvas feels smooth and responsive. | Template assets that fail to load show a simplified fallback body. Missing body parts render as stylized silhouettes. |
| **Body & appearance controls** | Control panel sections show disabled sliders with shimmer placeholder. "Loading options…" label. | Controls area shows relevant controls for the current template. Some templates may have fewer options — controls simply don't appear (no empty panels shown). | Banner on the affected control section: "This option isn't available for the current template." Controls gracefully degrade rather than error. | Controls are interactive. Changes reflect on canvas within 100ms. | Asymmetric controls (left/right variation): second control appears only when toggled on. Independent color zones show color pickers for each zone. |
| **Undo/Redo** | N/A (always available once a change is made). | Undo/redo buttons are disabled (greyed out) when no history exists. Tooltip: "No changes to undo." | N/A — local operation, no error state. | Button activates with tooltip showing what will be undone/redone. | History cleared on template change (user is warned: "Changing template will clear your undo history"). |
| **Randomize** | Randomization spinner overlays the canvas briefly. "Generating random character…" label. Takes <1s. | N/A — always has a current character to randomize from. | If randomization fails (rare), character stays unchanged. Toast: "Couldn't randomize. Try again." | New character appears with a transition animation. Toast: "Random character created!" | Randomize respects constraints: if a category is selected, it randomizes within that category. |
| **Export** | Progress indicator in the export dialog. "Preparing your export…" with a progress bar or percentage. | N/A — there is always a character to export (even if it's the default). | Error in dialog: "Export failed." with reason and retry button. Specific errors for: network failure, rendering timeout, format incompatibility. Toast on main editor if dismissed. | Success state in dialog: checkmark animation, "Ready!" with download button. After download: "Downloaded!" confirmation. | Large/high-res exports: show estimated file size before downloading. Transparent PNG: preview shows checkerboard pattern to indicate transparency. |
| **Presets & Reset** | Loading spinner when applying a preset. "Applying preset…" label. | No saved presets: "No presets saved yet. Customize a character and save it here." with a friendly empty state illustration. | Toast: "Couldn't load preset. It may be corrupted." Remove corrupted preset from list automatically. | Toast: "Preset applied!" Preset name shown in the active preset indicator. On reset: character returns to base template with a subtle animation. | Session presets are lost on browser close — warn first-time users: "Session presets won't be saved after you close. Save them permanently in Phase 2." |
| **Background options** | Loading spinner for background preview thumbnails. | Default solid light gray background is always present. No true empty state — there's always a background. | If a custom background fails, fall back to solid color. Toast: "Background couldn't load. Using fallback." | Background updates instantly on the canvas behind the character. Transparent option switches to checkerboard pattern. | Custom color picker: show color preview before applying. Gradient: show simplified gradient preview.

15.7 User Journey & Emotional Arc

Each step of the user journey is designed to evoke a specific emotional response and support the user's state of mind.

| Step | User Does | User Feels | Plan Specifies | What Supports It |
|---|---|---|---|---|
| **1. Arrival** | Lands on the page from a link, search, or social. Scans the hero. | **Curiosity + excitement** — "I can make characters here?" Needs to understand within 3 seconds what this is. | Landing page with product name, tagline, description, CTA. | Strong hero composition: a bold rendered character example catching the eye. Tagline sets the creative tone. Primary CTA is the most visually prominent element. No clutter. |
| **2. Discovery** | Scrolls through features, categories, export info. | **Growing interest** — "This has what I need." Might compare to mental model of other character creators. | Feature highlights, category showcase, format info. | Scannable feature grid (4 items max). Category cards with representative character silhouettes. Export format icons for quick recognition. Content is short and benefit-driven, not feature-list. |
| **3. Commitment** | Clicks "Start Creating." | **Anticipation** — "Let's see what I can make." Slight anxiety about complexity. Zero investment yet — first impression of the tool matters. | Category to template selection flow. | Page transition feels fast (<1s). First screen is a simple, confident choice: pick a category. Nothing else. Reduces cognitive load. |
| **4. First creation** | Selects category, picks a base template. | **Delight + agency** — "This already looks good." The character appears. User feels ownership instantly. | Base template selection, real-time preview. | Template thumbnails are visually generous. Selected template immediately renders on the canvas with a character. User sees something worth customizing. |
| **5. Exploration** | Browses controls. Tries sliders. Changes hair, clothes, colors. | **Creative flow** — "I can make this really mine." Undo is safety net. User experiments freely. Fear of breaking the character is absent if reset/undo is obvious. | Body, face, hair, clothing, accessory controls with real-time preview + undo/redo. | Controls are organized in logical groups (Identity, Body, Face, Hair, Clothing, Accessories). Each group is collapsible. Changes reflected in <100ms. Undo button always visible. Randomize is a low-pressure way to discover possibilities. |
| **6. Refinement** | Fine-tunes details. Tries different backgrounds. | **Pride + satisfaction** — "This looks great." User zooms out, appreciates the full character. May share spontaneously. | Detailed controls, background options. | Sidebar controls allow precise adjustments. Canvas is large enough to see details. Background options let the character breathe against different environments. |
| **7. Completion** | Opens export dialog. Chooses format. Downloads. | **Accomplishment + closure** — "I made this." Export is the reward moment. Returning users feel loyalty. | Export dialog with format selection and download. | Export dialog shows the character proudly in the center. Format selection is one clear choice. Download button is celebratory (subtle animation or confirmation). "Downloaded!" message provides closure. |
| **8. Return** (future) | Comes back to make another character or edit a saved one. | **Familiarity + confidence** — "I know this tool." Recognizes the layout and controls from last time. | N/A (Phase 2+). | Persistent navigation. Muscle memory works: same layout, same control positions. If presets exist, the user sees their previous work and can continue. |

**Time-Horizon Design Applied:**
- **5 seconds (visceral):** Hero visual + tagline must communicate "character creator" instantly. No reading required.
- **5 minutes (behavioral):** Controls must feel intuitive within the first few interactions. Undo/redo must be immediately discoverable. The creative loop (adjust, see, adjust again) must be tight.
- **5 years (reflective):** The design avoids gimmicks. It respects the user's creativity. The tool gets out of the way and lets the user feel like the creator. Long-term users should feel the tool grew with them.

15.8 AI Slop Risk — Anti-Slop Guidance

To ensure the final implementation feels intentional and original rather than generic, the following patterns must be explicitly avoided and replaced with specific alternatives.

**Patterns to Avoid:**
| Pattern | Why It's Slop | Alternative |
|---|---|---|
| 3-column icon-card feature grid (icon in circle + bold title + 2-line description, repeated 3x) | Most recognizable AI layout. Every starter template uses it. | Use a varied layout: alternating image-text rows, a single large feature with supporting details, or a 2x2 grid with unequal sizing. No icons in colored circles. |
| Purple/violet/indigo gradient backgrounds or blue-to-purple color schemes | Overused AI-generated default. Communicates "no design decisions made." | Choose a warm creative palette: amber/orange, deep teal, or a monochromatic bold scheme with one accent. |
| Centered everything (headings, descriptions, cards all center-aligned) | Signals "no layout hierarchy." Creates large empty space. | Use left-aligned text with generous whitespace. Center only the hero headline. Section content should be asymmetric and varied. |
| Decorative blobs, floating circles, wavy SVG dividers | Decoration substituting for content. If a section feels empty, improve the content. | Use purposeful imagery (character examples, tool screenshots) instead of abstract decoration. |
| Colored left-border on cards (`border-left: 3px solid accent`) | Starter-template hallmark. | Use full background fills, subtle shadows, or typographic hierarchy to distinguish cards. |
| Generic hero copy ("Unlock the power of...", "Your all-in-one solution for...") | Tells the user nothing specific about the product. | Use direct, benefit-driven copy: "Create your character in minutes. Pick a style, customize every detail, and export in any format." |
| Predictable section rhythm (hero, 3 features, testimonials, pricing, CTA) | Cookie-cutter SaaS template. Every section same height and weight. | Vary section heights and layouts. Some full-width, some inset. Mix text-heavy with visual-heavy sections. |
| system-ui / -apple-system as the primary display font | The "I gave up on typography" signal. | Choose a real display typeface. Pair a bold expressive header font with a clean readable body font." |

**Copy Tone Guidelines:**
- Lead with benefit, not features. Not "Customize body parts with our advanced control system" but "Make your character look exactly how you want."
- No marketing fluff. No "revolutionary," "powerful," "game-changing," or "next-generation."
- Every headline should pass the "so what?" test: if the reader says "so what?" after reading, rewrite it.
- Use product language, not design commentary. The interface should explain itself without instructional text.

**Section Identity:**
Each section of the landing page should have one job, one clear headline, and one call-to-action (interaction or scroll). If a section can't pass this test, remove it or merge it.

16. Responsive & Accessibility Specification

16.1 Breakpoint Behavior

The editor layout adapts across four breakpoints:

| Breakpoint | Viewport | Layout | Canvas | Controls |
|---|---|---|---|---|
| Desktop | ≥ 1200px | 3-column editor | Center, generous (min 400px width) | Left + right sidebars fully visible |
| Compact desktop | 900–1199px | 3-column, condensed | Center, narrower | Right panel: tabs collapse to icons with tooltips; expand on click/focus |
| Tablet landscape | 768–899px | 2-column | Full-width (left panel hidden) | Controls below canvas, scrollable |
| Tablet portrait | 600–767px | Stacked | Full-width, reduced height | Controls below in an accordion, one section open at a time |
| Mobile | < 600px | Single column | Compact, scrollable | Slide-out drawer from bottom, triggered by "Show Controls" button |

16.2 Editor Responsive Rules

- Left panel (Category & Base): At < 900px, becomes a slide-out sidebar triggered by a "Category" button in the top bar.
- Right panel (Appearance Controls): At < 900px, becomes a collapsible bottom panel. Section tabs shown as a horizontal scrollable row at the top of the panel.
- Export dialog: Full-screen modal on < 600px, centered overlay on ≥ 600px.
- Canvas zoom controls hide at < 768px. Pinch-to-zoom on touch devices replaces them.
- Undo/Redo/Randomize/Reset buttons: At < 600px, collapse into a single overflow menu ("···").
- Category cards grid: 4 columns on desktop, 2 columns on tablet, 1 column on mobile.

16.3 Touch Targets

- All interactive elements must have a minimum tap target of 44×44px (WCAG 2.2 AA).
- Buttons, tabs, and slider thumbs must meet this target regardless of visual size.
- Sliders: On touch devices, the thumb increases to 32px diameter.
- Spacing between tap targets: minimum 8px (WCAG SC 2.5.8).

16.4 Keyboard Navigation

- All controls must be reachable and operable via keyboard.
- Tab order follows visual layout: left sidebar → canvas → right controls → top bar → export dialog.
- Within a control panel section (e.g., Body controls), Tab cycles through controls, arrow keys adjust sliders/selectors.
- Focus indicator: 2px solid `--amber-400` ring with 3px offset, visible on all focusable elements.
- Modal (Export dialog): Focus is trapped inside the modal. Tab cycles through modal controls. Escape closes the modal and returns focus to the trigger button.
- Skip link: "Skip to content" link at the very top of the page, visible on focus.
- Tab must not enter disabled/aria-hidden sections.

16.5 ARIA & Accessibility Requirements

- Canvas: `role="img"` with `aria-label="Character preview – [character name]"`. Live updates use `aria-live="polite"` for screen reader announcements of changes.
- Sliders: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.
- Tabs (control panel): `role="tablist"`, each tab has `role="tab"` with `aria-selected`. Content panels use `role="tabpanel"` with `aria-labelledby`.
- Toast notifications: `role="alert"` with `aria-live="assertive"` for errors, `aria-live="polite"` for success/info.
- Export dialog: `role="dialog"` with `aria-modal="true"` and `aria-labelledby="export-dialog-title"`.
- Color picker: `role="textbox"` with input mode, or use native `<input type="color">` with appropriate labels.
- Undo/Redo buttons: `aria-label="Undo: [description of last action]"` / `aria-label="Redo: [description of next action]"`. Disabled state uses `aria-disabled="true"`.
- Category cards: `role="button"` with `aria-label="Select [category name] category"`.
- Empty states: `role="status"` to notify screen readers of the empty state.
- Color contrast: All text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Amber-500 on white is 2.6:1 — do not use for body text. Reserved for large headings (≥24px).

16.6 Focus Management

- Initial focus on page load: The primary CTA on landing page, the category list first item in the editor.
- Template change: Focus returns to the selected category.
- Randomize: Focus stays on the randomize button.
- Undo/Redo: Focus stays on the activated button.
- Timeline history cleared warning (on template change): Focus moves to the confirm/cancel buttons.
- Closing a toast: Focus returns to the element that triggered the action.

17. Edge Cases

17.1 JavaScript Disabled

- The landing page must render a static fallback message: "CharacterForge Pro requires JavaScript to run. Please enable JavaScript in your browser settings to start creating characters."
- `<noscript>` tag in the HTML head with the fallback message and styled link to enable-js instructions.
- All editor functionality is JS-dependent by nature — no non-JS editor fallback is required.

17.2 Viewport Extremes

- Very large screens (> 2560px): The editor maxes out at 1400px content width, centered. Sidebars don't grow beyond 300px each. Canvas gets the remaining space.
- Very small screens (< 360px): Layout collapses to single column stack. Top bar wraps icons to two rows. Controls drawer takes full screen.
- Height-constrained screens (< 600px height): Editor switches to a vertically scrollable single-column layout. Canvas shrinks to fit above the fold.

17.3 Concurrent Actions

- Export during a template change: Export is disabled while a template is loading. The export button shows a loading spinner. If the user tries to export, nothing happens (button is disabled).
- Undo/Redo during export: Undo/redo are disabled during the export operation. History is preserved and re-enabled after export completes or is cancelled.
- Randomize during a template change: Randomize is disabled until the template loads. If triggered via keyboard during load, the action queues and fires on completion.
- Background change during character animation: Background updates immediately behind the character. No race condition — canvas layer handles independently.
- Closing the export dialog while download is in progress: The dialog waits for the download to complete before closing. If the download fails, the error state is shown before the dialog closes.

17.4 Font Loading

- Fredoka falls back to `sans-serif` if the Google Font CDN is unreachable. DM Sans falls back to `system-ui, sans-serif`.
- Use `font-display: swap` to ensure text is visible immediately with fallback fonts, then swaps to the custom font when loaded.
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` for faster font loading.
- No Flash of Invisible Text (FOIT): text is always readable, even before the custom font loads.

17.5 Network & Offline

- All app assets (HTML, CSS, JS, fonts) should load from cache via service worker for repeat visits (Phase 2+).
- Character templates/categories: If the network fails after initial load, the app continues working with loaded templates. Missing categories show the error state (15.6).
- Export: Requires no additional network requests (all rendering is client-side). Export always works offline after initial page load.

17.6 Browser Compatibility

- Target modern browsers: Chrome 90+, Firefox 88+, Safari 15+, Edge 90+.
- Canvas rendering: Use standard Canvas 2D API (no WebGL dependency for Phase 1).
- CSS features: Use CSS custom properties for theming (DESIGN.md tokens). Avoid `:has()` selector for critical layout (supported from Safari 15.4+).
- Graceful degradation: Controls that use newer APIs (e.g., `input type="color"`, high-resolution canvas `devicePixelRatio`) should detect support and fall back gracefully.

18. What Already Exists

This is a greenfield project. No existing code, assets, templates, or infrastructure exists. All components, assets, templates, and pipelines must be built from scratch.

19. NOT in Scope (Phase 1)

The following features are intentionally excluded from Phase 1 to maintain focus:
- Saved presets across sessions (Phase 2+)
- User accounts or authentication
- Server-side rendering of the editor page
- Backend API or database
- Service worker / offline caching (Phase 2+)
- 3D character creation or rendering (Phase 6)
- Animation or rigging
- Social sharing or community features
- Third-party integrations (import from other tools)
- Mobile app (native wrapper)
- Payment/subscription
- Real-time collaboration

**Vertical integration scope:** Per CEO review, Phase 1 ships only Cartoon + 1 additional category (to be determined by asset availability), each fully loaded with all controls. The template system architecture supports multiple categories — this is an asset/content decision, not a technical limitation. Additional categories in Phase 2+.

20. Engineering Architecture

20.1 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | SSR for landing page SEO, file-based routing, Turbopack/SWC compiler |
| UI Library | React 19 | Component model, ecosystem maturity |
| State Management | Zustand | Lightweight, temporal middleware for undo/redo, TypeScript-native |
| Rendering | Canvas 2D API | Direct pixel control for real-time preview, no WebGL overhead in Phase 1 |
| Styling | Tailwind CSS v4 | Design token mapping, responsive utilities, rapid iteration |
| Testing | Vitest + Playwright | Vitest for unit/integration, Playwright for E2E |
| Package Manager | pnpm | Fast, deterministic, monorepo-ready |

20.2 Component Architecture (Feature-First)

```
app/
├── layout.tsx                    # Root layout with fonts, metadata
├── page.tsx                      # Landing page (SSR)
├── globals.css                   # Tailwind base + DESIGN.md CSS variables
└── editor/
    └── page.tsx                   # Editor page (client component)

components/
├── landing/
│   ├── Hero.tsx                   # Hero section with tagline + CTA
│   ├── Features.tsx               # Feature highlights (4 items, varied layout)
│   ├── CategoryShowcase.tsx       # Category cards → click navigates to editor
│   └── ExportFormats.tsx          # Export format showcase
├── editor/
│   ├── EditorLayout.tsx           # 3-column grid layout wrapper
│   ├── TopBar.tsx                 # Character name, undo/redo, export button
│   ├── CategorySidebar.tsx        # Left panel: category tree + template selector
│   ├── ControlPanel.tsx           # Right panel: tabs of appearance controls
│   ├── ControlSection.tsx         # A collapsible control group (e.g., Face, Hair)
│   ├── SliderControl.tsx          # Reusable slider with label + value
│   ├── ColorPickerControl.tsx     # Reusable color picker
│   ├── ToggleControl.tsx          # Reusable toggle/checkbox
│   ├── SelectControl.tsx          # Reusable dropdown/select
│   └── ExportDialog.tsx           # Export modal overlay
├── canvas/
│   ├── CharacterCanvas.tsx        # Main canvas wrapper with RAF loop
│   ├── LayerRenderer.tsx          # Renders a single character layer (SVG → canvas)
│   └── CanvasControls.tsx         # Zoom, background overlay, export trigger
└── shared/
    ├── Button.tsx                 # DESIGN.md button variants
    ├── Toast.tsx                  # Notification toast (error/success/info)
    ├── Skeleton.tsx               # Loading skeleton
    ├── Modal.tsx                  # Reusable modal wrapper
    └── IconButton.tsx             # Icon button with tooltip

lib/
├── stores/
│   ├── character-store.ts        # Zustand: active character state
│   ├── ui-store.ts                # Zustand: active tab, panel state, modals
│   └── history-store.ts           # (via temporal middleware on character-store)
├── canvas/
│   ├── renderer.ts                # Canvas rendering pipeline (RAF + dirty tracking)
│   ├── layers.ts                  # Layer composition, z-ordering, visibility
│   └── export.ts                  # Off-screen canvas export (1x/2x/4x)
├── templates/
│   ├── schema.ts                  # TypeScript types for layered-part template schema
│   ├── loader.ts                  # Lazy template loader (fetch JSON + preload SVGs)
│   └── registry.ts               # Template registry (category → templates[])
└── utils/
    ├── colors.ts                  # Color manipulation helpers
    └── download.ts               # Blob → file download utility

data/
└── templates/
    ├── cartoon/
    │   ├── index.json             # Category config: templates[], metadata
    │   ├── base-a/
    │   │   ├── config.json        # Template schema: layers, controls, colorZones
    │   │   └── layers/
    │   │       ├── body.svg
    │   │       ├── head.svg
    │   │       ├── eyes.svg
    │   │       └── ...
    │   └── ...
    ├── web-series/
    ├── movie/
    └── personality/
```

20.3 Data Flow

```
User Action (slider, click, toggle)
        │
        ▼
  React Component (reads event)
        │
        ▼
  Zustand Store Action (characterStore.setHairColor(...))
        │
        ├──▶ Temporal middleware saves previous state (undo stack)
        │
        ▼
  Zustand state update triggers React re-render
        │
        ├──▶ UI components that depend on changed value re-render
        │
        ▼
  CharacterCanvas useEffect detects state change
        │
        ▼
  Dirty-layer tracking: mark only affected layers
        │
        ▼
  requestAnimationFrame → renderer.drawFrame(layers)
        │
        ├──▶ Clear canvas background
        ├──▶ For each visible layer (sorted by zIndex):
        │     if dirty: SVG → canvas (drawImage)
        │     else: reuse cached bitmap
        └──▶ Apply background overlay
        │
        ▼
  Canvas displays updated character
```

20.4 Canvas Rendering Pipeline (Performance-Tuned)

```
Setup phase (once):
  1. Create main canvas element
  2. Create off-screen buffer canvas for caching rendered layers
  3. Set up requestAnimationFrame loop

Frame phase (every animation frame, ~16ms):
  1. Check dirty layer flags
  2. If no dirty layers → skip (no-op frame, 0ms)
  3. If dirty layers exist:
     a. For each dirty layer by zIndex:
        - Load SVG → drawImage to layer buffer (cached after first render)
        - Apply color transformations on buffer
        - Cache rendered bitmap
     b. Clear dirty flags
  4. Compose: clear main canvas → draw cached backgrounds → draw cached layers
     (compositing is always full-frame but ~fast since it's just blitting cached bitmaps)

Export phase (on demand):
  1. Create off-screen canvas at target resolution (1x/2x/4x)
  2. Re-render all layers at full resolution (no caching needed — one-shot)
  3. canvas.toBlob() → download
```

20.5 Template Data Schema (Layered-Part)

```typescript
// lib/templates/schema.ts

interface TemplateConfig {
  id: string;
  name: string;
  category: CategoryId;
  thumbnail: string;          // path to thumbnail SVG
  layers: LayerDefinition[];
  controls: ControlDefinition[];
}

interface LayerDefinition {
  id: string;
  name: string;
  svgPath: string;            // path to SVG file in /data/templates/{category}/{template}/layers/
  zIndex: number;             // rendering order
  defaultVisible: boolean;
  colorZones?: ColorZone[];   // which parts of this layer can be recolored
  parentLayer?: string;       // conditional layer (e.g., glasses depend on eyes)
}

interface ColorZone {
  id: string;
  name: string;
  selector: string;           // SVG selector or fill-target identifier
  defaultColor: string;       // hex color
}

interface ControlDefinition {
  id: string;
  type: 'slider' | 'color' | 'toggle' | 'select' | 'group';
  label: string;
  section: ControlSection;    // 'identity' | 'body' | 'face' | 'hair' | 'clothing' | 'accessories'
  targets: string[];          // which layers / properties this control affects
  // type-specific props:
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string | boolean;
  options?: { label: string; value: string }[];
}
```

20.6 State Architecture

```typescript
// lib/stores/character-store.ts
import { create } from 'zustand';
import { temporal } from 'zundo';

interface CharacterState {
  // Identity
  gender: 'masculine' | 'feminine' | 'androgynous';
  bodyType: string;
  
  // Template
  categoryId: string | null;
  templateId: string | null;
  
  // Body
  height: number;            // 0-100 slider
  width: number;             // 0-100 slider
  headSize: number;          // 0-100 slider
  limbProportions: number;   // 0-100 slider
  leftRightVariation: Record<string, number>;
  partVisibility: Record<string, boolean>;
  
  // Face
  eyeSize: number;
  expression: string;
  skinTone: string;
  
  // Hair
  hairStyle: string;
  hairColor: string;
  
  // Clothing
  outfit: string;
  outfitColors: Record<string, string>;
  
  // Accessories
  accessories: Record<string, boolean | string>;
  
  // Background
  background: { type: 'solid' | 'gradient' | 'transparent'; color: string; secondaryColor?: string };
}

// Actions
interface CharacterActions {
  setGender: (gender: CharacterState['gender']) => void;
  setBodyType: (type: string) => void;
  selectCategory: (id: string) => void;
  selectTemplate: (id: string) => void;
  setHeight: (v: number) => void;
  setWidth: (v: number) => void;
  setHeadSize: (v: number) => void;
  setLimbProportions: (v: number) => void;
  setPartVisibility: (part: string, visible: boolean) => void;
  setEyeSize: (v: number) => void;
  setExpression: (e: string) => void;
  setSkinTone: (t: string) => void;
  setHairStyle: (s: string) => void;
  setHairColor: (c: string) => void;
  setOutfit: (o: string) => void;
  setOutfitColor: (zone: string, color: string) => void;
  toggleAccessory: (id: string) => void;
  setAccessoryOption: (id: string, value: string) => void;
  setBackground: (bg: CharacterState['background']) => void;
  randomize: () => void;
  reset: () => void;
}

// lib/stores/ui-store.ts
interface UIState {
  activeControlSection: ControlSection;
  isExportDialogOpen: boolean;
  isCategorySidebarOpen: boolean;   // for responsive
  isControlPanelOpen: boolean;     // for responsive
  activeControlGroup: string | null;
  toasts: Toast[];
  
  // Actions
  setActiveControlSection: (section: ControlSection) => void;
  toggleExportDialog: () => void;
  toggleSidebar: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}
```

20.7 Worktree Parallelization Strategy

Phase 1 can be parallelized into 5 independent work streams:

| Work Stream | Dependencies | Parallelizable With | Estimated Effort |
|---|---|---|---|
| **A. Project scaffold + design tokens** | None | B, C, D, E | ~2 hours |
| Setup Next.js, Tailwind, Zustand, Vitest. Map DESIGN.md tokens to CSS variables. Create globals.css. | | | |
| **B. Landing page** | A (design tokens) | C, D, E | ~4 hours |
| Hero, Features, CategoryShowcase, ExportFormats sections. Static SSR. | | | |
| **C. Template system + asset pipeline** | A (tokens, types) | B, D, E | ~6 hours |
| Schema types, template registry, lazy loader. Create 1-2 example template JSON + SVG assets. | | | |
| **D. Canvas rendering engine** | A (tokens) | B, C, E | ~8 hours |
| Canvas setup, RAF loop, dirty-layer tracking, layer composition, off-screen caching. | | | |
| **E. Character state + editor UI** | A (tokens, Zustand), C (templates) | B, D (D can start with mock data) | ~10 hours |
| Character store + UI store, EditorLayout, TopBar, CategorySidebar, ControlPanel, all controls. | | | |
| **F. Export pipeline** | D (canvas), E (character state) | None | ~3 hours |
| Off-screen canvas, format selection, download. Export dialog UI. | | | |
| **G. Integration + edge cases** | B, C, D, E, F | None | ~4 hours |
| Wire everything together. Responsive behavior, keyboard nav, ARIA, error states, edge cases. | | | |
| **H. Tests** | G (final state) | None | ~6 hours |
| Unit tests for stores/renderer, integration tests for editor flows, E2E for landing → export. | | | |

**Parallel execution plan:**
- **Lane 1:** A → B (landing page while core is built)
- **Lane 2:** A → C → E (template pipeline feeds editor)
- **Lane 3:** A → D (canvas engine, can use mock data until C is ready)
- **Merge:** E + D merge at F (export pipeline)
- **Integration:** G (ties everything together)
- **Final:** H (tests)

Total estimated wall-clock time with 2 developers: ~20 hours (vs ~43 hours sequential).

## 21. CEO Review — Scope & Strategy Decisions

### 21.1 Product Thesis

**Premise:** Existing character creators (Picrew, Hero Forge, Doll Divine) are cluttered, inconsistent, or shallow. CharacterForge wins on **cleaner UX + deep customization** — the combination no competitor delivers well.

**Dream state:** "It's the most flexible." A user can change anything — body proportions, facial features, clothing layers, colors, accessories — all without friction. The tool gets out of the way.

### 21.2 Build Approach

**Vertically Integrated** — Ship 1-2 categories (Cartoon + 1 more) with full depth (all controls, all layers) rather than many categories with shallow controls. Data from usage analytics informs which category to add next.

### 21.3 Expansions Accepted (Phase 1)

The following 6 scope expansions were cherry-picked during CEO review and added to Phase 1:

| # | Expansion | Description | Effort |
|---|-----------|-------------|--------|
| E-01 | **Character gallery** | Landing page shows 4-6 rendered character examples. Users see what's possible before creating. | S |
| E-02 | **Quick-share URL** | Full character state encoded as version-prefixed URL parameter. Opens a read-only viewer. Enables viral sharing. | M |
| E-03 | **Export presets** | Preset-based export: "Social" (1080×1080 JPEG), "Profile Pic" (500×500 PNG transparent), "Full Body" (original PNG transparent). | S |
| E-04 | **Onboarding tooltips** | 3-4 contextual tooltips on first editor visit: category selection, canvas controls, undo/redo, export. | S |
| E-05 | **Usage analytics** | Dev-only tracking of most-used controls, time per category, abandonment rate. Informs Phase 2 category decisions. No PII. | M |
| E-06 | **Dark/light mode** | Toggle in top bar. CSS variable swap at `<html>` level, persisted in localStorage. DESIGN.md tokens already support this. | S |

### 21.4 Strategic Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Business model | Free tool (showcase) | Portfolio project — metrics are reach and quality, not revenue |
| Open source | Yes, after Phase 1 | Community moat protects against cloning |
| 3D ambition | Aspirational | Keep architecture modular, no WebGL dependency in Phase 1 |
| Asset pipeline | Open-source CC0 SVGs | Avoid building 100+ SVGs from scratch. Use game asset packs. |
| Share URL encoding | Version-prefix | Future schema changes don't break existing share URLs |
| Share URL errors | Friendly error state | "This character link couldn't be loaded" with retry option |

### 21.5 Landscape Validation

Competitor research validated the cleaner UX thesis:

| Competitor | Key Weakness | CharacterForge Answer |
|------------|-------------|----------------------|
| **Picrew** | No undo. Inconsistent UI per creator. | ✅ Undo/redo via Zustand temporal middleware. Consistent controls. |
| **Hero Forge** | Nested menus, complex controls. Paid. | ✅ Starting with 1-2 categories = no deep menus. Free. |
| **Doll Divine / Rinmaru** | Fixed layering, rigid templates. | ✅ Modular layer composition with z-index control. |
| **Ready Player Me** | Shallow customization. | ✅ Deep customization per category — the dream state. |

The single strongest differentiator: **undo/redo**. No major character creator offers it.

## 22. Error & Rescue Registry

Every user-facing operation that can fail, with its expected rescue behavior:

| Codepath | Failure Mode | Detection | Rescue Behavior | Severity |
|----------|-------------|-----------|-----------------|----------|
| **Template load** | Network failure, JSON parse error, missing asset | `fetch` rejection, try/catch on JSON parse | Retry button + banner: "Couldn't load character type. Check your connection." Falls back to previously loaded templates if cached. | High |
| **SVG asset load** | Missing SVG file, corrupt SVG, CORS block | `Image` onerror event, try/catch on `drawImage` | Missing layer renders as stylized silhouette placeholder. Toast: "Some details couldn't load." Logged for debugging. | Medium |
| **Canvas render** | Canvas context lost (rare — memory pressure, GPU reset) | `canvas.getContext` returns null, or context lost event | Full re-initialization of canvas + off-screen buffers. Toast: "Preview reset." Character state preserved. | Critical |
| **Export** | Rendering timeout, format unsupported, Blob creation failure | `setTimeout` guard on export render, try/catch on `canvas.toBlob` | Error in dialog with specific reason + retry button. Toast on main editor if dismissed. Download never silently fails. | High |
| **Share URL decode** | URL truncated, corrupted, schema version mismatch, length overflow | try/catch on decode + schema version check + length cap (2000 chars) | Friendly error page: "This character link couldn't be loaded" + illustration + button to start fresh editor. | Medium |
| **Undo/Redo** | Temporal middleware out of bounds (empty stack) | Zustand temporal `past`/`future` length check | Buttons disabled (greyed) when no history. Tooltip: "No changes to undo." No error state — local operation. | Low |
| **Randomize** | Random generator produces invalid combination | Validation after randomize: check each property against template schema | Character stays unchanged. Toast: "Couldn't randomize. Try again." | Low |
| **Color picker** | `input type="color"` unsupported in browser | Feature detection on mount | Fall back to text input with hex validation. Label: "Enter hex color (e.g., #FF6633)." | Low |
| **Font loading** | Google Font CDN unreachable | `document.fonts.ready` timeout after 5s | Fallback fonts (sans-serif, system-ui) already applied via `font-display: swap`. No user-visible failure. | Low |
| **Canvas resize** | Browser resize causes canvas invalidation before RAF loop render | ResizeObserver debounced at 150ms | Canvas dimensions corrected on next RAF frame. Brief (<16ms) visual glitch possible but imperceptible. | Low |

## 23. Failure Modes Registry

System-level failure modes that could compromise the product:

| Failure Mode | Trigger | Impact | Mitigation | Likelihood |
|-------------|---------|--------|-----------|-----------|
| **Memory exhaustion from cached SVGs** | Many template assets loaded (50+ SVGs) → browser tab OOM | Tab crash, user loses unsaved work | Lazy-load SVGs per category. Clear unreferenced layer caches on template change. Max cache: 30 rendered bitmaps. | Low |
| **Canvas 2D context loss** | GPU reset, browser tab backgrounded under memory pressure | Character preview becomes white/blank | Listen for `contextlost` event. Re-initialize canvas + re-render all layers. State preserved in Zustand (not canvas). | Very low |
| **Share URL overflow** | Character state grows in future phases, URL exceeds 2000 char limit | Share URL truncated → corrupted character | Version-prefix scheme allows per-version max length. Current estimate: ~500 chars. Cap at 2000. Future: use compression or short-link service. | Low |
| **SVG asset supply** | CC0 game pack SVGs don't exist for all body parts/categories | Missing layers, incomplete characters | Template schema supports optional layers. Missing layers = simplified silhouette. Asset creation is parallelizable. | Medium |
| **Browser compatibility (Safari Canvas)** | Safari 15+ Canvas 2D bugs with SVG `drawImage` | Character layers render incorrectly or not at all | Feature detection in renderer. Fallback: composite layers using DOM elements instead of canvas for known-bad Safari versions. Polyfill layer. | Low |
| **Zustand temporal memory growth** | Long editing sessions (1000+ undo steps) | Memory pressure from full state snapshots per action | Cap undo history at 100 steps. Auto-prune after threshold. User warning at 90 steps: "Undo history is getting long." | Low |
| **Analytics script failure** | 3rd-party analytics CDN down | No analytics data for a session | Analytics wrapped in try/catch. Never blocks user interaction. Degrades silently. | Very low |
| **Open source timing risk** | Clone appears before Phase 1 is complete/public | Someone ships a similar tool first | Open source after Phase 1 goes live. Community moat (contributors, templates) takes time to build — be first to market quality. | Medium |

## 24. Test Coverage Map (Codepath → Test)

```
LANDING PAGE (SSR)
├── Hero renders with correct title/CTA    → Unit: renders without crashing
├── Category cards click → navigates to editor → E2E: click card → /editor page loads
├── Gallery section renders 4-6 examples   → Unit: gallery data renders
├── Dark mode toggle persists              → Unit: localStorage read/write
└── Responsive layout at 4 breakpoints     → Visual: Playwright screenshot diff

EDITOR — TEMPLATE SELECTION
├── Category list loads from registry       → Unit: registry returns categories
├── Template thumbnails render              → Unit: template list renders
├── Category change → templates update      → Integration: state + UI
├── Template select → canvas loads layers   → Integration: store → renderer
├── Category load failure → error state     → Unit: error component shows
└── Template load failure → fallback        → Integration: loader → fallback

EDITOR — CHARACTER CONTROLS
├── Slider drag → state updates → canvas    → Integration: store subscription → canvas redraw
├── Color picker change → state updates     → Unit: store action
├── Toggle visibility → layer hides/shows   → Unit: store → LayerRenderer
├── Left/right variation → independent      → Unit: asymmetric state
├── Undo → state reverts                    → Unit: temporal middleware
├── Redo → state reapplies                  → Unit: temporal middleware
├── 100+ undo actions → no crash            → Stress: temporal cap behavior
├── Randomize → coherent random character   → Integration: randomize within constraints
└── Reset → returns to base template        → Unit: reset action

EDITOR — CANVAS
├── Initial render → all layers visible      → Integration: canvas has composited layers
├── Dirty layer → only that layer redraws    → Unit: dirty flag tracking
├── No dirty layers → no-op frame           → Unit: RAF loop skips
├── Resize → canvas dimensions update       → Integration: ResizeObserver
├── Context lost → re-initialize            → Integration: context lost event handler
└── Off-screen buffer caching               → Unit: cache hit/miss

EDITOR — RESPONSIVE
├── 1200px+ → 3-column layout               → Visual: Playwright viewport
├── 768-899px → 2-column, controls below    → Visual: Playwright viewport
├── < 600px → single column, bottom drawer  → Visual: Playwright viewport
├── Keyboard nav → Tab order correct        → E2E: tab through all controls
└── Screen reader → ARIA labels present     → E2E: accessibility audit (axe-core)

EXPORT
├── PNG export → correct format + transparent → Integration: Blob type check
├── JPEG export → correct format              → Integration: Blob type check
├── 2x export → double resolution            → Integration: canvas dimensions
├── Export preset "Social" → correct size    → Unit: preset config
├── Export failure → error dialog            → Integration: error state
└── Export during template load → disabled   → Integration: concurrent action guard

SHARE URL
├── Encode → full state → URL parameter      → Unit: serialization roundtrip
├── Decode → read-only viewer renders       → Integration: URL → state → render
├── Malformed URL → friendly error           → Unit: decode error handler
└── Schema version mismatch → friendly error → Unit: version check

ANALYTICS
├── Control interaction → event logged       → Unit: analytics event
├── Analytics failure → no user impact       → Unit: try/catch wrapper
└── No PII → no personal data in events     → Audit: event payload inspection

USAGE FLOW (E2E)
├── Landing → Start Creating → editor loads  → Playwright: full flow
├── Select category → pick template → renders → Playwright: category → template → canvas
├── Change 5 controls → undo twice → correct  → Playwright: state history
├── Export PNG → file downloaded             → Playwright: download event
└── Share URL → open in new tab → renders    → Playwright: URL → new page → same character
```

## GSTACK REVIEW REPORT

**Eng Review — CharacterForge Pro Phase 1**

| Review | Runs | Status | Findings |
|--------|------|--------|----------|
| CEO Review — Product Thesis | 1 | ✅ CLEAR | Cleaner UX + deep customization thesis validated by competitor landscape research. Undo/redo identified as unique moat. |
| CEO Review — Build Approach | 1 | ✅ CLEAR | Vertically integrated: ship 1-2 categories fully loaded. Section 19 updated to reflect. |
| CEO Review — Scope Expansions | 1 | ✅ CLEAR | 6 expansions accepted (E-01 through E-06). Section 21.3 updated. Share URL versioning and error handling decisions locked. |
| CEO Review — Strategic Decisions | 1 | ✅ CLEAR | Free tool, open source after Phase 1, 3D aspirational, open-source CC0 assets. |
| Design Review — Information Architecture | 1 | ✅ CLEAR (8/10) | 3-screen IA with explicit layouts. |
| Design Review — Interaction State Coverage | 1 | ✅ CLEAR (7/10) | Full loading/empty/error/success/edge table for 7 feature areas. |
| Design Review — User Journey & Emotional Arc | 1 | ✅ CLEAR (8/10) | 8-step storyboard with time-horizon design. |
| Design Review — AI Slop Risk | 1 | ✅ CLEAR (8/10) | 9 anti-patterns identified with specific alternatives. |
| Design Review — Design System Alignment | 1 | ✅ CLEAR (8/10) | DESIGN.md created. Full palette, typography, spacing. |
| Design Review — Responsive & Accessibility | 1 | ✅ CLEAR (7/10) | 5 breakpoints, touch targets, keyboard nav, ARIA. |
| Design Review — Edge Cases | 1 | ✅ CLEAR (8/10) | 6 edge case categories fully specified. |
| **Eng Review — Architecture** | **1** | **✅ CLEAR** | **7 findings — see below** |
| **Eng Review — Security** | **1** | **✅ CLEAR** | **0 findings — no server-side attack surface in Phase 1** |
| **Eng Review — Performance** | **1** | **✅ CLEAR** | **1 finding — analytics debouncing** |
| **Eng Review — Test Coverage** | **1** | **✅ CLEAR** | **5 coverage gaps identified — see below** |
| **Eng Review — Edge Cases** | **1** | **✅ CLEAR** | **3 gaps in error recovery registry** |

### Eng Review Findings (13 total)

**Medium Severity (fix before implementation):**
1. **SVG ColorZone selector fragility** — Using raw CSS selectors on SVGs will break after SVG optimization (svgo strips IDs/classes by default). Use `data-colorzone="zone-id"` attributes on SVG elements and configure svgo to preserve them. Add schema validation that checks every layer SVG for required data attrs.
2. **Template change clears undo history (no warning gate)** — The store shows `selectTemplate` but no warning/gating mechanism. The UI must show a confirmation dialog before clearing history. Add `clearHistory()` action to the store that the component only calls after user confirms.
3. **Canvas context loss invalidates all off-screen caches** — Rescue registry says "re-initialize + re-render all layers" but doesn't mention cached bitmaps are also lost. Must re-parse and re-draw every SVG from scratch on context loss. This is a ~500ms recovery — set user expectation via toast.
4. **Safari SVG→canvas drawImage bugs** — Safari 15+ has known SVG rasterization issues. Feature-detect and fall back to rendering SVGs as `<img>` elements overlaid on canvas if `drawImage` produces blank output on affected browsers.

**Low Severity (note before implementation):**
5. **`accessories` type looseness** — `Record<string, boolean | string>` allows collision between toggles and options. Split into `accessories: { toggles: Record<string, boolean>; options: Record<string, string> }`.
6. **No `partVisibility` initialization from template** — Store has `partVisibility` but no documented initialization path from `LayerDefinition.defaultVisible` on template load.
7. **No dirty-layer cache clear on template change** — Failure modes mention it, but data flow doesn't include it as a formal step. Must purge old layer bitmaps.
8. **Randomize action must be atomic (single undo step)** — If randomize fires 10 sequential store set() calls, that's 10 undo steps. Use single state merge via Zustand `set()` for randomize.
9. **Analytics events need debouncing** — E-05 tracks control usage. Fire events at `onChangeEnd`/`onPointerUp`, not per slider tick. Add event schema audit in CI for PII compliance.
10. **No bundle splitting strategy documented** — Editor bundle (Zustand + canvas + React) will be ~80-120KB gzipped. Next.js App Router auto-splits page boundaries — verify during implementation.
11. **Offline category switching failure** — 17.5 says "Export works offline after initial load" but category switches that load new SVGs will fail without network. Preload Phase 1 category SVGs with the initial bundle, or detect offline and show a toast.
12. **Export dialog close during download** — 17.3 says dialog waits for download, but `canvas.toBlob()` callback must not be inside a `useEffect` cleanup that cancels on navigation.
13. **`ControlDefinition.type: 'group'` is undefined** — Mentioned in schema but group behavior (radio, multi-select, nested) is unspecified.

### Eng Review — Test Coverage Gaps

| Gap | Missing Test | Priority |
|-----|-------------|----------|
| 1. Share URL encode overflow (>2000 chars) | Unit: simulate bloated state, verify length ≤ 2000 | P2 |
| 2. Canvas context loss + full recovery | Integration: trigger contextlost event, verify re-render | P1 |
| 3. RAF loop memory leak (1000+ frames) | Stress: run 1000 RAF cycles, check monotonic memory | P2 |
| 4. SVG asset load failure → silhouette fallback | Integration: mock failed SVG, verify placeholder renders | P1 |
| 5. Analytics failure isolation (try/catch) | Unit: throw in analytics handler, verify store still works | P2 |

**CODEX:** Not available (outside voice not consulted for this eng review).

**CROSS-MODEL:** No cross-model disagreement. All findings are within-claude architectural analysis.

**UNRESOLVED:** 0 decisions left open. All 13 findings are documented with clear severity and remediation.

**VERDICT:** ENG CLEAR — 4 medium-severity findings (fix before implementation) + 9 low-severity notes (address during implementation). All architecture decisions reviewed. No blockers. Ready for Phase 1 implementation after addressing items 1-4.
