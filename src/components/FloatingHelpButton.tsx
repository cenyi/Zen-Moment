'use client'

import { useEffect, useState } from 'react'

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
}

interface FloatingHelpButtonProps {
  theme: 'dark' | 'light'
  shortcuts: Array<{
    key: string
    action: string
  }>
}

export const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({ theme, shortcuts }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const syncDevice = () => setIsMobile(isMobileDevice())
    syncDevice()
    window.addEventListener('resize', syncDevice)
    return () => window.removeEventListener('resize', syncDevice)
  }, [])

  useEffect(() => {
    if (!showTooltip || isHovering) return
    setCountdown(3)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowTooltip(false)
          return 3
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showTooltip, isHovering])

  const closeTooltip = () => setShowTooltip(false)

  if (isMobile) return null

  return (
    <>
      <button
        onClick={() => setShowTooltip(prev => !prev)}
        onMouseEnter={() => {
          setIsHovering(true)
          setShowTooltip(true)
        }}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center
          text-xl font-semibold z-50 transition-all duration-300 shadow-lg hover:shadow-xl
          transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${theme === 'dark'
            ? 'bg-[#244033] text-[#EBECE8] hover:bg-[#2F5242] focus:ring-[#8ABFA2]'
            : 'bg-[#5B836B] text-[#FFF6EA] hover:bg-[#4A705D] focus:ring-[#6E9B7F]'
          }
        `}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts"
      >
        ?
      </button>

      {showTooltip && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false)
            closeTooltip()
          }}
          className={`
            fixed bottom-24 right-6 max-w-xs sm:max-w-sm p-4 rounded-lg shadow-2xl z-50 backdrop-blur-sm border
            ${theme === 'dark'
              ? 'bg-[#1A2A21]/94 text-[#EBECE8] border-[#587862]/55'
              : 'bg-[#FFF5E7]/94 text-[#2D2A24] border-[#D8C4A7]/65'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeTooltip}
            className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors ${
              theme === 'dark'
                ? 'text-[#AAC7B5] hover:text-[#EBECE8] hover:bg-[#6E9B7F]/22'
                : 'text-[#6E886F] hover:text-[#2D2A24] hover:bg-[#6E9B7F]/16'
            }`}
            aria-label="Close tooltip"
          >
            X
          </button>

          <h4 className="text-sm font-semibold mb-3 text-center">Keyboard Shortcuts</h4>

          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded text-sm ${
                  theme === 'dark'
                    ? 'bg-[#24362B]/55 hover:bg-[#2F4437]/70'
                    : 'bg-[#F8E8D0]/72 hover:bg-[#F2DFC2]/86'
                }`}
              >
                <span>{shortcut.action}</span>
                <kbd
                  className={`px-2 py-1 rounded font-mono text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-[#30463A] text-[#CFE2D7]'
                      : 'bg-[#EEDCC1] text-[#547160]'
                  }`}
                >
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className={`text-xs text-center mt-3 ${theme === 'dark' ? 'text-[#A6C1B0]' : 'text-[#6E886F]'}`}>
            {isHovering ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Paused while hovering</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${countdown <= 1 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`} />
                <span>Auto-close in {countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {showTooltip && <div className="fixed inset-0 z-40" onClick={closeTooltip} />}
    </>
  )
}

