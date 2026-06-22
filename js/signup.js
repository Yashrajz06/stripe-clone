$(document).ready(function () {

  $(document).on('click', '.password-toggle', function () {
    var input = $(this).siblings('input');
    var icon = $(this).find('i');
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
      icon.removeClass('bi-eye').addClass('bi-eye-slash');
    } else {
      input.attr('type', 'password');
      icon.removeClass('bi-eye-slash').addClass('bi-eye');
    }
  });

  $(document).on('input', '#signupPassword', function () {
    var val = $(this).val();
    var bar = $('.strength-meter .bar');
    var label = $('.strength-label');
    var score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    bar.removeClass('weak medium strong');
    if (score <= 2) {
      bar.addClass('weak');
      label.text('Weak').css('color', '#FF5A5F');
    } else if (score <= 3) {
      bar.addClass('medium');
      label.text('Medium').css('color', '#FFC233');
    } else {
      bar.addClass('strong');
      label.text('Strong').css('color', '#00D4AA');
    }
  });

  $('#signupForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var email = $('#signupEmail');
    var name = $('#signupName');
    var country = $('#signupCountry');
    var pass = $('#signupPassword');
    var terms = $('#termsCheck');

    if (!emailRegex.test(email.val())) {
      email.addClass('is-invalid').removeClass('is-valid'); valid = false;
    } else { email.addClass('is-valid').removeClass('is-invalid'); }

    if (name.val().trim().length < 2) {
      name.addClass('is-invalid').removeClass('is-valid'); valid = false;
    } else { name.addClass('is-valid').removeClass('is-invalid'); }

    if (!country.val()) {
      country.addClass('is-invalid').removeClass('is-valid'); valid = false;
    } else { country.addClass('is-valid').removeClass('is-invalid'); }

    if (pass.val().length < 8) {
      pass.addClass('is-invalid').removeClass('is-valid'); valid = false;
    } else { pass.addClass('is-valid').removeClass('is-invalid'); }

    if (!terms.is(':checked')) {
      terms.addClass('is-invalid'); valid = false;
    } else { terms.removeClass('is-invalid'); }

    if (valid) {
      showToast('Account created successfully! Welcome to Stripe.');
      setTimeout(function () { window.location.href = 'index.html'; }, 2000);
    }
  });

  $(document).on('blur', '.needs-validation .form-control, .needs-validation .form-select', function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ($(this).attr('type') === 'email') {
      if (emailRegex.test($(this).val())) {
        $(this).addClass('is-valid').removeClass('is-invalid');
      } else if ($(this).val().length > 0) {
        $(this).addClass('is-invalid').removeClass('is-valid');
      }
    } else if ($(this).prop('required')) {
      if ($(this).val() && $(this).val().trim() !== '') {
        $(this).addClass('is-valid').removeClass('is-invalid');
      }
    }
  });

  function showToast(msg) {
    var toast = $('.toast-success');
    toast.find('.toast-msg').text(msg);
    toast.addClass('show');
    setTimeout(function () { toast.removeClass('show'); }, 4000);
  }

});
