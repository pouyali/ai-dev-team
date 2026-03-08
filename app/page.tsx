'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to Next.js
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            A modern Next.js application with Tailwind CSS and dark mode support
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Fast Refresh
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Instant feedback on edits to your React components
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Rapidly build modern websites with utility-first CSS
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Dark Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Toggle between light and dark themes with ease
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}