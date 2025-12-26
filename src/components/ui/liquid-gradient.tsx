'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Colors {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  color6?: string;
  color7?: string;
  color8?: string;
  color9?: string;
  color10?: string;
  color11?: string;
  color12?: string;
  color13?: string;
  color14?: string;
  color15?: string;
  color16?: string;
  color17?: string;
}

interface LiquidProps {
  colors?: Colors;
  className?: string;
}

export function Liquid({ colors, className }: LiquidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const defaultColors: Colors = {
    color1: '#FFFFFF',
    color2: '#1E10C5',
    color3: '#9089E2',
    color4: '#FCFCFE',
    color5: '#F9F9FD',
    color6: '#B2B8E7',
    color7: '#0E2DCB',
    color8: '#0017E9',
    color9: '#4743EF',
    color10: '#7D7BF4',
    color11: '#0B06FC',
    color12: '#C5C1EA',
    color13: '#1403DE',
    color14: '#B6BAF6',
    color15: '#C1BEEB',
    color16: '#290ECB',
    color17: '#3F4CC0',
  };

  const mergedColors = { ...defaultColors, ...colors };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const colorValues = Object.values(mergedColors);

    const blobs = colorValues.map((color, i) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      radius: 100 + Math.random() * 200,
      color: color || '#FFFFFF',
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      offset: i * 0.5,
    }));

    const animate = () => {
      time += 0.005;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw blobs with gradients
      blobs.forEach((blob) => {
        blob.x += blob.vx + Math.sin(time + blob.offset) * 0.3;
        blob.y += blob.vy + Math.cos(time + blob.offset) * 0.3;

        // Bounce off edges
        if (blob.x < -blob.radius) blob.x = canvas.offsetWidth + blob.radius;
        if (blob.x > canvas.offsetWidth + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.offsetHeight + blob.radius;
        if (blob.y > canvas.offsetHeight + blob.radius) blob.y = -blob.radius;

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color + 'CC');
        gradient.addColorStop(0.5, blob.color + '66');
        gradient.addColorStop(1, blob.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mergedColors]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ filter: 'blur(60px)' }}
    />
  );
}

export default Liquid;
