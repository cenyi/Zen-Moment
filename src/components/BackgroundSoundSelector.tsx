'use client'

import { useState } from 'react'
import { useTimerStore } from '../store/timerStore'

interface BackgroundSound {
  id: string
  name: string
  file: string
  icon: string
}

interface BackgroundSoundSelectorProps {
  theme: 'dark' | 'light'
  disabled: boolean
}

export const BACKGROUND_SOUNDS: BackgroundSound[] = [
  { id: 'none', name: 'None', file: '', icon: '--' },
  { id: 'rain', name: 'Rain', file: '/sounds/rain.mp3', icon: 'RA' },
  { id: 'forest', name: 'Forest', file: '/sounds/forest.wav', icon: 'FO' },
  { id: 'ocean', name: 'Ocean', file: '/sounds/ocean.wav', icon: 'OC' },
  { id: 'lake', name: 'Lake', file: '/sounds/lake.mp3', icon: 'LK' },
  { id: 'insects', name: 'Insects', file: '/sounds/insects.mp3', icon: 'IN' },
  { id: 'temple', name: 'Temple', file: '/sounds/temple.mp3', icon: 'TP' },
  { id: 'thunder', name: 'Thunder', file: '/sounds/thunder.wav', icon: 'TH' }
]

export const BackgroundSoundSelector = ({ theme, disabled }: BackgroundSoundSelectorProps) => {
  const { backgroundSoundId, setBackgroundSoundId } = useTimerStore()
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  const currentSound = BACKGROUND_SOUNDS.find(sound => sound.id === backgroundSoundId) || BACKGROUND_SOUNDS[0]

  const handleSoundSelect = (soundId: string) => {
    setBackgroundSoundId(soundId)
  }

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 rounded-3xl transition-all duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10'
        : 'bg-gradient-to-br from-white via-teal-50/50 to-white border border-teal-200 shadow-xl shadow-teal-500/5'
    }`}>
      {/* Modern Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-500/20 to-teal-500/20 border border-indigo-400/30'
              : 'bg-gradient-to-br from-indigo-100 to-teal-100 border border-indigo-200'
          }`}>
            <span className="text-2xl">{'\u{1F3B5}'}</span>
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
            }`}>
              Background Sounds
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
            }`}>
              Choose your meditation atmosphere
            </p>
          </div>
        </div>

        {backgroundSoundId !== 'none' && (
          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-indigo-500/30 to-teal-500/30 hover:from-indigo-500/40 hover:to-teal-500/40 border border-indigo-400/30 text-indigo-300'
                : 'bg-gradient-to-r from-indigo-200 to-teal-200 hover:from-indigo-300 hover:to-teal-300 border border-indigo-300 text-indigo-700'
            }`}
            disabled={disabled}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        )}
      </div>

      {/* Modern Sound Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {BACKGROUND_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundSelect(sound.id)}
            disabled={disabled}
            className={`
              relative group p-6 rounded-2xl transition-all duration-300 transform
              ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 hover:-translate-y-1'}
              ${backgroundSoundId === sound.id
                ? theme === 'dark'
                  ? 'bg-gradient-to-br from-indigo-500/30 to-teal-500/30 border-2 border-indigo-400 shadow-lg shadow-indigo-500/25'
                  : 'bg-gradient-to-br from-indigo-200 to-teal-200 border-2 border-indigo-400 shadow-lg shadow-indigo-500/20'
                : theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:from-slate-700/50 hover:to-slate-600/50 border border-slate-600/30'
                  : 'bg-gradient-to-br from-[#F6EFE4]/70 to-[#FBF4EA]/80 hover:from-[#EFE4D4]/85 hover:to-[#F8F1E7]/90 border border-[#D8CFC0]/55'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`text-4xl transition-transform duration-300 ${
                backgroundSoundId === sound.id ? 'scale-110 animate-pulse' : 'group-hover:scale-110'
              }`}>
                {sound.icon}
              </div>
              <span className={`text-sm font-semibold ${
                backgroundSoundId === sound.id
                  ? theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'
                  : theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#5A7466]'
              }`}>
                {sound.name}
              </span>
            </div>

            {/* Modern Selected Indicator */}
            {backgroundSoundId === sound.id && (
              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-500'
              } shadow-lg`}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Volume Control */}
      {showVolumeControl && backgroundSoundId !== 'none' && (
        <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-800/50 to-indigo-900/20 border-indigo-500/30'
            : 'bg-gradient-to-r from-[#F6EFE4] to-[#EFE4D4]/80 border-indigo-300/50'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${
                  theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
                }`}>
                  <svg className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'
                }`}>
                  Volume Level
                </span>
              </div>
              <span className={`text-lg font-bold ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                50%
              </span>
            </div>

            {/* Custom Styled Range Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                onChange={(e) => {
                  const volume = parseInt(e.target.value)
                  // TODO: Connect to actual volume control
                  console.log('Set background sound volume:', volume)
                  // Update the percentage display
                  const nextSibling = e.target.nextElementSibling as HTMLElement
                  if (nextSibling) {
                    nextSibling.textContent = `${volume}%`
                  }
                }}
                className={`w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-700'
                    : 'bg-[#DCCFBE]'
                }`}
                disabled={disabled}
                style={{
                  background: `linear-gradient(to right, ${
                    theme === 'dark' ? '#6B8F7A' : '#6B8F7A'
                  } 0%, ${
                    theme === 'dark' ? '#6B8F7A' : '#6B8F7A'
                  } 50%, ${
                    theme === 'dark' ? '#3A4E44' : '#DCCFBE'
                  } 50%, ${
                    theme === 'dark' ? '#3A4E44' : '#DCCFBE'
                  } 100%)`
                }}
              />
              <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: ${theme === 'dark' ? '#6B8F7A' : '#6B8F7A'};
                  cursor: pointer;
                  box-shadow: 0 0 10px ${theme === 'dark' ? 'rgba(107, 143, 122, 0.5)' : 'rgba(107, 143, 122, 0.3)'};
                  transition: all 0.3s ease;
                }
                input[type="range"]::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 0 20px ${theme === 'dark' ? 'rgba(107, 143, 122, 0.7)' : 'rgba(107, 143, 122, 0.5)'};
                }
                input[type="range"]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: ${theme === 'dark' ? '#6B8F7A' : '#6B8F7A'};
                  cursor: pointer;
                  box-shadow: 0 0 10px ${theme === 'dark' ? 'rgba(107, 143, 122, 0.5)' : 'rgba(107, 143, 122, 0.3)'};
                  transition: all 0.3s ease;
                }
              `}</style>
            </div>

            {/* Volume Level Indicators */}
            <div className="flex justify-between text-xs">
              {[0, 25, 50, 75, 100].map((level) => (
                <span key={level} className={
                  theme === 'dark' ? 'text-indigo-300/50' : 'text-indigo-600/50'
                }>
                  {level}%
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Status Display */}
      <div className={`mt-6 p-4 rounded-xl text-center ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-900/20 to-teal-900/20 border border-indigo-500/20'
          : 'bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-200'
      }`}>
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            backgroundSoundId === 'none'
              ? theme === 'dark' ? 'bg-[#5F7468]' : 'bg-[#B8AF9F]'
              : 'bg-green-500 animate-pulse'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'
          }`}>
            {backgroundSoundId === 'none'
              ? 'Ambient sounds disabled'
              : `Playing: ${currentSound.name}`
            }
          </span>
        </div>
      </div>
    </div>
  )
}

