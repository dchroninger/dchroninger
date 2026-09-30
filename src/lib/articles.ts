import { type StaticImageData } from 'next/image'

import { type Locale } from '@/i18n/config'

export interface Article {
  title: string
  description: string
  author: string
  /** Original publish date (same value in every language version) */
  date: string
  /** In a translated file only: when this translation was published */
  translatedDate?: string
  /** Optional cover photo (import it in the post's .mdx) */
  image?: StaticImageData
  imageAlt?: string
  imageCaption?: string
  /** CSS object-position for cropping the cover, e.g. '50% 20%' */
  imagePosition?: string
}

export interface ArticleWithSlug extends Article {
  slug: string
  /** Language the body is actually written in */
  contentLang: Locale
  /** Set when a Japanese version exists (for the "also in Japanese" hint) */
  jaVersion?: { translatedDate?: string }
}

// Posts live in src/content/articles/<slug>/{en,ja}.mdx. `en.mdx` is the
// source of truth; `ja.mdx` is optional and added whenever it's translated.
const ctx = require.context(
  '../content/articles',
  true,
  /^\.\/[^/]+\/(en|ja)\.mdx$/,
)

type Loaded = { article: Article; default: React.ComponentType }

function keyFor(slug: string, lang: Locale) {
  return `./${slug}/${lang}.mdx`
}

function has(slug: string, lang: Locale) {
  return ctx.keys().includes(keyFor(slug, lang))
}

export function getSlugs(): string[] {
  let slugs = new Set<string>()
  for (let key of ctx.keys()) {
    let match = key.match(/^\.\/([^/]+)\/en\.mdx$/)
    if (match) slugs.add(match[1])
  }
  return [...slugs]
}

/** Load a post for `lang`, falling back to English if it isn't translated. */
export function getArticle(slug: string, lang: Locale) {
  let contentLang: Locale = has(slug, lang) ? lang : 'en'
  if (!has(slug, contentLang)) return null

  let mod = ctx(keyFor(slug, contentLang)) as Loaded
  let ja = has(slug, 'ja') ? (ctx(keyFor(slug, 'ja')) as Loaded) : null

  let article: ArticleWithSlug = {
    ...mod.article,
    slug,
    contentLang,
    jaVersion: ja ? { translatedDate: ja.article.translatedDate } : undefined,
  }
  return { article, Content: mod.default }
}

/** Every post (newest first). Untranslated posts fall back to English. */
export function getAllArticles(lang: Locale): ArticleWithSlug[] {
  return getSlugs()
    .map((slug) => getArticle(slug, lang)!.article)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
