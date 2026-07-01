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
  `+34 638 80 89 68` (mobile) plus `+34 828 04 60 16` (landline) are the
  real numbers, updated across `index.html`, `legal.html`, `privacidad.html`,
  and `cookies.html`.
- **Address / email**: done — `Avenida Manuel Velázquez Cabrera, 110,
  Puerto del Rosario, Fuerteventura` and `nairoby_armas@yahoo.com` are the
  real values, updated in the footer (all four pages) and in `legal.html` /
  `privacidad.html`.
- **Fiscal identity**: `legal.html` and `privacidad.html` still have
  bracketed placeholders (`[RAZÓN SOCIAL / NOMBRE COMPLETO DEL TITULAR]`,
  `[NIF/CIF]`) — these need the business's real legal name and tax ID
  before launch (required for LSSI-CE/RGPD compliance). Address and email
  in those same two files are already filled in with real values (see
  above), so only these two fields remain.
- **Instagram link**: done — `https://www.instagram.com/nairoarmas/` is the
  real profile, updated across `index.html`, `legal.html`, `privacidad.html`,
  and `cookies.html`.
- **Hero image**: done — `assets/images/hero_medic.png` is a real editorial
  photo (Head Spa basin, warm/dark tones), used as the `.hero-texture`
  background with a left-to-right dark gradient overlay so the light
  (`--color-ivory`) hero text stays legible. This flipped the hero from a
  light section to a dark one — see "Hero is a dark section" below before
  editing hero styles or copy colors.
- **Head Spa section image**: done — `assets/images/hero_medic_01.png` (a
  companion shot to the hero photo) is the `.head-spa-visual`
  `background-image`, `background-size: cover` with `background-position:
  38% 55%` chosen to keep the shower head, face, and hands inside the
  cropped 4:5 portrait frame. If you swap this photo, re-check that
  position — a different composition will likely need different crop
  coordinates.
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
`#testimonios`, `#reserva`, `#contacto`, plus the footer. If you add a new
section, follow this pattern: `eyebrow` → `section-title` → content,
wrapped in `.container` (and `.narrow` for text-only sections), with a
`.reveal` class on elements that should fade in on scroll.

**`#contacto`** is a two-column `.contacto-columns` layout: the
`mailto:`-based contact form (see "JS behavior" below) on the left,
location (address + Google Maps link + embedded map iframe) on the
right, stacking to one column under 860px. There's no separate email
card — the form covers that need. The map is a no-API-key
`https://www.google.com/maps?q=...&output=embed` iframe with a
`filter: grayscale(55%)` CSS treatment so its default saturated colors
don't clash with the muted palette; if you swap the address, update the
`q=` query param (and the footer/legal pages' Google Maps search link)
to match.

**Nav only links a subset of sections** (`#rituales`, `#head-spa`,
`#testimonios`, plus the `#reserva` CTA) — `#manifiesto` and
`#experiencia` are intentionally left out of `#primary-nav` to keep the
nav to 3-4 items (research-backed: more nav items dilute attention on
luxury sites). Don't restore a full 1:1 nav-to-section mapping; a section
not being in the nav doesn't mean it should be removed from the page.

## JS behavior (`js/main.js`)

Four independent, dependency-free behaviors, shared across all four HTML
pages (`index.html` and the three legal pages):
1. **Mobile nav toggle** — `#nav-toggle` button toggles `.is-open` on
   `#primary-nav` and updates `aria-expanded`/`aria-label`; clicking any
   nav link closes it. (Only present on `index.html`.) `.nav-toggle` has
   `z-index: 20` and the open `.primary-nav` has `z-index: 10` (both inside
   `.site-header`'s own stacking context) so the toggle button always stays
   clickable above the open drawer — without this, the drawer (a
   `position: fixed` element) paints over the `position: static` toggle
   button and the menu becomes impossible to close. If you restyle either
   element, keep the toggle's z-index higher than the drawer's.
2. **Scroll reveal** — every element with `.reveal` fades/slides in once
   via `IntersectionObserver`, falling back to immediately-visible if
   `IntersectionObserver` is unsupported.
3. **Cookie consent banner** — `#cookie-banner` (present on all four pages,
   markup right after `</footer>`) is hidden by default and slides up
   after ~600ms if `localStorage["nairoby_cookie_consent"]` isn't set yet.
   `#cookie-accept`/`#cookie-reject` store `"accepted"`/`"rejected"` and
   hide it; the footer's `#cookie-manage` link reopens it at any time. The
   choice is stored client-side only (`localStorage`), never sent
   anywhere. If you ever add analytics/marketing scripts, gate them behind
   `localStorage.getItem("nairoby_cookie_consent") === "accepted"` rather
   than loading them unconditionally.
4. **Contact form** — `#contact-form` (in `#contacto`, `index.html` only)
   has no backend: on submit, JS builds a `mailto:nairoby_armas@yahoo.com`
   link from the name/email/message fields and navigates to it, so the
   visitor's own mail client sends it. There's no server-side validation or
   storage — don't add a fetch/API call here without first setting up a
   real backend or form service.

Don't introduce a frontend framework or bundler for incremental features —
this site is intentionally dependency-free given its size.

## The hero is a dark section (photo background)

Unlike the rest of the page (light ivory/marfil backgrounds, dark carbon
text), `#hero` renders a photo (`hero_medic.png`) through `.hero-texture`
with a dark gradient scrim, so its text is light-on-dark by design:
`.hero-title`, `.hero-claim`, `.hero-text` are hard-coded to light colors
(not inherited from the global dark `--color-text`), and `.hero
.link-underline` / `.hero .btn-primary` have their own overrides (inverted
button: ivory background, carbon text) so they stay visible against the
photo. `.eyebrow` and `.hero-trust` already use `--color-brass`, which
reads fine on both light and dark backgrounds (same as the footer), so
they don't need an override. If you add new text or controls inside
`#hero`, give them an explicit light color / `.hero`-scoped override
rather than relying on the global (dark-on-light) defaults.

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

**Cache-busting**: `css/style.css` and `js/main.js` are referenced with a
`?v=1` query string in all four HTML files (e.g.
`<link rel="stylesheet" href="css/style.css?v=1" />`). GitHub Pages/CDNs
and browsers cache these static assets aggressively by URL, so pushing a
CSS/JS change alone can leave visitors seeing a stale stylesheet even
after a successful deploy. **Whenever you edit `css/style.css` or
`js/main.js`, bump `?v=1` to `?v=2` (etc.) in all four HTML files** so the
new deploy gets a fresh URL and isn't served from cache. `index.html`,
`legal.html`, `privacidad.html`, and `cookies.html` themselves don't need
this — HTML documents aren't cached the same way and always reflect the
latest deploy.

## Git workflow

Standard branch + commit + push; no other release process or CI is
configured in this repo.
