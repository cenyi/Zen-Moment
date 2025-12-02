import { DailyData, createDefaultDailyData } from '../types/meditationData'
import { calculateBreathingSessionDuration, calculateAverageBreathingDuration } from './practiceTimeCalculations'

export interface TimeOfDayPreference {
  earlyMorning: number // 4:00 - 8:00
  lateMorning: number // 8:00 - 12:00
  afternoon: number // 12:00 - 17:00
  evening: number // 17:00 - 21:00
  night: number // 21:00 - 4:00
  mostPreferred: {
    period: string
    percentage: number
    timeRange: string
  }
}

export interface PracticeConsistency {
  averageGap: number // Average days between practice sessions
  longestGap: number // Longest gap without practice
  practiceRegularity: number // 0-100 score
  preferredFrequency: 'daily' | 'everyOtherDay' | 'weekly' | 'irregular'
  consistencyTrend: 'improving' | 'stable' | 'declining'
}

export interface SessionDurationAnalysis {
  averageDuration: number
  shortestSession: number
  longestSession: number
  durationVariability: number // Standard deviation
  preferredDuration: 'short' | 'medium' | 'long'
  durationTrend: 'increasing' | 'stable' | 'decreasing'
  durationCategories: {
    short: number // < 5 minutes
    medium: number // 5-15 minutes
    long: number // > 15 minutes
  }
}

export interface PracticeTypePreference {
  meditationPercentage: number
  breathingPercentage: number
  balanceScore: number // 0-100, 100 being perfectly balanced
  preferredType: 'meditation' | 'breathing' | 'balanced'
  crossPracticeDays: number // Days with both meditation and breathing
}

export interface HabitInsights {
  personalityType: string
  strengths: string[]
  areasForImprovement: string[]
  recommendations: string[]
  habitScore: number // 0-100 overall score
  motivationLevel: 'high' | 'medium' | 'low'
}

export interface PracticePattern {
  dayOfWeekPattern: number[] // Practice frequency by day of week
  weeklyTrend: 'increasing' | 'stable' | 'decreasing'
  monthlyProgression: number[] // Practice consistency over months
  seasonalPattern: {
    spring: number
    summer: number
    fall: number
    winter: number
  }
}

export interface HabitAnalysisResult {
  timeOfDayPreference: TimeOfDayPreference
  practiceConsistency: PracticeConsistency
  sessionDurationAnalysis: SessionDurationAnalysis
  practiceTypePreference: PracticeTypePreference
  habitInsights: HabitInsights
  practicePattern: PracticePattern
  lastUpdated: string
}

/**
 * 分析练习习惯 - 核心分析函数
 */
export const analyzePracticeHabits = (
  dailyHistory: Record<string, DailyData>,
  detailedHistory?: Array<{
    date: string
    sessions: Array<{
      type: 'meditation' | 'breathing'
      duration: number
      timestamp: number
    }>
  }>
): HabitAnalysisResult => {
  const today = new Date()
  const analysisData = prepareAnalysisData(dailyHistory, detailedHistory)

  return {
    timeOfDayPreference: analyzeTimeOfDayPreference(analysisData),
    practiceConsistency: analyzePracticeConsistency(dailyHistory),
    sessionDurationAnalysis: analyzeSessionDuration(analysisData),
    practiceTypePreference: analyzePracticeTypePreference(dailyHistory),
    habitInsights: generateHabitInsights(dailyHistory, analysisData),
    practicePattern: analyzePracticePatterns(dailyHistory),
    lastUpdated: today.toISOString()
  }
}

/**
 * Prepare session data for habit analysis
 *
 * NOTE: This function makes intelligent assumptions when detailed timestamps are not available:
 * - Meditation sessions: Smart time allocation based on session duration and day of week
 *   • 20+ minutes: Early morning (6 AM) or dedicated practice time
 *   • 10-19 minutes: Morning (7 AM) regular practice
 *   • ≤5 minutes: Mid-day quick sessions (12 PM)
 *   • Weekend sessions: 1 hour later than weekdays
 * - Breathing sessions: Distributed throughout realistic practice times (8AM, 12PM, 3PM, 6PM, 8PM)
 * - Breathing duration: Accurately calculated based on actual breathing modes used
 *
 * These enhanced estimations provide more accurate insights while acknowledging data limitations.
 * For future improvement, consider collecting actual session timestamps.
 */
