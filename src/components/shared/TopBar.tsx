'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  portalName: string;
  switchLabel: string;
  onSwitch: () => void;
}

/**
 * Top navigation bar component used across all portals
 * Displays logo, portal name, switch button, and user avatar
 */
export default function TopBar({ portalName, switchLabel, onSwitch }: TopBarProps): JSX.Element {
  const { currentUser } = useAuth();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Logo and portal name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg">VolunteerConnect</span>
            <span className="text-sm text-gray-500">{portalName}</span>
          </div>
        </div>

        {/* Right side - Switch button and avatar */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onSwitch}
          >
            {switchLabel}
          </Button>
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {currentUser ? getInitials(currentUser.name) : 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
