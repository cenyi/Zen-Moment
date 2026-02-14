'use client'

import { useEffect, useState, lazy, Suspense } from 'react'
import { useTimerStore } from '../../store/timerStore'
import { useBreathing } from '../../hooks/useTimer'
import { usePreRecordedSound } from '../../hooks/usePreRecordedSound'
import { useBackgroundSound } from '../../hooks/useBackgroundSound'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { BreathingModeSelector } from '../../components/BreathingModeSelector'
import { CustomBreathingSettings } from '../../components/CustomBreathingSettings'
import { FloatingSettingsButton } from '../../components/FloatingSettingsButton'
import { FAQ } from '../../components/FAQ'

// 鎳掑姞杞紽ramer Motion鍜孎loatingHelpButton
const MotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })))
const FloatingHelpButton = lazy(() => import('../../components/FloatingHelpButton').then(mod => ({ default: mod.FloatingHelpButton })))

// Define CustomBreathingPattern locally to avoid import issues
interface CustomBreathingPattern {
  inhale: number
  hold: number
  exhale: number
  holdAfter?: number
}

export default function BreathingPageClient() {
  const [mounted, setMounted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const { playBreathingPhaseSound } = usePreRecordedSound(soundEnabled)

  const storeData = useTimerStore()
  const {
    isBreathing: storeIsBreathing,
    breathingPhase,
    breathingProgress,
    currentBreathCycle,
    breathingModeId,
    useCustomPattern,
    customBreathingPattern,
    backgroundSoundId,
    backgroundSoundVolume,
    startBreathing,
    pauseBreathing,
    resetBreathing,
    setBreathingMode,
    setCustomBreathingPattern,
    setBackgroundSoundId,
    setBackgroundSoundVolume,
    theme,
    toggleTheme
  } = storeData

  // 鑳屾櫙澹伴煶鍔熻兘
  const {
    playBackgroundSound,
    stopBackgroundSound,
    setVolume: setBackgroundVolume
  } = useBackgroundSound(backgroundSoundId, soundEnabled, false)

  const {
    getBreathingText,
    getBreathingDuration,
    getProgressPercentage
  } = useBreathing()

  useEffect(() => {
    setMounted(true)

    // 璇诲彇澹伴煶璁剧疆
    const savedSoundSetting = localStorage.getItem('zen-sound-enabled')
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting === 'true')
    }
  }, [])

  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled
    setSoundEnabled(newSoundEnabled)
    localStorage.setItem('zen-sound-enabled', newSoundEnabled.toString())
  }

  // Apply custom breathing pattern settings.
  const handleCustomBreathingSettings = (pattern: CustomBreathingPattern) => {
    setCustomBreathingPattern(pattern)
  }

  useEffect(() => {
    if (storeIsBreathing && soundEnabled && breathingPhase) {
      playBreathingPhaseSound(breathingPhase)
    }
  }, [breathingPhase, storeIsBreathing, soundEnabled, playBreathingPhaseSound])

  // 缁熶竴绠＄悊鑳屾櫙闊虫晥閫昏緫
  useEffect(() => {
    // Priority 1: explicit "none" always stops playback.
    if (backgroundSoundId === 'none') {
      stopBackgroundSound()
      return
    }

    // 浼樺厛绾?2: 濡傛灉澹伴煶鏈惎鐢紝鍋滄
    if (!soundEnabled) {
      stopBackgroundSound()
      return
    }

    // Priority 3: play when breathing is active and a valid sound is selected.
    if (storeIsBreathing && backgroundSoundId !== 'none') {
      playBackgroundSound()
      return
    }

    // 浼樺厛绾?4: 鍏朵粬鎯呭喌鍋滄
    stopBackgroundSound()
  }, [backgroundSoundId, soundEnabled, storeIsBreathing, playBackgroundSound, stopBackgroundSound])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'Space':
          e.preventDefault()
          if (storeIsBreathing) {
            resetBreathing()
          } else {
            startBreathing()
          }
          break
        case 'Escape':
        case 'Esc':
          e.preventDefault()
          if (storeIsBreathing) {
            resetBreathing()
          }
          break
        case 'Enter':
          e.preventDefault()
          if (!storeIsBreathing) {
            startBreathing()
          }
          break
      }
    }

    if (mounted) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mounted, storeIsBreathing, startBreathing, resetBreathing])

  // Prevent hydration mismatch.
  if (!mounted) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'theme-page-dark'
          : 'theme-page-light'
      }`}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${
      theme === 'dark'
        ? 'theme-page-dark'
        : 'theme-page-light'
    }`}>
      {/* Navigation */}
      <Navigation
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {/* 绗竴灞忥細娌夋蹈寮忓懠鍚镐綋楠?*/}
      <div className={`min-h-screen flex flex-col items-center px-4 pt-8 pb-2 ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}>
        {/* 椤甸潰涓绘爣棰?*/}
        <h1 className={`text-3xl md:text-4xl font-light mb-8 text-center ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Free Breathing Exercises Online: 4-7-8, Box Breathing & More
        </h1>

        {/* 妯″紡閫夋嫨鍣ㄥ尯鍩?*/}
        <div className="w-full max-w-2xl mb-6">
          <BreathingModeSelector
            currentModeId={breathingModeId}
            onModeChange={setBreathingMode}
            theme={theme}
            disabled={storeIsBreathing}
          />
        </div>

        {/* 鑷畾涔夊懠鍚告ā寮忚缃?*/}
        {useCustomPattern && (
          <div className="w-full max-w-2xl mb-8">
            <CustomBreathingSettings
              theme={theme}
              disabled={storeIsBreathing}
              onSettingsChange={handleCustomBreathingSettings}
            />
          </div>
        )}

        {/* 鍛煎惛鍔ㄧ敾鍦嗗湀鍖哄煙 */}
        <div className="flex items-center justify-center my-4" role="region" aria-label="Breathing animation">
          <div className="relative">
            {/* 鏂版嫙鎬佽儗鏅渾鍦?*/}
            <div className={`absolute rounded-full transition-all duration-1000 neumorphic-breathing-circle ${
              theme === 'dark' ? 'neumorphic-dark border border-gray-600/10' : 'neumorphic border border-gray-400/15'
            } neumorphic-breathing`} />

            <Suspense fallback={
              <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center relative overflow-hidden`} />
            }>
              <MotionDiv
                className={`w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center relative overflow-hidden`}
                animate={{
                  scale: storeIsBreathing ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  duration: getBreathingDuration(),
                  repeat: storeIsBreathing ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {/* 澶栧湀瑁呴グ */}
                <div className={`absolute w-full h-full rounded-full border-2 ${
                  theme === 'dark' ? 'border-gray-600/50' : 'border-gray-300/50'
                }`} />
                <div className={`absolute w-4/5 h-4/5 rounded-full border ${
                  theme === 'dark' ? 'border-gray-500/50' : 'border-gray-400/50'
                }`} />

                {/* 涓讳綋鍛煎惛鍦嗗湀 - 鏂版嫙鎬侀鏍?*/}
                <div
                  className={`w-48 h-48 md:w-56 md:h-56 rounded-full transition-all duration-1000 ease-in-out relative overflow-hidden ${
                    theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
                  }`}
                >
                  {/* 鏂版嫙鎬佸唴閮ㄥ厜鏅曟晥鏋?*/}
                  <div className={`absolute inset-2 rounded-full transition-all duration-1000 ease-in-out ${
                    theme === 'dark' ? 'neumorphic-dark-flat' : 'neumorphic-flat'
                  } ${
                    breathingPhase === 'inhale' ? 'scale-110' : 'scale-100'
                  }`} />

                  {/* 鍛煎惛闃舵鎸囩ず鍣?- 澧炲己鑹插僵楗卞拰搴?*/}
                  <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-1000 ${
                    breathingPhase === 'inhale'
                      ? breathingModeId === 'relax'
                        ? 'bg-gradient-to-br from-blue-500/50 to-blue-600/40'
                        : breathingModeId === 'focus'
                        ? 'bg-gradient-to-br from-purple-500/50 to-purple-600/40'
                        : breathingModeId === 'energy'
                        ? 'bg-gradient-to-br from-orange-500/50 to-orange-600/40'
                        : 'bg-gradient-to-br from-green-500/50 to-green-600/40'
                      : breathingPhase === 'hold'
                      ? breathingModeId === 'relax'
                        ? 'bg-gradient-to-br from-indigo-500/45 to-indigo-600/35'
                        : breathingModeId === 'focus'
                        ? 'bg-gradient-to-br from-violet-500/45 to-violet-600/35'
                        : breathingModeId === 'energy'
                        ? 'bg-gradient-to-br from-red-500/45 to-red-600/35'
                        : 'bg-gradient-to-br from-teal-500/45 to-teal-600/35'
                      : breathingModeId === 'relax'
                        ? 'bg-gradient-to-br from-blue-500/25 to-blue-600/15'
                        : breathingModeId === 'focus'
                        ? 'bg-gradient-to-br from-purple-500/25 to-purple-600/15'
                        : breathingModeId === 'energy'
                        ? 'bg-gradient-to-br from-orange-500/25 to-orange-600/15'
                        : 'bg-gradient-to-br from-green-500/25 to-green-600/15'
                  }`} />

                  {/* 鍛兼皵鏃剁殑绮掑瓙鏁堟灉 */}
                  {breathingPhase === 'exhale' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-2 border-white/20 animate-ping" />
                    </div>
                  )}

                  {/* 鍛煎惛鎸囧鏂囧瓧 - 鍦ㄥ渾鍦堜腑蹇?*/}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center z-10">
                      <div className={`text-3xl md:text-4xl font-medium mb-2 ${
                        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                      }`}>
                        {getBreathingText()}
                      </div>
                      <div className={`text-5xl md:text-6xl font-light ${
                        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                      }`}>
                        {breathingProgress}
                      </div>
                      <div className={`text-sm mt-2 ${
                        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                      }`}>
                        Cycle {currentBreathCycle}/4
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </Suspense>
          </div>
        </div>

        {/* 搴曢儴鎺у埗鍖哄煙 */}
        <div className="mt-10 mb-8 flex flex-col items-center gap-8">
          {/* 杩涘害鏉?- 鍙湪鍛煎惛鏃舵樉绀?*/}
          {storeIsBreathing && (
            <div className="w-72 md:w-96 mb-6">
              <div className={`w-full rounded-full h-4 relative overflow-hidden ${
                theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
              }`}>
                {/* 鏂版嫙鎬佽儗鏅?*/}
                <div className={`absolute inset-0 rounded-full ${
                  theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-400/10 to-purple-400/10'
                }`} />

                {/* 鏂版嫙鎬佽繘搴︽潯 */}
                <Suspense fallback={
                  <div
                    className={`h-4 rounded-full relative overflow-hidden transition-all duration-500 ease-out ${
                      theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                    }`}
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                }>
                  <MotionDiv
                    className={`h-4 rounded-full relative overflow-hidden transition-all duration-500 ease-out ${
                      theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                  {/* 鍐呴儴鍏夋晥 - 澧炲己鏆楄壊妯″紡瀵规瘮搴?*/}
                  <div className={`absolute inset-0 rounded-full ${
                    theme === 'dark' ? 'bg-gradient-to-r from-blue-500/60 to-purple-500/60' : 'bg-gradient-to-r from-blue-400/40 to-purple-400/40'
                  }`} />
                  </MotionDiv>
                </Suspense>

                {/* 杩涘害鏂囧瓧 */}
                <div className={`absolute -top-8 right-0 text-sm font-medium ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {Math.round(getProgressPercentage())}%
                </div>
              </div>
            </div>
          )}

          {/* 鎺у埗鎸夐挳 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!storeIsBreathing ? (
            <button
              onClick={startBreathing}
              className={`
                relative group overflow-hidden
                px-16 py-6 rounded-3xl
                text-2xl font-medium tracking-wide
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                min-w-[260px] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1
                active:shadow-neumorphic-inset active:translate-y-0
                ${theme === 'dark'
                  ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white border border-cyan-500/40 hover:border-cyan-400/60 hover:from-cyan-500 hover:to-blue-600'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border border-cyan-400/50 hover:border-cyan-300/70 hover:from-cyan-400 hover:to-blue-500'
                }
              `}
            >
              {/* 鎸夐挳鑳屾櫙鍏夋檿鏁堟灉 */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20' 
                  : 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20'
              }`} />

              {/* 鎸夐挳鏂囧瓧鍜屽浘鏍?*/}
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-3xl">{'\uD83C\uDF2C\uFE0F'}</span>
                <span>Start Breathing</span>
              </div>

              {/* 澧炲己鐨勮剦鍐插姩鐢?*/}
              <div className={`absolute inset-0 rounded-3xl border-2 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' ? 'border-cyan-400/50' : 'border-cyan-300/60'
              }`} />
            </button>
          ) : (
            <>
              <button
                onClick={pauseBreathing}
                className={`
                  relative group overflow-hidden
                  px-12 py-5 rounded-2xl
                  text-xl font-medium tracking-wide
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  min-w-[160px] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1
                  active:shadow-neumorphic-inset active:translate-y-0
                  ${theme === 'dark'
                    ? 'bg-gradient-to-br from-amber-600 to-yellow-700 text-white border border-amber-500/40 hover:border-amber-400/60 hover:from-amber-500 hover:to-yellow-600'
                    : 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white border border-amber-400/50 hover:border-amber-300/70 hover:from-amber-400 hover:to-yellow-500'
                  }
                `}
              >
                {/* 鎸夐挳鑳屾櫙鍏夋檿鏁堟灉 */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/20' 
                    : 'bg-gradient-to-br from-amber-400/20 to-yellow-500/20'
                }`} />

                {/* 鎸夐挳鏂囧瓧鍜屽浘鏍?*/}
                <div className="relative flex items-center justify-center space-x-2">
                  <span className="text-2xl">{'\u23F8\uFE0F'}</span>
                  <span>Pause</span>
                </div>
              </button>

              <button
                onClick={resetBreathing}
                className={`
                  relative group overflow-hidden
                  px-12 py-5 rounded-2xl
                  text-xl font-medium tracking-wide
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  min-w-[160px] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1
                  active:shadow-neumorphic-inset active:translate-y-0
                  ${theme === 'dark'
                    ? 'bg-gradient-to-br from-rose-600 to-red-700 text-white border border-rose-500/40 hover:border-rose-400/60 hover:from-rose-500 hover:to-red-600'
                    : 'bg-gradient-to-br from-rose-500 to-red-600 text-white border border-rose-400/50 hover:border-rose-300/70 hover:from-rose-400 hover:to-red-500'
                  }
                `}
              >
                {/* 鎸夐挳鑳屾櫙鍏夋檿鏁堟灉 */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-rose-500/20 to-red-600/20' 
                    : 'bg-gradient-to-br from-rose-400/20 to-red-500/20'
                }`} />

                {/* 鎸夐挳鏂囧瓧鍜屽浘鏍?*/}
                <div className="relative flex items-center justify-center space-x-2">
                  <span className="text-2xl">{'\u21BA'}</span>
                  <span>Reset</span>
                </div>
              </button>
            </>
          )}
          </div>

          {/* 鎮诞鎸夐挳缁?*/}
          <Suspense fallback={null}>
            <FloatingSettingsButton
              theme={theme}
              disabled={storeIsBreathing}
            />
            <FloatingHelpButton
              theme={theme}
              shortcuts={[
                { key: 'Space', action: 'Start/Pause' },
                { key: 'Esc', action: 'Stop/Reset' },
                { key: 'Enter', action: 'Start' }
              ]}
            />
          </Suspense>
        </div>
      </div>

      {/* 绗簩灞忥細Mindfulness & Breathing Connection */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mindfulness Header */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'bg-purple-100 text-purple-600 border border-purple-200'
            }`}>
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span>Mindfulness & Breathing</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Master Breathing Exercises & Techniques Online
            </h2>
            <p className={`text-xl font-light max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Zen Moment's free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and quick relaxation. Practice breathing exercises before sleep or during work stress. Best free breathing exercises app.
            </p>
          </div>

          {/* Mindfulness Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDC41\uFE0F'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
              }`}>
                Present Moment Awareness
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Mindful breathing anchors you in the present moment, reducing anxiety about the future and regrets about the past. Each breath becomes a doorway to mindfulness and deeper self-awareness.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDF0A'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
              }`}>
                Emotional Regulation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Mindfulness breathing helps observe emotions without judgment, creating space between stimulus and response. This enhanced emotional intelligence leads to better decision-making and relationships.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDFAF'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-green-300' : 'text-green-600'
              }`}>
                Enhanced Concentration
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Regular mindfulness breathing practice strengthens attention muscles, improving focus in daily activities. Experience greater productivity and mental clarity through consistent mindful awareness.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDC97'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-pink-300' : 'text-pink-600'
              }`}>
                Self-Compassion Growth
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Mindfulness breathing cultivates self-compassion and kindness toward yourself and others. Develop a more positive self-image and reduce harsh self-criticism through gentle awareness practices.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDEE1\uFE0F'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
              }`}>
                Stress Resilience
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Build resilience to life's challenges through mindfulness breathing. Develop the ability to remain calm and centered amidst chaos, transforming stress into opportunities for growth.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\u2728'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
              }`}>
                Spiritual Connection
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Mindfulness breathing opens pathways to deeper spiritual insights and connection. Experience moments of profound peace and unity consciousness through dedicated practice.
              </p>
            </div>
          </div>

          {/* Mindfulness Techniques Guide */}
          <div className={`p-12 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-800/30'
              : 'bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
            }`}>
              {'\uD83C\uDF3F'} Mindfulness Breathing Techniques
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
                }`}>
                  Core Mindfulness Principles
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">{'\u2022'}</span>
                    <span><strong>Non-judgmental awareness:</strong> Observe your breath and thoughts without criticism or evaluation, creating a safe space for authentic mindfulness practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">{'\u2022'}</span>
                    <span><strong>Present moment focus:</strong> Use each breath as an anchor to return to now, the only moment where life truly happens and transformation occurs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">{'\u2022'}</span>
                    <span><strong>Gentle acceptance:</strong> Welcome whatever arises in your awareness with kindness and curiosity, trusting that each experience contributes to your growth.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400 mt-1">{'\u2022'}</span>
                    <span><strong>Beginner's mind:</strong> Approach each breathing session with fresh curiosity, as if experiencing mindfulness for the first time, preventing complacency in your practice.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
                }`}>
                  Integration into Daily Life
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">{'\u2022'}</span>
                    <span><strong>Mindful transitions:</strong> Use breathing exercises as bridges between activities, bringing mindfulness to work, relationships, and daily tasks with enhanced presence.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-pink-400 mt-1">{'\u2022'}</span>
                    <span><strong>Stress response management:</strong> Apply mindful breathing techniques when feeling overwhelmed, transforming stressful moments into opportunities for mindful awareness.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Enhanced relationships:</strong> Practice mindful breathing before important conversations, bringing greater presence, empathy, and authentic communication to interactions.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Sleep preparation:</strong> Use mindfulness breathing as part of your bedtime routine to quiet racing thoughts and prepare your mind for restful, rejuvenating sleep.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 绗簩灞忥細Use Cases & Scenarios */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                : 'bg-orange-100 text-orange-600 border border-orange-200'
            }`}>
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span>Breathing Exercises for Different Situations</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              When to Use Different Breathing Exercises & Techniques
            </h2>
            <p className={`text-xl font-light max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
            }`}>
              Discover the perfect moments for breathing exercises online - breathing exercises before sleep, box breathing during work, deep breathing for stress relief, or anytime you need quick anxiety reduction and relaxation
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDF19'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
              }`}>
                Breathing Exercises Before Sleep
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Deep breathing exercises and 4-7-8 breathing techniques are perfect for bedtime routines and sleep breathing exercises. Calm your nervous system, release daily stress, and prepare your mind for restorative sleep with our free guided breathing exercises online.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDCBC'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                Breathing Exercises During Work
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Quick 3-minute breathing exercises including box breathing techniques for workplace stress relief and anxiety reduction. Use breathing exercises during meetings, before presentations, or when feeling overwhelmed with work pressure. Perfect breathing techniques for focus.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDC41\uFE0F'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-green-300' : 'text-green-600'
              }`}>
                Breathing Exercises for Anxiety & Stress Relief
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Free breathing exercises and deep breathing techniques for immediate anxiety relief and stress reduction. Access Zen Moment's online breathing exercises anytime you need quick relaxation, mental clarity, and anxiety management throughout your day.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDFAF'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`}>
                Focus & Concentration with Breathing Techniques
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Use breathing exercises and techniques like box breathing to enhance concentration before important tasks. Deep breathing and 4-7-8 breathing techniques improve oxygen flow and mental clarity for better focus. Perfect breathing exercises for productivity.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDFC3'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>
                Pre-Exercise Breathing Techniques
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Optimize your workout with breathing exercises and deep breathing techniques. Prepare your body and mind with guided breathing exercises for enhanced performance and recovery.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">{'\u2615'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
              }`}>
                Quick Break Breathing Exercises
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
              }`}>
                Take 2-3 minute breathing exercises and breathing breaks throughout your day. Perfect for coffee breaks, between meetings, or whenever you need mental refreshment with quick breathing techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 绗笁灞忥細FAQ */}
      <section className={`py-32 transition-colors duration-300 relative min-h-screen ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}>
        {/* Visual Divider */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50'
            : 'bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50'
        }`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Indicator */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              theme === 'dark'
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-green-100 text-green-600 border border-green-200'
            }`}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Breathing Knowledge & Safety</span>
            </div>
          </div>
          {/* 鍛煎惛缁冧範涓撶敤FAQ - 鍔ㄦ€佹樉绀洪拡瀵瑰綋鍓嶆ā寮忕殑闂 */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-light mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Free Breathing Exercises & Techniques for Daily Life
            </h2>
            <p className={`text-xl font-light ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Simple breathing exercises and techniques to help you feel better - deep breathing, 4-7-8 breathing, box breathing, and more breathing methods
            </p>
          </div>

          {/* 閲嶈瀹夊叏澹版槑 */}
          <div className={`mb-12 p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-yellow-900/20 border-yellow-700/50'
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{'\u26A0\uFE0F'}</span>
              <div>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  Please Read This First
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <strong>Talk to your doctor</strong> before trying these exercises if you have asthma, breathing problems, heart issues, or if you're pregnant. If you start feeling dizzy or unwell while practicing, just stop and breathe normally for a bit.
                </p>
              </div>
            </div>
          </div>

      {/* 鍛煎惛鑳屽悗鐨勭畝鍗曞師鐞?*/}
          <div className={`mb-16 p-8 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-800/30'
              : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'
          }`}>
            <h2 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
            }`}>
              {'\uD83D\uDD2C'} Why Breathing Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  What Happens in Your Body
                </h3>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">{'\u2022'}</span>
                    <span><strong>Calms your nervous system:</strong> Slow breathing helps activate your body's relaxation response, which can lower stress hormones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">{'\u2022'}</span>
                    <span><strong>Better heart rhythm:</strong> Regular breathing patterns can help your heart work more efficiently, especially during stress</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">{'\u2022'}</span>
                    <span><strong>More oxygen:</strong> Deep belly breathing uses your lungs better than shallow chest breathing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  How to Get Better Over Time
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
                  }`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{'\uD83C\uDF31'}</span>
                      <span className="font-semibold">First 2 weeks: Just notice your breath</span>
                    </div>
                    <p className="text-sm">Spend 10 minutes a day just paying attention to how you breathe naturally. Don't try to change anything yet.</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
                  }`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{'\uD83C\uDF3F'}</span>
                      <span className="font-semibold">Weeks 3-4: Try simple patterns</span>
                    </div>
                    <p className="text-sm">Start with the basic box breathing. Focus on making each part of the breath feel smooth and connected.</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
                  }`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{'\uD83C\uDF33'}</span>
                      <span className="font-semibold">Weeks 5-8: Match breathing to your needs</span>
                    </div>
                    <p className="text-sm">Use energizing breathing when you need a boost, and calming techniques when you're stressed or before bed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 鍛煎惛缁冧範缁煎悎FAQ - 鍖呭惈鎵€鏈夋ā寮忕殑楂樿川閲忛棶棰?*/}
          <div className="space-y-8">
            {/* Relax Mode - 4-7-8 Breathing */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                4-7-8 Breathing: Deep Breathing Exercises for Relaxation
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When should I practice 4-7-8 breathing?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Perfect for stress relief, bedtime relaxation, anxiety management, or anytime you need to calm your mind quickly.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Why does 4-7-8 breathing work so well?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    The long exhale sends a signal to your brain that it's time to relax. When you breathe out slowly, your heart rate naturally slows down and your body starts to unwind.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How many 4-7-8 cycles should I do?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Start with 4 cycles as recommended by Dr. Andrew Weil. You can gradually increase to 8 cycles as you become more comfortable.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Can 4-7-8 breathing help with sleep?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Absolutely! It&apos;s one of the most effective breathing techniques for falling asleep faster and improving sleep quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Box Breathing */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Box Breathing: Breathing Techniques for Focus & Anxiety
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When is the best time to practice box breathing?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Ideal for work, study, public speaking, or any situation requiring enhanced concentration and mental clarity.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How does box breathing improve focus?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When your breathing has a steady rhythm, your mind tends to settle down too. The counting gives your brain something to focus on, which helps push aside distracting thoughts.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Is box breathing used by military?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Yes! Navy SEALs and other special forces use box breathing to stay calm and focused under pressure.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Can box breathing reduce anxiety?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Absolutely! The structured 4-count pattern helps regulate breathing and calms the nervous system during stressful situations.
                  </p>
                </div>
              </div>
            </div>

            {/* Activating Breathing for Energy */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                Activating Breathing Techniques for Energy & Focus
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When should I use activating breathing?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Great for morning routines, afternoon slumps, pre-workout, or whenever you need a quick energy boost.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How does activating breathing increase energy?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Studies suggest it may increase oxygen intake, potentially stimulate circulation, and temporarily activate your sympathetic nervous system to promote alertness.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Can activating breathing replace coffee?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Many people find it&apos;s a natural coffee alternative! It provides instant energy without jitters or caffeine dependency.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Should I practice activating breathing before exercise?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Excellent idea! It helps increase oxygen flow and prepare your body for physical activity.
                  </p>
                </div>
              </div>
            </div>

            {/* Beginner Mode - Gentle Introduction */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`}>
                Beginner Breathing Exercises & Techniques (3-6-6 Pattern)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Why is this pattern beginner-friendly?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    The 3-6-6 pattern provides a gentle introduction with longer exhales, naturally activating the relaxation response without overwhelming beginners.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How long should beginners practice?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Start with 3-5 cycles daily for the first week, then gradually increase to 8-10 cycles as comfort improves. Focus on consistency over duration.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    What if I feel dizzy during practice?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Sit down immediately, breathe normally, and take smaller breaths. Next time, reduce the breath count or practice for shorter periods.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When should I move to other patterns?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    After consistently practicing for 2-3 weeks without dizziness or discomfort, you can explore other breathing techniques.
                  </p>
                </div>
              </div>
            </div>

            {/* Balanced Mode - Perfect Harmony */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                Balanced Breathing Techniques & Exercises (5-5-5 Pattern)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    What makes balanced breathing special?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    The perfect 5-5-5 symmetry creates optimal nervous system balance, harmonizing the sympathetic and parasympathetic systems for ideal homeostasis.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Who benefits most from balanced breathing?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Perfect for people seeking emotional equilibrium, anxiety management, or those transitioning between high-stress and relaxation states.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Can it improve emotional regulation?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Absolutely! The rhythmic balance helps regulate the limbic system, promoting emotional stability and reducing emotional reactivity.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How does it compare to other patterns?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    While 4-7-8 focuses on deep relaxation and box breathing enhances focus, the 5-5-5 pattern creates overall physiological and psychological balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Natural Mindful Breathing */}
            <div className="space-y-4">
              <h3 className={`text-2xl font-medium text-center mb-6 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                Natural Mindful Breathing (4-2-6)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    What makes natural breathing unique?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    It combines gentle structure with organic flow, using longer exhales (6) than inhales (4) to naturally activate the relaxation response while maintaining awareness.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    How does it enhance mindfulness?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    The gentle pattern creates a meditative rhythm that helps maintain present-moment awareness without the intensity of more structured techniques.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    When is natural breathing ideal?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Perfect for daily mindfulness practice, stress breaks, meditation preparation, or anytime you need gentle grounding without deep relaxation.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}>
                  <h5 className={`font-semibold text-lg mb-3 ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Can it improve body awareness?
                  </h5>
                  <p className={`leading-relaxed ${
                    theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                  }`}>
                    Yes! The gentle pattern helps develop somatic awareness, improving your ability to notice subtle bodily sensations and tension patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 鍖荤枟鍏嶈矗澹版槑鍜屾敞鎰忎簨椤?*/}
          <div className={`mt-16 p-8 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-800/30'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-red-300' : 'text-red-700'
            }`}>
              {'\uD83D\uDEE1\uFE0F'} Health & Safety Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  When to Check with Your Doctor
                </h3>
                <ul className={`space-y-2 ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Respiratory conditions:</strong> Asthma, COPD, chronic bronchitis, or recent respiratory infections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Cardiovascular issues:</strong> Heart conditions, high/low blood pressure, or recent cardiac events</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Pregnancy:</strong> Particularly in the first trimester or with high-risk pregnancies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Medications:</strong> Beta-blockers, sedatives, or drugs affecting respiration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">{'\u2022'}</span>
                    <span><strong>Recent surgeries:</strong> Especially abdominal, chest, or cardiac procedures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                }`}>
                  When to Stop and Take a Break
                </h3>
                <ul className={`space-y-2 ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Dizziness or lightheadedness</strong> - Sit down and breathe normally</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Shortness of breath</strong> - Return to normal breathing immediately</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Chest pain or discomfort</strong> - Seek medical attention if persistent</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Nausea or headaches</strong> - Stop and rest in a comfortable position</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">{'\u2022'}</span>
                    <span><strong>Anxiety or panic</strong> - Focus on gentle, natural breathing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`mt-6 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`text-sm italic ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <strong>Please note:</strong> These exercises are for learning purposes and aren&apos;t medical advice. If you have health concerns, please talk to your doctor before trying new breathing practices.
              </p>
            </div>
          </div>

          {/* 楂樼骇鎶€宸ч儴鍒?*/}
          <div className={`mt-16 p-8 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-800/30'
              : 'bg-gradient-to-br from-green-50 to-teal-50 border border-green-200'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-green-300' : 'text-green-700'
            }`}>
              {'\uD83C\uDFAF'} Advanced Techniques & Troubleshooting
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 text-center ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
                }`}>
                  Breath Retention (Kumbhaka)
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  Once comfortable with basic patterns, breath retention (Kumbhaka) may be explored. Start with 2-3 seconds after exhale, gradually extending to 10-15 seconds. Research suggests this practice may help build CO2 tolerance and support mental clarity, but should only be attempted under guidance.
                </p>
              </div>

              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 text-center ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Nasal Breathing Optimization
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  Practice alternate nostril breathing (Nadi Shodhana). Use thumb to close right nostril, ring finger for left. Research suggests this practice may help balance hemispheric brain activity and support nervous system regulation.
                </p>
              </div>

              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-[#1F2A22]/60' : 'bg-[#F8F1E7]/75'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 text-center ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  Integration with Movement
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-[#C7DCCF]' : 'text-[#547160]'
                }`}>
                  Coordinate breathing with gentle movements or yoga poses. Inhale during expansion, exhale during contraction. This creates somatic awareness and enhances mind-body integration.
                </p>
              </div>
            </div>

            <div className={`mt-8 p-6 rounded-xl ${
              theme === 'dark' ? 'bg-red-900/20 border border-red-800/30' : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 text-center ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>
                {'\u26A0\uFE0F'} Common Pitfalls & Solutions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    <strong>Over-breathing:</strong> Taking too deep/fast breaths
                  </p>
                  <p className="text-sm">Focus on gentle, natural breathing. Less is more when starting out.</p>
                </div>
                <div>
                  <p className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    <strong>Mental Distraction:</strong> Mind wandering during practice
                  </p>
                  <p className="text-sm">Count breaths or use visual anchors. Accept thoughts without judgment.</p>
                </div>
                <div>
                  <p className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    <strong>Physical Tension:</strong> Straining shoulders or jaw
                  </p>
                  <p className="text-sm">Scan body for tension before starting. Practice progressive muscle relaxation.</p>
                </div>
                <div>
                  <p className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    <strong>Expectation Pressure:</strong> Forcing immediate results
                  </p>
                  <p className="text-sm">Benefits accumulate over time. Trust the process and maintain consistency.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 缁煎悎鎻愮ず */}
          <div className={`text-center p-8 rounded-2xl mt-12 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
          }`}>
            <p className={`text-lg font-light ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              {'\uD83D\uDCA1'} <strong>Pro tip:</strong> Start with the breathing technique that matches your current need - relaxation, focus, energy, or mindfulness. Consistency matters more than duration.
            </p>
            <p className={`text-sm mt-3 ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`}>
              {'\uD83E\uDDE0'} <strong>Advanced practitioners:</strong> Combine techniques within a single session. Begin with natural breathing, transition to box breathing for focus, end with 4-7-8 for deep relaxation.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Settings Button */}
      <FloatingSettingsButton
        theme={theme}
        disabled={storeIsBreathing}
      />

      {/* Floating Help Button */}
      <Suspense fallback={<div />}>
        <FloatingHelpButton
          theme={theme}
          shortcuts={[
            { key: 'Space', action: 'Start/Pause' },
            { key: 'Esc', action: 'Stop/Reset' },
            { key: 'Enter', action: 'Start' }
          ]}
        />
      </Suspense>

      {/* FAQ 閮ㄥ垎 - 鍛煎惛缁冧範甯歌闂 */}
      <FAQ
        items={[
          {
            question: "What is the 4-7-8 breathing technique?",
            answer: "The 4-7-8 breathing technique is a relaxation method developed by Dr. Andrew Weil. You inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. This pattern activates your parasympathetic nervous system, reducing stress and promoting relaxation."
          },
          {
            question: "How often should I practice breathing exercises?",
            answer: "For optimal results, practice 2-3 times daily. Use breathing exercises for stress relief (when overwhelmed), better sleep (30 minutes before bed), or improved focus (before work/study). Each session takes just 3-5 minutes."
          },
          {
            question: "What's box breathing and who uses it?",
            answer: "Box breathing (4-4-4-4) is used by Navy SEALs and first responders to stay calm under pressure. You inhale for 4 seconds, hold for 4, exhale for 4, and hold empty for 4. It's excellent for stress management and focus."
          },
          {
            question: "Can breathing exercises help with anxiety?",
            answer: "Yes! Research shows that controlled breathing activates the vagus nerve, which reduces cortisol levels and activates the body's relaxation response. Studies indicate that regular breathing practice can significantly reduce anxiety symptoms within 4-8 weeks."
          },
          {
            question: "What's the best time to do breathing exercises?",
            answer: "Anytime works! Morning practice sets a calm tone for the day. Before-sleep sessions improve sleep quality. Pre-meeting or pre-exam practice reduces performance anxiety. Listen to your body and practice when you need it most."
          },
          {
            question: "How quickly will I see results?",
            answer: "Many people feel calmer after just one 3-5 minute session. With regular practice (2-3 times daily for 2 weeks), you may notice reduced stress, better sleep, and improved emotional regulation. Long-term practice leads to lasting changes in stress response."
          }
        ]}
        title="Breathing Exercises FAQ"
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}











