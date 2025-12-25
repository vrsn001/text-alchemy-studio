import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getLastCategory, saveLastCategory, hasVisitedBefore, markAsVisited } from '@/utils/storage';

interface UseSmartScrollOptions {
  defaultCategory?: string;
  scrollDelay?: number; // ms delay before auto-scroll
}

export const useSmartScroll = (options: UseSmartScrollOptions = {}) => {
  const { defaultCategory = 'modify', scrollDelay = 3500 } = options;
  const location = useLocation();
  const hasScrolledRef = useRef(false);

  // Scroll to a category section
  const scrollToCategory = useCallback((categoryId: string) => {
    const element = document.querySelector(`[data-category="${categoryId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Save category when user interacts with a tool
  const trackCategoryInteraction = useCallback((categoryId: string) => {
    saveLastCategory(categoryId);
  }, []);

  // Auto-scroll on page load
  useEffect(() => {
    // Only run on homepage
    if (location.pathname !== '/') return;
    // Prevent multiple scrolls
    if (hasScrolledRef.current) return;

    const lastCategory = getLastCategory();
    const isFirstVisit = !hasVisitedBefore();

    const performScroll = () => {
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;

      if (lastCategory) {
        // Return visitor - scroll to their last used category
        scrollToCategory(lastCategory);
      } else {
        // First-time or no history - scroll to default category
        scrollToCategory(defaultCategory);
      }

      // Mark as visited after first scroll
      if (isFirstVisit) {
        markAsVisited();
      }
    };

    // Delay scroll for smooth experience after page load
    const timer = setTimeout(performScroll, scrollDelay);

    return () => clearTimeout(timer);
  }, [location.pathname, defaultCategory, scrollDelay, scrollToCategory]);

  return {
    scrollToCategory,
    trackCategoryInteraction,
  };
};
