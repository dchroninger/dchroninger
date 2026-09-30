'use client'

import Image from 'next/image'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { TransitionLink } from '@/components/TransitionLink'
import { fmt } from '@/i18n/config'
import { useLang, useT } from '@/i18n/LangProvider'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  let t = useT()
  let lang = useLang()

  // Viewing in Japanese but only an English version exists
  let englishOnly = lang === 'ja' && article.contentLang !== 'ja'
  // This is a Japanese translation: show when it was translated
  let translatedDate =
    article.contentLang === 'ja' ? article.translatedDate : undefined

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <TransitionLink
            href="/articles"
            aria-label={t.a11y.backToWriting}
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 shadow-md ring-1 shadow-black/5 ring-line backdrop-blur-md transition hover:ring-accent/40 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-muted transition group-hover:-translate-x-0.5 group-hover:stroke-accent" />
          </TransitionLink>
          <article>
            <header className="flex flex-col">
              <h1 className="vt-post-title mt-6 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
                {article.title}
              </h1>
              <div className="order-first flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-faint">
                <span className="flex items-center">
                  <span className="h-4 w-0.5 rounded-full bg-accent/60" />
                  <time dateTime={article.date} className="ml-3">
                    {formatDate(article.date, lang)}
                  </time>
                </span>
                {translatedDate && (
                  <time dateTime={translatedDate} className="text-muted">
                    ·{' '}
                    {fmt(t.articles.translatedOn, {
                      date: formatDate(translatedDate, lang),
                    })}
                  </time>
                )}
                {lang === 'en' && article.jaVersion && (
                  <TransitionLink
                    href={`/ja/articles/${article.slug}`}
                    className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent transition hover:bg-accent/20"
                  >
                    {t.articles.readInJapanese}
                    {article.jaVersion.translatedDate &&
                      ` · ${fmt(t.articles.translatedOn, {
                        date: formatDate(
                          article.jaVersion.translatedDate,
                          'en',
                        ),
                      })}`}
                  </TransitionLink>
                )}
              </div>
            </header>
            {englishOnly && (
              <p
                lang="ja"
                className="mt-6 rounded-xl bg-surface-2/60 px-4 py-3 text-sm text-muted ring-1 ring-line"
              >
                {t.articles.englishOnlyBanner}
              </p>
            )}
            {article.image && (
              <figure className="mt-8">
                <div className="vt-post-image relative aspect-16/10 overflow-hidden rounded-2xl bg-surface-2 shadow-xl ring-1 shadow-black/10 ring-line">
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? ''}
                    priority
                    sizes="(min-width: 768px) 42rem, 100vw"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: article.imagePosition }}
                  />
                </div>
                {article.imageCaption && (
                  <figcaption className="mt-3 flex items-baseline gap-2 font-mono text-xs text-muted">
                    <span aria-hidden="true" className="text-accent">
                      ↑
                    </span>
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
            <Prose
              className="mt-8"
              data-mdx-content
              lang={englishOnly ? 'en' : undefined}
            >
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
