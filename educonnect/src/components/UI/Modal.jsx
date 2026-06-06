import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../common/Icon';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  icon = "alert-triangle",
  iconColor = "text-yellow-500",
  iconBg = "bg-yellow-100 dark:bg-yellow-900/30",
  primaryBtnText = "Confirm",
  primaryBtnAction,
  primaryBtnStyle = "bg-blue-600 hover:bg-blue-700 text-white",
  secondaryBtnText = "Cancel",
  secondaryBtnAction,
  secondaryBtnStyle = "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
}) {

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm p-5 overflow-hidden transform transition-all animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${iconBg} mb-4 mt-2`}>
            <Icon name={icon} className={`w-6 h-6 ${iconColor}`} />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-2">
            {message}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {primaryBtnText && (
            <button
              onClick={() => {
                if (primaryBtnAction) primaryBtnAction();
                onClose();
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-bold transition-all text-sm ${primaryBtnStyle}`}
            >
              {primaryBtnText}
            </button>
          )}
          
          {secondaryBtnText && (
            <button
              onClick={() => {
                if (secondaryBtnAction) secondaryBtnAction();
                else onClose();
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-bold transition-all text-sm ${secondaryBtnStyle}`}
            >
              {secondaryBtnText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
