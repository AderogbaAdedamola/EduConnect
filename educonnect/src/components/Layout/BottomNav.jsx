// src/components/Layout/BottomNav.jsx
import React from 'react';
import Icon from '../common/Icon';

const BottomNav = () => {
  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'add', label: 'Create' },
    { icon: 'auto_awesome', label: 'Response' },
    { icon: 'history', label: 'History' },
    { icon: 'class', label: 'Answer' },
    // { icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <a
          key={item.label}
          href="#"
          className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-slate-400'}`}
        >
          <Icon name={item.icon} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;