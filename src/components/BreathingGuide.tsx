import { SimpleButton } from './SimpleButton'

interface BreathingGuideProps {
  theme?: 'dark' | 'light'
}

const guideCards = [
  {
    icon: '\u{1F60C}',
    title: 'Stress Relief',
    description: '4-7-8 breathing helps calm your nervous system and reduce anxiety quickly.',
  },
  {
    icon: '\u{1F3AF}',
    title: 'Enhanced Focus',
    description: 'Box breathing supports better concentration and steadier attention.',
  },
  {
    icon: '\u{26A1}',
    title: 'Natural Energy',
    description: 'Activating breathing patterns can lift alertness without stimulants.',
  },
]

export const BreathingGuide = ({ theme = 'dark' }: BreathingGuideProps) => {
  return (
    <section
      className={`py-32 transition-colors duration-300 relative min-h-screen ${
        theme === 'dark'
          ? 'theme-section-dark'
          : 'theme-section-light'
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-transparent via-[#6E9B7F] to-transparent opacity-60'
            : 'bg-gradient-to-r from-transparent via-[#8ABFA2] to-transparent opacity-70'
        }`}
      />

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              theme === 'dark'
                ? 'bg-[#6E9B7F]/15 text-[#B4CFBE] border border-[#6E9B7F]/35'
                : 'bg-[#DCE9DF] text-[#4D6A5A] border border-[#BFD8C8]'
            }`}
          >
            <span className="w-2 h-2 bg-[#6E9B7F] rounded-full animate-pulse" />
            <span>Discover More Features</span>
          </div>
        </div>

        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-10">Ready to Explore Breathing Exercises?</h2>

          <p className="text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            While the timer helps you meditate, guided breathing exercises can help you relax, focus, or recharge in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {guideCards.map((card) => (
              <div
                key={card.title}
                className={`p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
                }`}
              >
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                <p className="text-base leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <SimpleButton
              variant="primary"
              size="lg"
              theme={theme}
              href="/breathing-exercise"
              className="min-w-[200px] text-lg font-semibold"
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-xl">{'\u{1F4A8}'}</span>
                <span>Try Breathing Exercises</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </SimpleButton>

            <SimpleButton
              variant="secondary"
              size="lg"
              theme={theme}
              href="/"
              className="min-w-[200px] text-lg font-semibold"
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-xl">{'\u{23F1}'}</span>
                <span>Back to Timer</span>
              </span>
            </SimpleButton>
          </div>

          <div className="mt-12 text-base">
            <p>Free & Private | No Account Required | Science-informed Techniques</p>
          </div>
        </div>
      </div>
    </section>
  )
}


