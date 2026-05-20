"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, icon, children, className = "", ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    const variants = {
      primary: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl shadow-gray-900/10 dark:shadow-white/5 hover:shadow-2xl hover:scale-[1.02]",
      secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
      ghost: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
      danger: "bg-red-600 text-white shadow-xl shadow-red-500/20 hover:bg-red-700",
      success: "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-700",
    };
    const sizes = { sm: "px-4 py-2 text-[13px] rounded-xl", md: "px-5 py-2.5 text-sm rounded-2xl", lg: "px-6 py-3.5 text-[15px] rounded-2xl" };

    return (
      <motion.button ref={ref as any} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
        className={base + " " + variants[variant] + " " + sizes[size] + " " + className}
        disabled={loading || props.disabled} {...props}>
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        ) : icon}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
export default Button;