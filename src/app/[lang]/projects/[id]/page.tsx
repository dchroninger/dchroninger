import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectDetail } from '@/components/ProjectDetail'
import { locales, localePath, type Locale } from '@/i18n/config'
import { projects } from '@/lib/projects'
import { SITE_NAME } from '@/lib/site'

type Params = { lang: string; id: string }

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, id: p.id })))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  let lang = params.lang as Locale
  let project = projects.find((p) => p.id === params.id)
  if (!project) return {}
  let path = `/projects/${project.id}`
  return {
    title: project.name,
    description: project.tagline[lang],
    alternates: {
      canonical: localePath(lang, path),
      languages: {
        en: localePath('en', path),
        ja: localePath('ja', path),
        'x-default': localePath('en', path),
      },
    },
    openGraph: {
      title: project.name,
      description: project.tagline[lang],
      siteName: SITE_NAME,
      images: [
        {
          url: project.cover.light.src,
          width: project.cover.light.width,
          height: project.cover.light.height,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }: { params: Params }) {
  let project = projects.find((p) => p.id === params.id)
  if (!project) notFound()
  return <ProjectDetail project={project} lang={params.lang as Locale} />
}
