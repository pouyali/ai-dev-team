'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Bell, Calendar, ClipboardList, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/ui/button';

const navTabs = [
  { href: '/volunteer', label: 'Requests', icon: ClipboardList },
  { href: '/volunteer/schedule', label: 'Schedule', icon: Calendar },
  { href: '/volunteer/notifications', label: 'Notifications', icon: Bell },
  { href: '/volunteer/reviews', label: 'Reviews', icon: Star },
];

export default function VolunteerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const { user, switchRole } = useAuth();
  const { getUnreadNotificationCount } = useData();
  const unreadCount = getUnreadNotificationCount();

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

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            {navTabs.map(tab => {
              const isActive = tab.href === '/volunteer' 
                ? pathname === '/volunteer'
                : pathname.startsWith(tab.href);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                    isActive
                      ? 'border-gray-900 text-gray-900 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {tab.label === 'Notifications' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">{tab.label}</span>
                </Link>
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
