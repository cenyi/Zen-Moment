import { Metadata } from 'next'
import BreathingPageClient from './BreathingPageClient'

// HowTo 结构化数据
const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Practice Breathing Exercises for Anxiety and Stress Relief",
  "description": "Learn step-by-step breathing exercises including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction.",
  "image": "https://zenmoment.net/og-image-breathing.webp",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Comfortable seating position"
    }
  ],
  "tool": [],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Choose Your Breathing Exercise",
      "text": "Select from 4-7-8 breathing, box breathing, or deep breathing techniques based on your needs - anxiety relief, better sleep, or stress reduction.",
      "image": "https://zenmoment.net/og-image-breathing.webp"
    },
    {
      "@type": "HowToStep",
      "name": "Get Comfortable",
      "text": "Sit or lie down in a comfortable position. Keep your back straight but relaxed. Place your hands on your lap or knees.",
      "image": "https://zenmoment.net/og-image-breathing.webp"
    },
    {
      "@type": "HowToStep",
      "name": "Start the Breathing Timer",
      "text": "Use the Zen Moment breathing exercise timer to guide your practice. Select your preferred breathing pattern and duration.",
      "image": "https://zenmoment.net/og-image-breathing.webp"
    },
    {
      "@type": "HowToStep",
      "name": "Follow the Breathing Pattern",
      "text": "For 4-7-8 breathing: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. For box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s.",
      "image": "https://zenmoment.net/og-image-breathing.webp"
    },
    {
      "@type": "HowToStep",
      "name": "Practice Regularly",
      "text": "Practice breathing exercises for 5-10 minutes daily. Use before sleep, during work breaks, or anytime you feel stressed or anxious.",
      "image": "https://zenmoment.net/og-image-breathing.webp"
    }
  ]
}

export const metadata: Metadata = {
  title: 'Free Breathing Exercises: 4-7-8 & Box Breathing | Zen Moment',
  description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
  alternates: {
    canonical: '/breathing-exercise',
  },
  openGraph: {
    title: 'Free Breathing Exercises: 4-7-8 & Box Breathing | Zen Moment',
    description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
    url: 'https://zenmoment.net/breathing-exercise',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-breathing.webp',
        width: 1200,
        height: 630,
        alt: 'Free Breathing Exercises: 4-7-8 & Box Breathing | Zen Moment',
      },
    ],
  },
  keywords: 'breathing exercises, free breathing exercises, breathing exercises online, deep breathing exercises, 4-7-8 breathing exercises, box breathing exercises, breathing techniques, breathing exercises for anxiety, breathing exercises for sleep, breathing exercises before sleep, stress relief breathing, anxiety relief breathing, sleep breathing exercises, mindfulness breathing, guided breathing exercises, free breathing app, relaxation breathing techniques, workplace breathing exercises, quick breathing exercises, breathing exercises for stress, best breathing exercises, breathing exercises for focus, breathwork practices, pranayama techniques, calm breathing methods',
  twitter: {
    card: 'summary_large_image',
    title: 'Free Breathing Exercises: 4-7-8 & Box Breathing | Zen Moment',
    description: 'Zen Moment: Free breathing exercises online including 4-7-8 breathing, box breathing, and deep breathing techniques for anxiety relief, better sleep, and stress reduction. Practice breathing exercises before sleep, during work, or anytime. Best free breathing exercises app.',
    images: ['/og-image-breathing.webp'],
  },
}

export default function BreathingExercisePage() {
  return (
    <>
      {/* HowTo 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToStructuredData)
        }}
      />
      <BreathingPageClient />
    </>
  )
}