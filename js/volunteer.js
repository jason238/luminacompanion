/**
 * Volunteer application form — UI validation only (Formspree wiring is Task 3.1).
 */
(function () {
  function initVolunteerForm() {
    var form = document.querySelector("[data-volunteer-form]");
    if (!form) return;

    var errorEl = form.querySelector("[data-volunteer-error]");
    var successEl = document.querySelector("[data-volunteer-success]");
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

      var name = form.querySelector("#volunteer-name");
      var email = form.querySelector("#volunteer-email");
      var role = form.querySelector("#volunteer-role");
      var hours = form.querySelector("#volunteer-hours");
      var about = form.querySelector("#volunteer-about");

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
        showError("Please tell us roughly how many hours per week you can offer.", hours);
        return;
      }

      if (!about || !(about.value || "").trim()) {
        showError(
          "Please tell us a bit about yourself and why you're interested.",
          about
        );
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
    document.addEventListener("DOMContentLoaded", initVolunteerForm);
  } else {
    initVolunteerForm();
  }
})();
