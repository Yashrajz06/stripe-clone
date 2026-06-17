/* ============================================
   STRIPE CLONE — MAIN JAVASCRIPT (jQuery)
   ============================================ */

$(document).ready(function () {
  /* ---- Navbar Scroll Effect ---- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.stripe-nav').addClass('scrolled');
    } else {
      $('.stripe-nav').removeClass('scrolled');
    }
  });

  /* ---- Mobile Menu ---- */
  $('.navbar-toggler').on('click', function () {
    $('body').toggleClass('menu-open');
  });

  /* ---- Mega Menu (Desktop Hover) ---- */
  $('.nav-item-mega').on('mouseenter', function () {
    $(this).addClass('show');
  }).on('mouseleave', function () {
    $(this).removeClass('show');
  });

  /* ---- Smooth Scroll ---- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });

  /* ---- Scroll Animations (Fade Up) ---- */
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

  /* ---- Animated Counters ---- */
  var counterDone = false;
  function animateCounters() {
    if (counterDone) return;
    counterDone = true;
    $('.stat-number').each(function () {
      var $this = $(this);
      var target = $this.data('target');
      var suffix = $this.data('suffix') || '';
      var prefix = $this.data('prefix') || '';
      var decimals = $this.data('decimals') || 0;
      $({ val: 0 }).animate({ val: target }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          var v = decimals > 0 ? this.val.toFixed(decimals) : Math.floor(this.val);
          $this.text(prefix + v + suffix);
        },
        complete: function () {
          var v = decimals > 0 ? parseFloat(target).toFixed(decimals) : target;
          $this.text(prefix + v + suffix);
        }
      });
    });
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) animateCounters();
    });
  }, { threshold: 0.3 });

  if ($('.stats-section').length) {
    statsObserver.observe($('.stats-section')[0]);
  }

  /* ---- Password Show/Hide Toggle ---- */
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

  /* ---- Password Strength Meter ---- */
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

  /* ---- Form Validation — Sign In ---- */
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

  /* ---- Form Validation — Sign Up ---- */
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

  /* ---- Form Validation — Contact (Multi-step) ---- */
  $('#nextStep').on('click', function () {
    var valid = true;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate only Step 1 fields
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
      }, 400); // Wait for transition
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

    // Validate only Step 2 fields since Step 1 is already valid if we're here
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
      // Reset back to step 1
      $('#step2').removeClass('active fade-out');
      $('#step1').addClass('active');
      $('#navStep2').removeClass('active');
      $('#navStep1').removeClass('completed').addClass('active');
    }
  });

  /* ---- Real-time Input Validation ---- */
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

  /* ---- Toast Notification ---- */
  function showToast(msg) {
    var toast = $('.toast-success');
    toast.find('.toast-msg').text(msg);
    toast.addClass('show');
    setTimeout(function () { toast.removeClass('show'); }, 4000);
  }

  /* ---- Code Tabs animation ---- */
  $('.code-tabs .nav-link').on('click', function () {
    $($(this).data('bs-target')).find('.code-block').css('opacity', 0).animate({ opacity: 1 }, 400);
  });

  /* ---- Back to top on logo click ---- */
  $(document).on('click', '.navbar-brand', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  /* ---- Expandable Product Bento Grid Modal ---- */
  var productData = {
    payments: {
      title: 'Accept and optimise payments globally – online and in person',
      desc: 'Simplify your checkout, expand your reach and boost conversion with AI-powered tools to accept payments anywhere.',
      btnPrimary: { text: 'Explore Payments', href: 'payments.html' },
      btnSecondary: { text: 'See pricing details', href: 'pricing.html' },
      features: [
        'Create a seamless checkout experience',
        'Expand to new markets faster',
        'Maximise acceptance rates and mitigate fraud',
        'Unify online and in-person payments'
      ],
      visuals: [
        { gradient: 'gradient-payments', content: '<div class="modal-mockup" style="padding: 32px; border-radius: 12px; max-width: 320px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);"><div class="modal-mockup-header" style="color: #0A2540; font-size: 16px; margin-bottom: 24px; display: flex; align-items: center;"><i class="bi bi-bag-check" style="color:#635BFF; margin-right:8px; font-size: 18px;"></i>Oak dining chair</div><div style="text-align:center; font-size:2rem; font-weight:800; color:#0A2540; margin-bottom: 24px; line-height: 1;">JP¥14,900</div><div style="background:black; color:white; text-align:center; padding:12px; border-radius:8px; font-size:14px; font-weight:600; margin-bottom:12px; cursor: pointer;">Pay</div><div style="background:#00D64B; color:white; text-align:center; padding:12px; border-radius:8px; font-size:14px; font-weight:600; cursor: pointer;">Pay with <i class="bi bi-link-45deg" style="margin:0 2px;"></i> link</div></div>' },
        { gradient: 'gradient-payments', content: '<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; width: 100%; height: 100%;"><div class="modal-mockup-stat" style="font-size: 3.5rem; color: #635BFF; margin-bottom: 16px; font-weight: 800;">3.8%</div><div class="modal-mockup-label" style="font-size: 15px; color: #FFFFFF; max-width: 280px; margin: 0 auto; line-height: 1.5; font-weight: 500;"><b>Increase in authorisation rates on average with Authorization Boost</b></div></div>' }
      ]
    },
    billing: {
      title: 'Enable any billing model',
      desc: 'Launch fast and improve revenue capture with billing software that supports various pricing strategies, offers preferred payment methods, and helps reduce involuntary churn.',
      btnPrimary: { text: 'Explore Billing', href: 'pricing.html' },
      btnSecondary: { text: 'See pricing details', href: 'pricing.html' },
      features: [
        'Enhance pricing flexibility',
        'Offer customers\' preferred payment methods',
        'Improve revenue capture and help reduce involuntary churn',
        'Reduce development time and go to market faster'
      ],
      visuals: [
        { gradient: 'gradient-billing', content: '<div class="modal-mockup"><div class="modal-mockup-header"><i class="bi bi-receipt" style="color:var(--stripe-primary);margin-right:6px"></i>Invoice #2847</div><div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid #e6ebf1"><span>Cloud Tokens</span><span style="font-weight:600">$2,450.00</span></div><div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;font-weight:700"><span>Total</span><span>$2,450.00</span></div></div>' },
        { gradient: 'gradient-billing', content: '<div class="modal-mockup"><div class="modal-mockup-header">Pay as you go</div><div style="font-size:11px;color:var(--stripe-text-light);margin-bottom:8px">Model API · model_tokens_usage</div><div style="display:flex;gap:6px;margin-bottom:8px"><span style="background:rgba(99,91,255,0.1);color:var(--stripe-primary);padding:3px 8px;border-radius:4px;font-size:10px;font-weight:600">Graduated</span><span style="background:var(--stripe-light);padding:3px 8px;border-radius:4px;font-size:10px">Volume</span></div><div style="font-size:12px"><span style="color:var(--stripe-text-light)">Price per unit: </span><span style="font-weight:700">US$0.07</span></div></div>' }
      ]
    },
    agentic: {
      title: 'Monetise through agentic commerce',
      desc: 'Reach high-intent buyers and add new revenue streams by making your products shoppable through AI agents like ChatGPT.',
      btnPrimary: { text: 'Explore agentic commerce', href: 'payments.html' },
      btnSecondary: { text: 'Contact sales', href: 'contact.html' },
      features: [
        'Earn incremental revenue from AI channels',
        'Protect against agent-era fraud',
        'Maintain relationships wherever customers buy',
        'Create agent-facing endpoints that integrate with existing systems'
      ],
      visuals: [
        { gradient: 'gradient-agentic', content: '<div class="modal-mockup"><div style="font-weight:700;font-size:13px;margin-bottom:10px;color:var(--stripe-primary)">elementara.ai</div><div style="background:var(--stripe-light);border-radius:8px;padding:10px;margin-bottom:6px;font-size:11px;color:var(--stripe-text-light)">Can you recommend some cosy, comfortable basics in size M?</div><div style="background:rgba(99,91,255,0.05);border-radius:8px;padding:10px;font-size:11px;color:var(--stripe-dark)">Here are a few comfy essentials that pair well and could be a good starting point:</div></div>' },
        { gradient: 'gradient-agentic', content: '<div class="modal-mockup"><div class="modal-mockup-header">Cartsy Checkout</div><div style="display:flex;justify-content:space-between;font-size:11px;padding:6px 0;border-bottom:1px solid #e6ebf1"><span>Deluxe Shirt</span><span style="font-weight:600">₹2,470</span></div><div style="display:flex;justify-content:space-between;font-size:11px;padding:6px 0;border-bottom:1px solid #e6ebf1"><span>Essential Hoodie</span><span style="font-weight:600">₹4,840</span></div><div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;font-weight:700"><span>Total</span><span>₹8,225.58</span></div></div>' }
      ]
    },
    issuing: {
      title: 'Create a card issuing programme',
      desc: 'Offer commercial or consumer cards to create new revenue streams and broaden your services, with Stripe providing compliance support.',
      btnPrimary: { text: 'Explore Issuing', href: 'payments.html' },
      btnSecondary: { text: 'See pricing details', href: 'pricing.html' },
      features: [
        'Launch commercial or consumer cards with ease',
        'Streamline card compliance workflows',
        'Generate revenue from interchange fees',
        'Build a comprehensive financial hub'
      ],
      visuals: [
        { gradient: 'gradient-issuing', content: '<div class="modal-mockup"><div class="modal-mockup-header"><i class="bi bi-wallet2" style="color:var(--stripe-primary);margin-right:6px"></i>Triplo Dashboard</div><div style="font-size:11px;color:var(--stripe-text-light);margin-bottom:4px">Available balance</div><div style="font-size:1.3rem;font-weight:800;color:var(--stripe-dark);margin-bottom:10px">$14,280.00</div><div style="font-size:11px;padding:4px 0;display:flex;justify-content:space-between;border-bottom:1px solid #e6ebf1"><span>Office Supplies</span><span style="color:var(--stripe-danger)">-$124.50</span></div><div style="font-size:11px;padding:4px 0;display:flex;justify-content:space-between"><span>Software License</span><span style="color:var(--stripe-danger)">-$299.00</span></div></div>' },
        { gradient: 'gradient-issuing', content: '<div class="modal-mockup"><div class="modal-mockup-header">Add a spending limit</div><div style="font-size:11px;margin-bottom:8px"><span style="color:var(--stripe-text-light)">Amount: </span><span style="font-weight:600">$5,000/month</span></div><div style="font-size:11px;margin-bottom:8px"><span style="color:var(--stripe-text-light)">Period: </span><span style="font-weight:600">Monthly</span></div><div style="font-size:11px"><span style="color:var(--stripe-text-light)">Categories: </span><span style="font-weight:600">All merchants</span></div><div style="background:var(--stripe-primary);color:white;text-align:center;padding:8px;border-radius:6px;margin-top:12px;font-size:12px;font-weight:600">Apply limit</div></div>' }
      ]
    },
    crypto: {
      title: 'Access borderless money movement with stablecoins and crypto',
      desc: 'Easily integrate stablecoin payments and payouts, manage digital assets and move money globally – without the complexity of building on the blockchain.',
      btnPrimary: { text: 'Explore stablecoins and crypto', href: 'payments.html' },
      btnSecondary: { text: 'Contact sales', href: 'contact.html' },
      features: [
        'Manage money globally with low cross-border fees',
        'Instantly pay out anyone, anywhere, 24/7 on stablecoin rails',
        'Launch financial services in more countries at once',
        'Enable crypto on-ramping directly within your product'
      ],
      visuals: [
        { gradient: 'gradient-crypto', content: '<div class="modal-mockup"><div class="modal-mockup-header"><i class="bi bi-currency-bitcoin" style="color:#F7931A;margin-right:6px"></i>Cryptocurrency</div><div style="font-size:11px;padding:6px 0;display:flex;justify-content:space-between;border-bottom:1px solid #e6ebf1"><span>USDC</span><span style="font-weight:600;color:var(--stripe-cyan)">$1.00</span></div><div style="font-size:11px;padding:6px 0;display:flex;justify-content:space-between;border-bottom:1px solid #e6ebf1"><span>Bitcoin</span><span style="font-weight:600;color:#F7931A">$104,230</span></div><div style="font-size:11px;padding:6px 0;display:flex;justify-content:space-between"><span>Ethereum</span><span style="font-weight:600;color:#627EEA">$3,812</span></div></div>' },
        { gradient: 'gradient-crypto', content: '<div class="modal-mockup"><div class="modal-mockup-header">Wallet Portfolio</div><div style="font-size:11px;color:var(--stripe-text-light);margin-bottom:4px">Total balance</div><div style="font-size:1.3rem;font-weight:800;color:var(--stripe-dark);margin-bottom:10px">$28,450.00</div><div style="display:flex;gap:6px"><div style="flex:1;background:rgba(99,91,255,0.1);border-radius:6px;padding:8px;text-align:center"><div style="font-size:10px;color:var(--stripe-text-light)">USDC</div><div style="font-weight:700;font-size:12px">$15,200</div></div><div style="flex:1;background:rgba(247,147,26,0.1);border-radius:6px;padding:8px;text-align:center"><div style="font-size:10px;color:var(--stripe-text-light)">BTC</div><div style="font-weight:700;font-size:12px">$13,250</div></div></div></div>' }
      ]
    }
  };

  function openProductModal(key) {
    var data = productData[key];
    if (!data) return;
    $('#modalTitle').text(data.title);
    $('#modalDesc').text(data.desc);
    var actions = '<a href="' + data.btnPrimary.href + '" class="btn-explore">' + data.btnPrimary.text + ' <i class="bi bi-arrow-right"></i></a>';
    actions += '<a href="' + data.btnSecondary.href + '" class="btn-pricing">' + data.btnSecondary.text + '</a>';
    $('#modalActions').html(actions);
    var features = '';
    data.features.forEach(function (f) {
      features += '<li><span class="check-icon"><i class="bi bi-check-circle-fill"></i></span>' + f + '</li>';
    });
    $('#modalFeatures').html(features);
    var visuals = '';
    data.visuals.forEach(function (v) {
      visuals += '<div class="modal-visual-card ' + v.gradient + '">' + v.content + '</div>';
    });
    $('#modalVisuals').html(visuals);
    $('#productModal').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeProductModal() {
    $('#productModal').removeClass('active');
    $('body').css('overflow', '');
  }

  $(document).on('click', '.product-bento-item', function () {
    var key = $(this).data('modal');
    openProductModal(key);
  });

  $('#modalClose').on('click', function (e) {
    e.stopPropagation();
    closeProductModal();
  });

  $('#productModal').on('click', function (e) {
    if ($(e.target).is('#productModal')) {
      closeProductModal();
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('#productModal').hasClass('active')) {
      closeProductModal();
    }
  });

  /* ---- Customer Stories Carousel ---- */
  $('.carousel-prev').on('click', function () {
    var carousel = $('.stories-carousel');
    var scrollPos = carousel.scrollLeft();
    carousel.animate({ scrollLeft: scrollPos - 304 }, 300);
  });
  $('.carousel-next').on('click', function () {
    var carousel = $('.stories-carousel');
    var scrollPos = carousel.scrollLeft();
    carousel.animate({ scrollLeft: scrollPos + 304 }, 300);
  });

  /* ---- Global Payments Country Tabs ---- */
  var gpCountryData = {
    us: {
      methods: [
        { icon: 'bi-credit-card', iconClass: '', title: 'Cards and wallets', desc: 'Accept Visa, Mastercard, Amex, Discover and digital wallets like Apple Pay and Google Pay.' },
        { icon: 'bi-bank', iconClass: 'green', title: 'ACH Direct Debit', desc: 'Accept bank payments directly for recurring billing and large transactions at low cost.' },
        { icon: 'bi-phone', iconClass: 'blue', title: 'Cash App Pay', desc: 'Let your customers pay with their Cash App balance for a seamless mobile checkout.' }
      ],
      form: {
        header: 'Card',
        headerIcon: 'bi-credit-card-2-front',
        fields: [
          { type: 'input', label: 'Card Number', placeholder: '1234 1234 1234 1234', hasCardBrands: true },
          { type: 'row', fields: [
            { label: 'Expiry Date', placeholder: 'MM / YY' },
            { label: 'CVC', placeholder: '123', hasLock: true }
          ]},
        ],
        altMethods: [
          { name: 'Apple Pay', icon: 'bi-apple', iconBg: '#000', iconColor: '#fff' },
          { name: 'Google Pay', icon: 'bi-google', iconBg: '#4285F4', iconColor: '#fff' }
        ],
        btnText: 'Pay $235.00',
        btnCurrency: '$'
      }
    },
    de: {
      methods: [
        { icon: 'bi-basket', iconClass: '', title: 'Klarna', desc: 'Offer buy now, pay later and flexible instalment plans popular across Germany and Europe.' },
        { icon: 'bi-bank', iconClass: 'green', title: 'SEPA Direct Debit', desc: 'Accept euro-denominated payments across the SEPA zone with bank-to-bank transfers.' },
        { icon: 'bi-paypal', iconClass: 'blue', title: 'PayPal', desc: 'Enable PayPal payments for millions of German customers who prefer this method.' }
      ],
      form: {
        header: 'Klarna',
        headerSub: 'Kein Kaufen, stilvoll bezahlen',
        headerIcon: 'bi-basket',
        fields: [
          { type: 'input', label: 'E-Mail', placeholder: 'email@beispiel.de' },
          { type: 'row', fields: [
            { label: 'Vor- und Nachname', placeholder: 'Max Mustermann' },
            { label: 'Land', placeholder: 'Deutschland' }
          ]},
        ],
        checkbox: 'Nach dem Absenden werden Sie weitergeleitet, um die nächsten Schritte sicher abzuschliessen.',
        altMethods: [
          { name: 'SEPA-Lastschrift', icon: 'bi-bank', iconBg: '#0A2540', iconColor: '#fff' },
          { name: 'PayPal', icon: 'bi-paypal', iconBg: '#003087', iconColor: '#fff' }
        ],
        btnText: '€198,00 bezahlen',
        btnCurrency: '€'
      }
    },
    uk: {
      methods: [
        { icon: 'bi-credit-card', iconClass: '', title: 'Cards', desc: 'Accept all major UK credit and debit cards including Visa, Mastercard, and Amex.' },
        { icon: 'bi-basket', iconClass: 'green', title: 'Klarna', desc: 'Offer buy now, pay later options highly popular among UK shoppers.' },
        { icon: 'bi-clock-history', iconClass: 'blue', title: 'Clearpay', desc: 'Buy now, pay later in 4 interest-free instalments, popular across the UK.' }
      ],
      form: {
        header: 'Card',
        headerIcon: 'bi-credit-card-2-front',
        fields: [
          { type: 'input', label: 'Card Number', placeholder: '1234 1234 1234 1234', hasCardBrands: true },
          { type: 'row', fields: [
            { label: 'Expiry Date', placeholder: 'MM / YY' },
            { label: 'CVC', placeholder: '123', hasLock: true }
          ]},
        ],
        altMethods: [
          { name: 'Klarna', desc: 'Buy now pay later', icon: 'bi-basket', iconBg: '#FFB3C7', iconColor: '#0A0B09' },
          { name: 'Clearpay', desc: 'Buy now pay later', icon: 'bi-clock-history', iconBg: '#B2FCE4', iconColor: '#0A0B09' }
        ],
        btnText: 'Pay £235.00',
        btnCurrency: '£'
      }
    },
    cn: {
      methods: [
        { icon: 'bi-chat-dots', iconClass: 'green', title: 'WeChat Pay', desc: 'Accept payments through WeChat, the super-app used by over 1.2 billion people in China.' },
        { icon: 'bi-wallet2', iconClass: 'blue', title: 'Alipay', desc: 'Reach over 1 billion Alipay users with China\'s most popular digital wallet platform.' },
        { icon: 'bi-union', iconClass: 'red', title: 'UnionPay', desc: 'Accept China UnionPay cards, the world\'s largest card network by number of cards issued.' }
      ],
      form: {
        header: 'Alipay',
        headerSub: '支付宝支付',
        headerIcon: 'bi-wallet2',
        fields: [
          { type: 'input', label: '电子邮件 / Email', placeholder: 'user@example.cn' },
          { type: 'input', label: '姓名 / Full Name', placeholder: '张三' }
        ],
        checkbox: '提交后，您将被重定向到支付宝以安全完成付款。',
        altMethods: [
          { name: 'WeChat Pay', icon: 'bi-chat-dots', iconBg: '#07C160', iconColor: '#fff' },
          { name: 'UnionPay', icon: 'bi-union', iconBg: '#E21836', iconColor: '#fff' }
        ],
        btnText: '支付 ¥1,680.00',
        btnCurrency: '¥'
      }
    },
    mx: {
      methods: [
        { icon: 'bi-credit-card', iconClass: '', title: 'Cards', desc: 'Accept credit and debit cards from Visa, Mastercard, and Carnet for local payments.' },
        { icon: 'bi-shop', iconClass: 'orange', title: 'OXXO', desc: 'Allow customers to pay with cash at over 19,000+ OXXO convenience stores across Mexico.' },
        { icon: 'bi-bank', iconClass: 'green', title: 'SPEI', desc: 'Accept instant bank transfers through Mexico\'s domestic payment system used by millions.' }
      ],
      form: {
        header: 'Tarjeta / Card',
        headerIcon: 'bi-credit-card-2-front',
        fields: [
          { type: 'input', label: 'Número de tarjeta', placeholder: '1234 1234 1234 1234', hasCardBrands: true },
          { type: 'row', fields: [
            { label: 'Fecha de vencimiento', placeholder: 'MM / AA' },
            { label: 'CVV', placeholder: '123', hasLock: true }
          ]},
        ],
        altMethods: [
          { name: 'OXXO', desc: 'Pago en efectivo', icon: 'bi-shop', iconBg: '#CD1417', iconColor: '#fff' },
          { name: 'SPEI', desc: 'Transferencia bancaria', icon: 'bi-bank', iconBg: '#0A2540', iconColor: '#fff' }
        ],
        btnText: 'Pagar MX$4,350.00',
        btnCurrency: 'MX$'
      }
    }
  };

  function renderGPMethods(country) {
    var data = gpCountryData[country];
    if (!data) return;
    var html = '';
    data.methods.forEach(function(m, i) {
      html += '<div class="gp-method-item" style="animation-delay:' + (i * 0.1) + 's">';
      html += '<div class="gp-method-icon ' + m.iconClass + '"><i class="bi ' + m.icon + '"></i></div>';
      html += '<div class="gp-method-info"><h5>' + m.title + '</h5><p>' + m.desc + '</p></div>';
      html += '</div>';
    });
    $('#gpMethodsList').html(html);
  }

  function renderGPForm(country) {
    var data = gpCountryData[country];
    if (!data) return;
    var f = data.form;
    var html = '';

    // Header
    html += '<div class="gp-form-header">';
    html += '<div class="gp-form-header-icon"><i class="bi ' + f.headerIcon + '"></i></div>';
    html += '<div>';
    html += '<div class="gp-form-header-text">' + f.header + '</div>';
    if (f.headerSub) html += '<div class="gp-form-header-sub">' + f.headerSub + '</div>';
    html += '</div></div>';

    // Fields
    f.fields.forEach(function(field) {
      if (field.type === 'input') {
        html += '<div class="gp-input-group" style="position:relative">';
        html += '<label class="gp-input-label">' + field.label + '</label>';
        html += '<input class="gp-input" placeholder="' + field.placeholder + '" readonly>';
        if (field.hasCardBrands) {
          html += '<div class="gp-card-brands">';
          html += '<div class="gp-card-brand visa">VISA</div>';
          html += '<div class="gp-card-brand mc">MC</div>';
          html += '<div class="gp-card-brand amex">AX</div>';
          html += '<div class="gp-card-brand disc">DS</div>';
          html += '</div>';
        }
        html += '</div>';
      } else if (field.type === 'row') {
        html += '<div class="gp-input-row">';
        field.fields.forEach(function(rf) {
          html += '<div class="gp-input-group" style="position:relative">';
          html += '<label class="gp-input-label">' + rf.label + '</label>';
          html += '<input class="gp-input" placeholder="' + rf.placeholder + '" readonly>';
          if (rf.hasLock) {
            html += '<div style="position:absolute;right:14px;top:50%;transform:translateY(20%);color:var(--stripe-text-light);font-size:14px"><i class="bi bi-lock"></i></div>';
          }
          html += '</div>';
        });
        html += '</div>';
      }
    });

    // Checkbox
    if (f.checkbox) {
      html += '<div class="gp-checkbox-row"><input type="checkbox" checked><span>' + f.checkbox + '</span></div>';
    }

    // Alt payment methods
    if (f.altMethods && f.altMethods.length) {
      html += '<div class="gp-pay-methods">';
      f.altMethods.forEach(function(m) {
        html += '<div class="gp-pay-method-row">';
        html += '<div class="gp-pay-method-icon" style="background:' + m.iconBg + ';color:' + m.iconColor + '"><i class="bi ' + m.icon + '"></i></div>';
        html += '<div><div class="gp-pay-method-name">' + m.name + '</div>';
        if (m.desc) html += '<div class="gp-pay-method-desc">' + m.desc + '</div>';
        html += '</div></div>';
      });
      html += '</div>';
    }

    // Pay button
    html += '<button class="gp-pay-btn">' + f.btnText + '</button>';

    $('#gpFormCard').css('opacity', 0);
    $('#gpFormCard').html(html);
    setTimeout(function() { $('#gpFormCard').css('opacity', 1); }, 50);
  }

  // Init global payments
  if ($('#gpCountryTabs').length) {
    renderGPMethods('us');
    renderGPForm('us');

    $(document).on('click', '.gp-tab', function() {
      var country = $(this).data('country');
      $('.gp-tab').removeClass('active');
      $(this).addClass('active');
      renderGPMethods(country);
      renderGPForm(country);
    });
  }

  /* ---- What's Happening Carousel ---- */
  var whStories = [
    {
      title: "Shopify's Tobi Lütke sits down with John Collison.",
      desc: "Hear them discuss the choices that shaped Shopify and Stripe, the future of commerce, and their advice for founders.",
      cta: "Watch video",
      href: "#"
    },
    {
      title: "New tools to process payments outside app stores.",
      desc: "New regulations mean new opportunities. Read how Stripe can help you process payments outside of the iOS and Android app stores, giving you more control and helping grow your revenue.",
      cta: "Learn how",
      href: "#"
    },
    {
      title: "Crypto.com partners with Stripe to enable better crypto payments.",
      desc: "Learn how the partnership can help you tap into a new global customer base by letting customers pay with their crypto balance directly at checkout.",
      cta: "View announcement",
      href: "#"
    },
    {
      title: "Introducing the Agentic Commerce Protocol.",
      desc: "A new open standard that enables AI agents to discover, negotiate, and transact with businesses on behalf of users — powering the next era of commerce.",
      cta: "Read more",
      href: "#"
    },
    {
      title: "Stripe powers seamless in-person payments for retailers.",
      desc: "From boutiques to multi-location brands, see how Stripe Terminal helps retailers unify their online and in-person payment experiences.",
      cta: "Explore Terminal",
      href: "#"
    },
    {
      title: "Stripe's Annual Letter 2025.",
      desc: "A look back at the year that was — and forward to what's ahead. Read about Stripe's growth, new products, and vision for the future of the internet economy.",
      cta: "Read the letter",
      href: "#"
    },
    {
      title: "Building the economic infrastructure for the internet.",
      desc: "Stripe processes over 1 trillion dollars annually, handling more than 80,000 transactions per minute with 99.9999% uptime across the global financial network.",
      cta: "Learn more",
      href: "#"
    },
    {
      title: "Tidemark brings Stripe-powered billing to enterprise SaaS.",
      desc: "See how Tidemark leverages Stripe's billing infrastructure to offer flexible, usage-based pricing models that scale with their customers' growth.",
      cta: "Read case study",
      href: "#"
    }
  ];

  var whCurrentSlide = 0;
  var isWhAnimating = false;
  var totalOriginal = whStories.length;

  function updateWhStory(index) {
    var story = whStories[index];
    $('#whStoryTitle').text(story.title);
    $('#whStoryDesc').text(' ' + story.desc);
    $('#whStoryCta').html(story.cta + ' <i class="bi bi-chevron-right"></i>').attr('href', story.href);
  }

  function goToWhSlide(index, instant) {
    var $allCards = $('#whCarouselTrack .wh-card');
    
    // Bounds fallback
    if (index < 0) index = 0;
    if (index >= $allCards.length) index = $allCards.length - 1;
    
    whCurrentSlide = index;

    // Update active classes
    $allCards.removeClass('active');
    $allCards.eq(index).addClass('active');

    // Calculate translation offset
    var containerWidth = $('.wh-carousel-container').width();
    var inactiveWidth = containerWidth * 0.15; // Always 15% for inactive cards
    var gap = 16;
    var offset = index * (inactiveWidth + gap);

    var $track = $('#whCarouselTrack');

    if (instant) {
      // Disable transitions for an instant jump
      $track.css('transition', 'none');
      $allCards.css('transition', 'none');
      
      $track.css('transform', 'translateX(-' + offset + 'px)');
      
      // Force DOM reflow so the browser processes the 'none' transition
      $track[0].offsetHeight;
      
      // Restore default transitions
      $track.css('transition', '');
      $allCards.css('transition', '');
    } else {
      $track.css('transform', 'translateX(-' + offset + 'px)');
    }

    // Map 0-23 back to original 0-7 data index
    var originalIndex = index % totalOriginal;
    updateWhStory(originalIndex);
  }

  if ($('.wh-carousel-container').length) {
    var $track = $('#whCarouselTrack');
    var $originalCards = $track.children('.wh-card');
    
    // Clone cards to create 3 full sets (prev, current, next) to fill the track
    $originalCards.clone().appendTo($track);
    $originalCards.clone().appendTo($track);

    // Initialize in the middle set
    goToWhSlide(totalOriginal, true);

    $('#whPrev').on('click', function() {
      if (isWhAnimating) return;
      isWhAnimating = true;
      var target = whCurrentSlide - 1;
      goToWhSlide(target, false);
      
      // If we move into the first set, instantly jump forward after transition
      setTimeout(function() {
        if (target < totalOriginal) {
          goToWhSlide(target + totalOriginal, true);
        }
        isWhAnimating = false;
      }, 600); // 600ms matches the CSS transition time
    });

    $('#whNext').on('click', function() {
      if (isWhAnimating) return;
      isWhAnimating = true;
      var target = whCurrentSlide + 1;
      goToWhSlide(target, false);
      
      // If we move into the third set, instantly jump backward after transition
      setTimeout(function() {
        if (target >= totalOriginal * 2) {
          goToWhSlide(target - totalOriginal, true);
        }
        isWhAnimating = false;
      }, 600);
    });

    // Click on slide to navigate
    $(document).on('click', '#whCarouselTrack .wh-card', function() {
      if (isWhAnimating) return;
      var idx = $(this).index();
      if (idx !== whCurrentSlide) {
        isWhAnimating = true;
        goToWhSlide(idx, false);
        
        setTimeout(function() {
          if (idx >= totalOriginal * 2) {
            goToWhSlide(idx - totalOriginal, true);
          } else if (idx < totalOriginal) {
            goToWhSlide(idx + totalOriginal, true);
          }
          isWhAnimating = false;
        }, 600);
      }
    });

    // Handle window resize
    $(window).on('resize', function() {
      goToWhSlide(whCurrentSlide, true); // Instant jump on resize
    });
  }

  /* ---- Mobile Menu Logic ---- */
  $('#mobileMenuOpen').on('click', function() {
    $('#mobileMenu').addClass('active');
    $('body').css('overflow', 'hidden'); // Prevent background scrolling
  });

  $('#mobileCloseBtn').on('click', function() {
    $('#mobileMenu').removeClass('active');
    $('body').css('overflow', '');
  });

  // Also close on overlay click outside body if we want, but currently it's full screen.
});

