'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
  markedDates?: Date[];
}

export function Calendar({ selected, onSelect, markedDates = [] }: CalendarProps): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateMarked = (day: number): boolean => {
    return markedDates.some(markedDate => 
      markedDate.getDate() === day &&
      markedDate.getMonth() === currentMonth.getMonth() &&
      markedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDateSelected = (day: number): boolean => {
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleDateClick = (day: number): void => {
    onSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button variant="ghost" size="sm" onClick={goToNextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day !== null && (
              <button
                onClick={() => handleDateClick(day)}
                className={cn(
                  'w-full h-full flex flex-col items-center justify-center rounded-lg text-sm transition-colors relative',
                  isDateSelected(day)
                    ? 'bg-gray-900 text-white'
                    : isToday(day)
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {day}
                {isDateMarked(day) && (
                  <div
                    className={cn(
                      'absolute bottom-1 w-1.5 h-1.5 rounded-full',
                      isDateSelected(day) ? 'bg-white' : 'bg-blue-500'
                    )}
                  />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
