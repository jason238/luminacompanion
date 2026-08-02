# Lumina Companion Website — Implementation Plan
# Source of truth for copy: `lumina_website_v3.md`
# Hosting: GitHub Pages · Domain: www.luminacompanion.ca (already live)

> **How to use this file**
>
> Work through tasks **IN ORDER**, one Cursor prompt at a time. Do **not** ask
> Cursor to do multiple tasks in one prompt.
>
> After each task, run the **Verify** step yourself before checking the box.
> Check off tasks as you complete them — this file is the single source of
> truth for “what’s actually done.”
>
> Suggested Cursor prompt for every task:
>
> ```
> Implement Task X.Y from Implementation_Plan.md.
> Follow lumina_website_v3.md for all copy and page structure.
> Do not implement anything beyond this task's scope.
> ```

---

## LOCKED DECISIONS (2026-08-02)

> Resolved with Jason before Phase 0. Do **not** re-open in task prompts unless
> Jason explicitly changes them.

### 1. Forms — Formspree → email only (no database)

| Item | Decision |
|---|---|
| Backend | **Formspree** (same approach as ivyfeeder.com) |
| Persistence | **No app database.** Submissions become emails Jason handles by email/phone. |
| Delivery inbox | **`jason.ottawa@gmail.com`** — configured in the Formspree dashboard only |
| On-page email | **`info@ivyfeeder.com`** — the only address shown in HTML / mailto / footer |
| Volume | Low; free Formspree tier is fine for pilot stage |
| Pattern | Mirror ivyfeeder: `action="https://formspree.io/f/{id}"`, honeypot `_gotcha`, `_subject` per form type |

**Why not Supabase Edge / custom DB:** no need to store leads yet; more moving parts; GitHub Pages stays fully static. Revisit only if volume or CRM needs appear later.

**ivyfeeder reference:** `_config.yml` → `formspree_contact_url`; `contact/index.html` POSTs to Formspree; privacy page discloses Formspree as processor.

**Setup (Jason, before Task 3.1):** create Formspree form(s) for luminacompanion.ca, set notification email to `jason.ottawa@gmail.com`, paste public endpoint URL(s) into `js/config.js`. One form with a hidden `form_type` field is OK; separate forms per page also OK.

### 2. Tailwind — commit compiled CSS (no GitHub Actions)

| Item | Decision |
|---|---|
| Approach | **Local Tailwind CLI → commit `css/styles.css`** |
| GitHub Pages | Serves static HTML/CSS/JS only — **no** Actions build required for deploy |
| Dev workflow | Edit source (HTML + optional `src/input.css`); run CLI when classes change; commit the built CSS |
| Avoid | Node/Actions pipeline on Pages; complex frameworks; SPA routers |

**Why:** simplest reliable path for a static marketing site. Pages already works with plain files. Actions can be added later if the team wants CI — not needed now.

**Assumption for Task 0.1:** use Tailwind standalone CLI or `npx tailwindcss` locally; keep a tiny `src/input.css` + `tailwind.config` if helpful; never require visitors or Pages to run Node.

### 3. Email policy

| Surface | Address |
|---|---|
| Visible on website (footer Contact, Privacy, mailto) | **`info@ivyfeeder.com`** |
| Formspree notification recipient (dashboard only) | **`jason.ottawa@gmail.com`** |
| Never publish | Personal phone, home address, `jason.ottawa@gmail.com` in page HTML |

Footer “Contact” may `mailto:info@ivyfeeder.com` and/or link to About/Privacy contact forms (which still email Jason via Formspree).

### 4. Pilot photos + default share image

| Item | Decision |
|---|---|
| Drop folder | **`assets/images/pilot/`** — Jason copies three PNGs here |
| Primary site use | Home → **“Real families”** (all three + captions from v3) |
| Also optional | Home hero and/or Pilot page hero (warmest of the three) |
| Default OG / share image | Copy the warmest Pilot photo to **`assets/images/og/og-default.png`** (Task 2.1) |
| Docs | See `assets/README.md` |

**Where Pilot photos are used (v3):**

