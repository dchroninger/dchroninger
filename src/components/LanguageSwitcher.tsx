'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'

import { useNavTransition } from '@/app/providers'
import {
  localePath,
  otherLocale,
  parseLocalePath,
  type Locale,
} from '@/i18n/config'
import { useLang, useT } from '@/i18n/LangProvider'

/** Where "the other language" lives for the page we're on. */
function useSwitch() {
  let lang = useLang()
  let t = useT()
  let pathname = usePathname()
  let router = useRouter()
  let navigate = useNavTransition()

  let target = otherLocale(lang)
  let href = localePath(target, parseLocalePath(pathname).path)

  return {
    lang,
    target,
    label: target === 'ja' ? t.a11y.switchToJapanese : t.a11y.switchToEnglish,
    go() {
      if (!navigate(href)) router.push(href)
    },
  }
}

/* ------------------------------------------------------------------ */
/* Flag in a circle. Hover splits it diagonally (US / JP).            */
/* ------------------------------------------------------------------ */

function UsFlag() {
  let stripes = Array.from({ length: 13 }, (_, i) => i)
  return (
    <svg
      viewBox="0 0 60 60"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="60" height="60" fill="#fff" />
      {stripes
        .filter((i) => i % 2 === 0)
        .map((i) => (
          <rect
            key={i}
            y={(i * 60) / 13}
            width="60"
            height={60 / 13}
            fill="#B22234"
          />
        ))}
      <rect width="30" height={(7 * 60) / 13} fill="#3C3B6E" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={i}
          cx={5 + (i % 4) * 7.2}
          cy={5.5 + Math.floor(i / 4) * 8.6}
          r="1.25"
          fill="#fff"
        />
      ))}
    </svg>
  )
}

function JpFlag() {
  return (
    <svg
      viewBox="0 0 60 60"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="60" height="60" fill="#fff" />
      <circle cx="30" cy="30" r="15" fill="#BC002D" />
    </svg>
  )
}

// Survives a remount (the layout re-renders when the language changes), so a
// pointer still resting on the button doesn't replay the hover animation.
let hoverLocked = false

function Flag({ lang }: { lang: Locale }) {
  return lang === 'en' ? <UsFlag /> : <JpFlag />
}

export function FlagLanguageToggle({ className }: { className?: string }) {
  let { lang, target, label, go } = useSwitch()
  let [state, setState] = useState<'rest' | 'switching'>('rest')
  let [locked, setLocked] = useState(hoverLocked)

  return (
    <button
      type="button"
      aria-label={label}
      title={lang === 'en' ? '日本語' : 'English'}
      data-state={state}
      data-lock={locked ? '' : undefined}
      onPointerLeave={() => {
        hoverLocked = false
        setLocked(false)
      }}
      onClick={() => {
        if (state === 'switching') return
        hoverLocked = true
        setLocked(true)
        setState('switching')
        // let the flag finish filling the circle before the page changes
        let reduce = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
        setTimeout(go, reduce ? 0 : 380)
      }}
      className={clsx(
        'flagswitch group relative h-10 w-10 flex-none rounded-full bg-surface/80 p-[7px] shadow-lg ring-1 shadow-black/5 ring-line backdrop-blur-md transition hover:ring-accent/50 focus-visible:ring-accent/60',
        className,
      )}
    >
      {/* keyed by language so it resets cleanly once the new page arrives */}
      <span
        key={lang}
        className="relative block h-full w-full overflow-hidden rounded-full ring-1 ring-black/10"
      >
        <span className="flag flag-base">
          <Flag lang={lang} />
        </span>
        <span className="flag flag-target">
          <Flag lang={target} />
        </span>
        <span className="flag-seam" aria-hidden="true" />
      </span>
    </button>
  )
}
