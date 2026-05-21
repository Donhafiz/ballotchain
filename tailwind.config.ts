import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        fadeSlideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
      },
      animation: {
        fadeSlideDown: "fadeSlideDown 0.6s ease both",
        fadeSlideUp: "fadeSlideUp 0.7s ease both",
        marquee: "marquee 28s linear infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
