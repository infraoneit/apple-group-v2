---
target: homepage
total_score: 17
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
target_fingerprint: "sha256:4b56134460c1b32fb44824fbe7a7fcc50e0fc5f5f285afea34a3246330eb82e2"
target_path: "C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
timestamp: 2026-09-23T07-32-58Z
slug: src-app-website-page-tsx
closed: true
---
Method: dual-agent (A: a49e6d77c08a1f98d · B: a1b58ea2056d81a59)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-shadow, hover states, `aria-pressed` on toggle all work; nothing async on this page. |
| 2 | Match System / Real World | 3 | Plain Swiss-German real-estate language, no jargon. |
| 3 | User Control and Freedom | 3 | Theme choice persists and reverses in one click; menu closes on Escape/outside click. |
| 4 | Consistency and Standards | 3 | Card, button and rhythm patterns are consistent; the vitrine frame/light is inconsistently perceptible versus how DESIGN.md describes it. |
| 5 | Error Prevention | n/a | No destructive or input-bearing action on the homepage itself. |
| 6 | Recognition Rather Than Recall | 3 | Primary actions are visible labeled text; theme toggle is icon-only but carries a proper `aria-label`. |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode marketing surface; no power-user path expected. |
| 8 | Aesthetic and Minimalist Design | 2 | Clean per-section, but Hero → About → Projects → Footer sit within a ~10% brightness band in dark mode, so the page reads as one flat scroll rather than the "room sequence" the design system names. |
| 9 | Error Recovery | n/a | No form/error-producing interaction on the homepage itself (contact form lives on a separate page). |
| 10 | Help and Documentation | n/a | Not applicable to a marketing landing page. |
| **Total** | | **17/24** | **Good (71%)** |

Four heuristics (5, 7, 9, 10) are `n/a` for this Persuade-mode single page with no form or destructive action; the applicable maximum is 24, not 40.

## Design Specificity Verdict

**LLM assessment (Assessment A):** A partially-authored system wearing a generic real-estate template underneath. The ingredients are genuinely specific (Cormorant display, rose-gold/blattgold token swap, dark-default "Vitrine" staging, apple-monogram signet), but the built page doesn't deliver the promise DESIGN.md makes. The signature vitrine-rahmen + vitrine-licht effect, the one element meant to carry the entire "jewelry under gallery light" concept, is a 1px/35%-opacity line with a hover-only glow. At rest it reads as a thin border, not a lit display case; a visitor unaware of the DESIGN.md framing would describe this as "a dark real-estate site with gold accents," not a Cartier/Tiffany-inspired vitrine. Three of four homepage project-card descriptions are also template-generic ("[Neubau/Sanierung]projekt der Apple Property Group AG in [Ort]."), which compounds the generic-template feel exactly where the brand most needs to differentiate.

**Deterministic scan (Assessment B):** The project-scoped CLI scan (with `.impeccable/config.json` applied) is clean: `[]`, exit 0, across `src` and the homepage file. Running `--no-config` to see what the project's own ignore-list suppresses surfaces one finding, `side-tab` on `globals.css:316`, which the project already ignored earlier this session with a documented reason (it's a blockquote left-rule, not a card side-tab). The live-injected browser detector, which runs against the rendered DOM rather than source, found more: **11 anti-patterns** on both desktop and mobile — 5× `radial-spotlight-glow` and 5× `gpt-thin-border-wide-shadow` (both tracing 1:1 to the `.vitrine-licht`/`.vitrine-rahmen` pair used on the hero and all four project cards), plus 1× `overused-font` (Inter at 83% of text). A secondary group logged 2× `kicker-above-heading` and 4× `image-hover-transform`.

**Where A and B agree, and why that matters:** B's source reading confirms the glow/shadow/font/kicker findings are false positives in the narrow sense, they all trace to a single named, documented, consistently-reused design-system utility, not ad hoc slop. But the fact that a *generic* pattern-matcher shape-matches the vitrine effect to the exact "spotlight glow + thin border + wide soft shadow" signature it uses to catch generic AI-generated card treatments is itself corroborating evidence for Assessment A's core finding: visually, at the pixel level, the vitrine effect currently resembles the boilerplate genre it is trying to transcend, even though its intent and documentation are bespoke. Intent alone did not make it look distinctive; the fix in Priority Issue 1 below (stronger, at-rest-visible framing) is also very likely to change how a mechanical shape-detector reads it, since "hover-only, low-opacity" is a large part of why it currently pattern-matches so cleanly to a generic template treatment.

