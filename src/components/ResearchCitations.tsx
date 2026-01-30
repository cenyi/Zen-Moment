'use client'

import { useTimerStore } from '../store/timerStore'

interface Citation {
  title: string
  author?: string
  institution: string
  year?: number
  url: string
}

interface ResearchCitationsProps {
  citations: Citation[]
  title?: string
}

export function ResearchCitations({
  citations,
  title = "Research & Scientific References"
}: ResearchCitationsProps) {
  const { theme } = useTimerStore()

  return (
    <div className={`max-w-4xl mx-auto my-12 p-6 rounded-lg border ${
      theme === 'dark'
        ? 'bg-gray-900 border-gray-800'
        : 'bg-blue-50 border-blue-200'
    }`}>
      <h3 className={`text-xl font-serif mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>

      <div className="space-y-4">
        {citations.map((citation, index) => (
          <div
            key={index}
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                theme === 'dark'
                  ? 'bg-blue-900 text-blue-300'
                  : 'bg-blue-200 text-blue-700'
              }`}>
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium mb-1">{citation.title}</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {citation.author && <span>{citation.author}. </span>}
                  <span className="italic">{citation.institution}</span>
                  {citation.year && <span> ({citation.year})</span>}
                </p>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs inline-block mt-2 hover:underline ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  View Research →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className={`text-xs mt-4 italic ${
        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
      }`}>
        These references provide scientific backing for the meditation and breathing techniques discussed.
        We encourage readers to explore the original research for deeper understanding.
      </p>
    </div>
  )
}
