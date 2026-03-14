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

/**
 * Layout component for the volunteer portal
 * Includes TopBar, NavTabs, and main content area
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps): JSX.Element {
  const { switchRole, currentUser } = useAuth();
  const { notifications } = useData();
  const [activeTab, setActiveTab] = useState<string>('Requests');

  // Count unread notifications for the current user
  const unreadCount = notifications.filter(
    (n) => n.userId === currentUser?.id && !n.read
  ).length;

  const tabs = [
    { label: 'Requests', icon: Home },
    { label: 'Schedule', icon: Calendar },
    { label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { label: 'Reviews', icon: Star },
  ];

  const handleSwitch = (): void => {
    switchRole('senior');
  };

  const handleTabChange = (label: string): void => {
    setActiveTab(label);
    // Update URL without page reload for better UX
    const tabSlug = label.toLowerCase().replace(' ', '-');
    window.history.pushState({}, '', `/volunteer/${tabSlug}`);
  };

  // Set initial tab based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('schedule')) setActiveTab('Schedule');
    else if (path.includes('notifications')) setActiveTab('Notifications');
    else if (path.includes('reviews')) setActiveTab('Reviews');
    else setActiveTab('Requests');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Volunteer Portal"
        switchLabel="Switch to Senior"
        onSwitch={handleSwitch}
      />
      <NavTabs tabs={tabs} active={activeTab} onChange={handleTabChange} />
      <main className="p-6">{children}</main>
    </div>
  );
}
