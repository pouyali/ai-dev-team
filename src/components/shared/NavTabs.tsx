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
 * Horizontal navigation tabs component with pill-style styling
 * Supports icons and notification badges
 */
export default function NavTabs({ tabs, active, onChange }: NavTabsProps): JSX.Element {
  return (
    <div className="bg-gray-100 px-6 py-2">
      <nav className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.label;
          const Icon = tab.icon;

          return (
            <button
              key={tab.label}
              onClick={() => onChange(tab.label)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })})
      </nav>
    </div>
  );
}
