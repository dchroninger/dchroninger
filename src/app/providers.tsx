'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'

import { CursorEffects } from '@/components/CursorEffects'
import { canViewTransition, runNavTransition } from '@/lib/viewTransition'

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export const AppContext = createContext<{ previousPathname?: string }>({})

type Navigate = (href: string, from?: HTMLElement | null) => boolean
const NavContext = createContext<Navigate>(() => false)
export const useNavTransition = () => useContext(NavContext)

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let router = useRouter()
  let previousPathname = usePrevious(pathname)
  let settle = useRef<(() => void) | null>(null)

  // Resolve the pending view transition once the new route has rendered.
  useEffect(() => {
    if (!settle.current) return
    let done = settle.current
    settle.current = null
    requestAnimationFrame(() => requestAnimationFrame(done))
  }, [pathname])

  let navigate = useCallback<Navigate>(
    (href, from) => {
      if (!canViewTransition()) return false
      if (href.split(/[?#]/)[0] === window.location.pathname) return false

      // Link → article shared-element morph: title on the list becomes the h1.
      let shared =
        from?.closest('[data-vt-card]')?.querySelector<HTMLElement>(
          '[data-vt-title]',
        ) ?? null

      runNavTransition(
        () =>
          new Promise<void>((resolve) => {
            settle.current = resolve
            router.push(href)
            setTimeout(resolve, 1500) // never hang the page
          }),
        shared,
      )
      return true
    },
    [router],
  )

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <NavContext.Provider value={navigate}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ThemeWatcher />
          <CursorEffects />
          {children}
        </ThemeProvider>
      </NavContext.Provider>
    </AppContext.Provider>
  )
}
