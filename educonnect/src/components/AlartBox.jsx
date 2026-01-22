import { useEffect, useRef, useState } from "react";
import Icon from "./common/Icon";

export default function AlertBox({ message, okWord = "OK", okFunction, glowType = "danger", onClose}) {
    const targetBox = useRef(null)
    const [animateBox, setAnimateBox] = useState(false)

  if (!message) return null;

  const animateGlowType = {
    danger: "focus-glow-danger",
    normal: "focus-glow"
  }

  const focusTarget = () =>{
    setAnimateBox(true)
setTimeout(()=> setAnimateBox(false), 2100)
    targetBox.current.focus()
  }

  return (
    <div className="fixed inset-0 z-49 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={() => focusTarget()}>
      <div
        className={`relative ${animateBox && animateGlowType[glowType]} w-[90%] max-w-sm rounded-xl border border-white/20 
                   bg-gradient-to-br from-slate-50/40 to-blue-50/40 
                   dark:from-gray-900/40 dark:to-slate-900/40
                   backdrop-blur-2xl text-slate-800 dark:text-white 
                   shadow-2xl overflow-hidden font-semibold`}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-slate-700 dark:text-slate-100 hover:text-red-500"
          onClick={onClose}
        >
          <Icon name="x" />
        </button>

        {/* Message */}
        <div className="px-4 py-8 text-center font-semibold">{message}</div>

        {/* Bottom buttons */}
        <div className="flex border-t border-white/10">
          <button
            className="flex-1 font-semibold m-2 py-2 rounded-lg text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            onClick={() => okFunction()}
          >
            {okWord}
          </button>
          <button
            className="flex-1 m-2 font-semibold py-2 rounded-lg text-white bg-red-700 hover:bg-red-600 transition"
            onClick={onClose}
            ref={targetBox}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
