import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { ThemedShot } from '@/components/ThemedShot'
import { TransitionLink } from '@/components/TransitionLink'
import { getDictionary } from '@/i18n'
import { type Locale } from '@/i18n/config'
import { type Project, type Shot } from '@/lib/projects'

function Figure({ shot, lang }: { shot: Shot; lang: Locale }) {
  let phone = shot.kind === 'phone'
  return (
    <figure>
      <ThemedShot
        shot={shot}
        lang={lang}
        sizes={
          phone
            ? '(min-width: 1024px) 18rem, 70vw'
            : '(min-width: 1024px) 64rem, 100vw'
        }
        className={clsx(
          'overflow-hidden bg-surface-2 shadow-2xl ring-1 shadow-black/15 ring-line',
          phone ? 'rounded-[2rem]' : 'rounded-xl',
        )}
      />
      {shot.caption && (
        <figcaption className="mt-3 font-mono text-xs text-muted">
          {shot.caption[lang]}
        </figcaption>
      )}
    </figure>
  )
}

/** Web shots full width; consecutive phone shots share a row. */
function groupShots(shots: Shot[]) {
  let groups: Shot[][] = []
  for (let shot of shots) {
    let last = groups.at(-1)
    if (shot.kind === 'phone' && last?.[0].kind === 'phone') last.push(shot)
    else groups.push([shot])
  }
  return groups
}

export function ProjectDetail({
  project,
  lang,
}: {
  project: Project
  lang: Locale
}) {
  let t = getDictionary(lang)

  return (
    <Container className="mt-16 sm:mt-24">
      <TransitionLink
        href="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-accent"
      >
        <span
          aria-hidden="true"
          className="transition group-hover:-translate-x-0.5"
        >
          ←
        </span>
        {t.projects.back}
      </TransitionLink>

      <header className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-5">
            <Image
              src={project.logo}
              alt=""
              priority
              className="h-20 w-20 rounded-[1.4rem] shadow-xl ring-1 shadow-black/15 ring-line"
            />
            <div>
              <h1 className="vt-post-title text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {project.name}
              </h1>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {project.status[lang]}
              </span>
            </div>
          </div>
          <p className="mt-8 text-xl font-medium text-ink">
            {project.tagline[lang]}
          </p>
          <p className="mt-4 text-base text-body">
            {project.description[lang]}
          </p>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:brightness-110"
            >
              {project.label?.[lang] ?? t.projects.view} ↗
            </a>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-xs tracking-wider text-accent uppercase">
            {t.projects.builtWith}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted ring-1 ring-line"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <Reveal delay={0.05} className="mt-12">
        <p className="font-mono text-xs tracking-wider text-accent uppercase">
          {t.projects.highlights}
        </p>
        <ul className="mt-4 grid gap-x-10 gap-y-4 text-sm text-body sm:grid-cols-2">
          {project.highlights[lang].map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 space-y-14">
        {groupShots(project.gallery).map((group) => (
          <Reveal
            key={group[0].alt.en}
            className={clsx(
              group[0].kind === 'phone' &&
                'mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:gap-10',
              group[0].kind === 'phone' &&
                group.length >= 3 &&
                'max-w-5xl sm:grid-cols-3',
            )}
          >
            {group.map((shot) => (
              <Figure key={shot.alt.en} shot={shot} lang={lang} />
            ))}
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
