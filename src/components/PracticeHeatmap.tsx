'use client'

import { useMemo } from 'react'
import { useTimerStore } from '../store/timerStore'

interface PracticeHeatmapProps {
  theme: 'dark' | 'light'
}

export function PracticeHeatmap({ theme }: PracticeHeatmapProps) {
  const { getHeatmapData } = useTimerStore()

  const heatmapData = useMemo(() => getHeatmapData(), [getHeatmapData])

  // 将数据按周分组（12周，每周7天）
  const weeks = useMemo(() => {
    const weekData = []
    for (let i = 0; i < 12; i++) {
      const weekStart = i * 7
      const week = heatmapData.slice(weekStart, weekStart + 7)
      weekData.push(week)
    }
    return weekData
  }, [heatmapData])

  const getIntensityColor = (intensity: number) => {
    const colors = {
      0: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200',
      1: theme === 'dark' ? 'bg-green-900' : 'bg-green-200',
      2: theme === 'dark' ? 'bg-green-700' : 'bg-green-400',
      3: theme === 'dark' ? 'bg-green-500' : 'bg-green-600',
      4: theme === 'dark' ? 'bg-green-400' : 'bg-green-700'
    }
    return colors[intensity as keyof typeof colors] || colors[0]
  }

  const getIntensityLabel = (intensity: number) => {
    const labels = {
      0: 'No practice',
      1: 'Light practice (1-5 min)',
      2: 'Moderate practice (5-15 min)',
      3: 'Good practice (15-30 min)',
      4: 'Excellent practice (30+ min)'
    }
    return labels[intensity as keyof typeof labels] || labels[0]
  }

  const months = useMemo(() => {
    const monthNames = []
    const today = new Date()

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today)
      date.setMonth(today.getMonth() - i)
      monthNames.push(date.toLocaleDateString('en-US', { month: 'short' }))
    }

    return monthNames
  }, [])

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  // 计算统计信息
  const stats = useMemo(() => {
    const practicedDays = heatmapData.filter(d => d.intensity > 0).length
    const totalDays = heatmapData.length
    const currentStreak = calculateCurrentStreak(heatmapData)
    const longestStreak = calculateLongestStreak(heatmapData)

    return {
      practicedDays,
      totalDays,
      practiceRate: totalDays > 0 ? Math.round((practicedDays / totalDays) * 100) : 0,
      currentStreak,
      longestStreak
    }
  }, [heatmapData])

  function calculateCurrentStreak(data: Array<{ date: string; intensity: number }>) {
    let streak = 0
    const today = new Date().toISOString().split('T')[0]

    // 从今天开始往前找连续练习的天数
    for (let i = 0; i < data.length; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const dayData = data.find(d => d.date === dateStr)
      if (dayData && dayData.intensity > 0) {
        streak++
      } else if (i > 0) { // 允许今天没有练习，但之前有连续记录
        break
      }
    }

    return streak
  }

  function calculateLongestStreak(data: Array<{ date: string; intensity: number }>) {
    let longestStreak = 0
    let currentStreak = 0

    data.forEach(day => {
      if (day.intensity > 0) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    })

    return longestStreak
  }

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/35'
        : 'neumorphic border border-gray-400/40'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${
        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
      }`}>
        📅 Practice Heatmap
      </h3>

      <div className="space-y-4">
        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              {stats.practiceRate}%
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Practice Rate
            </div>
          </div>

          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {stats.currentStreak}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Current Streak
            </div>
          </div>

          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {stats.longestStreak}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Longest Streak
            </div>
          </div>

          <div className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <div className={`text-lg font-bold ${
              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
            }`}>
              {stats.practicedDays}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Days Practiced
            </div>
          </div>
        </div>

        {/* 热力图 */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* 月份标签 */}
            <div className="flex mb-2">
              <div className="w-8" /> {/* 星期标签的空间 */}
              {months.map((month, index) => (
                <div key={index} className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} style={{ width: '28px' }}>
                  {index % 4 === 0 ? month : ''}
                </div>
              ))}
            </div>

            {/* 星期标签 + 热力图格子 */}
            <div className="flex">
              {/* 星期标签 */}
              <div className="flex flex-col mr-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`text-xs mb-1 h-4 flex items-center justify-center ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}
                    style={{ width: '28px' }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 热力图格子 */}
              <div className="flex flex-col">
                {weekDays.map((_, dayIndex) => (
                  <div key={dayIndex} className="flex mb-1">
                    {weeks.map((week, weekIndex) => {
                      const dayData = week[dayIndex]
                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-4 h-4 rounded-sm transition-all duration-300 cursor-help hover:scale-125 hover:z-10 ${
                            dayData?.intensity && dayData.intensity > 0
                              ? theme === 'dark'
                                ? 'shadow-neumorphic-dark hover:shadow-neumorphic-dark-hover hover:-translate-y-1'
                                : 'shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1'
                              : ''
                          } ${getIntensityColor(dayData?.intensity || 0)}`}
                          title={`${dayData?.date || ''}: ${getIntensityLabel(dayData?.intensity || 0)}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 图例 */}
        <div className={`flex items-center justify-center gap-4 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <span className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Less
          </span>
          {[0, 1, 2, 3, 4].map((intensity) => (
            <div
              key={intensity}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
            />
          ))}
          <span className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            More
          </span>
        </div>

        {/* 提示信息 */}
        <div className={`text-center text-xs ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Hover over squares to see details • Showing last 12 weeks of practice
        </div>
      </div>
    </div>
  )
}