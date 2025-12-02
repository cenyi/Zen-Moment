'use client'

import { useMemo } from 'react'
import { useTimerStore } from '../store/timerStore'
import { formatTime } from '../utils/timeFormatters'

interface GoalProgressRingProps {
  theme: 'dark' | 'light'
}

export function GoalProgressRing({ theme }: GoalProgressRingProps) {
  const { todayDuration, dailyGoalMinutes } = useTimerStore()

  const progress = useMemo(() => {
    const goalSeconds = dailyGoalMinutes * 60
    return Math.min(todayDuration / goalSeconds, 1)
  }, [todayDuration, dailyGoalMinutes])

  const progressPercentage = Math.round(progress * 100)
  const remainingMinutes = Math.max(0, dailyGoalMinutes - Math.round(todayDuration / 60))

  // SVG环形图参数
  const radius = 80
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress * circumference)

  
  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 text-center ${
        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
      }`}>
        🎯 Daily Goal
      </h3>

      <div className="flex flex-col items-center">
        {/* 环形进度图 */}
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* 背景圆环 */}
            <circle
              stroke={theme === 'dark' ? 'var(--neumorphic-dark-border)' : 'var(--neumorphic-light-border)'}
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* 进度圆环 */}
            <circle
              stroke={progress >= 1
                ? (theme === 'dark' ? '#10b981' : '#059669')
                : (theme === 'dark' ? '#3b82f6' : '#1d4ed8')
              }
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.5s ease-in-out'
              }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={`drop-shadow-sm ${
                theme === 'dark' ? '' : 'shadow-blue-500/20'
              }`}
            />
          </svg>

          {/* 中心文字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold transition-colors duration-300 ${
              progress >= 1
                ? (theme === 'dark' ? 'text-green-400' : 'text-green-700')
                : (theme === 'dark' ? 'text-blue-400' : 'text-blue-800')
            }`}>
              {progressPercentage}%
            </div>
            <div className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
            }`}>
              {formatTime(todayDuration)}
            </div>
          </div>
        </div>

        {/* 目标信息 */}
        <div className="mt-6 text-center space-y-2">
          <div className={`text-lg font-medium ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            {progress >= 1 ? (
              <span className="text-green-500">🎉 Goal Achieved!</span>
            ) : (
              <span>{remainingMinutes}m to go</span>
            )}
          </div>

          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Daily target: {dailyGoalMinutes} minutes
          </div>
        </div>

        {/* 快速调整目标按钮 */}
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Adjust:
          </span>
          <div className="flex gap-1">
            {[10, 15, 30, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => {
                  const { setDailyGoal } = useTimerStore.getState()
                  setDailyGoal(minutes)
                }}
                className={`px-2 py-1 text-xs rounded-md transition-all duration-200 hover:scale-105 ${
                  dailyGoalMinutes === minutes
                    ? (theme === 'dark'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-700 text-white shadow-blue-700/30')
                    : (theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md')
                }`}
              >
                {minutes}m
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}