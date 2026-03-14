import React from 'react';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { ToastProvider } from '@/components/ui/toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'VolunteerConnect',
  description: 'Connect volunteers with seniors in need',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DataProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
