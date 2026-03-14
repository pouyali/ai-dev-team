'use client';

import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function LoginPage(): JSX.Element {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password, selectedRole);
    
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    setError('');
    const emails: Record<UserRole, string> = {
      volunteer: 'volunteer@example.com',
      senior: 'senior@example.com',
      admin: 'admin@example.com',
    };
    
    const success = await login(emails[role], 'demo', role);
    
    if (!success) {
      setError('Quick login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            VolunteerConnect
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as:
            </label>
            <div className="flex space-x-4">
              {(['volunteer', 'senior', 'admin'] as UserRole[]).map((role) => (
                <label key={role} className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Quick Demo Login</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('volunteer')}
              disabled={isLoading}
            >
              Volunteer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('senior')}
              disabled={isLoading}
            >
              Senior
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin('admin')}
              disabled={isLoading}
            >
              Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
