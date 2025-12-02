import { getBlogPost, generateAllSlugs } from '../actions'
import { notFound } from 'next/navigation'
import BlogArticleClient from './BlogArticleClient'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  // 服务端获取博客数据
  const postData = await getBlogPost(params.slug)

  if (!postData) {
    notFound()
  }

  return <BlogArticleClient postData={postData} />
}

// 生成静态参数（可选，用于SEO优化）
export async function generateStaticParams() {
  try {
    const slugs = await generateAllSlugs()
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// 生成元数据
export async function generateMetadata({ params }: PageProps) {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      return {
        title: 'Article Not Found',
        description: 'The article you are looking for does not exist.',
      }
    }

    return {
      title: post.title,
      description: post.metaDescription,
      keywords: post.keywords,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.metaDescription,
        type: 'article',
        url: post.canonicalUrl,
        siteName: 'Zen Moment',
        images: post.structuredData?.image ? [post.structuredData.image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.metaDescription,
        images: post.structuredData?.image ? [post.structuredData.image] : [],
      },
      alternates: post.canonicalUrl ? {
        canonical: post.canonicalUrl,
      } : undefined,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Zen Moment Blog',
      description: 'Discover insights on meditation and mindfulness.',
    }
  }
}