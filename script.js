/* ═══════════════════════════════════════════════
   AARAV BHUTA — FOOTBALL PORTFOLIO
   JavaScript Functionality
═══════════════════════════════════════════════ */

// ── DOM Elements ────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modal-video');
const modalTitle = document.getElementById('modal-title');

// ── Navbar Scroll Effect ────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile Menu Toggle ──────────────────────
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Reveal Animation on Scroll ─────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ── Number Counter Animation ───────────────
const countElements = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      const targetStr = entry.target.dataset.target;
      const target = parseInt(targetStr);
      const suffix = targetStr.replace(/^\d+/, ''); // Extract suffix like '+'
      let current = 0;
      const increment = Math.ceil(target / 50);
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        entry.target.textContent = current + suffix;
      }, 30);
      
      entry.target.dataset.counted = 'true';
    }
  });
}, { threshold: 0.5 });

countElements.forEach(el => {
  counterObserver.observe(el);
});

// ── Video Modal ─────────────────────────────
function openModal(videoSrc, title) {
  modalVideo.src = videoSrc;
  modalTitle.textContent = title;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  // Close if clicking outside the modal box or on the close button
  if (!event || event.target === modal || event.target.classList.contains('modal-close')) {
    modal.classList.remove('open');
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

// ── Smooth Scroll for Anchor Links ─────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ── Photo Album Continuous Loop ────────────
window.addEventListener('load', () => {
  const photoSlide = document.querySelector('.slides');
  if (photoSlide) {
    photoSlide.innerHTML += photoSlide.innerHTML;
  }
});
