import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Wait for the animation cycle to complete (2s) plus a small delay
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onLoadComplete, 300); // Wait for fade out
    }, 2200);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="loader" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
