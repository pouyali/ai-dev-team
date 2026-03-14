import ActiveTask from '@/components/volunteer/ActiveTask'

export default function ActiveTaskPage({ params }: { params: { requestId: string } }) {
  return <ActiveTask requestId={params.requestId} />
}
