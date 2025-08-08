'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Icons.Home,
    gradient: 'from-blue-500 to-indigo-600',
    description: 'ホームページ'
  },
  {
    name: '学習コース',
    href: '/dashboard/courses',
    icon: Icons.BookOpen,
    gradient: 'from-green-500 to-emerald-600',
    description: 'スキルアップ'
  },
  {
    name: 'スキル提供',
    href: '/dashboard/skills',
    icon: Icons.Award,
    gradient: 'from-purple-500 to-violet-600',
    description: '知識を共有'
  },
  {
    name: 'コミュニティ',
    href: '/dashboard/community',
    icon: Icons.Users,
    gradient: 'from-pink-500 to-rose-600',
    description: '仲間とつながる'
  },
  {
    name: 'ダッシュボード',
    href: '/dashboard',
    icon: Icons.BarChart3,
    gradient: 'from-orange-500 to-red-600',
    description: '学習の全体像'
  },
  {
    name: 'マイページ',
    href: '/dashboard/profile',
    icon: Icons.User,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'プロフィール管理'
  },
  {
    name: '設定',
    href: '/dashboard/settings',
    icon: Icons.Settings,
    gradient: 'from-gray-500 to-slate-600',
    description: 'アプリ設定'
  }
]

const bottomNavigation = [
  {
    name: 'ヘルプ',
    href: '/dashboard/help',
    icon: Icons.HelpCircle,
    gradient: 'from-amber-500 to-yellow-600'
  }
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-2xl transition-all duration-300 z-50
        ${isOpen ? 'w-64' : 'w-20 md:w-20'}
        border-r border-gray-100
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isOpen && (
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechKnot
                </span>
              </Link>
            )}
            {!isOpen && (
              <Link href="/" className="block mx-auto">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`
                    group flex items-center p-3 rounded-2xl transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full"></div>
                  )}

                  {/* Icon with Gradient Background */}
                  <div className={`
                    relative p-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                      : 'group-hover:bg-gray-100'
                    }
                    ${!isOpen && 'mx-auto'}
                  `}>
                    <Icon />
                  </div>

                  {isOpen && (
                    <div className="ml-4 flex-1">
                      <div className={`font-semibold transition-colors ${isActive ? 'text-blue-600' : ''}`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  {!isActive && (
                    <div className={`
                      absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 
                      rounded-2xl transition-opacity duration-300
                    `} />
                  )}
                </Link>

                {/* Tooltip for Collapsed State */}
                {!isOpen && hoveredItem === item.name && (
                  <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl">
                      {item.name}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-100 mx-4"></div>

        {/* Bottom Navigation */}
        <div className="p-4 space-y-2">
          {bottomNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={`
                    group flex items-center p-3 rounded-2xl transition-all duration-300
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="p-2">
                    <Icon />
                  </div>
                  {isOpen && (
                    <span className="ml-4 font-medium">{item.name}</span>
                  )}
                </Link>

                {/* Tooltip for Collapsed State */}
                {!isOpen && hoveredItem === item.name && (
                  <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl">
                      {item.name}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-100 p-4">
          <div className={`
            flex items-center p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 
            hover:from-gray-100 hover:to-blue-100 transition-all duration-300 cursor-pointer
            ${!isOpen && 'justify-center'}
          `}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                TU
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            {isOpen && (
              <div className="ml-3">
                <div className="text-sm font-semibold text-gray-900">田中ユーザー</div>
                <div className="text-xs text-gray-500">プレミアムプラン</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}