/**
 * User role types for the application
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * User interface representing all user types in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  rating?: number;
  totalReviews?: number;
  joinedDate: string;
  stats?: {
    totalRequests?: number;
    completedRequests?: number;
    activeRequests?: number;
  };
}

/**
 * Request status types representing the lifecycle of a help request
 */
export type RequestStatus = 'pending' | 'accepted' | 'started' | 'in-progress' | 'finishing' | 'completed' | 'rejected';

/**
 * Request category types
 */
export type RequestCategory = 'groceries' | 'medical' | 'transportation' | 'home-repair' | 'technology' | 'shopping' | 'other';

/**
 * Urgency levels for requests
 */
export type UrgencyLevel = 'low' | 'medium' | 'high';

/**
 * Location interface for geographic coordinates
 */
export interface Location {
  address: string;
  lat: number;
  lng: number;
}

/**
 * Request interface representing a help request from a senior
 */
export interface Request {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  seniorName: string;
  volunteerId?: string;
  volunteerName?: string;
  status: RequestStatus;
  location: Location;
  scheduledDate: string;
  scheduledTime: string;
  duration?: string;
  createdAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  category?: RequestCategory;
  urgency?: UrgencyLevel;
}

/**
 * Location tracking interface for real-time volunteer tracking
 */
export interface LocationTracking {
  requestId: string;
  volunteerId: string;
  currentLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  lastUpdated: string;
  isActive: boolean;
}

/**
 * Review interface for feedback after completed requests
 */
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: 'volunteer' | 'senior';
  revieweeId: string;
  revieweeName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

/**
 * Notification interface for user notifications
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
