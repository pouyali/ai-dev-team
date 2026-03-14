'use client';

import React, { ReactNode, useState } from 'react';
import TopNav from '../shared/TopNav';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminTabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin' },
  { id: 'users', label: 'Users', href: '/admin/users' },
  { id: 'requests', label: 'All Requests', href: '/admin/requests' },
  { id: 'reports', label: 'Reports', href: '/admin/reports' },
];

/**
 * Layout component for admin portal pages
 */
export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={adminTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}