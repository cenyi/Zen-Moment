'use client'

import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  author: string
  excerpt: string
}

export function BlogPageContent({ theme }: { theme: 'dark' | 'light' }) {
  // 使用静态数据，简单直接
  const blogPosts: BlogPost[] = [
    {
      slug: 'top-5-meditation-apps-2025-which-one-actually-works-for-you',
      title: 'Top 5 Meditation Apps 2025: Which One Actually Works for You?',
      date: '2025-12-06',
      readTime: '18 min read',
      category: 'App Reviews',
      author: 'Zen Moment Team',
      excerpt: 'Honest review of the 5 most popular meditation apps: Calm, Headspace, Insight Timer, Ten Percent Happier, and Waking Up. Compare features, pricing, and find the right fit for your needs.'
    },
    {
      slug: 'when-focus-fails-the-archers-breath-for-deep-work',
      title: "When Focus Fails: The Archer's Breath for Deep Work",
      date: '2025-11-25',
      readTime: '11 min read',
      category: 'Focus & Concentration',
      author: 'Zen Moment Team',
      excerpt: 'A practical guide for knowledge workers struggling with deep work. Learn the Japanese Kyudo zanshin technique through real, imperfect experiences.'
    },
    {
      slug: 'the-samurais-meditation-cultivating-stillness-in-action',
      title: 'The Samurai\'s Meditation: Cultivating Stillness in Action',
      date: '2025-11-25',
      readTime: '12 min read',
      category: 'Meditation Philosophy',
      author: 'Zen Moment Team',
      excerpt: 'How Fudoshin (不動心) principles help maintain calm in everyday chaos—from commutes to chores to difficult conversations.'
    },
    {
      slug: 'the-3-minute-mental-reset-before-a-big-meeting',
      title: 'The 3-Minute \'Mental Reset\' Before a Big Meeting: Daoist-Inspired Quick Calm for Professionals',
      date: '2025-10-15',
      readTime: '8 min read',
      category: 'Quick Calm Techniques',
      author: 'Zen Moment Team',
      excerpt: 'Discover the 3-minute mental reset combining Daoist \'Cheng Xin\' principles with neuroscience. Perfect for professionals needing instant calm before important meetings.'
    },
    {
      slug: 'dont-empty-your-mind-do-this-instead',
      title: 'Don\'t Empty Your Mind. Do This Instead: The Daoist \'Xin Ru Tian Kong\' Approach to Meditation',
      date: '2025-10-15',
      readTime: '9 min read',
      category: 'Meditation Philosophy',
      author: 'Zen Moment Team',
      excerpt: 'Learn why trying to empty your mind creates resistance and how the Daoist \'mind like sky\' approach leads to true mental clarity and deeper peace.'
    }
  ]

  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-16 font-serif">
        {/* Simple Header */}
        <header className="mb-10">
          <h1 className={`text-5xl font-light mb-4 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Blog
          </h1>
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Thoughts on meditation and mindfulness
          </p>
        </header>

        {/* Article List - Clean & Compact */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className={`border-b pb-12 last:border-0 ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="space-y-4">
                  {/* Article Title */}
                  <h2 className={`text-3xl font-normal leading-tight transition-colors ${
                    theme === 'dark'
                      ? 'text-white hover:text-blue-400'
                      : 'text-gray-900 hover:text-blue-600'
                  }`}>
                    {post.title}
                  </h2>

                  {/* Article Meta - Simple */}
                  <div className={`flex items-center space-x-3 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>

                  {/* Article Excerpt */}
                  {post.excerpt && (
                    <p className={`leading-relaxed text-base mt-4 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Simple Read More */}
                  <div className={`text-base font-medium transition-colors mt-4 ${
                    theme === 'dark'
                      ? 'text-blue-400 group-hover:text-blue-300'
                      : 'text-blue-600 group-hover:text-blue-700'
                  }`}>
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No articles yet. Check back soon!
            </p>
          </div>
        )}
      </main>
    </>
  )
}