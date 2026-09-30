'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

import { type Role } from '@/lib/resume'

export function WorkTimeline({ roles }: { roles: Role[] }) {
  let reduce = useReducedMotion()
  let ref = useRef<HTMLOListElement>(null)
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  let draw = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <ol ref={ref} className="relative space-y-7">
      {/* the line that draws itself as you scroll */}
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-5 w-px -translate-x-1/2 bg-line"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : draw }}
        className="absolute top-3 bottom-3 left-5 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent to-accent-2"
      />
      {roles.map((role, i) => (
        <motion.li
          key={`${role.company}-${role.title}`}
          initial={reduce ? false : { opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex gap-4"
        >
          <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface shadow-md ring-1 shadow-black/5 ring-line">
            <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            {role.current && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-2 ring-surface" />
              </span>
            )}
          </div>
          <dl className="flex flex-auto flex-wrap items-baseline gap-x-2">
            <dt className="sr-only">Company</dt>
            <dd className="w-full flex-none text-sm font-semibold text-ink">
              {role.company}
            </dd>
            <dt className="sr-only">Role</dt>
            <dd className="text-xs text-muted">{role.title}</dd>
            <dt className="sr-only">Date</dt>
            <dd className="ml-auto font-mono text-xs text-faint">
              {role.start} — {role.end}
            </dd>
          </dl>
        </motion.li>
      ))}
    </ol>
  )
}
