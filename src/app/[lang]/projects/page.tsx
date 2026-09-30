import { type Metadata } from 'next'

import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDictionary } from '@/i18n'
import { type Locale } from '@/i18n/config'
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
  let lang = params.lang as Locale
  let t = getDictionary(lang)
  return (
    <SimpleLayout
      title={t.projects.title}
      intro={HAS_PROJECTS ? t.projects.intro : t.projects.introEmpty}
    >
      {HAS_PROJECTS && (
        <ul role="list" className="grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.id}>
              <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                <ProjectCard project={project} lang={lang} priority={i < 2} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </SimpleLayout>
  )
}
