'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import ActiveTask from '@/components/volunteer/ActiveTask';

export default function ActiveTaskPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;

  const handleBack = (): void => {
    router.push('/volunteer');
  };

  return <ActiveTask requestId={requestId} onBack={handleBack} />;
}
