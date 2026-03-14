import { User, Request, Review, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'vol-1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@email.com',
    role: 'volunteer',
    phone: '555-0101',
    address: '123 Main St, Springfield',
    rating: 4.8,
    totalReviews: 24,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'sen-1',
    name: 'Margaret Smith',
    email: 'margaret.smith@email.com',
    role: 'senior',
    phone: '555-0102',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'sen-2',
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    role: 'senior',
    phone: '555-0103',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@volunteerconnect.com',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
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
    location: '456 Oak Avenue, Springfield',
    scheduledDate: '2025-11-09T10:00:00Z',
    estimatedDuration: '1-2 hours',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    seniorId: 'sen-2',
    location: '789 Medical Center Dr, Springfield',
    scheduledDate: '2025-11-10T14:00:00Z',
    estimatedDuration: '2-3 hours',
    createdAt: '2024-11-02T10:00:00Z',
    updatedAt: '2024-11-02T10:00:00Z',
  },
  {
    id: 'req-3',
    title: 'Help setting up new phone',
    description: 'Just got a new smartphone and need help transferring contacts and setting up apps.',
    category: 'Technology',
    priority: 'low',
    status: 'accepted',
    seniorId: 'sen-1',
    volunteerId: 'vol-1',
    location: '456 Oak Avenue, Springfield',
    scheduledDate: '2025-11-12T15:00:00Z',
    estimatedDuration: '1 hour',
    createdAt: '2024-11-03T10:00:00Z',
    updatedAt: '2024-11-04T10:00:00Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    requestId: 'req-completed-1',
    reviewerId: 'sen-1',
    revieweeId: 'vol-1',
    rating: 5,
    comment: 'Sarah was wonderful! Very patient and helpful with my shopping.',
    createdAt: '2024-10-20T10:00:00Z',
  },
  {
    id: 'review-2',
    requestId: 'req-completed-2',
    reviewerId: 'sen-2',
    revieweeId: 'vol-1',
    rating: 5,
    comment: 'Excellent service, arrived on time and was very courteous.',
    createdAt: '2024-10-25T10:00:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'vol-1',
    title: 'New Request Available',
    message: 'Margaret Smith needs help with grocery shopping.',
    type: 'request',
    read: false,
    createdAt: '2024-11-01T10:00:00Z',
    relatedId: 'req-1',
  },
  {
    id: 'notif-2',
    userId: 'vol-1',
    title: 'Urgent: Transportation Needed',
    message: 'Robert Johnson needs a ride to a medical appointment.',
    type: 'request',
    read: false,
    createdAt: '2024-11-02T10:00:00Z',
    relatedId: 'req-2',
  },
  {
    id: 'notif-3',
    userId: 'vol-1',
    title: 'New Review Received',
    message: 'Margaret Smith left you a 5-star review!',
    type: 'review',
    read: true,
    createdAt: '2024-10-20T12:00:00Z',
    relatedId: 'review-1',
  },
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getRequestsByStatus = (status: string): Request[] => {
  return mockRequests.filter(req => req.status === status);
};

export const getRequestsBySenior = (seniorId: string): Request[] => {
  return mockRequests.filter(req => req.seniorId === seniorId);
};

export const getRequestsByVolunteer = (volunteerId: string): Request[] => {
  return mockRequests.filter(req => req.volunteerId === volunteerId);
};
