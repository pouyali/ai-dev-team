'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-200">
            Welcome to Next.js
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-200">
            A Next.js project with Tailwind CSS and dark mode support
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fast Refresh
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Instant feedback on edits made to your React components
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Dark Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Toggle between light and dark themes with ease
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}