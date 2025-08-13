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
    name: '学習・スキルマーケット',
    href: '/courses',
    icon: Icons.Award,
    gradient: 'from-green-500 to-emerald-600',
    description: '学習とスキル提供の統合プラットフォーム'
  },
  {
    name: 'コミュニティ',
    href: '/community',
    icon: Icons.Users,
    gradient: 'from-pink-500 to-rose-600',
    description: 'トークとコンテンツで仲間とつながる'
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
    href: '/profile',
    icon: Icons.User,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'プロフィール管理'
  },
  {
    name: '設定',
    href: '/settings',
    icon: Icons.Settings,
    gradient: 'from-gray-500 to-slate-600',
    description: 'アプリ設定'
  }
]

const bottomNavigation: any[] = []

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)

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
        fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 z-50
        ${isOpen ? 'w-64' : 'w-20 md:w-20'}
        border-r border-gray-100 dark:border-gray-800
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
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
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
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
                      : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-700'
                    }
                    ${!isOpen && 'mx-auto'}
                  `}>
                    <Icon />
                  </div>

                  {isOpen && (
                    <div className="ml-4 flex-1">
                      <div className={`font-semibold transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
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
        <div className="border-t border-gray-100 dark:border-gray-800 mx-4"></div>

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
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
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
                    <span className="ml-4 font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
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
        <div className="border-t border-gray-100 dark:border-gray-800 p-4">
          <div 
            onClick={() => setShowUserModal(true)}
            className={`
              flex items-center p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 
              dark:from-gray-800 dark:to-blue-900/20
              hover:from-gray-100 hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-blue-800/30
              transition-all duration-300 cursor-pointer group
              ${!isOpen && 'justify-center'}
            `}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                TU
              </div>
              {showOnlineStatus && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            {isOpen && (
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">田中ユーザー</div>
                  <div className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity transform rotate-90">
                    <Icons.ChevronDown />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedPlan === 'free' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                    selectedPlan === 'premium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {
                      selectedPlan === 'free' ? 'フリー' :
                      selectedPlan === 'premium' ? 'プレミアム' :
                      'プロ'
                    }
                  </div>
                  {showOnlineStatus && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">オンライン</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Settings Modal */}
        {showUserModal && (
          <>
            {/* Modal Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setShowUserModal(false)}
            />
            
            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-[61] p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg mx-auto max-h-[85vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 text-gray-700 dark:text-gray-300">
                      <Icons.User />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">アカウント設定</h3>
                  </div>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-4 h-4 text-gray-500 dark:text-gray-400">
                      <Icons.X />
                    </div>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg">
                        TU
                      </div>
                      {showOnlineStatus && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">田中ユーザー</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">tanaka@example.com</p>
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-4 h-4 text-indigo-500">
                        <Icons.Award />
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">料金プラン</h5>
                    </div>
                    <div className="space-y-2">
                      {[
                        { id: 'free', name: 'フリー', price: '¥0/月', color: 'gray', icon: '✨' },
                        { id: 'premium', name: 'プレミアム', price: '¥980/月', color: 'blue', icon: '🚀' },
                        { id: 'pro', name: 'プロ', price: '¥1,980/月', color: 'purple', icon: '👑' }
                      ].map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`
                            flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200
                            ${selectedPlan === plan.id
                              ? plan.color === 'gray'
                                ? 'border-gray-400 bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600'
                                : plan.color === 'blue'
                                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                                : 'border-purple-400 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-500'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{plan.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{plan.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{plan.price}</div>
                            </div>
                          </div>
                          {selectedPlan === plan.id && (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              plan.color === 'gray' ? 'bg-gray-500' :
                              plan.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                            }`}>
                              <div className="w-2 h-2 text-white">
                                <Icons.Check />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Online Status Toggle */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        showOnlineStatus ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">オンライン状態表示</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">他のユーザーに表示</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowOnlineStatus(!showOnlineStatus)}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${showOnlineStatus ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${showOnlineStatus ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}