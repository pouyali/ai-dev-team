export default function ActiveRequestPage({ params }: { params: { requestId: string } }) {
  return <div className="p-4 text-gray-500">Active Request {params.requestId} — coming in phase 3b</div>
}
