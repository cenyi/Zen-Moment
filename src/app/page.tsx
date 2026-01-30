import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Free Meditation Timer & Breathing Exercises | Zen Moment',
  description: 'Free meditation timer and breathing exercises for beginners. Quick sessions for stress relief, anxiety relief, and focus improvement. No ads, completely free.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Meditation Timer & Breathing Exercises | Zen Moment',
    description: 'Free meditation timer and breathing exercises for beginners. Quick sessions for stress relief, anxiety relief, and focus improvement. No ads, completely free.',
    url: 'https://zenmoment.net',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Free Meditation Timer & Breathing Exercises | Zen Moment',
      },
    ],
  },
  keywords: 'meditation timer, free meditation timer, online meditation timer, meditation app, free meditation app, meditation for beginners, quick meditation, guided meditation, meditation timer app, best meditation timer, free online meditation, meditation practice, daily meditation, zen meditation, mindfulness meditation, breathing exercises, stress relief meditation, anxiety relief, focus improvement, meditation tracker, relaxation techniques, zen moment',
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meditation Timer & Breathing Exercises | Zen Moment',
    description: 'Free meditation timer and breathing exercises for beginners. Quick sessions for stress relief, anxiety relief, and focus improvement. No ads, completely free.',
    images: ['/og-image.webp'],
  },
}

// Server Component wrapper
export default function HomePage() {
  return <HomePageClient />
}