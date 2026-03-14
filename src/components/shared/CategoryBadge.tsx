'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
}

/**
 * Category badge component with outlined style
 */
export default function CategoryBadge({ category }: CategoryBadgeProps): JSX.Element {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-white">
      {category}
    </span>
  );
}
