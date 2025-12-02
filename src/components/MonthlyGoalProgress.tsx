'use client'

import { useState, useEffect } from 'react'

interface MonthlyGoalProgressProps {
  goalAchievementRate: number
  totalDays: number
  totalPracticeDays: number
  theme: 'dark' | 'light'
}

export const MonthlyGoalProgress = ({
  goalAchievementRate,
  totalDays,
  totalPracticeDays,
  theme
}: MonthlyGoalProgressProps) => {
  const [mounted, setMounted] = useState(false)
  const [animatedRate, setAnimatedRate] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setAnimatedRate(goalAchievementRate)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [mounted, goalAchievementRate])

  if (!mounted) {
    return (
      <div className={`p-4 rounded-2xl ${
        theme === 'dark'
          ? 'neumorphic-dark border border-gray-600/20'
          : 'neumorphic border border-gray-400/25'
      }`}>
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
          <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  // Determine color based on achievement rate
  const getProgressColor = (rate: number) => {
    if (rate >= 80) return theme === 'dark' ? 'text-green-400' : 'text-green-600'
    if (rate >= 60) return theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
    if (rate >= 40) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
    return theme === 'dark' ? 'text-red-400' : 'text-red-600'
  }

  const getProgressBgColor = (rate: number) => {
    if (rate >= 80) return theme === 'dark' ? 'bg-green-400/20' : 'bg-green-100/50'
    if (rate >= 60) return theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-100/50'
    if (rate >= 40) return theme === 'dark' ? 'bg-yellow-400/20' : 'bg-yellow-100/50'
    return theme === 'dark' ? 'bg-red-400/20' : 'bg-red-100/50'
  }

  return (
    <div className={`p-3 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/20'
        : 'neumorphic border border-gray-400/25'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          🎯 Goal Achievement
        </h2>
        <div className={`text-xs px-2 py-1 rounded-full ${
          theme === 'dark' ? 'neumorphic-dark-flat' : 'neumorphic-flat'
        } ${getProgressBgColor(goalAchievementRate)}`}>
          <span className={`font-semibold ${getProgressColor(goalAchievementRate)}`}>
            {goalAchievementRate}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div>
          <div className={`flex justify-between text-sm mb-1.5 ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            <span>Days with Goal Met</span>
            <span>{totalPracticeDays} / {totalDays}</span>
          </div>
          <div className={`relative h-6 rounded-full overflow-hidden ${
            theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBgColor(goalAchievementRate)}`}
              style={{ width: `${animatedRate}%` }}
            >
              <div className="h-full flex items-center justify-end pr-2">
                {animatedRate >= 25 && (
                  <span className={`text-xs font-semibold ${getProgressColor(goalAchievementRate)}`}>
                    {Math.round(animatedRate)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
          }`}>
            <div className={`text-lg font-bold ${getProgressColor(goalAchievementRate)}`}>
              {totalPracticeDays}
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              Days
            </div>
          </div>
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
          }`}>
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              {totalDays - totalPracticeDays}
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              Rest
            </div>
          </div>
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
          }`}>
            <div className={`text-lg font-bold ${getProgressColor(goalAchievementRate)}`}>
              {totalDays > 0 ? Math.round((totalPracticeDays / totalDays) * 100) : 0}%
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              Rate
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Message */}
      <div className={`mt-2 p-1.5 rounded-lg ${
        theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
      }`}>
        <div className={`text-xs ${getProgressColor(goalAchievementRate)}`}>
          {goalAchievementRate >= 80 && "🎉 Excellent consistency!"}
          {goalAchievementRate >= 60 && goalAchievementRate < 80 && "👍 Good progress!"}
          {goalAchievementRate >= 40 && goalAchievementRate < 60 && "💪 Keep going!"}
          {goalAchievementRate < 40 && "🌱 Every journey starts small!"}
        </div>
      </div>
    </div>
  )
}