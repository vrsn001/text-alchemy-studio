/**
 * Haptic feedback utilities for mobile devices
 */

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 40,
  success: [10, 50, 10],
  warning: [20, 100, 20],
  error: [30, 50, 30, 50, 30],
};

/**
 * Trigger haptic feedback if supported
 */
export const triggerHaptic = (type: HapticType = 'light') => {
  // Check for Vibration API support
  if ('vibrate' in navigator) {
    const pattern = hapticPatterns[type];
    navigator.vibrate(pattern);
  }
  
  // Check for Haptic Feedback API (iOS Safari)
  if ('Haptics' in window && typeof (window as any).Haptics?.impact === 'function') {
    (window as any).Haptics.impact({ style: type === 'light' ? 'light' : type === 'heavy' ? 'heavy' : 'medium' });
  }
};

/**
 * Check if haptics are supported
 */
export const isHapticsSupported = (): boolean => {
  return 'vibrate' in navigator || ('Haptics' in window);
};
