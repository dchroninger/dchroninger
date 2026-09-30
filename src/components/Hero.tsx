'use client'

import { motion, useReducedMotion } from 'motion/react'

import { Container } from '@/components/Container'
import { KanjiMorph } from '@/components/KanjiMorph'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { CONTACT_EMAIL } from '@/lib/site'

const EASE = [0.16, 1, 0.3, 1] as const

const LINES = [
  { text: 'Professional curious person.', accent: false },
  { text: 'Perpetual learner.', accent: false },
  { text: 'Tinkerer.', accent: true },
]

function Word({ children, delay }: { children: string; delay: number }) {
  let reduce = useReducedMotion()
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: '110%', rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function fade(delay: number, reduce: boolean | null) {
  return {
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  } as const
}

export function Hero() {
  let reduce = useReducedMotion()
  let n = 0

  return (
    <Container className="mt-9">
      <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <motion.p
            {...fade(0.05, reduce)}
            className="font-mono text-xs tracking-wider text-accent uppercase"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            こんにちは · hello
          </motion.p>

          <h1 className="mt-5 text-5xl leading-[1.04] font-bold tracking-tight text-ink sm:text-6xl">
            {LINES.map((line) => (
              <span key={line.text} className="block">
                <span className={line.accent ? 'text-accent' : undefined}>
                  {line.text.split(' ').map((w) => (
                    <span key={w + n}>
                      <Word delay={0.15 + n++ * 0.07}>{w}</Word>{' '}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(0.7, reduce)}
            className="mt-7 max-w-xl text-base text-body"
          >
            Hey there! I’m Dave, an experienced software engineer and solutions
            architect, dog dad, car enthusiast, and enjoyer of Japanese culture,
            language, and media. I’m currently enrolled in WGU’s Accelerated
            Computer Science Bachelor’s and Master’s program, wrapping up the
            B.S. in January 2027, and preparing to take the JLPT N2 next year. I
            spend my days designing and building pretty cool stuff, and then my
            downtime exploring manga, anime, and turning my Genesis Coupe into a
            passion project. Welcome to my little slice of the internet.
          </motion.p>

          <motion.div
            {...fade(0.85, reduce)}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:brightness-110"
            >
              Say hi
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <div className="flex gap-5">
              <a
                className="group -m-1 p-1"
                href="https://github.com/dchroninger"
                aria-label="Dave on GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon className="h-6 w-6 fill-muted transition group-hover:fill-accent" />
              </a>
              <a
                className="group -m-1 p-1"
                href="https://www.linkedin.com/in/davidchroninger/"
                aria-label="Dave on LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="h-6 w-6 fill-muted transition group-hover:fill-accent" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="mx-auto w-full max-w-sm lg:max-w-none"
        >
          <KanjiMorph />
        </motion.div>
      </div>
    </Container>
  )
}
