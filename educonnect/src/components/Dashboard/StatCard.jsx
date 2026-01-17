// src/components/Dashboard/StatCard.jsx
import React from 'react';
// import Icon from '../common/Icon';
import Badge from '../UI/Badge';


const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'bg-blue-100 dark:bg-blue-500/20', 
  trend, 
  trendColor = 'green',
  className = '' 
}) => {

  const Icon = icon


  return (
    // <div className={`bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex xl:flex-row flex-col xl:items-center justify-between gap-4 ${className}`}>
    //   <div className="flex items-center gap-4">
    //     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColors[iconColor]}`}>
    //       <Icon name={icon} />
    //     </div>
    //     <div>
    //       <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
    //       <p className="text-2xl font-bold">{value}</p>
    //     </div>
    //   </div>
    //   {trend && (
    //     <Badge variant={trendColor.replace('text-', '')}>
    //       {trend}
    //     </Badge>
    //   )}
    // </div>
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-xl`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{trend}</p>
    </div>
  );
};

export default StatCard;