import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === THEME_DARK;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_KEY) {
        const newTheme = e.newValue === THEME_DARK;
        setIsDark(newTheme);
        document.documentElement.classList.toggle(THEME_DARK, newTheme);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      document.documentElement.classList.toggle(THEME_DARK, isDark);
      localStorage.setItem(THEME_KEY, isDark ? THEME_DARK : THEME_LIGHT);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg transition-colors duration-200"
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      role="switch"
    >
      {isDark ? (
        <svg
          className="w-5 h-5 text-yellow-400 transition-transform duration-200 hover:rotate-12"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-700 transition-transform duration-200 hover:rotate-12"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
