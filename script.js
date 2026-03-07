/**
 * Portfolio – Mohanad ElAdl | script.js
 * Handles: navbar scroll, mobile menu, typed text,
 *          scroll reveal, skill bar animation, contact form validation.
 */

/* ─── Helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── 1. NAVBAR ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = $('.navbar');
  const toggle = $('#navToggle');
  const menu = $('#navMenu');
  const navLinks = $$('.nav-link');

  // Scroll → add .scrolled class
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    // Active link highlighting
    const sections = $$('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ─── 2. TYPED TEXT ──────────────────────────────────────── */
(function initTyped() {
  const el = $('#typedText');
  if (!el) return;
  const words = ['Engineer', 'Researcher', 'Innovator', 'Builder'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
})();

/* ─── 4. SCROLL REVEAL ───────────────────────────────────── */
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
})();

/* ─── 5. SKILL BAR ANIMATION ──────────────────────────────── */
(function initSkillBars() {
  const fills = $$('.skill-fill');
  if (!fills.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(el => obs.observe(el));
})();

/* ─── 6. CONTACT FORM ────────────────────────────────────── */
(function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const nameEl = $('#name');
  const emailEl = $('#email');
  const msgEl = $('#message');
  const submitBtn = $('#submitBtn');
  const successDiv = $('#formSuccess');

  function showError(inputEl, errorId, msg) {
    inputEl.classList.add('error');
    document.getElementById(errorId).textContent = msg;
  }
  function clearError(inputEl, errorId) {
    inputEl.classList.remove('error');
    document.getElementById(errorId).textContent = '';
  }

  function validate() {
    let valid = true;
    clearError(nameEl, 'nameError');
    clearError(emailEl, 'emailError');
    clearError(msgEl, 'messageError');

    if (!nameEl.value.trim()) {
      showError(nameEl, 'nameError', 'Please enter your name.');
      valid = false;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim()) {
      showError(emailEl, 'emailError', 'Please enter your email address.');
      valid = false;
    } else if (!emailRx.test(emailEl.value.trim())) {
      showError(emailEl, 'emailError', 'Please enter a valid email address.');
      valid = false;
    }
    if (!msgEl.value.trim()) {
      showError(msgEl, 'messageError', 'Please enter a message.');
      valid = false;
    } else if (msgEl.value.trim().length < 10) {
      showError(msgEl, 'messageError', 'Message must be at least 10 characters.');
      valid = false;
    }
    return valid;
  }

  // Live validation on blur
  [nameEl, emailEl, msgEl].forEach(el => {
    el.addEventListener('blur', validate);
    el.addEventListener('input', () => el.classList.remove('error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate async submission
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      successDiv.textContent = '✓ Message sent! I will get back to you soon.';
      successDiv.classList.add('visible');
      setTimeout(() => successDiv.classList.remove('visible'), 5000);
    }, 1400);
  });
})();

/* ─── 7. SMOOTH SCROLL for older browsers ─────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
