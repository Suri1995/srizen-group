import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./data/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        // Brand tokens (SriZen)
        navy: {
          DEFAULT: "#000F66",
          deep: "#00072E",
        },
        cyan: "#00FFFF",
        green: "#78FF45",
        bg: {
          light: "#F7F9FC",
        },
        ink: {
          DEFAULT: "#1B1B1B",
          muted: "#6F7682",
        },
        // shadcn/ui CSS-variable driven tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        container: "1320px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.16,.84,.24,1)",
      },
      keyframes: {
        heroZoom: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.12)" },
        },
        scrollX: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        scrollDrip: {
          "0%": { top: "-40%" },
          "60%": { top: "100%" },
          "100%": { top: "100%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        heroZoom: "heroZoom 24s ease-out forwards",
        scrollX: "scrollX 30s linear infinite",
        scrollDrip: "scrollDrip 2.2s ease-in-out infinite",
        fadeUp: "fadeUp .7s cubic-bezier(.16,.84,.24,1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
