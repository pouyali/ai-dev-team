'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers } from '@/utils/mockData';
import { Heart } from 'lucide-react';

const quickLoginUsers = [
  { role: 'Volunteer', name: 'Sarah Thompson', id: 'user-st' },
  { role: 'Senior', name: 'Margaret Smith', id: 'user-ms' },
  { role: 'Admin', name: 'Admin User', id: 'user-ad' },
]

export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        setError('Invalid email or password');
        return;
      }
      await login(email, password);
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setIsLoading(true);
      try {
        await login(user.email, 'password');
      } catch {
        setError('Quick login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-1">Connecting volunteers with seniors</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Login Section */}
        <div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Quick Login (Demo)</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {quickLoginUsers.map(u => (
              <button
                key={u.id}
                onClick={() => handleQuickLogin(u.id)}
                disabled={isLoading}
                className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-xs font-medium text-blue-600">{u.role}</span>
                <span className="text-xs text-gray-500 text-center mt-1 leading-tight">{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
