import type { Metadata } from 'next'
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
  title: 'TechKnot - 認証',
  description: 'AI駆動の学習プラットフォーム - ログイン・アカウント作成',
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4">
          {/* 背景装飾 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-20 -left-48"></div>
            <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 -right-48"></div>
            <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* パーティクル */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse top-1/4 left-1/6"></div>
            <div className="absolute w-3 h-3 bg-purple-400/20 rounded-full animate-pulse top-1/3 right-1/4 animation-delay-1000"></div>
            <div className="absolute w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse bottom-1/3 left-3/4 animation-delay-2000"></div>
            <div className="absolute w-2 h-2 bg-cyan-400/25 rounded-full animate-pulse top-2/3 left-1/3 animation-delay-3000"></div>
            <div className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse bottom-1/4 right-1/3 animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default AuthLayout