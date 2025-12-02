import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Zen Moment Blog - Meditation & Mindfulness Insights',
  description: 'Discover insights on meditation, mindfulness, and mental well-being. Science-backed articles to enhance your practice and find inner peace.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Zen Moment Blog - Meditation & Mindfulness Insights',
    description: 'Discover insights on meditation, mindfulness, and mental well-being. Science-backed articles to enhance your practice and find inner peace.',
    url: 'https://zenmoment.net/blog',
    siteName: 'Zen Moment',
    type: 'website',
    images: [
      {
        url: '/og-image-blog.webp',
        width: 1200,
        height: 630,
        alt: 'Zen Moment Blog - Meditation & Mindfulness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Moment Blog - Meditation & Mindfulness Insights',
    description: 'Discover insights on meditation, mindfulness, and mental well-being.',
    images: ['/og-image-blog.webp'],
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}