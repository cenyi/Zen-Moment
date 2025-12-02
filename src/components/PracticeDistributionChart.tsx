'use client'

import { useMemo } from 'react'
import { useTimerStore } from '../store/timerStore'
import { DEFAULT_BREATHING_MODE, BREATHING_MODES } from '../constants/breathingModes'

interface PracticeDistributionChartProps {
  theme: 'dark' | 'light'
}

interface PracticeData {
  type: string
  label: string
  count: number
  color: string
  icon: string
}

export function PracticeDistributionChart({ theme }: PracticeDistributionChartProps) {
  const { getTodayBreathingModeStats, todayMeditationSessions, todayBreathingSessions } = useTimerStore()

  const breathingModeStats = useMemo(() => getTodayBreathingModeStats(), [getTodayBreathingModeStats])

  const practiceData = useMemo((): PracticeData[] => {
    const data: PracticeData[] = [
      {
        type: 'meditation',
        label: 'Meditation Timer',
        count: todayMeditationSessions,
        color: theme === 'dark' ? 'bg-blue-500' : 'bg-blue-700',
        icon: '⏱️'
      }
    ]

    // 添加呼吸练习数据
    Object.entries(breathingModeStats).forEach(([modeId, count]) => {
      const mode = BREATHING_MODES[modeId] || BREATHING_MODES[DEFAULT_BREATHING_MODE]
      data.push({
        type: modeId,
        label: mode.name,
        count: count,
        color: mode.color,
        icon: mode.icon
      })
    })

    return data.filter(item => item.count > 0)
  }, [breathingModeStats, todayMeditationSessions, todayBreathingSessions, theme])

  const totalSessions = useMemo(() => {
    return practiceData.reduce((sum, item) => sum + item.count, 0)
  }, [practiceData])

  const getPercentage = (count: number) => {
    return totalSessions > 0 ? Math.round((count / totalSessions) * 100) : 0
  }

  const getBarWidth = (count: number) => {
    const maxCount = Math.max(...practiceData.map(item => item.count))
    return maxCount > 0 ? (count / maxCount) * 100 : 0
  }

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/35'
        : 'neumorphic border border-gray-400/40'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${
        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
      }`}>
        📊 Practice Distribution
      </h3>

      <div className="space-y-4">
        {practiceData.length > 0 ? (
          <>
            {/* 条形图 */}
            <div className="space-y-3">
              {practiceData
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <div key={item.type} className="space-y-2 transition-all duration-300 hover:scale-102 hover:-translate-x-1 cursor-pointer rounded-lg p-2 -mx-2">
                    {/* 标签和百分比 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {getPercentage(item.count)}%
                        </span>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          ({item.count} {item.count === 1 ? 'session' : 'sessions'})
                        </span>
                      </div>
                    </div>

                    {/* 进度条 */}
                    <div className={`w-full h-6 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
                    }`}>
                      <div
                        className={`h-full ${item.color} transition-all duration-500 rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${getBarWidth(item.count)}%` }}
                      >
                        {getBarWidth(item.count) > 20 && (
                          <span className="text-xs text-white font-medium">
                            {item.count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* 饼图风格的总览 */}
            <div className={`mt-6 p-4 rounded-lg shadow-sm ${
              theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-gray-800'
              }`}>
                Session Overview
              </div>
              <div className="flex flex-wrap gap-2">
                {practiceData.map((item) => (
                  <div
                    key={item.type}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.color} text-white shadow-sm hover:scale-105 transition-all duration-200`}
                  >
                    {item.icon} {item.label}: {getPercentage(item.count)}%
                  </div>
                ))}
              </div>
            </div>

            {/* 洞察信息 */}
            <div className={`mt-4 p-4 rounded-lg border shadow-sm ${
              theme === 'dark' ? 'bg-blue-900/20 border-blue-700/50' : 'bg-blue-50 border-blue-300'
            }`}>
              <div className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
              }`}>
                💡 Your Practice Pattern
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {practiceData.length === 1 ? (
                  practiceData[0].type === 'meditation'
                    ? "You're focusing on meditation timer sessions. Try adding breathing exercises to diversify your practice!"
                    : `You're enjoying ${practiceData[0].label} exercises. Great for building consistency!`
                ) : practiceData.length === 2 ? (
                  `Nice balance between ${practiceData[0].label.toLowerCase()} and ${practiceData[1].label.toLowerCase()}!`
                ) : (
                  "Excellent variety in your practice! You're exploring different techniques to find what works best for you."
                )}
              </div>
            </div>
          </>
        ) : (
          /* 空状态 */
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <div className="text-4xl mb-4">📊</div>
            <div className="text-sm mb-2">
              No practice data yet
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
            }`}>
              Start meditating or try breathing exercises to see your practice distribution here
            </div>
          </div>
        )}

        {/* 统计摘要 */}
        {practiceData.length > 0 && (
          <div className={`mt-4 pt-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-center text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Total Sessions
              </span>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {totalSessions}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Practice Types
              </span>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                {practiceData.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}