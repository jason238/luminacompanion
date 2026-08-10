/**
 * About contact form — validates fields, then POSTs to Formspree via LuminaForms.
 */
(function () {
  function initAboutForm() {
    var form = document.querySelector("[data-about-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-about-error]");
    var successEl = document.querySelector("[data-about-success]");
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
      var message = form.querySelector("#about-message");

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

      if (!message || !(message.value || "").trim()) {
        showError("Please enter your message.", message);
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutForm);
  } else {
    initAboutForm();
  }
})();
