import { User, HelpRequest, Review, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'volunteer-1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@email.com',
    phone: '555-0101',
    role: 'volunteer',
    location: {
      address: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    },
    createdAt: '2024-01-15T10:00:00Z',
    rating: 4.8,
    totalReviews: 24,
    bio: 'Passionate about helping seniors in my community.',
    skills: ['Transportation', 'Technology', 'Shopping'],
    availability: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 'volunteer-2',
    name: 'John Davis',
    email: 'john.davis@email.com',
    phone: '555-0102',
    role: 'volunteer',
    location: {
      address: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    },
    createdAt: '2024-02-01T10:00:00Z',
    rating: 4.5,
    totalReviews: 12,
    bio: 'Retired teacher looking to give back.',
    skills: ['Companionship', 'Home Help'],
    availability: ['Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: 'volunteer-3',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    phone: '555-0103',
    role: 'volunteer',
    location: {
      address: '789 Pine Road',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703'
    },
    createdAt: '2024-03-01T10:00:00Z',
    rating: 5.0,
    totalReviews: 8,
    bio: 'Tech-savvy student happy to help with technology.',
    skills: ['Technology', 'Shopping'],
    availability: ['Weekends']
  },
  {
    id: 'senior-1',
    name: 'Margaret Smith',
    email: 'margaret.smith@email.com',
    phone: '555-0201',
    role: 'senior',
    location: {
      address: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    },
    createdAt: '2024-01-10T10:00:00Z',
    bio: 'Retired librarian who loves gardening.'
  },
  {
    id: 'senior-2',
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    phone: '555-0202',
    role: 'senior',
    location: {
      address: '789 Medical Center Dr',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703'
    },
    createdAt: '2024-01-20T10:00:00Z',
    bio: 'Former engineer, now enjoying retirement.'
  },
  {
    id: 'senior-3',
    name: 'Dorothy Williams',
    email: 'dorothy.williams@email.com',
    phone: '555-0203',
    role: 'senior',
    location: {
      address: '321 Elm Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    createdAt: '2024-02-05T10:00:00Z',
    bio: 'Avid reader and crossword puzzle enthusiast.'
  },
  {
    id: 'admin-1',
    name: 'Admin David',
    email: 'admin@volunteerconnect.com',
    phone: '555-0301',
    role: 'admin',
    location: {
      address: '100 Admin Building',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62700'
    },
    createdAt: '2024-01-01T10:00:00Z'
  }
];

export const mockRequests: HelpRequest[] = [
  {
    id: 'req-1',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'Shopping',
    priority: 'medium',
    status: 'pending',
    requesterId: 'senior-1',
    location: {
      address: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    },
    scheduledDate: '2025-11-09T10:00:00Z',
    estimatedDuration: '1-2 hours',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'req-2',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    requesterId: 'senior-2',
    location: {
      address: '789 Medical Center Dr',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703'
    },
    scheduledDate: '2025-11-10T14:00:00Z',
    estimatedDuration: '2-3 hours',
    createdAt: '2024-11-02T10:00:00Z',
    updatedAt: '2024-11-02T10:00:00Z'
  },
  {
    id: 'req-3',
    title: 'Help setting up new phone',
    description: 'Just got a new smartphone and need help setting it up and learning to use it.',
    category: 'Technology',
    priority: 'low',
    status: 'accepted',
    requesterId: 'senior-3',
    volunteerId: 'volunteer-3',
    location: {
      address: '321 Elm Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    scheduledDate: '2025-11-12T15:00:00Z',
    estimatedDuration: '1 hour',
    createdAt: '2024-11-03T10:00:00Z',
    updatedAt: '2024-11-04T10:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    requestId: 'req-completed-1',
    reviewerId: 'senior-1',
    revieweeId: 'volunteer-1',
    rating: 5,
    comment: 'Sarah was wonderful! She helped me with my groceries and was so patient.',
    createdAt: '2024-10-15T10:00:00Z'
  },
  {
    id: 'review-2',
    requestId: 'req-completed-2',
    reviewerId: 'senior-2',
    revieweeId: 'volunteer-1',
    rating: 5,
    comment: 'Very reliable and punctual. Made my doctor visit stress-free.',
    createdAt: '2024-10-20T10:00:00Z'
  },
  {
    id: 'review-3',
    requestId: 'req-completed-3',
    reviewerId: 'senior-3',
    revieweeId: 'volunteer-3',
    rating: 5,
    comment: 'Emily explained everything so clearly. I can now use my phone!',
    createdAt: '2024-10-25T10:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'volunteer-1',
    title: 'New Request Available',
    message: 'A new shopping assistance request is available near you.',
    type: 'request',
    read: false,
    createdAt: '2024-11-01T10:00:00Z',
    relatedRequestId: 'req-1'
  },
  {
    id: 'notif-2',
    userId: 'volunteer-1',
    title: 'Reminder: Upcoming Task',
    message: 'You have a scheduled task tomorrow at 2:00 PM.',
    type: 'reminder',
    read: false,
    createdAt: '2024-11-01T12:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'senior-1',
    title: 'Request Accepted',
    message: 'Your grocery shopping request has been accepted by a volunteer.',
    type: 'request',
    read: true,
    createdAt: '2024-10-30T10:00:00Z',
    relatedRequestId: 'req-1'
  },
  {
    id: 'notif-4',
    userId: 'volunteer-3',
    title: 'New Review Received',
    message: 'Dorothy left you a 5-star review!',
    type: 'review',
    read: true,
    createdAt: '2024-10-25T11:00:00Z'
  }
];
