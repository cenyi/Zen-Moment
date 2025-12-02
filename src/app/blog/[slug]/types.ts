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