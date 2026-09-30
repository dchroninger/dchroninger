import { flushSync } from 'react-dom'

type VTDocument = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

export function canViewTransition() {
  if (typeof document === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return false
  return typeof (document as VTDocument).startViewTransition === 'function'
}

/**
 * Runs `update` inside a view transition that reveals the new look as an
 * expanding circle from `origin` (usually the button that was clicked).
 */
export function withRevealTransition(
  origin: { x: number; y: number } | null,
  update: () => void,
) {
  if (!canViewTransition()) {
    update()
    return
  }

  let root = document.documentElement
  root.dataset.vt = 'theme'

  let transition = (document as VTDocument).startViewTransition!(() => {
    flushSync(update)
  })

  transition.ready.then(() => {
    let x = origin?.x ?? window.innerWidth
    let y = origin?.y ?? 0
    let radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 750,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })

  transition.finished.finally(() => {
    delete root.dataset.vt
  })
}

/**
 * Cross-page navigation. `commit` should kick off the route change.
 * `shared` are elements on the *current* page that morph into same-named
 * elements on the next page (temporarily given a view-transition-name).
 */
export function runNavTransition(
  commit: () => Promise<void>,
  shared: Array<{ el: HTMLElement; name: string }> = [],
) {
  let root = document.documentElement
  root.dataset.vt = 'nav'
  for (let { el, name } of shared)
    el.style.setProperty('view-transition-name', name)

  let transition = (document as VTDocument).startViewTransition!(commit)
  transition.finished.finally(() => {
    delete root.dataset.vt
    for (let { el } of shared) el.style.removeProperty('view-transition-name')
  })
}
