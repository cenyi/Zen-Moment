'use client'

import { useMemo } from 'react'
import { useTimerStore } from '../store/timerStore'

interface WeeklyTrendChartProps {
  theme: 'dark' | 'light'
}

export function WeeklyTrendChart({ theme }: WeeklyTrendChartProps) {
  const { getWeeklyData } = useTimerStore()

  const weeklyData = useMemo(() => getWeeklyData(), [getWeeklyData])

  const formatMinutes = (seconds: number) => {
    const minutes = Math.round(seconds / 60)
    if (minutes === 0) return '0m'
    return `${minutes}m`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const maxValue = useMemo(() => {
    const max = Math.max(...weeklyData.map(d => d.meditationDuration))
    return max > 0 ? max : 60 // 默认60秒作为最小值
  }, [weeklyData])

  const getBarHeight = (value: number) => {
    return maxValue > 0 ? (value / maxValue) * 100 : 0
  }

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${
        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
      }`}>
        📈 Weekly Progress
      </h3>

      <div className="space-y-4">
        {/* 图表区域 */}
        <div className="relative h-40 flex items-end justify-between gap-2 px-2">
          {weeklyData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              {/* 柱状图 */}
              <div className="relative w-full flex flex-col items-center justify-end">
                <div
                  className={`w-full max-w-8 rounded-t-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    theme === 'dark'
                      ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                      : 'bg-gradient-to-t from-blue-800 to-blue-700 shadow-blue-800/30'
                  }`}
                  style={{
                    height: `${getBarHeight(day.meditationDuration)}%`,
                    minHeight: day.meditationDuration > 0 ? '4px' : '0'
                  }}
                />

                {/* 数值标签 */}
                {day.meditationDuration > 0 && (
                  <div className={`absolute -top-6 text-xs font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
                  }`}>
                    {formatMinutes(day.meditationDuration)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* X轴标签 */}
        <div className="flex justify-between px-2 mt-2">
          {weeklyData.map((day) => (
            <div key={day.date} className={`flex-1 text-center text-xs font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-800'
            }`}>
              {formatDate(day.date)}
            </div>
          ))}
        </div>

        {/* 图例 */}
        <div className={`flex items-center justify-center gap-4 mt-4 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded shadow-sm ${
              theme === 'dark'
                ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                : 'bg-gradient-to-t from-blue-800 to-blue-700'
            }`} />
            <span className={`text-xs font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-800'
            }`}>
              Meditation Time
            </span>
          </div>

          <div className={`text-xs font-medium ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Total: {formatMinutes(weeklyData.reduce((sum, day) => sum + day.meditationDuration, 0))}
          </div>
        </div>

        {/* 空状态 */}
        {weeklyData.every(day => day.meditationDuration === 0) && (
          <div className={`text-center py-8 text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Start meditating to see your weekly progress here 🧘‍♀️
          </div>
        )}
      </div>
    </div>
  )
}