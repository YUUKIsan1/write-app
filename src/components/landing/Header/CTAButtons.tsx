import Link from 'next/link'
import { Icons } from '@/components/ui/icons'

interface CTAButtonsProps {
  isMobile?: boolean
}

export default function CTAButtons({ isMobile = false }: CTAButtonsProps) {
  const containerClasses = isMobile 
    ? "flex flex-col space-y-4 pt-6 border-t border-gray-200/20"
    : "hidden md:flex items-center space-x-4"

  return (
    <div className={containerClasses}>
      {/* 最高レベルのログインボタン */}
      <Link href="/login" className={isMobile ? "w-full" : ""}>
        <div className={`${isMobile ? "w-full" : ""} group relative overflow-hidden`}>
          {/* プレミアムなグロー効果 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          
          {/* メインボタン */}
          <div className={`${isMobile ? "w-full justify-center" : ""} relative px-8 py-4 bg-gradient-to-r from-slate-900/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-white/20 text-white font-semibold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/25 flex items-center group-hover:border-cyan-400/40`}>
            {/* 内側のグラデーション効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* アイコン */}
            <div className="relative z-10 w-5 h-5 mr-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
              <Icons.Users />
            </div>
            
            {/* テキスト */}
            <span className="relative z-10 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-blue-200 group-hover:to-indigo-200 transition-all duration-300">
              ログイン
            </span>
            
            {/* ホバー時のスパークル効果 */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </Link>
      
      {/* アップグレードされた無料で始めるボタン */}
      <Link href="/register" className={isMobile ? "w-full" : ""}>
        <div className={`${isMobile ? "w-full" : ""} group relative overflow-hidden`}>
          {/* 動的グロー効果 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          
          {/* メインボタン */}
          <button className={`${isMobile ? "w-full justify-center" : ""} relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50 flex items-center group`}>
            {/* プレミアムな内側効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* アイコン */}
            <div className="relative z-10 w-5 h-5 mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <Icons.Rocket />
            </div>
            
            {/* テキスト */}
            <span className="relative z-10 group-hover:text-yellow-100 transition-colors duration-300">
              無料で始める
            </span>
            
            {/* 動的なパーティクル効果 */}
            <div className="absolute top-1 right-2 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
            <div className="absolute bottom-2 left-3 w-1 h-1 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-3 left-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-400" style={{ animationDelay: '0.4s' }}></div>
          </button>
        </div>
      </Link>
    </div>
  )
}