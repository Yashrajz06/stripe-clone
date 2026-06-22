$(document).ready(function () {
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.stripe-nav').addClass('scrolled');
    } else {
      $('.stripe-nav').removeClass('scrolled');
    }
  });

  $('.nav-item-mega').on('mouseenter', function () {
    $(this).addClass('show');
  }).on('mouseleave', function () {
    $(this).removeClass('show');
  });

  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $('.fade-up').each(function () {
    observer.observe(this);
  });

  $('#mobileMenuOpen').on('click', function () {
    $('#mobileMenu').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  $('#mobileCloseBtn').on('click', function () {
    $('#mobileMenu').removeClass('active');
    $('body').css('overflow', '');
  });

  $(document).on('click', '.navbar-brand', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  $('#nextStep').on('click', function () {
    var valid = true;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $('#step1').find('[required]').each(function () {
      if (!$(this).val() || $(this).val().trim() === '') {
        $(this).addClass('is-invalid').removeClass('is-valid');
        valid = false;
      } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
      }
    });

    var email = $('#contactEmail');
    if (email.val() && !emailRegex.test(email.val())) {
      email.addClass('is-invalid').removeClass('is-valid');
      valid = false;
    }

    if (valid) {
      $('#step1').addClass('fade-out');
      setTimeout(function () {
        $('#step1').removeClass('active fade-out');
        $('#step2').addClass('active');
        $('#navStep1').removeClass('active').addClass('completed');
        $('#navStep2').addClass('active');
      }, 400);
    }
  });

  $('#prevStep').on('click', function (e) {
    e.preventDefault();
    $('#step2').addClass('fade-out');
    setTimeout(function () {
      $('#step2').removeClass('active fade-out');
      $('#step1').addClass('active');
      $('#navStep2').removeClass('active');
      $('#navStep1').removeClass('completed').addClass('active');
    }, 400);
  });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var valid = true;

    $('#step2').find('[required]').each(function () {
      if (!$(this).val() || $(this).val().trim() === '') {
        $(this).addClass('is-invalid').removeClass('is-valid');
        valid = false;
      } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
      }
    });

    if (valid) {
      showToast('Message sent! Our team will contact you within 24 hours.');
      this.reset();
      $(this).find('.form-control, .form-select').removeClass('is-valid is-invalid');
      $('#step2').removeClass('active fade-out');
      $('#step1').addClass('active');
      $('#navStep2').removeClass('active');
      $('#navStep1').removeClass('completed').addClass('active');
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
