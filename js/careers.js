/**
 * Careers talent-pool form — validates fields, then POSTs to Formspree via LuminaForms.
 */
(function () {
  var BACKGROUND_MAX_WORDS = 200;

  function wordCount(value) {
    var trimmed = (value || "").trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function initCareersForm() {
    var form = document.querySelector("[data-careers-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-careers-error]");
    var successEl = document.querySelector("[data-careers-success]");
    if (!errorEl) return;

    var fields = form.querySelectorAll("input, select, textarea");
    var ottawaNote = form.querySelector("[data-careers-ottawa-note]");
    var ottawaGroup = form.querySelector("[data-careers-ottawa-group]");
    var interestGroup = form.querySelector("[data-careers-interest-group]");
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
      if (interestGroup) interestGroup.removeAttribute("aria-invalid");
      if (focusEl) {
        if (focusEl === ottawaGroup || focusEl === interestGroup) {
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
      if (interestGroup) interestGroup.removeAttribute("aria-invalid");
      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });
    }

    fields.forEach(function (field) {
      field.addEventListener("input", clearError);
      field.addEventListener("change", function () {
        clearError();
        showConditionalNote(ottawaNote, "ottawa_based");
      });
    });

    showConditionalNote(ottawaNote, "ottawa_based");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError();

      var name = form.querySelector("#careers-name");
      var email = form.querySelector("#careers-email");
      var phone = form.querySelector("#careers-phone");
      var school = form.querySelector("#careers-school");
      var year = form.querySelector("#careers-year");
      var ottawaChecked = form.querySelector('input[name="ottawa_based"]:checked');
      var interestChecked = form.querySelector(
        'input[name="area_of_interest"]:checked'
      );
      var portfolio = form.querySelector("#careers-portfolio");
      var linkedin = form.querySelector("#careers-linkedin");
      var background = form.querySelector("#careers-background");

      if (!name || !(name.value || "").trim()) {
        showError("Please enter your name.", name);
        return;
      }

      if (!email || !(email.value || "").trim() || !email.checkValidity()) {
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

      if (!ottawaChecked) {
        showError(
          "Please tell us whether you are currently based in Ottawa.",
          ottawaGroup
        );
        return;
      }

      if (!interestChecked) {
        showError("Please select at least one area of interest.", interestGroup);
        return;
      }

      if (!portfolio || !(portfolio.value || "").trim()) {
        showError(
          "Please paste your resume, or links to your portfolio or video examples.",
          portfolio
        );
        return;
      }

      if (linkedin && (linkedin.value || "").trim() && !linkedin.checkValidity()) {
        showError(
          "Please enter a valid LinkedIn URL, or leave that field blank.",
          linkedin
        );
        return;
      }

      if (!background || !(background.value || "").trim()) {
        showError(
          "Please tell us about your background and why you'd like to work with Lumina.",
          background
        );
        return;
      }

      if (wordCount(background.value) > BACKGROUND_MAX_WORDS) {
        showError("Please keep that answer to 200 words.", background);
        return;
      }

      if (!window.LuminaForms) {
        showError("Something went wrong. Please try again later.");
        return;
      }

      if (subjectEl) {
        subjectEl.value =
          "New Lumina Talent Pool Submission — " + (name.value || "").trim();
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
