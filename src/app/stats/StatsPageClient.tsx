'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTimerStore } from '../../store/timerStore'
import { TimeRangeSelector, TimeRange } from '../../components/TimeRangeSelector'
import { calculateStatsByTimeRange, getTimeRangeDisplay } from '../../utils/statsCalculations'
import { formatTime } from '../../utils/timeFormatters'
import { calculateYearlyStats } from '../../utils/yearlyStatsCalculations'
import { analyzePracticeHabits } from '../../utils/habitAnalysisCalculations'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'

import { NeumorphicSkeleton } from '../../components/NeumorphicSkeleton'

// Lazy load visualization components to reduce initial bundle size
const WeeklyTrendChart = dynamic(() => import('../../components/WeeklyTrendChart').then(mod => ({ default: mod.WeeklyTrendChart })), {
  loading: () => <NeumorphicSkeleton type="chart" theme="light" />,
  ssr: false
})

const GoalProgressRing = dynamic(() => import('../../components/GoalProgressRing').then(mod => ({ default: mod.GoalProgressRing })), {
  loading: () => <NeumorphicSkeleton type="circle" theme="light" />,
  ssr: false
})

const PracticeHeatmap = dynamic(() => import('../../components/PracticeHeatmap').then(mod => ({ default: mod.PracticeHeatmap })), {
  loading: () => <NeumorphicSkeleton type="chart" height="h-64" theme="light" />,
  ssr: false
})

const AchievementBadges = dynamic(() => import('../../components/AchievementBadges').then(mod => ({ default: mod.AchievementBadges })), {
  loading: () => <NeumorphicSkeleton type="chart" height="h-96" theme="light" />,
  ssr: false
})

const PracticeDistributionChart = dynamic(() => import('../../components/PracticeDistributionChart').then(mod => ({ default: mod.PracticeDistributionChart })), {
  loading: () => <NeumorphicSkeleton type="chart" theme="light" />,
  ssr: false
})

// New monthly components
const MonthlyTrendChart = dynamic(() => import('../../components/MonthlyTrendChart').then(mod => ({ default: mod.MonthlyTrendChart })), {
  loading: () => <NeumorphicSkeleton type="chart" theme="light" />,
  ssr: false
})

const MonthlyGoalProgress = dynamic(() => import('../../components/MonthlyGoalProgress').then(mod => ({ default: mod.MonthlyGoalProgress })), {
  loading: () => <NeumorphicSkeleton type="card" theme="light" />,
  ssr: false
})

// Yearly summary component
const YearlySummaryReport = dynamic(() => import('../../components/YearlySummaryReport').then(mod => ({ default: mod.YearlySummaryReport })), {
  loading: () => <NeumorphicSkeleton type="chart" height="h-96" theme="light" />,
  ssr: false
})

// Habit analysis component
const PracticeHabitAnalysis = dynamic(() => import('../../components/PracticeHabitAnalysis').then(mod => ({ default: mod.PracticeHabitAnalysis })), {
  loading: () => <NeumorphicSkeleton type="chart" height="h-96" theme="light" />,
  ssr: false
})

