'use client'

import { useEffect, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

import { setPalette, usePalette } from '@/lib/palette-store'
import { PALETTES, type PaletteId } from '@/lib/palettes'
import { withRevealTransition } from '@/lib/viewTransition'

function Swatch({
  id,
  dark,
  className,
}: {
  id: PaletteId
  dark: boolean
  className?: string
}) {
  let p = PALETTES.find((x) => x.id === id)!
  let [lightAccent, darkAccent, second, lightBg, darkBg] = p.swatch

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'relative block overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15',
        className,
      )}
      style={{ background: dark ? darkBg : lightBg }}
    >
      <span
        className="absolute top-1/2 left-1/2 h-[62%] w-[62%] -translate-x-[62%] -translate-y-1/2 rounded-full"
        style={{ background: dark ? darkAccent : lightAccent }}
      />
      <span
        className="absolute top-1/2 left-1/2 h-[38%] w-[38%] -translate-x-[8%] -translate-y-[10%] rounded-full"
        style={{ background: second }}
      />
    </span>
  )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PaletteSwitcher() {
  let current = usePalette()
  let { resolvedTheme } = useTheme()
  let [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  let dark = mounted && resolvedTheme === 'dark'
  let active = PALETTES.find((p) => p.id === current)!

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label={`Color theme: ${active.name}. Change theme`}
        className="group flex items-center gap-2 rounded-full bg-surface/80 py-2 pr-3 pl-2.5 shadow-lg shadow-black/5 ring-1 ring-line backdrop-blur-md transition hover:ring-accent/40 data-open:ring-accent/50"
      >
        <Swatch id={current} dark={dark} className="h-6 w-6" />
        <span className="hidden font-mono text-xs text-muted sm:block">
          {active.name}
        </span>
      </PopoverButton>

      <PopoverPanel
        transition
        anchor={{ to: 'bottom end', gap: 12 }}
        className="z-50 w-64 origin-top-right rounded-2xl bg-surface p-2 shadow-2xl shadow-black/20 ring-1 ring-line transition duration-150 data-closed:scale-95 data-closed:opacity-0"
      >
        <ul role="list" className="space-y-0.5">
          {PALETTES.map((p) => {
            let selected = p.id === current
            return (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={(e) => {
                    if (selected) return
                    // Reveal expands from the swatch that was clicked.
                    let r = e.currentTarget.getBoundingClientRect()
                    withRevealTransition(
                      { x: r.left + 32, y: r.top + r.height / 2 },
                      () => setPalette(p.id),
                    )
                  }}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                    selected ? 'bg-surface-2' : 'hover:bg-surface-2/60',
                  )}
                >
                  <Swatch id={p.id} dark={dark} className="h-9 w-9 flex-none" />
                  <span className="flex-auto">
                    <span className="block text-sm leading-5 font-semibold text-ink">
                      {p.name}
                    </span>
                    <span className="block text-xs leading-5 text-muted">
                      {p.note}
                    </span>
                  </span>
                  {selected && <CheckIcon className="h-4 w-4 text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverPanel>
    </Popover>
  )
}
