'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to Next.js with Dark Mode
          </h1>
          
          <p className="text-xl mb-12 text-gray-600 dark:text-gray-300">
            Toggle between light and dark themes using the button below
          </p>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark Mode
              </>
            )}
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Fast Refresh
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Experience instant feedback on edits made to your React components
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Rapidly build modern websites with utility-first CSS framework
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Dark Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Seamless theme switching with localStorage persistence
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}