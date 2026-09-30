import { type Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { ja } from './dictionaries/ja'

const dictionaries: Record<Locale, Dictionary> = { en, ja }

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang]
}

export type { Dictionary }
