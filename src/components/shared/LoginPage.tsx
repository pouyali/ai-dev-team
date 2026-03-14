'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../utils/mockData';

/**
 * Login page component with user selection dropdown
 */
export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const volunteers = mockUsers.filter((u) => u.role === 'volunteer');
  const seniors = mockUsers.filter((u) => u.role === 'senior');
  const admins = mockUsers.filter((u) => u.role === 'admin');

  const handleLogin = (): void => {
    if (selectedUserId) {
      login(selectedUserId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-500 mt-2">Connecting volunteers with seniors who need assistance</p>
        </div>

        {/* User Selection */}
        <div className="space-y-4">
          <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
            Select a user to continue
          </label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          >
            <option value="">Choose a user...</option>
            <optgroup label="Volunteers">
              {volunteers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Seniors">
              {seniors.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Admins">
              {admins.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedUserId}
            className="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          This is a demo application. Select any user to explore.
        </p>
      </div>
    </div>
  );
}
