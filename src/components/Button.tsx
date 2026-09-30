import clsx from 'clsx'

import { TransitionLink } from '@/components/TransitionLink'

const variantStyles = {
  primary:
    'bg-accent font-semibold text-on-accent hover:brightness-110 active:brightness-95',
  secondary:
    'bg-surface-2/70 font-medium text-ink ring-1 ring-line hover:bg-surface-2 active:bg-surface-2/60',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof TransitionLink>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-full py-2 px-4 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  if (typeof props.href === 'undefined') {
    return <button className={className} {...props} />
  }

  let href = String(props.href)
  // External / non-route links stay plain anchors.
  if (!href.startsWith('/')) {
    let { href: _h, ...rest } = props as React.ComponentPropsWithoutRef<'a'>
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
        {...rest}
      />
    )
  }
  return <TransitionLink className={className} {...props} />
}
