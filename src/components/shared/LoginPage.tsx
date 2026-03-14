'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';

export default function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    await login('user@example.com', 'password', selectedRole);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">VolunteerConnect</h1>
        <p className="text-gray-600 text-center mb-8">Select a role to continue</p>
        
        <div className="space-y-3 mb-6">
          {(['volunteer', 'senior', 'admin'] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                selectedRole === role
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium capitalize">{role}</span>
            </button>
          ))}
        </div>

        <Button onClick={handleLogin} disabled={isLoading} className="w-full">
          {isLoading ? 'Logging in...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
