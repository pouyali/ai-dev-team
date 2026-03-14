'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Request, Review, Notification, RequestStatus } from '../types';
import { mockRequests, mockReviews, mockNotifications } from '../data/mockData';

interface DataContextType {
  requests: Request[];
  reviews: Review[];
  notifications: Notification[];
  updateRequestStatus: (requestId: string, status: RequestStatus, volunteerId?: string) => void;
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }): JSX.Element {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const updateRequestStatus = useCallback((requestId: string, status: RequestStatus, volunteerId?: string): void => {
    setRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status,
            volunteerId: volunteerId || req.volunteerId,
            updatedAt: new Date().toISOString(),
            completedAt: status === 'completed' ? new Date().toISOString() : req.completedAt,
          };
        }
        return req;
      })
    );
  }, []);

  const addRequest = useCallback((request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): void => {
    const newRequest: Request = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
  }, []);

  const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>): void => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const markNotificationRead = useCallback((notificationId: string): void => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllNotificationsRead = useCallback((): void => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const value: DataContextType = {
    requests,
    reviews,
    notifications,
    updateRequestStatus,
    addRequest,
    addReview,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
