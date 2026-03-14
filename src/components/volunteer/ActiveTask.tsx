'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
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
import { MapPin, Clock, ArrowLeft } from 'lucide-react';

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);

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
  const [mapReady, setMapReady] = useState(false);

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

  // Set map ready after component mounts (for SSR)
  useEffect(() => {
    setMapReady(true);
  }, []);

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

  const centerLat = (volunteerPosition.lat + destination.lat) / 2;
  const centerLng = (volunteerPosition.lng + destination.lng) / 2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Map Section (60% height) */}
      <div className="h-[60vh] bg-gray-200 relative">
        {mapReady && typeof window !== 'undefined' && (
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Volunteer marker (blue) */}
            <Marker position={[volunteerPosition.lat, volunteerPosition.lng]} />
            {/* Senior marker (red) */}
            <Marker position={[destination.lat, destination.lng]} />
            {/* Polyline between markers */}
            <Polyline
              positions={[
                [volunteerPosition.lat, volunteerPosition.lng],
                [destination.lat, destination.lng],
              ]}
              color="blue"
            />
          </MapContainer>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-[1000] bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
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
              <Button onClick={handleMarkInProgress} className="w-full bg-gray-900 hover:bg-gray-800">
                Mark In Progress
              </Button>
            )}
            {taskStatus === 'in_progress' && (
              <Button onClick={handleCompleteTask} className="w-full bg-gray-900 hover:bg-gray-800">
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
