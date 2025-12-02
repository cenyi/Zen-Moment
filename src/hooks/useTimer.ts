import { useEffect, useRef } from 'react'
import { useTimerStore } from '../store/timerStore'
import { BREATHING_MODES } from '../constants/breathingModes'
import { formatTimerTime } from '../utils/timeFormatters'

// 计时器Hook
export const useTimer = () => {
  const { isRunning, remainingTime, tick, completeTimer } = useTimerStore()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    } else if (remainingTime === 0 && isRunning) {
      // 确保在调用completeTimer后状态立即更新
      completeTimer()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning, remainingTime, tick, completeTimer])

  return { formatTime: formatTimerTime }
}

// 呼吸练习Hook
export const useBreathing = () => {
  const { isBreathing, breathingPhase, breathingProgress, currentBreathCycle, nextBreathPhase, breathingModeId } = useTimerStore()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isBreathing) {
      interval = setInterval(() => {
        nextBreathPhase()
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isBreathing, nextBreathPhase])

  const getBreathingText = (): string => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      default:
        return ''
    }
    }

  const getBreathingDuration = (): number => {
    const pattern = BREATHING_MODES[breathingModeId]?.pattern
    if (!pattern) return 1

    switch (breathingPhase) {
      case 'inhale':
        return pattern.inhale
      case 'hold':
        // 如果是 exhale 后的 hold，使用 holdAfter
        return pattern.holdAfter || pattern.hold
      case 'exhale':
        return pattern.exhale
      default:
        return 1
    }
  }

  const getProgressPercentage = (): number => {
    const totalDuration = getBreathingDuration()
    return (breathingProgress / totalDuration) * 100
  }

  return {
    getBreathingText,
    getBreathingDuration,
    getProgressPercentage,
    breathingPhase,
    breathingProgress,
    currentBreathCycle,
    breathingModeId
  }
}

// 主题Hook
export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useTimerStore()

  useEffect(() => {
    // 应用主题到document，确保只在客户端执行
    if (typeof window !== 'undefined' && document) {
      document.documentElement.className = theme
    }
  }, [theme])

  return { theme, toggleTheme, setTheme }
}

