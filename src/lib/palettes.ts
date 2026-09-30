export const PALETTES = [
  {
    id: 'koyo',
    name: 'Kōyō',
    note: 'Night drive',
    // [light accent, dark accent, secondary, surface(light), surface(dark)]
    swatch: ['#d93a26', '#ff5a45', '#33e1ff', '#f7f1ea', '#0c0a0d'],
  },
  {
    id: 'washi',
    name: 'Washi',
    note: 'Paper & ink',
    swatch: ['#b3261e', '#e5594c', '#93aad9', '#f2ecdf', '#12110f'],
  },
  {
    id: 'teal',
    name: 'Teal',
    note: 'Refined classic',
    swatch: ['#0c8a82', '#2dd4bf', '#ffb066', '#f3f7f7', '#061214'],
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    note: 'Latte & Mocha',
    swatch: ['#8839ef', '#cba6f7', '#ea76cb', '#eff1f5', '#1e1e2e'],
  },
] as const

export type PaletteId = (typeof PALETTES)[number]['id']
export const DEFAULT_PALETTE: PaletteId = 'koyo'
export const PALETTE_STORAGE_KEY = 'palette'
