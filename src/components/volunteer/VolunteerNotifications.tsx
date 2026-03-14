'use client'

import React from 'react'
import { Bell } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// TODO: add notifications, markNotificationRead, getUnreadCount to DataContext
const EMPTY_NOTIFICATIONS: { id: string; userId: string; title: string; message: string; read: boolean; createdAt: string }[] = []

export default function VolunteerNotifications(): JSX.Element {
  const { user } = useAuth()
  const notifications = EMPTY_NOTIFICATIONS
  const userNotifications = notifications.filter((n) => n.userId === user?.id)
  const unreadCount = 0

  function markNotificationRead(_id: string): void {
    // no-op until DataContext has notifications
  }

  function handleMarkAllRead(): void {
    userNotifications
      .filter((n) => !n.read)
      .forEach((n) => markNotificationRead(n.id))
  }

  if (userNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Bell className="w-16 h-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">No notifications yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {userNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markNotificationRead(notification.id)}
            className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all ${
              !notification.read
                ? 'border-l-4 border-blue-500 bg-blue-50'
                : 'bg-white border border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`font-semibold ${
                  !notification.read ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {notification.title}
                </p>
                <p className={`text-sm mt-1 ${
                  !notification.read ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(notification.createdAt)}
                </p>
              </div>
              {!notification.read && (
                <span className="ml-3 mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
