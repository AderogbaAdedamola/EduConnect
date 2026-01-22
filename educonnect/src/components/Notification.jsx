import Icon from "./common/Icon";
import { useEffect } from "react";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5200) // disappears after 5.3 seconds
    return () => clearTimeout(timer)
  }, [onClose])

  if (!message) return null

  const colors = {
    success: {bg:"bg-green-500", text:"text-green-500"},
    error: {bg: "bg-red-500", text: "text-red-500"},
    warning: {bg: "bg-yellow-400", text: "text-yellow-400"},
    info: {bg: "bg-blue-500", text: "text-blue-500"},
  }
  

  return (
    <div
      className={`animate-fade-in bg-linear-to-br z-50 from-slate-50/20 to-blue-50/20 dark:from-gray-900/20 dark:to-slate-900/20 text-slate-800 dark:text-white fixed top-5 left-1/2 -translate-x-1/2 rounded-lg w-[90%] backdrop-blur-xl border border-slate-50/20  dark:border-slate-900/20 overflow-hidden max-w-98 font-semibold mx-1 `}
    > 
      <div className="flex ">
        <div
        className={`flex-1 text-center font-bold text-lg ${colors[type]?.text} px-auto py-3`}>
          {message}
        </div>
        <div className="text-slate-700 dark:text-slate-50 hover:text-red-500 cursor-pointer p-2 truncate"
            onClick={() => onClose()}>
          <Icon name="x"/>
        </div>
      </div>
      <div
       className={`h-1 ${colors[type]?.bg} origin-right animate-progress`}>
      </div>
    </div>
  );
};

export default Notification;
