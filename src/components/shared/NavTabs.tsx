'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  label: string;
  icon?: LucideIcon;
  badge?: number;
}

interface NavTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (label: string) => void;
}

/**
 * Horizontal navigation tabs component with pill-style active state
 * Supports icons and notification badges
 */
export default function NavTabs({ tabs, active, onChange }: NavTabsProps): JSX.Element {
  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-2">
          {tabs.map((tab) => {
            const isActive = active === tab.label;
            const Icon = tab.icon;

            return (
              <button
                key={tab.label}
                onClick={() => onChange(tab.label)}
                className={`
                  flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                  flex-1
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
