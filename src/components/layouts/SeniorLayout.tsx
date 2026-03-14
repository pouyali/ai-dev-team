'use client';

import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, FileText, UserCircle } from 'lucide-react';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';
import { useAuth } from '../../contexts/AuthContext';

interface SeniorLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the Senior Portal
 * Includes TopBar, NavTabs with Dashboard, Create Request, My Requests, Profile
 */
export default function SeniorLayout({ children }: SeniorLayoutProps): JSX.Element {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Create Request', icon: PlusCircle },
    { label: 'My Requests', icon: FileText },
    { label: 'Profile', icon: UserCircle }
  ];

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
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
      />
      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}
