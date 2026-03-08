import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          My App
        </Link>
        <nav className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sunny Mode</span>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
