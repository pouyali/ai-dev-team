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
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <main className="min-h-screen bg-background dark:bg-green-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-lg bg-green-600 dark:bg-green-900 hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Welcome to Next.js
          </h1>
          <p className="text-xl mb-8 text-green-100 dark:text-green-200">
            A modern Next.js application with Tailwind CSS and dark mode support
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-green-600 dark:bg-green-900 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white dark:text-white">
                Fast Refresh
              </h2>
              <p className="text-green-100 dark:text-green-200">
                Enjoy instant feedback on edits with Fast Refresh
              </p>
            </div>

            <div className="p-6 bg-green-600 dark:bg-green-900 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white dark:text-white">
                Tailwind CSS
              </h2>
              <p className="text-green-100 dark:text-green-200">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>

            <div className="p-6 bg-green-600 dark:bg-green-900 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white dark:text-white">
                Dark Mode
              </h2>
              <p className="text-green-100 dark:text-green-200">
                Toggle between light and dark themes seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}