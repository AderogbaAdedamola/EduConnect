import Icon from '../common/Icon';

export default function WizardHeader({ currentStep, onBack, onCancel }) {
  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return 'Step 1 of 3 - Basic Info';
      case 2: return 'Step 2 of 3 - Choose Question Type';
      case 3: return 'Step 3 of 3 - Create Questions';
      default: return '';
    }
  };

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-2 md:px-5 py-2 shrink-0">
      <div className="flex items-center justify-between text-white">
        <button
          onClick={currentStep > 1 ? onBack : onCancel}
          className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
        >
          <Icon name="arrow-left" />
          <span className="hidden sm:inline">Back</span>
        </button>
        
        <h1 className="text-base md:text-lg font-bold text-center flex-1 px-2">
          Create Question
        </h1>

        <button
          onClick={onCancel}
          className="hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
        >
          <Icon name="x" />
        </button>
      </div>
    </div>
  );
}