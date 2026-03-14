'use client';

import React from 'react';
import { RequestStatus } from '../../types';

interface StatusBadgeProps {
  status: RequestStatus;
}

/**
 * Badge component for displaying request status
 * Colors: pending=gray, accepted=blue, in-progress=purple, completed=green, rejected=red
 */
export default function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  const getStyles = (): string => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'accepted':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'in-progress':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getLabel = (): string => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStyles()}`}>
      {getLabel()}
    </span>
  );
}
