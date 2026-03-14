'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

interface RequestCardProps {
  id: string;
  title: string;
  description: string;
  requesterName: string;
  requesterInitials?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  date: string;
  time: string;
  duration: string;
  address: string;
  variant?: 'request' | 'scheduled';
  seniorName?: string;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onStartTask?: (id: string) => void;
}

/**
 * Request card component matching the screenshot design
 * Supports both request view (with Accept/Decline) and scheduled view (with Start Task)
 */
export default function RequestCard({
  id,
  title,
  description,
  requesterName,
  requesterInitials,
  priority,
  category,
  date,
  time,
  duration,
  address,
  variant = 'request',
  seniorName,
  onAccept,
  onDecline,
  onStartTask,
}: RequestCardProps): JSX.Element {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = requesterInitials || getInitials(requesterName);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      {/* Header with avatar, title, badges */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {variant === 'scheduled' && seniorName
              ? `with ${seniorName}`
              : `Requested by ${requesterName}`}
          </p>
          {variant === 'request' && (
            <div className="flex items-center gap-2 mt-2">
              <PriorityBadge priority={priority} />
              <CategoryBadge category={category} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {variant === 'request' && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            {date} at {time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{address}</span>
        </div>
      </div>

      {/* Actions */}
      {variant === 'request' && onAccept && onDecline && (
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onAccept(id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            Accept
          </button>
          <button
            onClick={() => onDecline(id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Decline
          </button>
        </div>
      )}

      {variant === 'scheduled' && onStartTask && (
        <button
          onClick={() => onStartTask(id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Start Task
        </button>
      )}
    </div>
  );
}
