import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Layout/Sidebar';
import BottomNav from '../components/Layout/BottomNav';
import QuickHeader from '../components/Layout/QuickHeader';
import HistoryList from '../components/History/HistoryList';
import TabSwitcher from '../components/History/TabSwitcher';

const createdQuestions = [
  { id: 1, title: 'How do you solve quadratic equations?',  type: 'MCQ'          },
  { id: 2, title: 'Explain the process of photosynthesis',  type: 'Short Answer' },
  { id: 3, title: 'JavaScript async/await quiz',            type: 'Quiz'         },
  { id: 4, title: "What is Newton's Third Law?",            type: 'Text Input'   },
  { id: 5, title: 'Describe the structure of a DNA strand', type: 'Image Upload' },
];

const answeredQuestions = [
  { id: 1, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 2, title: 'Describe the water cycle in detail', type: 'Short Answer' },
  { id: 3, title: 'Solve: x² + 5x + 6 = 0',           type: 'Text Input'   },
  { id: 4, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 5, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 6, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 7, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 8, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 9, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 10, title: 'What is the capital of France?',     type: 'MCQ'          },
  { id: 11, title: 'React hooks fundamentals quiz',      type: 'Quiz'         },
];

const tabs = [
  { id: 'created',  label: 'Created',  icon: 'file-plus'    },
  { id: 'answered', label: 'Answered', icon: 'check-circle' },
];

function HistoryBody() {
  const [activeTab, setActiveTab]   = useState('created');
  const [loading, setLoading]       = useState(true);

  
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [activeTab]);

  const list = activeTab === 'created' ? createdQuestions : answeredQuestions;

  return (
    
    <div className="flex flex-col  h-[calc(100vh-72px)] px-4 md:px-8 pb-4 max-w-4xl mx-auto">

      
      <div className="shrink-0 py-4">
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            created:  createdQuestions.length,
            answered: answeredQuestions.length,
          }}
        />
      </div>

      {/* List — scrolls independently */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar pb-9">
        <HistoryList list={list} activeTab={activeTab} loading={loading} />
      </div>

    </div>
  );
}

export default function History() {
  const { theme } = useAuth();

  return (
    <div className="min-h-screen flex ">
      <div className="flex flex-col lg:flex-row w-full">
        <Sidebar />
        {/* overflow-hidden on main stops the page from scrolling */}
        <main className="flex-1 lg:ms-64 mb-4 lg:mb-0 overflow-hidden bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
          <QuickHeader />
          <HistoryBody />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}