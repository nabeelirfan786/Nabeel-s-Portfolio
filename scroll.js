/**
 * scroll.js
 * – IntersectionObserver-based reveal for .reveal elements
 * – Navbar background change on scroll
 */

/* ── Scroll reveal ────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── Navbar on scroll ─────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.background       = 'rgba(10, 10, 15, 0.92)';
    navbar.style.borderBottomColor = 'rgba(0, 245, 255, 0.12)';
  } else {
    navbar.style.background       = 'rgba(10, 10, 15, 0.7)';
    navbar.style.borderBottomColor = 'rgba(0, 245, 255, 0.06)';
  }
});
