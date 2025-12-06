import { Metadata } from 'next'
import BreathingPageClient from './BreathingPageClient'

export const metadata: Metadata = {
  title: 'Free Breathing Exercises Online: 4-7-8, Box Breathing & Techniques | Zen Moment',
  description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
  alternates: {
    canonical: '/breathing-exercise',
  },
  openGraph: {
    title: 'Free Breathing Exercises Online: 4-7-8, Box Breathing & Techniques | Zen Moment',
    description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
    url: 'https://zenmoment.net/breathing-exercise',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-breathing.webp',
        width: 1200,
        height: 630,
        alt: 'Free Breathing Exercises Online: 4-7-8, Box Breathing & Techniques | Zen Moment',
      },
    ],
  },
  keywords: 'breathing exercises, free breathing exercises, breathing exercises online, deep breathing exercises, 4-7-8 breathing exercises, box breathing exercises, breathing techniques, breathing exercises for anxiety, breathing exercises for sleep, breathing exercises before sleep, stress relief breathing, anxiety relief breathing, sleep breathing exercises, mindfulness breathing, guided breathing exercises, free breathing app, relaxation breathing techniques, workplace breathing exercises, quick breathing exercises, breathing exercises for stress, best breathing exercises, breathing exercises for focus, breathwork practices, pranayama techniques, calm breathing methods',
  twitter: {
    card: 'summary_large_image',
    title: 'Free Breathing Exercises Online: 4-7-8, Box Breathing & Techniques | Zen Moment',
    description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
    images: ['/og-image-breathing.webp'],
  },
}

export default function BreathingExercisePage() {
  return <BreathingPageClient />
}