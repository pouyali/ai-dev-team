'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Request {
  id: string;
  title: string;
  description: string;
  seniorId: string;
  volunteerId?: string;
  status: 'pending' | 'accepted' | 'started' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  scheduledDate?: string;
  location?: { lat: number; lng: number };
}

export interface DataContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockRequests: Request[] = [
  {
    id: '1',
    title: 'Grocery Shopping Help',
    description: 'Need help with weekly grocery shopping',
    seniorId: '2',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    description: 'Need a ride to the doctor on Friday',
    seniorId: '2',
    volunteerId: '1',
    status: 'accepted',
    createdAt: new Date().toISOString(),
    scheduledDate: '2024-01-15',
  },
];

export function DataProvider({ children }: { children: ReactNode }): JSX.Element {
  const [requests, setRequests] = useState<Request[]>(mockRequests);

  const addRequest = (request: Omit<Request, 'id' | 'createdAt'>) => {
    const newRequest: Request = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const value: DataContextType = {
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
