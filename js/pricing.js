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
          {
            type: 'row', fields: [
              { label: 'Expiry Date', placeholder: 'MM / YY' },
              { label: 'CVC', placeholder: '123', hasLock: true }
            ]
          },
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
          {
            type: 'row', fields: [
              { label: 'Vor- und Nachname', placeholder: 'Max Mustermann' },
              { label: 'Land', placeholder: 'Deutschland' }
            ]
          },
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
          {
            type: 'row', fields: [
              { label: 'Expiry Date', placeholder: 'MM / YY' },
              { label: 'CVC', placeholder: '123', hasLock: true }
            ]
          },
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
          {
            type: 'row', fields: [
              { label: 'Fecha de vencimiento', placeholder: 'MM / AA' },
              { label: 'CVV', placeholder: '123', hasLock: true }
            ]
          },
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
    data.methods.forEach(function (m, i) {
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

    html += '<div class="gp-form-header">';
    html += '<div class="gp-form-header-icon"><i class="bi ' + f.headerIcon + '"></i></div>';
    html += '<div>';
    html += '<div class="gp-form-header-text">' + f.header + '</div>';
    if (f.headerSub) html += '<div class="gp-form-header-sub">' + f.headerSub + '</div>';
    html += '</div></div>';

    f.fields.forEach(function (field) {
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
        field.fields.forEach(function (rf) {
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

    if (f.checkbox) {
      html += '<div class="gp-checkbox-row"><input type="checkbox" checked><span>' + f.checkbox + '</span></div>';
    }

    if (f.altMethods && f.altMethods.length) {
      html += '<div class="gp-pay-methods">';
      f.altMethods.forEach(function (m) {
        html += '<div class="gp-pay-method-row">';
        html += '<div class="gp-pay-method-icon" style="background:' + m.iconBg + ';color:' + m.iconColor + '"><i class="bi ' + m.icon + '"></i></div>';
        html += '<div><div class="gp-pay-method-name">' + m.name + '</div>';
        if (m.desc) html += '<div class="gp-pay-method-desc">' + m.desc + '</div>';
        html += '</div></div>';
      });
      html += '</div>';
    }

    html += '<button class="gp-pay-btn">' + f.btnText + '</button>';

    $('#gpFormCard').css('opacity', 0);
    $('#gpFormCard').html(html);
    setTimeout(function () { $('#gpFormCard').css('opacity', 1); }, 50);
  }

  if ($('#gpCountryTabs').length) {
    renderGPMethods('us');
    renderGPForm('us');

    $(document).on('click', '.gp-tab', function () {
      var country = $(this).data('country');
      $('.gp-tab').removeClass('active');
      $(this).addClass('active');
      renderGPMethods(country);
      renderGPForm(country);
    });
  }

});
