'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Confirmation dialog component using alert dialog pattern
 * Supports different variants for danger, warning, and default actions
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps): JSX.Element | null {
  if (!isOpen) return null;

  const getConfirmButtonStyles = (): string => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'warning':
        return 'bg-yellow-600 text-white hover:bg-yellow-700';
      default:
        return 'bg-gray-900 text-white hover:bg-gray-800';
    }
  };

  const getIconColor = (): string => {
    switch (variant) {
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-start gap-4">
          {variant !== 'default' && (
            <div className={`flex-shrink-0 ${getIconColor()}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${getConfirmButtonStyles()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
