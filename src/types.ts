export type QuestionConfig = {
  prompt: string;
  answers: string[];
  allowPlural?: boolean;    // optional; default true
  typoTolerance?: 0 | 1 | 2; // optional; default 1
};

export type GradeReport = {
  correct: boolean;
  studentNormalized: string;
  bestAnswer: string | null;
  distance: number | null;
  similarityPct: number | null; // 0–100
  almost: boolean;              // true if not correct but within tolerance+1
};