1. **Home § Real families** — required social proof (three photos, first names only).
2. **Home hero** — pick one lifestyle shot (Michael + Hub or Grandma Xie video call — warmest, least “product demo”).
3. **Pilot page hero** — optional family photo (or App screenshot instead).
4. **Open Graph** — link preview when the URL is shared (not a page section; meta tag).

Other assets (Hub/App screenshots, ring, vision diagram) land in sibling folders under `assets/` as they become available — see `assets/README.md`.

### 5. Responsive — phone + tablet + desktop (required from day one)

| Item | Decision |
|---|---|
| Requirement | Site **must** work well on **phones and computers** (and tablets). Not desktop-only. |
| Approach | **Mobile-first** with Tailwind breakpoints (`sm` / `md` / `lg`). Fluid layout; images `max-w-full`; no horizontal page scroll. |
| Viewport | Every HTML page includes `<meta name="viewport" content="width=device-width, initial-scale=1">`. |
| When built | Responsive layout is part of **Phase 0 shell + every Phase 1 page** — not deferred until polish. |
| Task 2.2 role | **Hardening / QA pass** across all pages (edge cases, form usability on small screens, a11y) — not the first time mobile is considered. |

**Minimum check widths (every page task Verify):** ~375px (phone), ~768px (tablet), ≥1200px (desktop).

---

## PRODUCT CONSTRAINTS (read once — apply to every task)

| Constraint | Rule |
|---|---|
| Stack | Static site suitable for **GitHub Pages**. Tailwind CSS with **committed** `css/styles.css`. No SPA. |
| **Responsive** | **Mobile-first.** Usable on phone and desktop from the first page task. Viewport meta on every page. No horizontal scroll. Tap targets ≥48px. |
| Language (MVP) | English only — copy from `lumina_website_v3.md`. French = later phase. |
| Tone | Warm, plain-language, credible — **not** “revolutionary AI” hype. |
| Images | Only real Pilot photos + redacted Hub/App screenshots + product photos. **No** scaffold/dev screenshots. Missing assets → placeholders + paths in `assets/README.md`. |
| Public contact | **`info@ivyfeeder.com` only** in HTML. Never personal phone/address/gmail on pages. |
| Medical disclaimer | Footer medical/wellness disclaimer on **every** page (exact text in v3). |
| Forms | **Formspree** → Jason’s gmail via dashboard. No Calendly. No lead DB for MVP. |
| Waitlist counter | Editable config value in `js/config.js`. Pilot “Limited spots” copy is **static**. |
| Domain / CNAME | Keep existing `CNAME` (`www.luminacompanion.ca`). Do not break GitHub Pages deploy. |
| Scope discipline | One task = one reviewable unit. Adjacent polish goes in a later task — note it, don’t silently ship it. |

---

## CURRENT STATE (as of plan update)

- Repo: `https://github.com/jason238/luminacompanion.git`
- Spec: `lumina_website_v3.md` (English master)
- **Pilot photos present:** `assets/images/pilot/{grandma-tuen,grandma-xie,michael}.png`
- **OG image present:** `assets/images/og/og-default.png` (copy of Michael photo)
- Note: Pilot/OG PNGs are large (~2–2.7 MB each) — compress in Task **2.3** (do not block Phase 0–1)
- Tasks **0.1**, **0.2**, **0.3**, and **1.1** complete
- Next: Task **1.2** (Product) or **1.3** (Pilot) per suggested order

---

## RECOMMENDED SITE STRUCTURE

```
luminacompanion/
├── index.html                 # Home `/`
├── product/
│   └── index.html             # `/product`
├── pilot/
│   └── index.html             # `/pilot`
├── volunteer/
│   └── index.html             # `/volunteer`
├── about/
│   └── index.html             # `/about`
├── privacy/
│   └── index.html             # `/privacy`
├── assets/
│   ├── README.md              # what goes where + Pilot photo map
│   ├── images/
│   │   ├── pilot/             # ← drop 3 Pilot PNGs here
│   │   ├── og/                # og-default.png (share preview)
│   │   ├── product/           # ring, scale
│   │   └── diagrams/          # vision ecosystem
│   ├── screenshots/           # redacted Hub / App
│   └── icons/
├── css/
│   └── styles.css             # committed Tailwind output (Pages serves this)
├── src/                       # optional: input.css + tailwind config (dev only)
├── js/
│   ├── forms.js               # Formspree helpers (honeypot, success/error UI)
│   └── config.js              # WAITLIST_COUNT + Formspree endpoint URL(s)
├── CNAME                      # keep (www.luminacompanion.ca)
├── robots.txt
├── sitemap.xml
├── lumina_website_v3.md
└── Implementation_Plan.md
```

