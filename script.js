/**
 * Portfolio – Mohanad ElAdl | script.js
 * Features: loading screen, hero name typewriter, role typed text,
 *           cursor trail, particle canvas, parallax, scroll reveal,
 *           navbar scroll, mobile menu, contact form validation.
 */

/* ─── Helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── 1. LOADING SCREEN ──────────────────────────────────── */
(function initLoader() {
  const screen = $('#loadingScreen');
  if (!screen) return;

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';

  const hideLoader = () => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
    // Kick off hero name typewriter after loader fades out
    setTimeout(initHeroNameTyper, 400);
  };

  if (prefersReducedMotion()) {
    // Instantly hide for users who prefer no motion
    screen.style.display = 'none';
    document.body.style.overflow = '';
    initHeroNameTyper();
    return;
  }

  setTimeout(hideLoader, 1600);
})();

/* ─── 2. HERO NAME TYPEWRITER ────────────────────────────── */
function initHeroNameTyper() {
  const el = $('#heroNameTyped');
  const cursor = $('.name-cursor');
  if (!el) return;

  const name = 'Mohanad ElAdl';
  let i = 0;

  if (prefersReducedMotion()) {
    el.textContent = name;
    if (cursor) cursor.classList.add('hidden');
    initRoleTyper();
    return;
  }

  function typeChar() {
    if (i <= name.length) {
      el.textContent = name.slice(0, i);
      i++;
      setTimeout(typeChar, i === 1 ? 200 : 80 + Math.random() * 40);
    } else {
      // Hide name cursor, start role typer
      setTimeout(() => {
        if (cursor) cursor.classList.add('hidden');
        initRoleTyper();
      }, 300);
    }
  }
  typeChar();
}

/* ─── 3. ROLE TYPED TEXT ─────────────────────────────────── */
function initRoleTyper() {
  const el = $('#typedText');
  if (!el) return;
  const words = ['Engineer', 'Researcher', 'Innovator', 'Builder'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        setTimeout(() => { deleting = true; type(); }, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55 : 100);
  }
  type();
}

/* ─── 4. NAVBAR ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = $('.navbar');
  const toggle = $('#navToggle');
  const menu = $('#navMenu');
  const navLinks = $$('.nav-link');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    const sections = $$('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ─── 5. CURSOR TRAIL ────────────────────────────────────── */
(function initCursorTrail() {
  const canvas = $('#cursorCanvas');
  if (!canvas || prefersReducedMotion()) return;
  // Also skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H;
  const points = [];
  const MAX_POINTS = 18;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize, { passive: true });
  resize();

  let mx = -999, my = -999;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    points.push({ x: mx, y: my, age: 0 });
    if (points.length > MAX_POINTS) points.shift();
  }, { passive: true });

  const TRAIL_COLORS = [
    [56, 189, 248],   // blue
    [168, 85, 247],   // purple
    [6, 182, 212],    // cyan
  ];

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 1; i < points.length; i++) {
      const p = points[i - 1];
      const q = points[i];
      const t = i / points.length;
      const ci = Math.floor(t * TRAIL_COLORS.length) % TRAIL_COLORS.length;
      const [r, g, b] = TRAIL_COLORS[ci];
      const alpha = t * 0.55;
      const width = t * 4;

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    // Age out points
    for (const pt of points) pt.age++;
    while (points.length && points[0].age > 35) points.shift();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ─── 6. PARTICLE CANVAS (Hero network) ─────────────────── */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const COLORS = ['rgba(56,189,248,', 'rgba(168,85,247,', 'rgba(6,182,212,'];
  // Fewer particles on mobile for performance
  const COUNT = window.innerWidth < 768 ? 40 : 75;

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : Math.random() * H;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.op = Math.random() * 0.5 + 0.2;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.op + ')';
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initPar() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  const CONNECT_DIST = window.innerWidth < 768 ? 80 : 120;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56,189,248,${0.1 * (1 - dist / CONNECT_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
      p.update();
      p.draw();
    });
    animId = requestAnimationFrame(loop);
  }

  // Pause when hero not visible (save GPU)
  const hero = $('#home');
  if (hero) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animId = animId || requestAnimationFrame(loop); }
      else { cancelAnimationFrame(animId); animId = null; }
    }, { threshold: 0 });
    obs.observe(hero);
  }

  window.addEventListener('resize', () => { resize(); initPar(); }, { passive: true });
  resize();
  initPar();
  animId = requestAnimationFrame(loop);
})();

/* ─── 7. PARALLAX HERO BACKGROUND ───────────────────────── */
(function initParallax() {
  const heroBg = $('.hero-bg');
  if (!heroBg || prefersReducedMotion()) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only apply while hero is in view
        if (scrollY < window.innerHeight * 1.5) {
          heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── 8. SCROLL REVEAL ───────────────────────────────────── */
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
})();

/* ─── 9. CONTACT FORM ────────────────────────────────────── */
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

  [nameEl, emailEl, msgEl].forEach(el => {
    el.addEventListener('blur', validate);
    el.addEventListener('input', () => el.classList.remove('error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

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

/* ─── 10. SMOOTH SCROLL ──────────────────────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
