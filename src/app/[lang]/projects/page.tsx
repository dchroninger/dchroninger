import { type Metadata } from 'next'

import { ProjectShowcase } from '@/components/ProjectShowcase'
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
        <div className="space-y-16">
          {projects.map((project) => (
            <ProjectShowcase key={project.id} project={project} lang={lang} />
          ))}
        </div>
      )}
    </SimpleLayout>
  )
}
