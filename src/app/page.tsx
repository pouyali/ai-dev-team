'use client';

import ThemeToggle from '../components/theme-toggle';
import { useEffect, useState } from 'react';

/**
 * Home page component with animated gradient background
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
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>
        
        {/* Main content area */}
        <div className={`text-center space-y-8 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Experience the beauty of animated gradients
          </p>
          
          {/* Floating elements for added visual interest */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional gradient layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none animate-gradient-slow" />
    </main>
  );
}