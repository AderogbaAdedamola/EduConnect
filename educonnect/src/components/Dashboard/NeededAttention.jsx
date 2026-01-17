// src/components/Dashboard/AssignmentCard.jsx
import { useState } from 'react';
import { 
  Share2, 
  MessageSquare, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  ExternalLink, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle } from 'lucide-react';



const NeededAttention = ({ 
  category, 
  aiEnabled,
  title, 
  timeAgo,
  responses, 
  newResponses,
  code,
  status
}) => {
  
  const [copiedCode, setCopiedCode] = useState(null)

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
          {category}
        </span>
        {aiEnabled && (
          <Sparkles className="text-purple-500" size={18} />
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
        {title}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => copyCode(code)}
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {code}
          {copiedCode === code ? (
            <CheckCircle2 size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</span>
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
          <Users size={16} />
          {responses} responses
        </span>
        {newResponses > 0 && (
          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-bold">
            +{newResponses} new
          </span>
        )}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
        View Responses
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

export default NeededAttention;
