/**
 * Core type definitions for the VolunteerConnect application
 */

/**
 * Urgency level for help requests
 */
export type UrgencyLevel = 'low' | 'medium' | 'high';

/**
 * Status of a help request
 */
export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

/**
 * User roles in the system
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

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
 * User profile information
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
  createdAt: string;
  updatedAt: string;
}

/**
 * Help request created by seniors
 */
export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  seniorId: string;
  senior?: User;
  volunteerId?: string;
  volunteer?: User;
  location?: Location;
  scheduledDate?: string;
  scheduledTime?: string;
  estimatedDuration?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

/**
 * Review/rating for completed requests
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
  type: 'request_created' | 'request_accepted' | 'request_completed' | 'message' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  relatedRequestId?: string;
  createdAt: string;
}
