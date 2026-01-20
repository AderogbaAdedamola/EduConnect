import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardHeader from '../components/CreateQuestion/WizardHeader'
import WizardFooter from '../components/CreateQuestion/WizardFooter'
import Step1BasicInfo from '../components/CreateQuestion/Step1BasicInfo'
import Step2QuestionType from '../components/CreateQuestion/Step2QuestionType'
import Step3CreateQuestions from '../components/CreateQuestion/Step3CreateQuestions'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"

 function CreateQuestionBody() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    category: '',
    aiEnabled: true,
    
    // Step 2: Question Type
    questionType: '', // 'quiz' or 'flexible'
    
    // Step 3: Questions
    questions: []
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle finish/publish
      console.log('Publishing:', formData);
      // TODO: Send to API
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure? All progress will be lost.')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col">
      <div className="flex-1 flex items-start md:items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl h-full md:h-auto flex flex-col">
          
          {/* Wizard Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full md:h-auto">
            
            {/* Header */}
            <WizardHeader 
              currentStep={currentStep}
              onBack={handleBack}
              onCancel={handleCancel}
            />

            {/* Content - Takes remaining height */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {currentStep === 1 && (
                <Step1BasicInfo formData={formData} setFormData={setFormData} />
              )}
              
              {currentStep === 2 && (
                <Step2QuestionType formData={formData} setFormData={setFormData} />
              )}
              
              {currentStep === 3 && (
                <Step3CreateQuestions formData={formData} setFormData={setFormData} />
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
  );
}

function CreateQuestion() {
    const { user, darkMode, setDarkMode } = useAuth()

    return (
        <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className="flex-1 lg:ms-64 mb-10  lg:mb-0 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            {/* <Header darkMode={darkMode} setDarkMode={setDarkMode} /> */}
            <CreateQuestionBody />
            </main>
            <BottomNav />
        </div>
        </div>
    );
    }

export default CreateQuestion