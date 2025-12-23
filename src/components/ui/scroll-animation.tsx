'use client';
import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface ViewportOptions {
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
}

interface ScrollElementProps {
  children: React.ReactNode;
  className?: string;
  viewport?: ViewportOptions;
}

const variants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function ScrollElement({ 
  children, 
  className,
  viewport = { once: true, amount: 0.5, margin: '0px 0px 0px 0px' }
}: ScrollElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: viewport.once,
    amount: viewport.amount,
    margin: viewport.margin as any
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollElement;