const prepareAnalysisData = (
  dailyHistory: Record<string, DailyData>,
  detailedHistory?: Array<{
    date: string
    sessions: Array<{
      type: 'meditation' | 'breathing'
      duration: number
      timestamp: number
    }>
  }>
) => {
  const sessions: Array<{
    date: string
    type: 'meditation' | 'breathing'
    duration: number
    hourOfDay: number
  }> = []

  // Use detailed session data if available (most accurate)
  if (detailedHistory && detailedHistory.length > 0) {
    detailedHistory.forEach(day => {
      day.sessions.forEach(session => {
        const sessionDate = new Date(session.timestamp)
        sessions.push({
          date: day.date,
          type: session.type,
          duration: session.duration,
          hourOfDay: sessionDate.getHours()
        })
      })
    })
  } else {
    // Estimate from daily aggregated data (reasonable assumptions)
    Object.entries(dailyHistory).forEach(([date, data]) => {
      if (data.meditationDuration > 0) {
        // Smart meditation time allocation based on duration
        let estimatedHour = 7 // Default morning

        // Longer sessions are more likely to be in dedicated time slots
        if (data.meditationDuration >= 1200) { // 20+ minutes
          estimatedHour = 6 // Early morning or late evening
        } else if (data.meditationDuration >= 600) { // 10+ minutes
          estimatedHour = 7 // Morning
        } else if (data.meditationDuration <= 300) { // 5 minutes or less
          estimatedHour = 12 // Mid-day quick session
        }

        // Weekend vs weekday patterns
        const dayOfWeek = new Date(date).getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
          estimatedHour = 8 // Slightly later on weekends
        }

        sessions.push({
          date,
          type: 'meditation',
          duration: data.meditationDuration,
          hourOfDay: estimatedHour
        })
      }

      // Distribute breathing sessions throughout the day with accurate durations
      const averageBreathingDuration = calculateAverageBreathingDuration(data.breathingModes || {})
      const breathingTimeSlots = [8, 12, 15, 18, 20] // 8AM, 12PM, 3PM, 6PM, 8PM

      for (let i = 0; i < data.breathingSessions; i++) {
        sessions.push({
          date,
          type: 'breathing',
          duration: averageBreathingDuration, // Use actual calculated duration
          hourOfDay: breathingTimeSlots[i % breathingTimeSlots.length]
        })
      }
    })
  }

  return sessions
}

/**
 * 分析时间段偏好
 */
const analyzeTimeOfDayPreference = (sessions: Array<{
  date: string
  type: string
  duration: number
  hourOfDay: number
}>): TimeOfDayPreference => {
  const timeDistribution = {
    earlyMorning: 0, // 4:00 - 8:00
    lateMorning: 0, // 8:00 - 12:00
    afternoon: 0,   // 12:00 - 17:00
    evening: 0,     // 17:00 - 21:00
    night: 0        // 21:00 - 4:00
  }

  sessions.forEach(session => {
    const hour = session.hourOfDay
    if (hour >= 4 && hour < 8) timeDistribution.earlyMorning++
    else if (hour >= 8 && hour < 12) timeDistribution.lateMorning++
    else if (hour >= 12 && hour < 17) timeDistribution.afternoon++
    else if (hour >= 17 && hour < 21) timeDistribution.evening++
    else timeDistribution.night++
  })

  const total = sessions.length
  const percentages = {
    earlyMorning: (timeDistribution.earlyMorning / total) * 100,
    lateMorning: (timeDistribution.lateMorning / total) * 100,
    afternoon: (timeDistribution.afternoon / total) * 100,
    evening: (timeDistribution.evening / total) * 100,
    night: (timeDistribution.night / total) * 100
  }

  // 找出最偏好时间段
  const timePeriods = [
    { key: 'earlyMorning', label: 'Early Morning', range: '4:00 - 8:00', value: percentages.earlyMorning },
    { key: 'lateMorning', label: 'Late Morning', range: '8:00 - 12:00', value: percentages.lateMorning },
    { key: 'afternoon', label: 'Afternoon', range: '12:00 - 17:00', value: percentages.afternoon },
    { key: 'evening', label: 'Evening', range: '17:00 - 21:00', value: percentages.evening },
    { key: 'night', label: 'Night', range: '21:00 - 4:00', value: percentages.night }
  ]

  const mostPreferred = timePeriods.reduce((max, current) =>
    current.value > max.value ? current : max
  )

  return {
    ...timeDistribution,
    mostPreferred: {
      period: mostPreferred.label,
      percentage: Math.round(mostPreferred.value),
      timeRange: mostPreferred.range
    }
  }
}

