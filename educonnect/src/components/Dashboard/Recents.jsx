// src/components/Dashboard/RecentAssignments.jsx
import React from 'react';
import Icon from '../common/Icon';
import Badge from '../UI/Badge';

const Recents = () => {
  const assignments = [
    {
      id: 1,
      title: 'Literature Analysis',
      subtitle: 'English 102',
      icon: 'menu_book',
      iconColor: 'purple',
      response: '102',
      status: { text: '8 Pending', color: 'orange' },
      submitted: '2h ago',
    },
    {
      id: 2,
      title: 'Lab Report: Motion',
      response: '201',
      icon: 'science',
      iconColor: 'blue',
      response: '201',
      status: { text: 'Completed', color: 'green' },
      submitted: 'Yesterday',
    },
    {
      id: 3,
      title: 'Perspective Drawing',
      subtitle: 'Art History',
      icon: 'palette',
      iconColor: 'pink',
      response: '62',
      status: { text: 'Draft', color: 'gray' },
      submitted: 'Oct 22',
    },
  ];

  const iconColors = {
    purple: 'bg-accent-purple',
    blue: 'bg-accent-blue',
    pink: 'bg-accent-pink',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question Title
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Responses
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${iconColors[assignment.iconColor]} rounded-xl flex items-center justify-center text-white`}
                    >
                      <Icon name={assignment.icon} />
                    </div>
                    <div>
                      <p className="font-bold">{assignment.title}</p>
                      <p className="text-xs text-slate-500">{assignment.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm">{assignment.response}</span>
                </td>
                <td className="px-6 py-5">
                  <Badge variant={assignment.status.color}>
                    {assignment.status.text}
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-500">{assignment.submitted}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <Icon name="chevron_right" className="text-slate-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recents;