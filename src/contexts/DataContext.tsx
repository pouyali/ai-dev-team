'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { HelpRequest, Review, Notification, RequestStatus } from '@/types';
import { mockRequests, mockReviews, mockNotifications } from '@/data/mockData';

interface DataContextType {
  requests: HelpRequest[];
  reviews: Review[];
  notifications: Notification[];
  addRequest: (request: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequest: (id: string, updates: Partial<HelpRequest>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [requests, setRequests] = useState<HelpRequest[]>(mockRequests);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addRequest = useCallback((request: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt'>): void => {
    const newRequest: HelpRequest = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRequests(prev => [...prev, newRequest]);
  }, []);

  const updateRequest = useCallback((id: string, updates: Partial<HelpRequest>): void => {
    setRequests(prev => prev.map(req =>
      req.id === id
        ? { ...req, ...updates, updatedAt: new Date().toISOString() }
        : req
    ));
  }, []);

  const updateRequestStatus = useCallback((id: string, status: RequestStatus): void => {
    setRequests(prev => prev.map(req =>
      req.id === id
        ? {
            ...req,
            status,
            updatedAt: new Date().toISOString(),
            completedAt: status === 'completed' ? new Date().toISOString() : req.completedAt
          }
        : req
    ));
  }, []);

  const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>): void => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  }, []);

  const markNotificationRead = useCallback((id: string): void => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  }, []);

  const markAllNotificationsRead = useCallback((userId: string): void => {
    setNotifications(prev => prev.map(notif =>
      notif.userId === userId ? { ...notif, read: true } : notif
    ));
  }, []);

  const value: DataContextType = {
    requests,
    reviews,
    notifications,
    addRequest,
    updateRequest,
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

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
