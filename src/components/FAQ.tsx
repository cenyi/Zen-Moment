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

  // 生成 FAQPage 结构化数据
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
      {/* FAQPage 结构化数据 */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}

      {/* FAQ 组件 */}
      <div className={`max-w-4xl mx-auto my-12 ${
        theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
      }`}>
        <h2 className={`text-3xl font-serif text-center mb-8 ${
          theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
        }`}>
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-[#1E1B1E]/80 border-[#3A3A3C]/50 hover:border-[#6B8F7A]/50'
                  : 'bg-[#F7F4EF]/80 border-[#E8E4E0]/50 hover:border-[#6B8F7A]/50'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                  theme === 'dark' ? 'hover:bg-[#151917]/50' : 'hover:bg-[#1E1B1E]/50'
                }`}
                aria-expanded={openIndex === index}
              >
                <span className={`font-medium pr-4 ${
                  theme === 'dark' ? 'text-[#E9E8E6]' : 'text-[#2C2A29]'
                }`}>
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  } ${
                    theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
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
                  theme === 'dark' ? 'text-[#A8C8B0]' : 'text-[#6B8F7A]'
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
