'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { HelpRequest, Notification, Review, RequestStatus } from '@/types';

interface DataContextType {
  requests: HelpRequest[];
  notifications: Notification[];
  reviews: Review[];
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  startTask: (requestId: string) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getRequestById: (requestId: string) => HelpRequest | undefined;
  getPendingRequests: () => HelpRequest[];
  getAcceptedRequests: () => HelpRequest[];
  getUnreadNotificationCount: () => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialRequests: HelpRequest[] = [
  {
    id: 'r1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'Shopping',
    priority: 'medium',
    status: 'pending',
    seniorId: 's1',
    seniorName: 'Margaret Smith',
    date: 'November 9, 2025',
    time: '10:00 AM',
    duration: '1-2 hours',
    location: '456 Oak Avenue, Springfield',
    latitude: 37.7849,
    longitude: -122.4094,
    createdAt: '2025-11-07T10:00:00Z',
    updatedAt: '2025-11-07T10:00:00Z',
  },
  {
    id: 'r2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    seniorId: 's2',
    seniorName: 'Robert Johnson',
    date: 'November 10, 2025',
    time: '2:00 PM',
    duration: '2-3 hours',
    location: '789 Medical Center Dr, Springfield',
    latitude: 37.7899,
    longitude: -122.4144,
    createdAt: '2025-11-07T11:00:00Z',
    updatedAt: '2025-11-07T11:00:00Z',
  },
  {
    id: 'r3',
    title: 'Help setting up new phone',
    description: 'I just got a new smartphone and need help setting it up and learning how to use it.',
    category: 'Technology',
    priority: 'low',
    status: 'accepted',
    seniorId: 's3',
    seniorName: 'Dorothy Williams',
    volunteerId: 'v1',
    volunteerName: 'Sarah Thompson',
    date: 'November 11, 2025',
    time: '11:00 AM',
    duration: '1 hour',
    location: '321 Elm Street, Springfield',
    latitude: 37.7799,
    longitude: -122.4044,
    createdAt: '2025-11-07T12:00:00Z',
    updatedAt: '2025-11-07T12:00:00Z',
  },
];

const initialNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'v1',
    title: 'New Request Available',
    message: 'Margaret Smith needs help with grocery shopping.',
    type: 'request',
    read: false,
    createdAt: '2025-11-07T10:00:00Z',
    relatedRequestId: 'r1',
  },
  {
    id: 'n2',
    userId: 'v1',
    title: 'Urgent Request',
    message: 'Robert Johnson needs a ride to a medical appointment.',
    type: 'request',
    read: false,
    createdAt: '2025-11-07T11:00:00Z',
    relatedRequestId: 'r2',
  },
];

const initialReviews: Review[] = [
  {
    id: 'rev1',
    reviewerId: 's3',
    reviewerName: 'Dorothy Williams',
    revieweeId: 'v1',
    revieweeName: 'Sarah Thompson',
    requestId: 'r0',
    rating: 5,
    comment: 'Sarah was wonderful! She was patient and helped me understand everything.',
    createdAt: '2025-11-01T15:00:00Z',
  },
];

export function DataProvider({ children }: { children: ReactNode }): JSX.Element {
  const [requests, setRequests] = useState<HelpRequest[]>(initialRequests);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const acceptRequest = useCallback((requestId: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'accepted' as RequestStatus, volunteerId: 'v1', volunteerName: 'Sarah Thompson', updatedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  const declineRequest = useCallback((requestId: string): void => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  }, []);

  const startTask = useCallback((requestId: string): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: 'in_progress' as RequestStatus, updatedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  const updateRequestStatus = useCallback((requestId: string, status: RequestStatus): void => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status, updatedAt: new Date().toISOString() }
          : req
      )
    );
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

  const addReview = useCallback((review: Omit<Review, 'id' | 'createdAt'>): void => {
    const newReview: Review = {
      ...review,
      id: `rev${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const getRequestById = useCallback((requestId: string): HelpRequest | undefined => {
    return requests.find(req => req.id === requestId);
  }, [requests]);

  const getPendingRequests = useCallback((): HelpRequest[] => {
    return requests.filter(req => req.status === 'pending');
  }, [requests]);

  const getAcceptedRequests = useCallback((): HelpRequest[] => {
    return requests.filter(req => req.status === 'accepted' && req.volunteerId === 'v1');
  }, [requests]);

  const getUnreadNotificationCount = useCallback((): number => {
    return notifications.filter(n => !n.read && n.userId === 'v1').length;
  }, [notifications]);

  return (
    <DataContext.Provider
      value={{
        requests,
        notifications,
        reviews,
        acceptRequest,
        declineRequest,
        startTask,
        updateRequestStatus,
        markNotificationRead,
        markAllNotificationsRead,
        addReview,
        getRequestById,
        getPendingRequests,
        getAcceptedRequests,
        getUnreadNotificationCount,
      }}
    >
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
