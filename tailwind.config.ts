import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Snow white system
        snow: {
          0: "#FFFFFF",
          50: "#FCFCFA",
          100: "#F8F7F3",
          200: "#F1EFE9",
          300: "#E8E5DC",
        },
        // Tiffany-derived signature
        tiff: {
          DEFAULT: "#7FD4CC",
          50: "#EFFBF9",
          100: "#D8F5F0",
          200: "#A8E8DF",
          300: "#7FD4CC",
          400: "#56BAB1",
          500: "#3B9E94",
          600: "#287C73",
          700: "#1F5F58",
        },
        // Editorial ink
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#F5F5F4",
          100: "#E7E5E2",
          200: "#C4C2BD",
          300: "#9B9893",
          400: "#6B6864",
          500: "#3D3A37",
          900: "#0A0A0A",
        },
        // Atelier gold accent
        gold: {
          DEFAULT: "#B89968",
          light: "#D4B98C",
          dark: "#8C7048",
        },
        ws: {
          bg: "#0A0A0A",
          surface: "#141414",
          elevated: "#1E1E1E",
          border: "#2A2A2A",
          "text-muted": "#6B6B6B",
          "text-secondary": "#A0A0A0",
          "text-primary": "#F0F0F0",
          accent: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tightest-2": "-0.04em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ticker: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        ticker: "ticker 18s linear infinite",
        breathe: "breathe 4s ease-in-out infinite",
        wave: "wave 1.2s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
