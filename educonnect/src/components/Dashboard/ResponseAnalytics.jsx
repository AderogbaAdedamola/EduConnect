// src/components/Dashboard/PerformanceChart.jsx
import React from 'react';

const ResponseAnalytics = () => {
  const days = [
    { label: 'M', value: 40, highlight: false },
    { label: 'T', value: 65, highlight: false },
    { label: 'W', value: 90, highlight: true },
    { label: 'T', value: 50, highlight: false },
    { label: 'F', value: 30, highlight: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Response Analytics</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-bold">
            Week
          </button>
          <button className="px-3 py-1 rounded-lg text-slate-400 text-xs font-bold">
            Month
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-4 sm:gap-8 mt-4">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-4 flex-1">
            <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-full relative overflow-hidden">
              <div
                className={`absolute bottom-0 w-full rounded-full ${
                  day.highlight
                    ? 'bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-primary/40'
                }`}
                style={{ height: `${day.value}%` }}
              ></div>
            </div>
            <span
              className={`text-xs font-bold ${
                day.highlight ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseAnalytics;