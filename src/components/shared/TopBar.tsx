'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface TopBarProps {
  portalName: string;
  switchLabel: string;
  onSwitch: () => void;
}

/**
 * Top navigation bar component used by all portals
 * Displays logo, portal name, switch button, and user initials
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

  const initials = currentUser ? getInitials(currentUser.name) : 'U';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Logo and portal name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          <div>
            <h1 className="text-lg font-bold text-gray-900">VolunteerConnect</h1>
            <p className="text-sm text-gray-500">{portalName}</p>
          </div>
        </div>

        {/* Right side - Switch button and user avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitch}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {switchLabel}
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
