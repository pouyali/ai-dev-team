/**
 * Core type definitions for VolunteerConnect
 */

/** User roles in the system */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/** Status of a help request */
export type RequestStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';

/** Urgency level for help requests */
export type UrgencyLevel = 'low' | 'medium' | 'high';

/** User profile information */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  rating: number;
  totalReviews: number;
  createdAt: Date;
}

/** Help request from a senior */
export interface HelpRequest {
  id: string;
  requesterId: string;
  title: string;
  description: string;
  category: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  location: string;
  scheduledDate?: Date;
  assignedVolunteerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Notification for users */
export interface Notification {
  id: string;
  userId: string;
  type: 'request' | 'assignment' | 'reminder' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

/** Priority levels */
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

/** Request categories */
export type Category = 'transportation' | 'groceries' | 'medical' | 'companionship' | 'household' | 'technology' | 'other';
