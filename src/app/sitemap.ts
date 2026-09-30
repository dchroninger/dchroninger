import { type MetadataRoute } from 'next'

import { locales, localePath } from '@/i18n/config'
import { getAllArticles } from '@/lib/articles'
import { HAS_PROJECTS } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  let pages = [
    '/',
    '/about',
    '/articles',
    ...(HAS_PROJECTS ? ['/projects'] : []),
    '/uses',
  ]
  let url = (lang: (typeof locales)[number], path: string) =>
    `${SITE_URL}${localePath(lang, path)}`

  let entries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: url('en', path),
    changeFrequency: 'monthly',
    alternates: {
      languages: { en: url('en', path), ja: url('ja', path) },
    },
  }))

  for (let article of getAllArticles('en')) {
    let path = `/articles/${article.slug}`
    let hasJa = !!article.jaVersion
    entries.push({
      url: url('en', path),
      lastModified: new Date(article.date),
      alternates: {
        languages: {
          en: url('en', path),
          ...(hasJa && { ja: url('ja', path) }),
        },
      },
    })
    if (hasJa) {
      entries.push({
        url: url('ja', path),
        lastModified: new Date(
          article.jaVersion!.translatedDate ?? article.date,
        ),
        alternates: { languages: { en: url('en', path), ja: url('ja', path) } },
      })
    }
  }

  // Japanese versions of the static pages
  for (let path of pages) {
    entries.push({
      url: url('ja', path),
      changeFrequency: 'monthly',
      alternates: { languages: { en: url('en', path), ja: url('ja', path) } },
    })
  }

  return entries
}
