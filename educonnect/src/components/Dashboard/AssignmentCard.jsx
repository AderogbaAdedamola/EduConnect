// src/components/Dashboard/AssignmentCard.jsx
import React from 'react';
import Icon from '../common/Icon';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';

const AssignmentCard = ({ 
  title, 
  subtitle, 
  icon, 
  iconColor = 'indigo', 
  status, 
  progress, 
  progressLabel,
  buttonText = 'Grade Now',
  buttonVariant = 'primary'
}) => {
  const iconColors = {
    indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    pink: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative group overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconColors[iconColor]}`}>
          <Icon name={icon} className="text-3xl" />
        </div>
        {status && <Badge variant={status.color || 'orange'}>{status.text}</Badge>}
      </div>

      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{subtitle}</p>

      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-500">{progressLabel}</span>
          <span className={`${progress >= 80 ? 'text-accent-green' : 'text-primary'}`}>
            {progress}%
          </span>
        </div>
        <ProgressBar progress={progress} color={progress >= 80 ? 'green' : 'primary'} />
      </div>

      <Button variant={buttonVariant} size="xl" icon="arrow_forward" fullWidth>
        {buttonText}
      </Button>
    </div>
  );
};

export default AssignmentCard;