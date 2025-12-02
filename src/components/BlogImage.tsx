'use client'

import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  title: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
}

export const BlogImage = ({
  src,
  alt,
  title,
  caption,
  width = 800,
  height = 600,
  priority = false
}: BlogImageProps) => {
  return (
    <figure className="my-8 md:my-10 lg:my-12">
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
        {/* 响应式图片容器 */}
        <div className="relative w-full" style={{ aspectRatio: `${width}/${height}` }}>
          <Image
            src={src}
            alt={alt}
            title={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            className="object-cover w-full h-full"
            priority={priority}
            quality={85}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
      </div>
      
      {/* 图片标题和描述 */}
      <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</p>
        {caption && <p className="text-gray-600 dark:text-gray-400">{caption}</p>}
      </figcaption>

      {/* SEO 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            'url': `https://zenmoment.net${src}`,
            'name': title,
            'description': caption || alt,
            'contentUrl': `https://zenmoment.net${src}`,
            'encodingFormat': 'image/png'
          })
        }}
      />
    </figure>
  )
}
