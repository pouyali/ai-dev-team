'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Home, PlusCircle, List, User } from 'lucide-react'

export default function SeniorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const getInitials = (name: string) =>
    name
      ?.split(' ')
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '?'

  const tabs = [
    { label: 'Dashboard', href: '/senior', icon: Home },
    { label: 'Create Request', href: '/senior/create', icon: PlusCircle },
    { label: 'My Requests', href: '/senior/requests', icon: List },
    { label: 'Profile', href: '/senior/profile', icon: User },
  ]

  const activeTab =
    tabs.find((t) =>
      t.href === '/senior'
        ? pathname === '/senior'
        : pathname === t.href || pathname.startsWith(t.href + '/')
    )?.label ?? 'Dashboard'

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">VC</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">VolunteerConnect</div>
              <div className="text-xs text-gray-500">Senior Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/volunteer')}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
            >
              Switch to Volunteer
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              onClick={handleLogout}
            >
              {getInitials(user?.name ?? '')}
            </div>
          </div>
        </div>
        <div className="px-6 pb-2">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1 w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => router.push(tab.href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
