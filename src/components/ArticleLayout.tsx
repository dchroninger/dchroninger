'use client'

import Image from 'next/image'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { TransitionLink } from '@/components/TransitionLink'
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
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <TransitionLink
            href="/articles"
            aria-label="Back to all writing"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 shadow-md ring-1 shadow-black/5 ring-line backdrop-blur-md transition hover:ring-accent/40 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-muted transition group-hover:-translate-x-0.5 group-hover:stroke-accent" />
          </TransitionLink>
          <article>
            <header className="flex flex-col">
              <h1 className="vt-post-title mt-6 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center font-mono text-sm text-faint"
              >
                <span className="h-4 w-0.5 rounded-full bg-accent/60" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
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
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
