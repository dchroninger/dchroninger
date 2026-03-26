/* eslint-disable react/no-unescaped-entities */
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="Over the years I've gone through some iterations to figure out my preferred setup, but I think I've finally done it."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro">
            Before my MacBook, I had done all of my development on Windows PCs.
            I've enjoyed the switch, and the closer ergonomics to Linux help
            with maintining config files or scripts that may be run on a server.
          </Tool>
          <Tool title="Logitech Ergo Widescreen + DualUp Displays">
            This setup has been great for productivity. I learned long ago that
            ultrawides were more comfortable for displaying code and content, but
            adding the DualUp as a sidecar display let's me have a local web app,
            dev tools, addiitonal terminals, or any other tools I need, without
            disturbing my main area for focusing. 11/10, highly recommend.
          </Tool>
          <Tool title="Corne Split Keyboard">
            Now <strong>HERE</strong> is where I can really nerd out. For years
            I had dealt with wrist discomfort and shoulder pain from working on
            computers all day long. After coming across split keyboards, I
            decided to try the Zsa Moonlander, then to their Voyager model. Both
            were great devices, but I wanted something wireless again, so I built
            my wireless Corne and haven't looked back. It packs up small
            enough that I can take it anywhere, and it being wireless makes remote
            work setup ridiculously easy. This is hands down my favorite item in
            this list.
          </Tool>
          <Tool title="Logitech MX Master 3S">
            To be honest, there's really not much to say here. It's amouse. It
            does mouse things. It's pretty comfortable, but no more comfortable
            than my Razer Naga Pro. So ¯\_(ツ)_/¯.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Neovim + Tmux">
            Not to be that "btw" guy, but I'm honestly really happy that I moved
            to Neovim a few years ago. A lot of people brag about the speed, or
            the endless customizations, but for me, it's more about the
            ergonomics. I can make the right changes to make my use of the
            computer feel more like thinking than typing. You can find my
            dotfiles &nbsp;
            <a
              href="https://github.com/dchroninger/.dotfiles"
              target="_blank"
              className="texat-teal-600 dark:text-teal-300"
            >
              here
            </a>
            .
          </Tool>
          <Tool title="Ghostty">
            I moved to Ghostty this year after it finally was released to the
            public. It's a fast terminal, and incredibly customizable. The best
            part though... is that you don't need to. It just works. Change the
            theme, and the rest is just configured right out of the box.
          </Tool>
          <Tool title="Claude Code">
            This tool has become a very helpful part of my day to day workflows.
            It's been great for tackling research and providing resources, or
            having a second set of eyes on a suite of tests to make sure that i'm
            not over-looking any edge cases. Another great use case I have found
            lately is a way to learn about architectural styles that I haven't been
            able to work with at my job. Having a pair programmer when I need it
            has been great.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
