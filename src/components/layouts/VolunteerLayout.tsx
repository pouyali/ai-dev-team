'use client';

import React, { ReactNode, useState } from 'react';
import TopNav from '../shared/TopNav';

interface VolunteerLayoutProps {
  children: ReactNode;
}

const volunteerTabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/volunteer' },
  { id: 'available', label: 'Available Requests', href: '/volunteer/available' },
  { id: 'my-tasks', label: 'My Tasks', href: '/volunteer/my-tasks' },
  { id: 'history', label: 'History', href: '/volunteer/history' },
];

/**
 * Layout component for volunteer portal pages
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={volunteerTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}