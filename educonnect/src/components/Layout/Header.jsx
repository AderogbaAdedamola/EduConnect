import React from 'react';
import Button from '../UI/Button';
import Icon from '../common/Icon'
import { useAuth } from "../../context/AuthContext"
import { Share2, MessageSquare, Sparkles, TrendingUp, Copy, ExternalLink, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';


const Header = ({ darkMode, setDarkMode }) => {
    const { user } = useAuth()
  return (
    <header className="sticky top-0 z-10 bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 backdrop-blur-md px-5 pt-3 pb-6 flex flex-col ">
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
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon name={darkMode ? 'sun' : 'moon'} />
          </button>

          {/* Notification Bell */}
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-sm hover:shadow-md transition-shadow">
            <Icon name="bell"/>
            <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>

          {/* New Question Button (Desktop) */}
          <div className="hidden sm:block">
            <Button
              variant="primary"
              icon= "message-square-plus"
              iconStyle="size-5"
              size="lg"
            >
              Create Question
            </Button>
          </div>
          {/* User profile Icon (Small Screen) */}
          <div className="block sm:hidden">
            <button className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold  border dark:border-slate-200 border-slate-700  shadow-sm hover:shadow-md transition-shadow">
              {"A"}
      </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-1 truncate">Hi, {user?.firstname || "Hey"}! 👋</h1>
      </div>
    </header>
  );
};

export default Header;