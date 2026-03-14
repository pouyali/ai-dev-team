'use client';

import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import { HelpRequest } from '@/types';

export default function VolunteerSchedule(): JSX.Element {
  const { getAcceptedRequests } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const acceptedRequests = getAcceptedRequests();

  // Parse dates from requests to mark on calendar
  const markedDates = acceptedRequests.map(req => {
    // Parse "November 11, 2025" format
    const date = new Date(req.date);
    return date;
  });

  // Get tasks for selected date
  const selectedDateStr = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const tasksForSelectedDate = acceptedRequests.filter(req => {
    const reqDate = new Date(req.date);
    return (
      reqDate.getDate() === selectedDate.getDate() &&
      reqDate.getMonth() === selectedDate.getMonth() &&
      reqDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
        <p className="text-gray-600">View your upcoming volunteer commitments</p>
      </div>

      <Calendar
        selected={selectedDate}
        onSelect={setSelectedDate}
        markedDates={markedDates}
      />

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Tasks for {selectedDateStr}
        </h3>
        {tasksForSelectedDate.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-500">No tasks scheduled for this day.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {tasksForSelectedDate.map((task: HelpRequest) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={task.seniorName} size="sm" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500">with {task.seniorName}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {task.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
