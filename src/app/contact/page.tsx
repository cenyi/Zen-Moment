import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Zen Moment - Get in Touch',
  description: 'Contact Zen Moment for feedback, questions, or support. Email us directly at support@zenmoment.net. We respond within 24-48 hours and value your feedback.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Zen Moment - Get in Touch',
    description: 'Contact Zen Moment for feedback, questions, or support. Email us directly at support@zenmoment.net.',
    url: 'https://zenmoment.net/contact',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-contact.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Zen Moment - Get in Touch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Zen Moment - Get in Touch',
    description: 'Contact Zen Moment for feedback, questions, or support. Email us directly at support@zenmoment.net.',
    images: ['/og-image-contact.webp'],
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}