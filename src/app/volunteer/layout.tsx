export default function VolunteerRootLayout({ children }: { children: React.ReactNode }) {
  // Intentionally no nav here.
  // Routes inside (portal)/ get nav via (portal)/layout.tsx.
  // Routes outside like active/[requestId] render full-screen.
  return <>{children}</>
}
