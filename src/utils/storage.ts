/**
 * localStorage utilities with auto-save functionality
 */

const STORAGE_PREFIX = 'textcraft_';

export interface ToolState {
  input: string;
  timestamp: number;
}

export const saveToolState = (toolId: string, input: string): void => {
  try {
    const state: ToolState = {
      input,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${STORAGE_PREFIX}${toolId}`, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save tool state:', error);
  }
};

export const loadToolState = (toolId: string): string => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${toolId}`);
    if (stored) {
      const state: ToolState = JSON.parse(stored);
      // Return state if less than 7 days old
      if (Date.now() - state.timestamp < 7 * 24 * 60 * 60 * 1000) {
        return state.input;
      }
    }
  } catch (error) {
    console.error('Failed to load tool state:', error);
  }
  return '';
};

export const clearToolState = (toolId: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${toolId}`);
  } catch (error) {
    console.error('Failed to clear tool state:', error);
  }
};
