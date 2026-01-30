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

// 骨架屏组件 - 提升加载体验
const SkeletonLoader = ({ theme, loadingPhase }: { theme: 'dark' | 'light', loadingPhase: string }) => (
  <div className={`min-h-screen transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-neumorphic-dark text-neumorphic-tips-dark'
      : 'bg-neumorphic-light text-neumorphic-tips-light'
  }`}>
    {/* 导航栏骨架 */}
    <div className="w-full h-16 px-4 py-3 flex justify-between items-center">
      <div className={`w-24 h-8 rounded-lg animate-pulse ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}></div>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}></div>
        <div className={`w-10 h-10 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}></div>
      </div>
    </div>

    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] px-6">
      {/* 品牌展示 */}
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

      {/* 加载状态指示 */}
      <div className="text-center mb-12">
        <div className={`text-lg mb-3 animate-fade-in-delay ${
          theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
        }`}>
          {loadingPhase === 'initializing' && '◯ Preparing your meditation space...'}
          {loadingPhase === 'preparing' && '▲ Setting up timers...'}
          {loadingPhase === 'ready' && '✦ Ready to begin your journey'}
        </div>

        {/* 脉冲加载动画 */}
        <div className="relative inline-block">
          <div className={`w-20 h-20 rounded-full border-4 relative animate-spin-slow ${
            loadingPhase === 'initializing'
              ? 'border-gray-400 border-t-transparent'
              : loadingPhase === 'preparing'
              ? 'border-blue-500 border-t-transparent'
              : 'border-green-500 border-t-transparent'
          }`}></div>
          <div className={`absolute inset-0 rounded-full animate-ping-slow opacity-30 ${
            loadingPhase === 'initializing'
              ? 'bg-gray-400'
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

      {/* 骨架屏内容区域 - 模拟计时器界面 */}
      <div className="w-full max-w-md">
        <div className={`w-full h-32 rounded-2xl mb-6 animate-pulse ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}></div>
        <div className="flex justify-center gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-12 h-12 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}></div>
          ))}
        </div>
        <div className={`w-full h-16 rounded-xl animate-pulse ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}></div>
      </div>
    </div>
  </div>
)

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(true)

  // 统一使用 useTimerStore 作为主要状态管理
  const {
    // 计时器状态
    isRunning,
    isPaused,
    remainingTime,
    duration,
    completedCycles,

    // 呼吸状态
    isBreathing,
    breathingPhase,
    breathingProgress,
    currentBreathCycle,
    breathingModeId,

    // 统计数据
    todayDuration,
    totalDuration,
    breathingSessions,
    streak,

    // 主题
    theme,
    backgroundSoundId,
    backgroundSoundVolume,

    // 方法
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

  // useSimpleTimer 只作为辅助 Hook，提供基础功能
  const {
    mounted,
    loadingPhase,
    formatTime
  } = useSimpleTimer()

  // 背景声音功能
  const {
    playBackgroundSound,
    stopBackgroundSound,
    setVolume: setBackgroundVolume
  } = useBackgroundSound(backgroundSoundId, soundEnabled, false)

  // 计时器运行逻辑
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

  // 监听计时器状态，控制背景声音
  useEffect(() => {
    if (isRunning && backgroundSoundId !== 'none' && soundEnabled) {
      // 计时器开始时，播放背景声音
      playBackgroundSound()
    } else if (!isRunning) {
      // 计时器停止时，停止背景声音
      stopBackgroundSound()
    }
  }, [isRunning, backgroundSoundId, soundEnabled, playBackgroundSound, stopBackgroundSound])

  // 移除重复的时长状态，统一使用 store 数据
  const [customMinutes, setCustomMinutes] = useState('') // 自定义分钟
  const [customSeconds, setCustomSeconds] = useState('') // 自定义秒数

  // 计算进度百分比 - 使用 store 中的 duration
  const progressPercentage = duration > 0
    ? ((duration - remainingTime) / duration) * 100
    : 0

  // 定义handler函数（在hooks之后，条件返回之前）
  const handleStart = () => {
    // 直接使用 store 中的时长开始计时
    storeStartTimer(duration)
  }

  const handlePause = () => {
    storePauseTimer()
  }

  const handleResume = () => {
    // store 中需要实现 resumeTimer 方法
    storeStartTimer(remainingTime)
  }

  const handleReset = () => {
    storeResetTimer()
  }

  // 全局键盘快捷键支持 - 移到条件返回之前
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 防止在输入框中触发全局快捷键
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

  // 防止 hydration 不匹配 - 在组件未挂载前不渲染动态内容
  if (!mounted) {
    return <SkeletonLoader theme={theme} loadingPhase={loadingPhase} />;
  }

  
  return (
      <div className={`min-h-screen pt-16 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neumorphic-dark text-neumorphic-tips-dark'
          : 'bg-neumorphic-light text-neumorphic-tips-light'
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

      {/* Screen 1: 极简核心体验区 (首屏) */}
      <section className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16 sm:pb-20 relative" aria-labelledby="hero-heading">
        <div className="w-full max-w-4xl sm:max-w-5xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 mt-4 sm:mt-6">

          {/* 主标题 - 紧凑单行版本 */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 id="hero-heading" className={`text-xl sm:text-2xl md:text-3xl font-light ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Breathe. Focus. Find Peace.
            </h1>
            <p className={`text-sm sm:text-base font-light mt-2 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Zen Moment - Free Online Meditation Timer & Breathing Guide
            </p>
          </div>

  
      
          {/* 超大计时器与进度条 - 完美居中显示 */}
          <div className="relative -mt-2" role="timer" aria-label={`Zen Moment meditation timer: ${formatTime(isRunning ? remainingTime : duration)} remaining`}>
            {/* 环形进度条 - 只在运行时显示 */}
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

            {/* 计时器文字 */}
            <div className="flex flex-col items-center justify-center w-full py-10" role="timer" aria-label="Zen Moment meditation timer">
              <div className={`text-6xl md:text-7xl lg:text-8xl font-mono font-light leading-none ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`} aria-live="polite" aria-atomic="true">
                <span className="tracking-wider text-center relative z-10">
                  {formatTime(isRunning ? remainingTime : duration)}
                </span>
              </div>
              {/* 计时器状态播报 - 仅对屏幕阅读器可见 */}
              <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
                {isRunning && `${Math.ceil(remainingTime / 60)} minutes and ${remainingTime % 60} seconds remaining`}
                {isPaused && 'Timer is paused'}
                {!isRunning && !isPaused && 'Timer is ready to start'}
              </div>
              {isBreathing && breathingPhase && (
                <div className={`text-xl md:text-2xl mt-4 font-medium transition-colors duration-300 animate-fade-in ${
                  breathingPhase === 'inhale' ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600') :
                  breathingPhase === 'hold' ? (theme === 'dark' ? 'text-purple-400' : 'text-purple-600') :
                  breathingPhase === 'exhale' ? (theme === 'dark' ? 'text-green-400' : 'text-green-600') :
                  (theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light')
                }`} role="status" aria-live="polite">
                  {breathingPhase === 'inhale' ? 'Breathe In' :
                   breathingPhase === 'hold' ? 'Hold' :
                   breathingPhase === 'exhale' ? 'Breathe Out' : ''}
                </div>
              )}
            </div>
          </div>

          {/* 大号圆形 START/PAUSE/RESUME 按钮 - 主要交互元素 */}
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

            {/* RESET 按钮 - 辅助按钮 */}
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

          {/* 时长选择区域 - 重新组织视觉层次 */}
          <div className="space-y-6 animate-fade-in">
            {/* 主要快速选择 */}
            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Quick duration selection">
              {[1, 3, 5, 10, 15].map((min) => (
                <SimpleButton
                  key={min}
                  variant={duration === min * 60 ? 'primary' : 'secondary'}
                  size="lg"
                  theme={theme}
                  onClick={() => {
                    if (!isRunning) {
                      // 添加选择动画效果
                      const button = document.getElementById(`duration-btn-${min}`);
                      if (button) {
                        button.classList.add('animate-pulse');
                        setTimeout(() => button.classList.remove('animate-pulse'), 300);
                      }

                      const newDuration = min * 60
                      setCustomMinutes('') // 清空自定义时间
                      setCustomSeconds('') // 清空自定义秒数
                      // 直接设置新时长到 store
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

            {/* 高频快捷选项 - 辅助快速选择 */}
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
                      ? 'neumorphic-dark text-neumorphic-tips-dark hover:text-blue-400'
                      : 'neumorphic text-neumorphic-tips-light hover:text-blue-600'
                  } ${
                    (parseInt(customMinutes) === preset.minutes && parseInt(customSeconds) === preset.seconds)
                      ? theme === 'dark'
                        ? 'neumorphic-dark-flat text-blue-400 ring-2 ring-blue-400/50'
                        : 'neumorphic-flat text-blue-600 ring-2 ring-blue-600/50'
                      : ''
                  }`}
                  aria-label={`Set duration to ${preset.label}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* 自定义时间输入 - 高级功能 */}
            <div className={`p-4 rounded-lg border ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              theme === 'dark'
                ? 'bg-gray-800/60 border-gray-600/30'
                : 'bg-white/60 border-gray-400/20'
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
                        // Enter键可以启动计时器
                        if (!isRunning && duration > 0) {
                          handleStart()
                        }
                      }
                    }}
                    className={`w-16 px-2 py-1 text-center text-sm rounded border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      theme === 'dark'
                        ? 'bg-neumorphic-dark shadow-neumorphic-dark text-neumorphic-tips-dark placeholder-gray-500'
                        : 'bg-neumorphic-light shadow-neumorphic text-neumorphic-tips-light placeholder-gray-500'
                    }`}
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>min</span>
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
                        // Enter键可以启动计时器
                        if (!isRunning && duration > 0) {
                          handleStart()
                        }
                      }
                    }}
                    className={`w-16 px-2 py-1 text-center text-sm rounded border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      theme === 'dark'
                        ? 'bg-neumorphic-dark shadow-neumorphic-dark text-neumorphic-tips-dark placeholder-gray-500'
                        : 'bg-neumorphic-light shadow-neumorphic text-neumorphic-tips-light placeholder-gray-500'
                    }`}
                  />
                  <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* 键盘快捷键提示 */}
          <FloatingHelpButton
            theme={theme}
            shortcuts={[
              { key: 'Space', action: 'Start/Pause' },
              { key: 'Esc', action: 'Reset' },
              { key: 'Enter', action: 'Start Timer' }
            ]}
          />

          {/* 悬浮设置按钮 */}
          <FloatingSettingsButton
            theme={theme}
            disabled={isRunning}
          />
        </div>
      </section>

      {/* Screen 2: 呼吸练习引导区 */}
      <BreathingGuide theme={theme} />

      {/* Screen 3: 引导探索区 */}
      <FeatureHighlights theme={theme} />

      {/* Screen 4: Meditation Guide & Benefits */}
      <section className={`py-20 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-neumorphic-tips-dark'
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-neumorphic-tips-light'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Start Your Meditation Journey with Zen Moment
            </h2>
            <p className={`text-xl font-light max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Zen Moment offers the perfect free online meditation timer for beginners and quick meditation sessions. Experience the best free meditation app with guided breathing exercises for stress relief and focus improvement.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">🧠</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`}>
                Enhanced Focus & Clarity
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Regular meditation practice improves concentration, reduces mental fog, and enhances cognitive performance. Studies show that just 10 minutes of daily meditation can significantly improve attention span and mental clarity.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">💆‍♀️</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-green-300' : 'text-green-600'
              }`}>
                Stress Reduction & Meditation Relaxation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Using Zen Moment's meditation timer, meditation activates the body's natural relaxation response, lowering cortisol levels and reducing symptoms of anxiety and depression. Experience deep peace and tranquility through guided meditation techniques.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">😴</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'
              }`}>
                Better Sleep with Meditation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Our free meditation timer helps calm racing thoughts and prepares your mind for restful sleep. Many practitioners report falling asleep faster and experiencing deeper, more restorative sleep patterns with regular meditation practice.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
              }`}>
                Emotional Balance
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Develop greater emotional awareness and regulation through meditation. Learn to respond rather than react to life's challenges with mindfulness-based stress reduction techniques.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">💪</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>
                Increased Resilience
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Build mental and emotional strength through consistent meditation practice. Develop the resilience to navigate life's ups and downs with greater ease and stability.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <div className="text-3xl mb-4">🌱</div>
              <h3 className={`text-2xl font-light mb-4 ${
                theme === 'dark' ? 'text-teal-300' : 'text-teal-600'
              }`}>
                Personal Growth Through Meditation
              </h3>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Meditation opens doors to deeper self-understanding and spiritual growth. Connect with your inner wisdom and discover your true potential through guided meditation practices with Zen Moment.
              </p>
            </div>
          </div>

          {/* Quick Start Section - Target Beginners and Quick Users */}
          <div className={`p-12 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-800/30'
              : 'bg-gradient-to-br from-green-50 to-teal-50 border border-green-200'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-4 ${
              theme === 'dark' ? 'text-green-300' : 'text-green-600'
            }`}>
              ⚡ Quick Meditation for Beginners
            </h3>
            <p className={`text-lg text-center mb-8 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              Start with just 5 minutes using Zen Moment's free meditation timer
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <div className="text-2xl mb-2">🎯</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Meditation for Beginners
                </h4>
                <p className="text-sm">Simple 5-minute meditation sessions to build your meditation practice with our free meditation timer</p>
              </div>
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <div className="text-2xl mb-2">⏱️</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Free Meditation Timer
                </h4>
                <p className="text-sm">Perfect for busy professionals needing quick meditation sessions for stress relief and focus improvement</p>
              </div>
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <div className="text-2xl mb-2">🌟</div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  Free Online Meditation Tool
                </h4>
                <p className="text-sm">No ads, no tracking - just pure meditation experience with guided breathing exercises</p>
              </div>
            </div>
          </div>

          {/* Meditation Tips */}
          <div className={`p-12 rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30'
              : 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200'
          }`}>
            <h3 className={`text-3xl font-light text-center mb-8 ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
            }`}>
              🧘‍♂️ Advanced Meditation Techniques with Zen Moment
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Beginner's Meditation Guide
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Start small:</strong> Begin with 5-10 minutes daily meditation sessions using our free meditation timer and gradually increase duration as you become more comfortable with meditation practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Find a quiet space:</strong> Choose a peaceful environment where you won't be disturbed during your meditation sessions.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong>Focus on your breath:</strong> Use your breath as an anchor to keep your mind present during meditation with Zen Moment's guided timer.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong>Be patient with yourself:</strong> Meditation is a skill that develops over time. Don't judge yourself when your mind wanders during meditation.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className={`text-xl font-medium mb-4 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  Best Practices for Meditation Success
                </h4>
                <ul className={`space-y-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Consistency is key:</strong> Regular daily meditation practice is more important than session length. Use Zen Moment's meditation timer for consistent practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <span><strong>Mix meditation styles:</strong> Combine different meditation techniques like mindfulness, loving-kindness, and body scan for comprehensive meditation benefits.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span><strong>Use guided meditation:</strong> Start with guided meditation apps or recordings to help you learn proper meditation techniques and deepen your practice.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong>Track your progress:</strong> Use Zen Moment's free meditation timer to monitor your meditation journey and celebrate milestones in your practice.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 部分 */}
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