'use client';

import React from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import LoginPage from '@/components/shared/LoginPage';
import VolunteerLayout from '@/components/layouts/VolunteerLayout';
import SeniorLayout from '@/components/layouts/SeniorLayout';
import AdminLayout from '@/components/layouts/AdminLayout';

/**
 * Placeholder component for volunteer dashboard
 */
function VolunteerDashboard(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Requests</h1>
        <p className="text-gray-600">Review and respond to volunteer opportunities</p>
      </div>
      <p className="text-gray-500">Request cards will be displayed here in the next phase.</p>
    </div>
  );
}

/**
 * Placeholder component for senior dashboard
 */
function SeniorDashboard(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
      <p className="text-gray-600">Your dashboard content will appear here.</p>
    </div>
  );
}

/**
 * Placeholder component for admin dashboard
 */
function AdminDashboard(): JSX.Element {
  return (
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
  );
}

/**
 * Main app content that handles routing based on authentication and user role
 */
function AppContent(): JSX.Element {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case 'volunteer':
      return (
        <VolunteerLayout>
          <VolunteerDashboard />
        </VolunteerLayout>
      );
    case 'senior':
      return (
        <SeniorLayout>
          <SeniorDashboard />
        </SeniorLayout>
      );
    case 'admin':
      return (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      );
    default:
      return <LoginPage />;
  }
}

/**
 * Root App component with providers
 */
export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
