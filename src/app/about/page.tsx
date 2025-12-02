import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Zen Moment - Your Meditation Sanctuary',
  description: 'Learn about Zen Moment\'s mission to provide accessible meditation and mindfulness tools. Privacy-first, no tracking, no accounts - just you and your mindfulness journey.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Zen Moment - Your Meditation Sanctuary',
    description: 'Learn about Zen Moment\'s mission to provide accessible meditation and mindfulness tools. Privacy-first, no tracking, no accounts.',
    url: 'https://zenmoment.net/about',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-about.webp',
        width: 1200,
        height: 630,
        alt: 'About Zen Moment - Your Meditation Sanctuary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zen Moment - Your Meditation Sanctuary',
    description: 'Learn about Zen Moment\'s mission to provide accessible meditation and mindfulness tools.',
    images: ['/og-image-about.webp'],
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}