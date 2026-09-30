export const locales = ['en', 'ja'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/** '/about' + 'ja' → '/ja/about'. English (default) stays unprefixed. */
export function localePath(lang: Locale, path: string) {
  let clean = path === '/' ? '' : path
  return lang === defaultLocale ? clean || '/' : `/${lang}${clean}`
}

/** '/ja/about' → { lang: 'ja', path: '/about' }; '/about' → { lang: 'en', path: '/about' } */
export function parseLocalePath(pathname: string): {
  lang: Locale
  path: string
} {
  let match = pathname.match(/^\/(en|ja)(\/.*)?$/)
  if (match) return { lang: match[1] as Locale, path: match[2] || '/' }
  return { lang: defaultLocale, path: pathname || '/' }
}

export function otherLocale(lang: Locale): Locale {
  return lang === 'en' ? 'ja' : 'en'
}

/** Tiny template helper: fmt('Copied {email}', { email }) */
export function fmt(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}
