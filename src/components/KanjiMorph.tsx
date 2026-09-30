'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { fmt } from '@/i18n/config'
import { useT } from '@/i18n/LangProvider'

const WORDS = [
  { k: '学', kana: 'まなぶ', en: 'to learn' },
  { k: '作', kana: 'つくる', en: 'to make' },
  { k: '車', kana: 'くるま', en: 'car' },
  { k: '犬', kana: 'いぬ', en: 'dog' },
  { k: '読', kana: 'よむ', en: 'to read' },
]

const HOLD = 2.6 // seconds a kanji rests
const MORPH = 1.3 // seconds to melt into the next

/**
 * Gooey text morph: two stacked glyphs are cross-blurred, then an SVG
 * alpha-threshold filter re-sharpens the merged blob into a crisp shape.
 */
export function KanjiMorph() {
  let reduce = useReducedMotion()
  let t = useT()
  let a = useRef<HTMLSpanElement>(null)
  let b = useRef<HTMLSpanElement>(null)
  let skip = useRef(false)
  let [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    let A = a.current!
    let B = b.current!
    let i = 0
    let start = performance.now()
    let raf = 0
    let announced = false

    A.textContent = WORDS[0].k
    B.textContent = WORDS[1].k

    function set(f: number) {
      let inv = 1 - f
      B.style.filter = `blur(${Math.min(8 / Math.max(f, 0.001) - 8, 100)}px)`
      B.style.opacity = String(Math.pow(f, 0.4))
      A.style.filter = `blur(${Math.min(8 / Math.max(inv, 0.001) - 8, 100)}px)`
      A.style.opacity = String(Math.pow(inv, 0.4))
    }

    function frame(now: number) {
      if (skip.current) {
        skip.current = false
        start = now - HOLD * 1000
      }
      let t = (now - start) / 1000
      if (t < HOLD) {
        set(0)
      } else {
        let f = Math.min((t - HOLD) / MORPH, 1)
        set(f)
        if (f > 0.45 && !announced) {
          announced = true
          setIndex((i + 1) % WORDS.length)
        }
        if (f >= 1) {
          i = (i + 1) % WORDS.length
          A.textContent = WORDS[i].k
          B.textContent = WORDS[(i + 1) % WORDS.length].k
          set(0)
          announced = false
          start = now
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  let word = WORDS[index]

  return (
    <button
      type="button"
      onClick={() => {
        if (reduce) setIndex((n) => (n + 1) % WORDS.length)
        else skip.current = true
      }}
      aria-label={fmt(t.kanji.aria, {
        k: word.k,
        kana: word.kana,
        en: word.en,
      })}
      className="spotlight group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-surface/70 ring-1 ring-line backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
    >
      {/* threshold filter that makes the blur read as liquid */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="kanji-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <span className="absolute top-5 left-6 font-mono text-[11px] tracking-wider text-faint uppercase">
        {t.kanji.label}
      </span>
      <span className="absolute top-5 right-6 font-mono text-[11px] text-faint">
        {String(index + 1).padStart(2, '0')}/
        {String(WORDS.length).padStart(2, '0')}
      </span>

      <span
        aria-hidden="true"
        className="relative block h-[62%] w-full text-accent"
        style={{
          filter: reduce ? undefined : 'url(#kanji-threshold)',
          fontFamily:
            '"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP","Source Han Serif JP",serif',
        }}
      >
        <span
          ref={a}
          className="absolute inset-0 flex items-center justify-center text-[clamp(8rem,17vw,12.5rem)] leading-none"
        >
          {WORDS[0].k}
        </span>
        <span
          ref={b}
          className="absolute inset-0 flex items-center justify-center text-[clamp(8rem,17vw,12.5rem)] leading-none opacity-0"
        />
        {reduce && (
          <span className="absolute inset-0 flex items-center justify-center text-[clamp(8rem,17vw,12.5rem)] leading-none">
            {word.k}
          </span>
        )}
      </span>

      <span className="absolute inset-x-0 bottom-6 flex h-12 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <span className="block text-base font-medium text-ink">
              {word.kana}
            </span>
            <span className="block font-mono text-xs text-muted">
              {word.en}
            </span>
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}
