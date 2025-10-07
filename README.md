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

### **🧠 Smart Matching Algorithm**

The app uses a custom fuzzy matching system:

1. **Text Normalization**: 
   - Trims whitespace
   - Converts to lowercase
   - Removes punctuation
   - Collapses multiple spaces

2. **Plural Handling**: 
   - Strips "s" or "es" endings
   - "ions" becomes "ion" for matching

3. **Levenshtein Distance**: 
   - Calculates minimum edit distance
   - Allows 1-2 character differences

4. **Smart Tolerance**: 
   - Short answers (≤3 chars) get stricter matching
   - Prevents over-acceptance of wrong answers

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
