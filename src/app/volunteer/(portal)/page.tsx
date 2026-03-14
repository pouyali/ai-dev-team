'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import VolunteerRequests from '@/components/volunteer/VolunteerRequests';

export default function VolunteerRequestsPage(): JSX.Element {
  const router = useRouter();

  const handleNavigateToActiveTask = (requestId: string): void => {
    router.push(`/volunteer/active/${requestId}`);
  };

  return <VolunteerRequests onNavigateToActiveTask={handleNavigateToActiveTask} />;
}
