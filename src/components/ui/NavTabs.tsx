'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'

export interface NavTab {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

interface NavTabsProps {
  tabs: NavTab[]
}

export default function NavTabs({ tabs }: NavTabsProps): JSX.Element {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              tab.href === '/volunteer'
                ? pathname === '/volunteer'
                : pathname.startsWith(tab.href)

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors relative ${
                  isActive
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </div>
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
