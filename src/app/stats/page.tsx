import { Metadata } from 'next'
import StatsPageClient from './StatsPageClient'

export const metadata: Metadata = {
  title: 'Meditation Statistics Tracker & Progress Analytics',
  description: 'Free meditation tracker with detailed statistics and progress analytics. Track daily, weekly, and monthly meditation time, session count, and personal growth insights.',
  alternates: {
    canonical: '/stats',
  },
  openGraph: {
    title: 'Meditation Statistics Tracker & Progress Analytics',
    description: 'Free meditation tracker with detailed statistics and progress analytics. Track daily, weekly, and monthly meditation time, session count, and personal growth insights.',
    url: 'https://zenmoment.net/stats',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-stats.webp',
        width: 1200,
        height: 630,
        alt: 'Meditation Statistics & Progress Tracking | Zen Moment',
      },
    ],
  },
  keywords: 'free meditation tracker, meditation statistics online, mindfulness progress app, meditation habit tracking, meditation analytics tools, practice progress monitoring, meditation goals setting, meditation insights dashboard, meditation journal app, progress tracking software, meditation streaks counter, meditation achievements system, meditation data analysis, meditation performance metrics',
  twitter: {
    card: 'summary_large_image',
    title: 'Meditation Statistics Tracker & Progress Analytics',
    description: 'Free meditation tracker with detailed statistics and progress analytics. Track daily, weekly, and monthly meditation time, session count, and personal growth insights.',
    images: ['/og-image-stats.webp'],
  },
}

export default function StatsPage() {
  return <StatsPageClient />
}