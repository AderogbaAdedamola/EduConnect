import React from 'react';
import Icon from '../common/Icon';

export default function QuestionRenderer({ question, answer, onChange, onAutoAdvance }) {
  const { type, question: title, options, required } = question;

  // Answer can be a string (for text) or an array of indices (for multiple choice / checkbox)
  const isSelected = (index) => {
    if (Array.isArray(answer)) return answer.includes(index);
    return false;
  };

  const handleOptionClick = (index) => {
    if (type === 'Multiple Choice' || type === 'Dropdown') {
      onChange([index]);
      // Slight delay to show selection before auto advancing
      setTimeout(() => {
        if (onAutoAdvance) onAutoAdvance();
      }, 300);
    } else if (type === 'Checkboxes') {
      const current = Array.isArray(answer) ? [...answer] : [];
      if (current.includes(index)) {
        onChange(current.filter((i) => i !== index));
      } else {
        onChange([...current, index]);
      }
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'Short Answer':
        return (
          <input
            type="text"
            className="w-full bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 text-2xl py-2 outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
            placeholder="Type your answer here..."
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        );
      case 'Paragraph':
        return (
          <textarea
            className="w-full bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 text-xl py-2 outline-none transition-colors min-h-[150px] resize-y placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100 custom-scrollbar"
            placeholder="Type your answer here..."
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        );
      case 'Multiple Choice':
      case 'Dropdown': // Treating Dropdown as MCQ for the Typeform UX
      case 'Checkboxes':
        return (
          <div className="space-y-3 mt-6">
            {options?.map((opt, index) => {
              const selected = isSelected(index);
              // Typeform keys shortcut style (A, B, C...)
              const letter = String.fromCharCode(65 + index);
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${selected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md transform scale-[1.01]' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200'
                    }
                  `}
                >
                  <div className={`
                    w-7 h-7 shrink-0 rounded-md border flex items-center justify-center font-bold text-sm transition-colors
                    ${selected 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                    }
                  `}>
                    {letter}
                  </div>
                  <span className="text-lg font-medium leading-tight flex-1">
                    {opt}
                  </span>
                  {selected && (
                    <Icon name="check" className="text-blue-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        );
      default:
        return <p className="text-red-500">Unsupported question type.</p>;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-center min-h-[60vh] py-12 px-4 md:px-0 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
          {title}
        </h2>
        {required && (
          <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 flex items-center gap-1">
            <Icon name="asterisk" className="w-3 h-3" /> Required
          </span>
        )}
      </div>
      
      <div className="w-full">
        {renderInput()}
      </div>
    </div>
  );
}
