'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollTextMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

interface TextItemProps {
  children: React.ReactNode;
  className?: string;
}

function TextItem({ children, className }: TextItemProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-4 mx-8 text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap",
      className
    )}>
      {children}
      <span className="text-primary/30">✦</span>
    </span>
  );
}

function ScrollTextMarquee({ 
  children, 
  baseVelocity = 100,
  className 
}: ScrollTextMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  
  // Create smooth spring for the base position
  const smoothX = useSpring(baseX, {
    damping: 50,
    stiffness: 400
  });
  
  // Transform scroll velocity to additional movement
  const velocityFactor = useTransform(
    scrollY,
    [0, 1000],
    [0, 5]
  );

  useEffect(() => {
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      // Get current scroll position
      const currentScrollY = scrollY.get();
      
      // Calculate scroll velocity
      scrollVelocity.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      
      // Base movement + scroll-based acceleration
      const direction = baseVelocity < 0 ? -1 : 1;
      const scrollInfluence = scrollVelocity.current * 0.5;
      
      time += 0.016; // ~60fps
      
      // Calculate base position with wraparound
      const moveAmount = (time * baseVelocity * 0.1) + (scrollInfluence * direction);
      const wrappedPosition = moveAmount % 100;
      
      baseX.set(-wrappedPosition);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [baseVelocity, scrollY, baseX]);

  // Convert children to array and duplicate for seamless loop
  const childArray = React.Children.toArray(children);
  const repeatedChildren = [...childArray, ...childArray, ...childArray, ...childArray];

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full py-8",
        className
      )}
    >
      <motion.div
        className="flex items-center"
        style={{ x: smoothX }}
      >
        <div className="flex items-center">
          {repeatedChildren.map((child, index) => (
            <TextItem key={index} className="text-foreground/80">
              {child}
            </TextItem>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export { ScrollTextMarquee, TextItem };
export default ScrollTextMarquee;
