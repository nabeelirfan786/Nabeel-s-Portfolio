/**
 * tilt.js
 * Subtle 3-D perspective tilt on skill and project cards.
 */

const TILT_CARDS = document.querySelectorAll('.skill-card, .project-card');

TILT_CARDS.forEach(card => {

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.4s, border-color 0.4s';
  });

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.4s ease';
    card.style.transform  = '';
  });
});
