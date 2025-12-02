import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_BREATHING_MODE, BreathingMode, BREATHING_MODES } from '../constants/breathingModes'
import { CustomBreathingPattern } from '../components/CustomBreathingSettings'

export interface TimerState {
  // 计时器状态
  isRunning: boolean
  isPaused: boolean
  duration: number
  remainingTime: number
  completedCycles: number

  // 呼吸练习状态
  isBreathing: boolean
  breathingPhase: 'inhale' | 'exhale' | 'hold'
  breathingProgress: number
  currentBreathCycle: number
  breathingModeId: string
  customBreathingPattern?: CustomBreathingPattern
  useCustomPattern: boolean

  // 背景声音状态
  backgroundSoundId: string
  backgroundSoundVolume: number

  // 主题状态
  theme: 'dark' | 'light'

  // 统计数据
  todayDuration: number
  totalDuration: number
  breathingSessions: number
  todayMeditationSessions: number  // 今天完成的冥想会话次数
  todayBreathingSessions: number  // 今天完成的呼吸练习次数
  streak: number

  // 历史数据
  dailyHistory: Record<string, {
    meditationDuration: number
    breathingSessions: number
    breathingModes: Record<string, number>
    date: string
  }>

  // 目标设置
  dailyGoalMinutes: number

  // 成就系统
  achievements: {
    firstSession: boolean
    streak3: boolean
    streak7: boolean
    streak30: boolean
    total1Hour: boolean
    total10Hours: boolean
    total100Hours: boolean
  }

  // 控制方法
  startTimer: (duration: number) => void
  pauseTimer: () => void
  resetTimer: () => void
  setDuration: (duration: number) => void
  tick: () => void
  completeTimer: () => void

  // 呼吸练习方法
  startBreathing: () => void
  pauseBreathing: () => void
  resetBreathing: () => void
  nextBreathPhase: () => void
  setBreathingMode: (modeId: string) => void
  setCustomBreathingPattern: (pattern: CustomBreathingPattern) => void
  setUseCustomPattern: (use: boolean) => void

  // 背景声音方法
  setBackgroundSoundId: (soundId: string) => void
  setBackgroundSoundVolume: (volume: number) => void

  // 主题切换
  toggleTheme: () => void
  setTheme: (theme: 'dark' | 'light') => void

  // 统计方法
  updateStats: (duration: number) => void
  resetDailyStats: () => void
  completeBreathingSession: () => void
  updateDailyHistory: () => void
  setDailyGoal: (minutes: number) => void
  checkAchievements: () => void
  getWeeklyData: () => Array<{ date: string; meditationDuration: number; breathingSessions: number }>
  getHeatmapData: () => Array<{ date: string; intensity: number }>
  getBreathingModeStats: () => Record<string, number>
  getTodayBreathingModeStats: () => Record<string, number>
  calculateStreak: () => number
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      // 初始状态
      isRunning: false,
      isPaused: false,
      duration: 300, // 5分钟默认
      remainingTime: 300,
      completedCycles: 0,

      isBreathing: false,
      breathingPhase: 'inhale',
      breathingProgress: 0,
      currentBreathCycle: 1,
      breathingModeId: DEFAULT_BREATHING_MODE,
      customBreathingPattern: undefined,
      useCustomPattern: false,

      backgroundSoundId: 'none',
      backgroundSoundVolume: 0.3,

      theme: 'dark',

      todayDuration: 0,
      totalDuration: 0,
      breathingSessions: 0,
      todayMeditationSessions: 0,
      todayBreathingSessions: 0,
      streak: 0,

      dailyHistory: {},
      dailyGoalMinutes: 15, // 默认15分钟目标
      achievements: {
        firstSession: false,
        streak3: false,
        streak7: false,
        streak30: false,
        total1Hour: false,
        total10Hours: false,
        total100Hours: false
      },

      // 计时器方法
      startTimer: (duration: number) => set({
        isRunning: true,
        isPaused: false,
        duration,
        remainingTime: duration
      }),

      pauseTimer: () => {
        const { isRunning, duration, remainingTime } = get()
        if (isRunning) {
          // 计算已经使用的时间
          const usedTime = duration - remainingTime
          if (usedTime > 0) {
            get().updateStats(usedTime)
          }
        }
        set({ isRunning: false, isPaused: true })
      },

