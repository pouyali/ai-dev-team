'use client';

import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, List, User } from 'lucide-react';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';
import { useAuth } from '../../contexts/AuthContext';

interface SeniorLayoutProps {
  children: React.ReactNode;
}

const SENIOR_TABS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Create Request', icon: PlusCircle },
  { label: 'My Requests', icon: List },
  { label: 'Profile', icon: User }
];

/**
 * Layout component for the Senior Portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleSwitch = () => {
    switchRole('volunteer');
  };

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    // Update URL without page reload for client-side navigation
    if (typeof window !== 'undefined') {
      const path = `/senior/${label.toLowerCase().replace(/\s+/g, '-')}`;
      window.history.pushState({}, '', path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Senior Portal"
        switchLabel="Switch to Volunteer"
        onSwitch={handleSwitch}
      />
      <NavTabs
        tabs={SENIOR_TABS}
        active={activeTab}
        onChange={handleTabChange}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
