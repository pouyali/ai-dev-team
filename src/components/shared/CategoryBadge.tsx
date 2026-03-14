'use client';

import React from 'react';
import { Category } from '../../types';

interface CategoryBadgeProps {
  category: Category;
}

/**
 * Badge component for displaying request category
 * Outlined style with border and gray text
 */
export default function CategoryBadge({ category }: CategoryBadgeProps): JSX.Element {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-white">
      {category}
    </span>
  );
}
