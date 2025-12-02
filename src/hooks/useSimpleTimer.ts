import { useState, useEffect } from 'react'
import { usePreRecordedSound } from './usePreRecordedSound'
import { formatTimerTime } from '../utils/timeFormatters'

export const useSimpleTimer = () => {
  // 计时器状态
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(300) // 5分钟默认值
  const [remainingTime, setRemainingTime] = useState(300)
  const [completedCycles, setCompletedCycles] = useState(0)
  
  // 呼吸模式相关功能已移至 useTimerStore 统一管理
  
  // 统计数据
  const [todayDuration, setTodayDuration] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [breathingSessions, setBreathingSessions] = useState(0)
  
  // UI和应用状态
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [loadingPhase, setLoadingPhase] = useState<'initializing' | 'preparing' | 'ready'>('initializing')
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

  // 声音控制 - 基础声音
  const {
    playStartSound,
    playEndSound,
    playPauseSound,
    playResetSound
  } = usePreRecordedSound(soundEnabled)
  
  // 呼吸模式相关功能已移至 useTimerStore 统一管理

  // 移动端防休眠功能
  useEffect(() => {
    const requestWakeLock = async () => {
      if (isRunning && 'wakeLock' in navigator) {
        try {
          const lock = await (navigator as any).wakeLock.request('screen')
          setWakeLock(lock)
          console.log('Wake lock activated')
        } catch (error) {
          console.warn('Failed to acquire wake lock:', error)
        }
      }
    }

    const releaseWakeLock = () => {
      if (wakeLock) {
        wakeLock.release()
          .then(() => {
            setWakeLock(null)
            console.log('Wake lock released')
          })
          .catch((error) => {
            console.warn('Failed to release wake lock:', error)
          })
      }
    }

    if (isRunning) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [isRunning])

  // 防止 hydration 不匹配 - 延迟挂载直到客户端完全加载
  useEffect(() => {
    setLoadingPhase('initializing')

    // 使用Promise和async/await重写初始化逻辑，更清晰易读
    const initializeApp = async () => {
      try {
        // 阶段1：初始化（100ms）
        await new Promise(resolve => setTimeout(resolve, 100))
        setLoadingPhase('preparing')

        // 阶段2：准备数据（300ms）
        await new Promise(resolve => setTimeout(resolve, 300))
        setMounted(true)
        
        // 从 localStorage 读取保存的数据，确保只在客户端执行
        if (typeof window !== 'undefined') {
          try {
            // 读取主题设置
            const savedTheme = localStorage.getItem('zen-theme') as 'dark' | 'light' | null
            if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
              setTheme(savedTheme)
            }

            // 读取统计数据
            const stats = localStorage.getItem('zen-meditation-stats')
            if (stats) {
              const parsedStats = JSON.parse(stats)
              setTodayDuration(parsedStats.todayDuration || 0)
              setStreak(parsedStats.streak || 0)
              setTotalDuration(parsedStats.totalDuration || 0)
              setBreathingSessions(parsedStats.breathingSessions || 0)
            }
            
            // 从store同步的streak数据
            const storeStreak = localStorage.getItem('zen-streak')
            if (storeStreak) {
              setStreak(parseInt(storeStreak, 10) || 0)
            }

            // 读取声音设置
            const savedSoundSetting = localStorage.getItem('zen-sound-enabled')
            if (savedSoundSetting !== null) {
              setSoundEnabled(savedSoundSetting === 'true')
            }

            // 检查是否是新的一天，重置今日时长但不影响streak
            const today = new Date().toDateString()
            const lastMeditation = localStorage.getItem('zen-last-meditation')
            if (lastMeditation !== today) {
              setTodayDuration(0)
            }
          } catch (error) {
            console.warn('Failed to read data from localStorage:', error)
          }
        }

        // 阶段3：准备完成（100ms）
        await new Promise(resolve => setTimeout(resolve, 100))
        setLoadingPhase('ready')
      } catch (error) {
        console.error('App initialization error:', error)
        setLoadingPhase('ready') // 即使出错也要让应用进入可用状态
      }
    }

    initializeApp()
  }, [])

  // 计时器逻辑 - 简化，移除重复的呼吸模式逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1

          // 当计时器到达0时的处理逻辑
          if (newTime === 0) {
            setIsRunning(false)
            setCompletedCycles((c) => c + 1)

            // 更新时长统计
            const newTodayDuration = todayDuration + duration
            setTodayDuration(newTodayDuration)
            setTotalDuration((t) => t + duration)

            // 播放结束声音
            if (soundEnabled) {
              playEndSound()
            }

            // 保存统计数据到 localStorage
            if (typeof window !== 'undefined') {
              try {
                // 从store同步获取streak值
                const storeStreak = localStorage.getItem('zen-streak')
                const currentStreak = storeStreak ? parseInt(storeStreak, 10) : streak

                // 保存统计数据
                const stats = {
                  todayDuration: newTodayDuration,
                  streak: currentStreak,
                  totalDuration: totalDuration + duration,
                  breathingSessions
                }
                localStorage.setItem('zen-meditation-stats', JSON.stringify(stats))
              } catch (error) {
                console.warn('Failed to save stats to localStorage:', error)
              }
            }
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning, remainingTime, duration, breathingSessions, playEndSound, soundEnabled, streak, todayDuration, totalDuration])

  
  const startTimer = (newDuration: number) => {
    // 输入验证：确保时长在合理范围内
    const validatedDuration = Math.max(30, Math.min(3600, newDuration)) // 最少30秒，最多60分钟

    setDuration(validatedDuration)
    setRemainingTime(validatedDuration)
    setIsRunning(true)
    setIsPaused(false)

    // 播放开始声音
    if (soundEnabled) {
      playStartSound()
    }
  }

  const resumeTimer = () => {
    // 只有在暂停状态下才允许恢复
    if (isPaused) {
      setIsRunning(true)
      setIsPaused(false)
    }
  }

  const pauseTimer = () => {
    // 只有在运行状态下才能暂停
    if (isRunning) {
      setIsRunning(false)
      setIsPaused(true)

      // 播放暂停声音
      if (soundEnabled) {
        playPauseSound()
      }
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    // 重置到原始设定的时长
    setRemainingTime(duration)

    // 播放重置声音
    if (soundEnabled) {
      playResetSound()
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('zen-theme', newTheme)
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
      }
    }
  }

  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled
    setSoundEnabled(newSoundEnabled)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('zen-sound-enabled', newSoundEnabled.toString())
      } catch (error) {
        console.warn('Failed to save sound setting to localStorage:', error)
      }
    }
  }

  const completeBreathingSession = () => {
    const newBreathingSessions = breathingSessions + 1
    setBreathingSessions(newBreathingSessions)

    // 保存统计数据，使用store中已经计算好的streak
    if (typeof window !== 'undefined') {
      try {
        // 从store同步获取streak值
        const storeStreak = localStorage.getItem('zen-streak')
        const currentStreak = storeStreak ? parseInt(storeStreak, 10) : streak
        
        const stats = {
          todayDuration,
          streak: currentStreak,
          totalDuration,
          breathingSessions: newBreathingSessions
        }
        localStorage.setItem('zen-meditation-stats', JSON.stringify(stats))
      } catch (error) {
        console.warn('Failed to save breathing stats to localStorage:', error)
      }
    }
  }

  return {
    // 状态
    isRunning,
    isPaused,
    duration,
    remainingTime,
    completedCycles,
    todayDuration,
    streak,
    totalDuration,
    breathingSessions,
    theme,
    mounted,
    soundEnabled,
    loadingPhase,

    // 方法
    startTimer,
    pauseTimer,
    resetTimer,
    resumeTimer,
    toggleTheme,
    toggleSound,
    completeBreathingSession,
    formatTime: formatTimerTime
  }
}