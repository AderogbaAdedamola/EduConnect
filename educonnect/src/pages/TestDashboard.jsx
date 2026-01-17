import React, { useState } from 'react';
import { Share2, MessageSquare, Sparkles, TrendingUp, Copy, ExternalLink, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const EduConnectDashboard = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const stats = [
    { 
      title: "Questions Created", 
      value: "12", 
      icon: MessageSquare,
      trend: "+3 this week",
      color: "bg-blue-500"
    },
    { 
      title: "Answers Given", 
      value: "47", 
      icon: CheckCircle2,
      trend: "8 pending review",
      color: "bg-green-500"
    },
    { 
      title: "AI Responses", 
      value: "89", 
      icon: Sparkles,
      trend: "AI helping you",
      color: "bg-purple-500"
    },
    { 
      title: "Engagement", 
      value: "94%", 
      icon: TrendingUp,
      trend: "Great activity!",
      color: "bg-orange-500"
    },
  ];

  const needsAttention = [
    {
      title: "How to solve quadratic equations?",
      code: "QE2847",
      responses: 23,
      newResponses: 8,
      aiEnabled: true,
      category: "Mathematics",
      timeAgo: "2h ago",
      status: "active"
    },
    {
      title: "Explain photosynthesis process",
      code: "BIO901",
      responses: 15,
      newResponses: 5,
      aiEnabled: true,
      category: "Biology",
      timeAgo: "5h ago",
      status: "active"
    },
    {
      title: "JavaScript async/await quiz",
      code: "JS4532",
      responses: 31,
      newResponses: 12,
      aiEnabled: false,
      category: "Programming",
      timeAgo: "1d ago",
      status: "pending"
    },
  ];

  const recentActivity = [
    {
      type: "response",
      user: "Sarah M.",
      action: "answered your question",
      question: "What is Newton's Third Law?",
      timeAgo: "10m ago",
      avatar: "S"
    },
    {
      type: "created",
      user: "You",
      action: "created a question",
      question: "Explain DNA replication",
      timeAgo: "2h ago",
      avatar: "Y"
    },
    {
      type: "ai_feedback",
      user: "AI Assistant",
      action: "provided feedback on",
      question: "How does gravity work?",
      timeAgo: "3h ago",
      avatar: "🤖"
    },
    {
      type: "response",
      user: "John D.",
      action: "answered your question",
      question: "What is photosynthesis?",
      timeAgo: "5h ago",
      avatar: "J"
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your questions</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
            <MessageSquare size={20} />
            Create Question
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.trend}</p>
              </div>
            );
          })}
        </div>

        {/* Needs Attention Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="text-orange-500" />
              Questions Needing Your Attention
            </h2>
            <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {needsAttention.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.aiEnabled && (
                    <Sparkles className="text-purple-500" size={18} />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => copyCode(item.code)}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {item.code}
                    {copiedCode === item.code ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.timeAgo}</span>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Users size={16} />
                    {item.responses} responses
                  </span>
                  {item.newResponses > 0 && (
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-bold">
                      +{item.newResponses} new
                    </span>
                  )}
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                  View Responses
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" />
            Recent Activity
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white font-medium">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm truncate">"{activity.question}"</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {activity.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
            <Share2 size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Share a Question</h3>
            <p className="text-blue-100 mb-4">Create and share questions with your study group or audience</p>
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
          </div>

          <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
            <MessageSquare size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Answer Questions</h3>
            <p className="text-purple-100 mb-4">Help others by answering questions in your expertise area</p>
            <button className="bg-white text-purple-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Browse Questions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EduConnectDashboard;