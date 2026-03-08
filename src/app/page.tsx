'use client';

import ThemeToggle from '../components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-green-500 dark:bg-green-700 transition-colors duration-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}