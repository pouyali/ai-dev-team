'use client';

import React from 'react';
import TopBar from '../shared/TopBar';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the Admin Panel
 * Includes TopBar only (admin uses tabs inside the page content)
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
      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}
