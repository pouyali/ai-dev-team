'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle component that provides a button to switch between light and dark themes
 * Uses next-themes for proper SSR handling and theme persistence
 * Features enhanced styling with gradient backgrounds and smooth animations
 * @returns JSX element containing the theme toggle button
 */
export default function ThemeToggle(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-3 rounded-lg bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20">
        <div className="w-6 h-6" />
      </div>
    );
  }

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="group p-3 rounded-lg bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 hover:from-white/30 hover:to-white/20 hover:border-white/30 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-white/10"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === 'dark' ? (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300 group-hover:rotate-180 transform transition-transform" />
        ) : (
          <Moon className="w-6 h-6 text-white group-hover:text-gray-100 transition-colors duration-300 group-hover:-rotate-12 transform transition-transform" />
        )}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      </div>
    </button>
  );
}