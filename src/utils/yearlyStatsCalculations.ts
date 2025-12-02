import { DailyData, createDefaultDailyData } from '../types/meditationData'
import { calculateTotalPracticeTime, calculatePracticeTimeStats } from './practiceTimeCalculations'

export interface YearlyStats {
  year: number
  totalMeditationTime: number
  totalBreathingSessions: number
  totalPracticeDays: number
  averageMeditationTime: number
  averageBreathingSessions: number
  goalAchievementRate: number
  longestStreak: number
  currentStreak: number
  bestMonth: {
    month: string
    meditationTime: number
    breathingSessions: number
    practiceDays: number
    goalAchievementRate: number
  } | null
  worstMonth: {
    month: string
    meditationTime: number
    breathingSessions: number
    practiceDays: number
    goalAchievementRate: number
  } | null
  monthlyBreakdown: Array<{
    month: string
    meditationTime: number
    breathingSessions: number
    practiceDays: number
    goalAchievementRate: number
  }>
  yearlyProgress: Array<{
    date: string
    cumulativeTime: number
    cumulativeDays: number
  }>
  achievements: Array<{
    type: 'milestone' | 'streak' | 'consistency'
    title: string
    description: string
    date: string
    icon: string
  }>
}

/**
 * 计算年度统计数据
 */
export const calculateYearlyStats = (
  dailyHistory: Record<string, DailyData>,
  year: number = new Date().getFullYear(),
  dailyGoalMinutes: number = 20
): YearlyStats => {
  // 筛选指定年份的数据
  const yearlyData: Array<{ date: string; data: DailyData }> = []

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const data = dailyHistory[dateStr]

      if (data) {
        yearlyData.push({ date: dateStr, data })
      } else {
        yearlyData.push({
          date: dateStr,
          data: createDefaultDailyData(dateStr)
        })
      }
    }
  }

  // 基础统计计算
  const totalMeditationTime = yearlyData.reduce((sum, item) => sum + item.data.meditationDuration, 0)
  const totalBreathingSessions = yearlyData.reduce((sum, item) => sum + item.data.breathingSessions, 0)
  const totalPracticeDays = yearlyData.filter(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0).length
  const totalDays = yearlyData.length

  const averageMeditationTime = totalPracticeDays > 0 ? Math.round(totalMeditationTime / totalPracticeDays) : 0
  const averageBreathingSessions = totalPracticeDays > 0 ? Math.round(totalBreathingSessions / totalPracticeDays) : 0

  // 目标达成率计算
  const daysWithGoalAchieved = yearlyData.filter(item => {
    const totalMinutes = calculateTotalPracticeTime(item.data)
    return totalMinutes >= dailyGoalMinutes
  }).length
  const goalAchievementRate = totalDays > 0 ? Math.round((daysWithGoalAchieved / totalDays) * 100) : 0

  // 连续练习天数计算
  const { longestStreak, currentStreak } = calculateStreaks(yearlyData)

  // 月度分析
  const monthlyBreakdown = calculateMonthlyBreakdown(yearlyData, year, dailyGoalMinutes)
  const bestMonth = findBestMonth(monthlyBreakdown)
  const worstMonth = findWorstMonth(monthlyBreakdown)

  // 年度进度数据
  const yearlyProgress = calculateYearlyProgress(yearlyData)

  // 成就计算
  const achievements = calculateAchievements(yearlyData, year, longestStreak, goalAchievementRate)

  return {
    year,
    totalMeditationTime,
    totalBreathingSessions,
    totalPracticeDays,
    averageMeditationTime,
    averageBreathingSessions,
    goalAchievementRate,
    longestStreak,
    currentStreak,
    bestMonth,
    worstMonth,
    monthlyBreakdown,
    yearlyProgress,
    achievements
  }
}

/**
 * 计算连续练习天数
 */
