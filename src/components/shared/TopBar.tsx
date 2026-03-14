'use client';

import React from 'react';
import { Shield, Users, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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

  const getPortalIcon = () => {
    switch (portalName) {
      case 'Admin Panel':
        return <Shield className="w-5 h-5 text-white" />;
      case 'Volunteer Portal':
        return <Users className="w-5 h-5 text-white" />;
      case 'Senior Portal':
        return <Heart className="w-5 h-5 text-white" />;
      default:
        return <Shield className="w-5 h-5 text-white" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Portal Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              {getPortalIcon()}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">VolunteerConnect</h1>
              <p className="text-sm text-gray-500">{portalName}</p>
            </div>
          </div>

          {/* Right: Switch Button and Avatar */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSwitch}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {switchLabel}
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {currentUser ? getInitials(currentUser.name) : 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
