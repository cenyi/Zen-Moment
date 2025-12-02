import { Metadata } from 'next'
import TermsOfServicePageClient from './TermsOfServicePageClient'

export const metadata: Metadata = {
  title: 'Terms of Service - Zen Moment | Usage Guidelines',
  description: 'Zen Moment Terms of Service - Guidelines for using our meditation and breathing exercise app. Privacy-first, no tracking, local data storage only.',
  alternates: {
    canonical: '/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service - Zen Moment | Usage Guidelines',
    description: 'Zen Moment Terms of Service - Guidelines for using our meditation and breathing exercise app.',
    url: 'https://zenmoment.net/terms-of-service',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-terms.webp',
        width: 1200,
        height: 630,
        alt: 'Terms of Service - Zen Moment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Zen Moment | Usage Guidelines',
    description: 'Zen Moment Terms of Service - Guidelines for using our meditation and breathing exercise app.',
    images: ['/og-image-terms.webp'],
  },
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />
}