import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <i />
        <i />
      </div>
      {/* On phones the page scrolls inside #scroller, so content never scrolls up behind the iPhone status bar (Safari 26/27
          shows it through there). Desktop scrolls the window as usual. */}
      <div
        id="scroller"
        className="relative z-10 flex w-full flex-col max-md:fixed max-md:inset-x-0 max-md:top-0 max-md:bottom-0 max-md:overflow-y-auto max-md:overscroll-contain"
      >
        <div className="flex flex-col">
          <Header />
          <div className="vt-main flex flex-auto flex-col">
            <main className="flex-auto">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
