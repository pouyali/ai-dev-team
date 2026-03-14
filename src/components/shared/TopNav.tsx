'use client';

import React from 'react';
import { Heart, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { getInitials } from '../../utils/helpers';
import { UserRole } from '../../types';

/**
 * Navigation tab interface
 */
interface NavTab {
  id: string;
  label: string;
  path: string;
}

/**
 * Top navigation props
 */
interface TopNavProps {
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Top navigation bar component
 */
export default function TopNav({ tabs, activeTab, onTabChange }: TopNavProps): JSX.Element {
  const { currentUser, logout, switchRole } = useAuth();
  const { getUnreadCount } = useData();

  const unreadCount = currentUser ? getUnreadCount(currentUser.id) : 0;
  const initials = currentUser ? getInitials(currentUser.name) : '';

  const handleSwitchRole = (): void => {
    if (!currentUser) return;
    
    const targetRole: UserRole = currentUser.role === 'volunteer' ? 'senior' : 'volunteer';
    switchRole(targetRole);
  };

  const switchButtonLabel = currentUser?.role === 'volunteer' 
    ? 'Switch to Senior' 
    : currentUser?.role === 'senior' 
    ? 'Switch to Volunteer' 
    : null;

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-xl">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">VolunteerConnect</span>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            {switchButtonLabel && (
              <button
                onClick={handleSwitchRole}
                className="hidden sm:block px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {switchButtonLabel}
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
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{initials}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center space-x-1 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