**Visual overlays:** injection succeeded and the detector ran live in the page (desktop and mobile), but the tab used for the injection run was closed and the live-server stopped at the end of Assessment B's run, per protocol. No overlay is currently open in your browser for you to inspect; the findings above are the full console output captured during the run.

## Overall Impression

The individual pieces of "Die Vitrine" (font, color tokens, the always-dark stage sections, the toggle) are specific and well executed as engineering. What's missing is that the one element meant to *be* the concept, the gold frame and light around each image, is too subtle to register at rest and only appears on hover, so the metaphor lives in DESIGN.md more than on the screen. The single biggest opportunity: make the frame and light a persistent, visible-without-interaction feature on the hero and at least the first project card, so the "jewelry under gallery light" idea reads in the first five seconds instead of requiring a mouse to discover.

## What's Working

1. **The always-dark stage sections (Hero, Projects, Footer) work as a real design device.** They stay dark regardless of the toggle, giving visitors a consistent "you're in the gallery" anchor, this is the one place the Vitrine concept survives contact with the finished page.
2. **The light/dark toggle is technically well executed.** No flash on load, correct `aria-pressed` plus descriptive `aria-label`, state persists across visits, and the pre-hydration icon fallback avoids a mismatched-icon flash.
3. **Restraint in navigation and choice count.** Two nav items, one primary CTA per section, and a phone number always available as a low-friction alternative to the form, appropriate for a small, real, owner-operated company that shouldn't over-promise complexity it doesn't have.

## Priority Issues

**[P1] The "Vitrine" concept is imperceptible in practice.**
Why it matters: DESIGN.md's entire creative rationale rests on gold-framed, lit "jewelry in a case" imagery, but the frame is a 1px/35%-opacity line and the glow only appears on hover, invisible on the hero image (nothing to hover meaningfully) and barely visible even on direct card hover. The mechanical detector independently shape-matches this exact treatment to its generic "spotlight glow + thin border" anti-pattern signature, corroborating that it currently reads as boilerplate rather than as the brand's signature device.
Fix: increase frame opacity/width and add a persistent, at-rest-visible (not hover-only) glow on the hero and at least the first project card, so the effect reads without requiring interaction.
Suggested command: `/impeccable polish`

**[P1] The dark-mode section rhythm collapses into one flat tone.**
Why it matters: DESIGN.md's own "Raumfolge" rule requires alternating dark/light sections so the Vitrine reads as a sequence of distinct rooms. Since dark is now the whole-site default, the "Foyer" sections (About, Contact CTA) are also dark, and their token values (`grund` #1a1410, `flaeche` #211a15, `flaeche-dunkel` #15100d) sit within roughly a 10% brightness band of each other. Hero → About → Projects → Contact CTA → Footer becomes one continuous dark wash with no perceptible room change, which is the opposite of what the named rule promises.
Fix: give the non-vitrine "Foyer" sections a distinctly different dark value in dark mode, or explicitly compensate with a stronger frame/light treatment (see issue above) so the room change is felt even without a color-value jump.
Suggested command: `/impeccable clarify`

**[P2] Project-card copy is template-generic, undermining the "authored" brand.**
Why it matters: three of four homepage project descriptions follow the exact pattern "[Neubau/Sanierung]projekt der Apple Property Group AG in [Ort]." with zero differentiating detail, the kind of copy the brand's own "nichts erfinden" rule was meant to prevent from feeling generic, not to enforce. A visitor comparing two projects gets nothing to decide on.
Fix: describe what's real and already on file (unit type, setting, a notable confirmed feature), the way the Güttingen card already does with its "Solaranlagen" mention; the other three cards currently have no equivalent detail.
Suggested command: `/impeccable clarify`

