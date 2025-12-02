import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from '../components/ErrorBoundary'

export const metadata: Metadata = {
  metadataBase: new URL('https://zenmoment.net'),
  title: {
    default: "Zen Moment - Free Online Meditation Timer & Breathing Exercises",
    template: "%s | Zen Moment"
  },
  description: "Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.",
  openGraph: {
    title: "Zen Moment - Free Online Meditation Timer & Breathing Exercises",
    description: "Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.",
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
    title: "Zen Moment - Free Online Meditation Timer & Breathing Exercises",
    description: "Zen Moment: Free online meditation timer and breathing exercises app. Practice mindfulness with customizable meditation sessions, guided breathing techniques, progress tracking. Best free meditation timer. No tracking.",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: [
      { url: "/apple-touch-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    'theme-color': '#0f172a', // 深色主题背景色
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Yandex Verification */}
        <meta name="yandex-verification" content="293791f023f18c5d" />

        {/* Optimized Google Analytics - Delayed Loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Delay GA loading until after page load
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
                        // Optimize loading for better performance
                        send_page_view: false,
                        transport_type: 'beacon'
                      });
                      // Send page view after config
                      gtag('event', 'page_view', {
                        page_location: window.location.href,
                        page_title: document.title
                      });
                    };
                  })();
                }, 2000); // 2 second delay for mobile performance
              });
            `,
          }}
        />

        {/* 本地字体配置 - 提升性能和可靠性，避免外部依赖 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 优化的系统字体栈 - 提供出色的性能和广泛兼容性 */
            body {
              font-family:
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                "Helvetica Neue",
                Arial,
                "Noto Sans",
                sans-serif,
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji";
            }

            /* 等宽字体栈 - 用于代码和计时器显示 */
            .font-mono,
            code,
            pre {
              font-family:
                ui-monospace,
                SFMono-Regular,
                "SF Mono",
                Consolas,
                "Liberation Mono",
                Menlo,
                monospace;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <ErrorBoundary>
          <div className="min-h-screen">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}