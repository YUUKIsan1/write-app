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
      {/* ログインボタン */}
      <Link href="/login" className={isMobile ? "w-full" : ""}>
        <button className={`${isMobile ? "w-full" : ""} px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 border border-gray-200 rounded-lg hover:bg-gray-50`}>
          ログイン
        </button>
      </Link>
      
      {/* 登録ボタン */}
      <Link href="/register" className={isMobile ? "w-full" : ""}>
        <button className={`${isMobile ? "w-full justify-center" : ""} group relative px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center`}>
          <Icons.User />
          <span className="ml-2">登録</span>
        </button>
      </Link>
    </div>
  )
}