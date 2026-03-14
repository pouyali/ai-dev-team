'use client';

import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VolunteerNotifications(): JSX.Element {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  // Filter notifications for current volunteer user
  const userNotifications = notifications.filter(n => n.userId === 'v1');
  const hasUnread = userNotifications.some(n => !n.read);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">Stay updated on your volunteer activities</p>
        </div>
        {hasUnread && (
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead} className="gap-2">
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <Card className="p-8 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notifications yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {userNotifications.map(notification => (
            <Card
              key={notification.id}
              className={cn(
                'p-4 cursor-pointer transition-colors hover:bg-gray-50',
                !notification.read && 'border-l-4 border-l-blue-500 bg-blue-50/50'
              )}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className={cn(
                    'font-medium',
                    !notification.read ? 'text-gray-900' : 'text-gray-700'
                  )}>
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(notification.createdAt)}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
