'use client';

import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './components/shared/LoginPage';
import VolunteerLayout from './components/layouts/VolunteerLayout';
import SeniorLayout from './components/layouts/SeniorLayout';
import AdminLayout from './components/layouts/AdminLayout';

/**
 * Placeholder component for volunteer dashboard
 */
function VolunteerDashboard(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Volunteer Dashboard</h1>
      <p className="text-gray-600">Welcome to the volunteer portal. Dashboard content coming in Phase 2.</p>
    </div>
  );
}

/**
 * Placeholder component for senior dashboard
 */
function SeniorDashboard(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Senior Dashboard</h1>
      <p className="text-gray-600">Welcome to the senior portal. Dashboard content coming in Phase 2.</p>
    </div>
  );
}

/**
 * Placeholder component for admin dashboard
 */
function AdminDashboard(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome to the admin portal. Dashboard content coming in Phase 2.</p>
    </div>
  );
}

/**
 * Main app content that handles routing based on authentication and user role
 */
function AppContent(): JSX.Element {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <LoginPage />;
  }

  switch (currentUser.role) {
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