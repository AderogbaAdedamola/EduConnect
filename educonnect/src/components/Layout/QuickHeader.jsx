import React from 'react';
import Button from '../UI/Button';
import Icon from '../common/Icon'
import { useAuth } from "../../context/AuthContext"
import { Share2, MessageSquare, Sparkles, TrendingUp, Copy, ExternalLink, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom"


const QuickHeader = ({ darkMode, setDarkMode }) => {
    const { user, toggleTheme } = useAuth()
    const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 backdrop-blur-md px-5 pt-3 pb-2 flex flex-col border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() =>toggleTheme()}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon name={darkMode ? 'sun' : 'moon'} />
          </button>

          {/* Notification Bell */}
          <button className="w-10 h-10  rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-sm hover:shadow-md transition-shadow">
            <Icon name="bell"/>
            <span className="absolute top-2.5 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>

          {/* User profile Icon (Small Screen) */}
          <div className="block lg:hidden">
            <button className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold  border dark:border-slate-200 border-slate-700  shadow-sm hover:shadow-md transition-shadow">
              {"A"}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default QuickHeader;