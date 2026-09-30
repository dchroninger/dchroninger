'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useT } from '@/i18n/LangProvider'

export default function NotFound() {
  let t = useT()

  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="font-mono text-base font-semibold text-accent">404</p>
        <p
          aria-hidden="true"
          className="mt-2 font-serif text-8xl text-accent/30"
        >
          迷
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-base text-body">{t.notFound.body}</p>
        <Button href="/" variant="secondary" className="mt-6">
          {t.notFound.home}
        </Button>
      </div>
    </Container>
  )
}
