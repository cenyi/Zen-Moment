'use client'

import { BlogPost } from '../app/blog/actions'
import Link from 'next/link'
import { useTimerStore } from '../store/timerStore'

interface RelatedPostsProps {
  currentPostTags: string[]
  currentPostSlug: string
  allPosts: BlogPost[]
  maxPosts?: number
}

export function RelatedPosts({
  currentPostTags,
  currentPostSlug,
  allPosts,
  maxPosts = 3
}: RelatedPostsProps) {
  const { theme } = useTimerStore()

  // 计算相关文章：基于标签匹配
  const relatedPosts = allPosts
    .filter(post => {
      // 排除当前文章
      if (post.slug === currentPostSlug) return false

      // 计算标签匹配度
      const matchingTags = post.tags.filter(tag =>
        currentPostTags.includes(tag)
      )

      // 至少有一个共同标签
      return matchingTags.length > 0
    })
    .map(post => ({
      ...post,
      // 计算相关度分数（共同标签数量）
      relevanceScore: post.tags.filter(tag =>
        currentPostTags.includes(tag)
      ).length
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxPosts)

  // 如果没有相关文章，不显示组件
  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className={`mt-12 pt-8 border-t ${
      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <h2 className={`text-2xl font-serif mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Related Articles
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block p-5 rounded-lg border transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'
                : 'bg-white border-gray-200 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10'
            }`}
          >
            {/* 文章标题 */}
            <h3 className={`font-serif text-lg mb-2 leading-snug group-hover:text-blue-500 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h3>

            {/* 文章摘要 */}
            <p className={`text-sm line-clamp-2 mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {post.excerpt}
            </p>

            {/* 文章元信息 */}
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span>{post.readTime}</span>
                <span>{post.date}</span>
              </div>

              {/* 共同标签 */}
              {post.tags.some(tag => currentPostTags.includes(tag)) && (
                <div className={`flex flex-wrap gap-1 mt-2`}>
                  {post.tags
                    .filter(tag => currentPostTags.includes(tag))
                    .slice(0, 2)
                    .map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded text-xs ${
                          theme === 'dark'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
