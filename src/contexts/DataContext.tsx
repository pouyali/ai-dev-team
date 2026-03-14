'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Request, User } from '@/types';
import { useAuth } from './AuthContext';

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'volunteer',
    phone: '555-0101',
    address: '123 Main St, Springfield',
  },
  {
    id: '2',
    name: 'Margaret Smith',
    email: 'margaret@example.com',
    role: 'senior',
    phone: '555-0102',
    address: '456 Oak Avenue, Springfield',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'senior',
    phone: '555-0103',
    address: '789 Medical Center Dr, Springfield',
  },
  {
    id: '4',
    name: 'Dorothy Williams',
    email: 'dorothy@example.com',
    role: 'senior',
    phone: '555-0104',
    address: '321 Elm Street, Springfield',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '555-0100',
    address: '100 Admin Way, Springfield',
  },
];

// Mock data for requests
const mockRequests: Request[] = [
  {
    id: '1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'Shopping',
    priority: 'medium',
    status: 'pending',
    seniorId: '2',
    scheduledDate: '2025-11-09T10:00:00',
    duration: '1-2 hours',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2025-01-06T08:00:00',
  },
  {
    id: '2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    seniorId: '3',
    scheduledDate: '2025-11-10T14:00:00',
    duration: '2-3 hours',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2025-01-06T09:00:00',
  },
  {
    id: '3',
    title: 'Help setting up new phone',
    description: 'Need help setting up my new smartphone and transferring contacts.',
    category: 'Technology',
    priority: 'low',
    status: 'accepted',
    seniorId: '4',
    volunteerId: '1',
    scheduledDate: '2025-11-11T11:00:00',
    duration: '1 hour',
    address: '321 Elm Street, Springfield',
    createdAt: '2025-01-05T10:00:00',
  },
  {
    id: '4',
    title: 'Yard work assistance',
    description: 'Need help with raking leaves and basic yard cleanup.',
    category: 'Home Help',
    priority: 'medium',
    status: 'completed',
    seniorId: '2',
    volunteerId: '1',
    scheduledDate: '2025-11-05T09:00:00',
    duration: '2-3 hours',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2025-01-04T08:00:00',
    completedAt: '2025-01-05T12:00:00',
  },
];

interface DataContextType {
  requests: Request[];
  users: User[];
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  startTask: (requestId: string) => void;
  completeTask: (requestId: string, notes?: string) => void;
  cancelTask: (requestId: string, reason: string) => void;
  createRequest: (request: Omit<Request, 'id' | 'createdAt' | 'status'>) => void;
  updateRequest: (requestId: string, updates: Partial<Request>) => void;
  deleteRequest: (requestId: string) => void;
  getRequestById: (requestId: string) => Request | undefined;
  getUserById: (userId: string) => User | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * Hook to access data context
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
}

/**
 * DataProvider component - provides request and user data management
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [users] = useState<User[]>(mockUsers);

  /**
   * Accept a request (volunteer assigns themselves)
   */
  const acceptRequest = (requestId: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'accepted' as const, volunteerId: user?.id }
          : req
      )
    );
  };

  /**
   * Decline a request
   */
  const declineRequest = (requestId: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'pending' as const, volunteerId: undefined }
          : req
      )
    );
  };

  /**
   * Start a task
   */
  const startTask = (requestId: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'started' as const }
          : req
      )
    );
  };

  /**
   * Complete a task
   */
  const completeTask = (requestId: string, notes?: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'completed' as const,
              completedAt: new Date().toISOString(),
              completionNotes: notes,
            }
          : req
      )
    );
  };

  /**
   * Cancel a task
   */
  const cancelTask = (requestId: string, reason: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'cancelled' as const,
              cancellationReason: reason,
            }
          : req
      )
    );
  };

  /**
   * Create a new request
   */
  const createRequest = (request: Omit<Request, 'id' | 'createdAt' | 'status'>): void => {
    const newRequest: Request = {
      ...request,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRequests(prev => [...prev, newRequest]);
  };

  /**
   * Update a request
   */
  const updateRequest = (requestId: string, updates: Partial<Request>): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, ...updates } : req
      )
    );
  };

  /**
   * Delete a request
   */
  const deleteRequest = (requestId: string): void => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  /**
   * Get request by ID
   */
  const getRequestById = (requestId: string): Request | undefined => {
    return requests.find(req => req.id === requestId);
  };

  /**
   * Get user by ID
   */
  const getUserById = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
  };

  const value: DataContextType = {
    requests,
    users,
    acceptRequest,
    declineRequest,
    startTask,
    completeTask,
    cancelTask,
    createRequest,
    updateRequest,
    deleteRequest,
    getRequestById,
    getUserById,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
