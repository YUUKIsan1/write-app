import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/auth/SessionProvider'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechKnot - 技術コミュニティプラットフォーム',
  description: '知識を共有し、スキルを磨き、コミュニティで成長する技術プラットフォーム',
  keywords: ['技術', 'プログラミング', 'コミュニティ', '学習', 'スキルアップ'],
  authors: [{ name: 'TechKnot Team' }],
  openGraph: {
    title: 'TechKnot',
    description: '技術者のための知識共有プラットフォーム',
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}