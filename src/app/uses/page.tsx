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
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M1 Max, 32GB RAM (2021)">
            Before my MacBook, I had done all of my development on Windows PCs.
            Moving to MacOS made a world of a difference for my productivity and
            the ergonomics of my OS.
          </Tool>
          <Tool title="Logitech Ergo Widescreen + DualUp Displays">
            This monitor pairing truly feels like having superpowers when it
            comes to productivity and development. The DualUp gives the perfect
            canvas for reading large codebases, but also for staging all of the
            different simulators and browsers for compatibility testing. The
            widescreen replacing a previous dual 24" setup means being able to
            center my work without bezels making me crane my neck.
          </Tool>
          <Tool title="Zsa Voyager Split Ergonomic Keyboard">
            Now <strong>HERE</strong> is where I can really nerd out. For years
            I had dealt with wrist discomfort and shoulder pain from working on
            computers all day long. After coming across split keyboards, I
            decided to try the Zsa Moonlander, which was a fantastic device. It
            was a bit bigger than I needed, so I ended up eventually moving to
            this Voyager, which is the best split, ortholinear keyboard out
            there. Having layers for all of my important apps, and being able to
            customize the layout to fit my needs has been infinitely helpful.
          </Tool>
          <Tool title="Logitech MX Master 3S for Mac">
            To be honest, there's really not much to say here. It's a
            ridiculously comfortable mouse that has pretty cool gestures. The
            one gripe I would have is that it requires there software to be
            installed to work with the gestures, rather than having the OS
            default gestures built into the device.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Neovim">
            Not to be that "btw" guy, but I'm honestly really happy that I moved
            to Neovim a few years ago. A lot of people brag about the speed, or
            the endless customizations, but for me, it's more about the
            ergonomics. I can make the right changes to make my use of the
            computer feel more like thinking than typing. You can find my
            dotfiles &nbsp;
            <a
              href="https://github.com/dchroninger/.dotfiles"
              target="_blank"
              className="text-teal-600 dark:text-teal-300"
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
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Yabai + SKHD">
            Yabai and SKHD paired together are like Batman and Robin. They turn
            into a fantastic window manager for those focused sessions when I
            don't want to reach for the mouse and ruin the emperor's groove.
            Resizing, moving things, changing focus. All of these become reflex
            once you get the muscle memory with the keybinds. Pairing this with
            the Voyager keyboard has really been a game changer.
          </Tool>
          <Tool title="Focus">
            Look. We all get distracted. That's why I have this handy little
            pomodoro timer to keep me on track. It unfortunately doesn't have
            ALL of the features I want, so I'll probably end up making my own at
            some point. Being able to tie it into work accounts for task
            management tracking, or GitHub issues to easily have focused coding
            sessions.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
