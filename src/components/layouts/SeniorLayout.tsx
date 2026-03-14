'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import TopNav from '../shared/TopNav';

/**
 * Senior layout props
 */
interface SeniorLayoutProps {
  children: ReactNode;
}

/**
 * Navigation tabs for senior portal
 */
const seniorTabs = [
  { id: 'dashboard', label: 'Dashboard', path: '/senior' },
  { id: 'new-request', label: 'New Request', path: '/senior/new-request' },
  { id: 'my-requests', label: 'My Requests', path: '/senior/my-requests' },
  { id: 'history', label: 'History', path: '/senior/history' },
  { id: 'profile', label: 'Profile', path: '/senior/profile' },
];

/**
 * Get active tab from current path
 */
function getActiveTabFromPath(path: string): string {
  if (path.includes('/new-request')) return 'new-request';
  if (path.includes('/my-requests')) return 'my-requests';
  if (path.includes('/history')) return 'history';
  if (path.includes('/profile')) return 'profile';
  return 'dashboard';
}

/**
 * Senior layout component with navigation
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
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
    const tab = seniorTabs.find(t => t.id === tabId);
    if (tab && typeof window !== 'undefined') {
      window.history.pushState({}, '', tab.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav tabs={seniorTabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
