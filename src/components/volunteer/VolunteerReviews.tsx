'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function StarDisplay({ rating }: { rating: number }): JSX.Element {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 fill-gray-100'
          }`}
        />
      ))}
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// TODO: add reviews and users to DataContext when available
const EMPTY_REVIEWS: { id: string; revieweeId: string; reviewerId: string; rating: number; comment: string; createdAt: string }[] = []

export default function VolunteerReviews(): JSX.Element {
  const { user } = useAuth()
  const reviews = EMPTY_REVIEWS
  const users: { id: string; name: string; role: string }[] = []
  const myReviews = reviews.filter((r) => r.revieweeId === user?.id)

  const averageRating =
    myReviews.length > 0
      ? myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length
      : 0

  if (myReviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Star className="w-16 h-16 mb-4 opacity-30" />
        <p className="text-lg font-medium text-gray-500">No reviews yet</p>
        <p className="text-sm text-gray-400 mt-1">Complete tasks to receive reviews</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Average Rating Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 ${
                star <= Math.round(averageRating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-200 fill-gray-100'
              }`}
            />
          ))}
        </div>
        <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)} average</p>
        <p className="text-sm text-gray-500 mt-1">
          {myReviews.length} {myReviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {myReviews.map((review) => {
          const reviewer = users?.find((u) => u.id === review.reviewerId)
          const reviewerName = reviewer?.name ?? 'Unknown User'
          const reviewerRole = reviewer?.role ?? 'user'

          return (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-600">
                    {getInitials(reviewerName)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{reviewerName}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                        reviewerRole === 'senior'
                          ? 'bg-purple-100 text-purple-700'
                          : reviewerRole === 'volunteer'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {reviewerRole}
                    </span>
                  </div>
                  <div className="mt-1">
                    <StarDisplay rating={review.rating} />
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{formatDate(review.createdAt)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
