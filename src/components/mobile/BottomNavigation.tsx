'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'

interface NavItem {
  id: string
  label: string
  icon: keyof typeof Icons
  href: string
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'ホーム',
    icon: 'Home',
    href: '/'
  },
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    icon: 'BarChart3',
    href: '/dashboard'
  },
  {
    id: 'create',
    label: '投稿',
    icon: 'Plus',
    href: '/create'
  },
  {
    id: 'mypage',
    label: 'マイページ',
    icon: 'User',
    href: '/profile'
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* モバイル専用下部ナビゲーション */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 safe-area-pb">
        <div className="flex items-center justify-around px-1 py-1">
          {navItems.map((item) => {
            const IconComponent = Icons[item.icon]
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 min-h-[56px] py-2 px-2 rounded-xl transition-all duration-200 ${
                  active 
                    ? 'bg-blue-50 dark:bg-blue-900/30' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {/* アイコンとバッジ */}
                <div className="relative mb-1">
                  <div className={`w-6 h-6 transition-colors duration-200 ${
                    active 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    <IconComponent />
                  </div>
                  
                  {/* バッジ（通知数） */}
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                      {item.badge > 99 ? '99+' : item.badge}
                    </div>
                  )}
                </div>
                
                {/* ラベル */}
                <span className={`text-xs font-medium transition-colors duration-200 line-clamp-1 ${
                  active 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {item.label}
                </span>
                
                {/* アクティブインジケーター */}
                {active && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* モバイル用下部パディング（ナビに重ならないようにコンテンツを上げる） */}
      <div className="md:hidden h-20" />
    </>
  )
}