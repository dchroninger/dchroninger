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
  MailIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/osaka-bridge.jpeg'

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
              alt="Dave leaning on a wooden bridge railing, looking out at the neon signs and giant Ferris wheel of Dotonbori in Osaka"
              sizes="(min-width: 1024px) 32rem, 20rem"
              style={{ objectPosition: '50% 78%' }}
              className="aspect-square rotate-3 rounded-2xl bg-surface-2 object-cover shadow-2xl ring-1 shadow-black/10 ring-line transition duration-500 hover:rotate-0"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
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
              I’ve casually studied Japanese for a couple of years now, and I’m
              currently working toward the JLPT N2, which I plan to take next
              year. Alongside that, I’m in WGU’s Accelerated Computer Science
              program, wrapping up my Bachelor’s in January 2027 with the
              Master’s right behind it. It’s a fun way to blend my passion for
              technology with my love for Japanese culture and language
              learning.
            </p>
            <p>
              Cars are more than just transportation to me. They’re a way to
              express creativity and explore engineering hands-on. My current
              passion project is a widebody 2012 Genesis Coupe. It’s a labor of
              love, an endless source of tinkering and enjoyment, and yes,
              occasionally frustrating (and expensive!). It fuels my curiosity
              and gives me space to unwind, learn, and experiment.
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
