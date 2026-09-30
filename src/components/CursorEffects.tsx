'use client'

import { useEffect, useRef } from 'react'

/**
 * One global pointer listener powers both effects:
 *  - a soft accent glow that trails the cursor
 *  - `.spotlight` elements get --mx/--my so their gradient tracks the cursor
 */
export function CursorEffects() {
  let glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let el = glow.current
    if (!el) return
    if (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let raf = 0
    let visible = false

    function tick() {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      el!.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf =
        Math.abs(tx - x) + Math.abs(ty - y) > 0.5
          ? requestAnimationFrame(tick)
          : 0
    }

    function onMove(e: PointerEvent) {
      tx = e.clientX
      ty = e.clientY
      if (!visible) {
        visible = true
        x = tx
        y = ty
        el!.dataset.on = 'true'
      }
      if (!raf) raf = requestAnimationFrame(tick)

      let card = (e.target as Element | null)?.closest?.(
        '.spotlight',
      ) as HTMLElement | null
      if (card) {
        let r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
    }

    function onLeave() {
      visible = false
      el!.dataset.on = 'false'
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glow} className="cursor-glow" aria-hidden="true" />
}
