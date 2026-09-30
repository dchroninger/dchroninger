import Image from 'next/image'

import { ThemedShot } from '@/components/ThemedShot'
import { TransitionLink } from '@/components/TransitionLink'
import { type Locale } from '@/i18n/config'
import { type Project } from '@/lib/projects'

const MAX_TAGS = 4

export function ProjectCard({
  project,
  lang,
  priority,
}: {
  project: Project
  lang: Locale
  priority?: boolean
}) {
  let { cover } = project
  let extraTags = project.tags.length - MAX_TAGS

  return (
    <article
      data-vt-card
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface/70 ring-1 ring-line backdrop-blur-sm transition duration-300 hover:-translate-y-1"
    >
      {/* cover */}
      <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
        {cover.kind === 'phone' ? (
          <div className="absolute inset-0 flex justify-center bg-linear-to-br from-accent/25 via-surface-2 to-accent-2/20 px-10 pt-8">
            <ThemedShot
              shot={cover}
              lang={lang}
              priority={priority}
              sizes="(min-width: 1024px) 14rem, 50vw"
              className="w-[46%] max-w-56 overflow-hidden rounded-t-[1.6rem] shadow-2xl ring-1 shadow-black/25 ring-black/10 transition duration-700 group-hover:-translate-y-2"
            />
          </div>
        ) : (
          <ThemedShot
            shot={cover}
            lang={lang}
            priority={priority}
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="absolute inset-0"
            imgClassName="h-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/25 to-transparent" />
      </div>

      {/* body */}
      <div className="relative flex flex-auto flex-col px-6 pt-10 pb-6">
        <Image
          src={project.logo}
          alt=""
          className="absolute -top-8 left-6 h-16 w-16 rounded-[1.1rem] shadow-xl ring-2 shadow-black/20 ring-surface"
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2
            data-vt-title
            className="text-xl font-bold tracking-tight text-ink"
          >
            <TransitionLink href={`/projects/${project.id}`}>
              <span className="absolute inset-0 z-20 rounded-3xl" />
              {project.name}
            </TransitionLink>
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.status[lang]}
          </span>
        </div>
        <p className="mt-3 text-sm text-body">{project.tagline[lang]}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.slice(0, MAX_TAGS).map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted ring-1 ring-line"
            >
              {tag}
            </li>
          ))}
          {extraTags > 0 && (
            <li className="px-1 py-0.5 font-mono text-xs text-faint">
              +{extraTags}
            </li>
          )}
        </ul>
      </div>
    </article>
  )
}
