# Lumina Companion — Website

Static marketing site for [www.luminacompanion.ca](https://www.luminacompanion.ca).  
Hosted on **GitHub Pages**. Copy source of truth: `lumina_website_v3.md`.  
Implementation checklist: `Implementation_Plan.md`.

## Stack

- Multi-page static HTML (no SPA)
- **Tailwind CSS** compiled locally → committed `css/styles.css`
- **Formspree** for forms (no app database)
- Responsive required from day one (mobile-first; phone + tablet + desktop)

Visitors and GitHub Pages never run Node. There is **no** GitHub Actions CSS build.

## Local Tailwind rebuild

After changing HTML classes or `src/input.css`:

```bash
npm install
npm run build:css
```

That regenerates `css/styles.css`. Commit the updated CSS with your HTML changes.

## Deploy

```bash
git push
```

GitHub Pages serves the committed files. Keep `CNAME` as `www.luminacompanion.ca`.

## Forms (Formspree)

1. Create form(s) at [formspree.io](https://formspree.io) for luminacompanion.ca.
2. Set the Formspree notification recipient in the dashboard (not in HTML).
3. Paste the public endpoint into `js/config.js` → `FORMSPREE_ENDPOINT` (replace `PLACEHOLDER`).

Wiring live submits is a later task; the endpoint may stay a placeholder until then.

## Email policy

| Surface | Address |
|---|---|
| Visible on the site (footer, mailto, Privacy) | `info@ivyfeeder.com` only |
| Formspree notification inbox | configured in Formspree dashboard only |

Do **not** publish personal phone, home address, or personal Gmail in site files.

## Responsive requirement

Every page includes a viewport meta tag. Layout must work at ~375px (phone), ~768px (tablet), and ≥1200px (desktop) — no horizontal page scroll; tap targets ≥48px when interactive UI lands.

## Project layout

See `Implementation_Plan.md` → Recommended site structure. Assets guidance: `assets/README.md`.
