'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: User[] = [
  {
    id: 'user-st',
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'volunteer',
    phone: '555-0201',
  },
  {
    id: 'user-jw',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'volunteer',
    phone: '555-0202',
  },
  {
    id: 'user-ms',
    name: 'Margaret Smith',
    email: 'margaret@example.com',
    role: 'senior',
    phone: '555-0101',
  },
  {
    id: 'user-rj',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'senior',
    phone: '555-0102',
  },
  {
    id: 'user-dw',
    name: 'Dorothy Williams',
    email: 'dorothy@example.com',
    role: 'senior',
    phone: '555-0103',
  },
  {
    id: 'user-ad',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((userId: string) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export mock users for use in login page
export { mockUsers };
