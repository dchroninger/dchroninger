import { ContainerInner, ContainerOuter } from '@/components/Container'
import { TransitionLink } from '@/components/TransitionLink'
import { HAS_PROJECTS } from '@/lib/projects'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <TransitionLink href={href} className="transition hover:text-accent">
      {children}
    </TransitionLink>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-line pt-10 pb-16">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-ink">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/articles">Writing</NavLink>
                {HAS_PROJECTS && <NavLink href="/projects">Projects</NavLink>}
                <NavLink href="/uses">Uses</NavLink>
                <a href="/feed.xml" className="transition hover:text-accent">
                  RSS
                </a>
              </div>
              <p className="font-mono text-xs text-faint">
                &copy; {new Date().getFullYear()} Dave Chroninger · 手作り
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
