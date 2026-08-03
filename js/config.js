/**
 * Site config (editable without touching page markup).
 * Formspree: create form(s) in the dashboard, set the notification recipient
 * there (dashboard only — never in HTML), then paste the public endpoint URL
 * below. One endpoint + form_type/_subject per form is the default; separate
 * endpoints are optional.
 * Public contact on pages: CONTACT_EMAIL only (never a personal address).
 */
window.LuminaConfig = {
  WAITLIST_COUNT: 24,
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xeeyynqn",
  CONTACT_EMAIL: "info@ivyfeeder.com",
};
