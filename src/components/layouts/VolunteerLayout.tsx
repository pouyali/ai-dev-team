'use client';

import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { ToastProvider } from '@/components/shared/ToastContainer';
import NavTabs from '@/components/shared/NavTabs';
import { Users, Home, Calendar, Bell, Star } from 'lucide-react';

interface VolunteerLayoutProps {
  children: ReactNode;
}

/**
 * Layout component for volunteer portal
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { user, switchRole } = useAuth();

  const tabs = [
    { id: 'requests', label: 'Requests', href: '/volunteer', icon: Home },
    { id: 'schedule', label: 'Schedule', href: '/volunteer/schedule', icon: Calendar },
    { id: 'notifications', label: 'Notifications', href: '/volunteer/notifications', icon: Bell, badge: 2 },
    { id: 'reviews', label: 'Reviews', href: '/volunteer/reviews', icon: Star },
  ];

  // Determine active tab from pathname
  const getActiveTab = (): string => {
    if (pathname === '/volunteer') return 'requests';
    if (pathname?.includes('/schedule')) return 'schedule';
    if (pathname?.includes('/notifications')) return 'notifications';
    if (pathname?.includes('/reviews')) return 'reviews';
    return 'requests';
  };

  const handleSwitchRole = (): void => {
    switchRole('senior');
    router.push('/senior');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DataProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo and title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-900">VolunteerConnect</h1>
                    <p className="text-sm text-gray-500">Volunteer Portal</p>
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSwitchRole}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Switch to Senior
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Navigation tabs */}
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
              <NavTabs tabs={tabs} activeTab={getActiveTab()} />
            </div>
          </nav>

          {/* Main content */}
          <main className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </ToastProvider>
    </DataProvider>
  );
}
