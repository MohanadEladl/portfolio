/**
 * Portfolio – Mohanad ElAdl | script.js
 * Version 3.0 — Advanced Motion & Interactions
 */

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ─── 1. LOADING SCREEN ─── */
window.addEventListener('DOMContentLoaded', () => {
  const loader = $('#loadingScreen');
  const body = document.body;
  body.style.overflow = 'hidden';

  setTimeout(() => {
    loader.classList.add('hidden');
    body.style.overflow = '';
    initTypewriter();
  }, 1500);
});

/* ─── 2. TYPEWRITER ANIMATION ─── */
function initTypewriter() {
  const nameTyped = $('#heroNameTyped');
  if (!nameTyped) return;

  const text = "Mohanad ElAdl";
  let i = 0;

  function type() {
    if (i < text.length) {
      nameTyped.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        $('.name-cursor').style.display = 'none';
        initRoleTyper();
      }, 500);
    }
  }
  type();
}

function initRoleTyper() {
  const typedSpan = $('#typedText');
  const roles = ["Engineer", "Researcher", "Innovator"];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function loop() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(loop, typeSpeed);
  }
  loop();
}

/* ─── 3. CURSOR TRAIL ─── */
function initCursorTrail() {
  const canvas = $('#cursorCanvas');
  if (!canvas || window.innerWidth < 768) return;
  const ctx = canvas.getContext('2d');

  let points = [];
  const maxPoints = 20;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('mousemove', (e) => {
    points.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (points.length > maxPoints) points.shift();
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update point ages and remove old points
    for (let i = 0; i < points.length; i++) {
      points[i].age++;
    }
    points = points.filter(p => p.age < 30); // Points last ~0.5s at 60fps

    if (points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const prev = points[i - 1];

        // Final opacity is a mix of its position in trail and its age
        const ageOpacity = 1 - (point.age / 30);
        const trailOpacity = i / points.length;
        const opacity = ageOpacity * trailOpacity;

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.lineWidth = i * 0.8 * ageOpacity;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}
initCursorTrail();

/* ─── 4. NEURON PARTICLE NETWORK ─── */
function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 100;

  window.addEventListener('resize', () => {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    particles = [];
    createParticles();
  });
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = 1.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.fill();
    }
  }

  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}
initParticles();

/* ─── 5. PARALLAX EFFECT ─── */
window.addEventListener('scroll', () => {
  const scroll = window.pageYOffset;
  const heroBg = $('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scroll * 0.5}px)`;
  }
});

/* ─── 6. SCROLL REVEAL ─── */
const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

$$('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 7. NAVBAR SCROLL ─── */
window.addEventListener('scroll', () => {
  const nav = $('.navbar');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ─── 8. MOBILE NAV ─── */
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

/* ─── 9. CONTACT FORM ─── */
const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = $('#submitBtn');
    const success = $('#formSuccess');
    btn.textContent = "Sending...";
    setTimeout(() => {
      btn.textContent = "Send Message";
      success.textContent = "Message sent successfully!";
      success.style.color = "var(--clr-blue)";
      contactForm.reset();
    }, 1500);
  });
}
