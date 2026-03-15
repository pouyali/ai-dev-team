'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Request } from '@/types';
import { mockRequests } from '@/utils/mockData';

export interface DataContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
}

const DataContext = createContext<DataContextType>({
  requests: [],
  addRequest: () => {},
  updateRequest: () => {},
  deleteRequest: () => {},
});

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

  return (
    <DataContext.Provider value={{ requests, addRequest, updateRequest, deleteRequest }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
