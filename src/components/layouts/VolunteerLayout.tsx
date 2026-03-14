'use client';

import React, { useState, useEffect } from 'react';
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
  { label: 'Reviews', icon: Star }
];

/**
 * Layout component for the Volunteer Portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const { switchRole, currentUser } = useAuth();
  const { notifications } = useData();
  const [activeTab, setActiveTab] = useState('Requests');

  // Calculate unread notifications count
  const unreadCount = notifications.filter(
    n => !n.read && n.userId === currentUser?.id
  ).length;

  // Update tabs with notification badge
  const tabsWithBadge = VOLUNTEER_TABS.map(tab => {
    if (tab.label === 'Notifications') {
      return { ...tab, badge: unreadCount };
    }
    return tab;
  });

  const handleSwitch = () => {
    switchRole('senior');
  };

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    // Update URL without page reload for client-side navigation
    if (typeof window !== 'undefined') {
      const path = `/volunteer/${label.toLowerCase().replace(/\s+/g, '-')}`;
      window.history.pushState({}, '', path);
    }
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
        onChange={handleTabChange}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
