import { type Metadata } from 'next'

import { localePath, otherLocale, type Locale } from './config'
import { SITE_URL } from '@/lib/site'
import { getDictionary } from './index'

/** Title/description + canonical + hreflang alternates for a page. */
export function pageMetadata(
  lang: Locale,
  path: string,
  fields: { title?: string; description?: string; noindex?: boolean } = {},
): Metadata {
  let t = getDictionary(lang)
  return {
    ...(fields.title && { title: fields.title }),
    description: fields.description ?? t.meta.description,
    alternates: {
      canonical: localePath(lang, path),
      languages: {
        en: localePath('en', path),
        ja: localePath('ja', path),
        'x-default': localePath('en', path),
      },
      types: {
        'application/rss+xml': `${SITE_URL}${localePath(lang, '/feed.xml')}`,
      },
    },
    openGraph: {
      locale: t.meta.locale,
      alternateLocale: [getDictionary(otherLocale(lang)).meta.locale],
    },
    ...(fields.noindex && { robots: { index: false } }),
  }
}
