import { type StaticImageData } from 'next/image'

export interface Project {
  name: string
  description: string
  /** Public link (repo, App Store, live site). Omit for private work. */
  href?: string
  /** Link text, e.g. "github.com/dchroninger/foo" or "App Store" */
  label?: string
  logo?: StaticImageData
  screenshot?: StaticImageData
}

// The curated list goes here. While it's empty the Projects page shows a
// "coming soon" note and the nav/footer/sitemap entries stay hidden; add the
// first project and everything appears automatically.
export const projects: Project[] = []

export const HAS_PROJECTS = projects.length > 0
