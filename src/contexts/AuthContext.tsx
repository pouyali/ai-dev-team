'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS: Record<string, User & { password: string }> = {
  'volunteer@test.com': {
    id: '1',
    email: 'volunteer@test.com',
    name: 'John Volunteer',
    role: 'volunteer',
    password: 'password123',
  },
  'senior@test.com': {
    id: '2',
    email: 'senior@test.com',
    name: 'Mary Senior',
    role: 'senior',
    password: 'password123',
  },
  'admin@test.com': {
    id: '3',
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'admin',
    password: 'password123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser = MOCK_USERS[email.toLowerCase()];
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback((): void => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
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
