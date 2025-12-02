import Link from 'next/link'
import { SimpleButton } from './SimpleButton'
import { useState } from 'react'

interface FeatureHighlightsProps {
  theme?: 'dark' | 'light'
}

export const FeatureHighlights = ({ theme = 'dark' }: FeatureHighlightsProps) => {
  const features = [
    {
      icon: '🆓',
      title: 'Completely Free',
      description: 'No ads, no subscriptions, no premium features. Everything is free forever.',
      highlight: true
    },
    {
      icon: '🔒',
      title: 'Privacy Protected',
      description: 'Your data stays on your device. No tracking, no accounts, no data collection ever.',
      highlight: true
    },
    {
      icon: '🌐',
      title: 'Works Everywhere',
      description: 'Responsive meditation timer that works perfectly on mobile, tablet, and desktop',
      highlight: false
    },
    {
      icon: '✦',
      title: 'No Distractions',
      description: 'Pure meditation timer experience without ads, notifications, or unnecessary features',
      highlight: false
    },
    {
      icon: '⏱️',
      title: 'Customizable Timer',
      description: 'Set any duration from seconds to hours with quick preset buttons and custom input',
      highlight: false
    },
    {
      icon: '🌗',
      title: 'Dark Mode',
      description: 'Gentle on the eyes for night-time meditation sessions',
      highlight: false
    },
    {
      icon: '▴',
      title: 'Progress Tracking',
      description: 'Track your meditation progress with private, local statistics',
      highlight: false
    },
    {
      icon: '📊',
      title: 'Deep Statistics Tracking',
      description: 'Detailed meditation progress and habit pattern tracking with comprehensive analytics',
      highlight: true
    },
    {
      icon: '📈',
      title: 'Personalized Insights',
      description: 'Intelligent analysis of your practice habits with personalized recommendations',
      highlight: true
    },
    {
      icon: '🎯',
      title: 'Goal Management System',
      description: 'Set and track daily/weekly meditation goals with achievement badges',
      highlight: true
    }
  ]

  const faqs = [
    {
      question: 'Is this really free? What\'s the catch?',
      answer: 'No catch! Zen Moment is completely free with no ads, subscriptions, or hidden costs. No account required, all meditation timer features accessible. We believe everyone should have access to quality meditation tools and mindfulness resources regardless of their budget.'
    },
    {
      question: 'How is this different from apps like Headspace or Calm?',
      answer: 'Unlike subscription-based meditation apps, Zen Moment focuses on core meditation timer functionality without premium content gates. We offer pure, distraction-free mindfulness practice with no ads, no tracking, and no gamification. This makes Zen Moment the ideal choice for those seeking a simple, effective meditation timer and breathing exercises platform.'
    },
    {
      question: 'How is my data protected and where is it stored?',
      answer: 'Absolutely! At Zen Moment, privacy is our priority. Nothing leaves your device. All meditation statistics, breathing exercises data, and settings are stored locally in your browser. We don\'t track sessions, collect personal data, or use analytics - complete privacy guaranteed. Your meditation practice data remains 100% private on your device.'
    },
    {
      question: 'How does the meditation timer work?',
      answer: 'Zen Moment\'s free meditation timer is designed for effective mindfulness practice with fully customizable meditation sessions. Choose from quick preset buttons (1, 3, 5, 10, 15 minutes) or set custom durations for your meditation practice. Simply select your desired meditation duration, start the timer, and focus on your mindfulness practice. The meditation timer includes gentle completion alerts and tracks your daily meditation practice to help you build consistency.'
    },
    {
      question: 'Can I use this offline?',
      answer: 'Yes! Once loaded, Zen Moment\'s meditation timer and breathing exercises work completely offline. Perfect for flights, meditation retreats, or anywhere you want to practice mindfulness and disconnect digitally while reconnecting mentally. Our offline meditation timer ensures your mindfulness practice continues anywhere.'
    },
    {
      question: 'Can I view and export my meditation statistics?',
      answer: 'Yes! Access Zen Moment\'s comprehensive meditation statistics dashboard through the main menu to view daily, weekly, monthly, and yearly meditation progress with interactive charts. Track meditation streaks, see average session times, monitor goal achievement rates, and discover patterns in your mindfulness practice. You can also export all your meditation data including session history, progress charts, and achievement records in CSV and PDF formats for personal records or sharing with meditation teachers.'
    },
    {
      question: 'Which browsers are supported?',
      answer: 'Zen Moment works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best meditation timer and breathing exercises experience. Our meditation platform also works seamlessly on mobile browsers, making it the perfect cross-device meditation solution.'
    },
    {
      question: 'Does Zen Moment have a mobile app and how do I add it to my home screen?',
      answer: 'Currently, Zen Moment is a web-based meditation application that works beautifully in mobile browsers. You can add our meditation platform to your home screen like a native meditation app for easy access to meditation timer and breathing exercises. In Chrome/Safari: visit our meditation website, tap the share icon, then select "Add to Home Screen." This creates a convenient meditation app icon for quick access to your daily meditation practice. We\'re considering dedicated mobile meditation apps based on user demand, but our web meditation version offers all features with no downloads needed.'
    },
    {
      question: 'What are the keyboard shortcuts?',
      answer: 'Zen Moment\'s meditation timer includes helpful keyboard shortcuts: Space to start/pause meditation, Escape to reset meditation timer, Enter to begin meditation timing. These meditation shortcuts help you maintain focus during meditation sessions without reaching for your mouse, ensuring uninterrupted mindfulness practice.'
    },
    {
      question: 'Is this suitable for both beginners and advanced meditators?',
      answer: 'Yes! Zen Moment serves all meditation levels. Beginners love the simplicity of our meditation timer and find it easy to start with 5-10 minute sessions - consistency matters more than duration for mindfulness meditation. As you become more comfortable, you can gradually increase your meditation time. Advanced meditation practitioners appreciate the precision timing, lack of distractions, and ability to set long meditation sessions (up to 999 minutes) for deep meditation practices and mindfulness exercises.'
    },
    {
      question: 'How do I reset my meditation data?',
      answer: 'You can reset your meditation progress through Zen Moment\'s settings menu. Click on your profile/statistics area and select "Reset Statistics." This will clear your local meditation history while keeping your meditation timer preferences intact, allowing you to start fresh with your mindfulness practice tracking.'
    },
    {
      question: 'How can I get support if I still have questions?',
      answer: 'We\'re here to help with your Zen Moment meditation practice! You can reach out to our meditation support team through the contact page on our meditation website. We typically respond within 24 hours and are happy to help with any questions about using our meditation timer, breathing exercises, or mindfulness features.'
    }
  ]

  
  return (
    <section className={`py-16 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-neumorphic-dark text-neumorphic-tips-dark' : 'bg-neumorphic-light text-neumorphic-tips-light'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-light text-center mb-12 ${
            theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
          }`}>
            Why Choose Zen Moment?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  feature.highlight
                    ? theme === 'dark'
                      ? 'neumorphic-dark border border-blue-500/30'
                      : 'neumorphic border border-blue-400/40'
                    : theme === 'dark'
                      ? 'neumorphic-dark'
                      : 'neumorphic'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t pt-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-light mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Everything you need to know about meditation and Zen Moment
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-8 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'neumorphic-dark-inset border-gray-600/30'
                      : 'neumorphic-inset border-gray-400/40'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* 序号标识 */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      theme === 'dark'
                        ? 'neumorphic-dark-flat text-blue-400 border border-blue-500/30'
                        : 'neumorphic-flat text-blue-600 border border-blue-400/40'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-3 ${
                        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                      }`}>
                        {faq.question}
                      </h3>
                      <p className={`leading-relaxed ${
                        theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-12 text-center p-8 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto ${
              theme === 'dark'
                ? 'neumorphic-dark border border-blue-500/30'
                : 'neumorphic border border-blue-400/40'
            }`}>
              <p className={`mb-6 text-lg font-light ${
                theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
              }`}>
                Still have questions? We&apos;re here to help.
              </p>

              <SimpleButton
                variant="primary"
                size="lg"
                theme={theme}
                href="/contact"
                className="text-lg font-medium"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">💬</span>
                  <span>Contact Support</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </SimpleButton>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className={`rounded-2xl p-8 md:p-12 ${
            theme === 'dark'
              ? 'neumorphic-dark border border-blue-500/30'
              : 'neumorphic border border-blue-400/40'
          }`}>
            <h2 className={`text-2xl md:text-3xl font-light mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Start Your Meditation Practice Today
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Join thousands who have found peace and clarity with our simple, distraction-free meditation timer.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <SimpleButton
                variant="primary"
                size="lg"
                theme={theme}
                href="/"
                className="min-w-[180px] text-lg font-medium"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span className="text-xl">⧗</span>
                  <span>Start Meditation Timer</span>
                </span>
              </SimpleButton>

              <SimpleButton
                variant="secondary"
                size="lg"
                theme={theme}
                href="/breathing"
                className="min-w-[180px] text-lg font-medium"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span className="text-xl">💨</span>
                  <span>Try Breathing Exercises</span>
                </span>
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}