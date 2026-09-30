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
      <ul role="list" className="space-y-5">
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
  alternates: { canonical: '/uses' },
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
            I&apos;ve enjoyed the switch, and the closer ergonomics to Linux
            help with maintaining config files or scripts that may be run on a
            server.
          </Tool>
          <Tool title="49” Samsung Odyssey">
            The newest addition to the desk. I learned long ago that ultrawides
            are more comfortable for code and content, and a 49&quot; is
            basically two monitors with no bezel down the middle: an editor and
            terminals on one side, a running app and dev tools on the other, all
            in one field of view.
          </Tool>
          <Tool title="Razer Thunderbolt Dock">
            One cable from the laptop to everything else. It also has an NVMe
            M.2 drive built right into it, so I get fast external storage
            without another box or cable on the desk.
          </Tool>
          <Tool title="Corne Split Keyboard">
            Now <strong>HERE</strong> is where I can really nerd out. For years
            I had dealt with wrist discomfort and shoulder pain from working on
            computers all day long. After coming across split keyboards, I
            decided to try the Zsa Moonlander, then to their Voyager model. Both
            were great devices, but I wanted something wireless again, so I
            built my wireless Corne and haven&apos;t looked back. It packs up
            small enough that I can take it anywhere, and it being wireless
            makes remote work setup ridiculously easy. This is hands down my
            favorite item in this list, and I&apos;ll swear by it until the end
            of days.
          </Tool>
          <Tool title="Razer Naga V2 Pro">
            It&apos;s a mouse. It does mouse things. What I like about this one
            is the swappable side plates, so I can pick how many thumb buttons I
            want under my hand. I used to use a Logitech MX Master 3S, and it
            was great too, but the Naga is the one that stuck.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Audio">
          <Tool title="Shure MV7X">
            An XLR dynamic microphone, which means it mostly ignores the room
            and picks up my voice. It plugs into the interface below instead of
            straight into the computer.
          </Tool>
          <Tool title="Focusrite Scarlett 2i2 (4th Gen)">
            The audio interface that sits between the mic and the computer.
            Clean preamps, simple controls, and it just works.
          </Tool>
          <Tool title="Soundbrenner IEMs">
            In-ear monitors for everything from calls to focus music.
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
              className="text-accent"
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
            having a second set of eyes on a suite of tests to make sure that
            I'm not over-looking any edge cases. Another great use case I have
            found lately is a way to learn about architectural styles that I
            haven't been able to work with at my job. Having a pair programmer
            when I need it has been great.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
