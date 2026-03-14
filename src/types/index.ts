export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type RequestPriority = 'low' | 'medium' | 'high';
export type RequestCategory = 'Shopping' | 'Transportation' | 'Technology' | 'Companionship' | 'Home Help' | 'Medical' | 'Other';

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  seniorId: string;
  seniorName: string;
  volunteerId?: string;
  volunteerName?: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'request' | 'update' | 'reminder' | 'review';
  read: boolean;
  createdAt: string;
  relatedRequestId?: string;
}

export interface Review {
  id: string;
 visiblename: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  requestId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
