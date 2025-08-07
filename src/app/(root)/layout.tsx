import { type Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TechKnot - 技術への情熱が人をつなぐ成長プラットフォーム',
  description: '学習・アウトプット・コミュニティが一つになった、プロフェッショナルのための総合学習環境。エンジニアとマーケターのスキルアップを全面支援。',
  keywords: 'エンジニア学習, マーケティング学習, プログラミング, デジタルマーケティング, スキルアップ, 転職支援, コミュニティ',
  authors: [{ name: 'TechKnot Team' }],
  creator: 'TechKnot',
  publisher: 'TechKnot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://learnhub.jp'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechKnot - 技術への情熱が人をつなぐ成長プラットフォーム',
    description: '学習・アウトプット・コミュニティが一つになった総合学習環境',
    url: 'https://learnhub.jp',
    siteName: 'TechKnot',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechKnot - 技術への情熱が人をつなぐ成長プラットフォーム',
    description: '学習・アウトプット・コミュニティが一つになった総合学習環境',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}