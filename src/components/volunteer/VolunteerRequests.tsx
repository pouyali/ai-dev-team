'use client';

import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/toast';
import { RequestCard } from '@/components/shared/RequestCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VolunteerRequestsProps {
  onNavigateToActiveTask: (requestId: string) => void;
}

export default function VolunteerRequests({ onNavigateToActiveTask }: VolunteerRequestsProps): JSX.Element {
  const { getPendingRequests, getAcceptedRequests, acceptRequest, declineRequest, startTask } = useData();
  const { addToast } = useToast();
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [requestToDecline, setRequestToDecline] = useState<string | null>(null);

  const pendingRequests = getPendingRequests();
  const acceptedRequests = getAcceptedRequests();

  const handleAccept = (requestId: string): void => {
    acceptRequest(requestId);
    addToast({
      title: 'Request accepted!',
      variant: 'success',
    });
  };

  const handleDeclineClick = (requestId: string): void => {
    setRequestToDecline(requestId);
    setDeclineDialogOpen(true);
  };

  const handleConfirmDecline = (): void => {
    if (requestToDecline) {
      declineRequest(requestToDecline);
      addToast({
        title: 'Request declined',
        variant: 'info',
      });
    }
    setDeclineDialogOpen(false);
    setRequestToDecline(null);
  };

  const handleStartTask = (requestId: string): void => {
    startTask(requestId);
    onNavigateToActiveTask(requestId);
  };

  return (
    <div className="space-y-8">
      {/* New Requests Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">New Requests</h2>
          <p className="text-gray-600">Review and respond to volunteer opportunities</p>
        </div>
        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No new requests at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                variant="pending"
                onAccept={() => handleAccept(request.id)}
                onDecline={() => handleDeclineClick(request.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* My Schedule Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-600">Your upcoming volunteer commitments</p>
        </div>
        {acceptedRequests.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No scheduled tasks. Accept a request to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {acceptedRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                variant="accepted"
                onStartTask={() => handleStartTask(request.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Decline Confirmation Dialog */}
      <Dialog open={declineDialogOpen} onOpenChange={setDeclineDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to decline this request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeclineDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDecline}>
              Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
