import { useEffect } from "react";
import { ShieldCheck, AlertTriangle, Info, XCircle, X } from "lucide-react";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const themes = {
    success: {
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-500/30",
      icon: <ShieldCheck size={20} className="text-sky-500" />,
    },
    error: {
      text: "text-red-600 dark:text-red-400",
      border: "border-red-500/30",
      icon: <XCircle size={20} className="text-red-500" />,
    },
    warning: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/30",
      icon: <AlertTriangle size={20} className="text-amber-500" />,
    },
    info: {
      text: "text-zinc-600 dark:text-zinc-400",
      border: "border-zinc-500/30",
      icon: <Info size={20} className="text-zinc-500" />,
    },
  };

  const theme = themes[type] || themes.success;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-sm px-4">
      <div className={`animate-fade-in flex items-center justify-between p-4 rounded-2xl border backdrop-blur-xl shadow-2xl
        bg-white/70 dark:bg-zinc-900/70 ${theme.border}`}>
        
        <div className="flex-shrink-0">
          {theme.icon}
        </div>

        <div className="flex-1 text-center">
          <p className={`text-sm font-bold ${theme.text}`}>
            {message}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="flex-shrink-0 ml-2 p-1 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-400"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;