import { type Metadata, type Viewport } from 'next'
import {
  Archivo,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
  Noto_Sans_JP,
  Shippori_Mincho,
} from 'next/font/google'
import { notFound } from 'next/navigation'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { LangProvider } from '@/i18n/LangProvider'
import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, PALETTES } from '@/lib/palettes'
import { SITE_NAME, SITE_URL } from '@/lib/site'

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
// Japanese glyph fallbacks (the Latin faces above have no kanji/kana).
// Only the slices a page actually uses are downloaded by the browser.
const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  preload: false,
})
const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-shippori',
  preload: false,
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {}
  let lang = params.lang
  let t = getDictionary(lang)
  let title = `${SITE_NAME} - ${t.meta.tagline}`

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: { template: `%s - ${SITE_NAME}`, default: title },
    description: t.meta.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    alternates: {
      canonical: localePath(lang, '/'),
      languages: {
        en: localePath('en', '/'),
        ja: localePath('ja', '/'),
        'x-default': localePath('en', '/'),
      },
      types: {
        'application/rss+xml': `${SITE_URL}${localePath(lang, '/feed.xml')}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description: t.meta.description,
      url: `${SITE_URL}${localePath(lang, '/')}`,
      locale: t.meta.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  }
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
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLocale(params.lang)) notFound()
  let lang = params.lang

  return (
    <html
      lang={lang}
      data-palette={DEFAULT_PALETTE}
      className={clsx(
        'h-full antialiased',
        inter.variable,
        jetbrains.variable,
        archivo.variable,
        instrument.variable,
        manrope.variable,
        notoJp.variable,
        shippori.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteInit }} />
      </head>
      <body className="grain flex h-full bg-paper">
        <LangProvider lang={lang} dictionary={getDictionary(lang)}>
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </Providers>
        </LangProvider>
      </body>
    </html>
  )
}
