'use client';

import { useParams, useRouter } from 'next/navigation';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, MapPin, User } from 'lucide-react';

export default function ActiveTaskPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { getRequestById, getUserById, completeTask } = useData();
  
  const requestId = params.id as string;
  const request = getRequestById(requestId);
  const senior = request ? getUserById(request.seniorId) : undefined;

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Task not found</p>
            <Button onClick={() => router.push('/volunteer')} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = (): void => {
    completeTask(requestId);
    router.push('/volunteer');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/volunteer')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{request.title}</h1>
            <p className="text-gray-600 mb-6">{request.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5" />
                <span>With {senior?.name || 'Unknown Senior'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(request.scheduledDate)} at {formatTime(request.scheduledDate)}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5" />
                <span>{request.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>{request.address}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleComplete}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Mark as Complete
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/volunteer')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
