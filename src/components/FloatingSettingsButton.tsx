'use client'

import { useEffect, useState } from 'react'
import { useTimerStore } from '../store/timerStore'
import { BACKGROUND_SOUNDS } from './BackgroundSoundSelector'

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
}

interface FloatingSettingsButtonProps {
  theme: 'dark' | 'light'
  disabled: boolean
}

export const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({ theme, disabled }) => {
  const [showSettings, setShowSettings] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { backgroundSoundId, setBackgroundSoundId, backgroundSoundVolume, setBackgroundSoundVolume } = useTimerStore()

  useEffect(() => {
    const syncDevice = () => setIsMobile(isMobileDevice())
    syncDevice()
    window.addEventListener('resize', syncDevice)
    return () => window.removeEventListener('resize', syncDevice)
  }, [])

  if (isMobile) return null

  return (
    <>
      <button
        onClick={() => !disabled && setShowSettings(prev => !prev)}
        disabled={disabled}
        className={`
          fixed bottom-24 right-6 w-12 h-12 rounded-full flex items-center justify-center z-50
          text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${disabled
            ? 'opacity-40 cursor-not-allowed'
            : theme === 'dark'
              ? 'bg-[#244033] text-[#EBECE8] hover:bg-[#2F5242] focus:ring-[#8ABFA2]'
              : 'bg-[#5B836B] text-[#FFF6EA] hover:bg-[#4A705D] focus:ring-[#6E9B7F]'
          }
        `}
        aria-label="Show background sound settings"
        title="Background Sound Settings"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      </button>

      {showSettings && !disabled && (
        <div
          className={`
            fixed bottom-40 right-8 w-96 max-w-[85vw] max-h-[70vh] overflow-y-auto p-4 rounded-lg shadow-md z-50 border
            ${theme === 'dark'
              ? 'bg-[#1A2A21] text-[#EBECE8] border-[#587862]'
              : 'bg-[#FFF5E7] text-[#2D2A24] border-[#D8C4A7]'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowSettings(false)}
            className={`absolute top-2 right-2 transition-colors ${
              theme === 'dark'
                ? 'text-[#AAC7B5] hover:text-[#EBECE8]'
                : 'text-[#6E886F] hover:text-[#2D2A24]'
            }`}
            aria-label="Close settings"
          >
            X
          </button>

          <h3 className="text-base font-semibold mb-4">Sound Settings</h3>

          <div className="mb-4">
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
                          ? 'bg-gradient-to-br from-[#6E9B7F]/35 to-[#7EA9C2]/32 border-2 border-[#8ABFA2]'
                          : 'bg-gradient-to-br from-[#DDEDDC] to-[#EED9BF] border-2 border-[#6E9B7F]/60'
                        : theme === 'dark'
                          ? 'bg-[#24362B]/55 hover:bg-[#2F4437]/65 border border-[#4F6F5C]/45'
                          : 'bg-[#F8E8D0]/72 hover:bg-[#F2DFC2]/86 border border-[#D8C4A7]/55'
                    }
                  `}
                  disabled={disabled}
                  onClick={() => setBackgroundSoundId(sound.id)}
                  aria-label={`Select ${sound.name} background sound`}
                  aria-pressed={backgroundSoundId === sound.id}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`text-lg ${backgroundSoundId === sound.id ? 'animate-pulse' : ''}`}>{sound.icon}</div>
                    <span
                      className={`text-xs font-medium ${
                        backgroundSoundId === sound.id
                          ? theme === 'dark'
                            ? 'text-[#DDEBDD]'
                            : 'text-[#3E6251]'
                          : theme === 'dark'
                            ? 'text-[#B4CFBE]'
                            : 'text-[#547160]'
                      }`}
                    >
                      {sound.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className={`text-center p-2 rounded-lg text-xs ${theme === 'dark' ? 'bg-[#24362B]/45 text-[#B4CFBE]' : 'bg-[#F8E8D0]/72 text-[#547160]'}`}>
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    backgroundSoundId === 'none'
                      ? theme === 'dark'
                        ? 'bg-[#6A8273]'
                        : 'bg-[#BFA782]'
                      : 'bg-green-500 animate-pulse'
                  }`}
                />
                <span>
                  {backgroundSoundId === 'none'
                    ? 'No background sound'
                    : `Playing: ${BACKGROUND_SOUNDS.find(s => s.id === backgroundSoundId)?.name || 'Unknown'}`}
                </span>
              </div>
            </div>

            {backgroundSoundId !== 'none' && (
              <div className={`mt-4 p-3 rounded-lg border ${theme === 'dark' ? 'bg-[#24362B]/45 border-[#4F6F5C]/40' : 'bg-[#F8E8D0]/72 border-[#D8C4A7]/55'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-[#DCEADD]' : 'text-[#4A6A59]'}`}>Volume</span>
                  <span className={`text-sm font-mono ${theme === 'dark' ? 'text-[#B4CFBE]' : 'text-[#547160]'}`}>{Math.round(backgroundSoundVolume * 100)}%</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={backgroundSoundVolume * 100}
                    onChange={(e) => setBackgroundSoundVolume(parseInt(e.target.value, 10) / 100)}
                    disabled={disabled}
                    className={`
                      w-full h-2 rounded-lg appearance-none cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-[#6E9B7F] focus:ring-offset-2
                      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                      ${
                        theme === 'dark'
                          ? 'bg-[#40614F] [&::-webkit-slider-thumb]:bg-[#8ABFA2] [&::-moz-range-thumb]:bg-[#8ABFA2]'
                          : 'bg-[#DCC8AD] [&::-webkit-slider-thumb]:bg-[#6E9B7F] [&::-moz-range-thumb]:bg-[#6E9B7F]'
                      }
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
                    `}
                    aria-label="Volume control"
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-2 rounded-full pointer-events-none ${theme === 'dark' ? 'bg-[#8ABFA2]' : 'bg-[#6E9B7F]'}`}
                    style={{ width: `${backgroundSoundVolume * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showSettings && !disabled && <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />}
    </>
  )
}

