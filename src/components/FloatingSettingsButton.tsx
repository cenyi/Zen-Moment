'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { useTimerStore } from '../store/timerStore'
import { BACKGROUND_SOUNDS } from './BackgroundSoundSelector'

// 懒加载Framer Motion
const MotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })))
const MotionButton = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.button })))

// 检测是否为移动设备的函数
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (typeof window !== 'undefined' && window.innerWidth <= 768)
}

interface FloatingSettingsButtonProps {
  theme: 'dark' | 'light'
  disabled: boolean
}

export const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({
  theme,
  disabled
}) => {
  const [showSettings, setShowSettings] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { backgroundSoundId, setBackgroundSoundId, backgroundSoundVolume, setBackgroundSoundVolume } = useTimerStore()

  // 检测设备类型
  useEffect(() => {
    setIsMobile(isMobileDevice())

    // 监听窗口大小变化
    const handleResize = () => {
      setIsMobile(isMobileDevice())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSettings = () => {
    if (!disabled) {
      setShowSettings(!showSettings)
    }
  }

  const closeSettings = () => {
    setShowSettings(false)
  }

  return (
    <>
      {/* 悬浮设置按钮 */}
      <Suspense fallback={
        <button
          onClick={toggleSettings}
          disabled={disabled}
          className={`
            fixed bottom-24 right-6
            w-12 h-12
            rounded-full
            flex items-center justify-center
            transition-colors duration-200
            shadow-lg
            hover:shadow-xl
            transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            z-50
            ${disabled
              ? 'opacity-40 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }
          `}
          title="Background Sound Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
      }>
        <MotionButton
          onClick={toggleSettings}
          disabled={disabled}
          className={`
            fixed bottom-24 right-6
            w-12 h-12
            rounded-full
            flex items-center justify-center
            text-xl font-bold
            z-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            transition-all duration-300
            shadow-lg hover:shadow-xl
            transform hover:scale-110 active:scale-95
            ${
              disabled
                ? 'opacity-40 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-purple-600 text-white hover:bg-purple-500 focus:ring-purple-400'
                  : 'bg-purple-500 text-white hover:bg-purple-400 focus:ring-purple-300'
            }
          `}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Show background sound settings"
          title="Background Sound Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </MotionButton>
      </Suspense>

      {/* 设置面板 */}
      {showSettings && !disabled && (
        <Suspense fallback={
          <div
            className={`
              fixed bottom-36 right-6
              w-80 max-w-sm
              p-6
              rounded-2xl
              shadow-2xl
              ${theme === 'dark'
                ? 'bg-gray-800 text-gray-100'
                : 'bg-white text-gray-800'
              }
              z-50
            `}
          >
            <div className="text-lg font-semibold mb-4">Settings</div>
            <div>Loading...</div>
          </div>
        }>
          <div
            className={`
              fixed bottom-40 right-8
              w-96 max-w-[85vw]
              max-h-[70vh] overflow-y-auto
              p-4
              rounded-lg
              shadow-md
              z-50
              border
              ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-100 border-gray-600'
                  : 'bg-white text-gray-800 border-gray-300'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSettings}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="text-base font-medium mb-4">Sound Settings</h3>

            {/* 背景声音选择器 */}
            <div className="mb-4">
              {/* 现代化声音选择网格 */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {BACKGROUND_SOUNDS.map((sound) => (
                  <button
                    key={sound.id}
                    className={`
                      relative p-3 rounded-lg transition-all duration-300 transform
                      ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                      ${
                        backgroundSoundId === sound.id
                          ? theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-2 border-purple-400'
                            : 'bg-gradient-to-br from-purple-200 to-blue-200 border-2 border-purple-400'
                          : theme === 'dark'
                            ? 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30'
                            : 'bg-gray-100/50 hover:bg-gray-200/50 border border-gray-300/30'
                      }
                    `}
                    disabled={disabled}
                    onClick={() => setBackgroundSoundId(sound.id)}
                    aria-label={`Select ${sound.name} background sound`}
                    aria-pressed={backgroundSoundId === sound.id}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`text-lg ${
                        backgroundSoundId === sound.id ? 'animate-pulse' : ''
                      }`}>
                        {sound.icon}
                      </div>
                      <span className={`text-xs font-medium ${
                        backgroundSoundId === sound.id
                          ? theme === 'dark' ? 'text-purple-200' : 'text-purple-800'
                          : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {sound.name}
                      </span>
                    </div>

                    {/* 选中指示器 */}
                    {backgroundSoundId === sound.id && (
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'
                      }`}>
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* 当前状态显示 */}
              <div className={`text-center p-2 rounded-lg text-xs ${
                theme === 'dark'
                  ? 'bg-gray-700/30 text-gray-300'
                  : 'bg-gray-100/50 text-gray-600'
              }`}>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    backgroundSoundId === 'none'
                      ? theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                      : 'bg-green-500 animate-pulse'
                  }`} />
                  <span>
                    {backgroundSoundId === 'none'
                      ? 'No background sound'
                      : `Playing: ${BACKGROUND_SOUNDS.find(s => s.id === backgroundSoundId)?.name || 'Unknown'}`
                    }
                  </span>
                </div>
              </div>

              {/* 音量控制 */}
              {backgroundSoundId !== 'none' && (
                <div className={`mt-4 p-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700/30 border-gray-600/30'
                    : 'bg-gray-100/50 border-gray-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        Volume
                      </span>
                    </div>
                    <span className={`text-sm font-mono ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {Math.round(backgroundSoundVolume * 100)}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={backgroundSoundVolume * 100}
                      onChange={(e) => setBackgroundSoundVolume(parseInt(e.target.value) / 100)}
                      disabled={disabled}
                      className={`
                        w-full h-2 rounded-lg appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        ${
                          disabled
                            ? 'opacity-40 cursor-not-allowed'
                            : ''
                        }
                        ${
                          theme === 'dark'
                            ? 'bg-gray-600 [&::-webkit-slider-thumb]:bg-purple-400 [&::-moz-range-thumb]:bg-purple-400'
                            : 'bg-gray-300 [&::-webkit-slider-thumb]:bg-purple-500 [&::-moz-range-thumb]:bg-purple-500'
                        }
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:scale-110
                      `}
                      aria-label="Volume control"
                      aria-valuenow={Math.round(backgroundSoundVolume * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    {/* 音量指示器 */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-2 rounded-full pointer-events-none transition-all duration-200 ${
                        theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'
                      }`}
                      style={{ width: `${backgroundSoundVolume * 100}%` }}
                    />
                  </div>
                  {/* 快速音量按钮 */}
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => setBackgroundSoundVolume(0)}
                      disabled={disabled}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        disabled
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      aria-label="Mute volume"
                    >
                      Mute
                    </button>
                    <button
                      onClick={() => setBackgroundSoundVolume(0.5)}
                      disabled={disabled}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        disabled
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      aria-label="Set volume to 50%"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => setBackgroundSoundVolume(1)}
                      disabled={disabled}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        disabled
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'dark'
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      aria-label="Set volume to 100%"
                    >
                      100%
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Suspense>
      )}

      {/* 点击外部区域关闭 */}
      {showSettings && !disabled && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeSettings}
        />
      )}
    </>
  )
}