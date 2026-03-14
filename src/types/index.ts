// User types
export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

// Request types
export type Priority = 'low' | 'medium' | 'high';
export type Category = 'Shopping' | 'Transportation' | 'Technology' | 'Companionship' | 'Home Help' | 'Medical' | 'Other';
export type RequestStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';

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

export interface Request {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  seniorId: string;
  volunteerId?: string;
  location: Location;
  scheduledDate: string;
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
}

// Review types
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Notification types
export type NotificationType = 'request_new' | 'request_accepted' | 'request_completed' | 'review_received' | 'reminder' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}
