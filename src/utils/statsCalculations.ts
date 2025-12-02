import { TimeRange } from '../components/TimeRangeSelector'
import { DailyData, createDefaultDailyData } from '../types/meditationData'
import { formatTime, formatTimerTime } from './timeFormatters'
import { calculateTotalPracticeTime } from './practiceTimeCalculations'

// Re-export formatTime for backward compatibility
export { formatTime }

export interface MonthlyStats {
  totalMeditationTime: number
  totalBreathingSessions: number
  totalPracticeDays: number
  averageMeditationTime: number
  averageBreathingSessions: number
  totalDays: number
  goalAchievementRate: number
  bestDay: {
    date: string
    meditationTime: number
    breathingSessions: number
  } | null
  worstDay: {
    date: string
    meditationTime: number
    breathingSessions: number
  } | null
  monthlyTrend: Array<{
    date: string
    meditationTime: number
    breathingSessions: number
    practiceTime: number
  }>
}

/**
 * 根据时间范围计算统计数据
 */
export const calculateStatsByTimeRange = (
  dailyHistory: Record<string, DailyData>,
  timeRange: TimeRange,
  dailyGoalMinutes: number = 20
): MonthlyStats => {
  const now = new Date()
  let startDate: Date
  let endDate: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) // End of today

  // 根据时间范围设置开始日期
  switch (timeRange) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'quarter':
      startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
      break
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1)
      break
    case 'all':
      // 找到最早的记录
      const dates = Object.keys(dailyHistory).sort()
      if (dates.length === 0) {
        startDate = endDate
      } else {
        startDate = new Date(dates[0])
      }
      break
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  }

  // 获取日期范围内的数据
  const filteredData: Array<{ date: string; data: DailyData }> = []

  // 安全的日期循环 - 避免修改原始Date对象
  for (let date = new Date(startDate); date < endDate; date = new Date(date.getTime() + 24 * 60 * 60 * 1000)) {
    const dateStr = date.getFullYear() + '-' +
                   String(date.getMonth() + 1).padStart(2, '0') + '-' +
                   String(date.getDate()).padStart(2, '0')
    const data = dailyHistory[dateStr]

    if (data) {
      filteredData.push({ date: dateStr, data })
    } else {
      filteredData.push({
        date: dateStr,
        data: createDefaultDailyData(dateStr)
      })
    }
  }

  // 计算统计数据
  const totalMeditationTime = filteredData.reduce((sum, item) => sum + item.data.meditationDuration, 0)
  const totalBreathingSessions = filteredData.reduce((sum, item) => sum + item.data.breathingSessions, 0)
  const totalPracticeDays = filteredData.filter(item => item.data.meditationDuration > 0 || item.data.breathingSessions > 0).length
  const totalDays = filteredData.length

  // 计算平均值
  const averageMeditationTime = totalPracticeDays > 0 ? Math.round(totalMeditationTime / totalPracticeDays) : 0
  const averageBreathingSessions = totalPracticeDays > 0 ? Math.round(totalBreathingSessions / totalPracticeDays) : 0

  // 计算目标达成率
  const daysWithGoalAchieved = filteredData.filter(item => {
    const totalMinutes = Math.round(item.data.meditationDuration / 60) + (item.data.breathingSessions * 3)
    return totalMinutes >= dailyGoalMinutes
  }).length
  const goalAchievementRate = totalDays > 0 ? Math.round((daysWithGoalAchieved / totalDays) * 100) : 0

  // 找出最佳和最差的一天
  let bestDay: MonthlyStats['bestDay'] | null = null
  let worstDay: MonthlyStats['worstDay'] | null = null

  filteredData.forEach(item => {
    const totalPracticeTime = calculateTotalPracticeTime(item.data)
    const bestDayPracticeTime = bestDay ? calculateTotalPracticeTime({
      meditationDuration: bestDay.meditationTime,
      breathingSessions: bestDay.breathingSessions,
      breathingModes: {},
      date: bestDay.date
    }) : 0
    const worstDayPracticeTime = worstDay ? calculateTotalPracticeTime({
      meditationDuration: worstDay.meditationTime,
      breathingSessions: worstDay.breathingSessions,
      breathingModes: {},
      date: worstDay.date
    }) : 0

    if (!bestDay || totalPracticeTime > bestDayPracticeTime) {
      bestDay = {
        date: item.date,
        meditationTime: item.data.meditationDuration,
        breathingSessions: item.data.breathingSessions
      }
    }

    if (!worstDay || totalPracticeTime < worstDayPracticeTime) {
      worstDay = {
        date: item.date,
        meditationTime: item.data.meditationDuration,
        breathingSessions: item.data.breathingSessions
      }
    }
  })

  // 准备趋势数据
  const monthlyTrend = filteredData.map(item => ({
    date: item.date,
    meditationTime: item.data.meditationDuration,
    breathingSessions: item.data.breathingSessions,
    practiceTime: calculateTotalPracticeTime(item.data)
  }))

  return {
    totalMeditationTime,
    totalBreathingSessions,
    totalPracticeDays,
    averageMeditationTime,
    averageBreathingSessions,
    totalDays,
    goalAchievementRate,
    bestDay,
    worstDay,
    monthlyTrend
  }
}


/**
 * 格式化日期为可读字符串
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })
}

/**
 * 获取时间范围的显示名称
 */
export const getTimeRangeDisplay = (timeRange: TimeRange): string => {
  const now = new Date()
  const ranges = {
    today: `Today (${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
    week: `Last 7 Days`,
    month: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    quarter: `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`,
    year: `${now.getFullYear()}`,
    all: 'All Time'
  }

  return ranges[timeRange]
}