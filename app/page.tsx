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
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    if (newMode) {
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
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
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
            A modern web application with dark mode support
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Fast Refresh
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Experience instant feedback with Next.js Fast Refresh
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Rapidly build modern websites with utility-first CSS
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                Dark Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Toggle between light and dark themes seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}