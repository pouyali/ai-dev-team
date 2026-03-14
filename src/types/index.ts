/**
 * User role types
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * Request status types
 */
export type RequestStatus = 'pending' | 'accepted' | 'started' | 'completed' | 'cancelled';

/**
 * Request priority types
 */
export type RequestPriority = 'low' | 'medium' | 'high';

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
}

/**
 * Request interface
 */
export interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
  seniorId: string;
  volunteerId?: string;
  scheduledDate: string;
  duration: string;
  address: string;
  createdAt: string;
  completedAt?: string;
  completionNotes?: string;
  cancellationReason?: string;
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
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
