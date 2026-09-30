import clsx from 'clsx'

import { TransitionLink } from '@/components/TransitionLink'

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A real card: surface, hairline ring, cursor-tracking spotlight. */
export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  let Component = as ?? 'div'

  return (
    <Component
      data-vt-card
      className={clsx(
        className,
        'spotlight group relative flex flex-col items-start rounded-2xl bg-surface/70 p-6 ring-1 ring-line backdrop-blur-sm transition duration-300 hover:-translate-y-0.5',
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TransitionLink>) {
  return (
    <TransitionLink {...props}>
      <span className="absolute inset-0 z-20 rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </TransitionLink>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T
  href?: string
}) {
  let Component = as ?? 'h2'

  return (
    <Component
      data-vt-title
      className="text-lg font-semibold tracking-tight text-ink"
      {...props}
    >
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-body">{children}</p>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-accent"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-1" />
    </div>
  )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  let Component = as ?? 'p'

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center font-mono text-xs text-faint',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-accent/60" />
        </span>
      )}
      {children}
    </Component>
  )
}
