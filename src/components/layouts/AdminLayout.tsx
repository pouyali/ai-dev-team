'use client';

import React from 'react';
import TopBar from '../shared/TopBar';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin portal
 * Includes TopBar only (tabs are inside the page content)
 */
export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const { switchRole } = useAuth();

  const handleSwitch = (): void => {
    switchRole('volunteer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Admin Panel"
        switchLabel="Switch to Volunteer"
        onSwitch={handleSwitch}
      />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
