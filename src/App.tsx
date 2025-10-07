import { useState, useEffect } from 'react';
import { CreateQuestion } from './pages/CreateQuestion';
import { TakeQuiz } from './pages/TakeQuiz';
import { QuestionConfig } from './types';
import { loadQuestion } from './lib/storage';

type Tab = 'create' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [question, setQuestion] = useState<QuestionConfig | null>(null);

  // Load saved question on app start
  useEffect(() => {
    const savedQuestion = loadQuestion();
    if (savedQuestion) {
      setQuestion(savedQuestion);
    }
  }, []);

  const handleQuestionSaved = () => {
    // Reload the question from storage
    const savedQuestion = loadQuestion();
    setQuestion(savedQuestion);
  };

  const handleCreateQuestion = () => {
    setActiveTab('create');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Exaim — Fill-in Prototype</h1>
          <p className="text-gray-600 mt-1">Interactive fill-in-the-blank quiz with smart answer matching</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Question
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quiz'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'create' && (
          <CreateQuestion onQuestionSaved={handleQuestionSaved} />
        )}
        {activeTab === 'quiz' && (
          <TakeQuiz 
            question={question} 
            onCreateQuestion={handleCreateQuestion}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built with React + Vite + TypeScript + Tailwind CSS
            </p>
            <p className="mt-1">
              Features fuzzy matching, plural handling, and flexible typo tolerance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
