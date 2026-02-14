import { SimpleButton } from './SimpleButton'

interface FeatureHighlightsProps {
  theme?: 'dark' | 'light'
}

export const FeatureHighlights = ({ theme = 'dark' }: FeatureHighlightsProps) => {
  const features = [
    {
      icon: '\u{1F193}',
      title: 'Completely Free',
      description: 'No ads, no subscriptions, and no paywalls.',
      highlight: true,
    },
    {
      icon: '\u{1F512}',
      title: 'Privacy Protected',
      description: 'Your data stays on your own device.',
      highlight: true,
    },
    {
      icon: '\u{1F4F1}',
      title: 'Works Everywhere',
      description: 'Comfortable on mobile, tablet, and desktop.',
      highlight: false,
    },
    {
      icon: '\u{1F9ED}',
      title: 'No Distractions',
      description: 'A focused experience for real mindfulness sessions.',
      highlight: false,
    },
    {
      icon: '\u{23F1}',
      title: 'Customizable Timer',
      description: 'Set durations from quick breaks to long sessions.',
      highlight: false,
    },
    {
      icon: '\u{1F319}',
      title: 'Dark Mode',
      description: 'Gentler visuals for evening practice.',
      highlight: false,
    },
    {
      icon: '\u{1F4CA}',
      title: 'Progress Tracking',
      description: 'Track consistency and improvements over time.',
      highlight: false,
    },
    {
      icon: '\u{1F9ED}',
      title: 'Personal Insights',
      description: 'See practical patterns in your habit data.',
      highlight: true,
    },
    {
      icon: '\u{1F3AF}',
      title: 'Goal Management',
      description: 'Set targets and stay accountable each week.',
      highlight: true,
    },
  ]

  const faqs = [
    {
      question: 'Is this really free?',
      answer:
        'Yes. Core meditation and breathing features are fully available without subscriptions.',
    },
    {
      question: 'How is this different from subscription apps?',
      answer:
        'Zen Moment focuses on calm, essential functionality without content paywalls or growth loops.',
    },
    {
      question: 'Where is my data stored?',
      answer:
        'Your session data is stored locally in your browser. No account required.',
    },
    {
      question: 'Can I use it offline?',
      answer:
        'Yes. After loading, key timer and breathing functionality works offline.',
    },
    {
      question: 'Do you support keyboard shortcuts?',
      answer:
        'Yes. Space, Esc, and Enter are supported for quick control.',
    },
    {
      question: 'Can beginners use this?',
      answer:
        'Absolutely. It is designed to be simple enough for first-time users and reliable for regular practitioners.',
    },
  ]

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Why Choose Zen Moment?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  feature.highlight
                    ? theme === 'dark'
                      ? 'neumorphic-dark border border-[#6B8F7A]/35'
                      : 'neumorphic border border-[#9BBFA7]/45'
                    : theme === 'dark'
                      ? 'neumorphic-dark'
                      : 'neumorphic'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#6B8F7A]/20 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Frequently Asked Questions</h2>
            <p className="text-lg">Everything you need to know to get started.</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`rounded-2xl border p-8 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'neumorphic-dark-inset border-[#4A5E54]/40'
                      : 'neumorphic-inset border-[#C9D9CC]/55'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        theme === 'dark'
                          ? 'neumorphic-dark-flat text-[#A8C8B0] border border-[#6B8F7A]/35'
                          : 'neumorphic-flat text-[#4D6A5A] border border-[#9BBFA7]/45'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-12 text-center p-8 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto ${
                theme === 'dark'
                  ? 'neumorphic-dark border border-[#6B8F7A]/35'
                  : 'neumorphic border border-[#9BBFA7]/45'
              }`}
            >
              <p className="mb-6 text-lg font-light">Still have questions? We are here to help.</p>

              <SimpleButton variant="primary" size="lg" theme={theme} href="/contact" className="text-lg font-semibold">
                <span className="flex items-center space-x-3">
                  <span className="text-xl">{'\u{1F4AC}'}</span>
                  <span>Contact Support</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </SimpleButton>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div
            className={`rounded-2xl p-8 md:p-12 ${
              theme === 'dark'
                ? 'neumorphic-dark border border-[#6B8F7A]/35'
                : 'neumorphic border border-[#9BBFA7]/45'
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4">Start Your Meditation Practice Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join people who use Zen Moment for a calmer and more focused daily routine.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <SimpleButton variant="primary" size="lg" theme={theme} href="/" className="min-w-[180px] text-lg font-semibold">
                <span className="flex items-center justify-center space-x-3">
                  <span className="text-xl">{'\u{23F1}'}</span>
                  <span>Start Meditation Timer</span>
                </span>
              </SimpleButton>

              <SimpleButton variant="secondary" size="lg" theme={theme} href="/breathing-exercise" className="min-w-[180px] text-lg font-semibold">
                <span className="flex items-center justify-center space-x-3">
                  <span className="text-xl">{'\u{1F4A8}'}</span>
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

