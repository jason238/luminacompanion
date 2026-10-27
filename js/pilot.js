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
      var tabletChecked = form.querySelector('input[name="android_tablet"]:checked');
      var osChecked = form.querySelector('input[name="caregiver_os"]:checked');
      var wifiChecked = form.querySelector('input[name="wifi"]:checked');
      var languageChecked = form.querySelector('input[name="language"]:checked');
      var interestChecked = form.querySelector('input[name="interest"]:checked');

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
        showError("Please enter the senior's location (Ottawa, ON).", city);
        return;
      }

      if (!situation || !(situation.value || "").trim()) {
        showError(
          "Please briefly describe the senior's current living situation.",
          situation
        );
        return;
      }

      if (!tabletChecked) {
        showError(
          "Please tell us whether your senior has a compatible Android tablet.",
          form.querySelector('input[name="android_tablet"]')
        );
        return;
      }

      if (!osChecked) {
        showError(
          "Please tell us which mobile OS your caregiver phone is running.",
          form.querySelector('input[name="caregiver_os"]')
        );
        return;
      }

      if (!wifiChecked) {
        showError(
          "Please tell us whether there is stable home Wi-Fi.",
          form.querySelector('input[name="wifi"]')
        );
        return;
      }

      if (!languageChecked) {
        showError(
          "Please select a preferred primary language.",
          form.querySelector('input[name="language"]')
        );
        return;
      }

      if (!interestChecked) {
        showError(
          "Please tell us what you're most interested in.",
          form.querySelector('input[name="interest"]')
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
