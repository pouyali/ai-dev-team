'use client';

import React from 'react';

type Status = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
}

/**
 * Status badge component with color-coded backgrounds
 * Different colors for each status state
 */
export default function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  const getStyles = (): string => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'accepted':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'in_progress':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'cancelled':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatStatus = (status: Status): string => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStyles()}`}>
      {formatStatus(status)}
    </span>
  );
}
