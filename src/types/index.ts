/**
 * User roles in the application
 */
export type UserRole = 'volunteer' | 'senior' | 'admin';

/**
 * Urgency level for help requests
 */
export type UrgencyLevel = 'low' | 'medium' | 'high';

/**
 * Status of a help request
 */
export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt: Date;
}

/**
 * Help request interface
 */
export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  volunteerId?: string;
  status: RequestStatus;
  urgency: UrgencyLevel;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
}

/**
 * Volunteer profile interface
 */
export interface VolunteerProfile extends User {
  role: 'volunteer';
  skills: string[];
  availability: string[];
  completedRequests: number;
}

/**
 * Senior profile interface
 */
export interface SeniorProfile extends User {
  role: 'senior';
  emergencyContact?: string;
  specialNeeds?: string[];
}
