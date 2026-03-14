import { RequestStatus } from '../types';

/**
 * Format a date string to a human-readable format
 * @param date - ISO date string or date in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "November 9, 2025")
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
 * Format a date and time to a human-readable format
 * @param date - ISO date string or date in YYYY-MM-DD format
 * @param time - Time string (e.g., "10:00 AM")
 * @returns Formatted date and time string (e.g., "November 9, 2025 at 10:00 AM")
 */
export function formatDateTime(date: string, time: string): string {
  return `${formatDate(date)} at ${time}`;
}

/**
 * Calculate the distance between two geographic coordinates using the Haversine formula
 * @param lat1 - Latitude of the first point
 * @param lng1 - Longitude of the first point
 * @param lat2 - Latitude of the second point
 * @param lng2 - Longitude of the second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get the Tailwind CSS color class for a request status
 * @param status - The request status
 * @returns Tailwind CSS class string for the status color
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
 * Get the Tailwind CSS color class for an urgency level
 * @param urgency - The urgency level ('low' | 'medium' | 'high')
 * @returns Tailwind CSS class string for the urgency color
 */
export function getUrgencyColor(urgency: 'low' | 'medium' | 'high' | undefined): string {
  const colors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-gray-900 text-white',
    high: 'bg-red-100 text-red-800',
  };
  return colors[urgency || 'medium'] || 'bg-gray-900 text-white';
}

/**
 * Get initials from a full name
 * @param name - Full name string
 * @returns Initials (e.g., "Sarah Thompson" → "ST")
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
 * @returns A unique string ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate an API delay for mock operations
 * @param ms - Delay in milliseconds (default: 500)
 * @returns Promise that resolves after the delay
 */
export function simulateApiDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}