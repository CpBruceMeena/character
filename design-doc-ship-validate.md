# Design Doc: CharacterForge Pro — Ship & Validate

**Date:** 2026-05-29
**Mode:** Startup / Office Hours
**Stage:** Pre-product (built, no real users yet)
**Approach:** Ship & Validate

## Problem Statement

VTubers and streamers need custom character art (avatars, emotes, overlays, channel assets) but commissioning art is slow ($100-500+ per piece, 1-4 week turnaround) and DIY tools are either too limited or require design skills. This creates a gap where creators settle for static or generic character visuals.

## Target Persona

**Streamers and VTubers** — creators who need consistent, customizable character visuals across their streaming setup. They care about:
- Speed — can I create something usable in minutes, not days?
- Customizability — does this let me express my character's personality?
- Consistency — can I generate matching assets (emotes, overlays, panels)?
- Cost — is this cheaper than commissioning art?

## Evidence So Far

- Friends/acquaintances who tried it said it was cool ✅ (weak signal — politeness)
- One person came back a second time without being prompted ✅ (stronger signal — organic return)
- No external validation yet: no strangers, no waitlist, no revenue

## Key Unknowns (needs validation)

1. **Demand:** Will a stranger who has no relationship to the builder use this?
2. **Status Quo:** What are VTubers/streamers actually doing today for character art? What's the workaround? What's the specific pain point?
3. **Retention:** Does this solve a recurring need, or is it one-and-done?
4. **Monetization:** Will anyone pay, or is this a free tool that builds something else?

## Ship & Validate Plan

### Phase 1: Get in front of real VTubers (Week 1-2)
- Post in VTuber/streamer communities (Reddit r/VirtualYoutubers, r/streaming, Discord servers)
- "I built a free character creator — what's missing?" framing (not "look at my cool thing")
- Direct outreach to 5-10 small VTubers for feedback

### Phase 2: Measure real signals (Week 2-4)
- Track: signups, characters created, exports, return visits
- Talk to 3-5 users who create a character to understand their context
- Identify: what's the actual use case (stream avatar, emote, profile pic, all of the above)?

### Phase 3: Pivot or double down (Week 4+)
- If strong retention + active use → invest in features, improve onboarding
- If no retention → interview early users to understand why, consider pivot
- If no traction → cut scope or rethink the problem entirely

## Success Criteria

- **5+** active characters created by people we don't know personally
- **2+** return visits from at least one stranger
- **1+** user says they'd be annoyed if it disappeared
- A clear answer to: *"What is the actual job-to-be-done here?"*

## What We're NOT Doing (yet)

- No monetization — ship free first, learn what's valuable
- No complex features (layers, animations, advanced export) — ship what works
- No marketing push — focus on organic, targeted conversations
- No waiting for perfection — ship current state, iterate on feedback

## Technical Snapshot (current state)

- Next.js 14 app with TypeScript
- Canvas-based character rendering with layer caching
- 4 template categories (Fantasy, Sci-Fi, Modern, Historical)
- Export to PNG at multiple scales
- Onboarding tour for new users
- Running at localhost:3000, deployed to GitHub
