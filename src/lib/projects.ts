import { type StaticImageData } from 'next/image'

import { type Locale } from '@/i18n/config'
import usagiLogo from '@/images/logos/usagi.png'
import usagiPhoneHomeDark from '@/images/projects/usagi/phone-home-dark.png'
import usagiPhoneHomeLight from '@/images/projects/usagi/phone-home-light.png'
import usagiWidgets from '@/images/projects/usagi/phone-widgets.png'
import usagiWebHomeDark from '@/images/projects/usagi/web-home-dark.png'
import usagiWebHomeLight from '@/images/projects/usagi/web-home-light.png'
import usagiWebLoadDark from '@/images/projects/usagi/web-load-dark.png'
import usagiWebLoadLight from '@/images/projects/usagi/web-load-light.png'

type Localized<T> = Record<Locale, T>

/** A screenshot with optional light/dark variants that follow the site theme. */
export interface Shot {
  light: StaticImageData
  dark?: StaticImageData
  alt: Localized<string>
  kind: 'web' | 'phone'
}

export interface Project {
  id: string
  name: string
  logo: StaticImageData
  status: Localized<string>
  tagline: Localized<string>
  description: Localized<string>
  highlights: Localized<string[]>
  tags: string[]
  /** Public link (App Store, live site). Never a private repo. */
  href?: string
  label?: Localized<string>
  shots: {
    hero: Shot
    phone?: Shot
    extra?: Shot[]
  }
}

// The curated list. Nav, footer and sitemap entries appear automatically
// once there's at least one project.
export const projects: Project[] = [
  {
    id: 'usagi',
    name: 'Usagi TMS',
    logo: usagiLogo,
    status: { en: 'In development', ja: '開発中' },
    tagline: {
      en: 'A transportation management system for freight brokers.',
      ja: '運送ブローカーのための輸送管理システム。',
    },
    description: {
      en: 'Loads, carriers, customers, billing and carrier pay for small-to-mid freight brokerages, from quote to paid invoice. One Go API powers the web app, a customer portal, and a native iPhone app with home-screen widgets.',
      ja: '中小規模の運送ブローカー向けに、見積もりから入金まで、荷物・運送会社・荷主・請求・運送会社への支払いを一元管理します。Go製のAPI一本で、Webアプリ、荷主向けポータル、ホーム画面ウィジェット付きのiPhoneアプリを動かしています。',
    },
    highlights: {
      en: [
        'Multi-tenant by design: every company’s data is isolated by Postgres row-level security, enforced in the database itself.',
        'Permission-aware everywhere: margins and pay rates are masked from people who shouldn’t see them, down to the API field.',
        'Branded invoice PDFs, carrier settlements, and profit, aging and carrier-pay reports.',
        'Nightly carrier compliance scans that flag expired insurance or inactive authority and email a digest.',
        'Native iPhone app with configurable home-screen widgets for the numbers that matter today.',
      ],
      ja: [
        'マルチテナント前提の設計。各社のデータはPostgresの行レベルセキュリティで、データベース自体が分離します。',
        '権限に応じた表示。利益率や支払額は、見る権限のない人にはAPIのフィールド単位で隠されます。',
        '会社ロゴ入りの請求書PDF、運送会社への精算、利益・売掛金年齢・支払いのレポート。',
        '毎晩の運送会社コンプライアンスチェック。保険切れや営業許可の失効を検知し、ダイジェストをメールで送ります。',
        'ホーム画面ウィジェットを設定できるネイティブiPhoneアプリ。',
      ],
    },
    tags: [
      'Go',
      'PostgreSQL',
      'React',
      'TanStack',
      'Tailwind CSS',
      'SwiftUI',
      'WidgetKit',
    ],
    shots: {
      hero: {
        kind: 'web',
        light: usagiWebHomeLight,
        dark: usagiWebHomeDark,
        alt: {
          en: 'Usagi TMS web app home: active loads, loads needing a carrier, ready to bill, overdue invoices, and compliance alerts',
          ja: 'Usagi TMS Webアプリのホーム画面。稼働中の荷物、要手配、請求待ち、期限切れ請求書、コンプライアンス警告',
        },
      },
      phone: {
        kind: 'phone',
        light: usagiPhoneHomeLight,
        dark: usagiPhoneHomeDark,
        alt: {
          en: 'Usagi TMS iPhone app home screen with the same key numbers',
          ja: '同じ主要指標を表示するUsagi TMSのiPhoneアプリ',
        },
      },
      extra: [
        {
          kind: 'web',
          light: usagiWebLoadLight,
          dark: usagiWebLoadDark,
          alt: {
            en: 'A load in transit, with tabs for stops, carrier, charges and pay, tracking, documents and history',
            ja: '輸送中の荷物の詳細。停車地、運送会社、料金と支払い、追跡、書類、履歴のタブ',
          },
        },
        {
          kind: 'phone',
          light: usagiWidgets,
          alt: {
            en: 'iPhone home screen with Usagi TMS widgets',
            ja: 'Usagi TMSのウィジェットを置いたiPhoneのホーム画面',
          },
        },
      ],
    },
  },
]

export const HAS_PROJECTS = projects.length > 0
