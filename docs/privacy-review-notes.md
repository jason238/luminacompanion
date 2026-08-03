# Privacy review notes — voice / OpenAI (Task 3.3)

Short internal check: Privacy page §1 (and §3 third-party AI wording) vs current
OpenAI Whisper (speech-to-text) and TTS (text-to-speech) data handling.
Not a legal review.

**Reviewed:** 2026-08-03  
**Public copy source:** `lumina_website_v3.md` → Privacy §1 / §3; live page `privacy/index.html`  
**Provider docs:** [OpenAI — Data controls in the API platform](https://developers.openai.com/api/docs/guides/your-data)

## What Lumina uses (per v3 appendix)

- OpenAI Whisper — speech → text (`/v1/audio/transcriptions` family)
- OpenAI TTS — text → speech (`/v1/audio/speech`)

## What the site says (kept as-is)

Privacy §1 Conversations (softened on purpose in v3):

- Lumina does **not intentionally retain** voice recordings after processing
- Stored product data is the **text**, not the audio
- Some processing steps may **briefly handle audio** (standard for voice services)

Privacy §3: voice/NLP may pass through vetted third-party cloud AI providers.

## Provider snapshot (as of review date)

| Endpoint (typical use) | Training on API data | Abuse-monitoring retention | Application state |
|---|---|---|---|
| `/v1/audio/transcriptions` (Whisper) | No (default API) | None (per OpenAI table) | None |
| `/v1/audio/speech` (TTS) | No (default API) | Up to **30 days** (default) | None |

Zero Data Retention (ZDR) / Modified Abuse Monitoring exist for eligible orgs and
can tighten retention further; they require OpenAI approval / org configuration.

## Drift assessment

**No public copy change required for launch.**

- Softened §1 still matches: Lumina does not promise “zero audio anywhere”; it
  correctly says we don’t intentionally keep recordings and that processing may
  briefly handle audio via third parties.
- Naming Whisper/TTS on the public Privacy page is **not** required by v3; the
  generic “vetted third-party cloud AI” line is enough for MVP.
- **Watch item before/during pilot onboarding:** re-check OpenAI’s data-controls
  table if the voice stack or plan changes. If default TTS abuse-monitoring
  retention becomes a concern for pilot families, consider ZDR eligibility and/or
  a one-line Privacy tweak that audio may be processed by a cloud provider under
  that provider’s retention rules (still no need to promise zero retention).

## Contact / compliance (same task)

- Visible site contact: `info@ivyfeeder.com` only (HTML / mailto / `CONTACT_EMAIL`)
- Formspree notification inbox: Formspree dashboard only (not published in site HTML/JS)
- Formspree disclosed on Privacy page (form processor)
- Footer medical/wellness disclaimer present on all six pages

Revisit this note if the STT/TTS provider changes or OpenAI retention tables change.
