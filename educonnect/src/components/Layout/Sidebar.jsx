// src/components/Layout/Sidebar.jsx
import React from 'react';
import Icon from '../common/Icon';

const Sidebar = () => {
  const menuItems = [
    { icon: 'layout-dashboard', label: 'Dashboard', active: true },
    { icon: 'message-square-plus', label: 'Create Question' },
    { icon: 'sparkles', label: 'Response' },
    { icon: 'history', label: 'History' },
    { icon: 'notebook-pen', label: 'Answer Questions' },
  ];

  const bottomItems = [
    { icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="hidden max-h-screen fixed left-0 top-0 bottom-0 lg:flex w-64 border-r border-slate-200 dark:border-slate-800 flex-col bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Logo */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="graduation-cap" className="text-white size-7" />
          </div>
          <span className="text-xl font-bold tracking-tight">EduConnect</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
              item.active
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon name={item.icon} />
            {item.label}
          </a>
        ))}
      </nav>

      {/* User Profile & Settings */}
      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        {bottomItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Icon name={item.icon} />
            {item.label}
          </a>
        ))}

        {/* User Profile Card */}
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-3">
          <img
            alt="User profile"
            className="w-10 h-10 rounded-full border-2 border-primary"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGQvJ3K1SAKC8AXX0KwJffiJwYLz7NO4W2OS69E4gXzqJ4_7TAoklxjSZqInbMUa4IoHUhxsxPUBzN52tkcWec1Xd3VKYRe9fEQ23xSihCycn2hrynSH8_Xn6d_lV2afRlFrCL56XduSvSKiq5jJ0DuYz6Ay48i3NBC59LGyoDsjKV1Tejjs_LMClY8oQ6_XLJzDJdjktysks_B9dPZVTu2iwwnbyC4d5qxQj-dcZWLAIZ8auOin8BnYOotykFeM_mMUni7WgnmKGx"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Prof. Adedamola</p>
            <p className="text-xs text-slate-500 truncate">Computer Scientist</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;