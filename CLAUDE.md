# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this is

NAIROBY is a one-page marketing site for a premium "Head Spa & Hair Atelier"
brand. It's a static HTML/CSS/JS site — no build step, no framework, no
package manager. The main site is `index.html` + `css/style.css` +
`js/main.js`, plus three standalone legal pages (`legal.html`,
`privacidad.html`, `cookies.html`) linked from the footer.

The site exists to sell a *feeling* ("Ultra Quiet Luxury": calm, exclusive,
editorial) rather than to be a conventional salon website. That brief
(`/root/.claude/uploads/.../prompt_web_nairoby_claude.md`, also summarized
below) drives every content and design decision — read it before changing
copy, colors, or tone.

## Stack & structure

```
index.html          Main landing page, all sections, semantic HTML5
legal.html           Aviso legal (LSSI-CE) — standalone page, own header/footer
privacidad.html      Política de privacidad (RGPD) — standalone page
cookies.html         Política de cookies — standalone page
css/style.css        Entire design system: CSS custom properties, layout, responsive rules
js/main.js           Mobile nav toggle + IntersectionObserver scroll-reveal (vanilla JS, no deps)
assets/images/       Placeholder dir for real photography (currently empty — see below)
```

The three legal pages share `css/style.css` and `js/main.js` with the main
page but use a simplified header (brand mark + "Volver al inicio" link,
no `#primary-nav`/`#nav-toggle` — there's nothing to scroll to on these
pages) and a `.legal-main`/`.legal-content` content style for long-form
text. They contain bracketed placeholders (`[RAZÓN SOCIAL]`, `[NIF/CIF]`,
`[DIRECCIÓN FISCAL COMPLETA]`, `[EMAIL DE CONTACTO]`) that must be filled
in with the real business's fiscal identity before launch — see "Known
placeholders" below.

No `package.json`, no bundler, no CSS preprocessor. Open `index.html`
directly or serve the directory with any static file server:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

There is no test suite, linter, or CI configured. Verify changes visually
(see "Verifying changes" below).

## Design system (do not improvise new values — reuse these)

All design tokens live as CSS custom properties at the top of
`css/style.css` under `:root`.

**Palette** (the brief explicitly bans bright gold, glossy black, saturated
colors, gradients, drop shadows, and "salon" iconography):
- `--color-ivory` `#faf7f2`, `--color-marfil` `#f3eee4`, `--color-arena`
  `#e8dcc8`, `--color-beige-piedra` `#d9cbb5`, `--color-taupe` `#b8a890`,
  `--color-carbon` `#2b2826`, `--color-brass` `#a38f6d`

**Type**: `--font-serif` (Cormorant Garamond, loaded from Google Fonts) for
headings/quotes; `--font-sans` (Jost) for body and UI text. Eyebrow labels
and nav links use uppercase + wide letter-spacing (`0.14em`–`0.28em`) —
this is a recurring motif, keep it consistent on any new label-style text.

**Spacing**: use the `--space-1`…`--space-7` scale instead of one-off
`px`/`rem` values. Section vertical rhythm uses `--space-7` (9rem) padding.

**Motion**: transitions use `--ease-quiet`
(`cubic-bezier(0.22, 0.61, 0.36, 1)`) and are slow (0.4s–0.9s). The brief
explicitly calls for "animaciones suaves y lentas" — don't add snappy/fast
transitions, aggressive carousels, or commercial-style banners.

**Components**: `.btn-primary` (solid carbon, pill) is the **only** solid
button style, reserved for the one dominant conversion action per section
(booking). Secondary/lower-priority actions ("Ver rituales", "Solicitar
diagnóstico") use `.link-underline` — a plain text link with an animated
underline reveal on hover — never a second button style. This is a
deliberate neuromarketing choice (single clear CTA per section, reduced
decision friction); don't reintroduce an outlined/ghost button variant.
Reuse `.eyebrow`, `.section-title`, `.ritual-item`/`.ritual-content`,
`.step`, `.testimonial` classes for new content blocks rather than
inventing new ones.

**Ritual/service list markup**: each `.ritual-item` is a 2-column CSS Grid
(`3rem 1fr`: index number, content) — the index (`.ritual-index`) and the
title+text must be its **only two** flow children. If you add more direct
children (e.g. an icon or a tag), grid auto-placement will wrap the extra
element onto a new implicit row split across both columns instead of
flowing it into the content column — wrap title+text (and anything else)
inside the single `.ritual-content` div rather than adding more direct
`<li>` children.

## Copy & tone conventions

- All copy is in **Spanish**, written in first person plural ("creamos",
  "cuidamos"), sensory and unhurried.
- Never use commercial/urgency language: no "oferta", "descuento",
  "promoción", "el mejor precio", "ven ya". Use premium-register words
  instead: *ritual, diagnóstico, experiencia, calma, bienestar*.
- The brand name **NAIROBY** is always the visual lead; "peluquería" only
  appears low-key for SEO (see footer bottom line), never as a heading.
- CTAs are soft and specific: "Reservar experiencia", "Ver rituales",
  "Solicitar diagnóstico", "Reservar por WhatsApp" — not "Comprar" /
  "Contactar ahora".
- Testimonials are short, editorial-style quotes with no star ratings or
  review-site styling (`#testimonios`).

## Known placeholders to replace before launch

These were intentionally stubbed in and must be swapped for real values:

- **WhatsApp number / phone**: done — `https://wa.me/34638808968` and
  `+34 638 80 89 68` are the real numbers, updated across `index.html`,
  `legal.html`, `privacidad.html`, and `cookies.html`.
- **Address**: footer and legal pages still show generic "Fuerteventura,
  Islas Canarias" and bracketed placeholders (`[RAZÓN SOCIAL]`, `[NIF/CIF]`,
  `[DIRECCIÓN FISCAL COMPLETA]`, `[EMAIL DE CONTACTO]`) in `legal.html` and
  `privacidad.html` — these need the real legal/fiscal identity of the
  business before launch (required for LSSI-CE/RGPD compliance).
