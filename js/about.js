/**
 * About page — waitlist count from config + contact form Formspree submit.
 */
(function () {
  function initWaitlistCount() {
    var countEl = document.querySelector("[data-waitlist-count]");
    if (!countEl) return;

    var config = window.LuminaConfig;
    if (!config || typeof config.WAITLIST_COUNT === "undefined") return;

    var count = Number(config.WAITLIST_COUNT);
    if (!Number.isFinite(count)) return;

    countEl.textContent = String(count);
  }

  function initAboutForm() {
    var form = document.querySelector("[data-about-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-about-error]");
    var successEl = document.querySelector("[data-about-success]");
    var microEl = document.querySelector("[data-about-micro]");
    if (!errorEl) return;

    var fields = form.querySelectorAll("input, textarea");

    function showError(message, focusEl) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      if (successEl) successEl.hidden = true;
      if (focusEl) {
        focusEl.setAttribute("aria-invalid", "true");
        focusEl.focus();
      }
    }

    function clearError() {
      errorEl.hidden = true;
      errorEl.textContent = "";
      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });
    }

    fields.forEach(function (field) {
      field.addEventListener("input", clearError);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var name = form.querySelector("#about-name");
      var email = form.querySelector("#about-email");
      var note = form.querySelector("#about-note");

      if (!name || !(name.value || "").trim()) {
        showError("Please enter your name.", name);
        return;
      }

      if (!email || !(email.value || "").trim()) {
        showError("Please enter your email address.", email);
        return;
      }

      if (!email.checkValidity()) {
        showError("Please enter a valid email address.", email);
        return;
      }

      if (!note || !(note.value || "").trim()) {
        showError("Please write a short note about what you’d like to discuss.", note);
        return;
      }

      if (!window.LuminaForms) {
        showError("Something went wrong. Please try again later.");
        return;
      }

      window.LuminaForms.setSubmitting(form, true);

      window.LuminaForms
        .submit(form)
        .then(function () {
          form.hidden = true;
          if (microEl) microEl.hidden = true;
          if (successEl) {
            successEl.hidden = false;
            successEl.focus();
          }
        })
        .catch(function () {
          showError(window.LuminaForms.errorMessage());
        })
        .then(function () {
          window.LuminaForms.setSubmitting(form, false);
        });
    });
  }

  function init() {
    initWaitlistCount();
    initAboutForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
