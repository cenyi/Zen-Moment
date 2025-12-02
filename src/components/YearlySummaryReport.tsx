'use client'

import { useState, useEffect } from 'react'
import { YearlyStats, formatYearlyTime, getYearlyPerformanceLevel } from '../utils/yearlyStatsCalculations'

interface YearlySummaryReportProps {
  yearlyStats?: YearlyStats | null
  theme: 'dark' | 'light'
}

export const YearlySummaryReport = ({ yearlyStats, theme }: YearlySummaryReportProps) => {
  const [mounted, setMounted] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState({
    meditation: 0,
    breathing: 0,
    days: 0,
    achievement: 0
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && yearlyStats) {
      const timer = setTimeout(() => {
        setAnimatedProgress({
          meditation: Math.min((yearlyStats.totalMeditationTime / 36000) * 100, 100), // 10 hours as 100%
          breathing: Math.min((yearlyStats.totalBreathingSessions / 365) * 100, 100), // 365 sessions as 100%
          days: Math.min((yearlyStats.totalPracticeDays / 365) * 100, 100), // 365 days as 100%
          achievement: yearlyStats.goalAchievementRate
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [mounted, yearlyStats])

  // Handle cases where yearlyStats data is not available yet
  if (!mounted || !yearlyStats) {
    return (
      <div className={`p-6 rounded-2xl ${
        theme === 'dark'
          ? 'neumorphic-dark border border-gray-600/35'
          : 'neumorphic border border-gray-400/40'
      }`}>
        <div className="animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const performanceLevel = getYearlyPerformanceLevel(yearlyStats)

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/20'
        : 'neumorphic border border-gray-400/25'
    }`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          📊 {yearlyStats.year} Year in Review
        </h2>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <span className={`text-lg font-semibold ${performanceLevel.color}`}>
            {performanceLevel.level}
          </span>
        </div>
        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          {performanceLevel.description}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {formatYearlyTime(yearlyStats.totalMeditationTime)}
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Total Meditation
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.meditation}%` }}
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
            {yearlyStats.totalBreathingSessions}
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Breathing Sessions
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className="h-full bg-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.breathing}%` }}
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            {yearlyStats.totalPracticeDays}
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Practice Days
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className="h-full bg-green-500 transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.days}%` }}
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
            {yearlyStats.goalAchievementRate}%
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Goal Achievement
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className="h-full bg-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${animatedProgress.achievement}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streaks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              🔥 Practice Streaks
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Longest Streak
              </span>
              <span className={`text-lg font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                {yearlyStats.longestStreak} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Current Streak
              </span>
              <span className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                {yearlyStats.currentStreak} days
              </span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              📈 Averages
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Daily Meditation
              </span>
              <span className={`text-lg font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {Math.round(yearlyStats.averageMeditationTime / 60)}m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Daily Breathing
              </span>
              <span className={`text-lg font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                {yearlyStats.averageBreathingSessions} sessions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Best & Worst Months */}
      {(yearlyStats.bestMonth || yearlyStats.worstMonth) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {yearlyStats.bestMonth && (
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏆</span>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Best Month
                </h3>
              </div>
              <div className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {yearlyStats.bestMonth.month}
              </div>
              <div className="space-y-1">
                <div className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  {yearlyStats.bestMonth.practiceDays} practice days
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  {yearlyStats.bestMonth.goalAchievementRate}% goal achievement
                </div>
              </div>
            </div>
          )}

          {yearlyStats.worstMonth && (
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌱</span>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Growth Opportunity
                </h3>
              </div>
              <div className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                {yearlyStats.worstMonth.month}
              </div>
              <div className="space-y-1">
                <div className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  {yearlyStats.worstMonth.practiceDays} practice days
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  {yearlyStats.worstMonth.goalAchievementRate}% goal achievement
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      {yearlyStats.achievements.length > 0 && (
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} mb-8`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            🎉 Yearly Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearlyStats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className={`font-semibold text-sm mb-1 ${
                      theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                      {achievement.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Progress Chart */}
      {yearlyStats.monthlyBreakdown.length > 0 && (
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            📊 Monthly Progress
          </h3>
          <div className="space-y-2">
            {yearlyStats.monthlyBreakdown.map((month, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-16 text-sm font-medium ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {month.month.substring(0, 3)}
                </div>
                <div className={`flex-1 h-6 rounded-full overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'
                }`}>
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${
                      month.goalAchievementRate >= 80 ? 'bg-green-500' :
                      month.goalAchievementRate >= 60 ? 'bg-blue-500' :
                      month.goalAchievementRate >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${month.goalAchievementRate}%` }}
                  />
                </div>
                <div className={`w-12 text-right text-sm ${
                  theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                }`}>
                  {month.goalAchievementRate}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}