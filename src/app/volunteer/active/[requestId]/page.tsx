'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import ActiveTask from '@/components/volunteer/ActiveTask';

export default function ActiveTaskPage(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;

  const handleBack = (): void => {
    router.push('/volunteer');
  };

  return <ActiveTask requestId={requestId} onBack={handleBack} />;
}
