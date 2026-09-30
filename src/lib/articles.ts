import glob from 'fast-glob'
import { type StaticImageData } from 'next/image'

interface Article {
  title: string
  description: string
  author: string
  date: string
  /** Optional cover photo (import it in the post's .mdx) */
  image?: StaticImageData
  imageAlt?: string
  /** Optional caption shown under the cover */
  imageCaption?: string
  /** CSS object-position for cropping the cover, e.g. '50% 20%' */
  imagePosition?: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
