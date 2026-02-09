/* ==========================================================================
   sd.insure — Contact Form Validation
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = {
    name: {
      el: form.querySelector('#field-name'),
      error: form.querySelector('#error-name'),
      validate: function (v) { return v.trim().length > 0 ? '' : 'Please enter your name.'; }
    },
    email: {
      el: form.querySelector('#field-email'),
      error: form.querySelector('#error-email'),
      validate: function (v) {
        if (!v.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Please enter a valid email address.';
        return '';
      }
    },
    phone: {
      el: form.querySelector('#field-phone'),
      error: form.querySelector('#error-phone'),
      validate: function (v) { return v.trim().length > 0 ? '' : 'Please enter your phone number.'; }
    },
    city: {
      el: form.querySelector('#field-city'),
      error: form.querySelector('#error-city'),
      validate: function (v) { return v.trim().length > 0 ? '' : 'Please enter your city.'; }
    },
    type: {
      el: form.querySelector('#field-type'),
      error: form.querySelector('#error-type'),
      validate: function (v) { return v ? '' : 'Please select an insurance type.'; }
    },
    message: {
      el: form.querySelector('#field-message'),
      error: form.querySelector('#error-message'),
      validate: function (v) { return v.trim().length > 0 ? '' : 'Please enter a message.'; }
    }
  };

  function showError(field, msg) {
    if (!field.el || !field.error) return;
    field.el.classList.add('error');
    field.error.textContent = msg;
    field.error.classList.add('visible');
  }

  function clearError(field) {
    if (!field.el || !field.error) return;
    field.el.classList.remove('error');
    field.error.textContent = '';
    field.error.classList.remove('visible');
  }

  // Clear errors on input
  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    if (!field.el) return;
    field.el.addEventListener('input', function () {
      clearError(field);
    });
    field.el.addEventListener('change', function () {
      clearError(field);
    });
  });

  form.addEventListener('submit', function (e) {
    var hasErrors = false;

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field.el) return;
      var msg = field.validate(field.el.value);
      if (msg) {
        showError(field, msg);
        hasErrors = true;
      } else {
        clearError(field);
      }
    });

    if (hasErrors) {
      e.preventDefault();
      // Focus first invalid field
      Object.keys(fields).some(function (key) {
        var field = fields[key];
        if (field.el && field.el.classList.contains('error')) {
          field.el.focus();
          return true;
        }
        return false;
      });
    }
    // If no errors, form submits normally to Netlify
  });
})();
