'use client';

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Plus, FileText, User } from 'lucide-react';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';
import { useAuth } from '../../contexts/AuthContext';

interface SeniorLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the senior portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  const tabs = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Create Request', icon: Plus },
    { label: 'My Requests', icon: FileText },
    { label: 'Profile', icon: User },
  ];

  const handleSwitch = (): void => {
    switchRole('volunteer');
  };

  const handleTabChange = (label: string): void => {
    setActiveTab(label);
    // Update URL without page reload for better UX
    const tabSlug = label.toLowerCase().replace(' ', '-');
    window.history.pushState({}, '', `/senior/${tabSlug}`);
  };

  // Set initial tab based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('create-request')) setActiveTab('Create Request');
    else if (path.includes('my-requests')) setActiveTab('My Requests');
    else if (path.includes('profile')) setActiveTab('Profile');
    else setActiveTab('Dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Senior Portal"
        switchLabel="Switch to Volunteer"
        onSwitch={handleSwitch}
      />
      <NavTabs tabs={tabs} active={activeTab} onChange={handleTabChange} />
      <main className="p-6">{children}</main>
    </div>
  );
}
