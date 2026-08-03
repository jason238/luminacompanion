/**
 * Shared Formspree helpers — POST via fetch, honeypot/_subject stay in markup.
 * Endpoint comes from js/config.js (FORMSPREE_ENDPOINT).
 */
(function () {
  var PLACEHOLDER_TOKEN = "PLACEHOLDER";
  var DEFAULT_ERROR =
    "Something went wrong sending your message. Please try again, or email info@ivyfeeder.com.";

  function contactEmail() {
    var config = window.LuminaConfig;
    if (config && config.CONTACT_EMAIL) {
      return String(config.CONTACT_EMAIL);
    }
    return "info@ivyfeeder.com";
  }

  function errorMessage() {
    return (
      "Something went wrong sending your message. Please try again, or email " +
      contactEmail() +
      "."
    );
  }

  function getEndpoint() {
    var config = window.LuminaConfig;
    if (!config || !config.FORMSPREE_ENDPOINT) return null;

    var url = String(config.FORMSPREE_ENDPOINT).trim();
    if (!url || url.indexOf(PLACEHOLDER_TOKEN) !== -1) return null;
    return url;
  }

  /**
   * POST form fields to Formspree. Resolves on success; rejects with Error
   * (code: not_configured | submit_failed | network).
   */
  function submit(form) {
    var endpoint = getEndpoint();
    if (!endpoint) {
      var missing = new Error("not_configured");
      missing.code = "not_configured";
      return Promise.reject(missing);
    }

    var body = new FormData(form);

    return fetch(endpoint, {
      method: "POST",
      body: body,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json().catch(function () {
            return {};
          });
        }

        return response
          .json()
          .catch(function () {
            return {};
          })
          .then(function (payload) {
            var failed = new Error("submit_failed");
            failed.code = "submit_failed";
            failed.status = response.status;
            failed.payload = payload;
            throw failed;
          });
      })
      .catch(function (err) {
        if (err && (err.code === "not_configured" || err.code === "submit_failed")) {
          throw err;
        }
        var network = new Error("network");
        network.code = "network";
        network.cause = err;
        throw network;
      });
  }

  /**
   * Disable/enable the submit control and set a busy label while posting.
   */
  function setSubmitting(form, isSubmitting) {
    var button = form.querySelector('button[type="submit"]');
    if (!button) return;

    if (isSubmitting) {
      if (!button.dataset.labelDefault) {
        button.dataset.labelDefault = button.textContent;
      }
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = "Sending…";
    } else {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      if (button.dataset.labelDefault) {
        button.textContent = button.dataset.labelDefault;
      }
    }
  }

  window.LuminaForms = {
    getEndpoint: getEndpoint,
    submit: submit,
    setSubmitting: setSubmitting,
    errorMessage: errorMessage,
    DEFAULT_ERROR: DEFAULT_ERROR,
  };
})();
