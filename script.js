// ===== PASSWORD PROTECTION =====
const PASSWORD = 'wedding2026';
const overlay  = document.getElementById('password-overlay');
const pwInput  = document.getElementById('password-input');
const pwError  = document.getElementById('password-error');

if (sessionStorage.getItem('wedding_auth') === 'true') {
  overlay.classList.add('hidden');
}

document.getElementById('password-form').addEventListener('submit', e => {
  e.preventDefault();
  if (pwInput.value.trim() === PASSWORD) {
    sessionStorage.setItem('wedding_auth', 'true');
    overlay.classList.add('hidden');
    pwError.textContent = '';
  } else {
    pwError.textContent = 'Incorrect password. Please try again.';
    pwInput.value = '';
    pwInput.focus();
  }
});

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const wedding = new Date('2026-08-29T14:00:00');
  const now     = new Date();
  const diff    = wedding - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent    = '0';
    document.getElementById('cd-hours').textContent   = '0';
    document.getElementById('cd-minutes').textContent = '0';
    document.getElementById('cd-seconds').textContent = '0';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent    = days;
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== FLOATING HEARTS =====
const emojis  = ['💕', '🌸', '✨', '💛', '🌿', '💖'];
const heroEl  = document.querySelector('.floating-hearts');

for (let i = 0; i < 20; i++) {
  const el = document.createElement('span');
  el.classList.add('heart');
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left            = Math.random() * 100 + '%';
  el.style.animationDuration = (8 + Math.random() * 12) + 's';
  el.style.animationDelay    = (Math.random() * 10) + 's';
  el.style.fontSize          = (0.7 + Math.random() * 0.9) + 'rem';
  heroEl.appendChild(el);
}

// ===== STICKY NAV SHADOW =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // toggle current
    if (!isOpen) item.classList.add('open');
  });
});
