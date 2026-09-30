'use client'

import { useSyncExternalStore } from 'react'

import {
  DEFAULT_PALETTE,
  PALETTE_STORAGE_KEY,
  PALETTES,
  type PaletteId,
} from '@/lib/palettes'

const EVENT = 'palette-change'

function read(): PaletteId {
  let value = document.documentElement.dataset.palette
  return PALETTES.some((p) => p.id === value)
    ? (value as PaletteId)
    : DEFAULT_PALETTE
}

export function setPalette(id: PaletteId) {
  document.documentElement.dataset.palette = id
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

export function usePalette(): PaletteId {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb)
      return () => window.removeEventListener(EVENT, cb)
    },
    read,
    () => DEFAULT_PALETTE,
  )
}
