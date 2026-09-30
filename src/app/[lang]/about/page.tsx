import { type Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { EmailLink } from '@/components/EmailLink'
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
import { getDictionary } from '@/i18n'
import { type Locale } from '@/i18n/config'
import { pageMetadata } from '@/i18n/metadata'
import { Rich } from '@/components/Rich'
import { contactEmail } from '@/lib/site'

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
      {href.startsWith('mailto:') ? (
        <EmailLink className="group flex text-sm font-medium text-ink transition hover:text-accent">
          <Icon className="h-6 w-6 flex-none fill-muted transition group-hover:fill-accent" />
          <span className="ml-4">{children}</span>
        </EmailLink>
      ) : (
        <Link
          href={href}
          className="group flex text-sm font-medium text-ink transition hover:text-accent"
        >
          <Icon className="h-6 w-6 flex-none fill-muted transition group-hover:fill-accent" />
          <span className="ml-4">{children}</span>
        </Link>
      )}
    </li>
  )
}

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  let lang = params.lang as Locale
  return pageMetadata(lang, '/about', getDictionary(lang).meta.about)
}

export default function About({ params }: { params: { lang: string } }) {
  let lang = params.lang as Locale
  let t = getDictionary(lang)
  let email = contactEmail(lang)
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt={t.about.photoAlt}
              sizes="(min-width: 1024px) 32rem, 20rem"
              style={{ objectPosition: '50% 78%' }}
              className="aspect-square rotate-3 rounded-2xl bg-surface-2 object-cover shadow-2xl ring-1 shadow-black/10 ring-line transition duration-500 hover:rotate-0"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
            <Rich text={t.about.title} strongClassName="text-accent" />
          </h1>
          <div className="mt-6 space-y-7 text-base text-body">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/dchroninger"
              icon={GitHubIcon}
              className="mt-4"
            >
              {t.social.followGithub}
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/davidchroninger/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              {t.social.followLinkedin}
            </SocialLink>
            <SocialLink
              href={`mailto:${email}`}
              icon={MailIcon}
              className="mt-8 border-t border-line pt-8"
            >
              {email}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
