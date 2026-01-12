// src/components/Layout/Header.jsx
import React from 'react';
import Button from '../UI/Button';
import Icon from '../common/Icon'
import { useAuth } from "../../context/AuthContext"

const Header = ({ darkMode, setDarkMode }) => {
    const { user } = useAuth()
  return (
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-[#0b0f19]/80 backdrop-blur-md px-8 py-6 flex items-center justify-between">
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
        <h1 className="text-3xl font-bold mt-1">Hi, {user?.firstname || "Hey"}! 👋</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <Icon name={darkMode ? 'light_mode' : 'dark_mode'} />
        </button>

        {/* Notification Bell */}
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-sm hover:shadow-md transition-shadow">
          <Icon name="notifications"/>
          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
        </button>

        {/* New Assignment Button (Desktop) */}
        <div className="hidden sm:block">
          <Button
            variant="primary"
            icon="add"
            size="lg"
          >
            Create Question
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;