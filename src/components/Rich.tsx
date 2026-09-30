import { Fragment } from 'react'

/**
 * Minimal inline markup for dictionary strings:
 *   **bold**   and   [label](https://url)
 */
export function Rich({
  text,
  strongClassName,
}: {
  text: string
  strongClassName?: string
}) {
  let parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)

  return (
    <>
      {parts.map((part, i) => {
        let bold = part.match(/^\*\*([^*]+)\*\*$/)
        if (bold)
          return (
            <strong key={i} className={strongClassName}>
              {bold[1]}
            </strong>
          )
        let link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link)
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              {link[1]}
            </a>
          )
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
