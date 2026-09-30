/* eslint-disable react/no-unescaped-entities */
import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { Rich } from '@/components/Rich'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getDictionary } from '@/i18n'
import { type Locale } from '@/i18n/config'
import { pageMetadata } from '@/i18n/metadata'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-5">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  let lang = params.lang as Locale
  return pageMetadata(lang, '/uses', getDictionary(lang).meta.uses)
}

export default function Uses({ params }: { params: { lang: string } }) {
  let t = getDictionary(params.lang as Locale)

  return (
    <SimpleLayout title={t.uses.title} intro={t.uses.intro}>
      <div className="space-y-20">
        {t.uses.sections.map((section) => (
          <ToolsSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <Tool key={item.title} title={item.title}>
                <Rich text={item.body} strongClassName="font-bold text-ink" />
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
