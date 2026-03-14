'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((role: UserRole): void => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = useCallback((): void => {
    setCurrentUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole): void => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    logout,
    switchRole,
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
