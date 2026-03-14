'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/shared/TopBar';
import { Home, PlusCircle, Clock, User, Settings } from 'lucide-react';

interface SeniorLayoutProps {
  children: ReactNode;
}

export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', href: '/home' },
    { icon: PlusCircle, label: 'New Request', href: '/new-request' },
    { icon: Clock, label: 'My Requests', href: '/requests' },
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
              <Link
                key={item.label}
                href={item.href}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-lg"
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          {user && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="text-base font-medium text-gray-900">{user.name}</p>
            </div>
          )}
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
