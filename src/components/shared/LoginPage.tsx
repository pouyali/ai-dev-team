'use client';

import React, { useState } from 'react';
import { Users, Heart, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

/**
 * Login page component for selecting user role
 */
export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles: { role: UserRole; icon: React.ReactNode; title: string; description: string }[] = [
    {
      role: 'volunteer',
      icon: <Users className="w-8 h-8" />,
      title: 'Volunteer',
      description: 'Help seniors in your community with everyday tasks'
    },
    {
      role: 'senior',
      icon: <Heart className="w-8 h-8" />,
      title: 'Senior',
      description: 'Request assistance from caring volunteers'
    },
    {
      role: 'admin',
      icon: <Shield className="w-8 h-8" />,
      title: 'Administrator',
      description: 'Manage volunteers, seniors, and requests'
    }
  ];

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VolunteerConnect</h1>
          <p className="text-gray-600 mt-2">Connecting volunteers with seniors who need assistance</p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select your role</h2>
          <div className="space-y-3">
            {roles.map(({ role, icon, title, description }) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full flex items-start p-4 rounded-lg border-2 transition-all text-left ${
                  selectedRole === role
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-2 rounded-lg mr-4 ${
                  selectedRole === role ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedRole
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue as {selectedRole ? roles.find(r => r.role === selectedRole)?.title : '...'}
          </button>
        </div>
      </div>
    </div>
  );
}
