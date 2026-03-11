import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'gradient-pulse': 'gradientPulse 3s ease-in-out infinite',
        'gradient-slow': 'gradientShift 25s ease infinite',
        'gradient-fast': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        gradientPulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'animated-gradient': 'linear-gradient(-45deg, var(--gradient-1), var(--gradient-2), var(--gradient-3), var(--gradient-4))',
      },
    },
  },
  plugins: [],
};
export default config;