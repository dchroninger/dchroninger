import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Reveal } from '@/components/Reveal'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDictionary } from '@/i18n'
import { fmt, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/i18n/metadata'
import { HAS_PROJECTS, projects } from '@/lib/projects'

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  let lang = params.lang as Locale
  return pageMetadata(lang, '/projects', {
    ...getDictionary(lang).meta.projects,
    noindex: !HAS_PROJECTS,
  })
}

export default function Projects({ params }: { params: { lang: string } }) {
  let t = getDictionary(params.lang as Locale)
  return (
    <SimpleLayout
      title={t.projects.title}
      intro={HAS_PROJECTS ? t.projects.intro : t.projects.introEmpty}
    >
      {HAS_PROJECTS && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <Reveal
              as="li"
              key={project.name}
              delay={i * 0.06}
              className="flex"
            >
              <Card className="w-full">
                {project.screenshot && (
                  <Image
                    src={project.screenshot}
                    alt={fmt(t.projects.screenshotOf, { name: project.name })}
                    sizes="(min-width: 1024px) 20rem, 90vw"
                    className="relative z-10 mb-6 aspect-video w-full rounded-xl object-cover ring-1 ring-line"
                  />
                )}
                {project.logo && (
                  <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-black/5 ring-line">
                    <Image
                      src={project.logo}
                      alt=""
                      className="h-8 w-8 rounded-full"
                      unoptimized
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold tracking-tight text-ink">
                  {project.href ? (
                    <Card.Link href={project.href}>{project.name}</Card.Link>
                  ) : (
                    project.name
                  )}
                </h2>
                <Card.Description>{project.description}</Card.Description>
                {project.href && (
                  <Card.Cta>{project.label ?? t.projects.view}</Card.Cta>
                )}
              </Card>
            </Reveal>
          ))}
        </ul>
      )}
    </SimpleLayout>
  )
}
