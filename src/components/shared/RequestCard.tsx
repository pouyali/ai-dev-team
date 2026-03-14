'use client';

import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Request, User } from '../../types';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

interface RequestCardProps {
  request: Request;
  senior?: User;
  variant?: 'new' | 'scheduled';
  onAccept?: () => void;
  onDecline?: () => void;
  onStart?: () => void;
}

/**
 * Card component displaying request details
 * Supports two variants: new requests and scheduled tasks
 */
export default function RequestCard({
  request,
  senior,
  variant = 'new',
  onAccept,
  onDecline,
  onStart
}: RequestCardProps): JSX.Element {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const seniorName = senior?.name || 'Unknown';
  const initials = getInitials(seniorName);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      {/* Header with avatar and title */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{request.title}</h3>
          {variant === 'new' ? (
            <p className="text-gray-500 text-sm">Requested by {seniorName}</p>
          ) : (
            <p className="text-gray-500 text-sm">with {seniorName}</p>
          )}
          {variant === 'new' && (
            <div className="flex items-center gap-2 mt-2">
              <PriorityBadge priority={request.priority} />
              <CategoryBadge category={request.category} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {variant === 'new' && request.description && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {request.description}
        </p>
      )}

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{request.estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{request.location}</span>
        </div>
      </div>

      {/* Actions */}
      {variant === 'new' && onAccept && onDecline && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Accept
          </button>
          <button
            onClick={onDecline}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Decline
          </button>
        </div>
      )}

      {variant === 'scheduled' && onStart && (
        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Start Task
        </button>
      )}
    </div>
  );
}
