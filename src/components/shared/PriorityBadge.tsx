'use client';

import React from 'react';
import { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
}

/**
 * Badge component for displaying request priority level
 * Colors: high=red, medium=black, low=green
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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {priority} priority
    </span>
  );
}
