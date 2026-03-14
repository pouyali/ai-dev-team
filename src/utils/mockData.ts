import { User, Request, Review, Notification, LocationTracking } from '../types';

/**
 * Mock users data including volunteers, seniors, and admin
 */
export const mockUsers: User[] = [
  // Volunteers
  {
    id: 'vol-1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@email.com',
    role: 'volunteer',
    phone: '(555) 123-4567',
    address: '123 Main Street, Springfield',
    rating: 4.8,
    totalReviews: 24,
    joinedDate: '2024-06-15',
    stats: {
      totalRequests: 45,
      completedRequests: 42,
      activeRequests: 3,
    },
  },
  {
    id: 'vol-2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    role: 'volunteer',
    phone: '(555) 234-5678',
    address: '456 Oak Lane, Springfield',
    rating: 4.9,
    totalReviews: 31,
    joinedDate: '2024-03-20',
    stats: {
      totalRequests: 52,
      completedRequests: 50,
      activeRequests: 2,
    },
  },
  {
    id: 'vol-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    role: 'volunteer',
    phone: '(555) 345-6789',
    address: '789 Pine Road, Springfield',
    rating: 4.7,
    totalReviews: 18,
    joinedDate: '2024-08-10',
    stats: {
      totalRequests: 28,
      completedRequests: 25,
      activeRequests: 3,
    },
  },
  // Seniors
  {
    id: 'sen-1',
    name: 'Margaret Smith',
    email: 'margaret.smith@email.com',
    role: 'senior',
    phone: '(555) 456-7890',
    address: '456 Oak Avenue, Springfield',
    joinedDate: '2024-05-01',
    stats: {
      totalRequests: 12,
      completedRequests: 10,
      activeRequests: 2,
    },
  },
  {
    id: 'sen-2',
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    role: 'senior',
    phone: '(555) 567-8901',
    address: '789 Medical Center Dr, Springfield',
    joinedDate: '2024-04-15',
    stats: {
      totalRequests: 8,
      completedRequests: 7,
      activeRequests: 1,
    },
  },
  {
    id: 'sen-3',
    name: 'Dorothy Williams',
    email: 'dorothy.williams@email.com',
    role: 'senior',
    phone: '(555) 678-9012',
    address: '321 Elm Street, Springfield',
    joinedDate: '2024-07-20',
    stats: {
      totalRequests: 5,
      completedRequests: 4,
      activeRequests: 1,
    },
  },
  // Admin
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@volunteerconnect.com',
    role: 'admin',
    phone: '(555) 999-0000',
    joinedDate: '2024-01-01',
  },
];

/**
 * Mock requests data
 */
