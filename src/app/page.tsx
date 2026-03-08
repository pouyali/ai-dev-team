'use client';

import ThemeToggle from '../components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-red-500 dark:bg-red-700 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Welcome to Next.js
          </h1>
          <p className="text-xl mb-8 text-red-100">
            A modern Next.js application with Tailwind CSS and dark mode support
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-red-600 dark:bg-red-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white">
                Fast Refresh
              </h2>
              <p className="text-red-100">
                Enjoy instant feedback on edits with Fast Refresh
              </p>
            </div>

            <div className="p-6 bg-red-600 dark:bg-red-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white">
                Tailwind CSS
              </h2>
              <p className="text-red-100">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>

            <div className="p-6 bg-red-600 dark:bg-red-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-3 text-white">
                Dark Mode
              </h2>
              <p className="text-red-100">
                Toggle between light and dark themes seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}