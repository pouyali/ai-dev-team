'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner component with configurable size
 */
export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps): JSX.Element {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${getSizeClass()} border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin`}
      />
    </div>
  );
}
