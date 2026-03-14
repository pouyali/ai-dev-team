'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  volunteer: {
    id: 'v1',
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'volunteer',
    phone: '555-0101',
  },
  senior: {
    id: 's1',
    name: 'Margaret Smith',
    email: 'margaret@example.com',
    role: 'senior',
    phone: '555-0102',
  },
  admin: {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '555-0100',
  },
};

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(mockUsers.volunteer);

  const isAuthenticated = user !== null;

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<void> => {
    // Mock login - in real app would validate credentials
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(mockUsers[role]);
  }, []);

  const logout = useCallback((): void => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole): void => {
    setUser(mockUsers[role]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
