'use client';

import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

/**
 * Category badge component with outlined style
 * Displays category name with border and gray text
 */
export default function CategoryBadge({ category }: CategoryBadgeProps): JSX.Element {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-white">
      {category}
    </span>
  );
}
