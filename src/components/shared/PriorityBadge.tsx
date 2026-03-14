'use client';

import React from 'react';

type Priority = 'low' | 'medium' | 'high';

interface PriorityBadgeProps {
  priority: Priority;
}

/**
 * Priority badge component with color-coded backgrounds
 * high = red, medium = black, low = green
 */
export default function PriorityBadge({ priority }: PriorityBadgeProps): JSX.Element {
  const getStyles = (): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-gray-900 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {priority} priority
    </span>
  );
}
