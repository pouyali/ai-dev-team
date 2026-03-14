'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Star rating component with display and interactive modes
 * Uses filled yellow stars for rating, empty gray stars for remaining
 */
export default function StarRating({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  size = 'md',
}: StarRatingProps): JSX.Element {
  const [hoverRating, setHoverRating] = React.useState<number>(0);

  const getSizeClass = (): string => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const handleClick = (index: number): void => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const handleMouseEnter = (index: number): void => {
    if (interactive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = (): void => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= displayRating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`${getSizeClass()} ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-gray-300'}`}
            />
          </button>
        );
      })}
    </div>
  );
}
