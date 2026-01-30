'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Navigation } from '../../../components/Navigation'
import { Footer } from '../../../components/Footer'
import ShareButtons from '../../../components/ShareButtons'
import { RelatedPosts } from '../../../components/RelatedPosts'
import { BlogPostData, BlogPost } from '../actions'
import { useTimerStore } from '../../../store/timerStore'
import { usePerformanceOptimizedScroll } from '../../../hooks/usePerformanceOptimizedScroll'
import { PerformanceMonitor } from '../../../components/PerformanceMonitor'

interface BlogArticleClientProps {
  postData: BlogPostData
  breadcrumbData?: any
  allPosts?: BlogPost[]
}

export default function BlogArticleClient({ postData, breadcrumbData, allPosts = [] }: BlogArticleClientProps) {
  // 类型断言确保 allPosts 是 BlogPost[]
  const relatedPosts = allPosts as BlogPost[]
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTimerStore()
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 使用性能优化的滚动Hook
  const { resetCache } = usePerformanceOptimizedScroll({
    onScroll: ({ progress }) => {
      setReadingProgress(progress)
    },
    threshold: 0.1 // 最小变化阈值0.1%
  })

  // 监听主题切换，延迟重置缓存等待动画完成
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetCache()
    }, 300) // 等待主题切换动画完成

    return () => clearTimeout(timeoutId)
  }, [theme, resetCache])


  const structuredDataHtml = useMemo(() => {
    try {
      return postData?.structuredData ? JSON.stringify(postData.structuredData) : '{}'
    } catch (error) {
      console.error('Error stringifying structured data:', error)
      return '{}'
    }
  }, [postData?.structuredData])

  const breadcrumbDataHtml = useMemo(() => {
    try {
      return breadcrumbData ? JSON.stringify(breadcrumbData) : '{}'
    } catch (error) {
      console.error('Error stringifying breadcrumb data:', error)
      return '{}'
    }
  }, [breadcrumbData])

  if (!mounted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-950 text-gray-300'
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading article...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* BlogPosting 结构化数据 */}
      {postData.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataHtml
          }}
        />
      )}

      {/* BreadcrumbList 结构化数据 */}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbDataHtml
          }}
        />
      )}

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-950 text-gray-100'
          : 'bg-white text-gray-800'
      }`}>
        {/* 阅读进度条 */}
        <div className={`fixed top-0 left-0 right-0 h-1 z-50 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}>
          <div
            className={`h-full transition-all duration-150 ${
              theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
            }`}
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* 简化的顶部导航 */}
        <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          theme === 'dark'
            ? 'bg-gray-950/90 border-gray-800'
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Blog</span>
              </Link>

              <button
                onClick={toggleTheme}
                className={`w-11 h-11 p-0 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                  theme === 'dark'
                    ? 'neumorphic-dark text-yellow-400 hover:text-yellow-300'
                    : 'neumorphic text-neumorphic-tips-light hover:text-yellow-600'
                }`}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-6 h-6 flex items-center justify-center text-xl">
                  {/* Light Icon (for light mode) */}
                  <span
                    className={`absolute transition-all duration-300 transform text-sm font-bold ${
                      theme === 'dark' ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  >
                    ◐
                  </span>

                  {/* Dark Icon (for dark mode) */}
                  <span
                    className={`absolute transition-all duration-300 transform text-sm font-bold ${
                      theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                    }`}
                  >
                    ◑
                  </span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* 主内容区域 - 阅读器风格 */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <article className="prose prose-lg max-w-none">
            {/* 文章标题 */}
            <header className="mb-12">
              {/* 文章标题 - 独立区域，不受分享按钮影响 */}
              <div className="text-center mb-8">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {postData.title}
                </h1>
              </div>

              {/* 文章元信息 - 包含时间、作者、阅读时间和分享按钮 */}
              <div className="mb-6">
                {/* 桌面端布局：元信息左侧 + 分享按钮右侧 */}
                <div className="hidden lg:flex items-center justify-between">
                  {/* 左侧元信息 */}
                  <div className={`flex flex-wrap items-center gap-4 text-sm pb-6 border-b flex-1 ${
                    theme === 'dark'
                      ? 'text-gray-400 border-gray-800'
                      : 'text-gray-600 border-gray-200'
                  }`}>
                    <time className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{postData.date}</span>
                    </time>

                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{postData.author}</span>
                    </span>

                    {postData.readTime && (
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{postData.readTime}</span>
                      </span>
                    )}
                  </div>

                  {/* 右侧分享按钮 - 桌面端显示，收缩式设计 */}
                  <div className="ml-6">
                    <ShareButtons
                      title={postData.title}
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      theme={theme}
                      size="medium"
                      orientation="vertical"
                      collapsible={true}
                    />
                  </div>
                </div>

                {/* 移动端布局：垂直排列 */}
                <div className="lg:hidden space-y-4">
                  {/* 移动端元信息 */}
                  <div className={`flex flex-wrap items-center justify-center gap-4 text-sm pb-6 border-b ${
                    theme === 'dark'
                      ? 'text-gray-400 border-gray-800'
                      : 'text-gray-600 border-gray-200'
                  }`}>
                    <time className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{postData.date}</span>
                    </time>

                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{postData.author}</span>
                    </span>

                    {postData.readTime && (
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{postData.readTime}</span>
                      </span>
                    )}
                  </div>

                  {/* 移动端分享按钮 - 在元信息下方居中显示 */}
                  <div className="flex justify-center">
                    <ShareButtons
                      title={postData.title}
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      theme={theme}
                      size="small"
                      orientation="horizontal"
                    />
                  </div>
                </div>
              </div>

              {postData.category && (
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-blue-900/50 text-blue-300 border border-blue-800/50'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {postData.category}
                  </span>
                </div>
              )}
            </header>

  
            {/* 文章内容 - 阅读器优化 */}
            <div className={`prose prose-xl max-w-none leading-relaxed reader-content ${
              theme === 'dark' ? 'prose-invert prose-dark' : 'prose-light'
            }`}>
              <style jsx>{`
                .reader-content {
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size: 1rem;
                  line-height: 1.7;
                  font-weight: 400;
                }

                .prose-dark h1,
                .prose-dark h2,
                .prose-dark h3,
                .prose-dark h4 {
                  color: #f9fafb;
                  font-weight: 600;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }

                .prose-dark p {
                  color: #e5e7eb;
                  margin-bottom: 1.5rem;
                  line-height: 1.7;
                  font-weight: 400;
                }

                .prose-dark a {
                  color: #60a5fa;
                  text-decoration: underline;
                  text-decoration-color: #3730a3;
                  text-underline-offset: 2px;
                }

                .prose-dark a:hover {
                  color: #93c5fd;
                }

                .prose-dark blockquote {
                  border-left: 4px solid #3730a3;
                  background: rgba(55, 48, 163, 0.1);
                  color: #e5e7eb;
                  font-style: italic;
                  padding: 1rem 1.5rem;
                  margin: 2rem 0;
                  border-radius: 0.5rem;
                  line-height: 1.7;
                  font-weight: 400;
                }

                .prose-dark code {
                  background: rgba(55, 48, 163, 0.2);
                  color: #93c5fd;
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.25rem;
                  font-size: 0.875rem;
                }

                .prose-dark pre {
                  background: #111827;
                  border: 1px solid #374151;
                  border-radius: 0.5rem;
                  padding: 1.5rem;
                  overflow-x: auto;
                }

                .prose-dark ul,
                .prose-dark ol {
                  color: #d1d5db;
                  margin-bottom: 1.5rem;
                  line-height: 1.7;
                }

                .prose-dark li {
                  margin-bottom: 0.5rem;
                  font-weight: 400;
                }

                .prose-light h1,
                .prose-light h2,
                .prose-light h3,
                .prose-light h4 {
                  color: #111827;
                  font-weight: 600;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }

                .prose-light p {
                  color: #374151;
                  margin-bottom: 1.5rem;
                  line-height: 1.7;
                  font-weight: 400;
                }

                .prose-light a {
                  color: #2563eb;
                  text-decoration: underline;
                  text-decoration-color: #dbeafe;
                  text-underline-offset: 2px;
                }

                .prose-light a:hover {
                  color: #1d4ed8;
                }

                .prose-light blockquote {
                  border-left: 4px solid #2563eb;
                  background: #eff6ff;
                  color: #1f2937;
                  font-style: italic;
                  padding: 1rem 1.5rem;
                  margin: 2rem 0;
                  border-radius: 0.5rem;
                  line-height: 1.7;
                  font-weight: 400;
                }

                .prose-light code {
                  background: #f3f4f6;
                  color: #1f2937;
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.25rem;
                  font-size: 0.875rem;
                }

                .prose-light pre {
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                  border-radius: 0.5rem;
                  padding: 1.5rem;
                  overflow-x: auto;
                }

                .prose-light ul,
                .prose-light ol {
                  color: #374151;
                  margin-bottom: 1.5rem;
                  line-height: 1.7;
                }

                .prose-light li {
                  margin-bottom: 0.5rem;
                  font-weight: 400;
                }

                @media (max-width: 768px) {
                  .reader-content {
                    font-size: 0.9375rem;
                    line-height: 1.6;
                  }

                  .prose-dark p,
                  .prose-light p {
                    line-height: 1.6;
                    margin-bottom: 1.25rem;
                  }

                  .prose-dark ul,
                  .prose-dark ol,
                  .prose-light ul,
                  .prose-light ol {
                    line-height: 1.6;
                  }

                  .prose-dark blockquote,
                  .prose-light blockquote {
                    line-height: 1.6;
                    padding: 0.75rem 1rem;
                  }
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
          </article>

          {/* 文章底部导航 */}
          <footer className={`mt-16 pt-8 border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col items-center gap-6">
              {/* 分享区域 */}
              <div className={`w-full max-w-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-center text-sm mb-4 font-medium">
                  Enjoyed this article? Share with others
                </p>
                <div className="flex justify-center">
                  <ShareButtons
                    title={postData.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    theme={theme}
                    size="large"
                    orientation="horizontal"
                  />
                </div>
              </div>

              {/* 导航区域 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <Link
                  href="/blog"
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Articles</span>
                </Link>

                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Thank you for reading
                </div>
              </div>
            </div>
          </footer>

          {/* 相关文章推荐 - 基于标签匹配 */}
          {(allPosts as BlogPost[]).length > 0 && (
            <RelatedPosts
              currentPostTags={postData.tags || []}
              currentPostSlug={postData.canonicalUrl?.split('/').pop() || ''}
              allPosts={allPosts as BlogPost[]}
              maxPosts={3}
            />
          )}
        </main>
      </div>

      {/* 性能监控组件 - 仅开发环境显示 */}
      <PerformanceMonitor />
    </>
  )
}