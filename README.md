# Exaim — Fill-in Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)

## 🎯 What is this app?

**Exaim** is an interactive fill-in-the-blank quiz application that lets teachers create questions and students take them. The magic happens in the **smart answer matching** - it understands typos, handles plural/singular forms, and gives helpful feedback.

### 🎓 Perfect for:
- **Teachers** creating educational quizzes
- **Students** practicing with immediate feedback
- **Anyone** wanting to test knowledge with flexible answer matching

### 🧠 How it works:
1. **Create**: Teachers write questions with blanks (like "A ______ is an atom that loses electrons")
2. **Answer**: Students fill in the blanks
3. **Smart Check**: The app intelligently matches answers, accepting small typos and variations
4. **Feedback**: Students get instant results with detailed explanations

## ✨ Key Features

### 🎯 **Smart Answer Matching**
- **Typo-friendly**: Accepts answers with 1-2 character mistakes
- **Plural handling**: "ion" and "ions" are both correct
- **Flexible matching**: "charged atom" matches "charged atoms"
- **Case insensitive**: "ION" = "ion" = "Ion"

### 🎨 **Beautiful Interface**
- **Modern design** with smooth animations
- **Two simple tabs**: Create Question | Take Quiz
- **Instant feedback** with color-coded results
- **Mobile-friendly** responsive design

### 💾 **Persistent Storage**
- **Saves questions** automatically in your browser
- **No backend needed** - everything runs locally
- **Works offline** once loaded

### 📊 **Detailed Feedback**
- Shows **exactly why** an answer was right or wrong
- Displays **similarity percentage** and edit distance
- **"Almost there!"** hints for close answers

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

## 📖 How to Use

### 👨‍🏫 **For Teachers: Create Questions**

1. **Go to "Create Question" tab**
2. **Write your question** with underscores for blanks:
   ```
   A ______ is an atom that loses or gains electrons.
   ```
3. **Add correct answers** (separate multiple answers with commas):
   ```
   ion, charged atom
   ```
4. **Click "Save Question"** - that's it!

### 👨‍🎓 **For Students: Take Quiz**

1. **Go to "Take Quiz" tab**
2. **Read the question** carefully
3. **Type your answer** in the input field
4. **Click "Check Answer"** for instant feedback

### 🎯 **What You'll See:**

- ✅ **Correct!** - Your answer matches perfectly
- ⚠️ **Almost there!** - Close but not quite right
- ❌ **Incorrect** - Try again with a different approach

**Plus detailed info showing:**
- How your answer was processed
- Which correct answer it matched best
- Similarity percentage and edit distance

## 🧪 Try These Examples

### **Sample Question:**
```
A ______ is an atom that loses or gains electrons.
```

### **Correct Answers:**
```
ion, charged atom
```

### **Test These Student Answers:**

| Student Input | Result | Why |
|---------------|--------|-----|
| `ion` | ✅ **Correct** | Exact match |
| `ions` | ✅ **Correct** | Plural handling |
| `ION` | ✅ **Correct** | Case insensitive |
| `iin` | ✅ **Correct** | 1 typo allowed |
| `charged atom` | ✅ **Correct** | Exact match |
| `charged atoms` | ✅ **Correct** | Plural handling |
| `charged aton` | ✅ **Correct** | 1 typo allowed |
| `iron` | ❌ **Incorrect** | Too different |
| `atom` | ❌ **Incorrect** | Wrong concept |

### 🎯 **The Magic:**
- **Smart matching** handles typos and variations
- **Plural/singular** forms are automatically accepted
- **Case doesn't matter** - all answers are normalized
- **Multiple correct answers** - any one will work

## 🏗️ For Developers

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── Card.tsx        # Card container component
│   ├── Input.tsx       # Form input component
│   ├── Select.tsx      # Dropdown component
│   └── Toggle.tsx      # Toggle switch component
├── lib/                # Core utilities
│   ├── match.ts        # Smart string matching algorithms
│   └── storage.ts      # Browser storage helpers
├── pages/              # Main application pages
│   ├── CreateQuestion.tsx  # Question creation form
│   └── TakeQuiz.tsx        # Quiz taking interface
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### **🧠 Smart Matching Algorithm - Technical Details**

The app implements a custom fuzzy matching system with these key functions:

#### **1. Text Normalization (`normalize()`)**
```typescript
function normalize(text: string): string {
  return text
    .trim()                    // Remove leading/trailing spaces
    .toLowerCase()             // Convert to lowercase
    .replace(/\s+/g, ' ')      // Collapse multiple spaces to single space
    .replace(/[.,!?;:]+$/, ''); // Remove trailing punctuation
}
```
**Example**: `"  ION!!  "` → `"ion"`

