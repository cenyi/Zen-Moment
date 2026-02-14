import type { Metadata } from 'next'
import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ToastProvider } from '../components/Toast'
import './globals.css'

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-zen-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-zen-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-zen-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zenmoment.net'),
  title: {
    default: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
    template: '%s | Zen Moment',
  },
  description:
    'Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.',
  openGraph: {
    title: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
    description:
      'Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.',
    url: 'https://zenmoment.net',
    siteName: 'Zen Moment',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Moment - Free Online Meditation Timer & Breathing Exercises',
    description:
      'Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.webp', sizes: '16x16', type: 'image/webp' },
      { url: '/favicon-32x32.webp', sizes: '32x32', type: 'image/webp' },
    ],
    apple: [{ url: '/apple-touch-icon.webp', sizes: '180x180', type: 'image/webp' }],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#162019',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="yandex-verification" content="293791f023f18c5d" />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "umoppdewk0");
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  (function() {
                    var script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-G1SVH9NGQH';
                    document.head.appendChild(script);

                    script.onload = function() {
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-G1SVH9NGQH', {
                        send_page_view: false,
                        transport_type: 'beacon'
                      });
                      gtag('event', 'page_view', {
                        page_location: window.location.href,
                        page_title: document.title
                      });
                    };
                  })();
                }, 2000);
              });
            `,
          }}
        />
      </head>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ToastProvider>
            <div className="min-h-screen">{children}</div>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
