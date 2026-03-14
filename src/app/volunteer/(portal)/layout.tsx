'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import TopBar from '@/components/shared/TopBar'
import NavTabs from '@/components/shared/NavTabs'
import { Home, Calendar, Bell, Star } from 'lucide-react'

export default function VolunteerPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, switchRole } = useAuth()

  const tabs = [
    { label: 'Requests', href: '/volunteer', icon: Home },
    { label: 'Schedule', href: '/volunteer/schedule', icon: Calendar },
    { label: 'Notifications', href: '/volunteer/notifications', icon: Bell },
    { label: 'Reviews', href: '/volunteer/reviews', icon: Star },
  ]

  // Exact match for root, prefix match for others
  const activeTab = tabs.find(t =>
    t.href === '/volunteer'
      ? pathname === '/volunteer'
      : pathname === t.href || pathname.startsWith(t.href + '/')
  )?.label ?? 'Requests'

  const handleSwitch = () => {
    if (switchRole) switchRole('senior')
    router.push('/senior')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        portalName="Volunteer Portal"
        switchLabel="Switch to Senior"
        onSwitch={handleSwitch}
      />
      <NavTabs
        tabs={tabs}
        active={activeTab}
        onChange={(label) => {
          const tab = tabs.find(t => t.label === label)
          if (tab) router.push(tab.href)
        }}
      />
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