      resetTimer: () => {
        const { isRunning, duration, remainingTime, isPaused } = get()
        // 只有在计时器正在运行或暂停时才记录已使用的时间
        if (isRunning || isPaused) {
          const usedTime = duration - remainingTime
          if (usedTime > 0) {
            get().updateStats(usedTime)
          }
        }
        set({
          isRunning: false,
          isPaused: false,
          remainingTime: duration
          // 不重置 completedCycles，保留统计数据
        })
      },

      setDuration: (newDuration: number) => set({
        duration: newDuration,
        remainingTime: newDuration,
        isRunning: false,
        isPaused: false
      }),

      tick: () => {
        const { remainingTime, isRunning, duration } = get()
        if (isRunning && remainingTime > 0) {
          const newTime = remainingTime - 1
          set({ remainingTime: newTime })

          // 完成时的处理
          if (newTime === 0) {
            get().completeTimer()
          }
        }
      },

      completeTimer: () => {
        const { duration, completedCycles, todayDuration } = get()

        set({
          isRunning: false,
          isPaused: false,
          completedCycles: completedCycles + 1,
          todayDuration: todayDuration + duration,
          totalDuration: get().totalDuration + duration,
          todayMeditationSessions: get().todayMeditationSessions + 1
        })

        // 更新历史数据后重新计算streak
        get().updateDailyHistory()
        get().calculateStreak()
      },

      // 呼吸练习方法
      startBreathing: () => set({
        isBreathing: true,
        breathingPhase: 'inhale',
        breathingProgress: 0,
        currentBreathCycle: 1
      }),

      pauseBreathing: () => set({ isBreathing: false }),

      resetBreathing: () => set({
        isBreathing: false,
        breathingPhase: 'inhale',
        breathingProgress: 0,
        currentBreathCycle: 1
      }),

      nextBreathPhase: () => {
        const {
          breathingPhase,
          currentBreathCycle,
          breathingProgress,
          breathingModeId,
          useCustomPattern,
          customBreathingPattern
        } = get()

        // 获取当前呼吸模式的参数
        let pattern
        if (useCustomPattern && customBreathingPattern) {
          pattern = customBreathingPattern
        } else {
          const currentMode = BREATHING_MODES[breathingModeId] || BREATHING_MODES[DEFAULT_BREATHING_MODE]
          pattern = currentMode.pattern
        }

        const { inhale, hold, exhale, holdAfter } = pattern

        if (breathingPhase === 'inhale' && breathingProgress >= inhale) {
          set({ breathingPhase: 'hold', breathingProgress: 0 })
        } else if (breathingPhase === 'hold' && breathingProgress >= hold) {
          set({ breathingPhase: 'exhale', breathingProgress: 0 })
        } else if (breathingPhase === 'exhale' && breathingProgress >= exhale) {
          // 检查是否有 exhale 后的 hold 阶段
          if (holdAfter && holdAfter > 0) {
            set({ breathingPhase: 'hold', breathingProgress: 0 })
          } else {
            // 检查是否完成所有循环（默认5个循环）
            if (currentBreathCycle >= 5) {
              // 完成呼吸练习会话
              get().completeBreathingSession()
              set({
                isBreathing: false,
                currentBreathCycle: 1,
                breathingPhase: 'inhale',
                breathingProgress: 0
              })
            } else {
              set({
                currentBreathCycle: currentBreathCycle + 1,
                breathingPhase: 'inhale',
                breathingProgress: 0
              })
            }
          }
        } else if (breathingPhase === 'hold' && holdAfter && breathingProgress >= holdAfter) {
          // 处理 exhale 后的 hold 阶段完成
          if (currentBreathCycle >= 5) {
            // 完成呼吸练习会话
            get().completeBreathingSession()
            set({
              isBreathing: false,
              currentBreathCycle: 1,
              breathingPhase: 'inhale',
              breathingProgress: 0
            })
          } else {
            set({
              currentBreathCycle: currentBreathCycle + 1,
              breathingPhase: 'inhale',
              breathingProgress: 0
            })
          }
        } else {
          set({ breathingProgress: breathingProgress + 1 })
        }
      },

