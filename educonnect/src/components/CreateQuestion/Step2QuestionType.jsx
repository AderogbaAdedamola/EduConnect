import Icon from '../common/Icon';

export default function Step2QuestionType({ formData, setFormData }) {
  const selectType = (type) => {
    setFormData(prev => ({ ...prev, questionType: type }));
  };

  const questionTypes = [
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Timed test with scoring and multiple questions',
      icon: '⏱️',
      features: [
        'Timer and points for each question',
        'Supports multiple choice or short answer types',
        'Well-suited for assessments'
      ]
    },
    {
      id: 'flexible',
      title: 'Flexible Question',
      description: 'Questions with flexible answer types',
      icon: '📝',
      features: [
        'Supports multiple choice or short answer types',
        'No time limits',
        'Perfect for surveys or practice'
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon name="layers" className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Step 2 of 3 - Choose Question Type</h2>
      </div>

      {/* Question Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {questionTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => selectType(type.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              formData.questionType === type.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
          >
            {/* Checkmark */}
            {formData.questionType === type.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon name="check" className="text-white text-sm" />
              </div>
            )}

            {/* Icon */}
            <div className="text-4xl mb-3">{type.icon}</div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{type.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{type.description}</p>

            {/* Features */}
            <ul className="space-y-2">
              {type.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Icon name="circle" className="text-blue-500 mt-0.5 text-xs flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}