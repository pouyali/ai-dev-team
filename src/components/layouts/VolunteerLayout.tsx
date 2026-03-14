'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/shared/TopBar';
import { Home, Calendar, User, Settings } from 'lucide-react';

interface VolunteerLayoutProps {
  children: ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'My Schedule', href: '/schedule' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          {user && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          )}
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
