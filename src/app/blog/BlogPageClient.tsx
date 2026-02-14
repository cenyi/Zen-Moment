'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { useTimerStore } from '../../store/timerStore'
import { BlogPageContent } from './BlogPageContent'

export default function BlogPageClient() {
  const { theme, toggleTheme } = useTimerStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'theme-page-dark'
          : 'theme-page-light'
      }`}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark'
        ? 'theme-page-dark'
        : 'theme-page-light'
    }`}>
      <header>
        <Navigation
          theme={theme}
          onThemeToggle={toggleTheme}
          soundEnabled={false}
          onSoundToggle={() => {}}
          showSoundToggle={false}
        />
      </header>

      <BlogPageContent theme={theme} />

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
