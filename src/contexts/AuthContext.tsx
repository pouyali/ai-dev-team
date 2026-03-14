'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../utils/mockData';

/**
 * Auth context interface
 */
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

/**
 * Auth context with default values
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth provider component that manages authentication state
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /**
   * Log in a user by their ID
   */
  const login = useCallback((userId: string): void => {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  /**
   * Log out the current user
   */
  const logout = useCallback((): void => {
    setCurrentUser(null);
  }, []);

  /**
   * Switch to the first user of a given role
   */
  const switchRole = useCallback((role: UserRole): void => {
    const user = mockUsers.find((u) => u.role === role);
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

/**
 * Hook to use the auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
