import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockQuestionSet } from '../components/AnswerQuestion/mockQuestionSet';
import AnswerFlow from '../components/AnswerQuestion/AnswerFlow';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/common/Icon';

export default function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, theme } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [questionSet, setQuestionSet] = useState(null);
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking', 'unauthorized', 'authorized'

  useEffect(() => {
    // Simulate fetching the question set
    setTimeout(() => {
      // In real life, fetch by ID
      setQuestionSet(mockQuestionSet);
      setLoading(false);
    }, 800);
  }, [id]);

  useEffect(() => {
    if (!questionSet) return;

    if (questionSet.settings.requireLogin && !user) {
      setAuthStatus('unauthorized');
    } else {
      setAuthStatus('authorized');
    }
  }, [questionSet, user]);

  const handleComplete = (answers) => {
    console.log("Submitting answers:", answers);
    // TODO: Send to API
    alert("Answers submitted successfully! (Check console for payload)");
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Icon name="loader-2" className="text-4xl animate-spin text-blue-500" />
          <p className="font-medium animate-pulse">Loading question set...</p>
        </div>
      </div>
    );
  }

  if (authStatus === 'unauthorized') {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="lock" className="text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Login Required</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The creator requires respondents to sign in before answering this question set.
          </p>
          <button
            onClick={() => navigate(`/login?redirect=/answer/${id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mb-3"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold py-3 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Pre-flow prompt if anonymous is allowed but they are not logged in
  if (authStatus === 'authorized' && !user && questionSet.settings.allowAnonymous) {
    // We can just proceed, but we could also show a prompt screen here.
    // For this MVP, we will render a welcome screen to confirm intent.
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-200 dark:border-slate-700 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{questionSet.title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{questionSet.questions.length} questions</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                // Simulate 'proceeding' anonymously by faking a user state or just letting it render AnswerFlow
                // For now, we will add a flag to skip this screen.
                setAuthStatus('answering');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>Answer Anonymously</span>
              <Icon name="arrow-right" />
            </button>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <button
              onClick={() => navigate(`/login?redirect=/answer/${id}`)}
              className="w-full border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              Sign In to save progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Actual Answer Flow
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AnswerFlow questionSet={questionSet} onComplete={handleComplete} />
    </div>
  );
}
