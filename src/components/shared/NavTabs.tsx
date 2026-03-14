'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: number;
}

interface NavTabsProps {
  tabs: Tab[];
  activeTab: string;
}

/**
 * NavTabs component - horizontal navigation tabs
 */
export default function NavTabs({ tabs, activeTab }: NavTabsProps): JSX.Element {
  return (
    <div className="flex">
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
