'use client';

import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Play } from 'lucide-react';
import { HelpRequest, User } from '@/types';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

interface RequestCardProps {
  request: HelpRequest;
  requester?: User;
  volunteer?: User;
  variant?: 'available' | 'scheduled' | 'completed';
  onAccept?: () => void;
  onDecline?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
}

/**
 * Request card component matching the screenshot design
 * Supports different variants: available requests, scheduled tasks, completed tasks
 */
export default function RequestCard({
  request,
  requester,
  volunteer,
  variant = 'available',
  onAccept,
  onDecline,
  onStart,
  onComplete
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
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const displayName = variant === 'scheduled' && volunteer 
    ? volunteer.name 
    : requester?.name || 'Unknown';

  const nameLabel = variant === 'scheduled' 
    ? `with ${displayName}` 
    : `Requested by ${displayName}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">
            {getInitials(displayName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{request.title}</h3>
          <p className="text-sm text-gray-500">{nameLabel}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <PriorityBadge priority={request.priority} />
            <CategoryBadge category={request.category} />
          </div>
        </div>
      </div>

      {/* Description */}
      {request.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {request.description}
        </p>
      )}

      {/* Details */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{request.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{request.location.address}</span>
        </div>
      </div>

      {/* Action buttons */}
      {variant === 'available' && (onAccept || onDecline) && (
        <div className="flex gap-3">
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </button>
          )}
          {onDecline && (
            <button
              onClick={onDecline}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
          )}
        </div>
      )}

      {variant === 'scheduled' && onStart && (
        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          <Play className="w-4 h-4" />
          Start Task
        </button>
      )}

      {variant === 'scheduled' && onComplete && (
        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Complete Task
        </button>
      )}
    </div>
  );
}
