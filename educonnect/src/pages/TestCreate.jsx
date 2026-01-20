import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Layout/Sidebar';
import BottomNav from '../components/Layout/BottomNav';
import Header from '../components/Layout/Header';
import Icon from '../components/common/Icon';

export default function CreateQuestion() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useAuth();

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row w-full">
        {/* Your existing Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 lg:ms-64 mb-10 lg:mb-0 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-[#0b0f19]">
          {/* Header with Dark Mode Toggle */}
          <CreateQuestionHeader darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Page Content */}
          <CreateQuestionContent />
        </main>

        {/* Your existing Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}

// Header Component
function CreateQuestionHeader({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-[#0b0f19]/80 backdrop-blur-md px-4 lg:px-8 py-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        {/* Left: Back Button + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          >
            <Icon name="arrow-left" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-xl lg:text-2xl font-bold">Create Questions</h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:border-primary transition-colors"
          >
            <Icon name={darkMode ? 'sun' : 'moon'} />
          </button>

          {/* Save Draft Button */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <Icon name="save" />
            Save Draft
          </button>

          {/* Publish Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all">
            <Icon name="send" />
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Main Content Component
function CreateQuestionContent() {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANEL - Question List & Set Info */}
        <div className="lg:col-span-4 space-y-6">
          <LeftPanel />
        </div>

        {/* RIGHT PANEL - Question Editor */}
        <div className="lg:col-span-8">
          <RightPanel />
        </div>

      </div>
    </div>
  );
}

// Left Panel Component
function LeftPanel() {
  return (
    <div className="space-y-6">
      {/* Set Information Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Icon name="info" />
          Question Set
        </h3>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Untitled Question Set"
              className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Category
            </label>
            <select className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="">Select category</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="programming">Programming</option>
              <option value="biology">Biology</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="history">History</option>
              <option value="language">Language</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Type Badge */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Type
            </label>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
              <Icon name="layers" />
              Mixed
            </span>
          </div>

          {/* Global AI Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="text-purple-500" />
              <span className="text-sm font-medium">Global AI Feedback</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Questions List Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Icon name="list" />
          Questions
        </h3>

        {/* Question Items */}
        <div className="space-y-3">
          {/* Active Question */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl">
            <Icon name="chevron-right" className="text-blue-600 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">1.</span>
                <span className="text-sm font-medium truncate">Question title goes here...</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded font-semibold">
                  MCQ
                </span>
                <span>• 10 pts</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <Icon name="trash-2" />
            </button>
          </div>

          {/* Completed Question Example */}
          <div className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl cursor-pointer transition-colors border-2 border-transparent">
            <Icon name="check-circle" className="text-green-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">2.</span>
                <span className="text-sm font-medium truncate">Another question here...</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded font-semibold">
                  Short Answer
                </span>
                <span>• 15 pts</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <Icon name="trash-2" />
            </button>
          </div>
        </div>

        {/* Next Question Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">
          <Icon name="plus" />
          Next Question
        </button>
      </div>
    </div>
  );
}

// Right Panel Component
function RightPanel() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700 shadow-sm min-h-[600px]">
      
      {/* Question Type Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30">
            Multiple Choice
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            True/False
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            Short Answer
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            Image Upload
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            Quiz
          </button>
        </div>
      </div>

      {/* Placeholder for Editor Content */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Icon name="file-text" className="text-6xl text-slate-300 dark:text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">
          Question Editor
        </h3>
        <p className="text-slate-400 dark:text-slate-500">
          We'll build the editor content next
        </p>
      </div>

    </div>
  );
}