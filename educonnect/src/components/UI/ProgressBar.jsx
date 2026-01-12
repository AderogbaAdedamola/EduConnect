// src/components/UI/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ progress, color = 'primary', className = '' }) => {
  const colors = {
    primary: 'bg-primary',
    green: 'bg-accent-green',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 ${className}`}>
      <div
        className={`h-2 rounded-full ${colors[color]}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;