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

// Contact form — kirim ke email lewat Web3Forms
// PENTING: ganti nilai di bawah ini dengan Access Key gratis dari https://web3forms.com
// (klik "Create Access Key", masukkan email rizqibarakahabadi@gmail.com, key dikirim ke email itu)
const WEB3FORMS_ACCESS_KEY = "a21ba7d9-30da-4b7d-8183-81a994e4cbbc";

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.length < 10) {
    formNote.textContent = 'Form belum aktif — Access Key Web3Forms belum dipasang di script.js.';
    return;
  }

  submitBtn.disabled = true;
  formNote.textContent = 'Mengirim permintaan...';

  const formData = new FormData(form);
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', 'Permintaan Pengadaan Baru — Website PT Rizqi Barakah Abadi');
  formData.append('from_name', 'Form Website RBA');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      formNote.textContent = 'Terkirim! Kami akan segera menghubungi Anda.';
      form.reset();
    } else {
      formNote.textContent = 'Gagal mengirim. Silakan coba lagi atau hubungi kami langsung lewat email.';
    }
  } catch (error) {
    formNote.textContent = 'Terjadi kesalahan jaringan. Silakan coba lagi.';
  } finally {
    submitBtn.disabled = false;
  }
});
