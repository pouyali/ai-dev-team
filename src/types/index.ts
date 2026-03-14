/**
 * User roles in the system
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * Request status values
 */
export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';

/**
 * Priority levels for requests
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * Categories for help requests
 */
export type Category = 'Shopping' | 'Transportation' | 'Technology' | 'Companionship' | 'Household' | 'Medical' | 'Other';

/**
 * Notification types
 */
export type NotificationType = 'request_accepted' | 'request_completed' | 'new_review' | 'request_cancelled' | 'reminder';

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

/**
 * Help request interface
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
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Review interface
 */
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  relatedRequestId?: string;
  createdAt: string;
}
