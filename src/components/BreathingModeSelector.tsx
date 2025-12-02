'use client'

import { useState, useEffect, useRef } from 'react'
import { BREATHING_MODES } from '../constants/breathingModes'

interface BreathingModeSelectorProps {
  currentModeId: string
  onModeChange: (modeId: string) => void
  theme: 'dark' | 'light'
  disabled?: boolean
}

// 获取模式的详细指导信息
const getModeGuidance = (modeId: string) => {
  const guidances: Record<string, {
    title: string
    description: string
    bestFor: string[]
    howToUse: string
    expected: string
  }> = {
    relax: {
      title: "😌 Relax Mode - 4-7-8 Breathing",
      description: "Classic relaxation technique for rapid stress and anxiety relief",
      bestFor: ["Bedtime relaxation", "Anxiety relief", "Stress management", "Sleep difficulties"],
      howToUse: "Lie down or sit comfortably, close your eyes, focus on the breathing rhythm",
      expected: "Feel your body gradually relax, heart rate slow down, and become sleepy"
    },
    focus: {
      title: "◎ Focus Mode - Box Breathing",
      description: "Box breathing technique to enhance concentration and mental clarity",
      bestFor: ["Work & study", "Before exams", "Need concentration", "Mental work"],
      howToUse: "Sit straight, eyes can be slightly closed, focus on counting beats",
      expected: "Clearer thinking, better concentration, more alert mind"
    },
    energy: {
      title: "⚡ Energy Mode - Activating Breathing",
      description: "Activating breathing technique for quick refresh and alertness",
      bestFor: ["Morning wake-up", "Afternoon fatigue", "Before exercise", "Need energy boost"],
      howToUse: "Sit straight or stand, inhale deeply, exhale quickly, can stretch with breath",
      expected: "Feel energized, mentally clear, fatigue disappears"
    },
    natural: {
      title: "🍃 Natural Mode - Mindful Breathing",
      description: "Natural breathing method to cultivate mindfulness awareness",
      bestFor: ["Meditation practice", "Mindfulness training", "Emotional regulation", "Mind-body connection"],
      howToUse: "Relaxed sitting posture, feel natural breathing rhythm, don't force control",
      expected: "Inner peace, mind-body harmony, emotional stability"
    },
    beginner: {
      title: "🔷 Beginner Mode - 3-6-6 Breathing",
      description: "Gentle breathing pattern perfect for breathing exercise newcomers",
      bestFor: ["Breathing beginners", "First-time meditation", "Building confidence", "Learning basics"],
      howToUse: "Find a comfortable position, place hand on belly, follow the gentle rhythm",
      expected: "Feel comfortable with breathing, establish foundation, gain confidence"
    },
    balanced: {
      title: "🔵 Balanced Mode - 5-5-5 Breathing",
      description: "Perfectly balanced breathing rhythm for harmonious state",
      bestFor: ["Daily practice", "Stress balance", "Steady focus", "Harmonious state"],
      howToUse: "Sit comfortably with straight spine, maintain equal timing, focus on balance",
      expected: "Feel centered and balanced, steady mind, harmonious breathing state"
    }
  }

  return guidances[modeId] || guidances.relax
}

