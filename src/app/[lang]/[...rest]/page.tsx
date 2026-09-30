import { notFound } from 'next/navigation'

// Any unmatched URL under a locale lands here so it renders the styled,
// localized not-found page (inside the [lang] layout).
export default function CatchAll() {
  notFound()
}
