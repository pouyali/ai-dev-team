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
import { generateId, simulateApiDelay } from '../utils/helpers';

interface DataContextType {
  requests: Request[];
  users: User[];
  reviews: Review[];
  notifications: Notification[];
  locationTracking: LocationTracking[];
  createRequest: (request: Omit<Request, 'id' | 'createdAt' | 'status'>) => Promise<Request>;
  updateRequest: (id: string, updates: Partial<Request>) => Promise<Request | null>;
  deleteRequest: (id: string) => Promise<boolean>;
  acceptRequest: (requestId: string, volunteerId: string, volunteerName: string) => Promise<Request | null>;
  declineRequest: (requestId: string) => Promise<Request | null>;
  startTask: (requestId: string) => Promise<Request | null>;
  completeTask: (requestId: string) => Promise<Request | null>;
  submitReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<Review>;
  updateLocationTracking: (tracking: LocationTracking) => void;
  deleteUser: (userId: string) => Promise<boolean>;
  markNotificationRead: (notificationId: string) => void;
  getUnreadCount: (userId: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * DataProvider component that manages all application data
 * Provides CRUD operations for requests, users, reviews, and notifications
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
    async (request: Omit<Request, 'id' | 'createdAt' | 'status'>): Promise<Request> => {
      await simulateApiDelay();
      const newRequest: Request = {
        ...request,
        id: `req-${generateId()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      setRequests((prev) => [...prev, newRequest]);
      return newRequest;
    },
    []
  );

  /**
   * Update an existing request
   */
  const updateRequest = useCallback(
    async (id: string, updates: Partial<Request>): Promise<Request | null> => {
      await simulateApiDelay();
      let updatedRequest: Request | null = null;
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === id) {
            updatedRequest = { ...req, ...updates };
            return updatedRequest;
          }
          return req;
        })
      );
      return updatedRequest;
    },
    []
  );

  /**
   * Delete a request
   */
  const deleteRequest = useCallback(async (id: string): Promise<boolean> => {
    await simulateApiDelay();
    setRequests((prev) => prev.filter((req) => req.id !== id));
    return true;
  }, []);

  /**
   * Accept a request as a volunteer
   */
  const acceptRequest = useCallback(
    async (requestId: string, volunteerId: string, volunteerName: string): Promise<Request | null> => {
      await simulateApiDelay();
      let updatedRequest: Request | null = null;
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === requestId) {
            updatedRequest = {
              ...req,
              status: 'accepted',
              volunteerId,
              volunteerName,
              acceptedAt: new Date().toISOString(),
            };
            return updatedRequest;
          }
          return req;
        })
      );
      return updatedRequest;
    },
    []
  );

  /**
   * Decline/reject a request
   */
  const declineRequest = useCallback(async (requestId: string): Promise<Request | null> => {
    await simulateApiDelay();
    let updatedRequest: Request | null = null;
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          updatedRequest = { ...req, status: 'rejected' };
          return updatedRequest;
        }
        return req;
      })
    );
    return updatedRequest;
  }, []);

  /**
   * Start a task
   */
  const startTask = useCallback(async (requestId: string): Promise<Request | null> => {
    await simulateApiDelay();
    let updatedRequest: Request | null = null;
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          updatedRequest = {
            ...req,
            status: 'started',
            startedAt: new Date().toISOString(),
          };
          return updatedRequest;
        }
        return req;
      })
    );
    return updatedRequest;
  }, []);

  /**
   * Complete a task
   */
  const completeTask = useCallback(async (requestId: string): Promise<Request | null> => {
    await simulateApiDelay();
    let updatedRequest: Request | null = null;
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          updatedRequest = {
            ...req,
            status: 'completed',
            completedAt: new Date().toISOString(),
          };
          return updatedRequest;
        }
        return req;
      })
    );
    return updatedRequest;
  }, []);

  /**
   * Submit a review
   */
  const submitReview = useCallback(
    async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
      await simulateApiDelay();
      const newReview: Review = {
        ...review,
        id: `rev-${generateId()}`,
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
        (t) => t.requestId === tracking.requestId && t.volunteerId === tracking.volunteerId
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
   * Delete a user
   */
  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    await simulateApiDelay();
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    return true;
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
   * Get the count of unread notifications for a user
   */
  const getUnreadCount = useCallback(
    (userId: string): number => {
      return notifications.filter((n) => n.userId === userId && !n.read).length;
    },
    [notifications]
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * Hook to access the data context
 * @returns DataContextType
 * @throws Error if used outside of DataProvider
 */
export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}