**[P2] Heading hyphenation leaves an orphaned single character at tablet/narrow-laptop widths.**
Why it matters: around 700 to 1000px viewport width, a real and common size (split-screen laptop use, tablets in landscape), "Ganzheitliche Immobilienkompetenz" breaks into "Ganzheitliche Immobilienkompeten" / "z", a stray letter alone on its own line, the opposite of the engraved, considered feel Cormorant is meant to deliver, and it recurs anywhere this heading pattern is reused.
Fix: add `text-wrap: balance` (Tailwind 4's `text-balance`) to headline elements, or tighten the max-width at that breakpoint so hyphenation can't produce a single-character final line.
Suggested command: `/impeccable typeset`

**[P3] The primary CTA button reads as flat utility brown, not a luxury accent.**
Why it matters: "Anfrage senden" and "Immobilien erkunden" use the fixed Signet-Braun fill, correct per the component spec, but visually it's a muted terracotta disconnected from the gold/blattgold language carrying the rest of the Vitrine system, so the highest-intent action on the page is visually the least premium element on it.
Fix: consider a thin gold inner border or gold-on-dark treatment for the primary CTA specifically within dark vitrine sections, tying the conversion moment back to the jewelry-case visual language.
Suggested command: `/impeccable colorize`

## Persona Red Flags

**Jordan (Confused First-Timer):** Browsing the four project cards, Jordan gets no differentiating information beyond location and Neubau/Sanierung, the Kreuzlingen, Kradolf-Schönenberg and Ermatingen card bodies are nearly interchangeable. Jordan can't form a preference without clicking into all four individually, exactly the extra-step friction that causes a first-timer to abandon. The moon/sun theme toggle also has no visible label or tooltip; Jordan may not realize it changes appearance at all (a screen-reader user is covered by the `aria-label`, but a sighted first-timer is not).

**Riley (Deliberate Stress Tester):** The "Trennungs-Regel" DESIGN.md calls load-bearing for headlines fails on its own hardest case: at roughly 700 to 1000px width, "Immobilienkompetenz" leaves a widowed "z" alone on its own line, exactly the long-compound-word scenario the rule exists for. Riley would also flag that the vitrine hover-glow doesn't reliably show up in a captured or inspected state, making it hard to verify the effect exists at all outside live mouse movement.

**Casey (Distracted Mobile User):** On mobile, the primary hero CTA ("Immobilien erkunden") sits right at the bottom edge of the first viewport, only partly visible, so a quick scroller sees headline, subtext and the full hero image before any action button is fully on-screen, one extra scroll before the first reachable action. On the positive side, the stacked contact CTA and phone-number fallback near the page bottom are properly thumb-zone-friendly and meet touch-target size.

## Minor Observations

- The hero's fade-in reveal (`data-einblenden`) is used consistently and doesn't fight reduced-motion preferences by convention, though this wasn't independently verified in reduced-motion emulation this run.
- The footer's dark-only treatment is one of the more successful "constant stage" applications and reads coherently with the small repeated header logo at its top.
- The gold "Kategorie" label (Neubau/Sanierung) on project cards is a nice detail tying into the `vitrine-plakette` language even where the main frame/light doesn't read strongly.
- `overused-font` (Inter 83%), `kicker-above-heading` (×2) and `image-hover-transform` (×4) from the browser detector all trace to single, documented, consistently-reused design-system patterns (two-font system, shared `AbschnittKopf` kicker, shared card hover-scale) and read as false positives rather than new issues.

## Questions to Consider

- If the signature visual device (gold frame + light) is only visible on hover and barely visible even then, is "Die Vitrine" actually a page-level design system, or a paragraph in DESIGN.md that never made it onto the screen?
- Dark mode is now the default for essentially all visitors, so why does the section-alternation rule that makes the room metaphor legible currently only work in light mode, the mode fewer people will see first?
- If nothing can be invented (no testimonials, no numbers, no differentiated project copy), what real, confirmable detail could replace "Neubauprojekt der Apple Property Group AG in Ermatingen" that would still be true and would actually help someone choose between four projects?
