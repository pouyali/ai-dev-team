'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Request, User, Review, Notification, LocationTracking } from '../types';
import {
  mockRequests,
  mockUsers,
  mockReviews,
  mockNotifications,
  mockLocationTracking,
} from '../utils/mockData';
import { generateId } from '../utils/helpers';

/**
 * Data context interface
 */
interface DataContextType {
  requests: Request[];
  users: User[];
  reviews: Review[];
  notifications: Notification[];
  locationTracking: LocationTracking[];
  createRequest: (request: Omit<Request, 'id' | 'createdAt' | 'status'>) => Request;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
  acceptRequest: (requestId: string, volunteerId: string, volunteerName: string) => void;
  declineRequest: (requestId: string) => void;
  startTask: (requestId: string) => void;
  completeTask: (requestId: string) => void;
  submitReview: (review: Omit<Review, 'id' | 'createdAt'>) => Review;
  updateLocationTracking: (tracking: LocationTracking) => void;
  deleteUser: (userId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserById: (userId: string) => User | undefined;
  getRequestById: (requestId: string) => Request | undefined;
}

/**
 * Data context with default values
 */
const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * Data provider props
 */
interface DataProviderProps {
  children: ReactNode;
}

/**
 * Data provider component that manages application data state
 */
export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [locationTracking, setLocationTracking] = useState<LocationTracking[]>(mockLocationTracking);

  /**
   * Create a new request
   */
  const createRequest = useCallback(
    (requestData: Omit<Request, 'id' | 'createdAt' | 'status'>): Request => {
      const newRequest: Request = {
        ...requestData,
        id: generateId(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setRequests((prev) => [...prev, newRequest]);
      return newRequest;
    },
    []
  );

  /**
   * Update an existing request
   */
  const updateRequest = useCallback((id: string, updates: Partial<Request>): void => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
  }, []);

  /**
   * Delete a request
   */
  const deleteRequest = useCallback((id: string): void => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  }, []);

  /**
   * Accept a request as a volunteer
   */
  const acceptRequest = useCallback(
    (requestId: string, volunteerId: string, volunteerName: string): void => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? {
                ...req,
                status: 'accepted',
                volunteerId,
                volunteerName,
                acceptedAt: new Date().toISOString(),
              }
            : req
        )
      );
    },
    []
  );

  /**
   * Decline/reject a request
   */
  const declineRequest = useCallback((requestId: string): void => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  }, []);

  /**
   * Start a task (volunteer is on the way or has arrived)
   */
  const startTask = useCallback((requestId: string): void => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: 'started', startedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  /**
   * Complete a task
   */
  const completeTask = useCallback((requestId: string): void => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: 'completed', completedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  /**
   * Submit a review
   */
  const submitReview = useCallback(
    (reviewData: Omit<Review, 'id' | 'createdAt'>): Review => {
      const newReview: Review = {
        ...reviewData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setReviews((prev) => [...prev, newReview]);
      return newReview;
    },
    []
  );

  /**
   * Update location tracking for a volunteer
   */
  const updateLocationTracking = useCallback((tracking: LocationTracking): void => {
    setLocationTracking((prev) => {
      const existingIndex = prev.findIndex(
        (t) => t.requestId === tracking.requestId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = tracking;
        return updated;
      }
      return [...prev, tracking];
    });
  }, []);

  /**
   * Delete a user (admin only)
   */
  const deleteUser = useCallback((userId: string): void => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  /**
   * Mark a notification as read
   */
  const markNotificationRead = useCallback((notificationId: string): void => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  /**
   * Get unread notification count for a user
   */
  const getUnreadCount = useCallback(
    (userId: string): number => {
      return notifications.filter((n) => n.userId === userId && !n.read).length;
    },
    [notifications]
  );

  /**
   * Get a user by ID
   */
  const getUserById = useCallback(
    (userId: string): User | undefined => {
      return users.find((u) => u.id === userId);
    },
    [users]
  );

  /**
   * Get a request by ID
   */
  const getRequestById = useCallback(
    (requestId: string): Request | undefined => {
      return requests.find((r) => r.id === requestId);
    },
    [requests]
  );

  const value: DataContextType = {
    requests,
    users,
    reviews,
    notifications,
    locationTracking,
    createRequest,
    updateRequest,
    deleteRequest,
    acceptRequest,
    declineRequest,
    startTask,
    completeTask,
    submitReview,
    updateLocationTracking,
    deleteUser,
    markNotificationRead,
    getUnreadCount,
    getUserById,
    getRequestById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * Hook to use the data context
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
