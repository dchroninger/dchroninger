import { type StaticImageData } from 'next/image'

import { type Locale } from '@/i18n/config'
import kanpekiReaderLogo from '@/images/logos/kanpeki-reader.png'
import usagiLogo from '@/images/logos/usagi.png'
import kanpekiSeries from '@/images/projects/kanpeki-reader/01-series.png'
import kanpekiReader from '@/images/projects/kanpeki-reader/02-reader.png'
import kanpekiTextMode from '@/images/projects/kanpeki-reader/03-textmode.png'
import kanpekiDictionary from '@/images/projects/kanpeki-reader/04-dictionary.png'
import kanpekiOcr from '@/images/projects/kanpeki-reader/05-ocr-in-context.png'
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
  caption?: Localized<string>
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
  /** Shown on the project list card. */
  cover: Shot
  /** Everything shown on the detail page, in order. */
  gallery: Shot[]
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
    cover: {
      kind: 'web',
      light: usagiWebHomeLight,
      dark: usagiWebHomeDark,
      alt: {
        en: 'Usagi TMS web app home: active loads, loads needing a carrier, ready to bill, overdue invoices, and compliance alerts',
        ja: 'Usagi TMS Webアプリのホーム画面。稼働中の荷物、要手配、請求待ち、期限切れ請求書、コンプライアンス警告',
      },
    },
    gallery: [
      {
        kind: 'web',
        light: usagiWebHomeLight,
        dark: usagiWebHomeDark,
        alt: {
          en: 'Usagi TMS web app home: active loads, loads needing a carrier, ready to bill, overdue invoices, and compliance alerts',
          ja: 'Usagi TMS Webアプリのホーム画面。稼働中の荷物、要手配、請求待ち、期限切れ請求書、コンプライアンス警告',
        },
        caption: {
          en: 'Home: today’s numbers and everything that needs attention.',
          ja: 'ホーム：今日の数字と、対応が必要なこと。',
        },
      },
      {
        kind: 'web',
        light: usagiWebLoadLight,
        dark: usagiWebLoadDark,
        alt: {
          en: 'A load in transit, with tabs for stops, carrier, charges and pay, tracking, documents and history',
          ja: '輸送中の荷物の詳細。停車地、運送会社、料金と支払い、追跡、書類、履歴のタブ',
        },
        caption: {
          en: 'A load, from stops and carrier to charges, tracking and documents.',
          ja: '荷物の詳細：停車地、運送会社、料金、追跡、書類まで。',
        },
      },
      {
        kind: 'phone',
        light: usagiPhoneHomeLight,
        dark: usagiPhoneHomeDark,
        alt: {
          en: 'Usagi TMS iPhone app home screen with the same key numbers',
          ja: '同じ主要指標を表示するUsagi TMSのiPhoneアプリ',
        },
        caption: { en: 'The iPhone app.', ja: 'iPhoneアプリ。' },
      },
      {
        kind: 'phone',
        light: usagiWidgets,
        alt: {
          en: 'iPhone home screen with Usagi TMS widgets',
          ja: 'Usagi TMSのウィジェットを置いたiPhoneのホーム画面',
        },
        caption: { en: 'Home-screen widgets.', ja: 'ホーム画面ウィジェット。' },
      },
    ],
  },
  {
    id: 'kanpeki-reader',
    name: 'Kanpeki Reader',
    logo: kanpekiReaderLogo,
    status: {
      en: 'Open source · personal use',
      ja: 'オープンソース・個人利用',
    },
    tagline: {
      en: 'A manga reader that helps you read Japanese, on-device.',
      ja: '日本語を読む手助けをする、端末内で完結するマンガリーダー。',
    },
    description: {
      en: 'Read your own CBZ library on iPhone and iPad, synced through your iCloud. Drag a box around a speech bubble and Kanpeki reads it with an on-device OCR model, splits it into words, and shows readings, pitch accent, meanings and a translation, without anything leaving the phone.',
      ja: '自分のCBZライブラリをiPhoneやiPadで、iCloud経由で同期しながら読めます。吹き出しを囲むと、端末内のOCRモデルが文字を読み取り、単語に分けて、読み・アクセント・意味・翻訳を表示します。データは端末の外に出ません。',
    },
    highlights: {
      en: [
        'On-device OCR: manga-ocr converted to Core ML, running on the Neural Engine.',
        'A bundled JMdict dictionary with deinflection, so conjugated verbs still resolve to their dictionary form.',
        'Pitch accent drawn for every word, plus furigana on demand.',
        'Your library lives in your own iCloud Drive; reading position syncs through CloudKit’s private database.',
        '“Host nothing, see nothing”: no servers, no catalog, no telemetry about what you read.',
      ],
      ja: [
        '端末内OCR：manga-ocrをCore MLに変換し、Neural Engineで実行。',
        '活用形を辞書形に戻す機能付きのJMdict辞書を内蔵。',
        'すべての単語にアクセントを表示。ふりがなも切り替え可能。',
        'ライブラリは自分のiCloud Driveに。読書位置はCloudKitのプライベートデータベースで同期。',
        '「何も預からず、何も見ない」：サーバーなし、カタログなし、読んだものの記録もなし。',
      ],
    },
    tags: ['Swift', 'SwiftUI', 'Core ML', 'CloudKit', 'iCloud Drive', 'SQLite'],
    href: 'https://github.com/dchroninger/kanpeki-reader',
    label: { en: 'View on GitHub', ja: 'GitHubで見る' },
    cover: {
      kind: 'phone',
      light: kanpekiDictionary,
      alt: {
        en: 'Kanpeki Reader dictionary sheet: the bubble split into words, an English translation, and 橋 (はし, bridge) with its pitch accent',
        ja: 'Kanpeki Readerの辞書シート。吹き出しを単語に分割し、英訳と「橋（はし）」のアクセントを表示',
      },
    },
    gallery: [
      {
        kind: 'phone',
        light: kanpekiOcr,
        alt: {
          en: 'A manga page with the dictionary sheet open under a speech bubble',
          ja: '吹き出しの下に辞書シートを開いたマンガのページ',
        },
        caption: {
          en: 'Box a bubble: OCR, words, translation, and a dictionary card.',
          ja: '吹き出しを囲むと、OCR・単語・翻訳・辞書カードが表示されます。',
        },
      },
      {
        kind: 'phone',
        light: kanpekiDictionary,
        alt: {
          en: 'Dictionary card for 橋 with reading, pitch accent and meaning',
          ja: '「橋」の辞書カード。読み・アクセント・意味',
        },
        caption: {
          en: 'Pitch accent for every word.',
          ja: 'すべての単語にアクセント。',
        },
      },
      {
        kind: 'phone',
        light: kanpekiSeries,
        alt: {
          en: 'A series with three volumes in the library',
          ja: 'ライブラリ内の3巻のシリーズ',
        },
        caption: {
          en: 'Your library, from your iCloud.',
          ja: '自分のiCloudのライブラリ。',
        },
      },
      {
        kind: 'phone',
        light: kanpekiReader,
        alt: {
          en: 'A manga page in the reader',
          ja: 'リーダーで表示したマンガのページ',
        },
        caption: {
          en: 'Sample pages: Hokusai Manga (1816), The Met, CC0.',
          ja: 'サンプル：北斎漫画（1816年）、メトロポリタン美術館、CC0。',
        },
      },
    ],
  },
]

export const HAS_PROJECTS = projects.length > 0
