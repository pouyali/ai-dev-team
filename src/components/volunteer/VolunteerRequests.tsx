'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'
import { Calendar, Clock, MapPin } from 'lucide-react'

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

const priorityClass: Record<string, string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-black text-white',
  low: 'bg-green-500 text-white',
}

export default function VolunteerRequests() {
  const { user } = useAuth()
  const { requests, updateRequest } = useData()
  const router = useRouter()

  const [confirmDeclineId, setConfirmDeclineId] = useState<string | null>(null)
  const [acceptingIds, setAcceptingIds] = useState<Set<string>>(new Set())
  const [startingIds, setStartingIds] = useState<Set<string>>(new Set())

  const pendingRequests = requests.filter((r) => r.status === 'pending')

  // Guard against user being null
  const mySchedule =
    user != null
      ? requests.filter(
          (r) =>
            r.volunteerId === user.id &&
            ['accepted', 'started'].includes(r.status)
        )
      : []

  const handleAccept = async (requestId: string) => {
    if (!user) return
    if (acceptingIds.has(requestId)) return
    setAcceptingIds((prev) => new Set(prev).add(requestId))
    try {
      updateRequest(requestId, { status: 'accepted', volunteerId: user.id })
      toast.success('Request accepted!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to accept request. Please try again.')
    } finally {
      setAcceptingIds((prev) => {
        const next = new Set(prev)
        next.delete(requestId)
        return next
      })
    }
  }

  const handleDeclineConfirm = async () => {
    if (!confirmDeclineId) return
    const idToDecline = confirmDeclineId
    setConfirmDeclineId(null)
    try {
      updateRequest(idToDecline, { status: 'cancelled' })
      toast('Request declined')
    } catch (err) {
      console.error(err)
      toast.error('Failed to decline request. Please try again.')
    }
  }

  const handleStartTask = async (requestId: string) => {
    if (startingIds.has(requestId)) return
    setStartingIds((prev) => new Set(prev).add(requestId))
    try {
      updateRequest(requestId, { status: 'accepted' })
      router.push(`/volunteer/active/${requestId}`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to start task. Please try again.')
      setStartingIds((prev) => {
        const next = new Set(prev)
        next.delete(requestId)
        return next
      })
    }
  }

  return (
    <div className="space-y-10 pb-10">
      {/* ── Section 1: New Requests ── */}
      <section>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">New Requests</h1>
          <p className="text-gray-500 mt-1">Review and respond to volunteer opportunities</p>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-400">No new requests at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => {
              const location =
                'location' in request
                  ? (request as unknown as { location?: { address?: string } }).location
                  : undefined
              const priority =
                'priority' in request
                  ? (request as unknown as { priority?: string }).priority
                  : undefined
              const category =
                'category' in request
                  ? (request as unknown as { category?: string }).category
                  : undefined
              const seniorName =
                'seniorName' in request
                  ? (request as unknown as { seniorName?: string }).seniorName
                  : undefined
              const scheduledTime =
                'scheduledTime' in request
                  ? (request as unknown as { scheduledTime?: string }).scheduledTime
                  : undefined
              const duration =
                'duration' in request
                  ? (request as unknown as { duration?: string }).duration
                  : undefined
              const isAccepting = acceptingIds.has(request.id)

              return (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  {/* Card header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                      {getInitials(seniorName ?? request.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base leading-tight">
                        {request.title}
                      </h3>
                      {seniorName && (
                        <p className="text-gray-500 text-sm mt-0.5">
                          Requested by {seniorName}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {priority && (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              priorityClass[priority] ?? 'bg-gray-400 text-white'
                            }`}
                          >
                            {priority}
                          </span>
                        )}
                        {category && (
                          <span className="border border-gray-300 text-gray-600 bg-white rounded-full px-3 py-1 text-xs">
                            {category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {request.description && (
                    <p className="text-gray-500 text-sm mb-3">{request.description}</p>
                  )}

                  {/* Details */}
                  <div className="space-y-1.5 mb-4">
                    {request.scheduledDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>
                          {request.scheduledDate}
                          {scheduledTime ? ` at ${scheduledTime}` : ''}
                        </span>
                      </div>
                    )}
                    {duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{duration}</span>
                      </div>
                    )}
                    {location?.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(request.id)}
                      disabled={isAccepting}
                      className="w-1/2 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAccepting ? 'Accepting...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => setConfirmDeclineId(request.id)}
                      disabled={isAccepting}
                      className="w-1/2 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Section 2: My Schedule ── */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-500 mt-1">Your upcoming volunteer commitments</p>
        </div>

        {mySchedule.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-400">No upcoming commitments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mySchedule.map((request) => {
              const location =
                'location' in request
                  ? (request as unknown as { location?: { address?: string } }).location
                  : undefined
              const seniorName =
                'seniorName' in request
                  ? (request as unknown as { seniorName?: string }).seniorName
                  : undefined
              const scheduledTime =
                'scheduledTime' in request
                  ? (request as unknown as { scheduledTime?: string }).scheduledTime
                  : undefined
              const duration =
                'duration' in request
                  ? (request as unknown as { duration?: string }).duration
                  : undefined
              const isStarting = startingIds.has(request.id)

              return (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  {/* Card header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                      {getInitials(seniorName ?? request.title)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base leading-tight">
                        {request.title}
                      </h3>
                      {seniorName && (
                        <p className="text-gray-500 text-sm mt-0.5">with {seniorName}</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 mb-4">
                    {request.scheduledDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>
                          {request.scheduledDate}
                          {scheduledTime ? ` at ${scheduledTime}` : ''}
                        </span>
                      </div>
                    )}
                    {duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{duration}</span>
                      </div>
                    )}
                    {location?.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => handleStartTask(request.id)}
                    disabled={isStarting}
                    className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isStarting ? 'Starting...' : 'Start Task'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Inline Confirm Dialog ── */}
      {confirmDeclineId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Decline Request</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to decline this request? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeclineId(null)}
                className="w-1/2 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineConfirm}
                className="w-1/2 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
