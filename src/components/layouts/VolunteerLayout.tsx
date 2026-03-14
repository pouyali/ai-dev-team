'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Home, Calendar, Bell, Star } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/ui/button';

interface VolunteerLayoutProps {
  children: React.ReactNode;
  currentTab: 'requests' | 'schedule' | 'notifications' | 'reviews';
  onTabChange: (tab: 'requests' | 'schedule' | 'notifications' | 'reviews') => void;
}

export default function VolunteerLayout({ children, currentTab, onTabChange }: VolunteerLayoutProps): JSX.Element {
  const { user, switchRole } = useAuth();
  const { getUnreadNotificationCount } = useData();
  const unreadCount = getUnreadNotificationCount();

  const tabs = [
    { id: 'requests' as const, label: 'Requests', icon: Home },
    { id: 'schedule' as const, label: 'Schedule', icon: Calendar },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'reviews' as const, label: 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">VolunteerConnect</h1>
              <p className="text-sm text-gray-500">Volunteer Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => switchRole('senior')}>
              Switch to Senior
            </Button>
            <Avatar name={user?.name || 'User'} size="sm" />
          </div>
        </div>
      </header>

      {/* Nav Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-gray-900 text-gray-900 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
