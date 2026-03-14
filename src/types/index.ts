export type UserRole = 'volunteer' | 'senior' | 'admin';

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

export type RequestStatus = 'pending' | 'accepted' | 'started' | 'in-progress' | 'finishing' | 'completed' | 'rejected';

export interface Request {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  seniorName: string;
  volunteerId?: string;
  volunteerName?: string;
  status: RequestStatus;
  location: { address: string; lat: number; lng: number };
  scheduledDate: string;
  scheduledTime: string;
  duration?: string;
  createdAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  category?: 'groceries' | 'medical' | 'transportation' | 'home-repair' | 'technology' | 'shopping' | 'other';
  urgency?: 'low' | 'medium' | 'high';
}

export interface LocationTracking {
  requestId: string;
  volunteerId: string;
  currentLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  lastUpdated: string;
  isActive: boolean;
}

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

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}