import { type Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { TransitionLink as Link } from '@/components/TransitionLink'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/shogi.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-ink transition hover:text-accent"
      >
        <Icon className="h-6 w-6 flex-none fill-muted transition group-hover:fill-accent" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Dave: software engineer, Japanese learner, dog dad, and car tinkerer. Here’s the longer version of who I am and what I’m into.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Dave crouching on a grassy trail, petting a husky"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-surface-2 object-cover shadow-2xl shadow-black/10 ring-1 ring-line transition duration-500 hover:rotate-0"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
            I’m <span className="text-accent">Dave</span>
            —software engineer, Japanese learner, and endlessly curious human.
          </h1>
          <div className="mt-6 space-y-7 text-base text-body">
            <p>
              I’ve always been fascinated by figuring out how things work, which
              naturally drew me into software engineering. What started as
              self-teaching and experimentation eventually became my full-time
              career. I’ve spent the last several years coding, solving
              problems, and leading teams of smart, interesting people. My
              favorite part of software engineering is the endless opportunities
              to learn new things. There’s always something fresh to explore,
              and that keeps things exciting.
            </p>
            <p>
              I’ve casually studied Japanese for a couple of years now, but
              recently my wife and I dove in headfirst by pursuing an
              Associate’s degree together. It’s an exciting challenge and deeply
              rewarding. I’m tackling this language adventure while also working
              toward my Bachelor’s in Computer Science, blending my passion for
              technology with my love for Japanese culture and language
              learning.
            </p>
            <p>
              Cars are more than just transportation to me. They’re a way to
              express creativity and explore engineering hands-on. I currently
              own two passion-project cars: a 1993 Nissan Gloria and a widebody
              2012 Genesis Coupe. They’re both labors of love, endless sources
              of tinkering and enjoyment, and yes, occasionally frustrating (and
              expensive!). These projects fuel my curiosity and give me space to
              unwind, learn, and experiment.
            </p>
            <p>
              When I’m not buried in code or car projects, you’ll often find me
              deep in manga or anime. These stories offer fresh perspectives and
              storytelling styles that keep me coming back. Beyond Japanese
              culture, I’m just endlessly curious. I’ll happily spend hours
              watching YouTube deep-dives or reading articles on random topics
              just because something caught my interest. There’s always
              something fascinating waiting to be learned, and I’m always eager
              to discover what it is.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/dchroninger"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/davidchroninger/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:info@dchroninger.com"
              icon={MailIcon}
              className="mt-8 border-t border-line pt-8"
            >
              info@dchroninger.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
