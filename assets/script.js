
// Sticky year
document.addEventListener('DOMContentLoaded', () => {
  const yearSpans = document.querySelectorAll('#year');
  const y = new Date().getFullYear();
  yearSpans.forEach(s => s.textContent = y);

  // Mobile menu toggle
  const header = document.querySelector('header .nav');
  const menuBtn = document.querySelector('.menu-button');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = header.getAttribute('data-open') === 'true';
      header.setAttribute('data-open', String(!open));
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Dropdown toggle
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', () => {
      const exp = dropdown.getAttribute('aria-expanded') === 'true';
      dropdown.setAttribute('aria-expanded', String(!exp));
      toggle.setAttribute('aria-expanded', String(!exp));
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' }) : null;
  document.querySelectorAll('.reveal').forEach(el => {
    if (io) io.observe(el); else el.classList.add('reveal-visible');
  });

  // Contact form validation (if present)
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const mailto = document.getElementById('mailto-fallback');
    function showError(id, show){
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = show ? 'block' : 'none';
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) status.textContent = '';
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const year = document.getElementById('year');
      const msg = document.getElementById('message');
      let ok = true;
      if (!name.value.trim()) { showError('name-err', true); ok = false; } else showError('name-err', false);
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { showError('email-err', true); ok = false; } else showError('email-err', false);
      if (phone && phone.value && !phone.checkValidity()) { showError('phone-err', true); ok = false; } else showError('phone-err', false);
      if (!year.value) { showError('year-err', true); ok = false; } else showError('year-err', false);
      if (!msg.value.trim()) { showError('message-err', true); ok = false; } else showError('message-err', false);
      if (!ok) { if (status) status.textContent = 'Please fix the highlighted fields.'; return; }

      const subject = encodeURIComponent('Tutoring Enquiry');
      const body = encodeURIComponent(
        `Name: ${name.value}\nEmail: ${email.value}\nPhone: ${phone ? phone.value : ''}\nYear group: ${year.value}\n\nMessage:\n${msg.value}`
      );
      if (mailto) {
        mailto.href = `mailto:ben.jp.staunton@iclould.com?subject=${subject}&body=${body}`;
        if (status) status.textContent = 'Opening your email client… (If nothing happens, click “Email instead”.)';
        mailto.click();
      }
    });
  }
});
