'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const getInitials = (name: string) =>
    name
      ?.split(' ')
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '?'

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
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
            >
              Logout
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
              {getInitials(user?.name ?? '')}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
