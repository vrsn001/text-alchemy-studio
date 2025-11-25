import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { triggerHaptic } from '@/utils/haptics';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const controls = useAnimation();

  const PULL_THRESHOLD = 80;
  const MAX_PULL = 120;

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY.current === 0 || refreshing) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0 && window.scrollY === 0) {
      setPulling(true);
      const actualDistance = Math.min(distance * 0.5, MAX_PULL);
      setPullDistance(actualDistance);

      if (actualDistance >= PULL_THRESHOLD) {
        triggerHaptic('light');
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD && !refreshing) {
      setRefreshing(true);
      triggerHaptic('success');
      
      await controls.start({
        rotate: 360,
        transition: { duration: 0.6, ease: 'easeInOut' }
      });

      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPullDistance(0);
        setPulling(false);
        startY.current = 0;
      }
    } else {
      setPullDistance(0);
      setPulling(false);
      startY.current = 0;
    }
  };

  useEffect(() => {
    const element = document.body;
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, refreshing]);

  const opacity = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const scale = Math.min(pullDistance / PULL_THRESHOLD, 1);

  return (
    <div className="relative">
      {/* Pull to Refresh Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
        style={{
          height: pullDistance,
          opacity: pulling || refreshing ? opacity : 0,
        }}
        initial={{ opacity: 0 }}
      >
        <motion.div
          animate={controls}
          style={{ scale }}
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg backdrop-blur-sm"
        >
          <RefreshCw className={`h-6 w-6 ${refreshing ? 'animate-spin' : ''}`} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          transform: pulling || refreshing ? `translateY(${pullDistance}px)` : 'translateY(0)',
          transition: pulling ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
