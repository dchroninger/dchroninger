import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    // <Figure src={photo} alt="…" caption="…" /> — inline image with a caption
    Figure: ({ caption, ...props }: ImageProps & { caption?: string }) => (
      <figure>
        <Image {...props} className="rounded-2xl ring-1 ring-line" />
        {caption && (
          <figcaption className="mt-3 font-mono text-xs text-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    ),
  }
}
