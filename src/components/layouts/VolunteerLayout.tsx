'use client';

import React, { useState } from 'react';
import { Home, Calendar, Bell, Star } from 'lucide-react';
import TopBar from '../shared/TopBar';
import NavTabs from '../shared/NavTabs';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

const VOLUNTEER_TABS = [
  { label: 'Requests', icon: Home },
  { label: 'Schedule', icon: Calendar },
  { label: 'Notifications', icon: Bell, badge: 0 },
  { label: 'Reviews', icon: Star },
];

/**
 * Layout component for the volunteer portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Requests');
  const { switchRole } = useAuth();
  const { notifications } = useData();

  // Calculate unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Update tabs with dynamic notification badge
  const tabsWithBadge = VOLUNTEER_TABS.map(tab => {
    if (tab.label === 'Notifications') {
      return { ...tab, badge: unreadCount };
    }
    return tab;
  });

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
        tabs={tabsWithBadge}
        active={activeTab}
        onChange={setActiveTab}
      />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