#### **2. Plural Stripping (`stripPlural()`)**
```typescript
function stripPlural(s: string): string {
  if (s.endsWith('es')) return s.slice(0, -2);  // "atoms" → "atom"
  if (s.endsWith('s')) return s.slice(0, -1);   // "ions" → "ion"
  return s;  // No change if doesn't end with 's'
}
```
**Example**: `"ions"` → `"ion"`, `"charged atoms"` → `"charged atom"`

#### **3. Levenshtein Distance (`levenshtein()`)**
```typescript
function levenshtein(a: string, b: string): number {
  // Dynamic programming matrix to calculate minimum edit distance
  // Returns number of character insertions, deletions, or substitutions needed
}
```
**Examples**:
- `levenshtein("ion", "iin")` = `1` (1 substitution: o→i)
- `levenshtein("atom", "atoms")` = `1` (1 insertion: +s)
- `levenshtein("ion", "iron")` = `2` (1 insertion: +r, 1 substitution: o→n)

#### **4. Smart Acceptance (`isAcceptable()`)**
```typescript
function isAcceptable(student: string, correct: string, allowPlural: boolean, maxDist: number): boolean {
  const studentNorm = normalize(student);
  const correctNorm = normalize(correct);
  
  // 1. Exact match after normalization
  if (studentNorm === correctNorm) return true;
  
  // 2. Plural/singular match
  if (allowPlural) {
    const studentStripped = stripPlural(studentNorm);
    const correctStripped = stripPlural(correctNorm);
    if (studentStripped === correctStripped) return true;
  }
  
  // 3. Levenshtein distance check
  const distance = levenshtein(studentNorm, correctNorm);
  const effectiveMaxDist = correctNorm.length <= 3 ? Math.min(maxDist, 1) : maxDist;
  
  return distance <= effectiveMaxDist;
}
```

#### **5. Multi-Answer Evaluation (`evaluateAnswer()`)**
```typescript
function evaluateAnswer(studentAnswer: string, config: QuestionConfig): GradeReport {
  // For each correct answer:
  // 1. Calculate Levenshtein distance
  // 2. Track the best match (lowest distance)
  // 3. Check if any answer passes isAcceptable()
  // 4. Return detailed report with best match info
}
```

### **🎯 Matching Logic Flow**

1. **Input**: Student types `"iin"`, Correct answers: `["ion", "charged atom"]`
2. **Normalize**: `"iin"` → `"iin"`, `"ion"` → `"ion"`
3. **Check exact match**: `"iin" !== "ion"` ❌
4. **Check plural**: `stripPlural("iin")` = `"iin"`, `stripPlural("ion")` = `"ion"` ❌
5. **Calculate distance**: `levenshtein("iin", "ion")` = `1`
6. **Check tolerance**: `1 <= 1` ✅ **ACCEPTED!**

### **⚙️ Configuration Defaults**
- `allowPlural: true` - Automatically enabled
- `typoTolerance: 1` - Allows 1 character difference
- **Smart rule**: For answers ≤3 characters, max tolerance is clamped to 1

### **💻 Implementation Guide for Developers**

If you want to implement similar matching in your own project:

#### **Step 1: Create the Core Functions**
```typescript
// 1. Text normalization
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?;:]+$/, '');
}

// 2. Plural stripping
function stripPlural(s: string): string {
  if (s.endsWith('es')) return s.slice(0, -2);
  if (s.endsWith('s')) return s.slice(0, -1);
  return s;
}

// 3. Levenshtein distance (dynamic programming)
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

#### **Step 2: Create the Matching Logic**
```typescript
function isAcceptable(student: string, correct: string, allowPlural: boolean = true, maxDist: number = 1): boolean {
  const studentNorm = normalize(student);
  const correctNorm = normalize(correct);
  
  // Exact match
  if (studentNorm === correctNorm) return true;
  
  // Plural handling
  if (allowPlural && stripPlural(studentNorm) === stripPlural(correctNorm)) return true;
  
  // Distance check
  const distance = levenshtein(studentNorm, correctNorm);
  const effectiveMaxDist = correctNorm.length <= 3 ? Math.min(maxDist, 1) : maxDist;
  
  return distance <= effectiveMaxDist;
}
```

#### **Step 3: Handle Multiple Correct Answers**
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

#### **Step 4: Usage Example**
```typescript
// Test the matching
const result = evaluateAnswer("iin", ["ion", "charged atom"]);
console.log(result); // { correct: true, bestMatch: "ion", distance: 1 }
```

### **Development Commands**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### **Browser Support**
Works in all modern browsers that support ES2020 and React 18.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Ideas for Contributions:**
- Add more question types (multiple choice, true/false)
- Implement question categories or tags
- Add export/import functionality
- Create a question bank/library
- Add user authentication
- Implement scoring systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Implements custom fuzzy matching algorithms (no external dependencies)
- Designed with accessibility and user experience in mind
- Perfect for educational use cases and learning environments

---

**Made with ❤️ for educators and learners everywhere!**
