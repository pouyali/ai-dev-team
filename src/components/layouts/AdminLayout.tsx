'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '../shared/TopBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin portal
 * Includes TopBar only (no tabs - admin uses tabs inside the page)
 * Note: Admin role users can switch to volunteer view but retain admin access
 * The switch is stored in session, allowing return to admin panel via direct navigation
 */
export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const { switchRole } = useAuth();

  const handleSwitch = (): void => {
    // Switch to volunteer view - admin can return via /admin route
    // The user's actual role (admin) is preserved, only the active view changes
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