**Routing:** multi-page static HTML (one folder per route) so URLs match the spec without a client router. Shared nav/footer may be duplicated lightly across pages — prefer the simplest approach that deploys cleanly to Pages (no Jekyll required unless already desired).

---

## PHASE 0 — FOUNDATION (Tasks 0.1 – 0.3)

Goal: tooling, visual system, and shared chrome — no full marketing pages yet.

- [x] **0.1 — Project scaffold + committed Tailwind CSS**
  Replace the under-construction placeholder with a minimal but real shell.
  - Set up Tailwind so **`css/styles.css` is generated locally and committed** (standalone CLI or local `npx` — document the one command in README).
  - **Do not** add a GitHub Actions build for Pages deploy.
  - Every HTML template/page: **viewport meta** for mobile browsers.
  - Create/confirm folder tree above; keep `CNAME`.
  - Add `js/config.js` stub:
    - `WAITLIST_COUNT`
    - `FORMSPREE_ENDPOINT` (or per-form endpoints) — placeholder until Jason creates the Formspree form
    - Public contact constant: `info@ivyfeeder.com` only
  - Update root `index.html` to a temporary shell (nav + footer + one line) so the domain doesn’t look broken while pages land.
  - Short `README.md`: local Tailwind rebuild command, Pages deploy = git push, Formspree setup pointer, email policy, **responsive requirement**.
  **OUT OF SCOPE:** full Home sections; French; live Formspree submissions (endpoint may be placeholder).
  *Verify: push → `www.luminacompanion.ca` still loads; `CNAME` intact; page source has **no** `jason.ottawa@gmail.com`; viewport meta present; Tailwind classes from committed CSS work offline.*

- [x] **0.2 — Design tokens + shared layout (nav, footer, CTAs) — responsive shell**
  Establish the look once so every page task only fills content.
  - Colors, typography, spacing, button styles (primary / secondary CTAs from v3).
  - Shared **primary nav:** Home · Product · Pilot Program · Volunteer · About · Privacy.
  - **Mobile nav:** hamburger (or equivalent) that works on ~375px; desktop horizontal nav at `md`/`lg`. Tap targets ≥48px.
  - Shared **footer** (IvyFeeder line, © 2026, Privacy · Contact → `info@ivyfeeder.com` or About form, full medical disclaimer) — readable on narrow screens (disclaimer wraps, not clipped).
  - Reusable CTA classes for “Apply for the Pilot Program” and “Join as a Volunteer” (stack vertically on phone, side-by-side on larger screens when appropriate).
  - Marketing design: one composition per viewport, brand-first hero later; avoid generic purple-gradient AI look and card clutter.
  **OUT OF SCOPE:** page-specific sections; Formspree wiring.
  *Verify: stub page at ~375px and desktop — nav usable both ways; no horizontal scroll; disclaimer readable; public email is info@ivyfeeder.com only.*

- [x] **0.3 — Asset conventions + placeholders**
  - Confirm paths for existing files:
    - `assets/images/pilot/grandma-tuen.png`, `grandma-xie.png`, `michael.png`
    - `assets/images/og/og-default.png`
  - Placeholders for missing Hub/App/ring/diagram assets.
  - Document filename → Home “Real families” caption mapping for Task 1.1.
  **OUT OF SCOPE:** new photography; Photoshop redaction; full image compression (Task 2.3).
  *Verify: three Pilot + OG files referenced correctly; missing Hub/App/diagram list clear in `assets/README.md`.*

---

## PHASE 1 — CORE PAGES, CONTENT FIRST (Tasks 1.1 – 1.6)

Goal: ship all six English pages with correct copy and **responsive** layout. Forms may be UI-only until Phase 3.

