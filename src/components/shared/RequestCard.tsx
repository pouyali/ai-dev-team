'use client';

import React from 'react';
import { HelpRequest } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/shared/Avatar';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequestCardProps {
  request: HelpRequest;
  variant: 'pending' | 'accepted';
  onAccept?: () => void;
  onDecline?: () => void;
  onStartTask?: () => void;
}

export function RequestCard({
  request,
  variant,
  onAccept,
  onDecline,
  onStartTask,
}: RequestCardProps): JSX.Element {
  const getPriorityBadgeClasses = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-gray-900 text-white';
      case 'low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  const formatPriority = (priority: string): string => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar name={request.seniorName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{request.title}</h3>
              <p className="text-sm text-gray-500">
                {variant === 'pending' ? `Requested by ${request.seniorName}` : `with ${request.seniorName}`}
              </p>
            </div>
            {variant === 'pending' && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getPriorityBadgeClasses(request.priority)
                  )}
                >
                  {formatPriority(request.priority)}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full border border-gray-300 text-gray-600">
                  {request.category}
                </span>
              </div>
            )}
          </div>

          {variant === 'pending' && request.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{request.description}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{request.date} at {request.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{request.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{request.location}</span>
            </div>
          </div>

          {variant === 'pending' && (
            <div className="flex gap-2 mt-4">
              <Button onClick={onAccept} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                Accept
              </Button>
              <Button variant="outline" onClick={onDecline} className="flex-1">
                Decline
              </Button>
            </div>
          )}

          {variant === 'accepted' && (
            <div className="mt-4">
              <Button onClick={onStartTask} className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                Start Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
