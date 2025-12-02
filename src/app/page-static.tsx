import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zen Moment - Meditation Timer & Breathing Exercises',
  description: 'Free online meditation timer and breathing exercises. Practice mindfulness with customizable sessions, breathing technique, progress tracking. No tracking.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Zen Moment</h1>
          <p className="text-xl text-gray-600">Meditation Timer & Breathing Exercises</p>
        </header>

        <main className="max-w-4xl mx-auto">
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Meditation Practice</h2>
            <p className="text-gray-600 mb-6">
              Take a moment for yourself with our free meditation tools. Practice mindfulness,
              reduce stress, and find your inner peace.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">🧘 Meditation Timer</h3>
                <p className="text-blue-600">
                  Customizable meditation sessions with progress tracking
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">🫁 Breathing Exercises</h3>
                <p className="text-green-600">
                  Practice 4-7-8 breathing and other techniques
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Start</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/breathing"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Breathing Exercise
              </a>
              <a
                href="/about"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </section>
        </main>

        <footer className="text-center mt-16 text-gray-600">
          <p>&copy; 2024 Zen Moment. Free meditation tools for everyone.</p>
        </footer>
      </div>
    </div>
  )
}