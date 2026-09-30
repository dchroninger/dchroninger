'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'

import { CONTACT_EMAIL } from '@/lib/site'

/**
 * mailto link with a fallback: clicking still tries the mail app, but also
 * copies the address and shows a small popover — so it does something even
 * on a machine with no mail client configured.
 */
export function EmailLink({
  children,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>) {
  let [state, setState] = useState<'idle' | 'copied' | 'manual'>('idle')
  let timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(timer.current), [])

  function flash(next: 'copied' | 'manual') {
    setState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2600)
  }

  return (
    <a
      {...props}
      href={`mailto:${CONTACT_EMAIL}`}
      className={clsx('relative', className)}
      onClick={(e) => {
        props.onClick?.(e)
        // don't preventDefault: let the mailto: try to open a mail app too
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(CONTACT_EMAIL).then(
            () => flash('copied'),
            () => flash('manual'),
          )
        } else {
          flash('manual')
        }
      }}
    >
      {children}
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied' ? `Copied ${CONTACT_EMAIL} to clipboard` : ''}
      </span>
      <AnimatePresence>
        {state !== 'idle' && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 rounded-full bg-ink px-3 py-1.5 font-mono text-xs whitespace-nowrap text-paper shadow-xl select-text"
          >
            {state === 'copied' ? (
              <>
                <span className="text-accent-2">✓</span> Copied {CONTACT_EMAIL}
              </>
            ) : (
              CONTACT_EMAIL
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  )
}
