/**
 * Privacy contact form — UI validation only (Formspree wiring is Task 3.1).
 */
(function () {
  function initPrivacyForm() {
    var form = document.querySelector("[data-privacy-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-privacy-error]");
    var successEl = document.querySelector("[data-privacy-success]");
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

      var name = form.querySelector("#privacy-name");
      var email = form.querySelector("#privacy-email");
      var message = form.querySelector("#privacy-message");

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

      // Formspree submit arrives in Task 3.1 — show confirmation for now.
      form.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        successEl.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPrivacyForm);
  } else {
    initPrivacyForm();
  }
})();
