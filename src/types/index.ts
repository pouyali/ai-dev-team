/**
 * Type definitions for the VolunteerConnect application
 */

/**
 * User roles in the system
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * Status of a help request
 */
export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Urgency level for help requests
 */
export type UrgencyLevel = 'low' | 'medium' | 'high';

/**
 * Priority level for requests
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * Categories of help requests
 */
export type Category = 'transportation' | 'groceries' | 'medical' | 'technology' | 'companionship' | 'household' | 'other';

/**
 * Location information
 */
export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * User in the system
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  location?: Location;
  avatar?: string;
  bio?: string;
  skills?: string[];
  availability?: string[];
  rating?: number;
  totalReviews?: number;
  createdAt: string;
}

/**
 * Help request from a senior
 */
export interface HelpRequest {
  id: string;
  seniorId: string;
  volunteerId?: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  location: Location;
  scheduledDate: string;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
}

/**
 * Review for a completed help request
 */
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

/**
 * Notification for users
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'request' | 'message' | 'reminder' | 'review';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
