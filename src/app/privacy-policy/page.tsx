import { Metadata } from 'next'
import PrivacyPolicyPageClient from './PrivacyPolicyPageClient'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zen Moment | Transparent Data Practices',
  description: 'Zen Moment Privacy Policy - We use anonymous Google Analytics to improve user experience. No personal information is collected. All meditation data is stored locally on your device.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy - Zen Moment | Transparent Data Practices',
    description: 'Zen Moment Privacy Policy - Anonymous analytics for website improvement. No personal data collection. All meditation data stays local.',
    url: 'https://zenmoment.net/privacy-policy',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-privacy.webp',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Zen Moment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Zen Moment | Transparent Data Practices',
    description: 'Zen Moment Privacy Policy - Anonymous analytics only. No personal data collection. All meditation data stays local.',
    images: ['/og-image-privacy.webp'],
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}