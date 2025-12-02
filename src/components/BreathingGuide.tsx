import Link from 'next/link'
import { SimpleButton } from './SimpleButton'

interface BreathingGuideProps {
  theme?: 'dark' | 'light'
}

export const BreathingGuide = ({ theme = 'dark' }: BreathingGuideProps) => {
  return (
    <section className={`py-32 transition-colors duration-300 relative min-h-screen ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-neumorphic-tips-dark'
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-neumorphic-tips-light'
    }`}>
      {/* Visual Divider */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50'
          : 'bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50'
      }`}></div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Section Indicator */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
            theme === 'dark'
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
              : 'bg-blue-100 text-blue-600 border border-blue-200'
          }`}>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Discover More Features</span>
          </div>
        </div>

        <div className="max-w-4xl w-full text-center">
        {/* 引导标题 */}
        <h2 className={`text-3xl md:text-4xl font-light mb-10 ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Ready to Explore Breathing Exercises?
        </h2>

        <p className={`text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          While the timer helps you meditate, our guided breathing exercises can help you relax, focus, or energize instantly.
          Choose from 4-7-8 breathing, box breathing, and more techniques.
        </p>

        {/* 呼吸练习特点展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <div className={`p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
          }`}>
            <div className="text-4xl mb-6">😌</div>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Stress Relief
            </h3>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              4-7-8 breathing technique to calm your nervous system
            </p>
          </div>

          <div className={`p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
          }`}>
            <div className="text-4xl mb-6">🎯</div>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Enhanced Focus
            </h3>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Box breathing to improve concentration and clarity
            </p>
          </div>

          <div className={`p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
          }`}>
            <div className="text-4xl mb-6">⚡</div>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Natural Energy
            </h3>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
            }`}>
              Activating breathing for instant energy boost
            </p>
          </div>
        </div>

        {/* 主要CTA按钮 */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
          <SimpleButton
            variant="primary"
            size="lg"
            theme={theme}
            href="/breathing"
            className="min-w-[200px] text-lg font-medium"
          >
            <span className="flex items-center justify-center space-x-3">
              <span className="text-xl">💨</span>
              <span>Try Breathing Exercises</span>
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

          <SimpleButton
            variant="secondary"
            size="lg"
            theme={theme}
            href="/"
            className="min-w-[200px] text-lg font-medium"
          >
            <span className="flex items-center justify-center space-x-3">
              <span className="text-xl">⧗</span>
              <span>Back to Timer</span>
            </span>
          </SimpleButton>
        </div>

        {/* 简短说明 */}
        <div className={`mt-12 text-base ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          <p>✓ Free & Private ✓ No Account Required ✓ Scientifically Proven Techniques</p>
        </div>
      </div>
      </div>
    </section>
  )
}