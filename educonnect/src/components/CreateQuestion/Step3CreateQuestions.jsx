import { useEffect, useRef } from "react"
import Icon from '../common/Icon';
import QuestionCard from './QuestionCard';

export default function Step3CreateQuestions({ formData, setFormData }) {
  const initialized = useRef(false)
  
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: 'mcq',
      options: ['', ''], 
      correctAnswer: null,
      points: 10,
      suggestedAnswer: ''
    }
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  }
  useEffect(() =>{
    localStorage.setItem("formData", JSON.stringify(formData))
  }, [formData])

  const updateQuestion = (index, field, value) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      return { ...prev, questions: newQuestions };
    });
  };

  const deleteQuestion = (index) => {
    if (formData.questions.length === 1) {
      alert('You must have at least one question');
      return;
    }
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  // Auto-add first question if none exist
  useEffect(() =>{
    if (!initialized.current && formData.questions.length === 0) {
      initialized.current = true;
      addQuestion();
  }
  }, [])
  

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <Icon name="file-text" className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">
          Create {formData.questionType === 'quiz' ? 'Quiz' : 'Questions'}
        </h2>
      </div>

      {/* Quiz Settings (if quiz type) */}
      {formData.questionType === 'quiz' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">Quiz Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                Timer
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  defaultValue="15" 
                  min="0"
                  className="w-20 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Min</span>
                <input 
                  type="number" 
                  defaultValue="0" 
                  min="0"
                  max="59"
                  className="w-20 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Sec</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                Points per Question
              </label>
              <input 
                type="number" 
                defaultValue="10" 
                min="1"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
                placeholder="Points per question" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Questions List - No container, just stack */}
      <div className="space-y-6">
        {formData.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            questionType={formData.questionType}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
          />
        ))}
      </div>

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-4 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-semibold"
      >
        <Icon name="plus" />
        Add Question
      </button>
    </div>
  );
}