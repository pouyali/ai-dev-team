'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { ToastProvider } from '@/components/ui/toast';
import LoginPage from '@/components/shared/LoginPage';
import VolunteerLayout from '@/components/layouts/VolunteerLayout';
import SeniorLayout from '@/components/layouts/SeniorLayout';
import AdminLayout from '@/components/layouts/AdminLayout';
import VolunteerRequests from '@/components/volunteer/VolunteerRequests';
import VolunteerSchedule from '@/components/volunteer/VolunteerSchedule';
import VolunteerNotifications from '@/components/volunteer/VolunteerNotifications';
import VolunteerReviews from '@/components/volunteer/VolunteerReviews';
import ActiveTask from '@/components/volunteer/ActiveTask';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type VolunteerTab = 'requests' | 'schedule' | 'notifications' | 'reviews';

/**
 * Volunteer portal with all tabs
 */
function VolunteerPortal(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<VolunteerTab>('requests');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleNavigateToActiveTask = (requestId: string): void => {
    setActiveTaskId(requestId);
  };

  const handleBackFromActiveTask = (): void => {
    setActiveTaskId(null);
    setCurrentTab('requests');
  };

  if (activeTaskId) {
    return (
      <ActiveTask
        requestId={activeTaskId}
        onBack={handleBackFromActiveTask}
      />
    );
  }

  return (
    <VolunteerLayout currentTab={currentTab} onTabChange={setCurrentTab}>
      {currentTab === 'requests' && (
        <VolunteerRequests onNavigateToActiveTask={handleNavigateToActiveTask} />
      )}
      {currentTab === 'schedule' && <VolunteerSchedule />}
      {currentTab === 'notifications' && <VolunteerNotifications />}
      {currentTab === 'reviews' && <VolunteerReviews />}
    </VolunteerLayout>
  );
}

/**
 * Placeholder component for senior dashboard
 */
function SeniorDashboard(): JSX.Element {
  return (
    <SeniorLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600">Your dashboard content will appear here.</p>
      </div>
    </SeniorLayout>
  );
}

/**
 * Placeholder component for admin dashboard
 */
function AdminDashboard(): JSX.Element {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all volunteer requests and users</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Request
          </Button>
        </div>
        <p className="text-gray-500">Admin statistics and management tools will appear here.</p>
      </div>
    </AdminLayout>
  );
}

/**
 * Main app content that handles routing based on authentication and user role
 */
function AppContent(): JSX.Element {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case 'volunteer':
      return <VolunteerPortal />;
    case 'senior':
      return <SeniorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <LoginPage />;
  }
}

/**
 * Root App component with all providers
 */
export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}
