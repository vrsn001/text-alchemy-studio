'use client';
import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas-cursor') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2 };
    const last_mouse = { x: mouse.x, y: mouse.y };

    class Trail {
      spring: number;
      friction: number;
      nodes: { x: number; y: number; vx: number; vy: number }[];

      constructor(spring: number, friction: number) {
        this.spring = spring;
        this.friction = friction;
        this.nodes = [];

        for (let i = 0; i < 50; i++) {
          this.nodes.push({ x: 0, y: 0, vx: 0, vy: 0 });
        }
      }

      update() {
        let spring = this.spring;
        let node = this.nodes[0];
        node.vx += (last_mouse.x - node.x) * spring;
        node.vy += (last_mouse.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          node = this.nodes[i];

          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * 0.2;
            node.vy += prev.vy * 0.2;
          }

          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;

          spring *= 0.98;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < this.nodes.length - 1; i++) {
          const curr = this.nodes[i];
          const next = this.nodes[i + 1];
          x = (curr.x + next.x) * 0.5;
          y = (curr.y + next.y) * 0.5;
          ctx.quadraticCurveTo(curr.x, curr.y, x, y);
        }

        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(last.x, last.y, last.x, last.y);

        ctx.stroke();
        ctx.closePath();
      }
    }

    const trails: Trail[] = [];
    const colors = ['#a855f7', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 3; i++) {
      trails.push(new Trail(0.45 - i * 0.05, 0.55 + i * 0.05));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      trails.forEach((trail, index) => {
        trail.update();
        ctx.strokeStyle = colors[index];
        ctx.lineWidth = 4 - index;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.6 - index * 0.15;
        trail.draw(ctx);
      });

      ctx.globalAlpha = 1;
      last_mouse.x = mouse.x;
      last_mouse.y = mouse.y;

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
};

export default useCanvasCursor;
