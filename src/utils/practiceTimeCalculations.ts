import { DailyData } from '../types/meditationData'
import { BREATHING_MODES } from '../constants/breathingModes'

/**
 * 计算单个呼吸会话的实际时长（秒）
 * 根据呼吸模式和循环次数精确计算
 */
export const calculateBreathingSessionDuration = (breathingModeId: string): number => {
  const mode = BREATHING_MODES[breathingModeId] || BREATHING_MODES.relax
  const pattern = mode.pattern

  // 计算单个呼吸循环的时长
  const cycleTime = (pattern.inhale || 0) + (pattern.hold || 0) +
                   (pattern.exhale || 0) + (pattern.holdAfter || 0)

  // 标准呼吸练习为5个循环
  const totalCycles = 5

  return cycleTime * totalCycles
}

/**
 * 计算呼吸会话的加权平均时长（秒）
 * @param breathingModes 呼吸模式使用记录
 * @returns 平均时长（秒）
 */
export const calculateAverageBreathingDuration = (breathingModes: Record<string, number>): number => {
  const totalSessions = Object.values(breathingModes).reduce((sum, count) => sum + count, 0)

  if (totalSessions === 0) {
    // 默认使用relax模式的时长
    return calculateBreathingSessionDuration('relax')
  }

  let totalDuration = 0
  Object.entries(breathingModes).forEach(([modeId, sessions]) => {
    if (sessions > 0) {
      totalDuration += sessions * calculateBreathingSessionDuration(modeId)
    }
  })

  return Math.round(totalDuration / totalSessions)
}

/**
 * 计算单日总练习时间（分钟）
 * @param dailyData 每日数据
 * @returns 总练习时间（分钟）
 */
export const calculateTotalPracticeTime = (dailyData: DailyData): number => {
  // 冥想时间转换为分钟
  const meditationMinutes = Math.round(dailyData.meditationDuration / 60)

  // 计算呼吸会话的实际时长（基于使用的呼吸模式）
  const breathingMinutes = Math.round(
    calculateAverageBreathingDuration(dailyData.breathingModes || {}) / 60 * dailyData.breathingSessions
  )

  return meditationMinutes + breathingMinutes
}

/**
 * 计算多个日期的总练习时间
 * @param dailyDataList 多个每日数据数组
 * @returns 总练习时间（分钟）
 */
export const calculateTotalPracticeTimeForMultipleDays = (dailyDataList: DailyData[]): number => {
  return dailyDataList.reduce((total, dailyData) => {
    return total + calculateTotalPracticeTime(dailyData)
  }, 0)
}

/**
 * 计算练习时间的统计信息
 * @param dailyDataList 多个每日数据数组
 * @returns 包含平均值、最大值、最小值的统计对象
 */
export const calculatePracticeTimeStats = (dailyDataList: DailyData[]) => {
  if (dailyDataList.length === 0) {
    return {
      average: 0,
      max: 0,
      min: 0,
      total: 0
    }
  }

  const practiceTimes = dailyDataList.map(calculateTotalPracticeTime)
  const total = practiceTimes.reduce((sum, time) => sum + time, 0)
  const average = Math.round(total / dailyDataList.length)
  const max = Math.max(...practiceTimes)
  const min = Math.min(...practiceTimes)

  return {
    average,
    max,
    min,
    total
  }
}