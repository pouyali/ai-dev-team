import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps): JSX.Element {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-gray-900 text-white': variant === 'default',
          'border border-gray-300 text-gray-700 bg-white': variant === 'outline',
          'bg-red-100 text-red-800': variant === 'destructive',
          'bg-gray-100 text-gray-800': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
