'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import TopNav from '../shared/TopNav';

/**
 * Volunteer layout props
 */
interface VolunteerLayoutProps {
  children: ReactNode;
}

/**
 * Navigation tabs for volunteer portal
 */
const volunteerTabs = [
  { id: 'dashboard', label: 'Dashboard', path: '/volunteer' },
  { id: 'requests', label: 'Available Requests', path: '/volunteer/requests' },
  { id: 'my-tasks', label: 'My Tasks', path: '/volunteer/my-tasks' },
  { id: 'history', label: 'History', path: '/volunteer/history' },
  { id: 'profile', label: 'Profile', path: '/volunteer/profile' },
];

/**
 * Get active tab from current path
 */
function getActiveTabFromPath(path: string): string {
  if (path.includes('/requests')) return 'requests';
  if (path.includes('/my-tasks')) return 'my-tasks';
  if (path.includes('/history')) return 'history';
  if (path.includes('/profile')) return 'profile';
  return 'dashboard';
}

/**
 * Volunteer layout component with navigation
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // In a real app with react-router, we would use useLocation here
    // For now, derive from window.location if available
    if (typeof window !== 'undefined') {
      setActiveTab(getActiveTabFromPath(window.location.pathname));
    }
  }, []);

  const handleTabChange = (tabId: string): void => {
    setActiveTab(tabId);
    // In a real app with react-router, we would use navigate here
    const tab = volunteerTabs.find(t => t.id === tabId);
    if (tab && typeof window !== 'undefined') {
      window.history.pushState({}, '', tab.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={volunteerTabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
