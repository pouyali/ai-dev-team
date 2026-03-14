'use client';

import React from 'react';
import { Category } from '../../types';

interface CategoryBadgeProps {
  category: Category;
}

/**
 * Outlined badge component for displaying request categories
 */
export default function CategoryBadge({ category }: CategoryBadgeProps): JSX.Element {
  const formatCategory = (cat: Category): string => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-white">
      {formatCategory(category)}
    </span>
  );
}
