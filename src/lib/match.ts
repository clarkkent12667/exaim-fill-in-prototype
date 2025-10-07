import { QuestionConfig, GradeReport } from '../types';

// Default values for matching behavior
const DEFAULT_ALLOW_PLURAL = true;
const DEFAULT_TYPO_TOLERANCE = 1;

/**
 * Normalizes text by trimming, lowercasing, collapsing spaces, and removing trailing punctuation
 */
export function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .replace(/[.,!?;:]+$/, ''); // remove trailing punctuation
}

/**
 * Strips plural endings from a string
 * Basic rule: if ends with 'es' → remove, else if ends with 's' → remove
 */
export function stripPlural(s: string): string {
  if (s.endsWith('es')) {
    return s.slice(0, -2);
  }
  if (s.endsWith('s')) {
    return s.slice(0, -1);
  }
  return s;
}

/**
 * Computes Levenshtein distance between two strings
 * Standard dynamic programming implementation
 */
export function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  
  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

/**
 * Checks if a student answer is acceptable given the correct answer and constraints
 */
export function isAcceptable(
  student: string, 
  correct: string, 
  allowPlural: boolean = DEFAULT_ALLOW_PLURAL, 
  maxDist: number = DEFAULT_TYPO_TOLERANCE
): boolean {
  const studentNorm = normalize(student);
  const correctNorm = normalize(correct);
  
  // Exact match
  if (studentNorm === correctNorm) {
    return true;
  }
  
  // Plural/singular handling
  if (allowPlural) {
    const studentStripped = stripPlural(studentNorm);
    const correctStripped = stripPlural(correctNorm);
    if (studentStripped === correctStripped) {
      return true;
    }
  }
  
  // Levenshtein distance check
  const distance = levenshtein(studentNorm, correctNorm);
  
  // For very short answers (≤3 chars), be more strict
  const effectiveMaxDist = correctNorm.length <= 3 
    ? Math.min(maxDist, 1) 
    : maxDist;
  
  return distance <= effectiveMaxDist;
}

/**
 * Evaluates a student answer against multiple correct answers
 * Returns the best match for reporting purposes
 */
export function evaluateAnswer(
  studentAnswer: string,
  config: QuestionConfig
): GradeReport {
  // Apply defaults from config or use global defaults
  const allowPlural = config.allowPlural ?? DEFAULT_ALLOW_PLURAL;
  const typoTolerance = config.typoTolerance ?? DEFAULT_TYPO_TOLERANCE;
  const studentNorm = normalize(studentAnswer);
  
  let bestMatch: {
    answer: string;
    distance: number;
    similarity: number;
  } | null = null;
  
  let isCorrect = false;
  
  // Check each correct answer
  for (const correctAnswer of config.answers) {
    const correctNorm = normalize(correctAnswer);
    const distance = levenshtein(studentNorm, correctNorm);
    const maxLength = Math.max(studentNorm.length, correctNorm.length);
    const similarity = maxLength > 0 ? Math.max(0, (1 - distance / maxLength) * 100) : 100;
    
    // Track best match for reporting
    if (!bestMatch || distance < bestMatch.distance) {
      bestMatch = {
        answer: correctAnswer,
        distance,
        similarity
      };
    }
    
    // Check if this answer is acceptable
    if (isAcceptable(studentAnswer, correctAnswer, allowPlural, typoTolerance)) {
      isCorrect = true;
    }
  }
  
  // Determine if "almost correct" (within tolerance + 1)
  const almostCorrect = !isCorrect && bestMatch && 
    bestMatch.distance <= typoTolerance + 1;
  
  return {
    correct: isCorrect,
    studentNormalized: studentNorm,
    bestAnswer: bestMatch?.answer || null,
    distance: bestMatch?.distance || null,
    similarityPct: bestMatch?.similarity || null,
    almost: almostCorrect || false
  };
}
