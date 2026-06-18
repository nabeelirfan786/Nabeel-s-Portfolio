/**
 * particles.js
 * Animated particle field with mouse-repel and connecting lines.
 */

const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
const mouse   = { x: null, y: null };

/* ── Resize ───────────────────────────────── */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

/* ── Init ─────────────────────────────────── */
function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);

  for (let i = 0; i < count; i++) {
    particles.push({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.5 + 0.3,
      dx:      (Math.random() - 0.5) * 0.4,
      dy:      (Math.random() - 0.5) * 0.4,
      color:   Math.random() > 0.5 ? '0,245,255' : '157,78,221',
      opacity: Math.random() * 0.6 + 0.1,
    });
  }
}

initParticles();

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* ── Draw loop ────────────────────────────── */
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Mouse repel
    if (mouse.x !== null && mouse.y !== null) {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += dx * force * 0.02;
        p.y += dy * force * 0.02;
      }
    }

    // Move
    p.x += p.dx;
    p.y += p.dy;

    // Bounce
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
    ctx.fill();
  });

  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,245,255,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();
