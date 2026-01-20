import Icon from '../common/Icon';

export default function QuestionCard({ question, index, questionType, onUpdate, onDelete }) {
  const addOption = () => {
    const newOptions = [...question.options, ''];
    onUpdate(index, 'options', newOptions);
  };

  const removeOption = (optIndex) => {
    if (question.options.length <= 2) {
      alert('Must have at least 2 options');
      return;
    }
    const newOptions = question.options.filter((_, i) => i !== optIndex);
    onUpdate(index, 'options', newOptions);
    
    // Adjust correct answer if needed
    if (question.correctAnswer === optIndex) {
      onUpdate(index, 'correctAnswer', null);
    } else if (question.correctAnswer > optIndex) {
      onUpdate(index, 'correctAnswer', question.correctAnswer - 1);
    }
  };

  const updateOption = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    onUpdate(index, 'options', newOptions);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 md:p-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">
          Question {index + 1}
        </h3>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
          title="Delete question"
        >
          <Icon name="trash-2" />
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
          Question
        </label>
        <textarea
          value={question.text}
          onChange={(e) => onUpdate(index, 'text', e.target.value)}
          placeholder="Enter your question here..."
          rows="3"
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
        />
      </div>

      {/* Answer Type (Flexible only) */}
      {questionType === 'flexible' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
            Answer Type
          </label>
          <select
            value={question.type}
            onChange={(e) => onUpdate(index, 'type', e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          >
            <option value="mcq">Multiple Choice</option>
            <option value="text">Text Input</option>
            <option value="short">Short Answer</option>
            <option value="image">Image Upload</option>
          </select>
        </div>
      )}

      {/* MCQ Options */}
      {question.type === 'mcq' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            Options (Select the correct answer)
          </label>
          <div className="space-y-3">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-start gap-2">
                {/* Radio button for correct answer */}
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={question.correctAnswer === optIndex}
                  onChange={() => onUpdate(index, 'correctAnswer', optIndex)}
                  className="w-4 h-4 text-blue-600 mt-3 flex-shrink-0 cursor-pointer"
                />
                
                {/* Option input */}
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                  className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                />

                {/* Remove option button (only if more than 2) */}
                {question.options.length > 2 && (
                  <button
                    onClick={() => removeOption(optIndex)}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors flex-shrink-0"
                    title="Remove option"
                  >
                    <Icon name="x" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Option Button */}
          <button
            onClick={addOption}
            className="mt-3 w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg py-2 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-semibold"
          >
            <Icon name="plus" className="text-sm" />
            Add Another Option
          </button>
        </div>
      )}

      {/* Suggested Answer (Non-MCQ) */}
      {question.type !== 'mcq' && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
            Suggested Answer (Optional)
          </label>
          <textarea
            value={question.suggestedAnswer}
            onChange={(e) => onUpdate(index, 'suggestedAnswer', e.target.value)}
            placeholder="Provide a suggested answer or explanation..."
            rows="3"
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      )}
    </div>
  );
}