      setBreathingMode: (modeId: string) => {
        const { isBreathing, breathingPhase } = get()

        // 无论是否在进行呼吸练习，都允许切换模式
        // 如果正在练习中，设置新模式但保持当前状态，在下一个阶段应用
        const updateConfig = {
          breathingModeId: modeId,
          useCustomPattern: false // 切换到预设模式时关闭自定义模式
        }

        // 如果不在练习中，则重置呼吸状态
        if (!isBreathing) {
          Object.assign(updateConfig, {
            breathingPhase: 'inhale',
            breathingProgress: 0,
            currentBreathCycle: 1
          })
        }

        set(updateConfig)
      },

      setCustomBreathingPattern: (pattern: CustomBreathingPattern) => set({
        customBreathingPattern: pattern,
        useCustomPattern: true,
        // 如果不在练习中，重置状态
        breathingPhase: 'inhale',
        breathingProgress: 0,
        currentBreathCycle: 1
      }),

      setUseCustomPattern: (use: boolean) => {
        const { isBreathing, breathingPhase } = get()

        const updateConfig = { useCustomPattern: use }

        // 如果不在练习中且切换模式，重置状态
        if (!isBreathing) {
          Object.assign(updateConfig, {
            breathingPhase: 'inhale',
            breathingProgress: 0,
            currentBreathCycle: 1
          })
        }

        set(updateConfig)
      },

      setBackgroundSoundId: (soundId: string) => set({
        backgroundSoundId: soundId
      }),

      setBackgroundSoundVolume: (volume: number) => set({
        backgroundSoundVolume: Math.max(0, Math.min(1, volume))
      }),

