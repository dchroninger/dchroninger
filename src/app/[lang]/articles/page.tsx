import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Reveal } from '@/components/Reveal'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDictionary } from '@/i18n'
import { fmt, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/i18n/metadata'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative z-10 mt-3 rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted ring-1 ring-line">
      {children}
    </span>
  )
}

function Article({
  article,
  lang,
}: {
  article: ArticleWithSlug
  lang: Locale
}) {
  let t = getDictionary(lang)
  let date = formatDate(article.date, lang)

  return (
    <Reveal as="article" className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        {article.image && (
          <div
            data-vt-image
            className="relative z-10 mb-5 aspect-video w-full overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line"
          >
            <Image
              src={article.image}
              alt={article.imageAlt ?? ''}
              sizes="(min-width: 768px) 36rem, 100vw"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              style={{ objectPosition: article.imagePosition }}
            />
          </div>
        )}
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {date}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        {lang === 'ja' && article.contentLang !== 'ja' && (
          <Badge>{t.articles.englishOnly}</Badge>
        )}
        {lang === 'en' && article.jaVersion && (
          <Badge>
            {t.articles.alsoJapanese}
            {article.jaVersion.translatedDate &&
              ` · ${fmt(getDictionary('en').articles.translatedOn, {
                date: formatDate(article.jaVersion.translatedDate, 'en'),
              })}`}
          </Badge>
        )}
        {lang === 'ja' &&
          article.contentLang === 'ja' &&
          article.translatedDate && (
            <Badge>
              {fmt(t.articles.translatedOn, {
                date: formatDate(article.translatedDate, 'ja'),
              })}
            </Badge>
          )}
        <Card.Cta>{t.articles.read}</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden md:pl-6"
      >
        {date}
      </Card.Eyebrow>
    </Reveal>
  )
}

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  let lang = params.lang as Locale
  let t = getDictionary(lang)
  return pageMetadata(lang, '/articles', t.meta.articles)
}

export default function ArticlesIndex({
  params,
}: {
  params: { lang: string }
}) {
  let lang = params.lang as Locale
  let t = getDictionary(lang)
  let articles = getAllArticles(lang)

  return (
    <SimpleLayout title={t.articles.title} intro={t.articles.intro}>
      <div className="flex max-w-3xl flex-col space-y-8">
        {articles.map((article) => (
          <Article key={article.slug} article={article} lang={lang} />
        ))}
      </div>
    </SimpleLayout>
  )
}