/**
 * 分析练习一致性
 */
const analyzePracticeConsistency = (dailyHistory: Record<string, DailyData>): PracticeConsistency => {
  const dates = Object.keys(dailyHistory).sort()
  const practiceDates = dates.filter(date =>
    dailyHistory[date].meditationDuration > 0 || dailyHistory[date].breathingSessions > 0
  )

  if (practiceDates.length < 2) {
    return {
      averageGap: 0,
      longestGap: 0,
      practiceRegularity: 0,
      preferredFrequency: 'irregular',
      consistencyTrend: 'stable'
    }
  }

  // 计算练习间隔
  const gaps: number[] = []
  let longestGap = 0

  for (let i = 1; i < practiceDates.length; i++) {
    const prevDate = new Date(practiceDates[i - 1])
    const currDate = new Date(practiceDates[i])
    const gap = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
    gaps.push(gap)
    longestGap = Math.max(longestGap, gap)
  }

  const averageGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length

  // 一致性评分 (0-100)
  const practiceRegularity = Math.max(0, 100 - (averageGap - 1) * 20)

  // 确定偏好频率
  let preferredFrequency: PracticeConsistency['preferredFrequency']
  if (averageGap <= 1.5) preferredFrequency = 'daily'
  else if (averageGap <= 3) preferredFrequency = 'everyOtherDay'
  else if (averageGap <= 7) preferredFrequency = 'weekly'
  else preferredFrequency = 'irregular'

  // 分析趋势
  const recentGaps = gaps.slice(-10)
  const olderGaps = gaps.slice(0, Math.max(0, gaps.length - 10))

  let consistencyTrend: PracticeConsistency['consistencyTrend'] = 'stable'
  if (recentGaps.length > 0 && olderGaps.length > 0) {
    const recentAvg = recentGaps.reduce((sum, gap) => sum + gap, 0) / recentGaps.length
    const olderAvg = olderGaps.reduce((sum, gap) => sum + gap, 0) / olderGaps.length

    if (recentAvg < olderAvg * 0.8) consistencyTrend = 'improving'
    else if (recentAvg > olderAvg * 1.2) consistencyTrend = 'declining'
  }

  return {
    averageGap: Math.round(averageGap * 10) / 10,
    longestGap,
    practiceRegularity: Math.round(practiceRegularity),
    preferredFrequency,
    consistencyTrend
  }
}

/**
 * 分析练习时长
 */
const analyzeSessionDuration = (sessions: Array<{
  date: string
  type: string
  duration: number
  hourOfDay: number
}>): SessionDurationAnalysis => {
  if (sessions.length === 0) {
    return {
      averageDuration: 0,
      shortestSession: 0,
      longestSession: 0,
      durationVariability: 0,
      preferredDuration: 'short',
      durationTrend: 'stable',
      durationCategories: { short: 0, medium: 0, long: 0 }
    }
  }

  const durations = sessions.map(s => s.duration)
  const averageDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length
  const shortestSession = Math.min(...durations)
  const longestSession = Math.max(...durations)

  // 计算标准差
  const variance = durations.reduce((sum, duration) => {
    return sum + Math.pow(duration - averageDuration, 2)
  }, 0) / durations.length
  const durationVariability = Math.sqrt(variance)

  // 分类时长
  const durationCategories = {
    short: sessions.filter(s => s.duration < 300).length, // < 5 minutes
    medium: sessions.filter(s => s.duration >= 300 && s.duration <= 900).length, // 5-15 minutes
    long: sessions.filter(s => s.duration > 900).length // > 15 minutes
  }

  // 确定偏好时长
  let preferredDuration: SessionDurationAnalysis['preferredDuration']
  if (durationCategories.short >= durationCategories.medium && durationCategories.short >= durationCategories.long) {
    preferredDuration = 'short'
  } else if (durationCategories.long >= durationCategories.medium) {
    preferredDuration = 'long'
  } else {
    preferredDuration = 'medium'
  }

  // 分析趋势
  const sortedSessions = sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const midpoint = Math.max(1, Math.floor(sortedSessions.length / 2))

  let durationTrend: SessionDurationAnalysis['durationTrend'] = 'stable'
  if (sortedSessions.length > 10) {
    const recentAvg = sortedSessions.slice(-midpoint).reduce((sum, s) => sum + s.duration, 0) / midpoint
    const olderAvg = sortedSessions.slice(0, midpoint).reduce((sum, s) => sum + s.duration, 0) / midpoint

    if (recentAvg > olderAvg * 1.1) durationTrend = 'increasing'
    else if (recentAvg < olderAvg * 0.9) durationTrend = 'decreasing'
  }

  return {
    averageDuration: Math.round(averageDuration),
    shortestSession,
    longestSession,
    durationVariability: Math.round(durationVariability),
    preferredDuration,
    durationTrend,
    durationCategories
  }
}

