'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Request, Notification, Review } from '../types';
import { mockRequests, mockNotifications, mockReviews } from '../data/mockData';

interface DataContextType {
  requests: Request[];
  notifications: Notification[];
  reviews: Review[];
  updateRequest: (id: string, updates: Partial<Request>) => void;
  markNotificationRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * Data provider component that manages application data state
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [reviews] = useState<Review[]>(mockReviews);

  const updateRequest = (id: string, updates: Partial<Request>): void => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, ...updates, updatedAt: new Date() } : req))
    );
  };

  const markNotificationRead = (id: string): void => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const value: DataContextType = {
    requests,
    notifications,
    reviews,
    updateRequest,
    markNotificationRead
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

/**
 * Hook to access data context
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
