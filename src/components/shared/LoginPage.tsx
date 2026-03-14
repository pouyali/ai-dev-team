'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const quickLoginUsers = [
  { role: 'Volunteer', name: 'Sarah Thompson', id: 'user-st' },
  { role: 'Senior', name: 'Margaret Smith', id: 'user-ms' },
  { role: 'Admin', name: 'Admin User', id: 'user-ad' },
];

export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const router = useRouter();

  const handleQuickLogin = (userId: string, role: string) => {
    login(userId);
    if (role === 'Volunteer') {
      router.push('/volunteer');
    } else if (role === 'Senior') {
      router.push('/senior');
    } else if (role === 'Admin') {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-sm font-bold">VC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Login</p>
          {quickLoginUsers.map(u => (
            <button
              key={u.id}
              onClick={() => handleQuickLogin(u.id, u.role)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
            >
              <div>
                <div className="font-medium text-gray-900 text-sm">{u.name}</div>
                <div className="text-xs text-gray-500">{u.role}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                {u.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
