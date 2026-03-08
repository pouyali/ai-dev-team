'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle component that provides a button to switch between light and dark themes
 * Uses next-themes for proper SSR handling and theme persistence
 * @returns JSX element containing the theme toggle button
 */
export default function ThemeToggle(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-3 rounded-lg bg-green-600 dark:bg-green-800">
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
      className="p-3 rounded-lg bg-green-600 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-300" />
      ) : (
        <Moon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}