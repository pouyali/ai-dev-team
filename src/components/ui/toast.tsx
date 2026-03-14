'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>): void => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = React.useCallback((id: string): void => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer(): JSX.Element {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'flex items-start gap-3 rounded-lg border p-4 shadow-lg bg-white min-w-[300px] max-w-[400px] animate-in slide-in-from-right',
            toast.variant === 'success' && 'border-green-200 bg-green-50',
            toast.variant === 'error' && 'border-red-200 bg-red-50',
            toast.variant === 'info' && 'border-blue-200 bg-blue-50'
          )}
        >
          {toast.variant === 'success' && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />}
          {toast.variant === 'error' && <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />}
          {toast.variant === 'info' && <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />}
          <div className="flex-1">
            <p className="font-medium text-sm">{toast.title}</p>
            {toast.description && (
              <p className="text-sm text-gray-500 mt-1">{toast.description}</p>
            )}
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
