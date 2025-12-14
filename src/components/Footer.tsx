'use client'

import Link from 'next/link'
import { useTimerStore } from '../store/timerStore'
import { ThemeLogo } from './ThemeLogo'

interface Partner {
  name: string
  logo: string
  url: string
  isCustomLogo?: boolean
  logoType?: 'twelve' | 'startup-fame' | 'good-ai-tools' | 'aura-plus-plus' | 'toolfame' | 'power-up-tools' | 'saashub' | 'fazier' | 'findly-tools'
}

export const Footer = () => {
  const { theme } = useTimerStore()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`w-full border-t ${
      theme === 'dark'
        ? 'neumorphic-dark text-neumorphic-tips-dark'
        : 'neumorphic text-neumorphic-tips-light'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ThemeLogo
                theme={theme}
                className="rounded-lg"
                alt="Zen Moment - Meditation and Mindfulness App"
                size="medium"
              />
              <span className="font-bold text-xl">Zen Moment</span>
            </div>
            <p className={`text-sm mb-4 max-w-md ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              Your sanctuary for meditation and mindfulness. Find peace, focus, and tranquility in your daily life.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className={`transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className={`transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  Meditation Timer
                </Link>
              </li>
              <li>
                <Link
                  href="/breathing-exercise"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  4-7-8 Breathing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-sm transition-colors duration-200 hover:text-blue-500 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${
          theme === 'dark' ? 'border-neumorphic-tips-dark/20' : 'border-neumorphic-tips-light/20'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              © {currentYear} Zen Moment. All rights reserved.
            </p>
            <p className={`text-sm mt-2 md:mt-0 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              Made with ♥ for Zen Moment
            </p>
          </div>
        </div>

        {/* Partners Section */}
        <div className={`mt-12 pt-8 border-t ${
          theme === 'dark' ? 'border-neumorphic-tips-dark/20' : 'border-neumorphic-tips-light/20'
        }`}>
          <div className="text-center mb-8">
            <h3 className={`text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Our Partners
            </h3>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
            }`}>
              Trusted by leading brands and meditation communities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-7xl mx-auto">
            {[
              { name: 'Twelve Tools', logo: '⭐', url: 'https://twelve.tools', isCustomLogo: true, logoType: 'twelve' },
              { name: 'Startup Fame', logo: '🚀', url: 'https://startupfa.me/s/zen-moment?utm_source=zenmoment.net', isCustomLogo: true, logoType: 'startup-fame' },
              { name: 'Good AI Tools', logo: '🤖', url: 'https://goodaitools.com', isCustomLogo: true, logoType: 'good-ai-tools' },
              { name: 'Aura++', logo: '✨', url: 'https://auraplusplus.com/projects/zen-moment-meditation-timer', isCustomLogo: true, logoType: 'aura-plus-plus' },
              { name: 'ToolFame', logo: '🏆', url: 'https://toolfame.com/item/zen-moment', isCustomLogo: true, logoType: 'toolfame' },
              { name: 'Power Up Tools', logo: '⚡', url: 'https://poweruptools.com', isCustomLogo: true, logoType: 'power-up-tools' },
              { name: 'SaaSHub', logo: '📊', url: 'https://www.saashub.com/zen-moment?utm_source=badge&utm_campaign=badge&utm_content=zen-moment&badge_variant=color&badge_kind=approved', isCustomLogo: true, logoType: 'saashub' },
              { name: 'Fazier', logo: '🌟', url: 'https://fazier.com/launches/zenmoment.net', isCustomLogo: true, logoType: 'fazier' },
              { name: 'findly.tools', logo: '🔍', url: 'https://findly.tools/kirkify-ai?utm_source=kirkify-ai', isCustomLogo: true, logoType: 'findly-tools' }
            ].map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'neumorphic-dark-inset border border-gray-600/20 hover:border-blue-500/30'
                    : 'neumorphic-inset border border-gray-400/40 hover:border-blue-400/40'
                }`}
                aria-label={`Visit ${partner.name}`}
              >
                {partner.isCustomLogo ? (
                  <img
                    src={
                      partner.logoType === 'startup-fame'
                        ? "https://startupfa.me/badges/featured-badge.webp"
                        : partner.logoType === 'good-ai-tools'
                          ? "https://goodaitools.com/assets/images/badge.png"
                          : partner.logoType === 'aura-plus-plus'
                            ? "https://auraplusplus.com/images/badges/featured-on-light.svg"
                            : partner.logoType === 'toolfame'
                              ? "https://toolfame.com/badge-light.svg"
                              : partner.logoType === 'power-up-tools'
                                ? "https://poweruptools.com/assets/images/badge.png"
                                : partner.logoType === 'saashub'
                                  ? "https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
                                  : partner.logoType === 'fazier'
                                    ? "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light"
                                    : partner.logoType === 'findly-tools'
                                      ? "https://findly.tools/badges/findly-tools-badge-light.svg"
                                      : theme === 'dark'
                                        ? "https://twelve.tools/badge2-dark.svg"
                                        : "https://twelve.tools/badge2-light.svg"
                    }
                    alt={`Featured on ${partner.name}`}
                    width={partner.logoType === 'startup-fame' ? "171" : partner.logoType === 'good-ai-tools' ? "171" : partner.logoType === 'aura-plus-plus' ? "171" : partner.logoType === 'toolfame' ? "171" : partner.logoType === 'power-up-tools' ? "171" : partner.logoType === 'saashub' ? "150" : partner.logoType === 'fazier' ? "250" : partner.logoType === 'findly-tools' ? "150" : "200"}
                    height="54"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <>
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {partner.logo}
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                    }`}>
                      {partner.name}
                    </span>
                  </>
                )}
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'
            }`}>
              Want to partner with us?{' '}
              <a
                href="/contact"
                className={`underline hover:no-underline transition-colors duration-200 ${
                  theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}