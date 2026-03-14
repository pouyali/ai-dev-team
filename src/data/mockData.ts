import { User, Request, Review, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'vol-1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@email.com',
    role: 'volunteer',
    phone: '555-0101',
    address: '123 Main St, Springfield',
    bio: 'Passionate about helping seniors in my community.',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'sen-1',
    name: 'Margaret Smith',
    email: 'margaret.smith@email.com',
    role: 'senior',
    phone: '555-0102',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'sen-2',
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    role: 'senior',
    phone: '555-0103',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2024-01-12T11:00:00Z'
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@volunteerconnect.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'req-1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'Shopping',
    priority: 'medium',
    status: 'pending',
    seniorId: 'sen-1',
    location: {
      address: '456 Oak Avenue, Springfield',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    },
    scheduledDate: '2025-11-09T10:00:00Z',
    estimatedDuration: '1-2 hours',
    createdAt: '2024-11-01T14:00:00Z',
    updatedAt: '2024-11-01T14:00:00Z'
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    seniorId: 'sen-2',
    location: {
      address: '789 Medical Center Dr, Springfield',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    },
    scheduledDate: '2025-11-10T14:00:00Z',
    estimatedDuration: '2-3 hours',
    createdAt: '2024-11-02T09:00:00Z',
    updatedAt: '2024-11-02T09:00:00Z'
  },
  {
    id: 'req-3',
    title: 'Help setting up new tablet',
    description: 'Need help setting up my new tablet and learning how to video call my grandchildren.',
    category: 'Technology',
    priority: 'low',
    status: 'pending',
    seniorId: 'sen-1',
    location: {
      address: '456 Oak Avenue, Springfield',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    },
    scheduledDate: '2025-11-12T15:00:00Z',
    estimatedDuration: '1 hour',
    createdAt: '2024-11-03T11:00:00Z',
    updatedAt: '2024-11-03T11:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    requestId: 'req-completed-1',
    reviewerId: 'sen-1',
    revieweeId: 'vol-1',
    rating: 5,
    comment: 'Sarah was wonderful! Very patient and helpful.',
    createdAt: '2024-10-20T16:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'vol-1',
    type: 'request_new',
    title: 'New Request Available',
    message: 'Margaret Smith needs help with grocery shopping.',
    read: false,
    createdAt: '2024-11-01T14:05:00Z',
    relatedId: 'req-1'
  },
  {
    id: 'notif-2',
    userId: 'vol-1',
    type: 'request_new',
    title: 'New Request Available',
    message: 'Robert Johnson needs a ride to medical appointment.',
    read: false,
    createdAt: '2024-11-02T09:05:00Z',
    relatedId: 'req-2'
  }
];
