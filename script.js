/**
 * Portfolio – Mohanad ElAdl | script.js
 * Handles: navbar scroll, mobile menu, typed text, particle canvas,
 *          scroll reveal, skill bar animation, contact form validation.
 */

/* ─── Helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── 1. NAVBAR ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar   = $('.navbar');
  const toggle   = $('#navToggle');
  const menu     = $('#navMenu');
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
  const el    = $('#typedText');
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

/* ─── 3. PARTICLE CANVAS ─────────────────────────────────── */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const COLORS = ['rgba(56,189,248,', 'rgba(168,85,247,', 'rgba(6,182,212,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.op = Math.random() * 0.6 + 0.2;
      this.fade = Math.random() * 0.003 + 0.001;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      this.op -= this.fade;
      if (this.op <= 0 || this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.op + ')';
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initPar() {
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    // Draw connecting lines
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56,189,248,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      p.update();
      p.draw();
    });
    animId = requestAnimationFrame(loop);
  }

  // Pause when hero not visible (performance)
  const hero = document.getElementById('home');
  const obs  = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animId = animId || requestAnimationFrame(loop); }
    else { cancelAnimationFrame(animId); animId = null; }
  }, { threshold: 0 });
  obs.observe(hero);

  window.addEventListener('resize', () => { resize(); initPar(); }, { passive: true });
  resize();
  initPar();
  animId = requestAnimationFrame(loop);
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
  const form    = $('#contactForm');
  if (!form) return;
  const nameEl  = $('#name');
  const emailEl = $('#email');
  const msgEl   = $('#message');
  const submitBtn   = $('#submitBtn');
  const successDiv  = $('#formSuccess');

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
    const id  = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
