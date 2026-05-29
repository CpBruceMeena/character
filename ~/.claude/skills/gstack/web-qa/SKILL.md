---
name: web-qa
preamble-tier: 4
version: 1.0.0
description: Browser-based web QA — interactively test clickable elements, navigation, console errors, and responsive layout on any website. Lightweight, targeted, no source-code fixes. (gstack)
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
triggers:
  - qa the website
  - test button clicks
  - find web issues
  - ui qa
  - interactive testing
  - test the ui
---

<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## When to invoke this skill

Runs browser-based QA on any web application:
- Navigate to pages, click buttons, fill forms, check navigation
- Identify console errors, broken links, UI rendering issues
- Test responsive layout at multiple viewport sizes
- Generate a structured QA report with screenshots and repro steps

**Does NOT fix source code.** For the full test-fix loop, use `/qa` instead.
For a report-only audit without interactive testing, use `/qa-only`.

Voice triggers (speech-to-text aliases): "web quality check", "test the website UI", "click test", "browser qa".

## Preamble

```bash
_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "BRANCH: $_BRANCH"
mkdir -p .gstack/qa-reports
echo "REPORT_DIR: .gstack/qa-reports"
_SESSIONS=$(find ~/.gstack/sessions -mmin -120 -type f 2>/dev/null | wc -l | tr -d ' ')
find ~/.gstack/sessions -mmin +120 -type f -exec rm + 2>/dev/null || true
echo "SESSIONS: $_SESSIONS"

# Detect browse binary
_BROWSE=""
for _P in ~/.claude/skills/gstack/browse/dist/browse ~/.agents/skills/gstack/browse/dist/browse; do
  if [ -x "$_P" ]; then _BROWSE="$_P"; break; fi
done
if [ -n "$_BROWSE" ]; then
  echo "BROWSE: $_BROWSE"
else
  echo "BROWSE: not found — run gstack setup first"
fi

# Check Chrome for browser-use agent
if command -v /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome >/dev/null 2>&1 || [ -d "/Applications/Google Chrome.app" ]; then
  echo "CHROME: installed"
else
  echo "CHROME: not found"
fi

# Check dev server
_DEV_URL="${1:-http://localhost:3000}"
echo "TARGET_URL: $_DEV_URL"
```

## Plan Mode Safe Operations

In plan mode, allowed because they inform the plan: `$B` goto/screenshot/console, writes to `.gstack/qa-reports/`, and `open` for generated artifacts.

## Skill Invocation During Plan Mode

If the user invokes a skill in plan mode, the skill takes precedence over generic plan mode behavior. **Treat the skill file as executable instructions, not reference.** Follow it step by step; the first AskUserQuestion is the workflow entering plan mode. AskUserQuestion satisfies plan mode's end-of-turn requirement. At a STOP point, stop immediately. Call ExitPlanMode only after the skill workflow completes.

If `PROACTIVE` is `false`, do not auto-invoke or proactively suggest skills.

## Writing Style

- Be concrete. Name the URL, the element, the error message, the viewport size.
- Frame findings in user-impact terms: "Users clicking X see a 404", not "X link is broken".
- Use short sentences, active voice.

## Workflow

### Step 0: Probe

```bash
echo "Target: $TARGET_URL"
curl -s -o /dev/null -w "HTTP %{http_code}" "$TARGET_URL" 2>/dev/null || echo "unreachable"
```

If the target is unreachable, inform the user and STOP.

### Step 1: Orient

Navigate to the target URL and take a full-page screenshot.

```bash
$B goto "$TARGET_URL"
$B screenshot .gstack/qa-reports/screenshots/01-orient.png
$B console --errors
$B info
```

Record: page title, HTTP status, console errors, link count.

### Step 2: Navigation & Link Audit

Check every non-external link on the page.

```bash
$B links
```

For each internal link found, test it:

```bash
$B goto "$TARGET_URL/<path>"
$B console --errors
```

**Look for:**
- 404 pages
- Console errors on each page
- Broken images/assets
- Slow page loads (>3s)

### Step 3: Interactive Testing

For each interactive element (buttons, forms, toggles, dropdowns), test by aria-label or text:

```bash
# Click buttons by aria-label
$B click '[aria-label="Export"]'
$B console --errors
$B screenshot .gstack/qa-reports/screenshots/03-export-dialog.png

# Click by visible text
$B click 'text=Skip tour'
$B console --errors

# Test dropdown/select by label
$B click 'text=Expression'
$B console --errors
```

**Look for:**
- Timeout errors (element not found, not visible, covered by overlay)
- Console errors after interaction
- UI state changes not reflected visually
- Overlapping elements preventing clicks
- Unresponsive buttons

### Step 4: Responsive Layout

Test at 3 viewport sizes:

```bash
# Desktop
$B viewport 1280x900
$B screenshot .gstack/qa-reports/screenshots/04-desktop.png
$B console --errors

# Tablet
$B viewport 768x1024
$B goto "$TARGET_URL"
$B screenshot .gstack/qa-reports/screenshots/04-tablet.png
$B console --errors

# Mobile
$B viewport 375x812
$B goto "$TARGET_URL"
$B screenshot .gstack/qa-reports/screenshots/04-mobile.png
$B console --errors
```

**Look for:**
- Horizontal scroll
- Overlapping or clipped elements
- Missing content or hamburger menu not working
- Text overflow
- Broken grid layouts

### Step 5: Visual & Console Audit

```bash
$B screenshot .gstack/qa-reports/screenshots/05-fullpage.png
$B console --all
```

**Look for:**
- Console warnings (deprecations, hydration errors)
- Network errors (failed resource loads)
- Infinite re-renders or excessive logging
- Accessibility issues (missing aria-labels, role attributes)

### Step 6: Compile Issues

Group issues by severity:

| Severity | Criteria |
|----------|----------|
| 🔴 CRITICAL | 404 pages, broken core flow, console errors on every page |
| 🟡 HIGH | Broken navigation, unclickable buttons, missing data |
| 🔵 MEDIUM | Debug UI visible to users, console warnings, responsive breakage |
| ⚪ LOW | Cosmetic issues, missing empty states, text/typography problems |

For each issue, record:
- **URL** where it was found
- **Repro steps** (exact sequence to trigger)
- **Screenshot** reference
- **Console output** (if relevant)

### Step 7: Report

Write the report to `.gstack/qa-reports/qa-web-report-{YYYY-MM-DD}.md`:

```markdown
# Web QA Report
**Date:** {date}
**Target:** {url}
**Tier:** Quick / Standard / Exhaustive

## Health Score
**Overall: X/10**
- Navigation: X/10
- Console: X/10
- Responsive: X/10
- Interaction: X/10

## Issues
### ISSUE-N (SEVERITY)
- **URL:** ...
- **Repro:** ...
- **Evidence:** screenshot-xx.png
- **Console:**
```

### Step 8: Present Findings

Summarize findings to the user:
- Total issues found (by severity)
- Screenshots captured
- Health score breakdown
- Top 3 most important issues to fix

Ask if they want to proceed to `/qa` for the fix loop, or stop here.
