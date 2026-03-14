'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Plus, FileText, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';

interface SeniorLayoutProps {
  children: React.ReactNode;
}

const TABS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Create Request', icon: Plus },
  { label: 'My Requests', icon: FileText },
  { label: 'Profile', icon: User }
];

/**
 * Layout component for the senior portal
 * Includes TopBar with switch to volunteer, and navigation tabs
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleSwitch = (): void => {
    switchRole('volunteer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Senior Portal"
        switchLabel="Switch to Volunteer"
        onSwitch={handleSwitch}
      />
      <NavTabs
        tabs={TABS}
        active={activeTab}
        onChange={setActiveTab}
      />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