> Work **one page per task**. Copy must match `lumina_website_v3.md`.
>
> **Responsive (every page task):** build mobile-first. At Verify, check ~375px and desktop — no horizontal scroll; forms and CTAs usable on a phone; images scale down.

- [x] **1.1 — Home (`/`)**
  Hero → Growing understanding → Problem → How it works → **Real families (3 Pilot photos)** → Pilot progress → Waitlist capture → Footer CTA row.
  - CTAs → `/pilot` and `/volunteer`.
  - Waitlist form UI (Formspree in 3.1).
  - Use Pilot PNGs: `grandma-tuen.png`, `grandma-xie.png`, `michael.png` (captions per v3).
  - Real families: 1 column on phone → 3 columns on desktop (or equivalent readable stack).
  **OUT OF SCOPE:** Formspree live submit; French; About traction counter; image compression.
  *Verify: section order matches v3; phone + desktop layouts OK; waitlist validates empty email.*

- [ ] **1.2 — Product (`/product`)**
  Care Loop → Hub → Wearable → Family App → “More than a chatbot” → Health Scale → Vision/roadmap (distinct) → Closing CTA.
  - Feature blocks stack on phone; image + text reflow (no side-by-side squeeze on narrow screens).
  **OUT OF SCOPE:** interactive demos; app stores.
  *Verify: Core vs Roadmap distinct; no delivery dates; CTA → `/pilot`; phone + desktop OK.*

- [ ] **1.3 — Pilot Program (`/pilot`)**
  Full Pilot page + application form UI (all v3 fields) + confirmation copy stub.
  - Form fields full-width and easy to tap on phone.
  **OUT OF SCOPE:** Formspree POST (3.1); Calendly.
  *Verify: Ottawa-only clear; all fields present; confirmation copy matches v3; form usable at ~375px.*

- [ ] **1.4 — Volunteer (`/volunteer`)**
  Full Volunteer page + application form UI.
  - Roles stack cleanly on phone.
  **OUT OF SCOPE:** Affiliate program page; Formspree POST.
  *Verify: both roles; form fields match v3; phone + desktop OK.*

- [ ] **1.5 — About (`/about`)**
  Full About page; traction waitlist count from `config.js`; founder copy; contact form UI.
  - Vision diagram scales on narrow screens (scroll or fit — no overflow).
  **OUT OF SCOPE:** pitch-deck PDF; live waitlist API.
  *Verify: count from config; forms present; public email policy; phone + desktop OK.*

- [ ] **1.6 — Privacy (`/privacy`)**
  Full Privacy page per v3; disclose Formspree as form processor (same spirit as ivyfeeder privacy); contact form UI.
  - Keep softened voice-data wording. Long text readable on phone (comfortable line length / padding).
  **OUT OF SCOPE:** legal counsel rewrite; cookie banner.
  *Verify: sections complete; footer Privacy links work site-wide; phone + desktop OK.*

---

## PHASE 2 — POLISH & DISCOVERABILITY (Tasks 2.1 – 2.3)

- [ ] **2.1 — SEO + social meta + sitemap**
  - Per-page title/description; OG/Twitter tags.
  - Default share image: `assets/images/og/og-default.png` (already present).
  - `robots.txt`, `sitemap.xml`, canonicals under `https://www.luminacompanion.ca/`.
  **OUT OF SCOPE:** analytics (optional 5.1).
  *Verify: unique titles; sitemap has 6 URLs; og:image resolves.*

- [ ] **2.2 — Accessibility + responsive hardening (QA across all pages)**
  Cross-page pass — pages should already be responsive from Phase 0–1; this task fixes leftovers.
  - Re-check **all six pages** at ~375px / ~768px / desktop.
  - Keyboard nav, focus states, contrast, form labels, tap targets.
  - Fix any horizontal scroll, overlapping CTAs, or clipped disclaimer/footer.
  **OUT OF SCOPE:** new sections or copy changes.
  *Verify: Home + Pilot + one form-heavy page (Pilot or About) pass phone + desktop; tab through nav + one form.*

- [ ] **2.3 — Image integration + compression pass**
  Final Hub/App/ring/diagram drop-in; **compress** Pilot/OG PNGs for web (target much smaller than ~2 MB each); lazy-load below fold.
  **OUT OF SCOPE:** new photoshoots.
  *Verify: Home Real families sharp enough on phone/retina but loads reasonably; no “placeholder” labels left in copy.*

