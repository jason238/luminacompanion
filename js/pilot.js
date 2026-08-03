/**
 * Pilot application form — validates fields, then POSTs to Formspree via LuminaForms.
 */
(function () {
  function initPilotForm() {
    var form = document.querySelector("[data-pilot-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-pilot-error]");
    var successEl = document.querySelector("[data-pilot-success]");
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

      var name = form.querySelector("#pilot-name");
      var email = form.querySelector("#pilot-email");
      var phone = form.querySelector("#pilot-phone");
      var relationship = form.querySelector("#pilot-relationship");
      var city = form.querySelector("#pilot-city");
      var situation = form.querySelector("#pilot-situation");
      var wifiChecked = form.querySelector('input[name="wifi"]:checked');
      var languageChecked = form.querySelector('input[name="language"]:checked');
      var checkinsChecked = form.querySelector('input[name="checkins"]:checked');

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

      if (!phone || !(phone.value || "").trim()) {
        showError("Please enter your phone number.", phone);
        return;
      }

      if (!relationship || !relationship.value) {
        showError("Please select your relationship to the senior.", relationship);
        return;
      }

      if (!city || !(city.value || "").trim()) {
        showError("Please enter the senior's city (Ottawa, ON).", city);
        return;
      }

      if (!situation || !(situation.value || "").trim()) {
        showError(
          "Please briefly describe the senior's living situation and wellbeing.",
          situation
        );
        return;
      }

      if (!wifiChecked) {
        showError(
          "Please tell us whether you have stable home WiFi.",
          form.querySelector('input[name="wifi"]')
        );
        return;
      }

      if (!languageChecked) {
        showError(
          "Please select a preferred language.",
          form.querySelector('input[name="language"]')
        );
        return;
      }

      if (!checkinsChecked) {
        showError(
          "Please tell us if you're open to occasional check-ins.",
          form.querySelector('input[name="checkins"]')
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
    document.addEventListener("DOMContentLoaded", initPilotForm);
  } else {
    initPilotForm();
  }
})();
