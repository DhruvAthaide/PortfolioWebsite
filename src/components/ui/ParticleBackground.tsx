import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number; // depth 0.2..1: drives size, speed, opacity and parallax strength
  vx: number;
  vy: number;
}

const PARTICLES_PER_PIXEL = 1 / 4500; // ~290 particles on a 1440x900 screen
const MAX_PARTICLES = 320;
const LINK_DISTANCE = 130;
const MAX_DPR = 1.5;

const createParticles = (width: number, height: number): Particle[] => {
  const count = Math.min(MAX_PARTICLES, Math.round(width * height * PARTICLES_PER_PIXEL));
  return Array.from({ length: count }, () => {
    const z = 0.2 + Math.random() * 0.8;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      vx: (Math.random() - 0.5) * 0.15 * z,
      vy: (Math.random() - 0.5) * 0.15 * z,
    };
  });
};

/**
 * Drifting depth-layered particles with faint links and mouse parallax, drawn on a 2D canvas.
 * Replaces the old three.js scene (~140 kB) with a few hundred bytes of code.
 * Pauses when the tab is hidden and renders a single static frame under prefers-reduced-motion.
 */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rgb = theme === 'dark' ? '34, 211, 238' : '3, 105, 161';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const points = particles.map((p) => {
        if (!reducedMotion) {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;
        }
        return { x: p.x + mouse.x * p.z * 18, y: p.y + mouse.y * p.z * 18, z: p.z };
      });

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        if (a.z < 0.6) continue; // only the nearer layer gets links, keeps it cheap and readable
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          if (b.z < 0.6) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${rgb}, ${0.2 * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle = `rgba(${rgb}, ${0.3 + p.z * 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8 + p.z * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / width - 0.5) * 2;
      mouse.ty = (e.clientY / height - 0.5) * 2;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/80 dark:to-dark-800/80" />
    </div>
  );
};

export default ParticleBackground;
