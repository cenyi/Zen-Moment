'use client'

import { useState } from 'react'

interface CustomBreathingSettingsProps {
  theme: 'dark' | 'light'
  disabled: boolean
  onSettingsChange: (settings: CustomBreathingPattern) => void
}

export interface CustomBreathingPattern {
  inhale: number
  hold: number
  exhale: number
  holdAfter?: number
}

const DEFAULT_CUSTOM_PATTERN: CustomBreathingPattern = {
  inhale: 4,
  hold: 7,
  exhale: 8,
  holdAfter: 0
}

const PRESET_PATTERNS = [
  { name: '4-7-8 Classic', pattern: { inhale: 4, hold: 7, exhale: 8 } },
  { name: '3-6-6 Beginner', pattern: { inhale: 3, hold: 6, exhale: 6 } },
  { name: 'Box Breathing', pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 } },
  { name: '4-4-4 Calm', pattern: { inhale: 4, hold: 4, exhale: 4 } },
  { name: '5-5-5 Balanced', pattern: { inhale: 5, hold: 5, exhale: 5 } },
  { name: '6-2-6 Energy', pattern: { inhale: 6, hold: 2, exhale: 6 } }
]

export const CustomBreathingSettings = ({ theme, disabled, onSettingsChange }: CustomBreathingSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<CustomBreathingPattern>(DEFAULT_CUSTOM_PATTERN)

  const handleSettingChange = (key: keyof CustomBreathingPattern, value: number) => {
    const newSettings = { ...settings, [key]: Math.max(0, Math.min(20, value)) }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const handlePresetSelect = (preset: typeof PRESET_PATTERNS[0]) => {
    const newSettings = { ...preset.pattern }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const totalCycleTime = settings.inhale + settings.hold + settings.exhale + (settings.holdAfter || 0)

  return (
    <div className={`w-full max-w-3xl mx-auto p-8 rounded-3xl transition-all duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900/20 to-indigo-900 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10'
        : 'bg-gradient-to-br from-white via-teal-50/50 to-white border border-teal-200 shadow-xl shadow-teal-500/5'
    }`}>
      {/* Modern Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-500/20 to-teal-500/20 border border-indigo-400/30'
              : 'bg-gradient-to-br from-indigo-100 to-teal-100 border border-indigo-200'
          }`}>
            <svg className={`w-6 h-6 ${
              theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
            }`}>
              Custom Breathing Pattern
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
            }`}>
              Design your perfect breathing rhythm
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-500/30 to-teal-500/30 hover:from-indigo-500/40 hover:to-teal-500/40 border border-indigo-400/30 text-indigo-300'
              : 'bg-gradient-to-r from-indigo-200 to-teal-200 hover:from-indigo-300 hover:to-teal-300 border border-indigo-300 text-indigo-700'
          }`}
          disabled={disabled}
        >
          <svg className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Enhanced Current Settings Display */}
      <div className={`p-6 rounded-2xl mb-8 border-2 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-900/40 to-teal-900/20 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 to-teal-50/50 border-indigo-200'
      }`}>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-indigo-500/30 to-teal-500/30 border border-indigo-400/40'
                : 'bg-gradient-to-br from-indigo-200 to-teal-200 border border-indigo-300'
            }`}>
              <span className="text-2xl">{'\u{1F4A8}'}</span>
            </div>
            <div>
              <div className={`text-3xl font-mono font-bold ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                {settings.inhale}-{settings.hold}-{settings.exhale}
                {settings.holdAfter && settings.holdAfter > 0 ? `-${settings.holdAfter}` : ''}
              </div>
              <div className={`text-sm font-medium ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                Breathing Pattern
              </div>
            </div>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-currentColor to-transparent opacity-20" />

          <div className="text-center">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {totalCycleTime}s
            </div>
            <div className={`text-sm font-medium ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}>
              Total Cycle
            </div>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-currentColor to-transparent opacity-20" />

          <div className="text-center">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
            }`}>
              {Math.round(300 / totalCycleTime)} cycles
            </div>
            <div className={`text-sm font-medium ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Cycles in 5min
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Advanced Settings */}
      {isOpen && (
        <div className="space-y-8">
          {/* Preset Patterns */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
              }`}>
                <svg className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
              }`}>
                Quick Presets
              </h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRESET_PATTERNS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  disabled={disabled}
                  className={`
                    relative p-4 rounded-xl transition-all duration-300 transform
                    ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 hover:-translate-y-1'}
                    ${theme === 'dark'
                      ? 'bg-gradient-to-br from-slate-800/50 to-indigo-800/30 hover:from-slate-700/50 hover:to-indigo-700/30 border border-slate-600/30 hover:border-indigo-500/40'
                      : 'bg-gradient-to-br from-[#F6EFE4]/70 to-indigo-50/60 hover:from-[#F5E4C8]/85 hover:to-indigo-100/75 border border-[#D8C4A7]/55 hover:border-indigo-300/50'
                    }
                  `}
                >
                  <div className={`text-sm font-semibold mb-2 ${
                    theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
                  }`}>
                    {preset.name}
                  </div>
                  <div className={`text-xs font-mono ${
                    theme === 'dark' ? 'text-slate-400' : 'text-[#547160]'
                  }`}>
                    {preset.pattern.inhale}-{preset.pattern.hold}-{preset.pattern.exhale}
                    {preset.pattern.holdAfter ? `-${preset.pattern.holdAfter}` : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Timing Controls */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100'
              }`}>
                <svg className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
              }`}>
                Manual Fine-tuning
              </h4>
            </div>

            <div className="space-y-6">
              {/* Inhale Control */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200'
              }`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <span className="text-lg">{'\u{1F309}'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                      }`}>
                        Inhale
                      </span>
                      <span className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
                      }`}>
                        {settings.inhale}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={settings.inhale}
                      onChange={(e) => handleSettingChange('inhale', parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      disabled={disabled}
                      style={{
                        background: `linear-gradient(to right, #6F8EA0 0%, #6F8EA0 ${(settings.inhale - 1) * 100 / 19}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } ${(settings.inhale - 1) * 100 / 19}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Hold Control */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20'
                  : 'bg-gradient-to-r from-purple-50 to-pink-50/50 border border-purple-200'
              }`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                    <span className="text-lg">{'\u23F8'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                      }`}>
                        Hold
                      </span>
                      <span className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-purple-200' : 'text-purple-800'
                      }`}>
                        {settings.hold}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={settings.hold}
                      onChange={(e) => handleSettingChange('hold', parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      disabled={disabled}
                      style={{
                        background: `linear-gradient(to right, #8D7F9C 0%, #8D7F9C ${settings.hold * 100 / 20}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } ${settings.hold * 100 / 20}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Exhale Control */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20'
                  : 'bg-gradient-to-r from-green-50 to-emerald-50/50 border border-green-200'
              }`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
                  }`}>
                    <span className="text-lg">{'\u{1F4A8}'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-green-300' : 'text-green-700'
                      }`}>
                        Exhale
                      </span>
                      <span className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-green-200' : 'text-green-800'
                      }`}>
                        {settings.exhale}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={settings.exhale}
                      onChange={(e) => handleSettingChange('exhale', parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      disabled={disabled}
                      style={{
                        background: `linear-gradient(to right, #73977E 0%, #73977E ${(settings.exhale - 1) * 100 / 19}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } ${(settings.exhale - 1) * 100 / 19}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Rest Control */}
              <div className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-500/20'
                  : 'bg-gradient-to-r from-yellow-50 to-amber-50/50 border border-yellow-200'
              }`}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'
                  }`}>
                    <span className="text-lg">{'\u{1F30A}'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'
                      }`}>
                        Rest After
                      </span>
                      <span className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'
                      }`}>
                        {settings.holdAfter || 0}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={settings.holdAfter || 0}
                      onChange={(e) => handleSettingChange('holdAfter', parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      disabled={disabled}
                      style={{
                        background: `linear-gradient(to right, #BCA063 0%, #BCA063 ${(settings.holdAfter || 0) * 100 / 20}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } ${(settings.holdAfter || 0) * 100 / 20}%, ${
                          theme === 'dark' ? '#374151' : '#e5e7eb'
                        } 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tips */}
          <div className={`p-6 rounded-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-900/30 to-teal-900/20 border border-indigo-500/30'
              : 'bg-gradient-to-r from-indigo-50/50 to-teal-50/30 border border-indigo-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg mt-1 ${
                theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
              }`}>
                <svg className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-800'
                }`}>
                  Expert Tips
                </h4>
                <ul className={`space-y-1 text-sm ${
                  theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'
                }`}>
                  <li>{'\u2022'} <strong>4-7-8 pattern:</strong> Great for relaxation and sleep preparation</li>
                  <li>{'\u2022'} <strong>Equal patterns (4-4-4):</strong> Excellent for focus and concentration</li>
                  <li>{'\u2022'} <strong>Longer exhales:</strong> Help activate the parasympathetic nervous system</li>
                  <li>{'\u2022'} <strong>Start gentle:</strong> Begin with shorter times if you're new to breathing exercises</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

