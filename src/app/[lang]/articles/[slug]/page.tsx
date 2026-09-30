import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/ArticleLayout'
import { locales, localePath, type Locale } from '@/i18n/config'
import { getArticle, getSlugs } from '@/lib/articles'
import { SITE_NAME } from '@/lib/site'

type Params = { lang: string; slug: string }

export function generateStaticParams() {
  return locales.flatMap((lang) => getSlugs().map((slug) => ({ lang, slug })))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  let lang = params.lang as Locale
  let post = getArticle(params.slug, lang)
  if (!post) return {}
  let { article } = post
  let path = `/articles/${params.slug}`
  let hasJa = article.contentLang === 'ja' || !!article.jaVersion

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: localePath(article.contentLang === 'ja' ? 'ja' : 'en', path),
      languages: {
        en: localePath('en', path),
        ...(hasJa && { ja: localePath('ja', path) }),
        'x-default': localePath('en', path),
      },
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      siteName: SITE_NAME,
      publishedTime: article.date,
      locale: article.contentLang === 'ja' ? 'ja_JP' : 'en_US',
      ...(article.image && {
        images: [
          {
            url: article.image.src,
            width: article.image.width,
            height: article.image.height,
          },
        ],
      }),
    },
  }
}

export default function ArticlePage({ params }: { params: Params }) {
  let post = getArticle(params.slug, params.lang as Locale)
  if (!post) notFound()
  let { article, Content } = post

  return (
    <ArticleLayout article={article}>
      <Content />
    </ArticleLayout>
  )
}
