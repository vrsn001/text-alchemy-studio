import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

// Quick, subtle fade so tools appear almost instantly.
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
};
