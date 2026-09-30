'use client'

import { motion, useReducedMotion } from 'motion/react'

import { Container } from '@/components/Container'
import { EmailLink } from '@/components/EmailLink'
import { KanjiMorph } from '@/components/KanjiMorph'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/SocialIcons'
import { fmt } from '@/i18n/config'
import { useLang, useT } from '@/i18n/LangProvider'
import { contactEmail } from '@/lib/site'

const EASE = [0.16, 1, 0.3, 1] as const

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
  let t = useT()
  let lang = useLang()
  let n = 0
  let LINES = t.hero.lines.map((text, i, all) => ({
    text,
    accent: i === all.length - 1,
  }))

  return (
    <Container className="mt-9">
      <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <motion.p
            {...fade(0.05, reduce)}
            className="font-mono text-xs tracking-wider text-accent uppercase"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            {t.hero.hello}
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
            {t.hero.bio}
          </motion.p>

          <motion.div
            {...fade(0.85, reduce)}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex gap-5">
              <a
                className="group -m-1 p-1"
                href="https://github.com/dchroninger"
                aria-label={t.social.github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon className="h-6 w-6 fill-muted transition group-hover:fill-accent" />
              </a>
              <a
                className="group -m-1 p-1"
                href="https://www.linkedin.com/in/davidchroninger/"
                aria-label={t.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="h-6 w-6 fill-muted transition group-hover:fill-accent" />
              </a>
              <EmailLink
                className="group -m-1 p-1"
                aria-label={fmt(t.email.aria, { email: contactEmail(lang) })}
              >
                <MailIcon className="h-6 w-6 fill-muted transition group-hover:fill-accent" />
              </EmailLink>
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
