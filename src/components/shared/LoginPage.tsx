'use client';

import React, { useState } from 'react';
import { Users, Shield, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

/**
 * Login page component for role selection
 */
export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (role: UserRole): Promise<void> => {
    setIsLoading(true);
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));
    login(role);
    setIsLoading(false);
  };

  const roleCards = [
    {
      role: 'volunteer' as UserRole,
      title: 'Volunteer',
      description: 'Help seniors in your community with everyday tasks',
      icon: Heart,
      color: 'bg-blue-500'
    },
    {
      role: 'senior' as UserRole,
      title: 'Senior',
      description: 'Request help from caring volunteers nearby',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin',
      description: 'Manage users, requests, and platform settings',
      icon: Shield,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VolunteerConnect</h1>
        <p className="text-gray-600">Connecting volunteers with seniors who need assistance</p>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Select your role to continue</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.role}
                onClick={() => handleLogin(card.role)}
                disabled={isLoading}
                className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
