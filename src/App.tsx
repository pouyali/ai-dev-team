'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { ToastProvider } from '@/components/ui/toast';

/**
 * Root App component with all providers
 * Routing is handled by Next.js App Router
 */
export default function App({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}
