// User roles
export type UserRole = 'volunteer' | 'senior' | 'admin';

// Request priorities
export type Priority = 'low' | 'medium' | 'high';

// Request categories
export type Category = 'Shopping' | 'Transportation' | 'Technology' | 'Companionship' | 'Home Help' | 'Other';

// Request status
export type RequestStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';

// Location type
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

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location: Location;
  createdAt: string;
  rating?: number;
  totalReviews?: number;
  bio?: string;
  skills?: string[];
  availability?: string[];
}

// Help request type
export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  requesterId: string;
  volunteerId?: string;
  location: Location;
  scheduledDate: string;
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
}

// Review type
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Notification type
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'request' | 'reminder' | 'review' | 'system';
  read: boolean;
  createdAt: string;
  relatedRequestId?: string;
}
