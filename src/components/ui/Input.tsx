"use client";

import { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = "", ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">{label}</label>}
        <div className={"relative transition-all duration-300 " + (focused ? "scale-[1.01]" : "")}>
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
          <input ref={ref} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={"w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 border-2 rounded-2xl outline-none transition-all duration-300 text-[14px] font-medium text-gray-900 dark:text-white placeholder-gray-400 " + 
              (error ? "border-red-300 dark:border-red-700 focus:border-red-500" : "border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800") + " " +
              (icon ? "pl-12" : "") + " " + className}
            {...props} />
        </div>
        {error && <p className="text-[12px] text-red-600 dark:text-red-400 font-medium ml-1">{error}</p>}
        {hint && !error && <p className="text-[12px] text-gray-400 font-medium ml-1">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;