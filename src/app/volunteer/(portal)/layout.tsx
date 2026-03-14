import VolunteerLayout from '@/components/layouts/VolunteerLayout';
import { AuthProvider } from '@/contexts/AuthContext';

export default function VolunteerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <AuthProvider>
      <VolunteerLayout>{children}</VolunteerLayout>
    </AuthProvider>
  );
}
