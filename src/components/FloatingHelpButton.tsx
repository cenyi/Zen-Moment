'use client'

import { useState, useEffect, lazy, Suspense } from 'react'

// 懒加载Framer Motion
const MotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })))
const MotionButton = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.button })))

// 检测是否为移动设备的函数
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (typeof window !== 'undefined' && window.innerWidth <= 768)
}

interface FloatingHelpButtonProps {
  theme: 'dark' | 'light'
  shortcuts: Array<{
    key: string
    action: string
  }>
}

export const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  theme,
  shortcuts
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [countdown, setCountdown] = useState(3) // 倒计时秒数

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

  // 自动关闭功能和倒计时
  useEffect(() => {
    if (showTooltip) {
      // 清除之前的定时器
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer)
      }

      // 如果不是悬停状态，3秒后自动关闭；如果是悬停状态，不自动关闭
      if (!isHovering) {
        // 重置倒计时
        setCountdown(3)

        // 设置倒计时
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              setShowTooltip(false)
              return 3
            }
            return prev - 1
          })
        }, 1000)

        setAutoCloseTimer(countdownInterval as any)

        return () => clearInterval(countdownInterval)
      } else {
        // 悬停状态，重置倒计时到默认值
        setCountdown(3)
      }
    }
  }, [showTooltip, isHovering])

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip)

    // 如果打开提示，重置倒计时
    if (!showTooltip) {
      setCountdown(3)
    }
  }

  const closeTooltip = () => {
    setShowTooltip(false)
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // 延迟关闭，给用户时间移动到提示框
    const timer = setTimeout(() => {
      if (!isHovering) {
        setShowTooltip(false)
      }
    }, 200)
    setAutoCloseTimer(timer)
  }

  const handleTooltipMouseEnter = () => {
    setIsHovering(true)
  }

  const handleTooltipMouseLeave = () => {
    setIsHovering(false)
    closeTooltip()
  }

  return (
    <>
      {/* 悬浮帮助按钮 - 移动端不显示 */}
      {!isMobile && (
        <Suspense fallback={
          <button
            onClick={toggleTooltip}
            className={`
              fixed bottom-6 right-6
              w-12 h-12
              rounded-full
              flex items-center justify-center
              ${theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
              transition-colors duration-200
              shadow-lg
              hover:shadow-xl
              transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              z-50
            `}
          >
            ?
          </button>
        }>
          <MotionButton
          onClick={toggleTooltip}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            fixed bottom-6 right-6
            w-12 h-12
            rounded-full
            flex items-center justify-center
            text-xl font-bold
            z-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            transition-all duration-300
            ${
              theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400'
                : 'bg-blue-500 text-white hover:bg-blue-400 focus:ring-blue-300'
            }
            shadow-lg hover:shadow-xl
            transform hover:scale-110 active:scale-95
          `}
          whileTap={{ scale: 0.95 }}
          aria-label="Show keyboard shortcuts"
          title="Hover to show keyboard shortcuts"
        >
          ?
        </MotionButton>
        </Suspense>
      )}

      {/* 快捷键提示框 */}
      {showTooltip && (
        <Suspense fallback={
          <div
            className={`
              fixed bottom-24 right-6
              max-w-xs sm:max-w-sm
              p-4
              rounded-lg
              shadow-2xl
              ${theme === 'dark'
                ? 'bg-gray-800 text-gray-100'
                : 'bg-white text-gray-800'
              }
              z-50
            `}
          >
            <div className="text-lg font-semibold mb-2">Keyboard Shortcuts</div>
            <div className="space-y-1">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    {shortcut.key}
                  </span>
                  <span className="text-sm">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>
        }>
          <MotionDiv
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={!isMobile ? handleTooltipMouseEnter : undefined}
          onMouseLeave={!isMobile ? handleTooltipMouseLeave : undefined}
          className={`
            fixed bottom-24 right-6
            max-w-xs sm:max-w-sm
            p-4
            rounded-lg
            shadow-2xl
            z-50
            backdrop-blur-sm
            ${
              theme === 'dark'
                ? 'bg-gray-800/90 text-gray-100 border border-gray-700/50'
                : 'bg-white/90 text-gray-800 border border-gray-200/50'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={closeTooltip}
            className={`
              absolute top-2 right-2
              w-6 h-6
              rounded-full
              flex items-center justify-center
              text-sm
              hover:bg-black/10
              transition-colors duration-200
              ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
            aria-label="关闭提示"
          >
            ×
          </button>

          {/* 标题 */}
          <h4 className="text-sm font-semibold mb-3 text-center">
            🎹 Keyboard Shortcuts
          </h4>

          
          {/* 快捷键列表 */}
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className={`
                  flex items-center justify-between
                  p-2
                  rounded
                  text-sm
                  ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 hover:bg-gray-700/70'
                      : 'bg-gray-100/50 hover:bg-gray-200/50'
                  }
                `}
              >
                <span>{shortcut.action}</span>
                <kbd
                  className={`
                    px-2 py-1
                    rounded
                    font-mono
                    text-xs
                    font-medium
                    ${
                      theme === 'dark'
                        ? 'bg-gray-600 text-gray-200'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* 自动关闭提示 */}
          <div className={`text-xs text-center mt-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {isHovering ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Paused while hovering</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${
                  countdown <= 1 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                }`}></span>
                <span>Auto-close in {countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
              </span>
            )}
          </div>
        </MotionDiv>
        </Suspense>
      )}

      {/* 点击外部区域关闭 */}
      {showTooltip && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeTooltip}
        />
      )}
    </>
  )
}