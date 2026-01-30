'use client'

import { useTimerStore } from '../../store/timerStore'
import { ContactForm } from '../../components/ContactForm'

export function ContactContent() {
  const { theme } = useTimerStore()

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20">
      <div>
        <h1 className={`text-4xl md:text-5xl font-light mb-8 text-center ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          Contact Us
        </h1>

        <div className={`rounded-2xl p-8 md:p-12 mb-12 text-center ${
          theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
        }`}>
          <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            We&apos;d love to hear from you! Whether you have feedback, questions, or just want to share your meditation journey, reach out to us using the form below or email us directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className={`p-8 md:p-12 rounded-2xl mb-8 ${
            theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
          }`}>
            <h2 className={`text-2xl font-light mb-6 text-center ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Email Contact (Alternative) */}
          <div className={`p-8 md:p-12 rounded-2xl text-center mb-8 ${
            theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
          }`}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-500 text-white">
              <span className="text-4xl" aria-hidden="true">@</span>
            </div>
            <h2 className={`text-2xl font-light mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              Or Email Us Directly
            </h2>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              For general inquiries or technical support:
            </p>
            <a
              href="mailto:support@zenmoment.net"
              className={`inline-block px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 shadow-neumorphic hover:shadow-neumorphic-hover hover:-translate-y-1 active:shadow-neumorphic-inset active:translate-y-0 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-blue-400 hover:text-blue-300 border border-gray-600/20 hover:border-gray-500/30'
                  : 'neumorphic text-blue-600 hover:text-blue-500 border border-gray-400/25 hover:border-gray-500/35'
              }`}
              aria-label="Email us at support@zenmoment.net"
            >
              support@zenmoment.net
            </a>
          </div>

          {/* Response Information */}
          <div className={`p-6 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
          }`}>
            <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              What to Expect
            </h3>
            <ul className={`space-y-3 text-sm ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              <li className="flex items-start">
                <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                <span>We typically respond within 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                <span>Feature requests and feedback are highly valued</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                <span>Technical support for app functionality</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500" aria-hidden="true">✓</span>
                <span>Questions about meditation and mindfulness</span>
              </li>
            </ul>
          </div>

          <div className={`mt-6 p-6 rounded-lg ${
            theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
          }`}>
            <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              Other Ways to Connect
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500 text-white">
                  <span className="text-2xl" aria-hidden="true">🌐</span>
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                    Website
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                    ZenMoment.net
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 text-white">
                  <span className="text-2xl" aria-hidden="true">📱</span>
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                    Mobile App Coming Soon
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                    Zen Moment mobile apps are in development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}