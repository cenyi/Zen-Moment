'use client'

import { useTimerStore } from '../../store/timerStore'

export function AboutContent() {
  const { theme } = useTimerStore()

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20">
      <div>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-3xl">Z</span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-light mb-6 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            About Zen Moment - Your Digital Sanctuary for Mindfulness
          </h1>
          <p className={`text-xl leading-relaxed max-w-2xl mx-auto ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Your digital sanctuary for meditation and mindfulness.
            Find inner peace with tools designed for the modern world.
          </p>
        </div>

        {/* The Challenge */}
        <div className={`rounded-2xl p-8 md:p-12 mb-16 ${
          theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
        }`}>
          <h2 className={`text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Finding Peace in a Distracted World
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className={`${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              In today&apos;s hyperconnected world, finding moments of genuine peace has become increasingly difficult.
              Constant notifications, endless scrolling, and digital noise have made it harder than ever to
              disconnect and find clarity.
            </p>
            <p className={`${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
              The irony is that the very devices that distract us can also become our most powerful allies
              in finding mindfulness—when used with intention and purpose.
            </p>
          </div>
        </div>

        {/* Our Mission & Values */}
        <div className={`rounded-2xl p-8 md:p-12 mb-16 ${
          theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
        }`}>
          <h2 className={`text-3xl font-semibold mb-8 text-center ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Our Mission & Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                Simple by Design
              </h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                We believe meditation shouldn&apos;t require complicated apps or expensive subscriptions.
                Zen Moment offers essential tools that work immediately—no learning curve, no distractions,
                just you and your practice.
              </p>
            </div>

            <div className={`p-8 rounded-xl ${
              theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                Privacy First
              </h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                Your meditation practice is deeply personal. That&apos;s why Zen Moment works entirely
                on your device—no accounts, no tracking, no data collection. Just pure, uninterrupted
                mindfulness whenever you need it.
              </p>
            </div>
          </div>
        </div>

        {/* What Zen Moment Offers */}
        <div className={`rounded-2xl p-8 md:p-12 mb-16 ${
          theme === 'dark' ? 'bg-neumorphic-dark shadow-neumorphic-dark' : 'bg-neumorphic-light shadow-neumorphic'
        }`}>
          <h2 className={`text-3xl font-semibold mb-8 text-center ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            What Zen Moment Offers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Meditation Timer */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/20 border border-gray-700/40' : 'bg-gray-50/20 border border-gray-200/40'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Meditation Timer
                </h3>
              </div>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                A clean, distraction-free timer with customizable sessions and progress tracking to help you build a consistent meditation practice.
              </p>
            </div>

            {/* Breathing Exercises */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/20 border border-gray-700/40' : 'bg-gray-50/20 border border-gray-200/40'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Breathing Exercises
                </h3>
              </div>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Multiple scientifically-backed breathing techniques with visual guides to reduce anxiety and improve focus.
              </p>
            </div>

            {/* Ambient Sounds */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/20 border border-gray-700/40' : 'bg-gray-50/20 border border-gray-200/40'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Ambient Sounds
                </h3>
              </div>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Natural background sounds like rain, ocean, and forest to create the perfect atmosphere for your practice.
              </p>
            </div>

            {/* Privacy & Offline */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/20 border border-gray-700/40' : 'bg-gray-50/20 border border-gray-200/40'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  Private & Offline
                </h3>
              </div>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Complete privacy with local data storage and offline functionality—your practice stays yours alone.
              </p>
            </div>
          </div>

          <div className={`mt-8 p-4 rounded-lg text-center ${
            theme === 'dark' ? 'bg-gray-800/30 border border-gray-700/30' : 'bg-gray-50/30 border border-gray-200/30'
          }`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              All tools work completely offline once loaded - perfect for meditation retreats and travel
            </p>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className={`p-8 rounded-xl mb-12 ${
          theme === 'dark' ? 'neumorphic-dark' : 'neumorphic'
        }`}>
          <h3 className={`text-2xl font-semibold mb-8 text-center ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Meet Our Team
          </h3>

          <div className="max-w-3xl mx-auto">
            {/* Zen Moment Team */}
            <div className={`p-8 rounded-xl text-center ${
              theme === 'dark' ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-gray-50/50 border border-gray-200/50'
            }`}>
              {/* Team Logo */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                theme === 'dark' ? 'bg-blue-900 text-blue-300 border-2 border-blue-800/50' : 'bg-blue-100 text-blue-700 border-2 border-blue-200'
              }`}>
                <span className="text-2xl font-bold">Z</span>
              </div>

              {/* Team Info */}
              <h4 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                Zen Moment Team
              </h4>
              <p className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                Meditation & Mindfulness Practitioners
              </p>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                We are a passionate team dedicated to making meditation accessible to everyone. With years of collective experience in meditation practice,
                we combine ancient wisdom with modern technology to create tools that help people find inner peace in their daily lives.
                Our approach focuses on simplicity, mindfulness, and the practical application of meditation techniques for stress reduction and mental clarity.
              </p>

              {/* Team Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/40 border border-gray-700/40' : 'bg-white/40 border border-gray-200/40'
                }`}>
                  <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    Accessibility
                  </h5>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Making meditation simple for everyone
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/40 border border-gray-700/40' : 'bg-white/40 border border-gray-200/40'
                }`}>
                  <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    Privacy
                  </h5>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Your practice stays personal and secure
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/40 border border-gray-700/40' : 'bg-white/40 border border-gray-200/40'
                }`}>
                  <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    Simplicity
                  </h5>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Focused tools for effective practice
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Philosophy */}
          <div className={`mt-8 p-6 rounded-lg text-center ${
            theme === 'dark' ? 'bg-gray-800/20 border border-gray-700/30' : 'bg-gray-50/20 border border-gray-200/30'
          }`}>
            <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              "We believe that meditation shouldn't be complicated or intimidating. Our mission is to create simple,
              intuitive tools that help you find your moment of zen, whenever and wherever you need it."
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-xl text-center ${
          theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
        }`}>
          <h3 className={`text-2xl font-light mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Start Your Journey Today
          </h3>
          <p className={`mb-6 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            Take the first step towards a more mindful and peaceful life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-blue-400 hover:text-blue-300'
                  : 'neumorphic text-blue-600 hover:text-blue-500'
              }`}
            >
              Try Meditation Timer
            </a>
            <a
              href="/breathing-exercise"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'neumorphic-dark text-green-400 hover:text-green-300'
                  : 'neumorphic text-green-600 hover:text-green-500'
              }`}
            >
              Try Breathing Exercise
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}