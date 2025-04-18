import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "390px",
        sm: "435px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        reveal: {
          "0%": {
            opacity: "0",
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: "1", filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: "1", filter: "brightness(1) blur(0)", scale: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        reveal: "reveal 0.7s ease-in-out",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        slacker: "1.75",
      },
      transitionTimingFunction: {
        "in-quad": "var(--ease-in-quad)",
        "in-cubic": "var(--ease-in-cubic)",
        "in-quart": "var(--ease-in-quart)",
        "in-quint": "var(--ease-in-quint)",
        "in-expo": "var(--ease-in-expo)",
        "in-circ": "var(--ease-in-circ)",
        "in-back": "var(--ease-in-back)",
        "in-sine": "var(--ease-in-sine)",
        "out-quad": "var(--ease-out-quad)",
        "out-cubic": "var(--ease-out-cubic)",
        "out-quart": "var(--ease-out-quart)",
        "out-quint": "var(--ease-out-quint)",
        "out-expo": "var(--ease-out-expo)",
        "out-circ": "var(--ease-out-circ)",
        "out-back": "var(--ease-out-back)",
        "out-sine": "var(--ease-out-sine)",
        "in-out-quad": "var(--ease-in-out-quad)",
        "in-out-cubic": "var(--ease-in-out-cubic)",
        "in-out-quart": "var(--ease-in-out-quart)",
        "in-out-quint": "var(--ease-in-out-quint)",
        "in-out-expo": "var(--ease-in-out-expo)",
        "in-out-circ": "var(--ease-in-out-circ)",
        "in-out-back": "var(--ease-in-out-back)",
        "in-out-sine": "var(--ease-in-out-sine)",
      },
      gridTemplateRows: {
        "max-1": "repeat(1, minmax(0, max-content))",
      },
      height: {
        "dynamic-screen": "100dvh",
      },
      minHeight: {
        "dynamic-screen": "100dvh",
      },
      maxHeight: {
        "dynamic-screen": "100dvh",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config

export default config
