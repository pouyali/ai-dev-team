'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Volunteer',
    email: 'volunteer@example.com',
    role: 'volunteer',
    phone: '555-0101',
    avatar: '',
  },
  {
    id: '2',
    name: 'Mary Senior',
    email: 'senior@example.com',
    role: 'senior',
    phone: '555-0102',
    address: '123 Main St',
    avatar: '',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '555-0103',
    avatar: '',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by email, or use role to determine which mock user to use
    let foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // If no user found by email but role is provided, use the first user with that role
    if (!foundUser && role) {
      foundUser = mockUsers.find(u => u.role === role);
    }
    
    // For demo purposes, accept any password
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
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
