import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
  description: 'Zen Moment: Free meditation timer and breathing exercises app for beginners. Quick meditation sessions with guided meditation techniques, stress relief, anxiety relief, and focus improvement. Best free meditation timer online. No ads, completely free.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
    description: 'Zen Moment: Free meditation timer and breathing exercises app for beginners. Quick meditation sessions with guided meditation techniques, stress relief, anxiety relief, and focus improvement. Best free meditation timer online. No ads, completely free.',
    url: 'https://zenmoment.net',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
      },
    ],
  },
  keywords: 'meditation timer, free meditation timer, online meditation timer, meditation app, free meditation app, meditation for beginners, quick meditation, guided meditation, meditation timer app, best meditation timer, free online meditation, meditation practice, daily meditation, zen meditation, mindfulness meditation, breathing exercises, stress relief meditation, anxiety relief, focus improvement, meditation tracker, relaxation techniques, zen moment',
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
    description: 'Zen Moment: Free meditation timer and breathing exercises app for beginners. Quick meditation sessions with guided meditation techniques, stress relief, anxiety relief, and focus improvement. Best free meditation timer online. No ads, completely free.',
    images: ['/og-image.webp'],
  },
}

// Server Component wrapper
export default function HomePage() {
  return <HomePageClient />
}