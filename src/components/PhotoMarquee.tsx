'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import clsx from 'clsx'

type Photo = { id: string; src: StaticImageData; alt: string }

const SPEED = 0.028 // px per ms

function Tile({ photo, index }: { photo: Photo; index: number }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.05, y: -8, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={clsx(
        'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-surface-2 shadow-xl ring-1 shadow-black/10 ring-line sm:w-64 sm:rounded-2xl',
        index % 2 === 0 ? 'rotate-2' : '-rotate-2',
        index % 3 === 1 && 'sm:translate-y-6',
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        sizes="(min-width: 640px) 16rem, 11rem"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  )
}

export function PhotoMarquee({ photos }: { photos: Photo[] }) {
  let reduce = useReducedMotion()
  let root = useRef<HTMLDivElement>(null)
  let group = useRef<HTMLDivElement>(null)
  let x = useMotionValue(0)
  let width = useRef(0)
  let [paused, setPaused] = useState(false)

  // gentle scroll parallax on top of the drift
  let { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  })
  let lift = useTransform(scrollYProgress, [0, 1], [30, -30])

  useEffect(() => {
    let el = group.current
    if (!el) return
    let ro = new ResizeObserver(() => {
      width.current = el!.getBoundingClientRect().width
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduce || paused || !width.current) return
    let next = x.get() - delta * SPEED
    if (next <= -width.current) next += width.current
    x.set(next)
  })

  let set = (
    <div className="flex flex-none gap-5 pr-5 sm:gap-8 sm:pr-8">
      {photos.map((p, i) => (
        <Tile key={p.alt} photo={p} index={i} />
      ))}
    </div>
  )

  return (
    <div
      ref={root}
      className="mt-16 sm:mt-24"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div
        style={{ y: reduce ? 0 : lift }}
        className="-my-6 overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <motion.div style={{ x }} className="flex w-max">
          <div ref={group} className="flex">
            {set}
          </div>
          <div className="flex" aria-hidden="true">
            {set}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
