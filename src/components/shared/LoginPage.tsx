'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';

/**
 * Login page component for selecting a user to login as
 * Displays available mock users for demo purposes
 */
export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleLogin = (): void => {
    if (selectedUserId) {
      login(selectedUserId);
    }
  };

  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case 'volunteer':
        return 'bg-blue-100 text-blue-700';
      case 'senior':
        return 'bg-green-100 text-green-700';
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-2">Select a user to continue</p>
        </div>

        <div className="space-y-3 mb-6">
          {mockUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                selectedUserId === user.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-600">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleLogin}
          disabled={!selectedUserId}
          className="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
