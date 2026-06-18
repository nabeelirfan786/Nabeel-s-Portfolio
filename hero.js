/**
 * hero.js
 * Staggered entrance animation for hero elements
 * and animated stat counters.
 */

/* ── Hero entrance ────────────────────────── */
const HERO_ELEMENTS = [
  'heroGreeting',
  'heroName',
  'heroRole',
  'heroDesc',
  'heroBtns',
  'heroStats',
  'heroScroll',
];

function heroEntrance() {
  // Set initial hidden state
  HERO_ELEMENTS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.transform = 'translateY(25px)';
  });

  // Stagger reveal
  const delays = [300, 500, 700, 850, 1000, 1100, 1400];

  HERO_ELEMENTS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;

    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delays[i]);
  });
}

heroEntrance();


/* ── Stat counters ────────────────────────── */
const STATS = [
  { id: 'stat1', target: 35,  duration: 1500 },
  { id: 'stat2', target: 20,  duration: 1500 },
  { id: 'stat3', target: 4,   duration: 1500 },
];

function animateCounter(el, target, duration) {
  let current = 0;
  const step  = target / (duration / 16);

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);

    if (current >= target) clearInterval(timer);
  }, 16);
}

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  STATS.forEach(({ id, target, duration }) => {
    const el = document.getElementById(id);
    if (el) animateCounter(el, target, duration);
  });
}

// Kick off after hero entrance
setTimeout(startCounters, 1200);
