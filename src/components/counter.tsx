'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Play, Pause, RotateCcw } from 'lucide-react';

/**
 * Counter component with timer functionality
 * Features increment/decrement buttons, timer controls, and reset functionality
 * @returns JSX element containing the counter interface
 */
export default function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  /**
   * Increment the counter by 1
   */
  const increment = useCallback((): void => {
    setCount(prev => prev + 1);
  }, []);

  /**
   * Decrement the counter by 1
   */
  const decrement = useCallback((): void => {
    setCount(prev => prev - 1);
  }, []);

  /**
   * Toggle timer on/off
   */
  const toggleTimer = useCallback((): void => {
    setIsTimerRunning(prev => !prev);
  }, []);

  /**
   * Reset counter and timer
   */
  const reset = useCallback((): void => {
    setCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  }, []);

  /**
   * Format timer seconds into MM:SS format
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Timer Display */}
      <div className="text-center space-y-2">
        <div className="text-lg font-medium text-white/80">
          Timer
        </div>
        <div className="text-3xl font-mono font-bold text-white bg-black/20 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
          {formatTime(timerSeconds)}
        </div>
      </div>

      {/* Main Counter Display */}
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl blur-xl scale-110 animate-pulse" />
        
        {/* Counter container */}
        <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-12">
          <div className="text-center space-y-6">
            <div className="text-2xl font-medium text-white/90 tracking-wider">
              COUNTER
            </div>
            
            {/* Counter value */}
            <div className="text-8xl font-bold text-white drop-shadow-2xl font-mono tracking-wider">
              {count}
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center justify-center space-x-6">
              {/* Decrement button */}
              <button
                onClick={decrement}
                className="group p-4 rounded-full bg-gradient-to-br from-red-400/30 to-red-600/20 backdrop-blur-sm border border-red-300/30 hover:from-red-400/40 hover:to-red-600/30 hover:border-red-300/50 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
                aria-label="Decrease counter"
              >
                <Minus className="w-8 h-8 text-white group-hover:text-red-100 transition-colors duration-300" />
              </button>
              
              {/* Plus button */}
              <button
                onClick={increment}
                className="group p-4 rounded-full bg-gradient-to-br from-green-400/30 to-green-600/20 backdrop-blur-sm border border-green-300/30 hover:from-green-400/40 hover:to-green-600/30 hover:border-green-300/50 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
                aria-label="Increase counter"
              >
                <Plus className="w-8 h-8 text-white group-hover:text-green-100 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timer and Reset Controls */}
      <div className="flex items-center space-x-4">
        {/* Timer toggle button */}
        <button
          onClick={toggleTimer}
          className={`group p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
            isTimerRunning
              ? 'bg-gradient-to-br from-orange-400/30 to-orange-600/20 border-orange-300/30 hover:from-orange-400/40 hover:to-orange-600/30 hover:border-orange-300/50 hover:shadow-lg hover:shadow-orange-500/20'
              : 'bg-gradient-to-br from-blue-400/30 to-blue-600/20 border-blue-300/30 hover:from-blue-400/40 hover:to-blue-600/30 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/20'
          }`}
          aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
        >
          {isTimerRunning ? (
            <Pause className="w-6 h-6 text-white group-hover:text-orange-100 transition-colors duration-300" />
          ) : (
            <Play className="w-6 h-6 text-white group-hover:text-blue-100 transition-colors duration-300" />
          )}
        </button>

        {/* Reset button */}
        <button
          onClick={reset}
          className="group p-3 rounded-lg bg-gradient-to-br from-purple-400/30 to-purple-600/20 backdrop-blur-sm border border-purple-300/30 hover:from-purple-400/40 hover:to-purple-600/30 hover:border-purple-300/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
          aria-label="Reset counter and timer"
        >
          <RotateCcw className="w-6 h-6 text-white group-hover:text-purple-100 transition-colors duration-300 group-hover:rotate-180 transform transition-transform" />
        </button>
      </div>

      {/* Status indicator */}
      <div className="flex items-center space-x-2 text-white/70 text-sm">
        <div className={`w-2 h-2 rounded-full ${
          isTimerRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
        } transition-colors duration-300`} />
        <span>
          Timer {isTimerRunning ? 'Running' : 'Stopped'}
        </span>
      </div>
    </div>
  );
}