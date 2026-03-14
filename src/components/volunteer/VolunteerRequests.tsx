'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/components/shared/ToastContainer';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import { Request } from '@/types';

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time for display
 */
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get priority badge color classes
 */
function getPriorityClasses(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-500 text-white';
    case 'medium':
      return 'bg-gray-900 text-white';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

/**
 * VolunteerRequests component - displays pending requests and scheduled tasks
 */
export default function VolunteerRequests(): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const { requests, users, acceptRequest, declineRequest, startTask } = useData();
  const { showToast } = useToast();
  
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Filter pending requests (available for volunteers to accept)
  const pendingRequests = requests.filter(req => req.status === 'pending');

  // Filter scheduled tasks (accepted or started by current volunteer)
  const mySchedule = requests.filter(
    req => req.volunteerId === user?.id && (req.status === 'accepted' || req.status === 'started')
  );

  /**
   * Get senior name by ID
   */
  const getSeniorName = (seniorId: string): string => {
    const senior = users.find(u => u.id === seniorId);
    return senior?.name || 'Unknown Senior';
  };

  /**
   * Handle accept request
   */
  const handleAccept = (requestId: string): void => {
    acceptRequest(requestId);
    showToast('Request accepted!', 'success');
  };

  /**
   * Open decline confirmation dialog
   */
  const handleDeclineClick = (requestId: string): void => {
    setSelectedRequestId(requestId);
    setDeclineDialogOpen(true);
  };

  /**
   * Confirm decline request
   */
  const handleDeclineConfirm = (): void => {
    if (selectedRequestId) {
      declineRequest(selectedRequestId);
      showToast('Request declined', 'success');
    }
    setDeclineDialogOpen(false);
    setSelectedRequestId(null);
  };

  /**
   * Handle start task
   */
  const handleStartTask = (requestId: string): void => {
    startTask(requestId);
    router.push(`/volunteer/active/${requestId}`);
  };

  /**
   * Render a pending request card
   */
  const renderPendingRequestCard = (request: Request): JSX.Element => {
    const seniorName = getSeniorName(request.seniorId);
    const initials = getInitials(seniorName);

    return (
      <Card key={request.id} className="mb-4">
        <CardContent className="p-6">
          {/* Header with initials, title, and badges */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <p className="text-gray-600">Requested by {seniorName}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={`${getPriorityClasses(request.priority)} rounded-full px-3 py-1 text-xs font-medium`}>
                  {request.priority} priority
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium border-gray-300 text-gray-600">
                  {request.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 mb-4">{request.description}</p>

          {/* Details */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{request.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{request.address}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleAccept(request.id)}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Accept
            </Button>
            <Button
              onClick={() => handleDeclineClick(request.id)}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  /**
   * Render a scheduled task card
   */
  const renderScheduledCard = (request: Request): JSX.Element => {
    const seniorName = getSeniorName(request.seniorId);
    const initials = getInitials(seniorName);

    return (
      <Card key={request.id} className="mb-4">
        <CardContent className="p-6">
          {/* Header with initials and title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <p className="text-gray-600">with {seniorName}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{request.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{request.address}</span>
            </div>
          </div>

          {/* Start Task button */}
          <Button
            onClick={() => handleStartTask(request.id)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Start Task
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* New Requests Section */}
      <section>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">New Requests</h1>
          <p className="text-gray-600">Review and respond to volunteer opportunities</p>
        </div>
        
        {pendingRequests.length > 0 ? (
          <div>
            {pendingRequests.map(request => renderPendingRequestCard(request))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No new requests available at this time.
            </CardContent>
          </Card>
        )}
      </section>

      {/* My Schedule Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-600">Your upcoming volunteer commitments</p>
        </div>
        
        {mySchedule.length > 0 ? (
          <div>
            {mySchedule.map(request => renderScheduledCard(request))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              You have no scheduled tasks. Accept a request to get started!
            </CardContent>
          </Card>
        )}
      </section>

      {/* Decline Confirmation Dialog */}
      <ConfirmDialog
        open={declineDialogOpen}
        onOpenChange={setDeclineDialogOpen}
        title="Decline Request"
        description="Are you sure you want to decline this volunteer request? This action cannot be undone."
        confirmText="Decline"
        cancelText="Cancel"
        onConfirm={handleDeclineConfirm}
        variant="destructive"
      />
    </div>
  );
}
