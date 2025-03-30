import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Dave Chroninger',
    default: 'Dave Chroninger - husband, engineer, learner',
  },
  description:
    "Welcome! I'm Dave. I'm a husband, software engineer, leader, and learner. After years of 'I'll get to it after the next project', I decided to finally just ship something and get this going. This blog is going to be a collection of my thoughts on software, my journey through learning Japanese, travel, and my hobbies. You can think of this as the place anyone can go to learn about me or get in touch to collaborate. First and foremost it's my place to document my thoughts and my growth.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
