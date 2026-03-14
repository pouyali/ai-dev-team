import { User, HelpRequest, Review, Notification } from '../types';

/**
 * Mock users for development and testing
 */
export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Sarah Thompson',
    email: 'sarah@volunteer.com',
    role: 'volunteer',
    phone: '(555) 123-4567',
    address: '123 Main St, Springfield',
    bio: 'Passionate about helping seniors in my community.',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user_2',
    name: 'Margaret Smith',
    email: 'margaret@senior.com',
    role: 'senior',
    phone: '(555) 234-5678',
    address: '456 Oak Avenue, Springfield',
    bio: 'Retired teacher, love gardening and reading.',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'user_3',
    name: 'Robert Johnson',
    email: 'robert@senior.com',
    role: 'senior',
    phone: '(555) 345-6789',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 'user_4',
    name: 'Admin User',
    email: 'admin@volunteerconnect.com',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user_5',
    name: 'James Wilson',
    email: 'james@volunteer.com',
    role: 'volunteer',
    phone: '(555) 456-7890',
    address: '321 Elm Street, Springfield',
    bio: 'Weekend volunteer, happy to help with transportation.',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'user_6',
    name: 'Dorothy Miller',
    email: 'dorothy@senior.com',
    role: 'senior',
    phone: '(555) 567-8901',
    address: '654 Pine Road, Springfield',
    createdAt: '2024-01-18T10:00:00Z',
  },
];

/**
 * Mock help requests for development and testing
 */
export const mockRequests: HelpRequest[] = [
  {
    id: 'req_1',
    seniorId: 'user_2',
    title: 'Help with grocery shopping',
    description: 'Need assistance picking up groceries from the local supermarket. I have a list ready.',
    category: 'Shopping',
    priority: 'medium',
    status: 'pending',
    scheduledDate: 'November 9, 2025',
    scheduledTime: '10:00 AM',
    duration: '1-2 hours',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
  },
  {
    id: 'req_2',
    seniorId: 'user_3',
    title: 'Ride to medical appointment',
    description: "I need a ride to my doctor's appointment. Round trip needed.",
    category: 'Transportation',
    priority: 'high',
    status: 'pending',
    scheduledDate: 'November 10, 2025',
    scheduledTime: '2:00 PM',
    duration: '2-3 hours',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2024-11-02T10:00:00Z',
    updatedAt: '2024-11-02T10:00:00Z',
  },
  {
    id: 'req_3',
    seniorId: 'user_6',
    title: 'Help setting up new phone',
    description: 'Just got a new smartphone and need help setting it up and learning how to use basic features.',
    category: 'Technology',
    priority: 'low',
    status: 'pending',
    scheduledDate: 'November 12, 2025',
    scheduledTime: '3:00 PM',
    duration: '1 hour',
    address: '654 Pine Road, Springfield',
    createdAt: '2024-11-03T10:00:00Z',
    updatedAt: '2024-11-03T10:00:00Z',
  },
  {
    id: 'req_4',
    seniorId: 'user_2',
    volunteerId: 'user_1',
    title: 'Weekly companionship visit',
    description: 'Looking for someone to chat with and maybe play some card games.',
    category: 'Companionship',
    priority: 'medium',
    status: 'accepted',
    scheduledDate: 'November 15, 2025',
    scheduledTime: '2:00 PM',
    duration: '2 hours',
    address: '456 Oak Avenue, Springfield',
    createdAt: '2024-11-04T10:00:00Z',
    updatedAt: '2024-11-05T10:00:00Z',
  },
  {
    id: 'req_5',
    seniorId: 'user_3',
    volunteerId: 'user_5',
    title: 'Help with yard work',
    description: 'Need help raking leaves and cleaning gutters before winter.',
    category: 'Household',
    priority: 'medium',
    status: 'completed',
    scheduledDate: 'November 1, 2025',
    scheduledTime: '9:00 AM',
    duration: '3 hours',
    address: '789 Medical Center Dr, Springfield',
    createdAt: '2024-10-25T10:00:00Z',
    updatedAt: '2024-11-01T15:00:00Z',
  },
];

/**
 * Mock reviews for development and testing
 */
export const mockReviews: Review[] = [
  {
    id: 'rev_1',
    requestId: 'req_5',
    reviewerId: 'user_3',
    revieweeId: 'user_5',
    rating: 5,
    comment: 'James was wonderful! He did an amazing job with the yard work and was very friendly.',
    createdAt: '2024-11-01T16:00:00Z',
  },
  {
    id: 'rev_2',
    requestId: 'req_5',
    reviewerId: 'user_5',
    revieweeId: 'user_3',
    rating: 5,
    comment: 'Robert was very kind and appreciative. Great experience helping him.',
    createdAt: '2024-11-01T17:00:00Z',
  },
];

/**
 * Mock notifications for development and testing
 */
export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_1',
    type: 'request_accepted',
    title: 'Request Accepted',
    message: 'You have been matched with Margaret Smith for grocery shopping assistance.',
    read: false,
    relatedRequestId: 'req_4',
    createdAt: '2024-11-05T10:00:00Z',
  },
  {
    id: 'notif_2',
    userId: 'user_1',
    type: 'reminder',
    title: 'Upcoming Task Reminder',
    message: 'You have a scheduled visit with Margaret Smith tomorrow at 2:00 PM.',
    read: false,
    relatedRequestId: 'req_4',
    createdAt: '2024-11-14T10:00:00Z',
  },
  {
    id: 'notif_3',
    userId: 'user_2',
    type: 'request_accepted',
    title: 'Volunteer Found',
    message: 'Sarah Thompson has accepted your request for companionship visit.',
    read: true,
    relatedRequestId: 'req_4',
    createdAt: '2024-11-05T10:00:00Z',
  },
  {
    id: 'notif_4',
    userId: 'user_5',
    type: 'new_review',
    title: 'New Review Received',
    message: 'Robert Johnson left you a 5-star review!',
    read: true,
    relatedRequestId: 'req_5',
    createdAt: '2024-11-01T16:00:00Z',
  },
];

/**
 * Helper function to get user by ID
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

/**
 * Helper function to get requests by senior ID
 */
export function getRequestsBySeniorId(seniorId: string): HelpRequest[] {
  return mockRequests.filter((request) => request.seniorId === seniorId);
}

/**
 * Helper function to get requests by volunteer ID
 */
export function getRequestsByVolunteerId(volunteerId: string): HelpRequest[] {
  return mockRequests.filter((request) => request.volunteerId === volunteerId);
}

/**
 * Helper function to get pending requests (for volunteers to browse)
 */
export function getPendingRequests(): HelpRequest[] {
  return mockRequests.filter((request) => request.status === 'pending');
}

/**
 * Helper function to get notifications by user ID
 */
export function getNotificationsByUserId(userId: string): Notification[] {
  return mockNotifications.filter((notification) => notification.userId === userId);
}

/**
 * Helper function to get reviews for a user
 */
export function getReviewsForUser(userId: string): Review[] {
  return mockReviews.filter((review) => review.revieweeId === userId);
}
