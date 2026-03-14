'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { HelpRequest, Review, Notification, RequestStatus } from '../types';
import { mockRequests, mockReviews, mockNotifications } from '../data/mockData';

interface DataContextType {
  requests: HelpRequest[];
  reviews: Review[];
  notifications: Notification[];
  addRequest: (request: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus, volunteerId?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: (userId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * Data context provider
 * Manages application data state including requests, reviews, and notifications
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [requests, setRequests] = useState<HelpRequest[]>(mockRequests);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addRequest = useCallback(
    (request: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt'>): void => {
      const newRequest: HelpRequest = {
        ...request,
        id: `req_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRequests((prev) => [...prev, newRequest]);
    },
    []
  );

  const updateRequestStatus = useCallback(
    (requestId: string, status: RequestStatus, volunteerId?: string): void => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? {
                ...req,
                status,
                volunteerId: volunteerId || req.volunteerId,
                updatedAt: new Date().toISOString(),
              }
            : req
        )
      );
    },
    []
  );

  const addReview = useCallback(
    (review: Omit<Review, 'id' | 'createdAt'>): void => {
      const newReview: Review = {
        ...review,
        id: `rev_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setReviews((prev) => [...prev, newReview]);
    },
    []
  );

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt'>): void => {
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  const markNotificationRead = useCallback((notificationId: string): void => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllNotificationsRead = useCallback((userId: string): void => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.userId === userId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const value: DataContextType = {
    requests,
    reviews,
    notifications,
    addRequest,
    updateRequestStatus,
    addReview,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * Hook to access data context
 * Must be used within a DataProvider
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
