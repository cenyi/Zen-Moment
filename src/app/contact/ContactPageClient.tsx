'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { useTimerStore } from '../../store/timerStore'
import { ContactContent } from './ContactContent'

export default function ContactPageClient() {
  const { theme, toggleTheme } = useTimerStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 防止 hydration 不匹配
  if (!mounted) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-neumorphic-dark text-neumorphic-tips-dark'
          : 'bg-neumorphic-light text-neumorphic-tips-light'
      }`}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'bg-neumorphic-dark text-neumorphic-tips-dark'
        : 'bg-neumorphic-light text-neumorphic-tips-light'
    }`}>
      <Navigation
        theme={theme}
        onThemeToggle={toggleTheme}
        soundEnabled={false}
        onSoundToggle={() => {}}
      />

      <ContactContent />

      <Footer />
    </div>
  )
}