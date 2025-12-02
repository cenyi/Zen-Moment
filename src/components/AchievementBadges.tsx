'use client'

import { useMemo } from 'react'
import { useTimerStore } from '../store/timerStore'

interface AchievementBadgesProps {
  theme: 'dark' | 'light'
}

interface Achievement {
  id: 'firstSession' | 'streak3' | 'streak7' | 'streak30' | 'total1Hour' | 'total10Hours' | 'total100Hours'
  title: string
  description: string
  icon: string
  category: 'milestone' | 'streak' | 'time'
}

export function AchievementBadges({ theme }: AchievementBadgesProps) {
  const { achievements, streak, totalDuration } = useTimerStore()

  const allAchievements: Achievement[] = [
    {
      id: 'firstSession',
      title: 'First Step',
      description: 'Complete your first meditation session',
      icon: '🌱',
      category: 'milestone'
    },
    {
      id: 'streak3',
      title: 'Week Warrior',
      description: 'Meditate for 3 consecutive days',
      icon: '🔥',
      category: 'streak'
    },
    {
      id: 'streak7',
      title: 'Week Master',
      description: 'Meditate for 7 consecutive days',
      icon: '⭐',
      category: 'streak'
    },
    {
      id: 'streak30',
      title: 'Monthly Champion',
      description: 'Meditate for 30 consecutive days',
      icon: '👑',
      category: 'streak'
    },
    {
      id: 'total1Hour',
      title: 'Hour of Peace',
      description: 'Accumulate 1 hour of total meditation time',
      icon: '⏰',
      category: 'time'
    },
    {
      id: 'total10Hours',
      title: 'Zen Master',
      description: 'Accumulate 10 hours of total meditation time',
      icon: '🧘‍♂️',
      category: 'time'
    },
    {
      id: 'total100Hours',
      title: 'Enlightened One',
      description: 'Accumulate 100 hours of total meditation time',
      icon: '✨',
      category: 'time'
    }
  ]

  const earnedAchievements = useMemo(() => {
    return allAchievements.filter(achievement => achievements[achievement.id])
  }, [achievements, allAchievements])

  const unearnedAchievements = useMemo(() => {
    return allAchievements.filter(achievement => !achievements[achievement.id])
  }, [achievements, allAchievements])

  const totalAchievements = allAchievements.length
  const earnedCount = earnedAchievements.length
  const completionRate = Math.round((earnedCount / totalAchievements) * 100)

  const getProgress = (achievementId: string) => {
    switch (achievementId) {
      case 'firstSession':
        return achievements.firstSession ? 100 : 0
      case 'streak3':
        return Math.min((streak / 3) * 100, 100)
      case 'streak7':
        return Math.min((streak / 7) * 100, 100)
      case 'streak30':
        return Math.min((streak / 30) * 100, 100)
      case 'total1Hour':
        return Math.min((totalDuration / 3600) * 100, 100)
      case 'total10Hours':
        return Math.min((totalDuration / 36000) * 100, 100)
      case 'total100Hours':
        return Math.min((totalDuration / 360000) * 100, 100)
      default:
        return 0
    }
  }

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/35'
        : 'neumorphic border border-gray-400/40'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          🏆 Achievements
        </h3>
        <div className={`text-sm font-medium ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          {earnedCount}/{totalAchievements}
        </div>
      </div>

      {/* 总体进度 */}
      <div className={`mb-6 p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            Completion Progress
          </span>
          <span className={`text-sm font-bold ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            {completionRate}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              theme === 'dark' ? 'bg-gradient-to-r from-green-600 to-blue-500' : 'bg-gradient-to-r from-green-500 to-blue-600'
            }`}
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 已获得的成就 */}
      <div className="mb-6">
        <h4 className={`text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-green-400' : 'text-green-600'
        }`}>
          Earned ({earnedAchievements.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {earnedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${
                theme === 'dark'
                  ? 'neumorphic-dark border-green-700/50 hover:shadow-neumorphic-dark-hover hover:border-green-600/70'
                  : 'neumorphic border-green-300 hover:shadow-neumorphic-hover hover:border-green-400/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className={`font-semibold text-sm mb-1 ${
                    theme === 'dark' ? 'text-green-300' : 'text-green-700'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {earnedAchievements.length === 0 && (
          <div className={`text-center py-8 text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Start meditating to unlock your first achievement! 🚀
          </div>
        )}
      </div>

      {/* 未获得的成就 */}
      <div>
        <h4 className={`text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Locked ({unearnedAchievements.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {unearnedAchievements.map((achievement) => {
            const progress = getProgress(achievement.id)
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border opacity-60 transition-all duration-300 hover:opacity-80 hover:scale-102 hover:-translate-y-0.5 cursor-pointer ${
                  theme === 'dark'
                    ? 'neumorphic-dark border-gray-700/50 hover:shadow-neumorphic-dark-hover hover:border-gray-600/70'
                    : 'neumorphic border-gray-300 hover:shadow-neumorphic-hover hover:border-gray-400/70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className={`text-xs mb-2 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </div>

                    {/* 进度条 */}
                    {progress > 0 && (
                      <div className="w-full h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 鼓励信息 */}
      {completionRate > 0 && completionRate < 100 && (
        <div className={`mt-4 text-center text-sm ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          {completionRate >= 50
            ? '🌟 You\'re halfway there! Keep up the great work!'
            : '🎯 Keep practicing to unlock more achievements!'
          }
        </div>
      )}

      {completionRate === 100 && (
        <div className={`mt-4 text-center text-sm font-bold ${
          theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
        }`}>
          🎉 Congratulations! You\'ve unlocked all achievements!
        </div>
      )}
    </div>
  )
}