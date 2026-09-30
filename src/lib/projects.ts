import { type StaticImageData } from 'next/image'

import { type Locale } from '@/i18n/config'
import kanpekiPitchLogo from '@/images/logos/kanpeki-pitch.png'
import pitchCoverLight from '@/images/projects/kanpeki-pitch/00-cover-light.png'
import pitchCoverDark from '@/images/projects/kanpeki-pitch/00-cover-dark.png'
import pitchResultLight from '@/images/projects/kanpeki-pitch/02-result-light.png'
import pitchResultDark from '@/images/projects/kanpeki-pitch/02-result-dark.png'
import pitchPairLight from '@/images/projects/kanpeki-pitch/03-pair-light.png'
import pitchPairDark from '@/images/projects/kanpeki-pitch/03-pair-dark.png'
import booktroveLogo from '@/images/logos/booktrove.png'
import booktroveToday from '@/images/projects/booktrove/01-today.png'
import booktroveLibrary from '@/images/projects/booktrove/02-library.png'
import booktroveBook from '@/images/projects/booktrove/03-book-progress.png'
import booktroveShelf from '@/images/projects/booktrove/04-shelf.png'
import booktroveFriend from '@/images/projects/booktrove/05-friend.png'
import booktroveFeed from '@/images/projects/booktrove/07-feed.png'
import booktroveWidgets from '@/images/projects/booktrove/08-widgets.png'
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
    id: 'booktrove',
    name: 'BookTrove',
    logo: booktroveLogo,
    status: { en: 'Coming to the App Store', ja: 'App Storeで近日公開' },
    tagline: {
      en: 'A book tracker with a bookshelf that looks like yours.',
      ja: '自分の本棚そのままの見た目で記録できる、読書管理アプリ。',
    },
    description: {
      en: 'A native iPhone and iPad app for keeping track of your reading: a reading log with sessions and streaks, goals, and a to-scale virtual bookshelf built from real spines. Friends, groups, challenges and duels make it social, and home-screen widgets and a Live Activity keep your current book one glance away.',
      ja: '読書を記録するためのiPhone・iPadのネイティブアプリ。読書セッションとストリーク付きの記録、目標、そして本物の背表紙で再現した実寸の本棚。友達・グループ・チャレンジ・対戦でソーシャルにも楽しめ、ホーム画面ウィジェットとライブアクティビティで今読んでいる本にすぐアクセスできます。',
    },
    highlights: {
      en: [
        'SwiftUI throughout, with a separate Swift package for the model and data layer.',
        'A to-scale bookshelf: spines are sized from each book’s real dimensions and arranged like your actual shelves.',
        'Shelf scanning: photograph a shelf and the books are identified and added.',
        'Social reading: friends, groups, shared reviews, challenges and head-to-head duels, with per-group visibility.',
        'Widgets, a Control Center scan control, and a Live Activity for the reading timer.',
        'Supabase backend with row-level security and edge functions; fully re-themeable UI.',
      ],
      ja: [
        '全面的にSwiftUI。モデルとデータ層は独立したSwiftパッケージ。',
        '実寸の本棚：各本の実際のサイズから背表紙を描き、本物の本棚のように並べます。',
        '本棚スキャン：本棚を撮影すると本を認識して追加します。',
        'ソーシャル読書：友達、グループ、レビューの共有、チャレンジ、1対1の対戦。グループごとの公開範囲設定付き。',
        'ウィジェット、コントロールセンターのスキャン、読書タイマーのライブアクティビティ。',
        '行レベルセキュリティとEdge Functionsを使ったSupabaseバックエンド。テーマを丸ごと切り替え可能なUI。',
      ],
    },
    tags: [
      'Swift',
      'SwiftUI',
      'WidgetKit',
      'ActivityKit',
      'Supabase',
      'PostgreSQL',
    ],
    cover: {
      kind: 'phone',
      light: booktroveShelf,
      alt: {
        en: 'BookTrove’s virtual bookshelf: shelves of manga spines drawn to scale',
        ja: 'BookTroveのバーチャル本棚。実寸で描かれたマンガの背表紙が並ぶ棚',
      },
    },
    gallery: [
      {
        kind: 'phone',
        light: booktroveShelf,
        alt: {
          en: 'The virtual bookshelf with manga spines drawn to scale',
          ja: '実寸で描かれたマンガの背表紙が並ぶバーチャル本棚',
        },
        caption: { en: 'A to-scale bookshelf.', ja: '実寸の本棚。' },
      },
      {
        kind: 'phone',
        light: booktroveLibrary,
        alt: {
          en: 'The library grid of book covers',
          ja: '本の表紙が並ぶライブラリ',
        },
        caption: { en: 'The library.', ja: 'ライブラリ。' },
      },
      {
        kind: 'phone',
        light: booktroveBook,
        alt: {
          en: 'A book page with reading status and progress',
          ja: '読書状況と進み具合を表示した本のページ',
        },
        caption: { en: 'Progress on a book.', ja: '本ごとの進み具合。' },
      },
      {
        kind: 'phone',
        light: booktroveToday,
        alt: {
          en: 'Today screen with a streak, a goal, a wishlist and friends’ reading',
          ja: 'ストリーク、目標、ウィッシュリスト、友達の読書を表示した今日の画面',
        },
        caption: { en: 'Today at a glance.', ja: '今日のまとめ。' },
      },
      {
        kind: 'phone',
        light: booktroveFeed,
        alt: {
          en: 'The social feed with a rating and a review from friends',
          ja: '友達の評価とレビューが並ぶソーシャルフィード',
        },
        caption: { en: 'Reading with friends.', ja: '友達と読書。' },
      },
      {
        kind: 'phone',
        light: booktroveFriend,
        alt: {
          en: 'A friend’s profile with their books and to-be-read pile',
          ja: '友達のプロフィール。本と積読',
        },
        caption: { en: 'Friends’ shelves.', ja: '友達の本棚。' },
      },
      {
        kind: 'phone',
        light: booktroveWidgets,
        alt: {
          en: 'iPhone home screen with BookTrove reading and streak widgets',
          ja: 'BookTroveの読書・ストリークウィジェットを置いたiPhoneのホーム画面',
        },
        caption: { en: 'Widgets.', ja: 'ウィジェット。' },
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
  {
    id: 'kanpeki-pitch',
    name: 'Kanpeki Pitch',
    logo: kanpekiPitchLogo,
    status: { en: 'Research prototype', ja: '研究プロトタイプ' },
    tagline: {
      en: 'Say a Japanese sentence; see which words had the wrong pitch.',
      ja: '日本語の文を話すと、アクセントがずれた単語を教えてくれます。',
    },
    description: {
      en: 'A pitch-accent trainer that runs entirely on-device. It works out the dictionary accent for each phrase, lines your recording up mora by mora, tracks your pitch, and grades every phrase: ok, wrong, or honestly not sure. A research spike toward an iOS app, with a web demo for sentences, JLPT vocabulary and minimal pairs like 箸・橋・端.',
      ja: '端末内だけで動くピッチアクセント練習ツール。フレーズごとの辞書アクセントを求め、録音をモーラ単位で揃え、声の高さを追跡して、各フレーズを「正しい・違う・判定できない」で評価します。iOSアプリに向けた研究スパイクで、文・JLPT語彙・「箸・橋・端」のようなミニマルペアを練習できるWebデモ付き。',
    },
    highlights: {
      en: [
        'OpenJTalk for the expected accent, a hiragana wav2vec2 model for mora timing, SwiftF0 for pitch.',
        'A tree model and a BiGRU sequence model, averaged: calibrated on new speakers, fewer “not sure”s.',
        'Evaluated on speakers and sentences it never trained on: about 4% false alarms and 1% missed errors.',
        'It abstains rather than guessing: telling a learner they were wrong when they were right is the worst failure.',
        'Reference audio from VOICEVOX, reshaped so its pitch matches the dictionary.',
      ],
      ja: [
        '期待アクセントはOpenJTalk、モーラのタイミングはひらがなwav2vec2モデル、声の高さはSwiftF0。',
        '決定木モデルとBiGRU系列モデルの平均で、初めての話者でも安定し、「判定できない」を減らしています。',
        '学習に使っていない話者と文で評価：誤警報は約4%、見逃しは約1%。',
        '当てずっぽうより「判定しない」を選びます。正しいのに間違いと言うのが学習者にとって最悪だからです。',
        '参照音声はVOICEVOX。辞書のアクセントに合うよう音程を整えています。',
      ],
    },
    tags: [
      'Python',
      'PyTorch',
      'scikit-learn',
      'FastAPI',
      'wav2vec2',
      'OpenJTalk',
      'VOICEVOX',
    ],
    href: 'https://github.com/dchroninger/kanpeki-pitch',
    label: { en: 'View on GitHub', ja: 'GitHubで見る' },
    cover: {
      kind: 'web',
      light: pitchCoverLight,
      dark: pitchCoverDark,
      alt: {
        en: 'Pitch accent result: 80%, 4 of 5 phrases correct, with が in 音が flagged as the wrong pitch',
        ja: 'アクセント判定結果：80%、5フレーズ中4つ正解、「音が」の「が」が誤りとして表示',
      },
    },
    gallery: [
      {
        kind: 'web',
        light: pitchResultLight,
        dark: pitchResultDark,
        alt: {
          en: 'A sentence with its pitch guide, then the result comparing the expected and heard pitch per mora',
          ja: '文とアクセントガイド、その下に期待と実際の音の高さをモーラごとに比べた結果',
        },
        caption: {
          en: 'Graded phrase by phrase: here only 音が came out flat instead of dropping.',
          ja: 'フレーズごとに判定。ここでは「音が」だけが下がらず平らになっています。',
        },
      },
      {
        kind: 'web',
        light: pitchPairLight,
        dark: pitchPairDark,
        alt: {
          en: 'Minimal pairs: 橋, 箸 and 端, all read はし, with their pitch patterns',
          ja: 'ミニマルペア：どれも「はし」と読む橋・箸・端と、それぞれのアクセント',
        },
        caption: {
          en: 'Minimal pairs: which はし did you say?',
          ja: 'ミニマルペア：どの「はし」を言ったか。',
        },
      },
    ],
  },
]

export const HAS_PROJECTS = projects.length > 0
