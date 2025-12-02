import Head from 'next/head'

interface PageSEOProps {
  title?: string
  description?: string
  canonical: string // 现在canonical是必需的
  ogImage?: string
  ogType?: string
  noIndex?: boolean
}

export const PageSEO = ({
  title,
  description,
  canonical,
  ogImage = '/og-image.webp',
  ogType = 'website',
  noIndex = false
}: PageSEOProps) => {
  // 确保canonical URL格式正确
  const canonicalUrl = canonical.startsWith('http') ? canonical : `https://zenmoment.net${canonical}`

  const pageTitle = title ? `${title} | Zen Moment` : "Zen Moment - Meditation Timer & Breathing Exercises"
  const pageDescription = description || "Free online meditation timer and breathing exercises. Practice mindfulness with customizable sessions, breathing techniques, and progress tracking. No tracking, no ads."

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Zen Moment" />
      <meta property="og:image" content={`https://zenmoment.net${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`https://zenmoment.net${ogImage}`} />

      {/* Additional meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="author" content="Zen Moment" />
      <meta name="keywords" content="meditation timer, breathing exercises, mindfulness, stress relief, free meditation app, meditation practice" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}