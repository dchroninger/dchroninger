import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Reveal } from '@/components/Reveal'
import { SimpleLayout } from '@/components/SimpleLayout'
import { HAS_PROJECTS, projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A short, hand-picked list of things I’ve built: apps, tools, and experiments.',
  alternates: { canonical: '/projects' },
  robots: HAS_PROJECTS ? undefined : { index: false },
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro={
        HAS_PROJECTS
          ? 'A short, hand-picked list of things I’ve built: apps, tools, and experiments.'
          : 'I’m picking a short, intentional list to show here, with screenshots. Check back soon.'
      }
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
                    alt={`Screenshot of ${project.name}`}
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
                  <Card.Cta>{project.label ?? 'View project'}</Card.Cta>
                )}
              </Card>
            </Reveal>
          ))}
        </ul>
      )}
    </SimpleLayout>
  )
}
