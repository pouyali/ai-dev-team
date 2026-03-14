'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

type UserRole = 'volunteer' | 'senior' | 'admin';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  volunteer: {
    id: '1',
    name: 'Sarah Thompson',
    email: 'volunteer@example.com',
    role: 'volunteer',
    phone: '555-0101',
    address: '123 Main St, Springfield',
  },
  senior: {
    id: '2',
    name: 'Margaret Smith',
    email: 'senior@example.com',
    role: 'senior',
    phone: '555-0102',
    address: '456 Oak Avenue, Springfield',
  },
  admin: {
    id: '5',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '555-0100',
    address: '100 Admin Way, Springfield',
  },
};

/**
 * AuthProvider component - provides authentication state and methods
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;

  /**
   * Login with email, password, and role
   */
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any credentials and use the role to determine user
    const mockUser = mockUsers[role];
    if (mockUser) {
      setUser({ ...mockUser, email });
      return true;
    }
    return false;
  };

  /**
   * Logout current user
   */
  const logout = (): void => {
    setUser(null);
  };

  /**
   * Switch to a different role (for demo/testing)
   */
  const switchRole = (role: UserRole): void => {
    const mockUser = mockUsers[role];
    if (mockUser) {
      setUser(mockUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
