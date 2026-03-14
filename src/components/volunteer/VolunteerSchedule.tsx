'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { Request } from '@/types';

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time for display
 */
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get days in a month
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get first day of month (0 = Sunday, 6 = Saturday)
 */
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * VolunteerSchedule component - monthly calendar view with tasks
 */
export default function VolunteerSchedule(): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const { requests, users, startTask } = useData();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Filter tasks for current volunteer
  const myTasks = useMemo(() => {
    return requests.filter(
      req => req.volunteerId === user?.id && (req.status === 'accepted' || req.status === 'started')
    );
  }, [requests, user?.id]);

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Request[] => {
    return myTasks.filter(task => {
      const taskDate = new Date(task.scheduledDate);
      return isSameDay(taskDate, date);
    });
  };

  // Get tasks for selected date
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  // Days of week headers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  /**
   * Get senior name by ID
   */
  const getSeniorName = (seniorId: string): string => {
    const senior = users.find(u => u.id === seniorId);
    return senior?.name || 'Unknown Senior';
  };

  /**
   * Navigate to previous month
   */
  const goToPreviousMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  /**
   * Navigate to next month
   */
  const goToNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  /**
   * Handle date click
   */
  const handleDateClick = (day: number): void => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(clickedDate);
  };

  /**
   * Handle start task
   */
  const handleStartTask = (requestId: string): void => {
    startTask(requestId);
    router.push(`/volunteer/active/${requestId}`);
  };

  /**
   * Render calendar grid
   */
  const renderCalendar = (): JSX.Element => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: JSX.Element[] = [];

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 border border-gray-100" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = isSameDay(date, today);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const tasksOnDay = getTasksForDate(date);
      const hasTask = tasksOnDay.length > 0;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-12 border border-gray-100 flex flex-col items-center justify-center relative hover:bg-gray-50 transition-colors ${
            isSelected ? 'bg-gray-100' : ''
          }`}
        >
          <span
            className={`text-sm font-medium ${
              isToday
                ? 'w-7 h-7 rounded-full ring-2 ring-gray-900 flex items-center justify-center'
                : ''
            } ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}
          >
            {day}
          </span>
          {hasTask && (
            <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-7">
        {/* Day headers */}
        {daysOfWeek.map(dayName => (
          <div
            key={dayName}
            className="h-10 flex items-center justify-center text-sm font-medium text-gray-500 border border-gray-100"
          >
            {dayName}
          </div>
        ))}
        {/* Calendar days */}
        {days}
      </div>
    );
  };

  /**
   * Render task card
   */
  const renderTaskCard = (request: Request): JSX.Element => {
    const seniorName = getSeniorName(request.seniorId);
    const initials = getInitials(seniorName);

    return (
      <Card key={request.id} className="mb-4">
        <CardContent className="p-6">
          {/* Header with initials and title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <p className="text-gray-600">with {seniorName}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{request.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{request.address}</span>
            </div>
          </div>

          {/* Start Task button */}
          <Button
            onClick={() => handleStartTask(request.id)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Start Task
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600">View your upcoming volunteer commitments</p>
      </div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousMonth}
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextMonth}
              className="p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Calendar grid */}
          {renderCalendar()}
        </CardContent>
      </Card>

      {/* Selected date tasks */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tasks for {formatDate(selectedDate.toISOString())}
          </h3>
          {selectedDateTasks.length > 0 ? (
            <div>
              {selectedDateTasks.map(task => renderTaskCard(task))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No tasks scheduled for this date.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
