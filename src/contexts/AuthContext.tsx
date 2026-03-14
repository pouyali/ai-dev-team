'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../utils/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that manages authentication state
 * Provides login, logout, and role switching functionality
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /**
   * Log in a user by their ID
   * @param userId - The ID of the user to log in
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
   * @param role - The role to switch to
   */
  const switchRole = useCallback((role: UserRole): void => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    switchRole,
    isAuthenticated: currentUser !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access the auth context
 * @returns AuthContextType
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}