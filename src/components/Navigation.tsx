'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SimpleButton } from './SimpleButton'
import { ThemeLogo } from './ThemeLogo'

interface NavigationProps {
  theme?: 'dark' | 'light'
  onThemeToggle?: () => void
  soundEnabled?: boolean
  onSoundToggle?: () => void
  showSoundToggle?: boolean
}

export const Navigation = ({ theme = 'dark', onThemeToggle, soundEnabled, onSoundToggle, showSoundToggle = false }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Timer', href: '/' },
    { label: 'Breathing', href: '/breathing' },
    { label: 'Stats', href: '/stats' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`w-full z-50 fixed top-0 left-0 right-0 transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-neumorphic-dark/85 backdrop-blur-md border-gray-700/30 shadow-lg'
        : 'bg-neumorphic-light/90 backdrop-blur-md border-gray-300/40 shadow-lg'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 no-underline ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            } hover:text-blue-500 transition-colors duration-200`}
            onClick={closeMobileMenu}
            prefetch={false}
          >
            <ThemeLogo
              theme={theme}
              className="rounded-lg"
              alt="Zen Moment - Meditation and Mindfulness App"
              size="medium"
            />
            <span className="font-bold text-xl">Zen Moment</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 hover:text-blue-500 no-underline min-h-[44px] flex items-center ${
                  theme === 'dark'
                    ? 'text-neumorphic-tips-dark hover:bg-gray-800/50'
                    : 'text-neumorphic-tips-light hover:bg-white/50'
                }`}
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Sound & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Sound Toggle */}
            {showSoundToggle && onSoundToggle && (
              <button
                onClick={onSoundToggle}
                className={`w-11 h-11 p-0 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                  theme === 'dark'
                    ? soundEnabled
                      ? 'neumorphic-dark text-blue-400 hover:text-blue-300 border border-gray-600/15 hover:border-gray-500/25'
                      : 'neumorphic-dark text-neumorphic-tips-dark hover:text-gray-300 border border-gray-600/15 hover:border-gray-500/25'
                    : soundEnabled
                      ? 'neumorphic text-blue-600 hover:text-blue-500 border border-gray-400/20 hover:border-gray-500/30'
                      : 'neumorphic text-neumorphic-tips-light hover:text-gray-700 border border-gray-400/20 hover:border-gray-500/30'
                }`}
                aria-label="Toggle sound"
                title={soundEnabled ? "Turn off sound" : "Turn on sound"}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {soundEnabled ? (
                    // Sound on icon - speaker with waves
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </>
                  ) : (
                    // Sound off icon - speaker with mute line
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

            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className={`w-11 h-11 p-0 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                  theme === 'dark'
                    ? 'neumorphic-dark text-yellow-400 hover:text-yellow-300 border border-gray-600/15 hover:border-gray-500/25'
                    : 'neumorphic text-neumorphic-tips-light hover:text-yellow-600 border border-gray-400/20 hover:border-gray-500/30'
                }`}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-6 h-6 flex items-center justify-center text-xl">
                  {/* Light Icon (for light mode) */}
                  <span
                    className={`absolute transition-all duration-300 transform text-sm font-bold ${
                      theme === 'dark' ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  >
                    ◐
                  </span>

                  {/* Dark Icon (for dark mode) */}
                  <span
                    className={`absolute transition-all duration-300 transform text-sm font-bold ${
                      theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                    }`}
                  >
                    ◑
                  </span>
                </div>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-3 rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-neumorphic-tips-dark hover:text-neumorphic-tips-light border border-gray-600/15 hover:border-gray-500/25'
                  : 'neumorphic text-neumorphic-tips-light hover:text-neumorphic-tips-dark border border-gray-400/20 hover:border-gray-500/30'
              }`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${
            theme === 'dark' ? 'border-neumorphic-tips-dark/20 bg-neumorphic-dark' : 'border-neumorphic-tips-light/20 bg-neumorphic-light'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 no-underline ${
                    theme === 'dark'
                      ? 'text-neumorphic-tips-dark hover:text-neumorphic-tips-light'
                      : 'text-neumorphic-tips-light hover:text-neumorphic-tips-dark'
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