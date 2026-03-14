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

/**
 * Layout component for the Volunteer Portal
 * Includes TopBar, NavTabs with Requests, Schedule, Notifications, Reviews
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const { switchRole } = useAuth();
  const { notifications } = useData();
  const [activeTab, setActiveTab] = useState('Requests');

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { label: 'Requests', icon: Home },
    { label: 'Schedule', icon: Calendar },
    { label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { label: 'Reviews', icon: Star }
  ];

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
      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}
