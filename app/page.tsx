'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

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
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to Next.js
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            A modern Next.js project with Tailwind CSS and dark mode support
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Next.js 15
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Built with the latest Next.js framework for optimal performance
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Dark Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Toggle between light and dark themes with persistent storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}