'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SimpleButton } from './SimpleButton'

interface BreathingAnimationProps {
  theme?: 'dark' | 'light'
  breathPhase?: 'inhale' | 'hold' | 'exhale' | null
  isActive?: boolean
}

export const BreathingAnimation = ({ 
  theme = 'dark', 
  breathPhase: externalPhase, 
  isActive: externalIsActive 
}: BreathingAnimationProps) => {
  const [internalBreathPhase, setInternalBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [internalIsActive, setInternalIsActive] = useState(false)
  
  // 使用外部提供的状态，如果没有则使用内部状态
  const breathPhase = externalPhase !== undefined ? externalPhase : internalBreathPhase
  const isActive = externalIsActive !== undefined ? externalIsActive : internalIsActive

  useEffect(() => {
    // 只在没有外部提供phase时运行内部动画循环
    if (!externalPhase && !isActive) return

    const cycle = async () => {
      if (externalPhase) return // 如果有外部提供的阶段，不运行内部循环
      
      // Inhale phase (4 seconds)
      setInternalBreathPhase('inhale')
      await new Promise(resolve => setTimeout(resolve, 4000))

      // Hold phase (7 seconds)
      setInternalBreathPhase('hold')
      await new Promise(resolve => setTimeout(resolve, 7000))

      // Exhale phase (8 seconds)
      setInternalBreathPhase('exhale')
      await new Promise(resolve => setTimeout(resolve, 8000))

      // Restart cycle if still active
      if (internalIsActive) {
        cycle()
      }
    }

    cycle()
  }, [isActive, externalPhase])

  const getCircleScale = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'scale-150'
      case 'hold':
        return 'scale-150'
      case 'exhale':
        return 'scale-50'
      default:
        return 'scale-100'
    }
  }

  const getInstructionText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      default:
        return 'Ready'
    }
  }

  const getInstructionColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
      case 'hold':
        return theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
      case 'exhale':
        return theme === 'dark' ? 'text-green-400' : 'text-green-600'
      default:
        return theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
    }
  }

  const toggleBreathing = () => {
    // 只在没有外部提供isActive时切换内部状态
    if (externalIsActive === undefined) {
      setInternalIsActive(!internalIsActive)
      if (!internalIsActive) {
        setInternalBreathPhase('inhale')
      }
    }
  }

  return (
    <section className={`py-16 transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-neumorphic-light'
    }`}>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 opacity-30 transition-all duration-1000 ${
        breathPhase === 'inhale'
          ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20'
          : breathPhase === 'hold'
          ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20'
          : 'bg-gradient-to-br from-gray-600/20 to-blue-600/20'
      }`} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl md:text-4xl font-light mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-neumorphic-tips-light'
          }`}>
            Take a Deep Breath
          </h2>

          {/* Breathing Circle */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer circles for visual effect */}
              <div className={`absolute w-full h-full rounded-full border-2 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-500/50/50'
              }`} />
              <div className={`absolute w-3/4 h-3/4 rounded-full border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-500/50'
              }`} />

              {/* Main breathing circle */}
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-1000 ease-in-out ${getCircleScale()} shadow-2xl relative overflow-hidden`}
                style={{
                  background: breathPhase === 'inhale' ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' :
                              breathPhase === 'hold' ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' :
                              'linear-gradient(135deg, #10B981, #3B82F6)'
                }}
              >
                {/* Inner glow effect */}
                <div className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${breathPhase === 'inhale' ? 'bg-blue-400 opacity-30 animate-pulse' : breathPhase === 'hold' ? 'bg-purple-400 opacity-30' : 'bg-green-400 opacity-30'}`} />

                {/* Particle effects */}
                {breathPhase === 'exhale' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-white/20 animate-ping" />
                    {/* Additional particle effects for exhalation */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white opacity-70"
                        style={{
                          top: `${50 + Math.sin((i * Math.PI) / 4) * 40}%`,
                          left: `${50 + Math.cos((i * Math.PI) / 4) * 40}%`,
                          animation: `particleFloat${i} 3s linear infinite`
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Center dot for focus */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-white'} opacity-80`} />
                </div>
              </div>
            </div>
          </div>

          {/* Instruction Text */}
          <p className={`text-xl md:text-2xl font-light mb-4 transition-colors duration-300 ${getInstructionColor()}`}>
            {getInstructionText()}
          </p>

          {/* Control Button */}
          <div className="flex flex-col items-center space-y-8">
            {/* Main CTA Button */}
            <button
              onClick={toggleBreathing}
              className={`
                relative group overflow-hidden
                px-8 py-4 rounded-2xl
                text-lg font-medium tracking-wide
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-2xl
                backdrop-blur-sm
                min-w-[200px]
                ${isActive
                  ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-400/30 text-red-400'
                  : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-400/30 text-blue-400'
                }
                ${theme === 'dark'
                  ? 'shadow-black/20 hover:shadow-black/30'
                  : 'shadow-gray-900/10 hover:shadow-gray-900/20'
                }
              `}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 rounded-2xl ${
                  isActive
                    ? 'bg-gradient-to-r from-red-400/20 to-pink-400/20'
                    : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
                } blur-xl`} />
              </div>

              {/* Button text with icon */}
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-2xl">
                  {isActive ? '❚❚' : '◯'}
                </span>
                <span>
                  {isActive ? 'Stop' : 'Start Breathing'}
                </span>
              </div>

              {/* Subtle pulse animation for active state */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 animate-ping" />
              )}
            </button>

            {/* Secondary CTA Section */}
            <div className="text-center space-y-4">
              <p className={`text-sm font-light ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                Want the complete 4-7-8 experience?
              </p>

              <Link
                href="/breathing"
                className={`
                  inline-flex items-center space-x-2
                  px-6 py-3 rounded-xl
                  text-base font-medium
                  transition-all duration-300 ease-out
                  transform hover:scale-105 active:scale-95
                  backdrop-blur-sm
                  border
                  ${theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/15 border-white/20 text-white hover:text-gray-200 shadow-black/10 hover:shadow-black/20'
                    : 'bg-black/5 hover:bg-black/10 border-black/10 text-neumorphic-tips-light hover:text-neumorphic-tips-light shadow-gray-900/5 hover:shadow-gray-900/10'
                  }
                `}
              >
                <span className="text-lg">◎</span>
                <span>Try Full 4-7-8 Exercise</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Breathing Benefits */}
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            <div>
              <div className={`text-3xl mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>◈</div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neumorphic-tips-light'
              }`}>Reduce Stress</h3>
              <p className="text-sm">
                Activate your parasympathetic nervous system to calm your mind and body
              </p>
            </div>
            <div>
              <div className={`text-3xl mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>🌿</div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neumorphic-tips-light'
              }`}>Lower Anxiety</h3>
              <p className="text-sm">
                Regular breathing exercises can significantly reduce anxiety symptoms
              </p>
            </div>
            <div>
              <div className={`text-3xl mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>○</div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-neumorphic-tips-light'
              }`}>Better Sleep</h3>
              <p className="text-sm">
                Practice before bedtime to improve sleep quality and fall asleep faster
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}