'use client';

import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { HelpRequest } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/shared/Avatar';

interface RequestCardProps {
  request: HelpRequest;
  variant?: 'pending' | 'accepted';
  onAccept?: () => void;
  onDecline?: () => void;
  onStartTask?: () => void;
}

export function RequestCard({
  request,
  variant = 'pending',
  onAccept,
  onDecline,
  onStartTask,
}: RequestCardProps): JSX.Element {
  const getPriorityBadge = (): JSX.Element => {
    if (request.priority === 'high') {
      return (
        <Badge className="bg-red-500 text-white hover:bg-red-500">
          high priority
        </Badge>
      );
    }
    if (request.priority === 'medium') {
      return (
        <Badge className="bg-gray-900 text-white hover:bg-gray-900">
          medium priority
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        low priority
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={request.seniorName} size="md" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{request.title}</h3>
          <p className="text-sm text-gray-500">
            {variant === 'pending' ? `Requested by ${request.seniorName}` : `with ${request.seniorName}`}
          </p>
          {variant === 'pending' && (
            <div className="flex gap-2 mt-2">
              {getPriorityBadge()}
              <Badge variant="outline">{request.category}</Badge>
            </div>
          )}
        </div>
      </div>

      {variant === 'pending' && (
        <p className="text-gray-600 mb-4">{request.description}</p>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{request.date} at {request.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{request.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{request.location}</span>
        </div>
      </div>

      {variant === 'pending' && onAccept && onDecline && (
        <div className="flex gap-3 mt-6">
          <Button onClick={onAccept} className="flex-1 gap-2">
            <CheckCircle className="w-4 h-4" />
            Accept
          </Button>
          <Button onClick={onDecline} variant="outline" className="flex-1 gap-2">
            <XCircle className="w-4 h-4" />
            Decline
          </Button>
        </div>
      )}

      {variant === 'accepted' && onStartTask && (
        <Button onClick={onStartTask} className="w-full mt-6">
          Start Task
        </Button>
      )}
    </Card>
  );
}
