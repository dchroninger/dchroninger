import { type Metadata, type Viewport } from 'next'
import {
  Archivo,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
} from 'next/font/google'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, PALETTES } from '@/lib/palettes'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/site'

import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})
// One display face per palette — see --f-display in tailwind.css
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
})
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  preload: false, // only fetched if that palette is chosen
})
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    template: `%s - ${SITE_NAME}`,
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f1ea' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a0d' },
  ],
}

// Runs before paint so the saved palette never flashes the default.
const paletteInit = `try{var p=localStorage.getItem('${PALETTE_STORAGE_KEY}');if(!${JSON.stringify(PALETTES.map((x) => x.id))}.includes(p))p='${DEFAULT_PALETTE}';document.documentElement.dataset.palette=p}catch(e){document.documentElement.dataset.palette='${DEFAULT_PALETTE}'}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-palette={DEFAULT_PALETTE}
      className={clsx(
        'h-full antialiased',
        inter.variable,
        jetbrains.variable,
        archivo.variable,
        instrument.variable,
        manrope.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteInit }} />
      </head>
      <body className="grain flex h-full bg-paper">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
