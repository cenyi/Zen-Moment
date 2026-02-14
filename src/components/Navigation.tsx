'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeLogo } from './ThemeLogo'

interface NavigationProps {
  theme?: 'dark' | 'light'
  onThemeToggle?: () => void
  soundEnabled?: boolean
  onSoundToggle?: () => void
  showSoundToggle?: boolean
}

export const Navigation = ({
  theme = 'dark',
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  showSoundToggle = false,
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  const navItems = [
    { label: 'Timer', href: '/' },
    { label: 'Breathing', href: '/breathing-exercise' },
    { label: 'Stats', href: '/stats' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav
      className={`w-full z-50 fixed top-0 left-0 right-0 transition-colors duration-300 border-b ${
        theme === 'dark'
          ? 'bg-[#122018]/90 backdrop-blur-md border-[#4A6958]/45 shadow-[0_10px_28px_rgba(0,0,0,0.32)]'
          : 'bg-[#FFF2DE]/92 backdrop-blur-md border-[#D8C4A6]/65 shadow-[0_10px_28px_rgba(150,118,78,0.14)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className={`flex items-center space-x-2 no-underline ${
              theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
            } hover:text-[#6E9B7F] transition-colors duration-200`}
            onClick={closeMobileMenu}
            prefetch={false}
          >
            <ThemeLogo
              theme={theme}
              className="rounded-lg"
              alt="Zen Moment - Meditation and Mindfulness App"
              size="medium"
            />
            <span className="font-semibold text-xl tracking-tight">Zen Moment</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 no-underline min-h-[44px] flex items-center ${
                  theme === 'dark'
                    ? 'text-[#EBECE8] hover:text-[#C4DDCF] hover:bg-[#223328]/60'
                    : 'text-[#2D2A24] hover:text-[#4F735F] hover:bg-[#F8E8D1]/90'
                }`}
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {showSoundToggle && onSoundToggle && (
              <button
                onClick={onSoundToggle}
                className={`w-11 h-11 p-0 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E9B7F] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                  theme === 'dark'
                    ? soundEnabled
                      ? 'bg-[#223529] text-[#B4CFBE] hover:text-[#E8F0EB] border border-[#547661]/55 hover:border-[#8ABFA2]/55'
                      : 'bg-[#223529] text-[#A6C1B0] hover:text-[#EBECE8] border border-[#4B6656]/45 hover:border-[#547661]/65'
                    : soundEnabled
                      ? 'bg-[#FFF3E1] text-[#4A705D] hover:text-[#7C643E] border border-[#D8C4A7]/55 hover:border-[#6E9B7F]/55'
                      : 'bg-[#FFF3E1] text-[#6E9B7F] hover:text-[#2D2A24] border border-[#D8C4A7]/40 hover:border-[#D8C4A7]/65'
                }`}
                aria-label="Toggle sound"
                title={soundEnabled ? 'Turn off sound' : 'Turn on sound'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {soundEnabled ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                      />
                    </>
                  )}
                </svg>
              </button>
            )}

            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className={`w-11 h-11 p-0 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E9B7F] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                  theme === 'dark'
                    ? 'bg-[#223529] text-[#8ABFA2] hover:text-[#DAB48A] border border-[#547661]/55 hover:border-[#8ABFA2]/55'
                    : 'bg-[#FFF3E1] text-[#9A825F] hover:text-[#4A705D] border border-[#D8C4A7]/55 hover:border-[#6E9B7F]/55'
                }`}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <svg
                    className={`absolute w-5 h-5 transition-all duration-300 transform ${
                      theme === 'dark' ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" strokeWidth="2" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg
                    className={`absolute w-5 h-5 transition-all duration-300 transform ${
                      theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 0 0 9.8 9.8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            )}

            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-3 rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E9B7F] shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'bg-[#223529] text-[#EBECE8] hover:text-white border border-[#547661]/50 hover:border-[#8ABFA2]/65'
                  : 'bg-[#FFF3E1] text-[#2D2A24] hover:text-black border border-[#D8C4A7]/55 hover:border-[#6E9B7F]/55'
              }`}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${theme === 'dark' ? 'border-[#4A6958]/45 bg-[#132019]' : 'border-[#D8C4A6]/65 bg-[#FFF1DD]'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 no-underline ${
                    theme === 'dark' ? 'text-[#EBECE8] hover:text-[#B4CFBE]' : 'text-[#2D2A24] hover:text-[#6E9B7F]'
                  }`}
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
