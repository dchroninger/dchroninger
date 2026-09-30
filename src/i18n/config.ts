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

/** Set when a visitor explicitly picks a language with the toggle. */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

/**
 * Best supported language from an Accept-Language header
 * ("ja,en-US;q=0.9,en;q=0.8" → 'ja'), or null if neither is listed.
 */
export function preferredLocale(header: string | null): Locale | null {
  if (!header) return null
  let ranked = header
    .split(',')
    .map((part, index) => {
      let [tag, ...params] = part.trim().split(';')
      let q = Number(
        params.find((p) => p.trim().startsWith('q='))?.split('=')[1],
      )
      return {
        lang: tag.trim().toLowerCase().split('-')[0],
        q: Number.isFinite(q) ? q : 1,
        index,
      }
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)
  for (let { lang } of ranked) {
    if (isLocale(lang)) return lang
  }
  return null
}
