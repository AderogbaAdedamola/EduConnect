// src/components/Dashboard/PerformanceChart.jsx
// import React from 'react';

// const ResponseTrends = () => {
//   const days = [
//     { label: 'M', value: 40, highlight: false },
//     { label: 'T', value: 65, highlight: false },
//     { label: 'W', value: 90, highlight: true },
//     { label: 'T', value: 50, highlight: false },
//     { label: 'F', value: 30, highlight: false },
//   ];
//   const dayIndex = new Date().getDay() - 1

//   return (
//     <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-xl font-bold">Response Trends</h2>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-bold">
//             Week
//           </button>
//           <button className="px-3 py-1 rounded-lg text-slate-400 text-xs font-bold">
//             Month
//           </button>
//         </div>
//       </div>

//       <div className="flex items-end justify-between h-48 gap-4 sm:gap-8 mt-4">
//         {days.map((day, index) => (
//           <div key={index} className="flex flex-col items-center gap-4 flex-1">
//             <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-full relative overflow-hidden">
//               <div
//                 className={`absolute bottom-0 w-full rounded-full ${
//                   index === dayIndex
//                     ? 'bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]'
//                     : 'bg-primary/40'
//                 }`}
//                 style={{ height: `${day.value}%` }}
//               ></div>
//             </div>
//             <span
//               className={`text-xs font-bold ${
//                 index === dayIndex ? 'text-primary' : 'text-slate-400'
//               }`}
//             >
//               {day.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResponseTrends;




import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer 
} from 'recharts';

const ResponseTrends = () => {
  const data = [
    { day: 'M', questions: 2, answers: 5, accuracy: 85 },
    { day: 'T', questions: 3, answers: 7, accuracy: 88 },
    { day: 'W', questions: 1, answers: 4, accuracy: 90 },
    { day: 'Th', questions: 4, answers: 6, accuracy: 87 },
    { day: 'F', questions: 2, answers: 8, accuracy: 92 },
    { day: 'Sat', questions: 1, answers: 3, accuracy: 89 },
    { day: 'Sun', questions: 0, answers: 2, accuracy: 91 },
  ];
  

  return (
    <div className="space-y-6">
      {/* Activity Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
        <h3 className="font-bold mb-4">Activity Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="questions" fill="#3b82f6" name="Questions" />
            <Bar dataKey="answers" fill="#10b981" name="Answers" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accuracy Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
        <h3 className="font-bold mb-4">Accuracy Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Accuracy %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTrends;