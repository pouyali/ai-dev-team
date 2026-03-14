'use client'

import React from 'react'
import { Home, Calendar, Bell, Star } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'
import NavTabs from '@/components/ui/NavTabs'

export default function VolunteerPortalLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const { user } = useAuth()
  const { getUnreadCount } = useData()
  const unreadCount = getUnreadCount(user?.id ?? '')

  const tabs = [
    { label: 'Requests', href: '/volunteer', icon: Home },
    { label: 'Schedule', href: '/volunteer/schedule', icon: Calendar },
    { label: 'Notifications', href: '/volunteer/notifications', icon: Bell, badge: unreadCount },
    { label: 'Reviews', href: '/volunteer/reviews', icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavTabs tabs={tabs} />
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
