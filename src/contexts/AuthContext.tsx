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
    id: '1',
    name: 'Alice Volunteer',
    email: 'volunteer@example.com',
    role: 'volunteer',
    avatar: '/avatars/alice.jpg',
    phone: '555-0101',
  },
  {
    id: '2',
    name: 'Bob Senior',
    email: 'senior@example.com',
    role: 'senior',
    avatar: '/avatars/bob.jpg',
    phone: '555-0102',
  },
  {
    id: '3',
    name: 'Carol Admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/avatars/carol.jpg',
    phone: '555-0103',
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
