// Mock data for the application
// Note: these types extend the base types with app-specific fields

export type UserRole = 'volunteer' | 'senior' | 'admin';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  rating?: number;
  totalReviews?: number;
  joinedDate: string;
  stats?: {
    completedRequests?: number;
    activeRequests?: number;
    totalRequests?: number;
  };
}

export interface MockLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface MockRequest {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  seniorName: string;
  volunteerId?: string;
  volunteerName?: string;
  status: 'pending' | 'accepted' | 'started' | 'in-progress' | 'completed' | 'cancelled';
  location: MockLocation;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  createdAt: string;
  acceptedAt?: string;
  category: 'groceries' | 'medical' | 'other' | string;
  urgency: 'low' | 'medium' | 'high';
}

export interface MockReview {
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

export interface MockNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-st',
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'volunteer',
    phone: '555-0201',
    rating: 4.8,
    totalReviews: 12,
    joinedDate: '2024-01-15',
    stats: { completedRequests: 23, activeRequests: 1 },
  },
  {
    id: 'user-jw',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'volunteer',
    phone: '555-0202',
    rating: 4.5,
    totalReviews: 8,
    joinedDate: '2024-02-14',
    stats: { completedRequests: 15, activeRequests: 0 },
  },
  {
    id: 'user-ms',
    name: 'Margaret Smith',
    email: 'margaret@example.com',
    role: 'senior',
    phone: '555-0101',
    address: '456 Oak Avenue, Springfield',
    joinedDate: '2024-02-20',
    stats: { totalRequests: 8, activeRequests: 2 },
  },
  {
    id: 'user-rj',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'senior',
    phone: '555-0102',
    address: '789 Medical Center Dr, Springfield',
    joinedDate: '2024-03-10',
    stats: { totalRequests: 5, activeRequests: 1 },
  },
  {
    id: 'user-dw',
    name: 'Dorothy Williams',
    email: 'dorothy@example.com',
    role: 'senior',
    phone: '555-0103',
    address: '321 Elm Street, Springfield',
    joinedDate: '2024-01-28',
    stats: { totalRequests: 6, activeRequests: 1 },
  },
  {
    id: 'user-ad',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    joinedDate: '2024-01-01',
  },
];

export const mockRequests: MockRequest[] = [
  {
    id: 'req-1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    seniorId: 'user-ms',
    seniorName: 'Margaret Smith',
    status: 'pending',
    location: { address: '456 Oak Avenue, Springfield', lat: 40.7128, lng: -74.0060 },
    scheduledDate: '2025-11-09',
    scheduledTime: '10:00',
    duration: '1-2 hours',
    createdAt: new Date().toISOString(),
    category: 'groceries',
    urgency: 'medium',
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    seniorId: 'user-rj',
    seniorName: 'Robert Johnson',
    status: 'pending',
    location: { address: '789 Medical Center Dr, Springfield', lat: 40.7580, lng: -73.9855 },
    scheduledDate: '2025-11-10',
    scheduledTime: '14:00',
    duration: '2-3 hours',
    createdAt: new Date().toISOString(),
    category: 'medical',
    urgency: 'high',
  },
  {
    id: 'req-3',
    title: 'Help setting up new phone',
    description: 'Got a new smartphone and need help setting it up and transferring data.',
    seniorId: 'user-dw',
    seniorName: 'Dorothy Williams',
    volunteerId: 'user-st',
    volunteerName: 'Sarah Thompson',
    status: 'accepted',
    location: { address: '321 Elm Street, Springfield', lat: 40.7489, lng: -73.9680 },
    scheduledDate: '2025-11-11',
    scheduledTime: '11:00',
    duration: '1 hour',
    createdAt: new Date().toISOString(),
    acceptedAt: new Date().toISOString(),
    category: 'other',
    urgency: 'medium',
  },
];

export const mockReviews: MockReview[] = [
  {
    id: 'rev-1',
    requestId: 'req-3',
    reviewerId: 'user-dw',
    reviewerName: 'Dorothy Williams',
    reviewerRole: 'senior',
    revieweeId: 'user-st',
    revieweeName: 'Sarah Thompson',
    rating: 5,
    comment: 'Sarah was incredibly helpful and patient. Highly recommend!',
    createdAt: new Date().toISOString(),
  },
];

export const mockNotifications: MockNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-st',
    title: 'New request available',
    message: 'Margaret Smith needs help with grocery shopping',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'user-st',
    title: 'Reminder',
    message: 'You have a task scheduled tomorrow with Dorothy Williams',
    read: false,
    createdAt: new Date().toISOString(),
  },
];
