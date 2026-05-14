import { useRef, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import WizardHeader from './WizardHeader'
import WizardFooter from './WizardFooter'
import Step1BasicInfo from './Step1BasicInfo'
import Step2QuestionType from './Step2QuestionType'
import Step3CreateQuestions from './Step3CreateQuestions'
import Step4SettingsAccess from "./Step4SettingsAccess"
import { useAuth } from "../../context/AuthContext"
import { parseAIResponse } from '../../utilities/aiParser'


 function CreateQuestionMain({setCreateManually, setCreateByAI}) {
  const { isCreatingQues, setIsCreatingQues } = useAuth()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  
  // Form data 
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    category: '',
    aiEnabled: true,
    
    // Step 2: Question Type
    questionType: '', // 'quiz' or 'flexible'
    
    // Step 3: Questions
    questions: [],
    
    // Step 4: Settings & Access
    quizSettings: {
      timerMin: 15,
      timerSec: 0,
      pointsPerQuestion: 10,
    },
    settings: {
      requireLogin: false,
      allowAnonymous: true,
      oneResponseOnly: false,
      showRespondentsToCreator: true,
      showResultsToRespondent: true,
      hasDeadline: false,
      deadline: '',
      collectUserData: false,
    },
    userDataFields: [],
  });

  // Handle AI pre-fill
  useEffect(() => {
    if (searchParams.get('from') === 'ai') {
      const savedAI = localStorage.getItem('ai_generated_questions')
      if (savedAI) {
        try {
          const { raw } = JSON.parse(savedAI)
          const parsed = parseAIResponse(raw)
          
          setFormData(prev => ({
            ...prev,
            title: parsed.title || prev.title,
            description: parsed.description || prev.description,
            questions: parsed.questions.length > 0 ? parsed.questions : prev.questions,
            questionType: 'flexible' // Default to flexible for AI generation
          }))
          
          // Switch to manual creation mode if needed
          setCreateManually(true)
          setIsCreatingQues(true)
        } catch (err) {
          console.error('Failed to parse AI questions:', err)
        }
      }
    }
  }, [searchParams, setCreateManually, setIsCreatingQues])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle finish/publish
      console.log('Publishing:', formData)
      // TODO: Send to API
      //If API response is success
      localStorage.removeItem("formData")  
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure? All progress will be lost.')) {
      setIsCreatingQues(false)
      setCreateManually(false)
      setCreateByAI(false)
    }
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col">
      <div className="flex-1 flex items-start md:items-center justify-center p-4">
        <div className="w-full max-w-4xl h-full md:h-auto flex flex-col max-h-[calc(100vh-1.5rem)]">
          
          {/* Wizard Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full md:h-auto">
            
            {/* Header */}
            <WizardHeader 
              currentStep={currentStep}
              onBack={handleBack}
              onCancel={handleCancel}
            />

            {/* Content - Takes remaining height */}
            <div 
              className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
              {currentStep === 1 && (
                <Step1BasicInfo formData={formData} setFormData={setFormData} />
              )}
              
              {currentStep === 2 && (
                <Step2QuestionType 
                  formData={formData} 
                  setFormData={setFormData} />
              )}
              
              {currentStep === 3 && (
                <Step3CreateQuestions formData={formData}  setFormData={setFormData} />
              )}
              {currentStep === 4 && (
                <Step4SettingsAccess formData={formData}  setFormData={setFormData} />
              )}
            </div>

            {/* Footer */}
            <WizardFooter 
              currentStep={currentStep}
              onBack={handleBack}
              onNext={handleNext}
              onCancel={handleCancel}
              formData={formData}
            />

          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateQuestionMain