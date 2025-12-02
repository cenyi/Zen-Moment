'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { SimpleButton } from '../components/SimpleButton'
import { useTimerStore } from '../store/timerStore'

// 高对比度模式检测
const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const checkHighContrast = () => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)')
      setIsHighContrast(mediaQuery.matches)
    }

    checkHighContrast()

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    mediaQuery.addEventListener('change', checkHighContrast)

    return () => mediaQuery.removeEventListener('change', checkHighContrast)
  }, [])

  return isHighContrast
}

export default function NotFound() {
  const { theme, toggleTheme } = useTimerStore()
  const [mounted, setMounted] = useState(false)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [ariaMessage, setAriaMessage] = useState('')
  const router = useRouter()
  const isHighContrast = useHighContrastMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isBreathing) return

    const phases = {
      inhale: 4000,
      hold: 7000,
      exhale: 8000
    }

    // 更新ARIA消息
    const updateAriaMessage = () => {
      switch (breathPhase) {
        case 'inhale':
          setAriaMessage('Breathe in for 4 seconds')
          break
        case 'hold':
          setAriaMessage('Hold your breath for 7 seconds')
          break
        case 'exhale':
          setAriaMessage('Breathe out for 8 seconds')
          break
      }
    }

    updateAriaMessage()

    const timer = setTimeout(() => {
      switch (breathPhase) {
        case 'inhale':
          setBreathPhase('hold')
          break
        case 'hold':
          setBreathPhase('exhale')
          break
        case 'exhale':
          setIsBreathing(false)
          setBreathPhase('inhale')
          setAriaMessage('Breathing exercise completed')
          break
      }
    }, phases[breathPhase])

    return () => clearTimeout(timer)
  }, [isBreathing, breathPhase])

  if (!mounted) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-900'
      }`}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  const startBreathing = () => {
    setIsBreathing(true)
    setBreathPhase('inhale')
    setAriaMessage('Starting 4-7-8 breathing exercise')
  }

  // 高对比度模式样式
  const getHighContrastClasses = (baseClasses: string) => {
    if (!isHighContrast) return baseClasses

    return baseClasses
      .replace(/bg-\w+-950/g, 'bg-black')
      .replace(/bg-\w+-50/g, 'bg-white')
      .replace(/text-\w+-300/g, 'text-white')
      .replace(/text-\w+-900/g, 'text-black')
      .replace(/border-\w+-800/g, 'border-gray-600')
      .replace(/border-\w+-200/g, 'border-gray-400')
      .replace(/text-\w+-400/g, 'text-white')
      .replace(/text-\w-600/g, 'text-black')
      .replace(/text-\w+-500/g, 'text-gray-700')
      .replace(/text-blue-400/g, 'text-blue-500')
      .replace(/text-blue-600/g, 'text-blue-700')
      .replace(/neumorphic-dark/g, 'border-2 border-gray-600 bg-black')
      .replace(/neumorphic/g, 'border-2 border-gray-600 bg-white')
  }

  const getBreathingText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe In...'
      case 'hold':
        return 'Hold...'
      case 'exhale':
        return 'Breathe Out...'
      default:
        return 'Start Breathing'
    }
  }

  const getBreathingScale = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'scale-110'
      case 'hold':
        return 'scale-100'
      case 'exhale':
        return 'scale-90'
      default:
        return 'scale-100'
    }
  }

  return (
    <div className={getHighContrastClasses(`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-900'
    }`)}
      role="main"
      aria-label="404 Page not found with breathing exercise">

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Page not found. You can try a breathing exercise to relax, or navigate to another page.
      </div>

      {/* ARIA live region for breathing exercise */}
      <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        {ariaMessage}
      </div>

      <Navigation
        theme={theme}
        onThemeToggle={toggleTheme}
        soundEnabled={false}
        onSoundToggle={() => {}}
        showSoundToggle={false}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Mindful Message */}
          <h1 className={getHighContrastClasses(`text-4xl md:text-5xl font-light mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`)}
            role="heading"
            aria-level={1}>
            Take a Deep Breath
          </h1>

          <p className={getHighContrastClasses(`text-lg md:text-xl mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`)}>
            Sometimes we lose our way. That's okay.
            <br />
            Let's take a moment to return to our center.
          </p>

          {/* Breathing Exercise */}
          <div className={getHighContrastClasses(`mb-12 p-8 rounded-2xl transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900/50 border border-gray-800'
              : 'bg-gray-50/50 border border-gray-200'
          }`)}
            role="region"
            aria-label="Breathing exercise section">
            <div className={getHighContrastClasses(`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out ${getBreathingScale()} ${
              theme === 'dark'
                ? 'bg-blue-500/20 border-2 border-blue-400/30'
                : 'bg-blue-100/50 border-2 border-blue-200/50'
            }`)}
              role="img"
              aria-label={`Breathing visualization: ${getBreathingText()}`}>
              <div className={`text-4xl ${
                isBreathing
                  ? 'animate-pulse'
                  : ''
              } ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
                aria-hidden="true">
                {isBreathing ? '🫁' : '🧘'}
              </div>
            </div>

            <div className="space-y-4">
              <p className={getHighContrastClasses(`text-lg font-medium ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`)}
                aria-live="polite"
                aria-atomic="true">
                {getBreathingText()}
              </p>

              {!isBreathing && (
                <p className={getHighContrastClasses(`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`)}>
                  Try a 4-7-8 breathing exercise to find your way back
                </p>
              )}
            </div>

            {!isBreathing && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={startBreathing}
                  className={getHighContrastClasses(`
                    relative group overflow-hidden
                    px-12 py-4 rounded-2xl
                    text-lg font-medium tracking-wide
                    transition-all duration-300 ease-out
                    transform hover:scale-105 active:scale-95
                    min-w-[200px]
                    ${theme === 'dark'
                      ? 'neumorphic-dark text-blue-400'
                      : 'neumorphic text-blue-600'
                    }
                  `)}
                  aria-label="Start 4-7-8 breathing exercise"
                  aria-describedby="breathing-description">
                  {/* 新拟态内部光晕效果 */}
                  <div className={`absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                    theme === 'dark'
                      ? 'bg-blue-400/10'
                      : 'bg-blue-600/10'
                  }`}
                    aria-hidden="true" />

                  <span className="relative z-10">
                    Start Breathing Exercise
                  </span>
                </button>
              </div>
            )}

            {/* Hidden description for screen readers */}
            <div id="breathing-description" className="sr-only">
              This 4-7-8 breathing exercise consists of inhaling for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. It can help reduce anxiety and promote relaxation.
            </div>
          </div>

          {/* Navigation Options */}
          <div className="space-y-6"
            role="region"
            aria-label="Navigation options">
            <p className={getHighContrastClasses(`text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`)}>
              When you're ready, you can return to:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center"
              role="navigation"
              aria-label="Page navigation">
              {/* Home Button */}
              <button
                onClick={() => router.push('/')}
                className={getHighContrastClasses(`
                  relative group overflow-hidden
                  px-8 py-3 rounded-2xl
                  text-base font-medium tracking-wide
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  min-w-[140px]
                  flex items-center justify-center gap-2
                  ${theme === 'dark'
                    ? 'neumorphic-dark text-blue-400'
                    : 'neumorphic text-blue-600'
                  }
                `)}
                aria-label="Navigate to home page">
                {/* 新拟态内部光晕效果 */}
                <div className={`absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-blue-400/10'
                    : 'bg-blue-600/10'
                }`}
                  aria-hidden="true" />

                <span className="relative z-10" aria-hidden="true">🏠</span>
                <span className="relative z-10">Home</span>
              </button>

              {/* Breathing Button */}
              <button
                onClick={() => router.push('/breathing')}
                className={getHighContrastClasses(`
                  relative group overflow-hidden
                  px-8 py-3 rounded-2xl
                  text-base font-medium tracking-wide
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  min-w-[140px]
                  flex items-center justify-center gap-2
                  ${theme === 'dark'
                    ? 'neumorphic-dark text-neumorphic-tips-dark hover:text-white'
                    : 'neumorphic text-neumorphic-tips-light hover:text-blue-700'
                  }
                `)}
                aria-label="Navigate to breathing exercises">
                {/* 新拟态内部光晕效果 */}
                <div className={`absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-white/5'
                    : 'bg-blue-700/10'
                }`}
                  aria-hidden="true" />

                <span className="relative z-10" aria-hidden="true">🫁</span>
                <span className="relative z-10">Breathing</span>
              </button>

              {/* Blog Button */}
              <button
                onClick={() => router.push('/blog')}
                className={getHighContrastClasses(`
                  relative group overflow-hidden
                  px-8 py-3 rounded-2xl
                  text-base font-medium tracking-wide
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  min-w-[140px]
                  flex items-center justify-center gap-2
                  ${theme === 'dark'
                    ? 'neumorphic-dark text-neumorphic-tips-dark hover:text-white'
                    : 'neumorphic text-neumorphic-tips-light hover:text-blue-700'
                  }
                `)}
                aria-label="Navigate to blog articles">
                {/* 新拟态内部光晕效果 */}
                <div className={`absolute inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-white/5'
                    : 'bg-blue-700/10'
                }`}
                  aria-hidden="true" />

                <span className="relative z-10" aria-hidden="true">📖</span>
                <span className="relative z-10">Blog</span>
              </button>
            </div>
          </div>

          {/* Reassuring Message */}
          <div className={getHighContrastClasses(`mt-12 p-6 rounded-xl ${
            theme === 'dark'
              ? 'bg-gray-900/30 border border-gray-800/50'
              : 'bg-gray-50/30 border border-gray-200/50'
          }`)}
            role="contentinfo"
            aria-label="Inspirational message">
            <blockquote className={getHighContrastClasses(`text-sm italic ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`)}>
              <p>
                "The journey is not about finding the perfect path,
                but about how we navigate when we lose our way."
              </p>
              <cite className="block mt-2 text-xs not-italic opacity-70">
                — Zen wisdom for finding your way
              </cite>
            </blockquote>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}