'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import { Request, User } from '../../types';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

interface RequestCardProps {
  request: Request;
  senior?: User;
  volunteer?: User;
  variant?: 'available' | 'scheduled' | 'senior-view';
  onAccept?: () => void;
  onDecline?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
}

/**
 * Card component for displaying volunteer requests
 * Supports multiple variants: available requests, scheduled tasks, and senior view
 */
export default function RequestCard({
  request,
  senior,
  volunteer,
  variant = 'available',
  onAccept,
  onDecline,
  onStart,
  onComplete,
}: RequestCardProps): JSX.Element {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const displayName = variant === 'scheduled' && volunteer
    ? volunteer.name
    : senior?.name || 'Unknown';

  const avatarInitials = getInitials(displayName);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">{avatarInitials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{request.title}</h3>
          <p className="text-sm text-gray-500">
            {variant === 'scheduled' ? `with ${displayName}` : `Requested by ${displayName}`}
          </p>
          {variant !== 'scheduled' && (
            <div className="flex flex-wrap gap-2 mt-2">
              <PriorityBadge priority={request.priority} />
              <CategoryBadge category={request.category} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {variant !== 'scheduled' && request.description && (
        <p className="text-sm text-gray-600 mb-4">{request.description}</p>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{request.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{request.location}</span>
        </div>
      </div>

      {/* Actions */}
      {variant === 'available' && (onAccept || onDecline) && (
        <div className="flex gap-3">
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
          )}
          {onDecline && (
            <button
              onClick={onDecline}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
          )}
        </div>
      )}

      {variant === 'scheduled' && onStart && (
        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Start Task
        </button>
      )}

      {variant === 'scheduled' && onComplete && (
        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          Complete Task
        </button>
      )}
    </div>
  );
}
