import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'

// 导入现有的类型定义
export interface BlogPostData {
  contentHtml: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorBio: string;
  tags: string[];
  keywords: string;
  metaDescription: string;
  canonicalUrl: string;
  structuredData: StructuredData;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  author: {
    '@type': string;
    name: string;
    url: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': string;
    id: string;
  };
  image: string;
}

// 博客列表页面需要的精简接口
export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  date: string
  readTime: string
  category: string
  author: string
  authorBio: string
  tags: string[]
  keywords: string
  canonicalUrl: string
  structuredData: StructuredData
  excerpt: string
}

// 博客文章内容接口
export interface BlogPostContent extends BlogPost {
  contentHtml: string
}

// 文章目录
const postsDirectory = path.join(process.cwd(), 'src/app/blog/articles')

// 处理单个Markdown文件
async function processMarkdownFile(filePath: string): Promise<BlogPostData | null> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')

    // 提取markdownContent字符串内容（从const markdownContent = `开始到结束的`）
    const markdownMatch = fileContents.match(/const markdownContent = `([\s\S]*?)`/m)
    if (!markdownMatch) {
      console.warn(`No markdown content found in ${filePath}`)
      return null
    }

    const rawMarkdownContent = markdownMatch[1]

    // 解析frontmatter和markdown内容
    const matterResult = matter(rawMarkdownContent)

    // 转换markdown到HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      contentHtml,
      title: matterResult.data.title || '',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      readTime: matterResult.data.readTime || '5 min read',
      category: matterResult.data.category || 'Uncategorized',
      author: matterResult.data.author || 'Anonymous',
      authorBio: matterResult.data.authorBio || '',
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      keywords: matterResult.data.keywords || '',
      metaDescription: matterResult.data.metaDescription || '',
      canonicalUrl: matterResult.data.canonicalUrl || '',
      structuredData: matterResult.data.structuredData || {}
    }
  } catch (error) {
    console.error(`Error processing markdown file ${filePath}:`, error)
    return null
  }
}

// 获取所有博客文章列表
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory not found:', postsDirectory)
      return []
    }

    // 读取所有文章目录
    const slugDirectories = fs.readdirSync(postsDirectory)
      .filter(dir => {
        const fullPath = path.join(postsDirectory, dir)
        return fs.statSync(fullPath).isDirectory() && dir !== '[slug]' // 排除动态路由目录
      })

    const posts: BlogPost[] = []

    for (const slugDir of slugDirectories) {
      try {
        const contentPath = path.join(postsDirectory, slugDir, 'content.ts')

        // 检查content.ts文件是否存在
        if (!fs.existsSync(contentPath)) {
          console.warn(`Content file not found for slug: ${slugDir}`)
          continue
        }

        const postData = await processMarkdownFile(contentPath)

        if (!postData || !postData.title || !postData.metaDescription) {
          console.warn(`Invalid post data for slug: ${slugDir}`)
          continue
        }

        // 验证必要字段
        posts.push({
          slug: slugDir,
          title: postData.title || '',
          metaDescription: postData.metaDescription || '',
          date: postData.date || new Date().toISOString().split('T')[0],
          readTime: postData.readTime || '5 min read',
          category: postData.category || 'Uncategorized',
          author: postData.author || 'Anonymous',
          authorBio: postData.authorBio || '',
          tags: Array.isArray(postData.tags) ? postData.tags : [],
          keywords: postData.keywords || '',
          canonicalUrl: postData.canonicalUrl || '',
          structuredData: postData.structuredData || {},
          excerpt: postData.metaDescription || ''
        })
      } catch (error) {
        console.error(`Error loading post ${slugDir}:`, error)
      }
    }

    // 按日期排序（最新的在前）- 添加日期验证
    return posts.sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      } catch {
        return 0
      }
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// 根据slug获取单个博客文章
export async function getBlogPost(slug: string): Promise<BlogPostContent | null> {
  try {
    // 验证slug参数
    if (!slug || typeof slug !== 'string' || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
      console.warn(`Invalid slug parameter: ${slug}`)
      return null
    }

    const contentPath = path.join(postsDirectory, slug, 'content.ts')

    // 检查content.ts文件是否存在
    if (!fs.existsSync(contentPath)) {
      return null
    }

    const postData = await processMarkdownFile(contentPath)

    if (!postData || !postData.title || !postData.metaDescription) {
      console.warn(`Invalid post data for slug: ${slug}`)
      return null
    }

    return {
      slug,
      title: postData.title || '',
      metaDescription: postData.metaDescription || '',
      date: postData.date || new Date().toISOString().split('T')[0],
      readTime: postData.readTime || '5 min read',
      category: postData.category || 'Uncategorized',
      author: postData.author || 'Anonymous',
      authorBio: postData.authorBio || '',
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      keywords: postData.keywords || '',
      canonicalUrl: postData.canonicalUrl || '',
      structuredData: postData.structuredData || {},
      excerpt: postData.metaDescription || '',
      contentHtml: postData.contentHtml || ''
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

// 生成静态参数（用于静态生成，但现在主要用于SSR）
export async function generateAllSlugs(): Promise<string[]> {
  const posts = await getBlogPosts()
  return posts.map(post => post.slug)
}

// 检查slug是否存在
export async function slugExists(slug: string): Promise<boolean> {
  const post = await getBlogPost(slug)
  return post !== null
}