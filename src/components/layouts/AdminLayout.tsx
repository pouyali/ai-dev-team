'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import TopNav from '../shared/TopNav';

/**
 * Admin layout props
 */
interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Navigation tabs for admin portal
 */
const adminTabs = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin' },
  { id: 'users', label: 'Users', path: '/admin/users' },
  { id: 'requests', label: 'All Requests', path: '/admin/requests' },
  { id: 'reports', label: 'Reports', path: '/admin/reports' },
  { id: 'settings', label: 'Settings', path: '/admin/settings' },
];

/**
 * Get active tab from current path
 */
function getActiveTabFromPath(path: string): string {
  if (path.includes('/users')) return 'users';
  if (path.includes('/requests')) return 'requests';
  if (path.includes('/reports')) return 'reports';
  if (path.includes('/settings')) return 'settings';
  return 'dashboard';
}

/**
 * Admin layout component with navigation
 */
export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
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
    const tab = adminTabs.find(t => t.id === tabId);
    if (tab && typeof window !== 'undefined') {
      window.history.pushState({}, '', tab.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={adminTabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