      // 主题方法
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        set({ theme: newTheme })
      },

      setTheme: (theme: 'dark' | 'light') => set({ theme }),

      // 统计方法
      updateStats: (duration: number) => {
        const { todayDuration, totalDuration } = get()
        set({
          todayDuration: todayDuration + duration,
          totalDuration: totalDuration + duration
        })
      },

      resetDailyStats: () => set({
        todayDuration: 0,
        todayMeditationSessions: 0,
        todayBreathingSessions: 0
      }),

      completeBreathingSession: () => {
        const { breathingSessions, breathingModeId, dailyHistory } = get()
        const today = new Date().toISOString().split('T')[0]
        const newBreathingSessions = breathingSessions + 1

        // 更新呼吸练习计数
        set({
          breathingSessions: newBreathingSessions,
          todayBreathingSessions: get().todayBreathingSessions + 1
        })

        // 同时更新历史数据中的呼吸模式使用次数
        const currentHistory = dailyHistory[today] || {
          meditationDuration: get().todayDuration,
          breathingSessions: breathingSessions,
          breathingModes: {},
          date: today
        }

        const updatedHistory = {
          ...currentHistory,
          breathingSessions: newBreathingSessions,
          breathingModes: {
            ...currentHistory.breathingModes,
            [breathingModeId]: (currentHistory.breathingModes[breathingModeId] || 0) + 1
          }
        }

        set({
          dailyHistory: {
            ...dailyHistory,
            [today]: updatedHistory
          }
        })
      },

      // 新增的数据方法
      updateDailyHistory: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        const currentHistory = state.dailyHistory[today] || {
          meditationDuration: 0,
          breathingSessions: 0,
          breathingModes: {},
          date: today
        }

        // 更新今天的冥想时长和呼吸会话数
        const updatedHistory = {
          ...currentHistory,
          meditationDuration: state.todayDuration,
          breathingSessions: state.todayBreathingSessions
        }

        set({
          dailyHistory: {
            ...state.dailyHistory,
            [today]: updatedHistory
          }
        })
      },

      setDailyGoal: (minutes: number) => set({ dailyGoalMinutes: minutes }),

      checkAchievements: () => {
        const state = get()
        const newAchievements = { ...state.achievements }

        // 首次练习
        if (!newAchievements.firstSession && (state.todayDuration > 0 || state.breathingSessions > 0)) {
          newAchievements.firstSession = true
        }

        // 连续天数成就
        if (!newAchievements.streak3 && state.streak >= 3) {
          newAchievements.streak3 = true
        }
        if (!newAchievements.streak7 && state.streak >= 7) {
          newAchievements.streak7 = true
        }
        if (!newAchievements.streak30 && state.streak >= 30) {
          newAchievements.streak30 = true
        }

        // 总时长成就
        const totalHours = state.totalDuration / 3600
        if (!newAchievements.total1Hour && totalHours >= 1) {
          newAchievements.total1Hour = true
        }
        if (!newAchievements.total10Hours && totalHours >= 10) {
          newAchievements.total10Hours = true
        }
        if (!newAchievements.total100Hours && totalHours >= 100) {
          newAchievements.total100Hours = true
        }

        set({ achievements: newAchievements })
      },

      getWeeklyData: () => {
        const state = get()
        const weeklyData = []
        const today = new Date()

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]

          const dayData = state.dailyHistory[dateStr] || {
            meditationDuration: 0,
            breathingSessions: 0,
            breathingModes: {},
            date: dateStr
          }

          weeklyData.push({
            date: dateStr,
            meditationDuration: dayData.meditationDuration,
            breathingSessions: dayData.breathingSessions
          })
        }

        return weeklyData
      },

      getHeatmapData: () => {
        const state = get()
        const heatmapData = []
        const today = new Date()

        // 生成过去12周的数据
        for (let i = 84; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]

          const dayData = state.dailyHistory[dateStr] || {
            meditationDuration: 0,
            breathingSessions: 0,
            breathingModes: {},
            date: dateStr
          }

          // 计算当天的练习强度（0-4级）
          const totalMinutes = dayData.meditationDuration / 60 + dayData.breathingSessions * 3
          let intensity = 0
          if (totalMinutes > 0) intensity = 1
          if (totalMinutes >= 5) intensity = 2
          if (totalMinutes >= 15) intensity = 3
          if (totalMinutes >= 30) intensity = 4

          heatmapData.push({
            date: dateStr,
            intensity
          })
        }

        return heatmapData
      },

      getBreathingModeStats: () => {
        const state = get()
        const modeStats: Record<string, number> = {}

        // 遍历所有历史数据，统计呼吸模式使用次数
        Object.values(state.dailyHistory).forEach(dayData => {
          Object.entries(dayData.breathingModes).forEach(([modeId, count]) => {
            modeStats[modeId] = (modeStats[modeId] || 0) + count
          })
        })

        return modeStats
      },

      getTodayBreathingModeStats: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        const todayData = state.dailyHistory[today]

        // 如果今天没有数据，返回空对象
        if (!todayData) {
          return {}
        }

        // 返回今天的呼吸模式统计
        return todayData.breathingModes || {}
      },

      calculateStreak: () => {
        const state = get()
        const today = new Date()
        let currentStreak = 0

        // 从今天开始往前检查连续练习的天数
        for (let i = 0; i < 365; i++) { // 最多检查一年
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]

          const dayData = state.dailyHistory[dateStr]
          const hasPractice = dayData && (
            dayData.meditationDuration > 0 ||
            dayData.breathingSessions > 0
          )

          if (hasPractice) {
            currentStreak++
          } else if (i > 0) { // 允许今天没有练习，但之前有连续记录
            break
          }
        }

        // 更新streak状态
        if (currentStreak !== state.streak) {
          set({ streak: currentStreak })
        }

        return currentStreak
      }
    }),
    {
      name: 'zen-moment-storage',
      partialize: (state) => ({
        theme: state.theme,
        todayDuration: state.todayDuration,
        totalDuration: state.totalDuration,
        breathingSessions: state.breathingSessions,
        todayMeditationSessions: state.todayMeditationSessions,
        todayBreathingSessions: state.todayBreathingSessions,
        completedCycles: state.completedCycles,
        breathingModeId: state.breathingModeId,
        customBreathingPattern: state.customBreathingPattern,
        useCustomPattern: state.useCustomPattern,
        backgroundSoundId: state.backgroundSoundId,
        backgroundSoundVolume: state.backgroundSoundVolume,
        streak: state.streak,
        dailyHistory: state.dailyHistory,
        dailyGoalMinutes: state.dailyGoalMinutes,
        achievements: state.achievements
      })
    }
  )
)