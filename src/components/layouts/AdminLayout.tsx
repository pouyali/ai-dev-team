'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/shared/TopBar';
import { Home, Users, FileText, BarChart3, Settings, Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: FileText, label: 'All Requests', href: '/admin/requests' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Shield, label: 'Moderation', href: '/admin/moderation' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Admin Panel</span>
            </div>
          </div>
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
              <p className="text-sm text-gray-500">Admin</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          )}
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
