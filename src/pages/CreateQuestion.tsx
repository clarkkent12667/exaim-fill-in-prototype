import { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { QuestionConfig } from '../types';
import { saveQuestion } from '../lib/storage';

interface CreateQuestionProps {
  onQuestionSaved: () => void;
}

export function CreateQuestion({ onQuestionSaved }: CreateQuestionProps) {
  const [prompt, setPrompt] = useState('');
  const [answersText, setAnswersText] = useState('');
  const [errors, setErrors] = useState<{ prompt?: string; answers?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { prompt?: string; answers?: string } = {};
    
    if (!prompt.trim()) {
      newErrors.prompt = 'Question prompt is required';
    }
    
    if (!answersText.trim()) {
      newErrors.answers = 'At least one correct answer is required';
    } else {
      const answers = answersText.split(',').map(a => a.trim()).filter(a => a.length > 0);
      if (answers.length === 0) {
        newErrors.answers = 'At least one valid answer is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const answers = answersText
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    const config: QuestionConfig = {
      prompt: prompt.trim(),
      answers
      // allowPlural and typoTolerance will use defaults (true and 1)
    };

    saveQuestion(config);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    
    onQuestionSaved();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Question</h2>
            <p className="text-gray-600">
              Design a fill-in-the-blank question with flexible answer matching.
            </p>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 animate-slide-up">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Question saved successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          <Input
            label="Question Prompt"
            value={prompt}
            onChange={setPrompt}
            placeholder="A ______ is an atom that loses or gains electrons."
            error={errors.prompt}
            helperText="Use underscores (______) to indicate where students should fill in the blank."
            multiline
            rows={3}
          />

          <Input
            label="Correct Answers"
            value={answersText}
            onChange={setAnswersText}
            placeholder="ion, charged atom"
            error={errors.answers}
            helperText="Separate multiple correct answers with commas. Students can match any of these answers."
          />

          <div className="pt-4">
            <Button onClick={handleSave} type="submit">
              Save Question
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
