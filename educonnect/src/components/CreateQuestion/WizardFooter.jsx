import Icon from '../common/Icon';

export default function WizardFooter({ currentStep, onBack, onNext, onCancel, formData }) {
  // In WizardFooter.jsx - Update canProceed function
const canProceed = () => {
  if (currentStep === 1) return true;
  if (currentStep === 2) return formData.questionType !== '';
  if (currentStep === 3) return formData.questions.length > 0;
  if (currentStep === 4) {
    // If not asking for user data, can proceed
    if (!formData.askUserData) return true;
    
    // If asking for user data, all fields must have placeholders
    return formData.userDataFields && 
           formData.userDataFields.length > 0 &&
           formData.userDataFields.every(field => field.placeholder.trim());
  }
  return true;
};

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-2 md:px-5 py-2 shrink-0">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onCancel}
          className="px-4 md:px-6 py-2.5 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-sm md:text-base"
        >
          Cancel
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          {currentStep > 1 && (
            <button
              onClick={onBack}
              className="px-4 md:px-6 py-2.5 rounded-xl font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm md:text-base"
            >
              Back
            </button>
          )}

          <button
            onClick={onNext}
            disabled={!canProceed()}
            className="px-4 md:px-6 py-2.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            {currentStep === 4 ? 'Finish' : 'Next'}
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}