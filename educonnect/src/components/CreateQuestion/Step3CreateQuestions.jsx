import { useEffect, useRef, useState } from "react"
import Icon from '../common/Icon';
import QuestionCard from './QuestionCard';

export default function Step3CreateQuestions({ formData, setFormData }) {
  const initialized = useRef(false)
  const cardRefs = useRef({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [quizSettingsOpen, setQuizSettingsOpen] = useState(false)

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: 'short',
      options: ['', ''],
      correctAnswer: null,
      points: formData.quizSettings?.pointsPerQuestion ?? 10,
      suggestedAnswer: '',
      required: false,
    }
    setFormData(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }))
    setTimeout(() => {
      const newIndex = formData.questions.length
      setActiveIndex(newIndex)
      scrollToCard(newIndex)
    }, 50)
  }

  const duplicateQuestion = (index) => {
    const original = formData.questions[index]
    const duplicate = { ...original, id: Date.now(), options: [...(original.options ?? [])] }
    setFormData(prev => {
      const newQuestions = [...prev.questions]
      newQuestions.splice(index + 1, 0, duplicate)
      return { ...prev, questions: newQuestions }
    })
    setTimeout(() => {
      const dupIndex = index + 1
      setActiveIndex(dupIndex)
      scrollToCard(dupIndex)
    }, 50)
  }

  const scrollToCard = (index) => {
    setTimeout(() => {
      const el = cardRefs.current[index]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  const updateQuestion = (index, field, value) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions]
      newQuestions[index] = { ...newQuestions[index], [field]: value }
      return { ...prev, questions: newQuestions }
    })
  }

  const deleteQuestion = (index) => {
    if (formData.questions.length === 1) { alert('You must have at least one question'); return }
    setFormData(prev => ({ ...prev, questions: prev.questions.filter((_, i) => i !== index) }))
    setActiveIndex(prev => (index <= prev ? Math.max(0, prev - 1) : prev))
  }

  const updateQuizSettings = (field, value) => {
    setFormData(prev => ({
      ...prev,
      quizSettings: { ...prev.quizSettings, [field]: value }
    }))
  }

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (!initialized.current && formData.questions.length === 0) {
      initialized.current = true
      addQuestion()
    }
  }, [])

  const timerMin = formData.quizSettings?.timerMin ?? 15
  const timerSec = formData.quizSettings?.timerSec ?? 0
  const pointsPerQuestion = formData.quizSettings?.pointsPerQuestion ?? 10

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <Icon name="file-text" className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Create {formData.questionType === 'quiz' ? 'Quiz' : 'Questions'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {formData.questions.length} question{formData.questions.length !== 1 ? 's' : ''} added
          </p>
        </div>
      </div>

      {/* Quiz Settings — collapsible */}
      {formData.questionType === 'quiz' && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
          {/* Toggle header */}
          <button
            type="button"
            onClick={() => setQuizSettingsOpen(prev => !prev)}
            aria-expanded={quizSettingsOpen}
            aria-controls="quiz-settings-panel"
            className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
          >
            <div className="flex items-center gap-2.5">
              <Icon name="settings" aria-hidden="true" className="text-slate-400 dark:text-slate-500 text-sm" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quiz Settings</span>
              {/* Summary when collapsed */}
              {!quizSettingsOpen && (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                  {timerMin}m {timerSec}s · {pointsPerQuestion} pts/question
                </span>
              )}
            </div>
            <div className={`text-slate-400 transition-transform duration-200 ${quizSettingsOpen ? 'rotate-180' : ''}`}>
              <Icon name="chevron-down" aria-hidden="true" />
            </div>
          </button>

          {/* Panel */}
          {quizSettingsOpen && (
            <div
              id="quiz-settings-panel"
              className="px-5 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Timer */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Time Limit
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                      <input
                        type="number"
                        value={timerMin}
                        min="0"
                        onChange={(e) => updateQuizSettings('timerMin', Number(e.target.value))}
                        aria-label="Minutes"
                        className="w-12 outline-none text-center font-semibold text-slate-900 dark:text-white bg-transparent"
                      />
                      <span className="text-xs text-slate-500 font-medium">min</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-400 font-bold">:</span>
                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                      <input
                        type="number"
                        value={timerSec}
                        min="0"
                        max="59"
                        onChange={(e) => updateQuizSettings('timerSec', Number(e.target.value))}
                        aria-label="Seconds"
                        className="w-12 outline-none text-center font-semibold text-slate-900 dark:text-white bg-transparent"
                      />
                      <span className="text-xs text-slate-500 font-medium">sec</span>
                    </div>
                  </div>
                </div>

                {/* Points per question */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Default Points / Question
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 w-fit">
                    <Icon name="star" aria-hidden="true" className="text-amber-400 text-sm shrink-0" />
                    <input
                      type="number"
                      value={pointsPerQuestion}
                      min="1"
                      onChange={(e) => updateQuizSettings('pointsPerQuestion', Number(e.target.value))}
                      aria-label="Default points per question"
                      className="w-16 outline-none text-center font-semibold text-slate-900 dark:text-white bg-transparent"
                    />
                    <span className="text-xs text-slate-500 font-medium">pts</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-3">
        {formData.questions.map((question, index) => (
          <div key={question.id} ref={(el) => (cardRefs.current[index] = el)}>
            <QuestionCard
              question={question}
              index={index}
              questionType={formData.questionType}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
              onDuplicate={duplicateQuestion}
            />
          </div>
        ))}
      </div>

      {/* Add Question */}
      <button
        type="button"
        onClick={addQuestion}
        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl py-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-semibold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 flex items-center justify-center transition-colors">
          <Icon name="plus" aria-hidden="true" className="text-sm" />
        </div>
        Add Question
      </button>
    </div>
  )
}