export default function StatsPageClient() {
  const {
    todayDuration,
    totalDuration,
    completedCycles,
    breathingSessions,
    todayMeditationSessions,
    todayBreathingSessions,
    streak,
    theme,
    toggleTheme,
    dailyHistory,
    achievements,
    updateDailyHistory,
    checkAchievements,
    calculateStreak
  } = useTimerStore()

  const [mounted, setMounted] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('month')

  useEffect(() => {
    setMounted(true)
  }, [])

  // 鏇存柊鍘嗗彶鏁版嵁銆佹鏌ユ垚灏卞拰璁＄畻杩炵画澶╂暟
  useEffect(() => {
    if (mounted) {
      updateDailyHistory()
      checkAchievements()
      calculateStreak() // 閲嶆柊璁＄畻杩炵画澶╂暟
    }
  }, [todayDuration, breathingSessions, updateDailyHistory, checkAchievements, calculateStreak])

  // 璁＄畻鏈€杩?0澶╃粌涔犵巼鐨勮緟鍔╁嚱鏁?
  const calculateLast30DaysPracticeRate = () => {
    const last30Days = []
    const today = new Date()

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      last30Days.push(dateStr)
    }

    const practiceDaysInLast30 = last30Days.filter(date =>
      dailyHistory[date] && (
        dailyHistory[date].meditationDuration > 0 ||
        dailyHistory[date].breathingSessions > 0
      )).length

    return Math.round((practiceDaysInLast30 / 30) * 100)
  }

  // 璁＄畻缁熻鏁版嵁 - 绉诲埌鏉′欢杩斿洖涔嬪墠
  const currentYear = new Date().getFullYear()
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 璁＄畻鏈堝害缁熻鏁版嵁 (渚濊禆selectedTimeRange)
  const monthlyStats = calculateStatsByTimeRange(dailyHistory, selectedTimeRange)

  // 璁＄畻骞村害缁熻鏁版嵁 (涓嶄緷璧杝electedTimeRange锛屼娇鐢╱seMemo浼樺寲)
  const yearlyStats = useMemo(() => calculateYearlyStats(dailyHistory, currentYear), [dailyHistory, currentYear])

  // 璁＄畻涔犳儻鍒嗘瀽鏁版嵁 (涓嶄緷璧杝electedTimeRange锛屼娇鐢╱seMemo浼樺寲)
  const habitAnalysis = useMemo(() => analyzePracticeHabits(dailyHistory), [dailyHistory])

  // 璁＄畻缁熻鏁版嵁
  const avgSessionTime = completedCycles > 0 ? Math.round(todayDuration / completedCycles) : 0
  const totalTimeInHours = Math.round(totalDuration / 3600 * 10) / 10

  // 闃叉 hydration 涓嶅尮閰?
  if (!mounted) {
    return null
  }

  // 瀵煎嚭缁熻鏁版嵁鐨勫嚱鏁?
  const exportStats = (format: 'json' | 'csv' | 'summary') => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]

    if (format === 'json') {
      // JSON鏍煎紡 - 瀹屾暣鏁版嵁瀵煎嚭
      const stats = {
        exportInfo: {
          exportDate: now.toISOString(),
          appVersion: 'Zen Moment v1.0',
          format: 'json'
        },
        summary: {
          todayMeditation: formatTime(todayDuration),
          totalMeditation: formatTime(totalDuration),
          totalSessions: completedCycles + breathingSessions,
          breathingSessions: breathingSessions,
          currentStreak: streak,
          dailyGoalMinutes: useTimerStore.getState().dailyGoalMinutes
        },
        detailedHistory: dailyHistory,
        achievements: achievements
      }

      const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zen-moment-stats-${dateStr}.json`
      a.click()
      URL.revokeObjectURL(url)

    } else if (format === 'csv') {
      // CSV鏍煎紡 - 鍘嗗彶鏁版嵁瀵煎嚭
      const csvHeaders = ['Date', 'Meditation Duration (seconds)', 'Breathing Sessions', 'Total Practice (minutes)']
      const csvRows = [csvHeaders.join(',')]

      // CSV瀛楁杞箟鍑芥暟
      const escapeCSVField = (field: any) => {
        const stringField = String(field)
        if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
          return `"${stringField.replace(/"/g, '""')}"`
        }
        return stringField
      }

      Object.entries(dailyHistory)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([date, data]) => {
          const totalMinutes = Math.round(data.meditationDuration / 60 + data.breathingSessions * 3)
          csvRows.push([
            escapeCSVField(date),
            escapeCSVField(data.meditationDuration),
            escapeCSVField(data.breathingSessions),
            escapeCSVField(totalMinutes)
          ].join(','))
        })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zen-moment-history-${dateStr}.csv`
      a.click()
      URL.revokeObjectURL(url)

    } else if (format === 'summary') {
      // 绠€鍗曟枃鏈牸寮?- 鍙鎬уソ鐨勬憳瑕?
      const summary = `
Zen Moment Meditation Statistics
Generated: ${now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}

========================================
OVERVIEW
========================================

Today's Progress: ${formatTime(todayDuration)}
Total Meditation Time: ${formatTime(totalDuration)}
Total Sessions: ${completedCycles + breathingSessions}
Breathing Sessions: ${breathingSessions}
Current Streak: ${streak} days
Daily Goal: ${useTimerStore.getState().dailyGoalMinutes} minutes

========================================
ACHIEVEMENTS
========================================

