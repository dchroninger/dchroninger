import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="relative z-10 flex w-full flex-col">
        <Header />
        <div className="vt-main flex flex-auto flex-col">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
