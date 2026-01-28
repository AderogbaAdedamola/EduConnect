import Icon from '../common/Icon'

export default function DesktopView({
    activeView, 
    setActiveView, 
    isDropdownOpen, 
    setIsDropdownOpen
}){

      const answeredQuestions = [
        { id: 1, title: 'How to solve quadratic equations?', date: '2 hours ago', accuracy: '95%' },
        { id: 2, title: 'Chemistry: Balancing equations', date: 'Yesterday', accuracy: '88%' },
        { id: 3, title: 'Physics: Newton\'s laws', date: '3 days ago', accuracy: '92%' },
        { id: 4, title: 'JavaScript async/await', date: '1 week ago', accuracy: '96%' },
    ]

    const createdQuestions = [
        { id: 1, title: 'Algebra test for beginners', date: 'Today', responses: 24 },
        { id: 2, title: 'Chemistry mid-term review', date: '2 days ago', responses: 42 },
        { id: 3, title: 'Physics motion problems', date: '5 days ago', responses: 18 },
        { id: 4, title: 'Web development quiz', date: '2 weeks ago', responses: 56 },
    ]
    return(
        <div className="hidden md:flex gap-6">
        {/* Answered Questions Column */}
        <div className={`flex-1 transition-all duration-300 ${activeView === 'answered' ? 'opacity-100' : 'opacity-70'}`}>
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setActiveView('answered')}
          >
            {/* Column Header */}
            <div className={`p-6 border-b ${activeView === 'answered' ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${activeView === 'answered' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  <Icon 
                    name="message-square" 
                    className={activeView === 'answered' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Answered Questions
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Questions you've answered
                  </p>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="p-4 space-y-3">
              {answeredQuestions.map((question) => (
                <div 
                  key={question.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                    {question.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      {question.date}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg font-medium">
                      {question.accuracy}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <button className="w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all 
              </button>
            </div>
          </div>
        </div>

        {/* Divider Line with Arrow */}
        <div className="relative flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setActiveView(prev => prev === 'answered' ? 'created' : 'answered')}
              className="w-10 h-10 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-full flex items-center justify-center hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:scale-110"
            >
              <Icon 
                name={activeView === 'answered' ? 'chevron-right' : 'chevron-left'} 
                className="text-slate-600 dark:text-slate-400"
              />
            </button>
          </div>
          <div className="h-full w-px bg-slate-300 dark:bg-slate-700"></div>
        </div>

        {/* Created Questions Column */}
        <div className={`flex-1 transition-all duration-300 ${activeView === 'created' ? 'opacity-100' : 'opacity-70'}`}>
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setActiveView('created')}
          >
            {/* Column Header */}
            <div className={`p-6 border-b ${activeView === 'created' ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${activeView === 'created' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  <Icon 
                    name="file-text" 
                    className={activeView === 'created' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Created Questions
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Questions you've created
                  </p>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="p-4 space-y-3">
              {createdQuestions.map((question) => (
                <div 
                  key={question.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                    {question.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      {question.date}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg font-medium">
                      {question.responses} responses
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <button className="w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all 
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}