- **Instagram link**: footer points to `https://instagram.com/` — replace
  with the real profile URL.
- **Images**: `assets/images/` is empty (only a `.gitkeep`). The hero and
  Head Spa sections currently use soft CSS gradients as stand-ins
  (`.hero-texture`, `.head-spa-visual`). The brief calls for "imágenes
  grandes, suaves, con estética editorial" — when real photography is
  available, swap these gradient blocks for `<img>`/`background-image`
  and keep the soft, uncluttered framing (no harsh crops, no stock-photo
  salon imagery).
- **Legal pages**: footer "Aviso legal" / "Política de privacidad" links
  are `#` placeholders.
- **Hero trust line**: `.hero-trust` ("Formación continua en las técnicas
  de bienestar capilar y color más exigentes de Europa") is a generic,
  intentionally non-specific authority/credibility line added for
  neuromarketing purposes (soft authority cue). Confirm it's accurate for
  the real business before launch, or replace with a real, specific
  credential/training claim — don't leave a vague claim standing in for
  a verifiable one.

## Section map (`index.html`)

In document order, each section is a `<section>` with a matching `id`:
`#hero`, `#manifiesto`, `#rituales`, `#experiencia`, `#head-spa`,
`#testimonios`, `#reserva`, plus the footer. If you add a new section,
follow this pattern: `eyebrow` → `section-title` → content, wrapped in
`.container` (and `.narrow` for text-only sections), with a `.reveal`
class on elements that should fade in on scroll.

**Nav only links a subset of sections** (`#rituales`, `#head-spa`,
`#testimonios`, plus the `#reserva` CTA) — `#manifiesto` and
`#experiencia` are intentionally left out of `#primary-nav` to keep the
nav to 3-4 items (research-backed: more nav items dilute attention on
luxury sites). Don't restore a full 1:1 nav-to-section mapping; a section
not being in the nav doesn't mean it should be removed from the page.

## JS behavior (`js/main.js`)

Two independent, dependency-free behaviors:
1. **Mobile nav toggle** — `#nav-toggle` button toggles `.is-open` on
   `#primary-nav` and updates `aria-expanded`/`aria-label`; clicking any
   nav link closes it.
2. **Scroll reveal** — every element with `.reveal` fades/slides in once
   via `IntersectionObserver`, falling back to immediately-visible if
   `IntersectionObserver` is unsupported.

Don't introduce a frontend framework or bundler for incremental features —
this site is intentionally dependency-free given its size.

## A layout pitfall already hit once — avoid repeating it

`backdrop-filter` (and `filter`) on an ancestor element creates a CSS
containing block for `position: fixed` descendants. Earlier the header
(`.site-header`) had `backdrop-filter: blur(10px)` while the mobile nav
drawer (`.primary-nav`, also `position: fixed`) was nested inside it —
this silently shrank the fixed drawer down to the header's own height
instead of the full viewport. Fixed in this codebase by dropping the
blur and using a near-opaque solid header background instead. **If you
reintroduce `backdrop-filter`/`filter` on `.site-header` or any ancestor
of a fixed-position element, verify the descendant still spans the full
viewport** (test by opening the mobile nav, see "Verifying changes").

## Verifying changes

There's no automated test suite — verify visually:

```bash
python3 -m http.server 8000
```

Then check, at minimum:
- Desktop (~1440px) and mobile (~390px) widths
- Mobile nav open/close (`#nav-toggle`), including that the drawer covers
  the full viewport height and the dim scrim appears
- All anchor links scroll to the right section
- WhatsApp CTA href is well-formed (`https://wa.me/<digits>`)

If a headless browser is available (Playwright/Chromium), prefer scripting
a scroll-through before screenshotting full-page — the `.reveal` elements
only animate in once they've intersected the viewport, so a screenshot
taken immediately after page load will show blank/invisible sections that
haven't been scrolled past yet.

## Deployment

`.github/workflows/static.yml` deploys the repo root straight to GitHub
Pages (no build step — it just uploads the static files) on every push to
`claude/claude-md-docs-aptw0j`, or via manual `workflow_dispatch`. GitHub
Pages is already enabled for this repo (Settings → Pages → Build and
deployment → Source: GitHub Actions) — this is the workflow GitHub's own
Pages setup UI generated, so don't add a second parallel deploy workflow;
if you need to change the deploy behavior, edit this file in place.

## Git workflow

Standard branch + commit + push; no other release process or CI is
configured in this repo.
