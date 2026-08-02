# Website assets

Drop final files into the folders below. Pages wire these paths in Phase 1–2 tasks.  
Copy source: `lumina_website_v3.md`. Compress large Pilot/OG PNGs in Task **2.3**.

**Rules:** real Pilot photos and redacted Hub/App shots only — no scaffold/dev UI screenshots on the marketing site (SVG placeholders below are temporary stand-ins until finals arrive).

---

## Inventory

| Status | Path | Notes |
|---|---|---|
| **Present** | `images/pilot/grandma-tuen.png` | Real Pilot photo |
| **Present** | `images/pilot/grandma-xie.png` | Real Pilot photo |
| **Present** | `images/pilot/michael.png` | Real Pilot photo |
| **Present** | `images/og/og-default.png` | Share/OG default (copy of Michael) |
| **Placeholder** | `screenshots/hub-home-redacted.svg` | → replace with `hub-home-redacted.png` |
| **Placeholder** | `screenshots/app-home-redacted.svg` | → replace with `app-home-redacted.png` |
| **Placeholder** | `images/product/colmi-ring.svg` | → replace with `colmi-ring.png` |
| **Placeholder** | `images/product/health-scale.svg` | Optional → `health-scale.png` when available |
| **Placeholder** | `images/diagrams/vision-ecosystem.svg` | → replace with `vision-ecosystem.png` |
| Optional later | `icons/` | How-it-works step icons (SVG OK; not required for first ship) |

When a final PNG lands, put it beside (or instead of) the SVG using the **canonical `.png` name** in the table above, then point page `<img>` tags at the PNG.

---

## Home “Real families” — filename → caption (Task 1.1)

Use all three Pilot photos. Captions are first names only (from v3):

| File | Caption |
|---|---|
| `assets/images/pilot/grandma-tuen.png` | Grandma Tuen, 75 — reading a memory Lumina helped create. |
| `assets/images/pilot/grandma-xie.png` | Grandma Xie, 87 — video calling her grandkids. |
| `assets/images/pilot/michael.png` | Michael, 67 — a quiet afternoon with Lumina. |

**Framing line above the photos:**

> These are real Ottawa families in our pilot program — not actors, not stock photos.

**Layout note (Task 1.1):** 1 column on phone → 3 columns on desktop.

---

## Pilot photos — `images/pilot/`

**Where they appear (v3):**

| Use | Page / section | Notes |
|---|---|---|
| **Primary** | Home → “Real families” | All three + captions (table above) |
| Optional | Home hero | Warmest / least “product demo” of the three |
| Optional | Pilot Program hero | One family photo **or** App “All is well” screenshot |
| **Share / OG** | Site-wide Open Graph | `images/og/og-default.png` (Task 2.1) |

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

## Missing finals — Hub / App / ring / diagram

Canonical PNG names for later page tasks. SVG placeholders exist now so paths are reserved.

### Screenshots — `screenshots/`

| Canonical PNG (final) | Placeholder now | Used for (v3) |
|---|---|---|
| `hub-home-redacted.png` | `hub-home-redacted.svg` | Product → Lumina Hub |
| `app-home-redacted.png` | `app-home-redacted.svg` | Product → Family App; optional Pilot hero |

Redact personal names; a placeholder name such as “Grandma Chen” is OK on the App shot.

### Product photos — `images/product/`

| Canonical PNG (final) | Placeholder now | Used for (v3) |
|---|---|---|
| `colmi-ring.png` | `colmi-ring.svg` | Product → Lumina Wearable (plain background) |
| `health-scale.png` | `health-scale.svg` | Product → Health Scale (optional) |

### Diagrams — `images/diagrams/`

| Canonical PNG (final) | Placeholder now | Used for (v3) |
|---|---|---|
| `vision-ecosystem.png` | `vision-ecosystem.svg` | About + Product vision; Core vs Roadmap must stay visually distinct |

---

## Icons — `icons/`

How-it-works step icons (can be simple SVG later; not required for first ship).
