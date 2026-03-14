/**
 * User roles in the system
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * Request priority levels
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * Request categories
 */
export type Category = 'shopping' | 'transportation' | 'technology' | 'companionship' | 'household' | 'other';

/**
 * Request status values
 */
export type RequestStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'rejected';

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
  avatar?: string;
  createdAt: Date;
}

/**
 * Request interface
 */
export interface Request {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  seniorId: string;
  volunteerId?: string;
  location: string;
  scheduledDate: Date;
  estimatedDuration: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
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
  createdAt: Date;
}
