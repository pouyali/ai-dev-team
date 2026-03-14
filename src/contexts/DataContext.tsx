'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Request {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  seniorId: string;
  volunteerId?: string;
  createdAt: Date;
}

interface DataContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]);

  const addRequest = (request: Omit<Request, 'id' | 'createdAt'>) => {
    const newRequest: Request = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const updateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, ...updates } : req))
    );
  };

  return (
    <DataContext.Provider value={{ requests, addRequest, updateRequest }}>
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
