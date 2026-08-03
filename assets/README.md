# Website assets

Drop final files into the folders below. Pages wire these paths in Phase 1–2 tasks.  
Copy source: `lumina_website_v3.md`. Compress large Pilot/OG PNGs in Task **2.3**.

**Rules:** real Pilot photos and redacted Hub/App shots only — no scaffold/dev UI screenshots on the marketing site.

---

## Inventory

| Status | Path | Notes |
|---|---|---|
| **Present** | `images/pilot/grandma-tuen.png` | Real Pilot photo |
| **Present** | `images/pilot/grandma-xie.png` | Real Pilot photo |
| **Present** | `images/pilot/michael.png` | Real Pilot photo |
| **Present** | `images/og/og-default.png` | Share/OG default (copy of Michael) |
| **Present** | `screenshots/hub-home-redacted.png` | Product → Lumina Hub |
| **Present** | `screenshots/app-home-redacted.png` | Product → Family App; optional Pilot hero |
| **Present** | `images/product/colmi-ring.png` | Product → Lumina Wearable |
| **Present** | `images/product/health-scale.png` | Product → Health Scale |
| **Present** | `images/diagrams/vision-ecosystem.png` | About + Product vision |
| **Present** | `icons/step-*.svg` | Home How-it-works icons (Lucide, ISC) |

---

## Home “Real families” — filename → caption

Use all three Pilot photos. Captions are first names only (from v3). Display order on Home:

| Order | File | Caption |
|---|---|---|
| 1 | `assets/images/pilot/michael.png` | Michael, 67 — a quiet afternoon with Lumina. |
| 2 | `assets/images/pilot/grandma-xie.png` | Grandma Xie, 87 — video calling her grandkids. |
| 3 | `assets/images/pilot/grandma-tuen.png` | Grandma Tuen, 75 — reading a memory Lumina helped create. |

**Framing line above the photos:**

> These are real Ottawa families in our pilot program — not actors, not stock photos.

**Layout note:** 1 column on phone → 3 columns on desktop.

**Home hero:** `michael.png` (face + Hub framing via CSS `object-position`).

---

## Pilot photos — `images/pilot/`

```
assets/images/pilot/
  grandma-tuen.png
  grandma-xie.png
  michael.png
```

---

## Open Graph — `images/og/`

```
assets/images/og/
  og-default.png        # present (Michael); used in Task 2.1 meta tags
```

---

## Screenshots — `screenshots/`

| File | Used for (v3) |
|---|---|
| `hub-home-redacted.png` | Product → Lumina Hub |
| `app-home-redacted.png` | Product → Family App; optional Pilot hero |

---

## Product photos — `images/product/`

| File | Used for (v3) |
|---|---|
| `colmi-ring.png` | Product → Lumina Wearable |
| `health-scale.png` | Product → Health Scale |

---

## Diagrams — `images/diagrams/`

| File | Used for (v3) |
|---|---|
| `vision-ecosystem.png` | About + Product vision; Core vs Roadmap must stay visually distinct |

---

## Icons — `icons/`

How-it-works step icons from [Lucide](https://lucide.dev) (ISC license):

| File | Lucide name | Home step |
|---|---|---|
| `step-tap-to-talk.svg` | `tablet-smartphone` | Tap to talk |
| `step-keeps-track.svg` | `activity` | Lumina quietly keeps track |
| `step-family-close.svg` | `heart-handshake` | Family stays close |
