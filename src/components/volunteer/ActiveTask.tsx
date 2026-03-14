'use client'

import React, { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Star, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'

// Dynamically import the map to avoid SSR issues
const MapView = dynamic(() => import('./MapView'), { ssr: false })

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}): JSX.Element {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hovered || value)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 fill-gray-100'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

interface ReviewModalProps {
  seniorName: string
  onCancel: () => void
  onSubmit: (rating: number, comment: string) => void
}

function ReviewModal({ seniorName, onCancel, onSubmit }: ReviewModalProps): JSX.Element {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating.')
      return
    }
    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters.')
      return
    }
    onSubmit(rating, comment.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Rate your experience with {seniorName}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment <span className="text-gray-400">(min 10 characters)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Share your experience..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ActiveTaskProps {
  requestId: string
}

export default function ActiveTask({ requestId }: ActiveTaskProps): JSX.Element {
  const { user } = useAuth()
  const { requests, users, updateRequest, submitReview, completeTask } = useData()
  const router = useRouter()

  const request = requests.find((r) => r.id === requestId)
  const senior = users?.find((u) => u.id === request?.seniorId)

  // Volunteer starts near the senior's location offset by ~0.05 degrees
  const [volunteerPos, setVolunteerPos] = useState<{ lat: number; lng: number } | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (request?.location) {
      setVolunteerPos({
        lat: request.location.lat + 0.05,
        lng: request.location.lng + 0.05,
      })
    }
  }, [request?.location?.lat, request?.location?.lng])

  // Use functional updater so volunteerPos is NOT needed in the dependency array.
  // This prevents the interval from restarting every time volunteerPos changes.
  const moveCloser = useCallback(() => {
    if (!request?.location) return
    setVolunteerPos((prev) => {
      if (!prev) return prev
      return {
        lat: prev.lat + (request.location.lat - prev.lat) * 0.1,
        lng: prev.lng + (request.location.lng - prev.lng) * 0.1,
      }
    })
  }, [request?.location])

  useEffect(() => {
    const id = setInterval(moveCloser, 5000)
    return () => clearInterval(id)
  }, [moveCloser])

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Request not found.</p>
      </div>
    )
  }

  const destination = request.location
  const distance =
    volunteerPos && destination
      ? calculateDistance(volunteerPos.lat, volunteerPos.lng, destination.lat, destination.lng)
      : 0
  const eta = Math.round((distance / 30) * 60)

  const seniorName = senior?.name ?? 'Senior'

  function handleMarkInProgress(): void {
    updateRequest(requestId, { status: 'in-progress' })
  }

  async function handleReviewSubmit(rating: number, comment: string): Promise<void> {
    if (!user) return
    await submitReview({
      requestId,
      reviewerId: user.id,
      revieweeId: request?.seniorId ?? '',
      rating,
      comment,
    })
    await completeTask(requestId)
    setToast('Task completed!')
    setTimeout(() => {
      router.push('/volunteer')
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-medium">
          {toast}
        </div>
      )}

      {/* Map — 60% of screen height */}
      <div className="h-[60vh] w-full relative">
        {volunteerPos && destination ? (
          <MapView
            volunteerPos={volunteerPos}
            destination={{ lat: destination.lat, lng: destination.lng }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-400">Loading map...</p>
          </div>
        )}
      </div>

      {/* Details panel — 40% of screen height */}
      <div className="h-[40vh] bg-white overflow-y-auto px-5 py-4 shadow-inner border-t border-gray-200">
        <div className="space-y-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{request.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{request.description}</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-700">
              <span className="font-medium">Senior:</span> {seniorName}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                request.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-700'
                  : request.status === 'started'
                  ? 'bg-yellow-100 text-yellow-700'
                  : request.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {request.status}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-500">Distance: </span>
              <span className="font-semibold text-gray-800">{distance.toFixed(2)} km</span>
            </div>
            <div>
              <span className="text-gray-500">ETA: </span>
              <span className="font-semibold text-gray-800">{eta} min</span>
            </div>
          </div>

          {request.status === 'started' && (
            <button
              onClick={handleMarkInProgress}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Mark In Progress
            </button>
          )}

          {request.status === 'in-progress' && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Complete Task
            </button>
          )}
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          seniorName={seniorName}
          onCancel={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  )
}
