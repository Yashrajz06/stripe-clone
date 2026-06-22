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

  $('#signinForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var email = $('#signinEmail');
    var pass = $('#signinPassword');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.val())) {
      email.addClass('is-invalid').removeClass('is-valid');
      valid = false;
    } else {
      email.addClass('is-valid').removeClass('is-invalid');
    }
    if (pass.val().length < 6) {
      pass.addClass('is-invalid').removeClass('is-valid');
      valid = false;
    } else {
      pass.addClass('is-valid').removeClass('is-invalid');
    }

    if (valid) {
      showToast('Signed in successfully! Redirecting...');
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
