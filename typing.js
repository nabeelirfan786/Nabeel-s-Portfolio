/**
 * typing.js
 * Loops through developer role titles with a typewriter effect.
 */

const ROLES = [
  'MERN Stack Developer',
  'Full Stack Engineer',
  'React.js Specialist',
  'Node.js Developer',
  'MongoDB Architect',
  'API Developer',
];

const typedEl = document.getElementById('typedRole');

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeRole() {
  const word = ROLES[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = word.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }

    setTimeout(typeRole, 80);
  } else {
    typedEl.textContent = word.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % ROLES.length;
      setTimeout(typeRole, 400);
      return;
    }

    setTimeout(typeRole, 45);
  }
}

// Delay so the hero entrance animation plays first
setTimeout(typeRole, 1200);
