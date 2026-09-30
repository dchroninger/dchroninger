import Image from 'next/image'
import clsx from 'clsx'

import { type Locale } from '@/i18n/config'
import { type Shot } from '@/lib/projects'

/** A screenshot that swaps to its dark variant when the site is in dark mode. */
export function ThemedShot({
  shot,
  lang,
  sizes,
  className,
  imgClassName,
  priority,
}: {
  shot: Shot
  lang: Locale
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  let img = clsx('block h-auto w-full', imgClassName)
  return (
    <div className={className}>
      <Image
        src={shot.light}
        alt={shot.alt[lang]}
        sizes={sizes}
        priority={priority}
        className={clsx(img, shot.dark && 'dark:hidden')}
      />
      {shot.dark && (
        <Image
          src={shot.dark}
          alt=""
          aria-hidden="true"
          sizes={sizes}
          priority={priority}
          className={clsx(img, 'hidden dark:block')}
        />
      )}
    </div>
  )
}
