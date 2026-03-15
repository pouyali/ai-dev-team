// User roles
export type UserRole = 'volunteer' | 'senior' | 'admin';

// Request priorities
export type Priority = 'low' | 'medium' | 'high';

// Request urgency (alias for priority used in mock data)
export type Urgency = 'low' | 'medium' | 'high';

// Request categories
export type Category = 'groceries' | 'medical' | 'technology' | 'companionship' | 'home' | 'other';

// Request status
export type RequestStatus = 'pending' | 'accepted' | 'started' | 'in-progress' | 'completed' | 'cancelled';

// User stats
export interface UserStats {
  totalRequests?: number;
  completedRequests?: number;
  activeRequests?: number;
}

// User type
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
  bio?: string;
  skills?: string[];
  availability?: string[];
  stats?: UserStats;
}

// Location type
export interface RequestLocation {
  address: string;
  lat: number;
  lng: number;
}

// Help request type
export interface Request {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  seniorName: string;
  volunteerId?: string;
  volunteerName?: string;
  status: RequestStatus;
  location: RequestLocation;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  category: Category;
  urgency: Urgency;
}

// Review type
export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: UserRole;
  revieweeId: string;
  revieweeName: string;
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
  read: boolean;
  createdAt: string;
  type?: 'request' | 'reminder' | 'review' | 'system';
  relatedRequestId?: string;
}
