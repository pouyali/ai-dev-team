import { User, Request, Notification, Review } from '../types';

/**
 * Mock users data
 */
export const mockUsers: User[] = [
  {
    id: 'vol-1',
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'volunteer',
    phone: '555-0101',
    address: '123 Main St, Springfield',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'sen-1',
    name: 'Margaret Smith',
    email: 'margaret@example.com',
    role: 'senior',
    phone: '555-0102',
    address: '456 Oak Avenue, Springfield',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'sen-2',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'senior',
    phone: '555-0103',
    address: '789 Medical Center Dr, Springfield',
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'adm-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  }
];

/**
 * Mock requests data
 */
export const mockRequests: Request[] = [
  {
    id: 'req-1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'shopping',
    priority: 'medium',
    status: 'pending',
    seniorId: 'sen-1',
    location: '456 Oak Avenue, Springfield',
    scheduledDate: new Date('2025-11-09T10:00:00'),
    estimatedDuration: '1-2 hours',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: 'I need a ride to my doctor\'s appointment. Round trip needed.',
    category: 'transportation',
    priority: 'high',
    status: 'pending',
    seniorId: 'sen-2',
    location: '789 Medical Center Dr, Springfield',
    scheduledDate: new Date('2025-11-10T14:00:00'),
    estimatedDuration: '2-3 hours',
    createdAt: new Date('2024-11-02'),
    updatedAt: new Date('2024-11-02')
  },
  {
    id: 'req-3',
    title: 'Help setting up tablet',
    description: 'Need help learning how to use my new tablet for video calls with family.',
    category: 'technology',
    priority: 'low',
    status: 'pending',
    seniorId: 'sen-1',
    location: '456 Oak Avenue, Springfield',
    scheduledDate: new Date('2025-11-12T15:00:00'),
    estimatedDuration: '1 hour',
    createdAt: new Date('2024-11-03'),
    updatedAt: new Date('2024-11-03')
  }
];

/**
 * Mock notifications data
 */
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'vol-1',
    title: 'New Request Available',
    message: 'Margaret Smith needs help with grocery shopping',
    type: 'info',
    read: false,
    createdAt: new Date('2024-11-01T09:00:00')
  },
  {
    id: 'notif-2',
    userId: 'vol-1',
    title: 'Request Confirmed',
    message: 'Your help request has been confirmed',
    type: 'success',
    read: false,
    createdAt: new Date('2024-11-01T10:30:00')
  }
];

/**
 * Mock reviews data
 */
export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    requestId: 'req-completed-1',
    reviewerId: 'sen-1',
    revieweeId: 'vol-1',
    rating: 5,
    comment: 'Sarah was wonderful! Very patient and kind.',
    createdAt: new Date('2024-10-20')
  }
];

/**
 * Helper to get user by ID
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

/**
 * Helper to get requests by senior ID
 */
export function getRequestsBySeniorId(seniorId: string): Request[] {
  return mockRequests.filter(req => req.seniorId === seniorId);
}

/**
 * Helper to get pending requests
 */
export function getPendingRequests(): Request[] {
  return mockRequests.filter(req => req.status === 'pending');
}
