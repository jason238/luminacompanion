/**
 * Home waitlist form — validates email, then POSTs to Formspree via LuminaForms.
 */
(function () {
  function initWaitlist() {
    var form = document.querySelector("[data-waitlist-form]");
    if (!form) return;

    var email = form.querySelector('input[type="email"]');
    var errorEl = form.querySelector("[data-waitlist-error]");
    var successEl = document.querySelector("[data-waitlist-success]");
    if (!email || !errorEl) return;

    function showError(message) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("aria-describedby", errorEl.id);
      if (successEl) successEl.hidden = true;
    }

    function clearError() {
      errorEl.hidden = true;
      errorEl.textContent = "";
      email.removeAttribute("aria-invalid");
      email.removeAttribute("aria-describedby");
    }

    email.addEventListener("input", clearError);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var value = (email.value || "").trim();
      if (!value) {
        showError("Please enter your email address.");
        email.focus();
        return;
      }

      if (!email.checkValidity()) {
        showError("Please enter a valid email address.");
        email.focus();
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
          if (successEl) {
            successEl.hidden = false;
          }
          form.reset();
        })
        .catch(function () {
          showError(window.LuminaForms.errorMessage());
        })
        .then(function () {
          window.LuminaForms.setSubmitting(form, false);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWaitlist);
  } else {
    initWaitlist();
  }
})();
