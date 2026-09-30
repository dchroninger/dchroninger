import { type MetadataRoute } from 'next'

import { getAllArticles } from '@/lib/articles'
import { HAS_PROJECTS } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles = await getAllArticles()
  let pages = [
    '',
    '/about',
    '/articles',
    ...(HAS_PROJECTS ? ['/projects'] : []),
    '/uses',
  ]

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/articles/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ]
}