const calculateStreaks = (yearlyData: Array<{ date: string; data: DailyData }>) => {
  let longestStreak = 0
  let currentStreak = 0
  let tempStreak = 0

  const today = new Date()
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  // 计算当前连续天数 - 从今天开始往前检查
  currentStreak = 0
  for (let i = yearlyData.length - 1; i >= 0; i--) {
    const item = yearlyData[i]
    const hasPractice = item.data.meditationDuration > 0 || item.data.breathingSessions > 0

    if (!hasPractice) {
      break // 遇到没有练习的天就停止当前连续天数计算
    }

    const itemDate = new Date(item.date)
    const daysDiff = Math.floor((currentDate.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24))

    // 如果不是连续的日期（超过1天差距），也停止计算
    if (i < yearlyData.length - 1 && daysDiff > (yearlyData.length - 1 - i)) {
      break
    }

    currentStreak++
  }

  // 计算最长连续天数
  tempStreak = 0
  for (let i = 0; i < yearlyData.length; i++) {
    const item = yearlyData[i]
    const hasPractice = item.data.meditationDuration > 0 || item.data.breathingSessions > 0

    if (hasPractice) {
      tempStreak++
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak
      }
    } else {
      tempStreak = 0
    }
  }

  return { longestStreak, currentStreak }
}

/**
 * 计算月度细分数据
 */
const calculateMonthlyBreakdown = (
  yearlyData: Array<{ date: string; data: DailyData }>,
  year: number,
  dailyGoalMinutes: number
) => {
  const monthlyData: Record<string, Array<{ date: string; data: DailyData }>> = {}

  // 按月份分组
  yearlyData.forEach(item => {
    const month = item.date.substring(0, 7) // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = []
    }
    monthlyData[month].push(item)
  })

  // 计算每月统计
  return Object.entries(monthlyData).map(([month, data]) => {
    const monthMeditationTime = data.reduce((sum, item) => sum + item.data.meditationDuration, 0)
    const monthBreathingSessions = data.reduce((sum, item) => sum + item.data.breathingSessions, 0)
    const monthPracticeDays = data.filter(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0).length

    const monthDaysWithGoal = data.filter(item => {
      const totalMinutes = Math.round(item.data.meditationDuration / 60) + (item.data.breathingSessions * 3)
      return totalMinutes >= dailyGoalMinutes
    }).length
    const monthGoalRate = Math.round((monthDaysWithGoal / data.length) * 100)

    const monthName = new Date(year, parseInt(month.substring(5)) - 1).toLocaleDateString('en-US', { month: 'long' })

    return {
      month: monthName,
      meditationTime: monthMeditationTime,
      breathingSessions: monthBreathingSessions,
      practiceDays: monthPracticeDays,
      goalAchievementRate: monthGoalRate
    }
  })
}

/**
 * 找出最佳月份
 */
const findBestMonth = (monthlyBreakdown: YearlyStats['monthlyBreakdown']) => {
  if (monthlyBreakdown.length === 0) return null

  return monthlyBreakdown.reduce((best, current) => {
    const currentScore = current.practiceDays * 0.7 + current.goalAchievementRate * 0.3
    const bestScore = best.practiceDays * 0.7 + best.goalAchievementRate * 0.3
    return currentScore > bestScore ? current : best
  })
}

/**
 * 找出最需要改进的月份
 */
const findWorstMonth = (monthlyBreakdown: YearlyStats['monthlyBreakdown']) => {
  const monthsWithPractice = monthlyBreakdown.filter(month => month.practiceDays > 0)
  if (monthsWithPractice.length === 0) return null

  return monthsWithPractice.reduce((worst, current) => {
    const currentScore = current.practiceDays * 0.7 + current.goalAchievementRate * 0.3
    const worstScore = worst.practiceDays * 0.7 + worst.goalAchievementRate * 0.3
    return currentScore < worstScore ? current : worst
  })
}

/**
 * 计算年度进度数据
 */
const calculateYearlyProgress = (yearlyData: Array<{ date: string; data: DailyData }>) => {
  let cumulativeTime = 0
  let cumulativeDays = 0

  return yearlyData.map(item => {
    const hasPractice = item.data.meditationDuration > 0 || item.data.breathingSessions > 0

    if (hasPractice) {
      cumulativeTime += item.data.meditationDuration
      cumulativeDays++
    }

    return {
      date: item.date,
      cumulativeTime,
      cumulativeDays
    }
  })
}

