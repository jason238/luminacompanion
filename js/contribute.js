/**
 * Contributor application form — validates fields, then POSTs to Formspree via LuminaForms.
 */
(function () {
  function initContributeForm() {
    var form = document.querySelector("[data-contribute-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-contribute-error]");
    var successEl = document.querySelector("[data-contribute-success]");
    if (!errorEl) return;

    var fields = form.querySelectorAll("input, select, textarea");

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
      field.addEventListener("change", clearError);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var name = form.querySelector("#contribute-name");
      var email = form.querySelector("#contribute-email");
      var role = form.querySelector("#contribute-role");
      var hours = form.querySelector("#contribute-hours");
      var about = form.querySelector("#contribute-about");

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

      if (!role || !role.value) {
        showError("Please select which role interests you.", role);
        return;
      }

      if (!hours || !(hours.value || "").trim()) {
        showError(
          "Please tell us roughly how many hours per week you can contribute.",
          hours
        );
        return;
      }

      if (!about || !(about.value || "").trim()) {
        showError(
          "Please tell us a bit about yourself and why you're interested.",
          about
        );
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
    document.addEventListener("DOMContentLoaded", initContributeForm);
  } else {
    initContributeForm();
  }
})();
