import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
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
          Page not found
        </h1>
        <p className="mt-4 text-base text-body">
          You’ve wandered off the map. (迷子 — “lost child”. It happens.)
        </p>
        <Button href="/" variant="secondary" className="mt-6">
          Go back home
        </Button>
      </div>
    </Container>
  )
}
