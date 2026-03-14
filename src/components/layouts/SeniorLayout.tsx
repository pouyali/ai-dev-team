'use client';

import React, { ReactNode, useState } from 'react';
import TopNav from '../shared/TopNav';

interface SeniorLayoutProps {
  children: ReactNode;
}

const seniorTabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/senior' },
  { id: 'my-requests', label: 'My Requests', href: '/senior/my-requests' },
  { id: 'new-request', label: 'New Request', href: '/senior/new-request' },
  { id: 'history', label: 'History', href: '/senior/history' },
];

/**
 * Layout component for senior portal pages
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={seniorTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}