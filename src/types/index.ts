export type UserRole = 'volunteer' | 'senior' | 'admin';

export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Shopping' | 'Transportation' | 'Technology' | 'Companionship' | 'Home Help' | 'Medical' | 'Other';

export type RequestStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'rejected';

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
  createdAt: string;
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
  location: string;
  scheduledDate: string;
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'request' | 'review' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
  relatedId?: string;
}
