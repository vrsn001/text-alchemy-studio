import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getLastCategory, getLastTool, saveLastTool, hasVisitedBefore, markAsVisited } from '@/utils/storage';
import { toast } from 'sonner';

interface UseSmartScrollOptions {
  defaultCategory?: string;
  scrollDelay?: number; // ms delay before auto-scroll
}

// Map category IDs to display names
const categoryNames: Record<string, string> = {
  modify: 'Text Modifications',
  links: 'Link Tools',
  encode: 'Encoding Tools',
  format: 'Formatting Tools',
  case: 'Case Transformations',
};

// Map tool paths to display names
const toolNames: Record<string, string> = {
  '/tools/reverse-text': 'Reverse Text',
  '/tools/add-line-breaks': 'Line Breaks Tool',
  '/tools/link-manager': 'Link Manager',
  '/tools/text-to-html': 'Text to HTML',
  '/tools/alphabetical-order': 'Alphabetical Order',
  '/tools/case-converter': 'Case Converter',
  '/tools/word-counter': 'Word Counter',
  '/tools/random-words': 'Random Words',
};

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

  // Save tool when user interacts with a tool
  const trackToolInteraction = useCallback((toolPath: string, categoryId: string) => {
    saveLastTool(toolPath, categoryId);
  }, []);

  // Legacy support - track category only
  const trackCategoryInteraction = useCallback((categoryId: string) => {
    // This is now handled by trackToolInteraction, but kept for backwards compatibility
  }, []);

  // Auto-scroll on page load
  useEffect(() => {
    // Only run on homepage
    if (location.pathname !== '/') return;
    // Prevent multiple scrolls
    if (hasScrolledRef.current) return;

    const lastTool = getLastTool();
    const lastCategory = lastTool?.categoryId || getLastCategory();
    const isFirstVisit = !hasVisitedBefore();

    const performScroll = () => {
      if (hasScrolledRef.current) return;
      hasScrolledRef.current = true;

      if (lastTool) {
        // Return visitor - scroll to their last used category and show tool name
        const toolName = toolNames[lastTool.toolPath] || 'your last tool';
        toast(`Welcome back! Last used: ${toolName}`, {
          duration: 3000,
          icon: '👋',
        });
        scrollToCategory(lastTool.categoryId);
      } else if (lastCategory) {
        // Has category but no specific tool
        const categoryName = categoryNames[lastCategory] || lastCategory;
        toast(`Welcome back! Taking you to ${categoryName}...`, {
          duration: 3000,
          icon: '👋',
        });
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
    trackToolInteraction,
  };
};