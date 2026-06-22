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

  $('.code-tabs .nav-link').on('click', function () {
    $($(this).data('bs-target')).find('.code-block').css('opacity', 0).animate({ opacity: 1 }, 400);
  });
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

    if (index < 0) index = 0;
    if (index >= $allCards.length) index = $allCards.length - 1;

    whCurrentSlide = index;

    $allCards.removeClass('active');
    $allCards.eq(index).addClass('active');

    var containerWidth = $('.wh-carousel-container').width();
    var inactiveWidth = containerWidth * 0.15;
    var gap = 16;
    var offset = index * (inactiveWidth + gap);

    var $track = $('#whCarouselTrack');

    if (instant) {
      $track.css('transition', 'none');
      $allCards.css('transition', 'none');

      $track.css('transform', 'translateX(-' + offset + 'px)');

      $track[0].offsetHeight;

      $track.css('transition', '');
      $allCards.css('transition', '');
    } else {
      $track.css('transform', 'translateX(-' + offset + 'px)');
    }

    var originalIndex = index % totalOriginal;
    updateWhStory(originalIndex);
  }

  if ($('.wh-carousel-container').length) {
    var $track = $('#whCarouselTrack');
    var $originalCards = $track.children('.wh-card');

    $originalCards.clone().appendTo($track);
    $originalCards.clone().appendTo($track);

    goToWhSlide(totalOriginal, true);

    $('#whPrev').on('click', function () {
      if (isWhAnimating) return;
      isWhAnimating = true;
      var target = whCurrentSlide - 1;
      goToWhSlide(target, false);

      setTimeout(function () {
        if (target < totalOriginal) {
          goToWhSlide(target + totalOriginal, true);
        }
        isWhAnimating = false;
      }, 600);
    });

    $('#whNext').on('click', function () {
      if (isWhAnimating) return;
      isWhAnimating = true;
      var target = whCurrentSlide + 1;
      goToWhSlide(target, false);

      setTimeout(function () {
        if (target >= totalOriginal * 2) {
          goToWhSlide(target - totalOriginal, true);
        }
        isWhAnimating = false;
      }, 600);
    });

    $(document).on('click', '#whCarouselTrack .wh-card', function () {
      if (isWhAnimating) return;
      var idx = $(this).index();
      if (idx !== whCurrentSlide) {
        isWhAnimating = true;
        goToWhSlide(idx, false);

        setTimeout(function () {
          if (idx >= totalOriginal * 2) {
            goToWhSlide(idx - totalOriginal, true);
          } else if (idx < totalOriginal) {
            goToWhSlide(idx + totalOriginal, true);
          }
          isWhAnimating = false;
        }, 600);
      }
    });

    $(window).on('resize', function () {
      goToWhSlide(whCurrentSlide, true);
    });
  }

});
