import { type Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { PhotoMarquee } from '@/components/PhotoMarquee'
import { Reveal } from '@/components/Reveal'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { TransitionLink } from '@/components/TransitionLink'
import { WorkTimeline } from '@/components/WorkTimeline'
import genesisPhoto from '@/images/photos/genesis.jpeg'
import shogiPhoto from '@/images/photos/shogi.jpeg'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { photos } from '@/lib/photos'
import { CV_URL, roles, SHOW_CV, SHOW_WORK } from '@/lib/resume'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Tile({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Reveal delay={delay} className={clsx('flex', className)}>
      <div className="spotlight relative flex w-full flex-col overflow-hidden rounded-3xl bg-surface/70 p-6 ring-1 ring-line backdrop-blur-sm sm:p-7">
        {children}
      </div>
    </Reveal>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-wider text-accent uppercase">
      {children}
    </p>
  )
}

function PhotoTile({
  src,
  alt,
  label,
  caption,
  className,
  delay,
}: {
  src: typeof genesisPhoto
  alt: string
  label: string
  caption: string
  className?: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className={clsx('flex', className)}>
      <div className="spotlight group relative min-h-72 w-full overflow-hidden rounded-3xl ring-1 ring-line">
        <Image
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <p className="font-mono text-xs tracking-wider text-white/70 uppercase">
            {label}
          </p>
          <p className="mt-1 text-lg font-semibold text-white">{caption}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default async function Home() {
  let articles = await getAllArticles()
  let latest = articles[0]

  return (
    <>
      <Hero />
      <PhotoMarquee photos={photos} />

      <Container className="mt-20 md:mt-28">
        <Reveal>
          <p className="font-mono text-xs tracking-wider text-faint uppercase">
            Right now
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            A few things I’m into.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-6">
          <Tile className="lg:col-span-3">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-10 font-serif text-[11rem] leading-none text-accent/10 select-none"
            >
              学
            </span>
            <Label>Learning</Label>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              Two long games, at once.
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-body">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>
                  <strong className="font-semibold text-ink">
                    WGU Accelerated CS, B.S. + M.S.
                  </strong>
                  <br />
                  Finishing the bachelor’s in January 2027.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-2" />
                <span>
                  <strong className="font-semibold text-ink">JLPT N2</strong>
                  <br />
                  Sitting the exam next year. 頑張ります。
                </span>
              </li>
            </ul>
          </Tile>

          <PhotoTile
            className="lg:col-span-3"
            src={genesisPhoto}
            alt="A blue widebody Genesis Coupe parked under tall trees"
            label="Garage"
            caption="2012 Genesis Coupe. A labor of love (and money)."
            delay={0.08}
          />

          <Tile className="lg:col-span-2" delay={0.04}>
            {latest?.image && (
              <div className="relative -mx-6 -mt-6 mb-5 aspect-16/10 overflow-hidden sm:-mx-7 sm:-mt-7">
                <Image
                  src={latest.image}
                  alt={latest.imageAlt ?? ''}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: latest.imagePosition }}
                />
              </div>
            )}
            <Label>Latest writing</Label>
            {latest ? (
              <>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                  <TransitionLink href={`/articles/${latest.slug}`}>
                    <span className="absolute inset-0 z-10" />
                    {latest.title}
                  </TransitionLink>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-body">
                  {latest.description}
                </p>
                <p className="mt-auto pt-5 font-mono text-xs text-faint">
                  {formatDate(latest.date)}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-body">Posts coming soon.</p>
            )}
          </Tile>

          <PhotoTile
            className="lg:col-span-2"
            src={shogiPhoto}
            alt="Dave crouching on a grassy trail, petting a husky"
            label="Home"
            caption="Dog dad, full time."
            delay={0.08}
          />

          <Tile className="lg:col-span-2" delay={0.12}>
            <Label>Elsewhere</Label>
            <ul className="mt-4 space-y-1 text-sm font-medium text-ink">
              {[
                {
                  href: 'https://github.com/dchroninger',
                  label: 'GitHub',
                  icon: GitHubIcon,
                },
                {
                  href: 'https://www.linkedin.com/in/davidchroninger/',
                  label: 'LinkedIn',
                  icon: LinkedInIcon,
                },
              ].map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-surface-2"
                  >
                    <Icon className="h-5 w-5 fill-muted transition group-hover:fill-accent" />
                    {label}
                    <span
                      aria-hidden="true"
                      className="ml-auto text-faint transition group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-surface-2"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center text-muted transition group-hover:text-accent"
                  >
                    ✉
                  </span>
                  Email
                  <span
                    aria-hidden="true"
                    className="ml-auto text-faint transition group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </Tile>

          {SHOW_WORK && (
            <Tile className="lg:col-span-6" delay={0.04}>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <div>
                  <Label>The day job</Label>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                    Building software for healthcare.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-body">
                    Web developer to engineering manager and architect. The
                    résumé bits, for anyone who’s into that.
                  </p>
                  {SHOW_CV && (
                    <Button
                      href={CV_URL}
                      variant="secondary"
                      className="group relative z-10 mt-6"
                    >
                      Download CV
                      <ArrowDownIcon className="h-4 w-4 stroke-current transition group-hover:translate-y-0.5" />
                    </Button>
                  )}
                </div>
                <WorkTimeline roles={roles} />
              </div>
            </Tile>
          )}
        </div>
      </Container>
    </>
  )
}
