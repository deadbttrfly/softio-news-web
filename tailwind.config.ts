import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#ffffff",
        merah: {
          DEFAULT: "#B5222A",
          dark: "#8C1A20",
          light: "#D94A45",
        },
        gold: "#B8923F",
        slate: {
          soft: "#6B6F7B",
        },
        line: "#DFDACB",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        paper: "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(60,80,200,0.55) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 90% 5%, rgba(140,60,220,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 40%, rgba(30,60,160,0.35) 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 0% 80%, rgba(20,100,200,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 100% 90%, rgba(100,40,180,0.40) 0%, transparent 60%), linear-gradient(165deg, #060a24 0%, #0d1140 40%, #0a0b2e 70%, #050818 100%)",
        grain: "radial-gradient(circle, rgba(24,26,36,0.04) 1px, transparent 1px)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;