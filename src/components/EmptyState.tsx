'use client'

import { useTimerStore } from '../store/timerStore'
import Link from 'next/link'

interface EmptyStateProps {
  type: 'no-data' | 'no-search-results' | 'no-practice' | 'error'
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  illustration?: React.ReactNode
}

export function EmptyState({
  type,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  illustration
}: EmptyStateProps) {
  const { theme } = useTimerStore()

  // 定义内容类型
  interface Content {
    title: string
    description: string
    actionLabel: string
    illustration: React.ReactNode
  }

  // 默认内容根据类型设置
  const getDefaultContent = (): Content => {
    switch (type) {
      case 'no-data':
        return {
          title: title || 'No Data Yet',
          description: description || 'Start your meditation journey today! Your practice statistics will appear here.',
          actionLabel: actionLabel || 'Start Meditating',
          illustration: illustration || (
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )
        }

      case 'no-search-results':
        return {
          title: title || 'No Results Found',
          description: description || 'We couldn\'t find any matching results. Try adjusting your search or filters.',
          actionLabel: actionLabel || 'Clear Filters',
          illustration: illustration || (
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )
        }

      case 'no-practice':
        return {
          title: title || 'Ready to Begin?',
          description: description || 'Take a moment for yourself. Even a few minutes of meditation can make a difference.',
          actionLabel: actionLabel || 'Start Now',
          illustration: illustration || (
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )
        }

      case 'error':
        return {
          title: title || 'Oops! Something Went Wrong',
          description: description || 'An unexpected error occurred. Please try again or contact support if the problem persists.',
          actionLabel: actionLabel || 'Try Again',
          illustration: illustration || (
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'
            }`}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3L13.856 4.07c-.313-.57-.706-1.115-1.162-1.625M6.75 15a.75.75 0 111.5 0 .75-1.5 0 .75.75 0 01-1.5 0zM14.25 15a.75.75 0 111.5 0 .75-1.5 0 .75.75 0 01-1.5 0zM3 3.75v16.5c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75V3.75a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75z" />
              </svg>
            </div>
          )
        }

      default:
        return getDefaultContent()
    }
  }

  const content = getDefaultContent()

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {/* 插图 */}
      <div className="mb-6 transition-transform duration-300 hover:scale-105">
        {content.illustration}
      </div>

      {/* 标题 */}
      <h3 className={`text-2xl font-serif mb-3 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {content.title}
      </h3>

      {/* 描述 */}
      <p className={`text-sm max-w-md mb-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {content.description}
      </p>

      {/* 行动按钮 */}
      {(actionHref || onAction) && (
        <div>
          {actionHref ? (
            <Link
              href={actionHref}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 min-w-[44px] min-h-[44px] ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5-5m5 5H6" />
              </svg>
              {content.actionLabel}
            </Link>
          ) : (
            onAction && (
              <button
                onClick={onAction}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 min-w-[44px] min-h-[44px] ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {content.actionLabel}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