/**
 * 计算年度成就
 */
const calculateAchievements = (
  yearlyData: Array<{ date: string; data: DailyData }>,
  year: number,
  longestStreak: number,
  goalAchievementRate: number
): YearlyStats['achievements'] => {
  const achievements: YearlyStats['achievements'] = []
  const totalMeditationTime = yearlyData.reduce((sum, item) => sum + item.data.meditationDuration, 0)
  const totalPracticeDays = yearlyData.filter(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0).length

  // 时间里程碑成就
  if (totalMeditationTime >= 36000) { // 10小时
    achievements.push({
      type: 'milestone',
      title: 'Expert Meditator',
      description: `Completed ${Math.round(totalMeditationTime / 3600)} hours of meditation`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '🏆'
    })
  } else if (totalMeditationTime >= 18000) { // 5小时
    achievements.push({
      type: 'milestone',
      title: 'Dedicated Practitioner',
      description: `Completed ${Math.round(totalMeditationTime / 3600)} hours of meditation`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '🥇'
    })
  } else if (totalMeditationTime >= 3600) { // 1小时
    achievements.push({
      type: 'milestone',
      title: 'Meditation Journey',
      description: `Completed ${Math.round(totalMeditationTime / 3600)} hours of meditation`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '🌟'
    })
  }

  // 连续练习成就
  if (longestStreak >= 30) {
    achievements.push({
      type: 'streak',
      title: '30-Day Champion',
      description: `Maintained a ${longestStreak}-day practice streak`,
      date: yearlyData.find(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0)?.date || `${year}-01-01`,
      icon: '🔥'
    })
  } else if (longestStreak >= 7) {
    achievements.push({
      type: 'streak',
      title: 'Week Warrior',
      description: `Maintained a ${longestStreak}-day practice streak`,
      date: yearlyData.find(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0)?.date || `${year}-01-01`,
      icon: '💪'
    })
  }

  // 一致性成就
  if (goalAchievementRate >= 80) {
    achievements.push({
      type: 'consistency',
      title: 'Goal Master',
      description: `Achieved daily goals ${goalAchievementRate}% of the time`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '🎯'
    })
  }

  // 练习天数成就
  if (totalPracticeDays >= 100) {
    achievements.push({
      type: 'milestone',
      title: 'Centurion',
      description: `Practiced on ${totalPracticeDays} days this year`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '💯'
    })
  } else if (totalPracticeDays >= 50) {
    achievements.push({
      type: 'milestone',
      title: 'Habit Builder',
      description: `Practiced on ${totalPracticeDays} days this year`,
      date: yearlyData[yearlyData.length - 1]?.date || `${year}-12-31`,
      icon: '📅'
    })
  }

  return achievements
}

/**
 * 格式化年度数据为显示字符串
 */
export const formatYearlyTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

/**
 * 获取年度排名
 */
export const getYearlyPerformanceLevel = (stats: YearlyStats): {
  level: string
  color: string
  description: string
} => {
  const score = (stats.goalAchievementRate * 0.4) +
                (Math.min(stats.totalPracticeDays / 365, 1) * 30) +
                (Math.min(stats.longestStreak / 30, 1) * 30)

  if (score >= 80) {
    return {
      level: 'Expert',
      color: 'text-purple-600 dark:text-purple-400',
      description: 'Outstanding meditation practice and consistency'
    }
  } else if (score >= 60) {
    return {
      level: 'Advanced',
      color: 'text-blue-600 dark:text-blue-400',
      description: 'Strong meditation habit with good consistency'
    }
  } else if (score >= 40) {
    return {
      level: 'Intermediate',
      color: 'text-green-600 dark:text-green-400',
      description: 'Developing meditation practice with room for growth'
    }
  } else {
    return {
      level: 'Beginner',
      color: 'text-orange-600 dark:text-orange-400',
      description: 'Starting your meditation journey'
    }
  }
}