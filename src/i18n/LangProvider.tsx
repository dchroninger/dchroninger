'use client'

import { createContext, useContext } from 'react'

import { type Locale } from './config'
import { type Dictionary } from './dictionaries/en'

const LangContext = createContext<{ lang: Locale; t: Dictionary } | null>(null)

export function LangProvider({
  lang,
  dictionary,
  children,
}: {
  lang: Locale
  dictionary: Dictionary
  children: React.ReactNode
}) {
  return (
    <LangContext.Provider value={{ lang, t: dictionary }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  let ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx.lang
}

export function useT() {
  let ctx = useContext(LangContext)
  if (!ctx) throw new Error('useT must be used inside <LangProvider>')
  return ctx.t
}
