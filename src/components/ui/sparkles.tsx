// Lightweight CSS-based sparkles replacement (no heavy particle library)
import { useEffect, useRef } from 'react';

interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  // Keep interface compatible but ignore unused props
  minSize?: number | null;
  minSpeed?: number | null;
  direction?: string;
  opacitySpeed?: number;
  minOpacity?: number | null;
  mousemove?: boolean;
  hover?: boolean;
  background?: string;
  options?: Record<string, any>;
}

export function Sparkles({
  className = '',
  size = 1.2,
  density = 800,
  speed = 1.5,
  opacity = 1,
  color = '#ffffff',
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = Math.min(Math.floor(density / 5), 120);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * size * 0.5 + size * 0.5),
      o: Math.random() * opacity,
      dx: (Math.random() - 0.5) * speed * 0.3,
      dy: (Math.random() - 0.5) * speed * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const flicker = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        ctx.globalAlpha = p.o * flicker;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [size, density, speed, opacity, color]);

  return <canvas ref={canvasRef} className={className} style={{ pointerEvents: 'none' }} />;
}

export default Sparkles;
