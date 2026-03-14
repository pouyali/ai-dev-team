'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'
import { CheckCircle, XCircle, Calendar, Clock, MapPin } from 'lucide-react'

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

interface ToastState {
  message: string
  type: 'success' | 'error'
  visible: boolean
}

interface ConfirmDialogState {
  visible: boolean
  requestId: string
  title: string
}

export default function VolunteerRequests() {
  const { user } = useAuth()
  const { requests, acceptRequest, declineRequest, startTask } = useData()
  const router = useRouter()

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  })

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    visible: false,
    requestId: '',
    title: '',
  })

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true })
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000)
  }

  const pendingRequests = requests.filter((r) => r.status === 'pending')

  const mySchedule = requests.filter(
    (r) =>
      r.volunteerId === user?.id &&
      ['accepted', 'started'].includes(r.status)
  )

  const handleAccept = async (requestId: string) => {
    if (!user) return
    await acceptRequest(requestId, user.id)
    showToast('Request accepted!')
  }

  const handleDeclineClick = (requestId: string, title: string) => {
    setConfirmDialog({ visible: true, requestId, title })
  }

  const handleDeclineConfirm = async () => {
    await declineRequest(confirmDialog.requestId)
    setConfirmDialog({ visible: false, requestId: '', title: '' })
    showToast('Request declined', 'error')
  }

  const handleDeclineCancel = () => {
    setConfirmDialog({ visible: false, requestId: '', title: '' })
  }

  const handleStartTask = async (requestId: string) => {
    await startTask(requestId)
    router.push(`/volunteer/active/${requestId}`)
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Toast */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Decline Request</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to decline &ldquo;{confirmDialog.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeclineCancel}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineConfirm}
                className="flex-1 py-2 px-4 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: New Requests */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">New Requests</h1>
          <p className="text-gray-500 mt-1">Review and respond to volunteer opportunities</p>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No new requests at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0 overflow-hidden">
                    {request.seniorAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={request.seniorAvatar} alt={request.seniorName} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(request.seniorName)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">{request.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">Requested by {request.seniorName}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          priorityClass[request.priority] ?? 'bg-gray-400 text-white'
                        }`}
                      >
                        {request.priority} priority
                      </span>
                      <span className="border border-gray-300 text-gray-600 bg-white rounded-full px-3 py-1 text-xs">
                        {request.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4">{request.description}</p>

                {/* Details */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.scheduledDate} at {request.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.location?.address ?? request.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineClick(request.id, request.title)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: My Schedule */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-500 mt-1">Your upcoming volunteer commitments</p>
        </div>

        {mySchedule.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No upcoming commitments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mySchedule.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                    {getInitials(request.seniorName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">{request.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">with {request.seniorName}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.scheduledDate} at {request.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{request.location?.address ?? request.location}</span>
                  </div>
                </div>

                {/* Start Task */}
                <button
                  onClick={() => handleStartTask(request.id)}
                  className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Start Task
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
