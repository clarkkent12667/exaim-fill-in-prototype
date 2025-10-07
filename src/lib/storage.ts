import { QuestionConfig } from '../types';

const STORAGE_KEY = 'exaim_question_config';

/**
 * Saves a question configuration to localStorage
 */
export function saveQuestion(config: QuestionConfig): void {
  try {
    // Apply defaults before saving
    const configWithDefaults: QuestionConfig = {
      ...config,
      allowPlural: config.allowPlural ?? true,
      typoTolerance: config.typoTolerance ?? 1
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configWithDefaults));
  } catch (error) {
    console.error('Failed to save question to localStorage:', error);
  }
}

/**
 * Loads a question configuration from localStorage
 * Returns null if no saved question exists or if there's an error
 */
export function loadQuestion(): QuestionConfig | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    
    const parsed = JSON.parse(stored);
    
    // Validate the parsed data has the expected structure
    if (
      typeof parsed === 'object' &&
      typeof parsed.prompt === 'string' &&
      Array.isArray(parsed.answers) &&
      (parsed.allowPlural === undefined || typeof parsed.allowPlural === 'boolean') &&
      (parsed.typoTolerance === undefined || parsed.typoTolerance === 0 || parsed.typoTolerance === 1 || parsed.typoTolerance === 2)
    ) {
      // Apply defaults for backward compatibility
      const configWithDefaults: QuestionConfig = {
        ...parsed,
        allowPlural: parsed.allowPlural ?? true,
        typoTolerance: parsed.typoTolerance ?? 1
      };
      return configWithDefaults;
    }
    
    console.warn('Invalid question data in localStorage, ignoring');
    return null;
  } catch (error) {
    console.error('Failed to load question from localStorage:', error);
    return null;
  }
}

/**
 * Clears the saved question from localStorage
 */
export function clearQuestion(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear question from localStorage:', error);
  }
}
