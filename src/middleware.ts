import { NextResponse, type NextRequest } from 'next/server'

/**
 * English lives at unprefixed URLs (/about), Japanese under /ja (/ja/about).
 * Internally every page is served from app/[lang], so English requests are
 * rewritten to /en/... and any explicit /en/... URL is redirected to the
 * clean, unprefixed form.
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

  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)'],
}
