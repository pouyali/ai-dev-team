'use client'

import React from 'react'
import { Home, Calendar, Bell, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'
import NavTabs from '@/components/ui/NavTabs'

function TopBar(): JSX.Element {
  const { user, login, logout } = useAuth()
  const router = useRouter()

  function handleSwitch(role: 'volunteer' | 'senior' | 'admin'): void {
    const roleToUserId: Record<string, string> = {
      volunteer: '1',
      senior: '2',
      admin: '3',
    }
    const userId = roleToUserId[role]
    if (userId) {
      login(userId)
      if (role === 'senior') {
        router.push('/senior')
      } else if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/volunteer')
      }
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-base font-bold text-gray-900">Volunteer Portal</h1>
        {user && (
          <p className="text-xs text-gray-500">{user.name}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <select
          value={user?.role ?? 'volunteer'}
          onChange={(e) => handleSwitch(e.target.value as 'volunteer' | 'senior' | 'admin')}
          className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="volunteer">Volunteer</option>
          <option value="senior">Senior</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={() => { logout(); router.push('/login') }}
          className="text-xs text-gray-500 hover:text-gray-800 transition-colors px-2 py-1 border border-gray-200 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

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
      <TopBar />
      <NavTabs tabs={tabs} />
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
