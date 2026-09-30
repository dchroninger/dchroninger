import { NextResponse, type NextRequest } from 'next/server'

import { isLocale, LOCALE_COOKIE, preferredLocale } from '@/i18n/config'

/**
 * English lives at unprefixed URLs (/about), Japanese under /ja (/ja/about).
 * Internally every page is served from app/[lang], so English requests are
 * rewritten to /en/... and any explicit /en/... URL is redirected to the
 * clean, unprefixed form.
 *
 * Auto-detect: on a *page load* of an unprefixed URL, visitors who have not
 * picked a language yet and whose browser prefers Japanese are redirected to
 * /ja. Picking a language with the toggle sets a cookie that wins from then on.
 */
export function middleware(request: NextRequest) {
  let url = request.nextUrl.clone()
  let { pathname } = url

  // Static files (images, favicon, ...) — but let feed.xml through
  if (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith('/feed.xml')) {
    return NextResponse.next()
  }

  if (pathname === '/ja' || pathname.startsWith('/ja/')) {
    return NextResponse.next()
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  // English URL. Should this visitor be on the Japanese site instead?
  let isPageLoad = request.headers.get('accept')?.includes('text/html')
  if (isPageLoad && !pathname.endsWith('/feed.xml')) {
    let saved = request.cookies.get(LOCALE_COOKIE)?.value
    let wanted = isLocale(saved)
      ? saved
      : preferredLocale(request.headers.get('accept-language'))

    if (wanted === 'ja') {
      url.pathname = `/ja${pathname === '/' ? '' : pathname}`
      let response = NextResponse.redirect(url, 307)
      response.headers.set('Vary', 'Accept-Language, Cookie')
      return response
    }
  }

  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)',
  ],
}
