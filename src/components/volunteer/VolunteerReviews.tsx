'use client';

import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/shared/Avatar';
import { StarRating } from '@/components/ui/star-rating';
import { Star } from 'lucide-react';

export default function VolunteerReviews(): JSX.Element {
  const { reviews } = useData();

  // Filter reviews for current volunteer user
  const userReviews = reviews.filter(r => r.revieweeId === 'v1');

  // Calculate average rating
  const averageRating = userReviews.length > 0
    ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    : 0;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
        <p className="text-gray-600">Feedback from the seniors you&apos;ve helped</p>
      </div>

      {/* Average Rating Card */}
      {userReviews.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
              <p className="text-gray-600">Based on {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Reviews List */}
      {userReviews.length === 0 ? (
        <Card className="p-8 text-center">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">Complete tasks to receive feedback from seniors</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {userReviews.map(review => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar name={review.reviewerName} size="md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{review.reviewerName}</h4>
                    <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                  </div>
                  <StarRating value={review.rating} readonly size="sm" className="mt-1" />
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
