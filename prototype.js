(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const FREE_LIMIT = 3; // number of free articles before the wall (supports 1–6+)
  const state = { brand: 'dh', theme: 'dark', version: 'v1', article: 0, signedIn: false, method: 'mobile', dismissed: false, revealed: false };
  const headlines = [
    'Tendulkar-Anderson Trophy: New-look Team India ready for the big test',
    'Shubman Gill to lead with a plan: a new chapter for Indian cricket',
    'Bowling in pairs: India’s biggest strength in England',
    'The next generation steps up as India looks to the future'
  ];
  const kannadaHeadlines = [
    'ಭಾರತ ಕ್ರಿಕೆಟ್ ತಂಡಕ್ಕೆ ಹೊಸ ಅಧ್ಯಾಯ: ಯುವ ಆಟಗಾರರಿಗೆ ದೊಡ್ಡ ಸವಾಲು',
    'ಶುಭಮನ್ ಗಿಲ್ ನಾಯಕತ್ವದಲ್ಲಿ ಹೊಸ ಭರವಸೆಯೊಂದಿಗೆ ಭಾರತ',
    'ಇಂಗ್ಲೆಂಡ್ ಪ್ರವಾಸ: ಭಾರತದ ಬೌಲಿಂಗ್ ಪಡೆಯ ಮೇಲೆ ನಿರೀಕ್ಷೆ',
    'ಭಾರತೀಯ ಕ್ರಿಕೆಟ್: ಮುಂದಿನ ಪೀಳಿಗೆಯ ಆಟಗಾರರಿಗೆ ಅವಕಾಶ'
  ];
  // ---- Brand/language copy (dh = English, pv = Kannada) ----
  const copy = {
    dh: {
      brand_name: 'Deccan Herald',
      nav_home: 'Home', nav_india: 'India', nav_karnataka: 'Karnataka', nav_opinion: 'Opinion', nav_sports: 'Sports', nav_business: 'Business', nav_ent: 'Entertainment',
      login: 'Log in', my_account: 'My account ✓', email: 'Email',
      counter_tail: 'Log in for unlimited access', counter_close: 'Dismiss article counter',
      counter_left: 'free articles left', counter_left1: 'free article left',
      crumbs: 'Home › Sports › <b>Cricket</b>',
      deck: 'A new captain. A new generation. India’s young squad looks ahead to its next chapter.',
      byline: 'By Sidney Kiran &nbsp;·&nbsp; Updated 03 Nov 2026, 09:38 IST',
      hero_label: 'THE NEXT INNINGS', hero_cap: 'CRICKET · INDIA IN ENGLAND',
      free_account: 'FREE ACCOUNT', wall_title: 'There’s more to the story.',
      wall_lede: 'You’ve read your {n} free articles. Enter your mobile number to keep reading {brand} — free.',
      wall_lede_login: 'You’ve read your {n} free articles. Log in to keep reading {brand} — free.',
      mobile_number: 'Mobile number', ph_mobile: 'Enter mobile number', err_phone: 'Enter a valid 10-digit mobile number',
      send_otp_arrow: 'Send OTP', send_otp: 'Send OTP', already_member: 'Already a member?',
      wall_hint: 'We’ll text a one-time code — no password, no spam.',
      perks_head: 'What You\'ll Get:', perks: ['Unlimited free articles', 'Join the conversation', 'Newsletters for you'],
      keep_reading: 'Keep reading', next_read: 'Read next article →', next_locked: 'Log in to keep reading →',
      splash_tag: 'Stay curious.<br>Stay informed.<br>Stay with us.',
      splash_note: 'Independent journalism. Every perspective.<br>One free account opens it all.',
      explore_title: 'One login. The whole paper.',
      sections: ['India', 'Karnataka', 'Sports', 'Business', 'Opinion', 'Entertainment', 'Cricket', 'Technology'],
      since: 'SINCE 1948',
      statement: 'Journalism that holds power to account.',
      statement_sub: 'Free, with a quick login.',
      auth_title_mobile: 'Your next story awaits.', auth_title_email: 'Continue with email',
      auth_title_otp_phone: 'Check your phone', auth_title_otp_inbox: 'Check your inbox',
      auth_intro_mobile: 'Log in or create a free account with your mobile number.',
      auth_intro_email: 'We’ll send a verification code to your inbox.',
      auth_intro_otp: 'One quick step, and you’re back to the story.',
      tab_mobile: 'Mobile', otp_hint: 'We\'ll text you a 6-digit code to verify your number.',
      email_address: 'Email address', ph_email: 'Enter email id', err_email: 'Enter a valid email address',
      send_code: 'Send verification code', use_mobile: 'Use mobile number instead', other_ways: 'other ways to log in',
      google_demo: 'Google sign-in is simulated in this prototype.', demo_continue: 'Continue as demo reader →',
      otp_sent: 'Enter the 6-digit code sent to', edit: 'Edit', err_otp: 'Incorrect code. Try 123456 in this demo.',
      verify: 'Verify & Continue', resend_q: 'Didn’t get a code?', resend_in: 'Resend in {s}s', resend_code: 'Resend code',
      demo_otp: 'Prototype only · No code is sent. Use <b>123456</b>.',
      consent: 'I agree to receive marketing and promotional updates.',
      terms: 'By continuing, you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>.',
      foot: '<b>Your Login, Simplified</b> &nbsp;·&nbsp; One account for DH &amp; Prajavani',
      close_login: 'Close login',
      toast_login: 'You’re logged in. Keep exploring, it’s free.', toast_resent: 'A new code has been sent.'
    },
    pv: {
      brand_name: 'ಪ್ರಜಾವಾಣಿ',
      nav_home: 'ಮುಖಪುಟ', nav_india: 'ಭಾರತ', nav_karnataka: 'ಕರ್ನಾಟಕ', nav_opinion: 'ಅಭಿಪ್ರಾಯ', nav_sports: 'ಕ್ರೀಡೆ', nav_business: 'ವಾಣಿಜ್ಯ', nav_ent: 'ಮನರಂಜನೆ',
      login: 'ಲಾಗಿನ್', my_account: 'ನನ್ನ ಖಾತೆ ✓', email: 'ಇಮೇಲ್',
      counter_tail: 'ಅನಿಯಮಿತ ಓದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ', counter_close: 'ಲೇಖನ ಎಣಿಕೆ ಮುಚ್ಚಿ',
      counter_left: 'ಉಚಿತ ಲೇಖನಗಳು ಉಳಿದಿವೆ', counter_left1: 'ಉಚಿತ ಲೇಖನ ಉಳಿದಿದೆ',
      crumbs: 'ಮುಖಪುಟ › ಕ್ರೀಡೆ › <b>ಕ್ರಿಕೆಟ್</b>',
      deck: 'ಹೊಸ ನಾಯಕ. ಹೊಸ ಪೀಳಿಗೆ. ಭಾರತದ ಯುವ ತಂಡ ಮುಂದಿನ ಅಧ್ಯಾಯದತ್ತ ದೃಷ್ಟಿ ನೆಟ್ಟಿದೆ.',
      byline: 'ಸಿಡ್ನಿ ಕಿರಣ್ ಅವರಿಂದ &nbsp;·&nbsp; ನವೀಕರಣ 03 ನವೆಂ 2026, 09:38 IST',
      hero_label: 'ಮುಂದಿನ ಇನ್ನಿಂಗ್ಸ್', hero_cap: 'ಕ್ರಿಕೆಟ್ · ಇಂಗ್ಲೆಂಡ್‌ನಲ್ಲಿ ಭಾರತ',
      free_account: 'ಉಚಿತ ಖಾತೆ', wall_title: 'ಕಥೆಯಲ್ಲಿ ಇನ್ನಷ್ಟಿದೆ.',
      wall_lede: 'ನೀವು ನಿಮ್ಮ {n} ಉಚಿತ ಲೇಖನಗಳನ್ನು ಓದಿದ್ದೀರಿ. {brand} ಓದುವುದನ್ನು ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ — ಉಚಿತ.',
      wall_lede_login: 'ನೀವು ನಿಮ್ಮ {n} ಉಚಿತ ಲೇಖನಗಳನ್ನು ಓದಿದ್ದೀರಿ. {brand} ಓದುವುದನ್ನು ಮುಂದುವರಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ — ಉಚಿತ.',
      mobile_number: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', ph_mobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ', err_phone: 'ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
      send_otp_arrow: 'OTP ಕಳುಹಿಸಿ', send_otp: 'OTP ಕಳುಹಿಸಿ', already_member: 'ಈಗಾಗಲೇ ಸದಸ್ಯರೇ?',
      wall_hint: 'ಒಂದು-ಬಾರಿಯ ಕೋಡ್ ಕಳುಹಿಸುತ್ತೇವೆ — ಪಾಸ್‌ವರ್ಡ್ ಇಲ್ಲ, ಸ್ಪ್ಯಾಮ್ ಇಲ್ಲ.',
      perks_head: 'ನಿಮಗೆ ಸಿಗುವುದು:', perks: ['ಅನಿಯಮಿತ ಉಚಿತ ಲೇಖನಗಳು', 'ಚರ್ಚೆಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ', 'ನಿಮಗಾಗಿ ಸುದ್ದಿಪತ್ರಗಳು'],
      keep_reading: 'ಓದುವುದನ್ನು ಮುಂದುವರಿಸಿ', next_read: 'ಮುಂದಿನ ಲೇಖನ ಓದಿ →', next_locked: 'ಓದಲು ಲಾಗಿನ್ ಮಾಡಿ →',
      splash_tag: 'ಕುತೂಹಲದಿಂದಿರಿ.<br>ಮಾಹಿತಿಯುತವಾಗಿರಿ.<br>ನಮ್ಮೊಂದಿಗಿರಿ.',
      splash_note: 'ಸ್ವತಂತ್ರ ಪತ್ರಿಕೋದ್ಯಮ. ಪ್ರತಿ ದೃಷ್ಟಿಕೋನ.<br>ಒಂದು ಉಚಿತ ಖಾತೆ ಎಲ್ಲವನ್ನೂ ತೆರೆಯುತ್ತದೆ.',
      explore_title: 'ಒಂದು ಲಾಗಿನ್. ಇಡೀ ಪತ್ರಿಕೆ.',
      sections: ['ಭಾರತ', 'ಕರ್ನಾಟಕ', 'ಕ್ರೀಡೆ', 'ವಾಣಿಜ್ಯ', 'ಅಭಿಪ್ರಾಯ', 'ಮನರಂಜನೆ', 'ಕ್ರಿಕೆಟ್', 'ತಂತ್ರಜ್ಞಾನ'],
      since: '1948 ರಿಂದ',
      statement: 'ಅಧಿಕಾರವನ್ನು ಪ್ರಶ್ನಿಸುವ ಪತ್ರಿಕೋದ್ಯಮ.',
      statement_sub: 'ಉಚಿತ — ತ್ವರಿತ ಲಾಗಿನ್‌ನೊಂದಿಗೆ.',
      auth_title_mobile: 'ನಿಮ್ಮ ಮುಂದಿನ ಕಥೆ ಕಾಯುತ್ತಿದೆ.', auth_title_email: 'ಇಮೇಲ್‌ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ',
      auth_title_otp_phone: 'ನಿಮ್ಮ ಫೋನ್ ನೋಡಿ', auth_title_otp_inbox: 'ನಿಮ್ಮ ಇನ್‌ಬಾಕ್ಸ್ ನೋಡಿ',
      auth_intro_mobile: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ ಅಥವಾ ಉಚಿತ ಖಾತೆ ರಚಿಸಿ.',
      auth_intro_email: 'ನಿಮ್ಮ ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ಪರಿಶೀಲನಾ ಕೋಡ್ ಕಳುಹಿಸುತ್ತೇವೆ.',
      auth_intro_otp: 'ಒಂದು ಪುಟ್ಟ ಹೆಜ್ಜೆ, ಮತ್ತೆ ಕಥೆಗೆ ಮರಳಿ.',
      tab_mobile: 'ಮೊಬೈಲ್', otp_hint: 'ನಿಮ್ಮ ಸಂಖ್ಯೆ ಪರಿಶೀಲಿಸಲು 6-ಅಂಕಿಯ ಕೋಡ್ ಕಳುಹಿಸುತ್ತೇವೆ.',
      email_address: 'ಇಮೇಲ್ ವಿಳಾಸ', ph_email: 'ಇಮೇಲ್ ಐಡಿ ನಮೂದಿಸಿ', err_email: 'ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ',
      send_code: 'ಪರಿಶೀಲನಾ ಕೋಡ್ ಕಳುಹಿಸಿ', use_mobile: 'ಬದಲಿಗೆ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬಳಸಿ', other_ways: 'ಲಾಗಿನ್ ಮಾಡಲು ಇತರ ಮಾರ್ಗಗಳು',
      google_demo: 'ಈ ಪ್ರೊಟೊಟೈಪ್‌ನಲ್ಲಿ Google ಸೈನ್-ಇನ್ ಅನುಕರಣೆಯಾಗಿದೆ.', demo_continue: 'ಡೆಮೊ ಓದುಗರಾಗಿ ಮುಂದುವರಿಯಿರಿ →',
      otp_sent: 'ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿದ 6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ', edit: 'ಬದಲಿಸಿ', err_otp: 'ತಪ್ಪು ಕೋಡ್. ಈ ಡೆಮೊದಲ್ಲಿ 123456 ಬಳಸಿ.',
      verify: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ', resend_q: 'ಕೋಡ್ ಸಿಗಲಿಲ್ಲವೇ?', resend_in: '{s} ಸೆ.ನಲ್ಲಿ ಮರುಕಳುಹಿಸಿ', resend_code: 'ಕೋಡ್ ಮರುಕಳುಹಿಸಿ',
      demo_otp: 'ಪ್ರೊಟೊಟೈಪ್ ಮಾತ್ರ · ಯಾವ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿಲ್ಲ. <b>123456</b> ಬಳಸಿ.',
      consent: 'ಮಾರ್ಕೆಟಿಂಗ್ ಮತ್ತು ಪ್ರಚಾರ ಸಂದೇಶಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.',
      terms: 'ಮುಂದುವರಿಯುವ ಮೂಲಕ, ನೀವು ನಮ್ಮ <a href="#">ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು</a> ಹಾಗೂ <a href="#">ಗೌಪ್ಯತಾ ನೀತಿ</a>ಗೆ ಒಪ್ಪುತ್ತೀರಿ.',
      foot: '<b>ನಿಮ್ಮ ಲಾಗಿನ್, ಸರಳಗೊಳಿಸಲಾಗಿದೆ</b> &nbsp;·&nbsp; DH ಮತ್ತು ಪ್ರಜಾವಾಣಿಗೆ ಒಂದೇ ಖಾತೆ',
      close_login: 'ಲಾಗಿನ್ ಮುಚ್ಚಿ',
      toast_login: 'ನೀವು ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ. ಓದುವುದನ್ನು ಮುಂದುವರಿಸಿ, ಉಚಿತ.', toast_resent: 'ಹೊಸ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿದೆ.'
    }
  };
  const L = () => copy[state.brand];
  function applyI18n() {
    const d = L();
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = d[el.dataset.i18n]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = d[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { const v = d[el.dataset.i18nPh]; if (v != null) el.placeholder = v; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = d[el.dataset.i18nAria]; if (v != null) el.setAttribute('aria-label', v); });
  }
  let timer, toastTimer, opener;
  const locked = () => !state.signedIn && state.article >= FREE_LIMIT;
  function render() {
    const pv = state.brand === 'pv';
    const d = L();
    document.body.dataset.brand = state.brand;
    document.body.dataset.theme = state.theme;
    $('articleWall').dataset.version = state.version;
    const formVersion = state.version === 'v1' || state.version === 'v4'; // mobile-form versions
    document.querySelectorAll('#versionSeg button').forEach(b => {
      const selected = b.dataset.version === state.version;
      b.classList.toggle('on', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    $('wallLogin').hidden = formVersion;
    document.documentElement.lang = pv ? 'kn' : 'en';
    document.querySelectorAll('#themeSeg button').forEach(b => b.classList.toggle('on', b.dataset.theme === state.theme));
    applyI18n();
    document.querySelectorAll('#brandSeg button').forEach(b => {
      b.classList.toggle('on', b.dataset.brand === state.brand);
      b.setAttribute('aria-pressed', String(b.dataset.brand === state.brand));
    });
    $('siteLogo').querySelector('.mark').textContent = pv ? 'ಪ್ರಜಾವಾಣಿ' : 'DH';
    $('siteLogo').querySelector('.sub').textContent = pv ? 'PRAJAVANI' : 'DECCAN HERALD';
    $('articleTitle').textContent = (pv ? kannadaHeadlines : headlines)[state.article % 4];
    $('crumbs').innerHTML = d.crumbs;
    $('articleDeck').textContent = d.deck;
    $('byline').innerHTML = d.byline;
    $('heroLabel').textContent = d.hero_label;
    $('heroCap').textContent = d.hero_cap;
    const whiteLogo = pv ? 'assets/logos/pv-logo.svg' : 'assets/logos/dh-logo.svg';
    const brandLogo = pv ? 'assets/logos/pv-logo-brand.svg' : 'assets/logos/dh-logo-brand.svg';
    const wallLogoSrc = state.theme === 'light' ? brandLogo : whiteLogo; // brand-coloured in light, white on dark
    $('splashLogo').src = whiteLogo; $('splashLogo').alt = d.brand_name; // always white (dark heritage photos)
    ['wallLogo', 'illoLogo'].forEach(id => { $(id).src = wallLogoSrc; $(id).alt = d.brand_name; });
    $('splashSince').textContent = d.since;
    $('splashStatement').textContent = d.statement;
    $('splashStatementSub').textContent = d.statement_sub;
    $('wallLede').textContent = (formVersion ? d.wall_lede : d.wall_lede_login).replace('{brand}', d.brand_name).replace('{n}', FREE_LIMIT);
    $('perkList').innerHTML = d.perks.map(p => `<li><span aria-hidden="true">✓</span><span>${p}</span></li>`).join('');
    $('relatedGrid').innerHTML = (pv ? kannadaHeadlines : headlines).slice(1).map(h => `<button class="rel-card" data-next="1"><div class="thumb"></div><div class="t">${h}</div></button>`).join('');
    $('headerLogin').textContent = state.signedIn ? d.my_account : d.login;
    $('headerLogin').disabled = state.signedIn;
    const remaining = Math.max(FREE_LIMIT - state.article, 0);
    $('counterNum').textContent = remaining;
    $('counterCopy').textContent = remaining === 1 ? d.counter_left1 : d.counter_left;
    $('counterBar').classList.toggle('last', remaining === 1);
    $('counterBar').classList.toggle('hide', state.signedIn || locked() || state.dismissed || !state.revealed);
    $('stageLabel').textContent = state.signedIn ? 'Signed in · Full access' : locked() ? `Login required · Article ${FREE_LIMIT + 1}` : `Guest · Article ${state.article + 1} of ${FREE_LIMIT}`;
    $('fadeLock').classList.toggle('locked', locked());
    $('articleWall').classList.toggle('grid-hidden', !locked());
    $('nextBtn').textContent = locked() ? d.next_locked : d.next_read;
    const body = $('fadeLock');
    body.innerHTML = pv ? '<p>ತಂಡದಲ್ಲಿ ಬದಲಾವಣೆ ಸಹಜ. ಹಿರಿಯ ಆಟಗಾರರ ನಿರ್ಗಮನದ ನಂತರ ಯುವ ಆಟಗಾರರಿಗೆ ತಮ್ಮ ಸಾಮರ್ಥ್ಯ ತೋರಿಸಲು ಇದು ಉತ್ತಮ ಅವಕಾಶವಾಗಿದೆ.</p><p>ಶುಭಮನ್ ಗಿಲ್ ಮತ್ತು ಇತರ ಯುವ ಆಟಗಾರರ ಮೇಲೆ ತಂಡ ಹೆಚ್ಚಿನ ನಿರೀಕ್ಷೆ ಇಟ್ಟಿದೆ. ಹೊಸ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಲು ತಂಡ ಸಜ್ಜಾಗಿದೆ.</p><p>ಬೌಲಿಂಗ್ ವಿಭಾಗದ ಪ್ರದರ್ಶನ ಈ ಸರಣಿಯಲ್ಲಿ ನಿರ್ಣಾಯಕವಾಗಲಿದೆ. ಸಂಘಟಿತ ಆಟದ ಮೂಲಕ ಉತ್ತಮ ಫಲಿತಾಂಶ ಪಡೆಯುವುದು ತಂಡದ ಗುರಿಯಾಗಿದೆ.</p>' : '<p>Transitions are an inevitable part of team sports. While the exits of established players leave a major void, they also present an opportunity for the next generation to step up.</p><p>The onus will be on the likes of Shubman Gill, Yashasvi Jaiswal and Rishabh Pant to shoulder the batting responsibilities carried by the senior players who have moved on.</p><p>The bowling unit remains a source of strength, but managing workloads across a long series will be a defining challenge for the team management.</p>';
    $('articleIntro').textContent = pv ? 'ಇಂಗ್ಲೆಂಡ್ ವಿರುದ್ಧದ ಟೆಸ್ಟ್ ಸರಣಿಯಲ್ಲಿ ಯುವ ಭಾರತ ತಂಡಕ್ಕೆ ತನ್ನ ಸಾಮರ್ಥ್ಯ ಸಾಬೀತುಪಡಿಸುವ ಅವಕಾಶ ದೊರೆತಿದೆ.' : 'India enters a new era as a young squad prepares for the challenge of a five-match Test series in England.';
    body.querySelectorAll('p').forEach((paragraph, index) => {
      paragraph.hidden = locked() && index > 0;
    });
  }
  // Mobile keyboards resize the visual viewport, while fixed overlays can remain
  // anchored to the full page. Keep the sheet inside the unobscured area.
  let viewportHeight = window.innerHeight, viewportWidth = window.innerWidth;
  let viewportFrame;
  function updateLoginViewport() {
    const overlay = $('loginOverlay');
    const viewport = window.visualViewport;
    const mobile = matchMedia('(max-width: 720px)').matches;
    if (window.innerWidth !== viewportWidth) {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
    } else viewportHeight = Math.max(viewportHeight, window.innerHeight);
    const height = viewport?.height || window.innerHeight;
    overlay.style.setProperty('--login-viewport-height', `${height}px`);
    overlay.style.setProperty('--login-viewport-top', `${viewport?.offsetTop || 0}px`);
    const keyboardOpen = mobile && overlay.classList.contains('show') &&
      (!viewport || viewport.scale === 1) && viewportHeight - height > 120;
    overlay.classList.toggle('keyboard-open', keyboardOpen);
    cancelAnimationFrame(viewportFrame);
    viewportFrame = requestAnimationFrame(() => {
      if (!keyboardOpen || $('stepOtp').classList.contains('grid-hidden')) return;
      const sheet = overlay.querySelector('.login');
      if (!sheet.classList.contains('sheet-in')) return;
      const bounds = sheet.getBoundingClientRect();
      const fields = $('otpBoxes').getBoundingClientRect();
      const button = $('verifyOtp').getBoundingClientRect();
      // Scroll the sheet itself, keeping the OTP fields and action together.
      const bottom = Math.min(bounds.bottom, (viewport?.offsetTop || 0) + height) - 12;
      const top = Math.max(bounds.top, viewport?.offsetTop || 0) + 12;
      if (button.bottom > bottom) sheet.scrollTop += Math.min(button.bottom - bottom, Math.max(0, fields.top - top));
      else if (fields.top < top) sheet.scrollTop -= top - fields.top;
    });
  }
  window.visualViewport?.addEventListener('resize', updateLoginViewport);
  window.visualViewport?.addEventListener('scroll', updateLoginViewport);
  window.addEventListener('resize', updateLoginViewport);
  $('loginOverlay').addEventListener('focusin', updateLoginViewport);
  $('loginOverlay').querySelector('.login').addEventListener('transitionend', updateLoginViewport);
  function hideDialogs(restore = false) {
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.login').forEach(el => { el.classList.remove('sheet-in'); el.style.transform = ''; el.style.transition = ''; });
    document.body.style.overflow = '';
    document.querySelector('main').inert = false;
    clearInterval(timer);
    if (restore && opener?.isConnected) opener.focus();
    updateLoginViewport();
  }
  function show(id, initialFocus) {
    hideDialogs();
    opener = document.activeElement;
    $(id).classList.add('show');
    updateLoginViewport();
    document.body.style.overflow = 'hidden';
    document.querySelector('main').inert = true;
    // Mobile sheet: slide up smoothly. Lay it off-screen, let the browser settle, then transition in.
    const sheet = $(id).querySelector('.login');
    if (sheet) { void sheet.offsetHeight; requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('sheet-in'))); }
    // Focusing an off-screen sheet must not scroll its overlay into view early.
    requestAnimationFrame(() => (initialFocus || $(id).querySelector('input:not([hidden]), button')).focus({ preventScroll: true }));
  }
  // Simulated network latency so submit actions show a spinner (and block double-taps).
  function withBusy(btn, done) {
    if (btn.classList.contains('btn-loading')) return;
    btn.classList.add('btn-loading'); btn.disabled = true;
    setTimeout(() => { btn.classList.remove('btn-loading'); btn.disabled = false; done(); }, 900);
  }
  function setMethod(method) {
    state.method = method;
    $('mobilePane').classList.toggle('grid-hidden', method !== 'mobile');
    $('emailPane').classList.toggle('grid-hidden', method !== 'email');
    $('emailOption').classList.toggle('grid-hidden', method === 'email');
    $('mobileSwitch').classList.toggle('grid-hidden', method !== 'email');
    $('stepEnter').classList.remove('grid-hidden');
    $('stepOtp').classList.add('grid-hidden');
    $('authTitle').textContent = method === 'mobile' ? L().auth_title_mobile : L().auth_title_email;
    $('authIntro').textContent = method === 'mobile' ? L().auth_intro_mobile : L().auth_intro_email;
    document.querySelectorAll('.err-msg').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.err').forEach(el => el.classList.remove('err'));
    clearInterval(timer);
  }
  function login() { setMethod('mobile'); show('loginOverlay'); }
  function closeLogin() { hideDialogs(true); }
  function next() {
    if (locked()) { login(); return; }
    state.article++;
    state.dismissed = false;
    armReveal(); // each article re-earns the counter (matches real per-page loads)
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $('brandSeg').onclick = e => { const b = e.target.closest('[data-brand]'); if (b) { state.brand = b.dataset.brand; render(); } };
  $('themeSeg').onclick = e => { const b = e.target.closest('[data-theme]'); if (b) { state.theme = b.dataset.theme; render(); } };
  $('versionSeg').onclick = e => { const b = e.target.closest('[data-version]'); if (b) { state.version = b.dataset.version; render(); } };
  $('nextBtn').onclick = next;
  $('relatedGrid').onclick = e => { if (e.target.closest('[data-next]')) next(); };
  ['counterLogin', 'headerLogin', 'nudgeLogin', 'wallLogin'].forEach(id => $(id).onclick = login);
  // Inline phone capture on the article-4 wall -> opens the focused modal straight on the OTP step.
  function openOtpStep(method, value, target) {
    state.method = method;
    $(method === 'mobile' ? 'phoneInput' : 'emailInput').value = value;
    setMethod(method);
    show('loginOverlay', inputs[0]);
    otp(target);
  }
  $('wallPhone').oninput = e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); $('wallPhoneErr').classList.remove('show'); $('wallPhoneRow').classList.remove('err'); };
  $('wallPhone').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); $('wallSendOtp').click(); } };
  $('wallSendOtp').onclick = () => {
    const number = $('wallPhone').value;
    const valid = /^[6-9]\d{9}$/.test(number);
    $('wallPhoneErr').classList.toggle('show', !valid);
    $('wallPhoneRow').classList.toggle('err', !valid);
    if (valid) withBusy($('wallSendOtp'), () => openOtpStep('mobile', number, '+91 ' + number.slice(0, 5) + ' ' + number.slice(5)));
  };
  $('wallGoogle').onclick = success;
  $('wallEmail').onclick = () => { login(); setMethod('email'); $('emailInput').focus(); };
  $('counterClose').onclick = () => { state.dismissed = true; render(); };
  $('loginClose').onclick = closeLogin;
  $('loginOverlay').onclick = e => { if (e.target === $('loginOverlay')) closeLogin(); };
  // Mobile bottom-sheet: drag the heritage band / handle down to dismiss.
  (() => {
    const sheet = document.querySelector('.login');
    const grip = sheet.querySelector('.splash');
    let startY = null, dy = 0;
    const mobile = () => matchMedia('(max-width: 720px)').matches;
    grip.addEventListener('pointerdown', e => {
      if (!mobile()) return;
      startY = e.clientY; dy = 0;
      sheet.style.transition = 'none';
      grip.setPointerCapture(e.pointerId);
    });
    grip.addEventListener('pointermove', e => {
      if (startY === null) return;
      dy = Math.max(0, e.clientY - startY);
      sheet.style.transform = `translateY(${dy}px)`;
    });
    const end = () => {
      if (startY === null) return;
      const close = dy > 110;
      sheet.style.transition = 'transform .28s cubic-bezier(.3,.8,.35,1)';
      sheet.style.transform = close ? 'translateY(100%)' : 'translateY(0)';
      if (close) setTimeout(() => { sheet.style.transition = ''; sheet.style.transform = ''; closeLogin(); }, 260);
      else setTimeout(() => { sheet.style.transition = ''; sheet.style.transform = ''; }, 280);
      startY = null;
    };
    grip.addEventListener('pointerup', end);
    grip.addEventListener('pointercancel', end);
  })();
  $('emailOption').onclick = () => { setMethod('email'); $('emailInput').focus(); };
  $('mobileSwitch').onclick = () => { setMethod('mobile'); $('phoneInput').focus(); };
  const inputs = [...$('otpBoxes').querySelectorAll('input')];
  function clearCode() { inputs.forEach(i => i.value = ''); $('otpErr').classList.remove('show'); }
  function countdown() {
    clearInterval(timer);
    let remaining = 30;
    const button = $('resendLink');
    const update = () => { button.disabled = remaining > 0; button.textContent = remaining > 0 ? L().resend_in.replace('{s}', remaining) : L().resend_code; };
    update();
    timer = setInterval(() => { remaining--; update(); if (!remaining) clearInterval(timer); }, 1000);
  }
  function otp(target) {
    $('otpTarget').textContent = target;
    $('stepEnter').classList.add('grid-hidden');
    $('stepOtp').classList.remove('grid-hidden');
    $('authTitle').textContent = state.method === 'mobile' ? L().auth_title_otp_phone : L().auth_title_otp_inbox;
    $('authIntro').textContent = L().auth_intro_otp;
    clearCode();
    '123456'.split('').forEach((d, i) => { inputs[i].value = d; }); // demo: pre-fill code (set directly so auto-verify doesn't fire)
    countdown(); inputs[0].focus({ preventScroll: true }); inputs[0].select();
    updateLoginViewport();
  }
  $('phoneInput').oninput = e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); $('phoneErr').classList.remove('show'); $('phoneRow').classList.remove('err'); };
  $('sendOtp').onclick = () => {
    const number = $('phoneInput').value;
    const valid = /^[6-9]\d{9}$/.test(number);
    $('phoneErr').classList.toggle('show', !valid);
    $('phoneRow').classList.toggle('err', !valid);
    $('phoneInput').setAttribute('aria-invalid', String(!valid));
    if (valid) withBusy($('sendOtp'), () => otp('+91 ' + number.slice(0, 5) + ' ' + number.slice(5)));
  };
  $('emailContinue').onclick = () => {
    const email = $('emailInput').value.trim();
    const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    $('emailErr').classList.toggle('show', !valid);
    $('emailField').classList.toggle('err', !valid);
    if (valid) withBusy($('emailContinue'), () => otp(email));
  };
  $('otpEdit').onclick = () => { setMethod(state.method); $(state.method === 'mobile' ? 'phoneInput' : 'emailInput').focus(); };
  inputs.forEach((input, index) => {
    input.setAttribute('aria-label', `Verification code digit ${index + 1}`);
    input.oninput = () => { input.value = input.value.replace(/\D/g, '').slice(-1); $('otpErr').classList.remove('show'); if (input.value && index < 5) inputs[index + 1].focus(); if (inputs.every(i => i.value)) verify(); };
    input.onkeydown = e => { if (e.key === 'Backspace' && !input.value && index > 0) inputs[index - 1].focus(); };
    input.onpaste = e => { e.preventDefault(); const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); clearCode(); [...digits].forEach((digit, i) => inputs[i].value = digit); inputs[Math.min(digits.length, 5)].focus(); if (inputs.every(i => i.value)) verify(); };
  });
  $('resendLink').onclick = () => { clearCode(); countdown(); inputs[0].focus(); toast(L().toast_resent); };
  function toast(message) { $('toastMsg').textContent = message; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('show'), 4000); }
  function success() { state.signedIn = true; hideDialogs(true); render(); toast(L().toast_login); }
  function verify() { if (inputs.map(i => i.value).join('') === '123456') withBusy($('verifyOtp'), success); else { $('otpErr').classList.add('show'); clearCode(); inputs[0].focus(); } }
  $('verifyOtp').onclick = verify;
  $('googleBtn').onclick = success;
  function prefillDemo() { $('phoneInput').value = '9876543210'; $('emailInput').value = 'reader@example.com'; $('wallPhone').value = '9876543210'; } // demo: prefilled so the flow is click-through
  $('resetBtn').onclick = () => { state.article = 0; state.signedIn = false; state.dismissed = false; hideDialogs(); setMethod('mobile'); prefillDemo(); document.querySelectorAll('.js-consent').forEach(c => c.checked = true); $('toast').classList.remove('show'); window.scrollTo({ top: 0 }); armReveal(); render(); };
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('a[role="button"]')) { e.preventDefault(); e.target.click(); return; }
    const dialog = document.querySelector('.overlay.show');
    if (!dialog) return;
    if (e.key === 'Escape' && dialog.id === 'loginOverlay') closeLogin();
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); if (!$('stepOtp').classList.contains('grid-hidden')) $('verifyOtp').click(); else $(state.method === 'mobile' ? 'sendOtp' : 'emailContinue').click(); }
    if (e.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button, input, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Counter appears on first scroll (engaged reader), with a time fallback for non-scrollers.
  function revealCounter() { if (state.revealed) return; state.revealed = true; window.removeEventListener('scroll', onScroll); render(); }
  function onScroll() { if (window.scrollY > 420) revealCounter(); }
  function armReveal() { state.revealed = false; window.removeEventListener('scroll', onScroll); window.addEventListener('scroll', onScroll, { passive: true }); }
  prefillDemo();
  armReveal();
  render();
})();
