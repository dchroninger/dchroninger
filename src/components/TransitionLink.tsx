'use client'

import { forwardRef } from 'react'
import Link from 'next/link'

import { useNavTransition } from '@/app/providers'
import { localePath } from '@/i18n/config'
import { useLang } from '@/i18n/LangProvider'

/**
 * Drop-in for next/link that wraps client navigation in a View Transition.
 * Falls back to a normal Link when the API is unsupported / reduced motion.
 */
export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(function TransitionLink({ onClick, href, ...props }, ref) {
  let navigate = useNavTransition()
  let lang = useLang()

  // Internal links get the current language prefix automatically.
  function localize(h: string) {
    if (!h.startsWith('/') || /^\/(ja|en)(\/|$|\?|#)/.test(h)) return h
    return localePath(lang, h)
  }
  let localized = typeof href === 'string' ? localize(href) : href

  return (
    <Link
      ref={ref}
      href={localized}
      onClick={(e) => {
        onClick?.(e)
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          props.target === '_blank'
        )
          return
        let url = typeof localized === 'string' ? localized : localized.pathname
        if (!url || !url.startsWith('/')) return
        if (navigate(url, e.currentTarget)) e.preventDefault()
      }}
      {...props}
    />
  )
})
