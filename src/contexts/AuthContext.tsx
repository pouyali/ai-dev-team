'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  mockUsers: User[];
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((userId: string): void => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = useCallback((): void => {
    setCurrentUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole): void => {
    // Find a user with the target role
    const targetUser = mockUsers.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    mockUsers,
    login,
    logout,
    switchRole
  };

  return (
    <AuthContext.Provider value={value}>
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
