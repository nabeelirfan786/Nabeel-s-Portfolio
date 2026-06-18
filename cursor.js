/**
 * cursor.js
 * Custom cursor dot + lagging follower ring.
 * Expands/shifts colour on interactive elements.
 */

const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mx = 0, my = 0;   // mouse position
let fx = 0, fy = 0;   // follower position (lerped)

window.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.left = `${mx - 6}px`;
  cursor.style.top  = `${my - 6}px`;

  // Soft-follow
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = `${fx - 18}px`;
  follower.style.top  = `${fy - 18}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover state on all interactive elements
const interactiveSelectors = 'a, button, .skill-tag, .project-card, .social-link';

document.querySelectorAll(interactiveSelectors).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    follower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    follower.classList.remove('hovered');
  });
});
