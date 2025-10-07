# Exaim — Fill-in Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)

## 🎯 What is this?

A **fill-in-the-blank quiz prototype** with intelligent answer matching. The core innovation is the **smart matching algorithm** that handles typos, plural forms, and provides flexible answer evaluation.

**Key Features:**
- Smart fuzzy matching with Levenshtein distance
- Automatic plural/singular handling
- Typo tolerance (1-2 character differences)
- Multiple correct answers support
- Real-time feedback with detailed matching info

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Custom string matching algorithms** (no external dependencies)

## 🚀 Quick Start

### Option 1: Run Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/clarkkent12667/exaim-fill-in-prototype.git
   cd exaim-fill-in-prototype
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

### Option 2: Try it Online
Visit the live demo (if deployed) or clone and run locally to see it in action!

## 🧪 Example Matching

**Question:** `"A ______ is an atom that loses or gains electrons."`  
**Correct Answers:** `["ion", "charged atom"]`

| Student Input | Result | Distance | Why |
|---------------|--------|----------|-----|
| `ion` | ✅ Correct | 0 | Exact match |
| `ions` | ✅ Correct | 0 | Plural handling |
| `iin` | ✅ Correct | 1 | 1 typo allowed |
| `charged aton` | ✅ Correct | 1 | 1 typo allowed |
| `iron` | ❌ Incorrect | 2 | Too different |

## 🏗️ Code Structure

```
src/
├── lib/
│   ├── match.ts        # Core matching algorithms
│   └── storage.ts      # localStorage helpers
├── pages/
│   ├── CreateQuestion.tsx
│   └── TakeQuiz.tsx
├── components/         # UI components
├── types.ts           # TypeScript definitions
└── App.tsx            # Main app
```

## 🧠 Core Matching Logic

### **Key Functions:**

#### **1. Text Normalization**
```typescript
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?;:]+$/, '');
}
// "  ION!!  " → "ion"
```

#### **2. Plural Handling**
```typescript
function stripPlural(s: string): string {
  if (s.endsWith('es')) return s.slice(0, -2);
  if (s.endsWith('s')) return s.slice(0, -1);
  return s;
}
// "ions" → "ion", "charged atoms" → "charged atom"
```

#### **3. Levenshtein Distance**
```typescript
function levenshtein(a: string, b: string): number {
  // Dynamic programming matrix for edit distance
  // Returns minimum insertions/deletions/substitutions needed
}
// levenshtein("ion", "iin") = 1
```

#### **4. Main Matching Logic**
```typescript
function isAcceptable(student: string, correct: string, allowPlural: boolean = true, maxDist: number = 1): boolean {
  const studentNorm = normalize(student);
  const correctNorm = normalize(correct);
  
  // 1. Exact match
  if (studentNorm === correctNorm) return true;
  
  // 2. Plural handling
  if (allowPlural && stripPlural(studentNorm) === stripPlural(correctNorm)) return true;
  
  // 3. Distance check
  const distance = levenshtein(studentNorm, correctNorm);
  const effectiveMaxDist = correctNorm.length <= 3 ? Math.min(maxDist, 1) : maxDist;
  
  return distance <= effectiveMaxDist;
}
```

### **Matching Flow:**
1. Normalize both strings
2. Check exact match
3. Check plural/singular match
4. Calculate Levenshtein distance
5. Apply tolerance rules

## 💻 Complete Implementation

### **Full Levenshtein Distance Algorithm:**
```typescript
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
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
```

### **Multi-Answer Evaluation:**
```typescript
function evaluateAnswer(studentAnswer: string, correctAnswers: string[]): {
  correct: boolean;
  bestMatch: string | null;
  distance: number | null;
} {
  let bestMatch: { answer: string; distance: number } | null = null;
  let isCorrect = false;
  
  for (const correctAnswer of correctAnswers) {
    const distance = levenshtein(normalize(studentAnswer), normalize(correctAnswer));
    
    if (!bestMatch || distance < bestMatch.distance) {
      bestMatch = { answer: correctAnswer, distance };
    }
    
    if (isAcceptable(studentAnswer, correctAnswer)) {
      isCorrect = true;
    }
  }
  
  return {
    correct: isCorrect,
    bestMatch: bestMatch?.answer || null,
    distance: bestMatch?.distance || null
  };
}
```

### **Usage:**
```typescript
const result = evaluateAnswer("iin", ["ion", "charged atom"]);
// { correct: true, bestMatch: "ion", distance: 1 }
```

## 🚀 Development

```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Check code quality
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
