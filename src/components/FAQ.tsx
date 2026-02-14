'use client'

import { useState } from 'react'
import { useTimerStore } from '../store/timerStore'

interface FAQItem {
  question: string
  answer: string
  category?: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
  showSchema?: boolean
}

export function FAQ({ items, title = "Frequently Asked Questions", showSchema = true }: FAQProps) {
  const { theme } = useTimerStore()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // 鐢熸垚 FAQPage 缁撴瀯鍖栨暟鎹?
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <>
      {/* FAQPage 缁撴瀯鍖栨暟鎹?*/}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}

      {/* FAQ 缁勪欢 */}
      <div className={`max-w-4xl mx-auto my-12 ${
        theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
      }`}>
        <h2 className={`text-3xl font-serif text-center mb-8 ${
          theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
        }`}>
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-[#1A2A21]/82 border-[#4F6F5C]/45 hover:border-[#8ABFA2]/55'
                  : 'bg-[#FFF5E7]/82 border-[#D8C4A7]/55 hover:border-[#6E9B7F]/55'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                  theme === 'dark' ? 'hover:bg-[#223529]/45' : 'hover:bg-[#F8E8D0]/70'
                }`}
                aria-expanded={openIndex === index}
              >
                <span className={`font-medium pr-4 ${
                  theme === 'dark' ? 'text-[#EBECE8]' : 'text-[#2D2A24]'
                }`}>
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  } ${
                    theme === 'dark' ? 'text-[#B4CFBE]' : 'text-[#6E9B7F]'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className={`px-6 pb-4 ${
                  theme === 'dark' ? 'text-[#B4CFBE]' : 'text-[#547160]'
                }`}>
                  <div className="pt-2 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

