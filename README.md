# Exaim — Fill-in Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)

A polished React + TypeScript prototype for creating and taking fill-in-the-blank quizzes with intelligent answer matching.

## Features

- **Smart Answer Matching**: Fuzzy matching with Levenshtein distance algorithm
- **Plural/Singular Handling**: Automatically accepts both "ion" and "ions"
- **Configurable Typo Tolerance**: Allow 0, 1, or 2 character differences
- **Modern UI**: Built with Tailwind CSS, responsive design, smooth animations
- **Local Storage**: Questions persist between sessions
- **Real-time Validation**: Form validation with helpful error messages
- **Detailed Feedback**: Shows normalized answers, best matches, and similarity scores

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Custom string matching algorithms** (no external dependencies)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

## Usage

### Create Question Tab
1. Enter a question prompt using underscores for blanks (e.g., "A ______ is an atom that loses or gains electrons.")
2. Add correct answers separated by commas (e.g., "ion, charged atom")
3. Click "Save Question" to store it

*Note: Plural/singular handling and typo tolerance are automatically enabled with smart defaults.*

### Take Quiz Tab
1. View the saved question
2. Type your answer in the input field
3. Click "Check Answer" to get instant feedback
4. See detailed matching information including:
   - Normalized student answer
   - Best matching correct answer
   - Edit distance and similarity percentage

## Example Test Data

**Question**: "A ______ is an atom that loses or gains electrons."
**Correct Answers**: "ion, charged atom"
**Settings**: Plural handling and typo tolerance (1 character) are automatically enabled

**Test Cases**:
- "ion" → ✅ Correct
- "ions" → ✅ Correct (plural handling)
- "iin" → ✅ Correct (typo tolerance)
- "iron" → ❌ Incorrect
- "charged atoms" → ✅ Correct (plural handling)
- "charged aton" → ✅ Correct (within distance)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── Toggle.tsx
├── lib/                # Core utilities
│   ├── match.ts        # String matching algorithms
│   └── storage.ts      # localStorage helpers
├── pages/              # Main application pages
│   ├── CreateQuestion.tsx
│   └── TakeQuiz.tsx
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## String Matching Algorithm

The app implements a custom fuzzy matching system:

1. **Normalization**: Trims, lowercases, collapses spaces, removes trailing punctuation
2. **Plural Stripping**: Removes "s" or "es" endings for flexible matching
3. **Levenshtein Distance**: Calculates minimum edit distance between strings
4. **Tolerance Rules**: For short answers (≤3 chars), tolerance is clamped to max 1

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## Browser Support

Works in all modern browsers that support ES2020 and React 18.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies for optimal performance and developer experience
- Implements custom fuzzy matching algorithms without external dependencies
- Designed with accessibility and user experience in mind
