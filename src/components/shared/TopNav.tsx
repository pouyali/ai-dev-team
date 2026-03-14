'use client';

import React from 'react';
import { Heart, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { getInitials } from '../../utils/helpers';
import { UserRole } from '../../types';

interface TopNavProps {
  activeTab?: string;
  tabs?: { id: string; label: string; href: string }[];
  onTabChange?: (tabId: string) => void;
}

/**
 * Top navigation bar component with logo, tabs, role switcher, and user avatar
 */
export default function TopNav({ activeTab, tabs, onTabChange }: TopNavProps): JSX.Element {
  const { currentUser, logout, switchRole } = useAuth();
  const { getUnreadCount } = useData();

  const unreadCount = currentUser ? getUnreadCount(currentUser.id) : 0;

  const handleRoleSwitch = (role: UserRole): void => {
    switchRole(role);
  };

  const getAlternateRole = (): { role: UserRole; label: string } | null => {
    if (!currentUser) return null;
    if (currentUser.role === 'volunteer') {
      return { role: 'senior', label: 'Switch to Senior' };
    }
    if (currentUser.role === 'senior') {
      return { role: 'volunteer', label: 'Switch to Volunteer' };
    }
    return null;
  };

  const alternateRole = getAlternateRole();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-xl">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">VolunteerConnect</span>
          </div>

          {/* Navigation Tabs */}
          {tabs && tabs.length > 0 && (
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            {alternateRole && (
              <button
                onClick={() => handleRoleSwitch(alternateRole.role)}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {alternateRole.label}
              </button>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            {currentUser && (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {getInitials(currentUser.name)}
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}