'use client'

import { useState, useEffect } from 'react'

export type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all'

interface TimeRangeSelectorProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
  theme: 'dark' | 'light'
}

export const TimeRangeSelector = ({ value, onChange, theme }: TimeRangeSelectorProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="animate-pulse h-10 w-64 rounded-2xl bg-gray-200 dark:bg-gray-700" />
  }

  const timeRanges: Array<{ value: TimeRange; label: string; description: string }> = [
    { value: 'today', label: 'Today', description: "Today's statistics" },
    { value: 'week', label: 'Week', description: 'Last 7 days' },
    { value: 'month', label: 'Month', description: 'Current month' },
    { value: 'quarter', label: 'Quarter', description: 'Last 3 months' },
    { value: 'year', label: 'Year', description: 'Current year' },
    { value: 'all', label: 'All Time', description: 'All recorded data' }
  ]

  return (
    <div className={`inline-flex p-1 rounded-2xl ${
      theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
    }`}>
      {timeRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
            value === range.value
              ? theme === 'dark'
                ? 'bg-blue-600/20 text-blue-400 shadow-lg'
                : 'bg-blue-100/80 text-blue-700 shadow-lg'
              : theme === 'dark'
                ? 'text-neumorphic-tips-dark hover:text-neumorphic-tips-light'
                : 'text-neumorphic-tips-light hover:text-neumorphic-tips-dark'
          }`}
          title={range.description}
        >
          {range.label}
        </button>
      ))}
    </div>
  )
}