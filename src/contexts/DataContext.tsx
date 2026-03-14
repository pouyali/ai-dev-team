'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Request, Review, Notification, RequestStatus } from '../types';
import { mockRequests, mockReviews, mockNotifications } from '../data/mockData';

interface DataContextType {
  requests: Request[];
  reviews: Review[];
  notifications: Notification[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus, volunteerId?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: (userId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * Data provider component
 * Manages application data state for requests, reviews, and notifications
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addRequest = useCallback((request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newRequest: Request = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    setRequests(prev => [...prev, newRequest]);
  }, []);

  const updateRequestStatus = useCallback((requestId: string, status: RequestStatus, volunteerId?: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          volunteerId: volunteerId || req.volunteerId,
          updatedAt: new Date().toISOString(),
          completedAt: status === 'completed' ? new Date().toISOString() : req.completedAt
        };
      }
      return req;
    }));
  }, []);

  const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === notificationId) {
        return { ...n, read: true };
      }
      return n;
    }));
  }, []);

  const markAllNotificationsRead = useCallback((userId: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.userId === userId) {
        return { ...n, read: true };
      }
      return n;
    }));
  }, []);

  const value: DataContextType = {
    requests,
    reviews,
    notifications,
    addRequest,
    updateRequestStatus,
    addReview,
    markNotificationRead,
    markAllNotificationsRead
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
