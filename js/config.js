/**
 * Site config (editable without touching page markup).
 *
 * WAITLIST_COUNT — shown on About → Traction (“X people on our early-access
 * waitlist”). Bump this integer when you want the public number to change;
 * no Formspree API. Pilot “Limited spots” copy is static and ignores this.
 *
 * FORMSPREE_ENDPOINT — create form(s) in the dashboard, set the notification
 * recipient there (dashboard only — never in HTML), then paste the public
 * endpoint URL below. One endpoint + form_type/_subject per form is the
 * default; separate endpoints are optional.
 *
 * CONTACT_EMAIL — public contact on pages only (never a personal address).
 */
window.LuminaConfig = {
  WAITLIST_COUNT: 24,
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xeeyynqn",
  CONTACT_EMAIL: "info@ivyfeeder.com",
};