export const BreathingModeSelector = ({
  currentModeId,
  onModeChange,
  theme,
  disabled = false
}: BreathingModeSelectorProps) => {
  const [showGuidance, setShowGuidance] = useState(false)
  const [selectedModeForGuidance, setSelectedModeForGuidance] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(15)
  const countdownInterval = useRef<NodeJS.Timeout | null>(null)

  const handleModeClick = (modeId: string) => {
    onModeChange(modeId)
    // 显示该模式的指导说明
    setSelectedModeForGuidance(modeId)
    setShowGuidance(true)
    setCountdown(15)

    // 清除之前的倒计时
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
    }

    // 开始新的倒计时
    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowGuidance(false)
          if (countdownInterval.current) {
            clearInterval(countdownInterval.current)
          }
          return 15
        }
        return prev - 1
      })
    }, 1000)
  }

  const guidance = selectedModeForGuidance ? getModeGuidance(selectedModeForGuidance) : null

  // 组件卸载时清理倒计时
  useEffect(() => {
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current)
      }
    }
  }, [])

  // 手动关闭时清理倒计时
  const handleClose = () => {
    setShowGuidance(false)
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
    }
  }
  return (
    <div className="mb-2">

      {/* 新拟态模式选择器 */}
      <div className="flex justify-center mb-2">
        <div className={`inline-flex rounded-3xl p-2 ${
          theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark-inset' : 'bg-neumorphic-light shadow-neumorphic-inset'
        }`}>
          {Object.values(BREATHING_MODES).map((mode) => {
            const isSelected = currentModeId === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => handleModeClick(mode.id)}
                disabled={disabled}
                className={`
                  relative group px-6 py-4 rounded-2xl transition-all duration-300
                  flex flex-col items-center space-y-2 min-w-[100px]
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0'}
                  ${isSelected
                    ? theme === 'dark'
                      ? 'neumorphic-dark-flat text-blue-400 border border-blue-400/30 hover:border-blue-400/50'
                      : 'neumorphic-flat text-blue-600 border border-blue-500/30 hover:border-blue-500/50'
                    : theme === 'dark'
                      ? 'neumorphic-dark text-neumorphic-tips-dark border border-gray-600/30 hover:border-gray-500/40'
                      : 'neumorphic text-neumorphic-tips-light border border-gray-400/35 hover:border-gray-500/45'
                  }
                `}
                title={mode.description}
              >
                {/* 新拟态选中状态指示器 */}
                {isSelected && (
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse shadow-neumorphic-inset ${
                    theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
                  }`} />
                )}

                {/* 模式图标 */}
                <span className="text-2xl mb-1">{mode.icon}</span>

                {/* 模式名称 */}
                <span className="text-sm font-medium">{mode.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 新拟态当前模式描述 */}
      <div className={`text-center max-w-2xl mx-auto ${
        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
      }`}>
        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl ${
          theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
        }`}>
          {/* 模式图标和名称 */}
          <div className="flex items-center space-x-2">
            <span className="text-lg">{BREATHING_MODES[currentModeId]?.icon || '○'}</span>
            <span className="font-medium">{BREATHING_MODES[currentModeId]?.name || 'Breathing'} Mode</span>
          </div>

          <span className="text-xs opacity-40">|</span>

          {/* 模式描述 */}
          <span className="text-sm">{BREATHING_MODES[currentModeId]?.description || 'Breathing exercise'}</span>

          <span className="text-xs opacity-40">|</span>

          {/* 呼吸节奏显示 */}
          <div className="flex items-center space-x-2">
            {(() => {
              const mode = BREATHING_MODES[currentModeId];
              if (!mode) {
                return <span className="text-xs">4-4-4 rhythm</span>;
              }

              return (
                <>
                  <span className="text-xs font-mono">{mode.pattern?.inhale || 4}s</span>
                  <span className="text-xs opacity-60">inhale</span>

                  {(mode.pattern?.hold || 0) > 0 && (
                    <>
                      <span className="text-xs opacity-40">•</span>
                      <span className="text-xs font-mono">{mode.pattern.hold}s</span>
                      <span className="text-xs opacity-60">hold</span>
                    </>
                  )}

                  <span className="text-xs opacity-40">•</span>
                  <span className="text-xs font-mono">{mode.pattern?.exhale || 4}s</span>
                  <span className="text-xs opacity-60">exhale</span>

                  {mode.pattern?.holdAfter && (
                    <>
                      <span className="text-xs opacity-40">•</span>
                      <span className="text-xs font-mono">{mode.pattern.holdAfter}s</span>
                      <span className="text-xs opacity-60">pause</span>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* 优化的悬浮指导提示 */}
      {showGuidance && guidance && (
        <div className={`
          fixed top-1/2 right-4 transform -translate-y-1/2
          z-50 w-80 max-w-sm lg:w-96
          animate-in slide-in-from-right-4 fade-in-0 duration-500 ease-out
          md:right-8 lg:right-12
        `}>
          {/* 多层新拟态背景 */}
          <div className={`
            relative rounded-3xl overflow-hidden
            ${theme === 'dark'
              ? 'neumorphic-dark-large shadow-neumorphic-dark-large'
              : 'neumorphic-large shadow-neumorphic-large'
            }
          `}>
            {/* 内层背景增强深度 */}
            <div className={`
              m-1 rounded-3xl p-1
              ${theme === 'dark'
                ? 'bg-neumorphic-dark shadow-neumorphic-dark-inset'
                : 'bg-neumorphic-light shadow-neumorphic-inset'
              }
            `}>
              {/* 内容容器 */}
              <div className={`
                rounded-2xl p-6
                ${theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800/50 to-gray-700/30'
                  : 'bg-gradient-to-br from-white/50 to-gray-50/30'
                }
              `}>
                {/* 优化的关闭按钮 */}
                <button
                  onClick={handleClose}
                  className={`
                    absolute -top-4 -right-4 w-10 h-10 rounded-full
                    flex items-center justify-center text-xl font-bold
                    transition-all duration-300 hover:scale-110 active:scale-95
                    shadow-neumorphic-inset
                    ${theme === 'dark'
                      ? 'neumorphic-dark text-red-400 hover:text-red-300'
                      : 'neumorphic text-red-600 hover:text-red-500'
                    }
                  `}
                >
                  ×
                </button>

                  {/* 标题 */}
                <div className="text-center mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {guidance.title}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {guidance.description}
                </p>
              </div>

              {/* 适用场景 */}
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 flex items-center ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  <span className="mr-2">✦</span>
                  Best For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {guidance.bestFor.map((item, index) => (
                    <span
                      key={index}
                      className={`
                        px-3 py-1 rounded-full text-xs
                        ${theme === 'dark'
                          ? 'neumorphic-dark-flat text-blue-400'
                          : 'neumorphic-flat text-blue-600'
                        }
                      `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 使用方法 */}
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 flex items-center ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  <span className="mr-2">◉</span>
                  How to Use
                </h4>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {guidance.howToUse}
                </p>
              </div>

              {/* 预期效果 */}
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 flex items-center ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  <span className="mr-2">◎</span>
                  Expected Results
                </h4>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {guidance.expected}
                </p>
              </div>

              {/* 优化的开始按钮 */}
                <div className="text-center">
                  <button
                    onClick={handleClose}
                    className={`
                      px-8 py-3 rounded-2xl text-sm font-medium
                      transition-all duration-300 hover:scale-105 active:scale-95
                      shadow-neumorphic hover:shadow-neumorphic-hover
                      ${theme === 'dark'
                        ? 'neumorphic-dark text-blue-400 hover:text-blue-300'
                        : 'neumorphic-light text-blue-600 hover:text-blue-500'
                      }
                    `}
                  >
                    Start Practice
                  </button>
                </div>

                {/* 优化的倒计时显示 */}
                <div className={`text-center mt-4 text-xs ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  Auto-hide in
                  <span className={`font-mono font-bold ml-1 mr-1 px-2 py-1 rounded-lg ${
                    countdown <= 5
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-500/20 text-blue-600'
                  }`}>
                    {countdown}s
                  </span>
                  {countdown <= 5 && (
                    <span className="ml-1 animate-pulse">⧗</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 优化的背景遮罩 - 新拟态风格 */}
          <div
            className={`
              fixed inset-0 -z-10 backdrop-blur-sm transition-opacity duration-300
              ${theme === 'dark'
                ? 'bg-black/30'
                : 'bg-black/10'
              }
            `}
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  )
}