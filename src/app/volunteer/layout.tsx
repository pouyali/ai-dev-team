'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Bell, Calendar, ClipboardList, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const navTabs = [
  { href: '/volunteer', label: 'Requests', icon: ClipboardList },
  { href: '/volunteer/schedule', label: 'Schedule', icon: Calendar },
  { href: '/volunteer/notifications', label: 'Notifications', icon: Bell },
  { href: '/volunteer/reviews', label: 'Reviews', icon: Star },
];

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const { user } = useAuth();
  const { getUnreadNotificationCount } = useData();
  const unreadCount = getUnreadNotificationCount();

  // Don't show layout for active task pages
  if (pathname.startsWith('/volunteer/active/')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Volunteer Portal</h1>
            {user && <p className="text-sm text-gray-500">Welcome, {user.name}</p>}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
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
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.label === 'Notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}
