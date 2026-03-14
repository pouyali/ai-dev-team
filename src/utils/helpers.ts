import { RequestStatus, Priority } from '../types';

/**
 * Format a date string to a readable format
 * @param date - ISO date string or date in YYYY-MM-DD format
 * @returns Formatted date string like "November 9, 2025"
 */
export function formatDate(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date and time to a readable format
 * @param date - ISO date string or date in YYYY-MM-DD format
 * @param time - Time string like "10:00 AM"
 * @returns Formatted date and time string like "November 9, 2025 at 10:00 AM"
 */
export function formatDateTime(date: string, time: string): string {
  const formattedDate = formatDate(date);
  return `${formattedDate} at ${time}`;
}

/**
 * Calculate the distance between two geographic coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance in miles
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

/**
 * Convert degrees to radians
 * @param deg - Degrees
 * @returns Radians
 */
function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get the Tailwind CSS color classes for a request status
 * @param status - Request status
 * @returns Tailwind CSS classes for the status badge
 */
export function getStatusColor(status: RequestStatus): string {
  const colors: Record<RequestStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    started: 'bg-indigo-100 text-indigo-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    finishing: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get the Tailwind CSS color classes for an urgency level
 * @param urgency - Urgency level
 * @returns Tailwind CSS classes for the urgency badge
 */
export function getUrgencyColor(urgency: Priority): string {
  const colors: Record<Priority, string> = {
    high: 'bg-red-600 text-white',
    medium: 'bg-gray-900 text-white',
    low: 'bg-green-600 text-white',
  };
  return colors[urgency] || 'bg-gray-900 text-white';
}

/**
 * Get initials from a full name
 * @param name - Full name
 * @returns Initials (e.g., "Sarah Thompson" -> "ST")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate an API delay for mock data operations
 * @param ms - Delay in milliseconds (default: 500)
 * @returns Promise that resolves after the delay
 */
export function simulateApiDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a status string for display
 * @param status - Request status
 * @returns Formatted status string
 */
export function formatStatus(status: RequestStatus): string {
  const statusMap: Record<RequestStatus, string> = {
    pending: 'Pending',
    accepted: 'Accepted',
    started: 'Started',
    'in-progress': 'In Progress',
    finishing: 'Finishing',
    completed: 'Completed',
    rejected: 'Rejected',
  };
  return statusMap[status] || status;
}

/**
 * Format a category string for display
 * @param category - Request category
 * @returns Formatted category string
 */
export function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    groceries: 'Groceries',
    medical: 'Medical',
    transportation: 'Transportation',
    'home-repair': 'Home Repair',
    technology: 'Technology',
    shopping: 'Shopping',
    other: 'Other',
  };
  return categoryMap[category] || category;
}
