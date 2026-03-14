'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { MapPin, Clock, Navigation, ArrowLeft } from 'lucide-react';
import { HelpRequest } from '@/types';

interface ActiveTaskProps {
  requestId: string;
  onBack: () => void;
}

export default function ActiveTask({ requestId, onBack }: ActiveTaskProps): JSX.Element {
  const { getRequestById, updateRequestStatus, addReview } = useData();
  const { addToast } = useToast();
  const request = getRequestById(requestId);

  const [taskStatus, setTaskStatus] = useState<'traveling' | 'in_progress' | 'completed'>('traveling');
  const [volunteerPosition, setVolunteerPosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Destination (senior's location)
  const destination = {
    lat: request?.latitude || 37.7849,
    lng: request?.longitude || -122.4094,
  };

  // Calculate distance (simple approximation)
  const calculateDistance = useCallback((): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((destination.lat - volunteerPosition.lat) * Math.PI) / 180;
    const dLng = ((destination.lng - volunteerPosition.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((volunteerPosition.lat * Math.PI) / 180) *
        Math.cos((destination.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, [destination.lat, destination.lng, volunteerPosition.lat, volunteerPosition.lng]);

  const distance = calculateDistance();
  const eta = Math.ceil(distance * 3); // Rough estimate: 3 minutes per mile

  // Simulate volunteer moving toward destination
  useEffect(() => {
    if (taskStatus !== 'traveling') return;

    const interval = setInterval(() => {
      setVolunteerPosition(prev => {
        const newLat = prev.lat + (destination.lat - prev.lat) * 0.1;
        const newLng = prev.lng + (destination.lng - prev.lng) * 0.1;
        return { lat: newLat, lng: newLng };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [taskStatus, destination.lat, destination.lng]);

  const handleMarkInProgress = (): void => {
    setTaskStatus('in_progress');
    updateRequestStatus(requestId, 'in_progress');
    addToast({ title: 'Task marked as in progress', variant: 'success' });
  };

  const handleCompleteTask = (): void => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = (): void => {
    if (request) {
      addReview({
        reviewerId: 'v1',
        reviewerName: 'Sarah Thompson',
        revieweeId: request.seniorId,
        revieweeName: request.seniorName,
        requestId: request.id,
        rating,
        comment,
      });
    }
    updateRequestStatus(requestId, 'completed');
    setShowReviewModal(false);
    addToast({ title: 'Task completed! Thank you for volunteering.', variant: 'success' });
    onBack();
  };

  if (!request) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Request not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Map Section (60% height) */}
      <div className="h-[60vh] bg-gray-200 relative">
        {/* Simple map placeholder - in real app, use react-leaflet */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
          <div className="text-center">
            <div className="relative w-64 h-64">
              {/* Destination marker */}
              <div
                className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ top: '30%', left: '60%' }}
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              {/* Volunteer marker */}
              <div
                className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-1000"
                style={{
                  top: `${30 + (1 - distance / 2) * 20}%`,
                  left: `${60 - (1 - distance / 2) * 30}%`,
                }}
              >
                <Navigation className="w-4 h-4 text-white" />
              </div>
              {/* Line between markers */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="40%"
                  y1="60%"
                  x2="60%"
                  y2="35%"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
            <p className="text-gray-600 mt-4">Interactive map would render here with react-leaflet</p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Details Panel (40% height) */}
      <div className="p-4">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900">{request.title}</h2>
          <p className="text-gray-500">with {request.seniorName}</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <MapPin className="w-5 h-5 mx-auto text-gray-400 mb-1" />
              <p className="text-2xl font-bold text-gray-900">{distance.toFixed(1)} mi</p>
              <p className="text-sm text-gray-500">Distance</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Clock className="w-5 h-5 mx-auto text-gray-400 mb-1" />
              <p className="text-2xl font-bold text-gray-900">{eta} min</p>
              <p className="text-sm text-gray-500">ETA</p>
            </div>
          </div>

          <div className="mt-6">
            {taskStatus === 'traveling' && (
              <Button onClick={handleMarkInProgress} className="w-full">
                Mark In Progress
              </Button>
            )}
            {taskStatus === 'in_progress' && (
              <Button onClick={handleCompleteTask} className="w-full">
                Complete Task
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How was your experience with {request.seniorName}?
              </label>
              <StarRating value={rating} onChange={setRating} size="lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave a comment (optional)
              </label>
              <Textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
              Skip
            </Button>
            <Button onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
