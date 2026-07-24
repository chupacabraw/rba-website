// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal (staggered within each section)
const revealItems = document.querySelectorAll('.reveal-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = Array.from(el.parentElement.children)
        .filter(c => c.classList.contains('reveal-item'))
        .indexOf(el) * 80;
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => observer.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(open => {
      if (open !== item) {
        open.classList.remove('is-open');
        open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (placeholder — no backend yet in Tahap 1)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Form ini belum terhubung ke backend. Tahap berikutnya: hubungkan ke Cloudflare Worker atau layanan form pihak ketiga.';
});