${Object.entries(achievements)
  .filter(([_, unlocked]) => unlocked)
  .map(([key, _]) => {
    const achievementNames = {
      firstSession: '\\uD83C\\uDF31 First Step',
      streak3: '\\uD83D\\uDD25 Week Warrior',
      streak7: '\\u2B50 Week Master',
      streak30: '\\uD83C\\uDFC6 Monthly Champion',
      total1Hour: '\\u23F3 Hour of Peace',
      total10Hours: '\\uD83E\\uDDD8 Zen Master',
      total100Hours: '\\u2728 Enlightened One'
    }
    return `\\u2705 ${achievementNames[key as keyof typeof achievementNames]}`
  })
  .join('\n')}

========================================
RECENT ACTIVITY (Last 30 Days)
========================================

${Object.entries(dailyHistory)
  .sort(([a], [b]) => b.localeCompare(a))
  .slice(0, 30)
  .map(([date, data]) => {
    const dateObj = new Date(date)
    const totalMinutes = Math.round(data.meditationDuration / 60 + data.breathingSessions * 3)
    return `${dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })}: ${formatTime(data.meditationDuration)} + ${data.breathingSessions} breathing sessions (${totalMinutes} min total)`
  })
  .join('\n')}

========================================
INSIGHTS
========================================

