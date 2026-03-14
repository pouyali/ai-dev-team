'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useData } from '@/contexts/DataContext'
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react'

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

const dotColor: Record<string, string> = {
  pending: 'bg-gray-400',
  accepted: 'bg-blue-500',
  started: 'bg-purple-500',
  'in-progress': 'bg-purple-600',
  completed: 'bg-green-500',
}

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDaysInMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDow = firstDay.getDay() // 0=Sun
  const days: (Date | null)[] = []

  // Pad start
  for (let i = 0; i < startDow; i++) {
    days.push(null)
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d))
  }

  // Pad end to complete last row
  while (days.length % 7 !== 0) {
    days.push(null)
  }

  return days
}

export default function VolunteerSchedule() {
  const { user } = useAuth()
  const { requests, startTask } = useData()
  const router = useRouter()

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const tasks = requests.filter((r) => r.volunteerId === user?.id)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const days = getDaysInMonthGrid(year, month)
  const today = new Date()

  const selectedDayTasks = selectedDate
    ? tasks.filter((t) => isSameDay(new Date(t.scheduledDate), selectedDate))
    : []

  const handleStartTask = async (requestId: string) => {
    await startTask(requestId)
    router.push(`/volunteer/active/${requestId}`)
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-500 mt-1">View your volunteer calendar</p>
      </div>

      {/* Calendar card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {days.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="h-10" />
            }

            const hasTask = tasks.some((t) =>
              isSameDay(new Date(t.scheduledDate), day)
            )
            const isToday = isSameDay(day, today)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

            const tasksForDay = tasks.filter((t) =>
              isSameDay(new Date(t.scheduledDate), day)
            )

            return (
              <button
                key={day.toISOString()}
                onClick={() =>
                  setSelectedDate((prev) =>
                    prev && isSameDay(prev, day) ? null : day
                  )
                }
                className={`relative flex flex-col items-center justify-center h-10 rounded-xl text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700'
                    : isToday
                    ? 'ring-2 ring-blue-500 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{day.getDate()}</span>
                {hasTask && (
                  <div className="flex gap-0.5 mt-0.5">
                    {tasksForDay.slice(0, 3).map((t) => (
                      <span
                        key={t.id}
                        className={`w-1.5 h-1.5 rounded-full ${
                          dotColor[t.status] ?? 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-1">
        {Object.entries(dotColor).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs text-gray-500 capitalize">{status}</span>
          </div>
        ))}
      </div>

      {/* Selected day panel */}
      {selectedDate !== null && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h3>

          {selectedDayTasks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <p className="text-gray-400">No tasks on this day</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDayTasks.map((request) => (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm flex-shrink-0">
                      {getInitials(request.seniorName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base leading-tight">
                        {request.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">with {request.seniorName}</p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                        request.status === 'accepted'
                          ? 'bg-blue-100 text-blue-700'
                          : request.status === 'started'
                          ? 'bg-purple-100 text-purple-700'
                          : request.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>
                        {request.scheduledDate} at {request.scheduledTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{request.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{request.location?.address ?? request.location}</span>
                    </div>
                  </div>

                  {/* Action */}
                  {['accepted', 'started'].includes(request.status) && (
                    <button
                      onClick={() => handleStartTask(request.id)}
                      className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Start Task
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
