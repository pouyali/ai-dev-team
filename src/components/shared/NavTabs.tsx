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
    <nav className="bg-gray-100 px-4 py-2">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          const Icon = tab.icon;

          return (
            <button
              key={tab.label}
              onClick={() => onChange(tab.label)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }
              `}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-semibold text-white bg-red-500 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
