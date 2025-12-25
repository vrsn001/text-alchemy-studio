/**
 * localStorage utilities with auto-save functionality
 */

const STORAGE_PREFIX = 'textcraft_';

export interface ToolState {
  input: string;
  timestamp: number;
}

export interface CategoryHistory {
  categoryId: string;
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

// Category history functions
export const saveLastCategory = (categoryId: string): void => {
  try {
    const history: CategoryHistory = {
      categoryId,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${STORAGE_PREFIX}last_category`, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save category history:', error);
  }
};

export const getLastCategory = (): string | null => {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}last_category`);
    if (stored) {
      const history: CategoryHistory = JSON.parse(stored);
      // Return if less than 30 days old
      if (Date.now() - history.timestamp < 30 * 24 * 60 * 60 * 1000) {
        return history.categoryId;
      }
    }
  } catch (error) {
    console.error('Failed to load category history:', error);
  }
  return null;
};

export const hasVisitedBefore = (): boolean => {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}visited`) === 'true';
  } catch {
    return false;
  }
};

export const markAsVisited = (): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}visited`, 'true');
  } catch (error) {
    console.error('Failed to mark as visited:', error);
  }
};