Total Days Practiced: ${Object.keys(dailyHistory).length}
Practice Rate: ${calculateLast30DaysPracticeRate()}% (last 30 days)
Average Daily: ${monthlyStats.averageMeditationTime > 0 ?
  formatTime(monthlyStats.averageMeditationTime) : '0m'}
      `.trim()

      const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `zen-moment-summary-${dateStr}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-page-dark'
          : 'theme-page-light'
      }`}>
        {/* Navigation */}
        <Navigation
          theme={theme}
          onThemeToggle={toggleTheme}
          soundEnabled={false}
          onSoundToggle={() => {}}
          showSoundToggle={false}
        />

        {/* Main Content */}
        <div className="max-w-5xl sm:max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-light mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Meditation Progress Statistics & Mindfulness Tracking
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
            }`}>
              {formatDate(new Date())}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {/* Today Stats */}
            <div className={`p-6 neumorphic-card ${
              theme === 'dark' ? 'neumorphic-card-dark' : 'neumorphic-card-light'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{'\uD83E\uDDD8'}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'neumorphic-dark-flat text-blue-400' : 'neumorphic-flat text-blue-600'
                }`}>
                  Meditation
                </span>
              </div>
              <div className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {formatTime(todayDuration)}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
              }`}>
                sessions today
              </div>
            </div>

            {/* Streak */}
            <div className={`p-6 neumorphic-card ${
              theme === 'dark' ? 'neumorphic-card-dark' : 'neumorphic-card-light'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{'\uD83D\uDD25'}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'neumorphic-dark-flat text-orange-400' : 'neumorphic-flat text-orange-600'
                }`}>
                  Streak
                </span>
              </div>
              <div className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {streak} days
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
              }`}>
                Consistent practice
              </div>
            </div>

            {/* Breathing */}
            <div className={`p-6 neumorphic-card ${
              theme === 'dark' ? 'neumorphic-card-dark' : 'neumorphic-card-light'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{'\uD83C\uDF2C\uFE0F'}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'neumorphic-dark-flat text-green-400' : 'neumorphic-flat text-green-600'
                }`}>
                  Breathing
                </span>
              </div>
              <div className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {todayBreathingSessions}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
              }`}>
                Sessions today
              </div>
            </div>

            {/* Total Time */}
            <div className={`p-6 neumorphic-card ${
              theme === 'dark' ? 'neumorphic-card-dark' : 'neumorphic-card-light'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{'\u23F1\uFE0F'}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'neumorphic-dark-flat text-purple-400' : 'neumorphic-flat text-purple-600'
                }`}>
                  Total
                </span>
              </div>
              <div className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {totalTimeInHours}h
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
              }`}>
                Total meditation time
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Today's Details */}
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <h2 className={`text-2xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {'\uD83D\uDCDD'} Today's Meditation Details
              </h2>
              <div className="space-y-4">
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Meditation Time
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {formatTime(todayDuration)}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Meditation Sessions
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {completedCycles} sessions
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Average Session
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {formatTime(avgSessionTime)}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Breathing Sessions
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {breathingSessions} sessions
                  </span>
                </div>
              </div>
            </div>

            {/* Historical Achievements */}
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <h2 className={`text-2xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {'\uD83C\uDFC5'} Meditation Achievements & Milestones
              </h2>
              <div className="space-y-4">
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Total Meditation Time
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {formatTime(totalDuration)}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Current Streak
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {streak} days
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Daily Average
                  </span>
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    {streak > 0 ? formatTime(Math.round(totalDuration / streak / 60) * 60) : '0m'}
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                  }`}>
                    Practice Status
                  </span>
                  <span className={`font-semibold ${
                    streak > 0 ? (theme === 'dark' ? 'text-green-400' : 'text-green-600') : (theme === 'dark' ? 'text-[#90AB9E]' : 'text-[#5A7466]')
                  }`}>
                    {streak > 0 ? 'Active' : 'Beginner'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 鏈堝害缁熻鍒嗘瀽鍖哄煙 - Phase 1 鏂板姛鑳?*/}
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'} mb-8`}>
            {/* 鍖哄煙鏍囬鍜屾帶鍒跺櫒 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div>
                <h2 className={`text-2xl font-semibold mb-1 ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {'\uD83D\uDCCA'} Meditation Analytics & Progress Tracking
                </h2>
                <p className={`text-xs leading-none mb-0 ${
                  theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
                }`}>
                  {monthlyStats.totalDays} days · {monthlyStats.totalPracticeDays} practice days
                </p>
              </div>
              <div className="flex-shrink-0">
                <TimeRangeSelector
                  value={selectedTimeRange}
                  onChange={setSelectedTimeRange}
                  theme={theme}
                />
              </div>
            </div>

            {/* 鏃堕棿鑼冨洿鏄剧ず */}
            <div className={`text-center mb-4 p-3 rounded-lg ${
              theme === 'dark' ? 'neumorphic-inset-card-dark' : 'neumorphic-inset-card-light'
            }`}>
              <h3 className={`text-base font-medium ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {getTimeRangeDisplay(selectedTimeRange)}
              </h3>
            </div>

            {/* 绗竴琛岋細鏈堝害鐩爣杈炬垚鐜囧拰瓒嬪娍鍥?- 鍚勫崰涓€琛屽瀭鐩村爢鍙?*/}
            <div className="space-y-6 lg:space-y-8">
              <Suspense fallback={<NeumorphicSkeleton type="card" theme={theme} />}>
                <MonthlyGoalProgress
                  goalAchievementRate={monthlyStats.goalAchievementRate}
                  totalDays={monthlyStats.totalDays}
                  totalPracticeDays={monthlyStats.totalPracticeDays}
                  theme={theme}
                />
              </Suspense>
              <Suspense fallback={<NeumorphicSkeleton type="chart" theme={theme} />}>
                <MonthlyTrendChart
                  data={monthlyStats.monthlyTrend}
                  theme={theme}
                />
              </Suspense>
            </div>
          </div>

          {/* 骞村害鎬荤粨鎶ュ憡 - Phase 2 鏂板姛鑳?*/}
          <Suspense fallback={<NeumorphicSkeleton type="chart" height="h-96" theme={theme} />}>
            <YearlySummaryReport
              yearlyStats={yearlyStats}
              theme={theme}
            />
          </Suspense>

          {/* 缁冧範涔犳儻鍒嗘瀽 - Phase 3 鏂板姛鑳?*/}
          <Suspense fallback={<NeumorphicSkeleton type="chart" height="h-96" theme={theme} />}>
            <PracticeHabitAnalysis
              habitAnalysis={habitAnalysis}
              theme={theme}
            />
          </Suspense>

          {/* 鏁版嵁鍙鍖栧尯鍩?*/}
          <div className="space-y-6 lg:space-y-8 mb-12">
            {/* 绗竴琛岋細鍛ㄨ秼鍔垮浘鍜岀洰鏍囪繘搴︾幆 - 绉诲姩绔爢鍙狅紝骞虫澘绔苟鎺?*/}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <Suspense fallback={<NeumorphicSkeleton type="chart" theme={theme} />}>
                <WeeklyTrendChart theme={theme} />
              </Suspense>
              <Suspense fallback={<NeumorphicSkeleton type="circle" theme={theme} />}>
                <GoalProgressRing theme={theme} />
              </Suspense>
            </div>

            {/* 绗簩琛岋細缁冧範鐑姏鍥?- 鍏ㄥ鏄剧ず */}
            <Suspense fallback={<NeumorphicSkeleton type="chart" height="h-64" theme={theme} />}>
              <PracticeHeatmap theme={theme} />
            </Suspense>

            {/* 绗笁琛岋細鎴愬氨寰界珷鍜岀粌涔犲垎甯?- 绉诲姩绔爢鍙狅紝骞虫澘绔苟鎺?*/}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <Suspense fallback={<NeumorphicSkeleton type="chart" height="h-96" theme={theme} />}>
                <AchievementBadges theme={theme} />
              </Suspense>
              <Suspense fallback={<NeumorphicSkeleton type="chart" theme={theme} />}>
                <PracticeDistributionChart theme={theme} />
              </Suspense>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => {
                exportStats('json')
              }}
              className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-blue-400 hover:text-blue-300 border border-[#4A5E54]/35 hover:border-[#7FA87C]/60'
                  : 'neumorphic text-blue-600 hover:text-blue-700 border border-[#D8CFC0]/45 hover:border-[#9BBFA7]/65'
              }`}
            >
              {'\uD83D\uDCE6'} Export JSON
            </button>

            <button
              onClick={() => {
                exportStats('csv')
              }}
              className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-green-400 hover:text-green-300 border border-[#4A5E54]/35 hover:border-[#7FA87C]/60'
                  : 'neumorphic text-green-600 hover:text-green-700 border border-[#D8CFC0]/45 hover:border-[#9BBFA7]/65'
              }`}
            >
              {'\uD83D\uDCC4'} Export CSV
            </button>

            <button
              onClick={() => {
                exportStats('summary')
              }}
              className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-purple-400 hover:text-purple-300 border border-[#4A5E54]/35 hover:border-[#7FA87C]/60'
                  : 'neumorphic text-purple-600 hover:text-purple-700 border border-[#D8CFC0]/45 hover:border-[#9BBFA7]/65'
              }`}
            >
              {'\uD83E\uDDFE'} Export Summary
            </button>

            <button
              onClick={() => {
                if (confirm('Clear all statistics? This action cannot be undone.')) {
                  localStorage.removeItem('zen-moment-storage')
                  localStorage.removeItem('zen-meditation-stats')
                  localStorage.removeItem('zen-last-meditation')
                  window.location.reload()
                }
              }}
              className={`px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-red-400 hover:text-red-300 border border-[#4A5E54]/35 hover:border-[#7FA87C]/60'
                  : 'neumorphic text-red-600 hover:text-red-700 border border-[#D8CFC0]/45 hover:border-[#9BBFA7]/65'
              }`}
            >
              {'\u26A0\uFE0F'} Clear Data
            </button>
          </div>
        </div>

        {/* Statistics Guide & Benefits */}
        <section className={`py-20 transition-colors duration-300 ${
          theme === 'dark'
            ? 'theme-section-dark'
            : 'theme-section-light'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === 'dark'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Statistics & Insights</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                Transform Your Practice with Data-Driven Insights
              </h2>
              <p className={`text-xl font-light max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Understand your meditation and breathing patterns to accelerate your mindfulness journey and achieve deeper levels of self-awareness
              </p>
            </div>

            {/* Statistics Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83D\uDCC8'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Meditation Pattern Recognition
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  Identify trends in your meditation practice, discover optimal times for mindfulness sessions, and understand how different environmental factors affect your meditation quality and consistency.
                </p>
              </div>

              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83C\uDFC1'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
                }`}>
                  Meditation Goal Achievement
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  Set realistic meditation goals, track your progress toward mindfulness milestones, and celebrate achievements that motivate continued practice and deeper meditation experiences.
                </p>
              </div>

              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83D\uDCCB'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Habit Formation
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  Build consistent meditation habits through data-backed insights, understand your personal patterns, and create sustainable mindfulness routines that fit your lifestyle and schedule.
                </p>
              </div>

              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83D\uDDBC\uFE0F'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                }`}>
                  Progress Visualization
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  See your meditation journey through beautiful visualizations that highlight growth, patterns, and areas for improvement in your mindfulness practice and overall wellbeing.
                </p>
              </div>

              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83C\uDFC6'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  Motivation Boost
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  Stay motivated with achievement badges, progress streaks, and personalized insights that celebrate your meditation milestones and encourage deeper mindfulness exploration.
                </p>
              </div>

              <div className={`p-8 rounded-2xl ${
                theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
              }`}>
                <div className="text-3xl mb-4">{'\uD83C\uDF31'}</div>
                <h3 className={`text-2xl font-light mb-4 ${
                  theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
                }`}>
                  Personal Growth
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                }`}>
                  Track how consistent meditation practice transforms your mental clarity, emotional balance, and overall wellbeing through comprehensive progress reports and personalized recommendations.
                </p>
              </div>
            </div>

            {/* Advanced Statistics Guide */}
            <div className={`p-12 rounded-3xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
            }`}>
              <h3 className={`text-3xl font-light text-center mb-8 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {'\uD83D\uDCCA'} Advanced Statistics Guide
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-xl font-medium mb-4 ${
                    theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                  }`}>
                    Understanding Your Metrics
                  </h4>
                  <ul className={`space-y-3 ${
                    theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">{'\u2022'}</span>
                      <span><strong>Session duration:</strong> Track meditation length to find your optimal practice time and gradually build longer sessions for deeper mindfulness experiences.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-400 mt-1">{'\u2022'}</span>
                      <span><strong>Practice consistency:</strong> Monitor daily meditation habits to build sustainable mindfulness routines and identify patterns that support regular practice.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-1">{'\u2022'}</span>
                      <span><strong>Progress trends:</strong> Analyze long-term meditation improvement to understand how your mindfulness practice evolves and impacts overall wellbeing.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-400 mt-1">{'\u2022'}</span>
                      <span><strong>Breathing integration:</strong> Combine breathing exercise statistics with meditation data for holistic mindfulness practice optimization.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`text-xl font-medium mb-4 ${
                    theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
                  }`}>
                    Optimizing Your Practice
                  </h4>
                  <ul className={`space-y-3 ${
                    theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#5A7466]'
                  }`}>
                    <li className="flex items-start space-x-2">
                      <span className="text-cyan-400 mt-1">{'\u2022'}</span>
                      <span><strong>Peak performance timing:</strong> Use meditation statistics to identify your most effective practice times and schedule sessions when mindfulness comes most naturally.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-pink-400 mt-1">{'\u2022'}</span>
                      <span><strong>Technique effectiveness:</strong> Compare different meditation and breathing techniques to find what works best for your unique mindfulness journey and goals.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                      <span><strong>Stress pattern analysis:</strong> Correlate meditation practice with stress levels to understand how mindfulness impacts your daily life and emotional wellbeing.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">{'\u2022'}</span>
                      <span><strong>Goal adjustment strategies:</strong> Use data insights to set realistic meditation goals that challenge you while maintaining motivation and preventing burnout.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Best Practices Tips */}
            <div className={`mt-16 p-8 rounded-3xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-800/30'
                : 'bg-gradient-to-br from-green-50 to-teal-50 border border-green-200'
            }`}>
              <h3 className={`text-3xl font-light text-center mb-8 ${
                theme === 'dark' ? 'text-green-300' : 'text-green-600'
              }`}>
                {'\uD83D\uDCA1'} Pro Tips for Statistics Success
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 text-center ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    {'\uD83D\uDD01'} Focus on Consistency
                  </h4>
                  <p className="text-sm">
                    Regular meditation practice, even for short periods, creates stronger positive habits than occasional long sessions. Track daily consistency rather than just total minutes.
                  </p>
                </div>
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 text-center ${
                    theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                  }`}>
                    {'\uD83D\uDCC5'} Review Weekly Progress
                  </h4>
                  <p className="text-sm">
                    Set aside time each week to review your meditation statistics and celebrate small wins. Use insights to adjust your mindfulness practice for better results.
                  </p>
                </div>
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 text-center ${
                    theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
                  }`}>
                    {'\uD83C\uDF31'} Embrace the Journey
                  </h4>
                  <p className="text-sm">
                    Remember that meditation statistics are tools for growth, not measures of worth. Every mindful moment counts toward your overall wellbeing and spiritual development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}




