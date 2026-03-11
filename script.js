// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== Mobile menu toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', !isHidden);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ===== Intersection Observer for scroll-in animations =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.section-reveal').forEach((el) => {
  observer.observe(el);
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Active nav highlight on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active', 'text-white');
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => navObserver.observe(section));

// ===== Hero Typewriter Effect =====
(function() {
  const el     = document.getElementById('hero-typewriter');
  const cursor = document.querySelector('.typewriter-cursor');
  const text   = 'AI Office';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i === text.length) {
      clearInterval(timer);
      cursor.classList.add('done');
    }
  }, 110);
})();

// ===== Hero Particle System =====
(function() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLORS = ['rgba(99,102,241,','rgba(139,92,246,','rgba(236,72,153,','rgba(96,165,250,'];
  let particles = [];
  let W, H;
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function randomParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.1, da: (Math.random() - 0.5) * 0.008,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }
  function init() {
    resize();
    const COUNT = Math.floor((W * H) / 8000);
    particles = Array.from({ length: COUNT }, randomParticle);
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.a += p.da;
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;
      if (p.a > 0.7 || p.a < 0.1) p.da *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a.toFixed(2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
  init(); draw();
})();
