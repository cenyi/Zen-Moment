'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SimpleButton } from '../components/SimpleButton'
import { Navigation } from '../components/Navigation'
import { BreathingGuide } from '../components/BreathingGuide'
import { FeatureHighlights } from '../components/FeatureHighlights'
import { Footer } from '../components/Footer'
import { RingProgress } from '../components/RingProgress'
import { FloatingHelpButton } from '../components/FloatingHelpButton'
import { FloatingSettingsButton } from '../components/FloatingSettingsButton'
import { FAQ } from '../components/FAQ'
import { useSimpleTimer } from '../hooks/useSimpleTimer'
import { useTimerStore } from '../store/timerStore'
import { useBackgroundSound } from '../hooks/useBackgroundSound'

// 楠ㄦ灦灞忕粍浠?- 鎻愬崌鍔犺浇浣撻獙
const SkeletonLoader = ({ theme, loadingPhase }: { theme: 'dark' | 'light', loadingPhase: string }) => (
  <div className={`min-h-screen transition-colors duration-300 ${
    theme === 'dark'
      ? 'theme-page-dark'
      : 'theme-page-light'
  }`}>
    {/* 瀵艰埅鏍忛鏋?*/}
    <div className="w-full h-16 px-4 py-3 flex justify-between items-center">
      <div className={`w-24 h-8 rounded-lg animate-pulse ${
        theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
      }`}></div>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
        }`}></div>
        <div className={`w-10 h-10 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
        }`}></div>
      </div>
    </div>

    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] px-6">
      {/* 鍝佺墝灞曠ず */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <Image
            src={theme === 'dark' ? '/favicon-64x64-white.webp' : '/favicon-64x64-black.webp'}
            alt="Zen Moment"
            width={64}
            height={64}
            className="object-contain"
            quality={95}
          />
        </div>
        <h1 className={`text-2xl font-light animate-fade-in ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>Zen Moment</h1>
      </div>

      {/* 鍔犺浇鐘舵€佹寚绀?*/}
      <div className="text-center mb-12">
        <div className={`text-lg mb-3 animate-fade-in-delay ${
          theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
        }`}>
          {loadingPhase === 'initializing' && '\u25EF Preparing your meditation space...'}
          {loadingPhase === 'preparing' && '\u25C9 Setting up timers...'}
          {loadingPhase === 'ready' && '\u2728 Ready to begin your journey'}
        </div>

        {/* 鑴夊啿鍔犺浇鍔ㄧ敾 */}
        <div className="relative inline-block">
          <div className={`w-20 h-20 rounded-full border-4 relative animate-spin-slow ${
            loadingPhase === 'initializing'
              ? 'border-[#7C8078] border-t-transparent'
              : loadingPhase === 'preparing'
              ? 'border-blue-500 border-t-transparent'
              : 'border-green-500 border-t-transparent'
          }`}></div>
          <div className={`absolute inset-0 rounded-full animate-ping-slow opacity-30 ${
            loadingPhase === 'initializing'
              ? 'bg-[#7C8078]'
              : loadingPhase === 'preparing'
              ? 'bg-blue-500'
              : 'bg-green-500'
          }`}></div>
        </div>

        <div className={`text-sm mt-4 animate-fade-in-delay-2 ${
          theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
        }`}>
          {loadingPhase === 'initializing' && 'Initializing...'}
          {loadingPhase === 'preparing' && 'Loading preferences...'}
          {loadingPhase === 'ready' && 'Ready!'}
        </div>
      </div>

      {/* 楠ㄦ灦灞忓唴瀹瑰尯鍩?- 妯℃嫙璁℃椂鍣ㄧ晫闈?*/}
      <div className="w-full max-w-md">
        <div className={`w-full h-32 rounded-2xl mb-6 animate-pulse ${
          theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
        }`}></div>
        <div className="flex justify-center gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-12 h-12 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
            }`}></div>
          ))}
        </div>
        <div className={`w-full h-16 rounded-xl animate-pulse ${
          theme === 'dark' ? 'bg-[#2A3A31]' : 'bg-[#E8DDCF]'
        }`}></div>
      </div>
    </div>
  </div>
)

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(true)

  // 缁熶竴浣跨敤 useTimerStore 浣滀负涓昏鐘舵€佺鐞?
  const {
    // 璁℃椂鍣ㄧ姸鎬?
    isRunning,
    isPaused,
    remainingTime,
    duration,
    completedCycles,

    // 鍛煎惛鐘舵€?
    isBreathing,
    breathingPhase,
    breathingProgress,
    currentBreathCycle,
    breathingModeId,

    // 缁熻鏁版嵁
    todayDuration,
    totalDuration,
    breathingSessions,
    streak,

    // 涓婚
    theme,
    backgroundSoundId,
    backgroundSoundVolume,

    // 鏂规硶
    startTimer: storeStartTimer,
    pauseTimer: storePauseTimer,
    resetTimer: storeResetTimer,
    setDuration: storeSetDuration,
    startBreathing,
    pauseBreathing,
    resetBreathing,
    setBreathingMode,
    tick,
    toggleTheme,
    updateStats,
    completeTimer
  } = useTimerStore()

  // useSimpleTimer 鍙綔涓鸿緟鍔?Hook锛屾彁渚涘熀纭€鍔熻兘
  const {
    mounted,
    loadingPhase,
    formatTime
  } = useSimpleTimer()

  // 鑳屾櫙澹伴煶鍔熻兘
  const {
    playBackgroundSound,
    stopBackgroundSound,
    setVolume: setBackgroundVolume
  } = useBackgroundSound(backgroundSoundId, soundEnabled, false)

  // 璁℃椂鍣ㄨ繍琛岄€昏緫
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning, remainingTime, tick])

  // 鐩戝惉璁℃椂鍣ㄧ姸鎬侊紝鎺у埗鑳屾櫙澹伴煶
  useEffect(() => {
    if (isRunning && backgroundSoundId !== 'none' && soundEnabled) {
      // 璁℃椂鍣ㄥ紑濮嬫椂锛屾挱鏀捐儗鏅０闊?
      playBackgroundSound()
    } else if (!isRunning) {
      // 璁℃椂鍣ㄥ仠姝㈡椂锛屽仠姝㈣儗鏅０闊?
      stopBackgroundSound()
    }
  }, [isRunning, backgroundSoundId, soundEnabled, playBackgroundSound, stopBackgroundSound])

  // 绉婚櫎閲嶅鐨勬椂闀跨姸鎬侊紝缁熶竴浣跨敤 store 鏁版嵁
  const [customMinutes, setCustomMinutes] = useState('') // 鑷畾涔夊垎閽?
  const [customSeconds, setCustomSeconds] = useState('') // 鑷畾涔夌鏁?

  // 璁＄畻杩涘害鐧惧垎姣?- 浣跨敤 store 涓殑 duration
  const progressPercentage = duration > 0
    ? ((duration - remainingTime) / duration) * 100
    : 0

  // 瀹氫箟handler鍑芥暟锛堝湪hooks涔嬪悗锛屾潯浠惰繑鍥炰箣鍓嶏級
  const handleStart = () => {
    // 鐩存帴浣跨敤 store 涓殑鏃堕暱寮€濮嬭鏃?
    storeStartTimer(duration)
  }

  const handlePause = () => {
    storePauseTimer()
  }

  const handleResume = () => {
    // store 涓渶瑕佸疄鐜?resumeTimer 鏂规硶
    storeStartTimer(remainingTime)
  }

  const handleReset = () => {
    storeResetTimer()
  }

  // 鍏ㄥ眬閿洏蹇嵎閿敮鎸?- 绉诲埌鏉′欢杩斿洖涔嬪墠
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 闃叉鍦ㄨ緭鍏ユ涓Е鍙戝叏灞€蹇嵎閿?
      if (e.target instanceof HTMLInputElement) {
        return
      }

      switch (e.key) {
        case ' ':
        case 'Space':
          e.preventDefault()
          if (!isRunning) {
            if (isPaused) {
              handleResume()
            } else {
              handleStart()
            }
          } else {
            handlePause()
          }
          break
        case 'Escape':
        case 'Esc':
          e.preventDefault()
          handleReset()
          break
        case 'r':
        case 'R':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            handleReset()
          }
          break
        case 'Enter':
          if (!isRunning && duration > 0) {
            e.preventDefault()
            handleStart()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isRunning, isPaused, duration, handleStart, handlePause, handleResume, handleReset])

  // 闃叉 hydration 涓嶅尮閰?- 鍦ㄧ粍浠舵湭鎸傝浇鍓嶄笉娓叉煋鍔ㄦ€佸唴瀹?
  if (!mounted) {
    return <SkeletonLoader theme={theme} loadingPhase={loadingPhase} />;
  }

  
  return (
      <div className={`min-h-screen pt-16 transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-page-dark'
          : 'theme-page-light'
      }`}>
      {/* Header with Navigation */}
      <header>
        <Navigation
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </header>

      {/* Main Content */}
      <main>

      {/* Screen 1: 鏋佺畝鏍稿績浣撻獙鍖?(棣栧睆) */}
      <section className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative" aria-labelledby="hero-heading">
        <div className="w-full max-w-4xl sm:max-w-5xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 mt-4 sm:mt-6">

          {/* 涓绘爣棰?- 绱у噾鍗曡鐗堟湰 */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 id="hero-heading" className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide ${
              theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
            }`}>
              Breathe. Focus. Find Peace.
            </h1>
            <p className={`text-sm sm:text-base font-light mt-2 ${
              theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
            }`}>
              Zen Moment - Free Online Meditation Timer & Breathing Guide
            </p>
          </div>

  
      
          {/* 瓒呭ぇ璁℃椂鍣ㄤ笌杩涘害鏉?- 瀹岀編灞呬腑鏄剧ず */}
          <div className="relative -mt-2" role="timer" aria-label={`Zen Moment meditation timer: ${formatTime(isRunning ? remainingTime : duration)} remaining`}>
            {/* 鐜舰杩涘害鏉?- 鍙湪杩愯鏃舵樉绀?*/}
            {(isRunning || isPaused) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{transform: 'translateY(-20px)'}} aria-hidden="true">
                <RingProgress
                  progress={progressPercentage}
                  size={260}
                  strokeWidth={8}
                  theme={theme}
                />
              </div>
            )}

            {/* 璁℃椂鍣ㄦ枃瀛?*/}
            <div className="flex flex-col items-center justify-center w-full py-10" role="timer" aria-label="Zen Moment meditation timer">
              <div className={`text-6xl md:text-7xl lg:text-8xl font-mono font-light leading-none tracking-wider ${
                theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
              }`} aria-live="polite" aria-atomic="true">
                <span className="text-center relative z-10">
                  {formatTime(isRunning ? remainingTime : duration)}
                </span>
              </div>
              {/* 璁℃椂鍣ㄧ姸鎬佹挱鎶?- 浠呭灞忓箷闃呰鍣ㄥ彲瑙?*/}
              <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
                {isRunning && `${Math.ceil(remainingTime / 60)} minutes and ${remainingTime % 60} seconds remaining`}
                {isPaused && 'Timer is paused'}
                {!isRunning && !isPaused && 'Timer is ready to start'}
              </div>
              {isBreathing && breathingPhase && (
                <div className={`text-xl md:text-2xl mt-4 font-medium transition-colors duration-300 animate-fade-in ${
                  breathingPhase === 'inhale' ? (theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]') :
                  breathingPhase === 'hold' ? (theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]') :
                  breathingPhase === 'exhale' ? (theme === 'dark' ? 'text-[#7FA87C]' : 'text-[#C5BBA7]') :
                  (theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]')
                }`} role="status" aria-live="polite">
                  {breathingPhase === 'inhale' ? 'Breathe In' :
                   breathingPhase === 'hold' ? 'Hold' :
                   breathingPhase === 'exhale' ? 'Breathe Out' : ''}
                </div>
              )}
            </div>
          </div>

          {/* 澶у彿鍦嗗舰 START/PAUSE/RESUME 鎸夐挳 - 涓昏浜や簰鍏冪礌 */}
          <div className="flex flex-col items-center mt-24 animate-scale-in" style={{marginBottom: '-8px'}} role="group" aria-label="Meditation timer controls">
            {!isRunning ? (
              isPaused ? (
                <SimpleButton
                  variant="primary"
                  size="lg"
                  theme={theme}
                  onClick={handleResume}
                  className="focus-indicator w-24 h-24 md:w-28 md:h-28 rounded-2xl text-lg md:text-xl font-light mb-4"
                  aria-label="Resume meditation timer"
                >
                  RESUME
                </SimpleButton>
              ) : (
                <SimpleButton
                  variant="primary"
                  size="lg"
                  theme={theme}
                  onClick={handleStart}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl text-lg md:text-xl font-light mb-4"
                  aria-label="Start meditation timer"
                >
                  START
                </SimpleButton>
              )
            ) : (
              <SimpleButton
                variant="secondary"
                size="lg"
                theme={theme}
                onClick={handlePause}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl text-lg md:text-xl font-light mb-4"
                aria-label="Pause meditation timer"
              >
                PAUSE
              </SimpleButton>
            )}

            {/* RESET 鎸夐挳 - 杈呭姪鎸夐挳 */}
            <SimpleButton
              variant="secondary"
              size="lg"
              theme={theme}
              onClick={handleReset}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl text-base md:text-lg font-light flex items-center justify-center px-2 py-1 transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 active:scale-97 press-effect"
              aria-label="Reset meditation timer"
            >
              RESET
            </SimpleButton>

          </div>

          {/* 鏃堕暱閫夋嫨鍖哄煙 - 閲嶆柊缁勭粐瑙嗚灞傛 */}
          <div className="space-y-6 animate-fade-in">
            {/* 涓昏蹇€熼€夋嫨 */}
            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Quick duration selection">
              {[1, 3, 5, 10, 15].map((min) => (
                <SimpleButton
                  key={min}
                  variant={duration === min * 60 ? 'primary' : 'secondary'}
                  size="lg"
                  theme={theme}
                  onClick={() => {
                    if (!isRunning) {
                      // 娣诲姞閫夋嫨鍔ㄧ敾鏁堟灉
                      const button = document.getElementById(`duration-btn-${min}`);
                      if (button) {
                        button.classList.add('animate-pulse');
                        setTimeout(() => button.classList.remove('animate-pulse'), 300);
                      }

                      const newDuration = min * 60
                      setCustomMinutes('') // 娓呯┖鑷畾涔夋椂闂?
                      setCustomSeconds('') // 娓呯┖鑷畾涔夌鏁?
                      // 鐩存帴璁剧疆鏂版椂闀垮埌 store
                      storeSetDuration(newDuration)
                    }
                  }}
                  disabled={isRunning}
                  id={`duration-btn-${min}`}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl text-base md:text-lg font-light flex items-center justify-center px-2 py-1 transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 active:scale-97 press-effect ${
                    isRunning ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label={`Set meditation duration to ${min} minutes`}
                  aria-pressed={duration === min * 60}
                >
                  {min}m
                </SimpleButton>
              ))}
            </div>

            {/* 楂橀蹇嵎閫夐」 - 杈呭姪蹇€熼€夋嫨 */}
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Quick preset durations">
              {[
                { label: '30s', minutes: 0, seconds: 30 },
                { label: '45s', minutes: 0, seconds: 45 },
                { label: '1m30s', minutes: 1, seconds: 30 },
                { label: '2m30s', minutes: 2, seconds: 30 },
                { label: '3m30s', minutes: 3, seconds: 30 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    if (!isRunning) {
                      setCustomMinutes(preset.minutes.toString())
                      setCustomSeconds(preset.seconds.toString())
                      const totalSeconds = preset.minutes * 60 + preset.seconds
                      storeSetDuration(totalSeconds)
                    }
                  }}
                  disabled={isRunning}
                  className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:scale-105 min-h-[44px] min-w-[50px] flex items-center justify-center font-medium ${
                    isRunning
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0'
                  } ${
                    theme === 'dark'
                      ? 'bg-[#1D2922] text-[#E9E8E6] hover:text-[#A8C8B0] border border-[#4A5E54]/40'
                      : 'bg-[#FBF4EA] text-[#2C2A29] hover:text-[#6B8F7A] border border-[#D8CFC0]/40'
                  } ${
                    (parseInt(customMinutes) === preset.minutes && parseInt(customSeconds) === preset.seconds)
                      ? theme === 'dark'
                        ? 'bg-[#162019] text-[#A8C8B0] ring-2 ring-[#6B8F7A]/50 border-[#6B8F7A]/50'
                        : 'bg-[#F1E6D6] text-[#6B8F7A] ring-2 ring-[#6B8F7A]/50 border-[#6B8F7A]/50'
                      : ''
                  }`}
                  aria-label={`Set duration to ${preset.label}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* 鑷畾涔夋椂闂磋緭鍏?- 楂樼骇鍔熻兘 */}
            <div className={`p-4 rounded-lg border ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              theme === 'dark'
                ? 'bg-[#1D2922]/60 border-[#4A5E54]/40'
                : 'bg-[#FBF4EA]/60 border-[#D8CFC0]/40'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  Custom Duration
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={customMinutes || ''}
                    onChange={(e) => {
                      const minutes = Math.max(0, Math.min(60, parseInt(e.target.value) || 0))
                      setCustomMinutes(minutes.toString())
                      const seconds = Math.max(0, Math.min(59, parseInt(customSeconds) || 0))
                      const totalSeconds = minutes * 60 + seconds
                      if (!isRunning && totalSeconds > 0) {
                        storeSetDuration(totalSeconds)
                      }
                    }}
                    disabled={isRunning}
                    placeholder="5"
                    aria-label="Minutes for custom duration"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        // Enter閿彲浠ュ惎鍔ㄨ鏃跺櫒
                        if (!isRunning && duration > 0) {
                          handleStart()
                        }
                      }
                    }}
                    className={`w-16 px-2 py-1 text-center text-sm rounded border-none outline-none focus:ring-2 focus:ring-[#6B8F7A] focus:ring-offset-1 ${
                      theme === 'dark'
                        ? 'bg-[#1D2922] shadow-neumorphic-dark text-[#E9E8E6] placeholder-[#A8C8B0]'
                        : 'bg-[#FBF4EA] shadow-neumorphic text-[#2C2A29] placeholder-[#6B8F7A]'
                    }`}
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'}`}>min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={customSeconds || ''}
                    onChange={(e) => {
                      const seconds = Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                      setCustomSeconds(seconds.toString())
                      const minutes = Math.max(0, Math.min(60, parseInt(customMinutes) || 0))
                      const totalSeconds = minutes * 60 + seconds
                      if (!isRunning && totalSeconds > 0) {
                        storeSetDuration(totalSeconds)
                      }
                    }}
                    disabled={isRunning}
                    placeholder="0"
                    aria-label="Seconds for custom duration"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        // Enter閿彲浠ュ惎鍔ㄨ鏃跺櫒
                        if (!isRunning && duration > 0) {
                          handleStart()
                        }
                      }
                    }}
                    className={`w-16 px-2 py-1 text-center text-sm rounded border-none outline-none focus:ring-2 focus:ring-[#6B8F7A] focus:ring-offset-1 ${
                      theme === 'dark'
                        ? 'bg-[#1D2922] shadow-neumorphic-dark text-[#E9E8E6] placeholder-[#A8C8B0]'
                        : 'bg-[#FBF4EA] shadow-neumorphic text-[#2C2A29] placeholder-[#6B8F7A]'
                    }`}
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'}`}>sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* 閿洏蹇嵎閿彁绀?*/}
          <FloatingHelpButton
            theme={theme}
            shortcuts={[
              { key: 'Space', action: 'Start/Pause' },
              { key: 'Esc', action: 'Reset' },
              { key: 'Enter', action: 'Start Timer' }
            ]}
          />

          {/* 鎮诞璁剧疆鎸夐挳 */}
          <FloatingSettingsButton
            theme={theme}
            disabled={isRunning}
          />
        </div>
      </section>

      {/* Screen 2: 鍛煎惛缁冧範寮曞鍖?*/}
      <BreathingGuide theme={theme} />

      {/* Screen 3: 寮曞鎺㈢储鍖?*/}
      <FeatureHighlights theme={theme} />

      {/* Screen 4: Meditation Guide & Benefits */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
              theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
            }`}>
              Start Your Meditation Journey with Zen Moment
            </h2>
            <p className={`text-xl font-light max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
            }`}>
              Zen Moment offers the perfect free online meditation timer for beginners and quick meditation sessions. Experience the best free meditation app with guided breathing exercises for stress relief and focus improvement.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\uD83E\uDDE0'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]'
              }`}>
                Enhanced Focus & Clarity
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Regular meditation practice improves concentration, reduces mental fog, and enhances cognitive performance. Studies show that just 10 minutes of daily meditation can significantly improve attention span and mental clarity.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDC86\u200D\u2640\uFE0F'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Stress Reduction & Meditation Relaxation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Using Zen Moment's meditation timer, meditation activates the body's natural relaxation response, lowering cortisol levels and reducing symptoms of anxiety and depression. Experience deep peace and tranquility through guided meditation techniques.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDE34'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#7FA87C]' : 'text-[#C5BBA7]'
              }`}>
                Better Sleep with Meditation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Our free meditation timer helps calm racing thoughts and prepares your mind for restful sleep. Many practitioners report falling asleep faster and experiencing deeper, more restorative sleep patterns with regular meditation practice.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\u2696\uFE0F'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]'
              }`}>
                Emotional Balance
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Develop greater emotional awareness and regulation through meditation. Learn to respond rather than react to life's challenges with mindfulness-based stress reduction techniques.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\uD83D\uDCAA'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Increased Resilience
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Build mental and emotional strength through consistent meditation practice. Develop the resilience to navigate life's ups and downs with greater ease and stability.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              theme === 'dark'
                ? 'bg-[#1D2922]/80 border-[#4A5E54]/50 shadow-[10px_10px_20px_#0D100E,-10px_-10px_20px_#4A5E54]'
                : 'bg-[#FBF4EA]/80 border-[#D8CFC0]/50 shadow-[10px_10px_20px_#FFFFFF,-10px_-10px_20px_#D8CFC0]'
            }`}>
              <div className="text-3xl mb-4">{'\uD83C\uDF31'}</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Personal Growth Through Meditation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
              }`}>
                Meditation opens doors to deeper self-understanding and spiritual growth. Connect with your inner wisdom and discover your true potential through guided meditation practices with Zen Moment.
              </p>
            </div>
          </div>

          {/* Quick Start Section - Target Beginners and Quick Users */}
          <div className={`p-12 rounded-3xl border ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1D2922]/60 to-[#162019]/60 border-[#4A5E54]/40'
              : 'bg-gradient-to-br from-[#FBF4EA]/60 to-[#F1E6D6]/60 border-[#D8CFC0]/40'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-4 ${
              theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
            }`}>
              {'\u26A1'} Quick Meditation for Beginners
            </h3>
            <p className={`text-lg text-center mb-8 ${
              theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
            }`}>
              Start with just 5 minutes using Zen Moment's free meditation timer
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`text-center p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-[#1D2922]/50 border-[#4A5E54]/30' : 'bg-[#FBF4EA]/60 border-[#D8CFC0]/30'
              }`}>
                <div className="text-2xl mb-2">{'\uD83C\uDF3F'}</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]'
                }`}>
                  Meditation for Beginners
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'}`}>Simple 5-minute meditation sessions to build your meditation practice with our free meditation timer</p>
              </div>
              <div className={`text-center p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-[#1D2922]/50 border-[#4A5E54]/30' : 'bg-[#FBF4EA]/60 border-[#D8CFC0]/30'
              }`}>
                <div className="text-2xl mb-2">{'\u23F1\uFE0F'}</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
                }`}>
                  Free Meditation Timer
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'}`}>Perfect for busy professionals needing quick meditation sessions for stress relief and focus improvement</p>
              </div>
              <div className={`text-center p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-[#1D2922]/50 border-[#4A5E54]/30' : 'bg-[#FBF4EA]/60 border-[#D8CFC0]/30'
              }`}>
                <div className="text-2xl mb-2">{'\uD83D\uDD13'}</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-[#7FA87C]' : 'text-[#C5BBA7]'
                }`}>
                  Free Online Meditation Tool
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'}`}>No ads, no tracking - just pure meditation experience with guided breathing exercises</p>
              </div>
            </div>
          </div>

          {/* Meditation Tips */}
          <div className={`p-12 rounded-3xl border ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1D2922]/60 to-[#162019]/60 border-[#4A5E54]/40'
              : 'bg-gradient-to-br from-[#FBF4EA]/60 to-[#F1E6D6]/60 border-[#D8CFC0]/40'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]'
            }`}>
              {'\uD83E\uDDD8'} Advanced Meditation Techniques with Zen Moment
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
                }`}>
                  Beginner's Meditation Guide
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#A8C8B0] mt-1">{'\u2022'}</span>
                    <span><strong>Start small:</strong> Begin with 5-10 minutes daily meditation sessions using our free meditation timer and gradually increase duration as you become more comfortable with meditation practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#D4A574] mt-1">{'\u2022'}</span>
                    <span><strong>Find a quiet space:</strong> Choose a peaceful environment where you won't be disturbed during your meditation sessions.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#A8C8B0] mt-1">{'\u2022'}</span>
                    <span><strong>Focus on your breath:</strong> Use your breath as an anchor to keep your mind present during meditation with Zen Moment's guided timer.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8BB8D8] mt-1">{'\u2022'}</span>
                    <span><strong>Be patient with yourself:</strong> Meditation is a skill that develops over time. Don't judge yourself when your mind wanders during meditation.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-[#C5BBA7]' : 'text-[#7FA87C]'
                }`}>
                  Best Practices for Meditation Success
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#D4A574] mt-1">{'\u2022'}</span>
                    <span><strong>Consistency is key:</strong> Regular daily meditation practice is more important than session length. Use Zen Moment's meditation timer for consistent practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#A8C8B0] mt-1">{'\u2022'}</span>
                    <span><strong>Mix meditation styles:</strong> Combine different meditation techniques like mindfulness, loving-kindness, and body scan for comprehensive meditation benefits.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#8BB8D8] mt-1">{'\u2022'}</span>
                    <span><strong>Use guided meditation:</strong> Start with guided meditation apps or recordings to help you learn proper meditation techniques and deepen your practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#A898B8] mt-1">{'\u2022'}</span>
                    <span><strong>Track your progress:</strong> Use Zen Moment's free meditation timer to monitor your meditation journey and celebrate milestones in your practice.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 閮ㄥ垎 */}
      <FAQ
        items={[
          {
            question: "How long should I meditate as a beginner?",
            answer: "Start with 5-10 minutes daily. Research shows that even short meditation sessions can significantly reduce stress and improve focus. As you become more comfortable, gradually increase to 15-20 minutes. Consistency matters more than duration."
          },
          {
            question: "Is Zen Moment really free?",
            answer: "Yes! Zen Moment is completely free with no ads, no subscriptions, and no hidden fees. Our mission is to make meditation and mindfulness accessible to everyone."
          },
          {
            question: "What's the difference between meditation timer and breathing exercises?",
            answer: "The meditation timer is for silent meditation with customizable durations and sounds. Breathing exercises guide you through specific patterns like 4-7-8 breathing or box breathing, providing visual and audio cues for each breath phase."
          },
          {
            question: "Can I use Zen Moment offline?",
            answer: "Yes! Once loaded, Zen Moment works completely offline. You can meditate anywhere without an internet connection."
          },
          {
            question: "How often should I practice breathing exercises?",
            answer: "For best results, practice breathing exercises 2-3 times daily. Use them for stress relief (when feeling overwhelmed), better sleep (before bed), or improved focus (before work/study). Each session takes just 3-5 minutes."
          },
          {
            question: "Do I need to create an account?",
            answer: "No account needed! Zen Moment respects your privacy. Your meditation stats and preferences are stored locally on your device. We don't track your sessions or collect personal data."
          }
        ]}
        title="Frequently Asked Questions"
      />

      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
      </div>
  )
}





