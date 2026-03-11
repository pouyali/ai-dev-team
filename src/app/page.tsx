'use client';

import ThemeToggle from '../components/theme-toggle';
import Counter from '../components/counter';
import { useEffect, useState } from 'react';

/**
 * Home page component with animated gradient background and counter
 * Features a smooth gradient animation that changes colors over time
 * @returns JSX element containing the main page content
 */
export default function Home(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen animated-gradient gradient-overlay transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen">
        {/* Theme toggle in top right */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>
        
        {/* Counter centered in the screen */}
        <div className={`flex items-center justify-center min-h-[calc(100vh-12rem)] transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Counter />
        </div>
      </div>
      
      {/* Additional gradient layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none animate-gradient-slow" />
    </main>
  );
}