'use client';

import React, { useState } from 'react';
import { Home, Calendar, Bell, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

const TABS = [
  { label: 'Requests', icon: Home },
  { label: 'Schedule', icon: Calendar },
  { label: 'Notifications', icon: Bell },
  { label: 'Reviews', icon: Star }
];

/**
 * Layout component for the volunteer portal
 * Includes TopBar with switch to senior, and navigation tabs
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const { switchRole, currentUser } = useAuth();
  const { notifications } = useData();
  const [activeTab, setActiveTab] = useState('Requests');

  const unreadCount = (notifications ?? []).filter(
    n => n.userId === currentUser?.id && !n.read
  ).length;

  // Only add badge to Notifications tab when unreadCount > 0
  const tabs = TABS.map(tab => 
    tab.label === 'Notifications' && unreadCount > 0
      ? { ...tab, badge: unreadCount }
      : tab
  );

  const handleSwitch = (): void => {
    switchRole('senior');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Volunteer Portal"
        switchLabel="Switch to Senior"
        onSwitch={handleSwitch}
      />
      <NavTabs
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
      />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