export const mockRequests: Request[] = [
  {
    id: 'req-1',
    title: 'Help with grocery shopping',
    description: 'I need help picking up groceries from the local supermarket. I have a list of items ready and would appreciate someone to help carry the bags.',
    seniorId: 'sen-1',
    seniorName: 'Margaret Smith',
    status: 'pending',
    location: {
      address: '456 Oak Avenue, Springfield',
      lat: 40.7128,
      lng: -74.006,
    },
    scheduledDate: '2025-11-09',
    scheduledTime: '10:00 AM',
    duration: '1-2 hours',
    createdAt: '2025-11-01T10:00:00Z',
    category: 'shopping',
    urgency: 'medium',
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: 'I have a doctor\'s appointment and need transportation to and from the medical center. The appointment should last about an hour.',
    seniorId: 'sen-2',
    seniorName: 'Robert Johnson',
    status: 'pending',
    location: {
      address: '789 Medical Center Dr, Springfield',
      lat: 40.758,
      lng: -73.9855,
    },
    scheduledDate: '2025-11-10',
    scheduledTime: '2:00 PM',
    duration: '2-3 hours',
    createdAt: '2025-11-02T14:00:00Z',
    category: 'transportation',
    urgency: 'high',
  },
  {
    id: 'req-3',
    title: 'Help setting up new phone',
    description: 'I just got a new smartphone and need help setting it up, transferring contacts, and learning how to use the basic features.',
    seniorId: 'sen-3',
    seniorName: 'Dorothy Williams',
    volunteerId: 'vol-1',
    volunteerName: 'Sarah Thompson',
    status: 'accepted',
    location: {
      address: '321 Elm Street, Springfield',
      lat: 40.7489,
      lng: -73.968,
    },
    scheduledDate: '2025-11-11',
    scheduledTime: '11:00 AM',
    duration: '1 hour',
    createdAt: '2025-11-03T09:00:00Z',
    acceptedAt: '2025-11-03T12:00:00Z',
    category: 'technology',
    urgency: 'medium',
  },
  {
    id: 'req-4',
    title: 'Light bulb replacement',
    description: 'Several light bulbs in my home need replacing. I have the bulbs but cannot reach the fixtures safely.',
    seniorId: 'sen-1',
    seniorName: 'Margaret Smith',
    volunteerId: 'vol-2',
    volunteerName: 'Michael Chen',
    status: 'completed',
    location: {
      address: '456 Oak Avenue, Springfield',
      lat: 40.7128,
      lng: -74.006,
    },
    scheduledDate: '2025-10-25',
    scheduledTime: '3:00 PM',
    duration: '1 hour',
    createdAt: '2025-10-20T10:00:00Z',
    acceptedAt: '2025-10-21T08:00:00Z',
    startedAt: '2025-10-25T15:00:00Z',
    completedAt: '2025-10-25T16:00:00Z',
    category: 'home-repair',
    urgency: 'low',
  },
];

/**
 * Mock reviews data
 */
export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    requestId: 'req-4',
    reviewerId: 'sen-1',
    reviewerName: 'Margaret Smith',
    reviewerRole: 'senior',
    revieweeId: 'vol-2',
    revieweeName: 'Michael Chen',
    rating: 5,
    comment: 'Michael was wonderful! He replaced all the bulbs quickly and even checked if any others needed replacing. Very kind and helpful.',
    createdAt: '2025-10-25T17:00:00Z',
  },
  {
    id: 'rev-2',
    requestId: 'req-4',
    reviewerId: 'vol-2',
    reviewerName: 'Michael Chen',
    reviewerRole: 'volunteer',
    revieweeId: 'sen-1',
    revieweeName: 'Margaret Smith',
    rating: 5,
    comment: 'Margaret was very welcoming and had everything ready for me. A pleasure to help!',
    createdAt: '2025-10-25T17:30:00Z',
  },
];

/**
 * Mock notifications data
 */
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'vol-1',
    title: 'New Request Available',
    message: 'Margaret Smith needs help with grocery shopping in your area.',
    read: false,
    createdAt: '2025-11-01T10:05:00Z',
  },
  {
    id: 'notif-2',
    userId: 'vol-1',
    title: 'Request Accepted',
    message: 'Your acceptance for "Help setting up new phone" has been confirmed.',
    read: false,
    createdAt: '2025-11-03T12:05:00Z',
  },
  {
    id: 'notif-3',
    userId: 'sen-1',
    title: 'Volunteer Assigned',
    message: 'Sarah Thompson has accepted your request for phone setup help.',
    read: true,
    createdAt: '2025-11-03T12:05:00Z',
  },
  {
    id: 'notif-4',
    userId: 'sen-3',
    title: 'Request Confirmed',
    message: 'Your request "Help setting up new phone" has been accepted by Sarah Thompson.',
    read: true,
    createdAt: '2025-11-03T12:05:00Z',
  },
];

/**
 * Mock location tracking data
 */
export const mockLocationTracking: LocationTracking[] = [
  {
    requestId: 'req-3',
    volunteerId: 'vol-1',
    currentLocation: { lat: 40.7128, lng: -74.006 },
    destination: { lat: 40.7489, lng: -73.968 },
    lastUpdated: '2025-11-11T10:45:00Z',
    isActive: false,
  },
];
