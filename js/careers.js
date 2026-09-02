/**
 * Careers student application — validates fields, then POSTs to Formspree via LuminaForms.
 */
(function () {
  var WHY_MAX = 700;

  function initCareersForm() {
    var form = document.querySelector("[data-careers-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-careers-error]");
    var successEl = document.querySelector("[data-careers-success]");
    if (!errorEl) return;

    var fields = form.querySelectorAll("input, select, textarea");
    var ottawaNote = form.querySelector("[data-careers-ottawa-note]");
    var ottawaGroup = form.querySelector("[data-careers-ottawa-group]");
    var eligibilityNote = form.querySelector("[data-careers-eligibility-note]");
    var eligibilityGroup = form.querySelector("[data-careers-eligibility-group]");
    var subjectEl = form.querySelector("[data-careers-subject]");
    var replytoEl = form.querySelector("[data-careers-replyto]");

    function showConditionalNote(noteEl, fieldName) {
      if (!noteEl) return;
      var selected = form.querySelector('input[name="' + fieldName + '"]:checked');
      noteEl.hidden = !(selected && selected.value === "No");
    }

    function invalidateGroup(group) {
      if (!group) return;
      group.setAttribute("aria-invalid", "true");
      var firstChoice = group.querySelector("input");
      if (firstChoice) firstChoice.focus();
    }

    function showError(message, focusEl) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      if (successEl) successEl.hidden = true;
      if (ottawaGroup) ottawaGroup.removeAttribute("aria-invalid");
      if (eligibilityGroup) eligibilityGroup.removeAttribute("aria-invalid");
      if (focusEl) {
        if (focusEl === ottawaGroup || focusEl === eligibilityGroup) {
          invalidateGroup(focusEl);
        } else {
          focusEl.setAttribute("aria-invalid", "true");
          focusEl.focus();
        }
      }
    }

    function clearError() {
      errorEl.hidden = true;
      errorEl.textContent = "";
      if (ottawaGroup) ottawaGroup.removeAttribute("aria-invalid");
      if (eligibilityGroup) eligibilityGroup.removeAttribute("aria-invalid");
      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });
    }

    fields.forEach(function (field) {
      field.addEventListener("input", clearError);
      field.addEventListener("change", function () {
        clearError();
        showConditionalNote(ottawaNote, "ottawa_based");
        showConditionalNote(eligibilityNote, "eligibility");
      });
    });

    showConditionalNote(ottawaNote, "ottawa_based");
    showConditionalNote(eligibilityNote, "eligibility");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var name = form.querySelector("#careers-name");
      var email = form.querySelector("#careers-email");
      var phone = form.querySelector("#careers-phone");
      var school = form.querySelector("#careers-school");
      var year = form.querySelector("#careers-year");
      var eligibilityChecked = form.querySelector(
        'input[name="eligibility"]:checked'
      );
      var ottawaChecked = form.querySelector('input[name="ottawa_based"]:checked');
      var commitChecked = form.querySelector(
        'input[name="availability_commitment"]:checked'
      );
      var availability = form.querySelector("#careers-availability");
      var portfolio = form.querySelector("#careers-portfolio");
      var linkedin = form.querySelector("#careers-linkedin");
      var why = form.querySelector("#careers-why");

      if (!name || !(name.value || "").trim()) {
        showError("Please enter your name.", name);
        return;
      }

      if (!email || !(email.value || "").trim()) {
        showError("Please enter a valid email address.", email);
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

      if (!school || !(school.value || "").trim()) {
        showError("Please enter your school and program.", school);
        return;
      }

      if (!year || !year.value) {
        showError("Please select your year of study.", year);
        return;
      }

      if (!eligibilityChecked) {
        showError("Please confirm whether you meet the eligibility requirement.", eligibilityGroup);
        return;
      }

      if (!ottawaChecked) {
        showError("Please tell us whether you are currently based in Ottawa.", ottawaGroup);
        return;
      }

      if (!commitChecked) {
        showError(
          "Please tell us whether you can commit approximately 60 hours.",
          form.querySelector('input[name="availability_commitment"]')
        );
        return;
      }

      if (!availability || !(availability.value || "").trim()) {
        showError("Please describe your approximate availability.", availability);
        return;
      }

      if (!portfolio || !(portfolio.value || "").trim()) {
        showError("Please provide a link to your video portfolio.", portfolio);
        return;
      }

      if (linkedin && (linkedin.value || "").trim() && !linkedin.checkValidity()) {
        showError("Please enter a valid LinkedIn URL, or leave that field blank.", linkedin);
        return;
      }

      if (!why || !(why.value || "").trim()) {
        showError("Please tell us why you are interested in working with Lumina.", why);
        return;
      }

      if ((why.value || "").length > WHY_MAX) {
        showError("Please keep that answer to about 100 words.", why);
        return;
      }

      if (!window.LuminaForms) {
        showError("Something went wrong. Please try again later.");
        return;
      }

      if (subjectEl) {
        subjectEl.value =
          "New Lumina Student Application — " + (name.value || "").trim();
      }

      if (replytoEl) {
        replytoEl.value = (email.value || "").trim();
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
    document.addEventListener("DOMContentLoaded", initCareersForm);
  } else {
    initCareersForm();
  }
})();
