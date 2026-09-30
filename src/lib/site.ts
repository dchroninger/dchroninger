export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dchroninger.com'
).replace(/\/$/, '')

export const SITE_NAME = 'Dave Chroninger'
// Each language site has its own inbox.
export const CONTACT_EMAILS = {
  en: 'info@dchroninger.com',
  ja: 'info.jp@dchroninger.com',
} as const

export function contactEmail(lang: keyof typeof CONTACT_EMAILS) {
  return CONTACT_EMAILS[lang]
}