/**
 * 分析练习类型偏好
 */
const analyzePracticeTypePreference = (dailyHistory: Record<string, DailyData>): PracticeTypePreference => {
  let totalMeditationTime = 0
  let totalBreathingTime = 0
  let crossPracticeDays = 0

  Object.entries(dailyHistory).forEach(([date, data]) => {
    totalMeditationTime += data.meditationDuration

    // Use accurate breathing duration calculation
    if (data.breathingSessions > 0) {
      const averageDuration = calculateAverageBreathingDuration(data.breathingModes || {})
      totalBreathingTime += averageDuration * data.breathingSessions
    }

    if (data.meditationDuration > 0 && data.breathingSessions > 0) {
      crossPracticeDays++
    }
  })

  const totalTime = totalMeditationTime + totalBreathingTime
  const meditationPercentage = totalTime > 0 ? (totalMeditationTime / totalTime) * 100 : 0
  const breathingPercentage = totalTime > 0 ? (totalBreathingTime / totalTime) * 100 : 0

  // 平衡评分 - 50/50为最佳平衡
  const balanceScore = 100 - Math.abs(meditationPercentage - 50) * 2

  // 确定偏好类型
  let preferredType: PracticeTypePreference['preferredType']
  if (Math.abs(meditationPercentage - breathingPercentage) < 20) {
    preferredType = 'balanced'
  } else if (meditationPercentage > breathingPercentage) {
    preferredType = 'meditation'
  } else {
    preferredType = 'breathing'
  }

  return {
    meditationPercentage: Math.round(meditationPercentage),
    breathingPercentage: Math.round(breathingPercentage),
    balanceScore: Math.round(balanceScore),
    preferredType,
    crossPracticeDays
  }
}

/**
 * 生成习惯洞察
 */
