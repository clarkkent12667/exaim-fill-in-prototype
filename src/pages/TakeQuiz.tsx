import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { QuestionConfig, GradeReport } from '../types';
import { evaluateAnswer } from '../lib/match';

interface TakeQuizProps {
  question: QuestionConfig | null;
  onCreateQuestion: () => void;
}

export function TakeQuiz({ question, onCreateQuestion }: TakeQuizProps) {
  const [studentAnswer, setStudentAnswer] = useState('');
  const [gradeReport, setGradeReport] = useState<GradeReport | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleCheckAnswer = () => {
    if (!question || !studentAnswer.trim()) {
      return;
    }

    const report = evaluateAnswer(studentAnswer.trim(), question);
    setGradeReport(report);
    setHasSubmitted(true);
  };

  const handleReset = () => {
    setStudentAnswer('');
    setGradeReport(null);
    setHasSubmitted(false);
  };

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-6xl text-gray-300">📝</div>
            <h2 className="text-2xl font-bold text-gray-900">No Question Available</h2>
            <p className="text-gray-600">
              You need to create a question first before you can take the quiz.
            </p>
            <Button onClick={onCreateQuestion} variant="primary">
              Create Question
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getResultBanner = () => {
    if (!gradeReport) return null;

    const { correct, almost } = gradeReport;

    if (correct) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 animate-slide-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Correct!</h3>
              <p className="text-sm text-green-700">Great job! Your answer matches one of the correct answers.</p>
            </div>
          </div>
        </div>
      );
    }

    if (almost) {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 animate-slide-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-amber-800">Almost there!</h3>
              <p className="text-sm text-amber-700">You're close, but not quite right. Check your spelling or try a different approach.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 animate-slide-up">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">❌</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Incorrect</h3>
            <p className="text-sm text-red-700">That's not quite right. Try again or check the question carefully.</p>
          </div>
        </div>
      </div>
    );
  };

  const getDetailsRow = () => {
    if (!gradeReport || !hasSubmitted) return null;

    const { studentNormalized, bestAnswer, distance, similarityPct } = gradeReport;

    return (
      <div className="bg-gray-50 rounded-md p-3 text-sm space-y-1 animate-fade-in">
        <div className="flex justify-between">
          <span className="text-gray-600">Your answer (normalized):</span>
          <span className="font-mono text-gray-900">"{studentNormalized}"</span>
        </div>
        {bestAnswer && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Best match:</span>
              <span className="font-mono text-gray-900">"{bestAnswer}"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance:</span>
              <span className="font-mono text-gray-900">{distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Similarity:</span>
              <span className="font-mono text-gray-900">{similarityPct?.toFixed(1)}%</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Take Quiz</h2>
            <p className="text-gray-600">
              Answer the question below. The system will check your answer with flexible matching.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-medium text-blue-900 mb-2">Question:</h3>
            <p className="text-blue-800 whitespace-pre-wrap">{question.prompt}</p>
          </div>

          <Input
            label="Your Answer"
            value={studentAnswer}
            onChange={setStudentAnswer}
            placeholder="Type your answer here..."
            helperText="Don't worry about perfect spelling - the system is flexible!"
          />

          <div className="flex space-x-3">
            <Button 
              onClick={handleCheckAnswer} 
              disabled={!studentAnswer.trim()}
            >
              Check Answer
            </Button>
            {hasSubmitted && (
              <Button onClick={handleReset} variant="secondary">
                Try Again
              </Button>
            )}
          </div>

          {getResultBanner()}
          {getDetailsRow()}
        </div>
      </Card>
    </div>
  );
}
