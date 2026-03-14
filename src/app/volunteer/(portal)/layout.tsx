import VolunteerLayout from '@/components/layouts/VolunteerLayout';

export default function VolunteerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <VolunteerLayout>{children}</VolunteerLayout>;
}
