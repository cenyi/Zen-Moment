'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  theme: 'dark' | 'light'
  size?: 'small' | 'medium' | 'large'
  orientation?: 'horizontal' | 'vertical'
  collapsible?: boolean // 新增收缩功能选项
}

export default function ShareButtons({
  title,
  url,
  theme,
  size = 'medium',
  orientation = 'horizontal',
  collapsible = false
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  // 冥想主题分享文案
  const getShareText = () => {
    const meditationPhrases = [
      `Found peace through this practice: ${title}`,
      `Just completed this amazing meditation guide: ${title}`,
      `This meditation practice brought me clarity: ${title}`,
      `Discovering inner peace with this guide: ${title}`,
      `A transformative mindfulness practice: ${title}`
    ]
    return meditationPhrases[Math.floor(Math.random() * meditationPhrases.length)]
  }

  const shareText = getShareText()

  // 分享链接
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(`Meditation guide: ${title}`)}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${url}`)}`
  }

  // 复制链接
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // 按钮大小样式
  const sizeStyles = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  }

  // 容器方向样式
  const containerStyles = orientation === 'horizontal'
    ? 'flex items-center space-x-3'
    : 'flex flex-col items-center space-y-3'

  // 符合冥想主题的柔和颜色
  const buttonStyles = (platform: string) => {
    const base = `flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeStyles[size]}`

    const colors = {
      twitter: theme === 'dark'
        ? 'bg-gray-800/50 text-gray-300 hover:bg-blue-900/30 hover:text-blue-300 focus-visible:ring-blue-500'
        : 'bg-gray-100/50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 focus-visible:ring-blue-500',
      facebook: theme === 'dark'
        ? 'bg-gray-800/50 text-gray-300 hover:bg-blue-900/30 hover:text-blue-300 focus-visible:ring-blue-600'
        : 'bg-gray-100/50 text-gray-600 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-blue-600',
      linkedin: theme === 'dark'
        ? 'bg-gray-800/50 text-gray-300 hover:bg-blue-900/30 hover:text-blue-300 focus-visible:ring-blue-700'
        : 'bg-gray-100/50 text-gray-600 hover:bg-blue-50 hover:text-blue-800 focus-visible:ring-blue-700',
      email: theme === 'dark'
        ? 'bg-gray-800/50 text-gray-300 hover:bg-green-900/30 hover:text-green-300 focus-visible:ring-green-500'
        : 'bg-gray-100/50 text-gray-600 hover:bg-green-50 hover:text-green-600 focus-visible:ring-green-500',
      copy: theme === 'dark'
        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200 focus-visible:ring-gray-500'
        : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-700 focus-visible:ring-gray-500'
    }

    return `${base} ${colors[platform as keyof typeof colors]}`
  }

  // 鼠标事件处理函数
  const handleMouseEnter = () => {
    // 清除任何现有的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    // 添加延迟，让用户有时间移动到菜单上
    const id = setTimeout(() => {
      setIsHovered(false)
    }, 300)
    setTimeoutId(id)
  }

  // 收缩式分享按钮组件
  const CollapsibleShareButton = () => (
    <div
      className={`relative ${collapsible ? 'inline-block' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {collapsible ? (
        <>
          {/* 收缩状态：清晰的分享图标 */}
          <div
            className={`${sizeStyles[size]} flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              theme === 'dark'
                ? 'bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 hover:text-blue-200 border border-blue-800/30 focus-visible:ring-blue-500'
                : 'bg-blue-100/60 text-blue-600 hover:bg-blue-200/80 hover:text-blue-700 border border-blue-300/40 focus-visible:ring-blue-500'
            }`}
            title="Share this article"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </div>

          {/* 展开的分享菜单 - 带有更大的悬停区域 */}
          <div
            className={`absolute top-full ${
              orientation === 'vertical' ? 'left-full ml-2' : 'right-0'
            } mt-2 z-50 transition-all duration-300 transform origin-${
              orientation === 'vertical' ? 'left' : 'top-right'
            } ${
              isHovered ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`flex ${
              orientation === 'vertical' ? 'flex-col' : 'flex-row'
            } items-center space-${
              orientation === 'vertical' ? 'y-2' : 'x-2'
            } p-3 rounded-lg backdrop-blur-md border ${
              theme === 'dark'
                ? 'bg-gray-900/95 border-gray-700/60 shadow-xl'
                : 'bg-white/95 border-gray-200/60 shadow-xl'
            }`}>
              <span className={`text-xs font-medium whitespace-nowrap mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Share this article
              </span>

              {/* Twitter/X */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles('twitter')}
                title="Share on Twitter/X"
                aria-label="Share on Twitter/X"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles('linkedin')}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href={shareLinks.email}
                className={buttonStyles('email')}
                title="Share via Email"
                aria-label="Share via Email"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className={buttonStyles('copy')}
                title="Copy link"
                aria-label="Copy link"
              >
                {copied ? (
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        /* 非收缩状态：原来的展开式布局 */
        <div className={containerStyles}>
          {size !== 'small' && (
            <span className={`text-xs font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            } ${orientation === 'vertical' ? 'mb-1' : 'mr-2'}`}>
              Share
            </span>
          )}

          {/* Twitter/X */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles('twitter')}
            title="Share on Twitter/X"
            aria-label="Share on Twitter/X"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Facebook - 在小屏幕时隐藏以节省空间 */}
          {size !== 'small' && (
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles('facebook')}
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          )}

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles('linkedin')}
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href={shareLinks.email}
            className={buttonStyles('email')}
            title="Share via Email"
            aria-label="Share via Email"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className={buttonStyles('copy')}
            title="Copy link"
            aria-label="Copy link"
          >
            {copied ? (
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )

  return <CollapsibleShareButton />
}