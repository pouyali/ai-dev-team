'use client';

import React from 'react';
import TopBar from '../shared/TopBar';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the Admin Portal
 * Includes TopBar and main content area (no NavTabs - admin uses in-page tabs)
 */
export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const { switchRole } = useAuth();

  const handleSwitch = () => {
    switchRole('volunteer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Admin Panel"
        switchLabel="Switch to Volunteer"
        onSwitch={handleSwitch}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
