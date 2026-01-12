// src/components/Dashboard/StatCard.jsx
import React from 'react';
import Icon from '../common/Icon';
import Badge from '../UI/Badge';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconColor = 'blue', 
  trend, 
  trendColor = 'green',
  className = '' 
}) => {
  const iconColors = {
    blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    pink: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
  };

  const trendColors = {
    green: 'text-accent-green bg-accent-green/10',
    orange: 'text-accent-orange bg-accent-orange/10',
    blue: 'text-accent-blue bg-accent-blue/10',
    red: 'text-red-600 bg-red-500/10',
  };

  return (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex xl:flex-row flex-col xl:items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColors[iconColor]}`}>
          <Icon name={icon} />
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {trend && (
        <Badge variant={trendColor.replace('text-', '')}>
          {trend}
        </Badge>
      )}
    </div>
  );
};

export default StatCard;