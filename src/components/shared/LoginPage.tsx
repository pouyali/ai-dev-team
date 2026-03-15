'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Heart, User, Shield, ChevronRight } from 'lucide-react'

const quickLoginUsers = [
  { role: 'Volunteer', name: 'Sarah Thompson', id: 'user-st' },
  { role: 'Senior', name: 'Margaret Smith', id: 'user-ms' },
  { role: 'Admin', name: 'Admin User', id: 'user-ad' },
]

const roleIcons: Record<string, React.ReactNode> = {
  Volunteer: <Heart className="w-5 h-5" />,
  Senior: <User className="w-5 h-5" />,
  Admin: <Shield className="w-5 h-5" />,
}

const roleColors: Record<string, string> = {
  Volunteer: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
  Senior: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
  Admin: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
}

export default function LoginPage(): JSX.Element {
  const { login } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleQuickLogin = (userId: string) => {
    setLoading(userId)
    login(userId)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">VC</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        {/* Quick Login */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Quick Login</h2>
            <p className="text-sm text-gray-500 mt-1">Select a demo account to get started</p>
          </div>

          <div className="space-y-3">
            {quickLoginUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => handleQuickLogin(u.id)}
                disabled={loading !== null}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                  roleColors[u.role]
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0">{roleIcons[u.role]}</span>
                  <div className="text-left">
                    <p className="font-medium text-sm">{u.name}</p>
                    <p className="text-xs opacity-70">{u.role}</p>
                  </div>
                </div>
                {loading === u.id ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Demo application — no real data is stored
        </p>
      </div>
    </div>
  )
}
