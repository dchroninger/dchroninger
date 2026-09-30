import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base text-body">{intro}</p>
        </Reveal>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