---

## PHASE 3 — FORMSPREE WIRING (Tasks 3.1 – 3.3)

Goal: every form emails Jason; waitlist count editable; no personal gmail in HTML.

- [ ] **3.1 — Wire all forms to Formspree**
  Forms: Home waitlist · Pilot · Volunteer · About · Privacy.
  - Endpoints from `js/config.js`; honeypot; distinct `_subject` lines (e.g. `[Lumina] Pilot application`).
  - Success → v3 confirmation copy; failure → plain-language error.
  - Formspree dashboard must notify **`jason.ottawa@gmail.com`** (Jason configures).
  - Mention Formspree in Privacy if not already done in 1.6.
  **OUT OF SCOPE:** CRM; database; Calendly; autoresponder sequences.
  *Verify: test submit each form → email arrives at Jason’s gmail; page HTML still has no personal gmail; confirmation UI matches v3.*

- [ ] **3.2 — Waitlist count as editable config**
  About traction reads `WAITLIST_COUNT` from `js/config.js`; README documents how to bump the number.
  **OUT OF SCOPE:** live Formspree count API; Ottawa spot counter widget.
  *Verify: edit config → number updates; Pilot page still static “Limited spots”.*

- [ ] **3.3 — Contact + compliance sweep**
  - Visible contact = `info@ivyfeeder.com` only.
  - Grep: no personal phone, home address, or `jason.ottawa@gmail.com` in committed site files (dashboard-only is fine).
  - Privacy §1 vs OpenAI Whisper/TTS — short `docs/privacy-review-notes.md` if anything drifts.
  - Footer disclaimer on all pages.
  **OUT OF SCOPE:** full legal review.
  *Verify: grep clean; disclaimer present; Formspree disclosed.*

---

## PHASE 4 — FRENCH (Tasks 4.1 – 4.3) — AFTER ENGLISH IS STABLE

> Auto-translate English master, then **human-review** before publishing.

- [ ] **4.1 — i18n routing strategy** (`/fr/...` or subdomain) + EN/FR toggle
- [ ] **4.2 — French copy pass (human-reviewed)**
- [ ] **4.3 — French QA + deploy**

---

## PHASE 5 — OPTIONAL HARDENING (only if needed)

- [ ] **5.1 — Analytics (privacy-aware)** — document in Privacy if added
- [ ] **5.2 — ~~GitHub Action for Tailwind~~** — **not planned**; keep committed CSS unless Jason later requests CI
- [ ] **5.3 — 404 page** branded → Home / Pilot
- [ ] **5.4 — Performance pass** — compress images; font subset

---

## SUGGESTED CURSOR ORDER (MINIMUM PATH)

1. **0.1 → 0.2 → 0.3** (Jason can drop Pilot PNGs anytime into `assets/images/pilot/`)
2. **1.1 Home** → **1.3 Pilot**
3. **1.2 Product** → **1.6 Privacy** → **1.5 About** → **1.4 Volunteer**
4. **2.1 → 2.2**
5. **3.1 → 3.2 → 3.3** (after Formspree form exists + notifies Jason’s gmail)
6. **2.3** when remaining images arrive
7. **Phase 4** after English + forms are stable

---

## TASK SIZE GUIDE

| If a task feels… | Do this |
|---|---|
| Larger than ~4 files / hard to review | Split and update this plan first |
| Blocked on a missing photo | Placeholder per 0.3; continue; finish in 2.3 |
| Tempting to “also fix” another page | Note it — don’t expand scope |

---

## HOW TO USE THIS PLAN DAY-TO-DAY

1. Tell Cursor the single task number (e.g. Task 0.1).
2. Point it at `lumina_website_v3.md` + this file (locked decisions apply).
3. Run Verify yourself; check the box.
4. If the plan is wrong, **edit this plan first**.
5. Resist batching multiple tasks into one prompt.

---

*Lumina Companion Website Implementation Plan · Companion to `lumina_website_v3.md`*
*Static · Tailwind (committed CSS) · Formspree · GitHub Pages · IvyFeeder Inc. · 2026*
