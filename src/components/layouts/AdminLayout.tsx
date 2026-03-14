'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '../shared/TopBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin portal
 * Includes TopBar only (admin uses tabs inside the page)
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
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
