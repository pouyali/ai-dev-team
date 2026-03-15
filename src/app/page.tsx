'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { mockUsers } from '@/utils/mockData'
import { User } from '@/types'

export default function HomePage() {
  const { user, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    if (user.role === 'volunteer') router.replace('/volunteer')
    else if (user.role === 'senior') router.replace('/senior')
    else if (user.role === 'admin') router.replace('/admin')
  }, [user, router])

  if (user) return null

  const volunteers = mockUsers.filter(u => u.role === 'volunteer')
  const seniors = mockUsers.filter(u => u.role === 'senior')
  const admins = mockUsers.filter(u => u.role === 'admin')

  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const UserButton = ({ u }: { u: User }) => (
    <button
      onClick={() => login(u.id)}
      className="flex items-center gap-3 w-full p-3 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left"
    >
      <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
        {getInitials(u.name)}
      </div>
      <div>
        <div className="font-medium text-gray-900 text-sm">{u.name}</div>
        <div className="text-xs text-gray-400">{u.email}</div>
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">VC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-1">Connect volunteers with seniors who need assistance</p>
        </div>

        {/* User selection card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <p className="text-sm text-gray-500 text-center mb-6">Select a user to continue</p>

          {/* Volunteers */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Volunteers
            </div>
            <div className="space-y-2">
              {volunteers.map(u => <UserButton key={u.id} u={u} />)}
            </div>
          </div>

          {/* Seniors */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Seniors
            </div>
            <div className="space-y-2">
              {seniors.map(u => <UserButton key={u.id} u={u} />)}
            </div>
          </div>

          {/* Admin */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Admin
            </div>
            <div className="space-y-2">
              {admins.map(u => <UserButton key={u.id} u={u} />)}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          No real authentication — select any user to demo the app
        </p>
      </div>
    </div>
  )
}
