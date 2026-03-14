'use client';

import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, FileText, User } from 'lucide-react';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';
import { useAuth } from '../../contexts/AuthContext';

interface SeniorLayoutProps {
  children: React.ReactNode;
}

const SENIOR_TABS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Create Request', icon: PlusCircle },
  { label: 'My Requests', icon: FileText },
  { label: 'Profile', icon: User },
];

/**
 * Layout component for the senior portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { switchRole } = useAuth();

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
        tabs={SENIOR_TABS}
        active={activeTab}
        onChange={setActiveTab}
      />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