const generateHabitInsights = (
  dailyHistory: Record<string, DailyData>,
  sessions: Array<{
    date: string
    type: string
    duration: number
    hourOfDay: number
  }>
): HabitInsights => {
  const consistency = analyzePracticeConsistency(dailyHistory)
  const durationAnalysis = analyzeSessionDuration(sessions)
  const typePreference = analyzePracticeTypePreference(dailyHistory)

  // 计算习惯评分
  const consistencyScore = consistency.practiceRegularity
  const durationScore = durationAnalysis.preferredDuration === 'medium' ? 100 :
                       durationAnalysis.preferredDuration === 'short' ? 70 : 85
  const balanceScore = typePreference.balanceScore

  const habitScore = Math.round((consistencyScore + durationScore + balanceScore) / 3)

  // 确定个性类型
  let personalityType = ''
  if (habitScore >= 80) {
    personalityType = 'Zen Master'
  } else if (habitScore >= 60) {
    personalityType = 'Dedicated Practitioner'
  } else if (habitScore >= 40) {
    personalityType = 'Mindful Explorer'
  } else {
    personalityType = 'Beginning Journey'
  }

  // 生成优势
  const strengths: string[] = []
  if (consistency.practiceRegularity >= 70) strengths.push('Consistent practice routine')
  if (durationAnalysis.preferredDuration === 'medium') strengths.push('Ideal session duration')
  if (typePreference.balanceScore >= 70) strengths.push('Balanced practice approach')
  if (durationAnalysis.durationTrend === 'increasing') strengths.push('Growing practice endurance')

  // 生成改进建议
  const areasForImprovement: string[] = []
  if (consistency.practiceRegularity < 50) areasForImprovement.push('Practice consistency')
  if (durationAnalysis.preferredDuration === 'short') areasForImprovement.push('Session duration')
  if (typePreference.balanceScore < 50) areasForImprovement.push('Practice variety')
  if (consistency.consistencyTrend === 'declining') areasForImprovement.push('Recent motivation')

  // 生成个性化建议
  const recommendations: string[] = []
  if (consistency.preferredFrequency === 'irregular') {
    recommendations.push('Start with 3-4 sessions per week at fixed times')
  }
  if (durationAnalysis.preferredDuration === 'short') {
    recommendations.push('Gradually increase session length by 1-2 minutes weekly')
  }
  if (typePreference.preferredType === 'meditation') {
    recommendations.push('Try adding breathing exercises to enhance your practice')
  }
  if (habitScore < 60) {
    recommendations.push('Focus on building a consistent daily habit, even if brief')
  }

  // 确定动机水平
  let motivationLevel: HabitInsights['motivationLevel']
  if (habitScore >= 70) motivationLevel = 'high'
  else if (habitScore >= 40) motivationLevel = 'medium'
  else motivationLevel = 'low'

  return {
    personalityType,
    strengths,
    areasForImprovement,
    recommendations,
    habitScore,
    motivationLevel
  }
}

/**
 * 分析练习模式
 */
const analyzePracticePatterns = (dailyHistory: Record<string, DailyData>): PracticePattern => {
  const dayOfWeekPattern = [0, 0, 0, 0, 0, 0, 0] // Sunday to Saturday

  Object.entries(dailyHistory).forEach(([date, data]) => {
    if (data.meditationDuration > 0 || data.breathingSessions > 0) {
      const dayOfWeek = new Date(date).getDay()
      dayOfWeekPattern[dayOfWeek]++
    }
  })

  // 分析周趋势
  const recentWeeks: number[] = []
  const sortedDates = Object.keys(dailyHistory).sort()

  for (let i = 0; i < sortedDates.length; i += 7) {
    const weekDates = sortedDates.slice(i, i + 7)
    const weekPractices = weekDates.filter(date =>
      dailyHistory[date].meditationDuration > 0 || dailyHistory[date].breathingSessions > 0
    ).length
    recentWeeks.push(weekPractices)
  }

  let weeklyTrend: PracticePattern['weeklyTrend'] = 'stable'
  if (recentWeeks.length >= 4) {
    const recent = recentWeeks.slice(-2).reduce((sum, count) => sum + count, 0) / 2
    const older = recentWeeks.slice(0, 2).reduce((sum, count) => sum + count, 0) / 2

    if (recent > older * 1.2) weeklyTrend = 'increasing'
    else if (recent < older * 0.8) weeklyTrend = 'decreasing'
  }

  // 分析月度进展
  const monthlyProgression: number[] = []
  const monthlyData: Record<string, number> = {}

  Object.entries(dailyHistory).forEach(([date, data]) => {
    const month = date.substring(0, 7) // YYYY-MM
    if (!monthlyData[month]) monthlyData[month] = 0
    if (data.meditationDuration > 0 || data.breathingSessions > 0) {
      monthlyData[month]++
    }
  })

  Object.values(monthlyData).forEach(count => {
    monthlyProgression.push(count)
  })

  // 分析季节模式
  const seasonalPattern = {
    spring: 0, // March, April, May
    summer: 0, // June, July, August
    fall: 0,   // September, October, November
    winter: 0  // December, January, February
  }

  Object.entries(dailyHistory).forEach(([date, data]) => {
    if (data.meditationDuration > 0 || data.breathingSessions > 0) {
      const month = new Date(date).getMonth()
      if (month >= 2 && month <= 4) seasonalPattern.spring++
      else if (month >= 5 && month <= 7) seasonalPattern.summer++
      else if (month >= 8 && month <= 10) seasonalPattern.fall++
      else seasonalPattern.winter++
    }
  })

  return {
    dayOfWeekPattern,
    weeklyTrend,
    monthlyProgression,
    seasonalPattern
  }
}