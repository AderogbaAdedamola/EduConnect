// src/components/Layout/BottomNav.jsx
import React from 'react';
import Icon from '../common/Icon';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = [
    { icon: 'layout-dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'message-square-plus', label: 'Create', path: '/create-question' },
    { icon: 'sparkles', label: 'Response', path: '/response' },
    { icon: 'history', label: 'History', path: '/history' },
    { icon: 'notebook-pen', label: 'Answer', path: '/answer-questions' },
    // { icon: 'settings', label: 'Settings' },
  ];

  const navigateTo =(path) =>{
    navigate(path)
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname.toLowerCase().startsWith(item.path)
        return(
        <button
          key={item.label}
          onClick={() => navigateTo(item.path)}
          className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}
        >
          <Icon name={item.icon} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      )})}
    </nav>
  );
};

export default BottomNav;