// src/components/Layout/Sidebar.jsx
import React from 'react';
import Icon from '../common/Icon';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const menuItems = [
    { icon: 'layout-dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'message-square-plus', label: 'Create Question', path: '/create-question' },
    { icon: 'sparkles', label: 'Response', path: '/response' },
    { icon: 'history', label: 'History', path: '/history' },
    { icon: 'notebook-pen', label: 'Answer Questions', path: '/answer-questions' },
  ]

  const bottomItems = [
    { icon: 'settings', label: 'Settings' },
  ]
  const navigateTo = (path) =>{
    navigate(path)
  }

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
        {menuItems.map((item) => {
          const isActive = location.pathname.toLowerCase().startsWith(item.path)
          return(
            <button
              key={item.label}
              onClick={() => navigateTo(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
        )}
        )}
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
          <div className="flex">
            <button className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold  border dark:border-slate-200 border-slate-700  shadow-sm hover:shadow-md transition-shadow">
              {"A"}
            </button>
          </div>
          {/* <img
            alt="User profile"
            className="w-10 h-10 rounded-full border-2 border-primary"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGQvJ3K1SAKC8AXX0KwJffiJwYLz7NO4W2OS69E4gXzqJ4_7TAoklxjSZqInbMUa4IoHUhxsxPUBzN52tkcWec1Xd3VKYRe9fEQ23xSihCycn2hrynSH8_Xn6d_lV2afRlFrCL56XduSvSKiq5jJ0DuYz6Ay48i3NBC59LGyoDsjKV1Tejjs_LMClY8oQ6_XLJzDJdjktysks_B9dPZVTu2iwwnbyC4d5qxQj-dcZWLAIZ8auOin8BnYOotykFeM_mMUni7WgnmKGx"
          /> */}
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Adedamola</p>
            <p className="text-xs text-slate-500 truncate">...</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;