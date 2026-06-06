import React, { useState, useEffect } from 'react';
import QuestionRenderer from './QuestionRenderer';
import Icon from '../common/Icon';

export default function AnswerFlow({ questionSet, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isReviewing, setIsReviewing] = useState(false);

  const { questions, title, settings } = questionSet;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && (currentQuestion.type === 'Short Answer' || currentQuestion.type === 'Paragraph')) {
        // Only auto-advance on enter for text if shift is not pressed (allow multiline for paragraph)
        if (currentQuestion.type === 'Paragraph' && e.shiftKey) return;
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion]);

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false);
      setCurrentIndex(totalQuestions - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    const missingRequired = questions.filter(q => q.required && (!answers[q.id] || answers[q.id].length === 0));
    if (missingRequired.length > 0) {
      alert("Please answer all required questions.");
      setIsReviewing(false);
      setCurrentIndex(questions.findIndex(q => q.id === missingRequired[0].id));
      return;
    }
    onComplete(answers);
  };

  const progressPercentage = ((currentIndex) / totalQuestions) * 100;
  const isCurrentAnswered = answers[currentQuestion?.id] !== undefined && answers[currentQuestion?.id]?.length !== 0;

  if (isReviewing) {
    return (
      <div className="w-full max-w-3xl mx-auto py-12 px-4 animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="check-circle" className="text-3xl text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Review Responses</h2>
          <p className="text-slate-500 dark:text-slate-400">Make sure everything looks good before submitting.</p>
        </div>

        <div className="space-y-6 mb-12">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-blue-300 transition-colors" onClick={() => { setIsReviewing(false); setCurrentIndex(i); }}>
              <div className="flex gap-4">
                <span className="text-slate-400 font-medium">{i + 1}.</span>
                <div className="flex-1">
                  <h3 className="text-slate-800 dark:text-slate-200 font-medium mb-2">{q.question}</h3>
                  <div className="text-slate-600 dark:text-slate-400 font-semibold">
                    {/* Format the answer beautifully */}
                    {!answers[q.id] || answers[q.id].length === 0 ? (
                      <span className="text-red-400 italic">Not answered {q.required && '(Required)'}</span>
                    ) : Array.isArray(answers[q.id]) ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {answers[q.id].map(idx => (
                          <li key={idx}>{q.options[idx]}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{answers[q.id]}</p>
                    )}
                  </div>
                </div>
                <Icon name="edit-2" className="text-slate-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 sticky bottom-6 shadow-xl">
          <button 
            onClick={handleBack}
            className="px-6 py-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Back
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
          >
            Submit Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Top Progress Bar */}
      <div className="h-1.5 bg-slate-200 dark:bg-slate-800 w-full fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center">
        <QuestionRenderer 
          key={currentQuestion.id} // Force remount on question change for animations
          question={currentQuestion} 
          answer={answers[currentQuestion.id]} 
          onChange={handleAnswerChange}
          onAutoAdvance={handleNext}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] px-6 py-4 flex items-center justify-between z-40">
        <button 
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Icon name="chevron-up" className="text-xl" />
          <span>Previous</span>
        </button>

        <button 
          onClick={handleNext}
          disabled={currentQuestion.required && !isCurrentAnswered}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900/50 disabled:text-blue-100 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-md"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Review' : 'Next'}</span>
          <Icon name="chevron-down" className="text-xl" />
        </button>
      </div>
    </div>
  );
}
