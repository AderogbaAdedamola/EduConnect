import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardHeader from './WizardHeader'
import WizardFooter from './WizardFooter'
import Step1BasicInfo from './Step1BasicInfo'
import Step2QuestionType from './Step2QuestionType'
import Step3CreateQuestions from './Step3CreateQuestions'
import Step4UserInfo from "./Step4UserInfo"
import { useAuth } from "../../context/AuthContext"


 function CreateQuestionMain({setCreateManually, setCreateByAI}) {
  const { isCreatingQues, setIsCreatingQues } = useAuth()
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1)
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    category: '',
    aiEnabled: true,
    
    // Step 2: Question Type
    questionType: '', // 'quiz' or 'flexible'
    
    // Step 3: Questions
    questions: [],
    // step 4 (optional)
    respondantData : {}
  });

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
                <Step4UserInfo formData={formData}  setFormData={setFormData} />
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