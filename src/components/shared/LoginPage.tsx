'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../utils/mockData';
import { User } from '../../types';

/**
 * Login page component with user selection dropdown
 * Groups users by role (Volunteers, Seniors, Admin)
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

  const renderUserOption = (user: User): JSX.Element => (
    <option key={user.id} value={user.id}>
      {user.name} ({user.email})
    </option>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
            <p className="text-gray-500 mt-2">Sign in to continue</p>
          </div>

          {/* User Selection */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="user-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select User
              </label>
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">Choose a user...</option>
                
                {volunteers.length > 0 && (
                  <optgroup label="Volunteers">
                    {volunteers.map(renderUserOption)}
                  </optgroup>
                )}
                
                {seniors.length > 0 && (
                  <optgroup label="Seniors">
                    {seniors.map(renderUserOption)}
                  </optgroup>
                )}
                
                {admins.length > 0 && (
                  <optgroup label="Admin">
                    {admins.map(renderUserOption)}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={!selectedUserId}
              className="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Demo application - select any user to continue
          </p>
        </div>
      </div>
    </div>
  );
}