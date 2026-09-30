import Image from 'next/image'
import clsx from 'clsx'

import { Reveal } from '@/components/Reveal'
import { type Locale } from '@/i18n/config'
import { type Project, type Shot } from '@/lib/projects'

/** One screenshot; swaps to its dark variant when the site is in dark mode. */
function Screenshot({
  shot,
  lang,
  sizes,
  className,
}: {
  shot: Shot
  lang: Locale
  sizes: string
  className?: string
}) {
  let frame = clsx(
    'overflow-hidden bg-surface-2 shadow-2xl ring-1 shadow-black/15 ring-line',
    shot.kind === 'phone' ? 'rounded-[2rem]' : 'rounded-xl',
    className,
  )
  let img = 'block h-auto w-full'
  return (
    <div className={frame}>
      <Image
        src={shot.light}
        alt={shot.alt[lang]}
        sizes={sizes}
        className={clsx(img, shot.dark && 'dark:hidden')}
      />
      {shot.dark && (
        <Image
          src={shot.dark}
          alt=""
          aria-hidden="true"
          sizes={sizes}
          className={clsx(img, 'hidden dark:block')}
        />
      )}
    </div>
  )
}

export function ProjectShowcase({
  project,
  lang,
}: {
  project: Project
  lang: Locale
}) {
  let { hero, phone, extra = [] } = project.shots

  return (
    <article
      id={project.id}
      className="scroll-mt-32 border-t border-line pt-12 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <Image
              src={project.logo}
              alt=""
              className="h-14 w-14 rounded-[1rem] shadow-lg ring-1 shadow-black/10 ring-line"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {project.name}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {project.status[lang]}
              </span>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-ink">
            {project.tagline[lang]}
          </p>
          <p className="mt-3 text-base text-body">
            {project.description[lang]}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-body">
            {project.highlights[lang].map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted ring-1 ring-line"
              >
                {tag}
              </li>
            ))}
          </ul>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:brightness-110"
            >
              {project.label?.[lang] ?? project.name} ↗
            </a>
          )}
        </Reveal>
        {phone && (
          <Reveal delay={0.1} className="mx-auto w-full max-w-60 lg:max-w-none">
            <Screenshot shot={phone} lang={lang} sizes="16rem" />
          </Reveal>
        )}
      </div>

      <Reveal delay={0.05} className="mt-12">
        <Screenshot
          shot={hero}
          lang={lang}
          sizes="(min-width: 1024px) 64rem, 100vw"
        />
      </Reveal>

      {extra.length > 0 && (
        <div className="mt-8 grid items-start gap-8 sm:grid-cols-[1fr_14rem]">
          {extra.map((shot, i) => (
            <Reveal
              key={shot.alt.en}
              delay={0.05 * (i + 1)}
              className={clsx(
                shot.kind === 'phone' && 'mx-auto w-full max-w-56',
              )}
            >
              <Screenshot
                shot={shot}
                lang={lang}
                sizes={
                  shot.kind === 'phone'
                    ? '14rem'
                    : '(min-width: 1024px) 48rem, 100vw'
                }
              />
            </Reveal>
          ))}
        </div>
      )}
    </article>
  )
}
