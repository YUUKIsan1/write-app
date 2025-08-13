'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'

const quickActions = [
  {
    id: 1,
    title: '新しいコース開始',
    description: '興味のある分野の学習を始めましょう',
    icon: Icons.BookOpen,
    gradient: 'from-blue-500 to-indigo-600',
    hoverGradient: 'hover:from-blue-600 hover:to-indigo-700',
    bgGradient: 'from-blue-50 to-indigo-50',
    href: '/dashboard/courses/new',
    shortcut: 'N',
    popular: true
  },
  {
    id: 2,
    title: 'プロジェクト作成',
    description: '学んだスキルを実践で活かしましょう',
    icon: Icons.Code,
    gradient: 'from-purple-500 to-violet-600',
    hoverGradient: 'hover:from-purple-600 hover:to-violet-700',
    bgGradient: 'from-purple-50 to-violet-50',
    href: '/dashboard/projects/create',
    shortcut: 'P',
    popular: false
  },
  {
    id: 3,
    title: 'メンター予約',
    description: '専門家との個別セッションを予約',
    icon: Icons.Users,
    gradient: 'from-green-500 to-emerald-600',
    hoverGradient: 'hover:from-green-600 hover:to-emerald-700',
    bgGradient: 'from-green-50 to-emerald-50',
    href: '/dashboard/mentoring/book',
    shortcut: 'M',
    popular: true
  },
  {
    id: 4,
    title: 'コミュニティ参加',
    description: '仲間との交流でモチベーションアップ',
    icon: Icons.MessageCircle,
    gradient: 'from-pink-500 to-rose-600',
    hoverGradient: 'hover:from-pink-600 hover:to-rose-700',
    bgGradient: 'from-pink-50 to-rose-50',
    href: '/dashboard/community',
    shortcut: 'C',
    popular: false
  },
  {
    id: 5,
    title: 'スキル診断',
    description: '現在のスキルレベルを測定しましょう',
    icon: Icons.BarChart3,
    gradient: 'from-orange-500 to-red-600',
    hoverGradient: 'hover:from-orange-600 hover:to-red-700',
    bgGradient: 'from-orange-50 to-red-50',
    href: '/dashboard/assessment',
    shortcut: 'S',
    popular: false
  },
  {
    id: 6,
    title: 'キャリア相談',
    description: '転職・キャリアアップのサポートを受ける',
    icon: Icons.TrendingUp,
    gradient: 'from-cyan-500 to-blue-600',
    hoverGradient: 'hover:from-cyan-600 hover:to-blue-700',
    bgGradient: 'from-cyan-50 to-blue-50',
    href: '/dashboard/career',
    shortcut: 'K',
    popular: true
  }
]

const recentResources = [
  {
    id: 1,
    title: 'React 18新機能まとめ',
    type: 'Article',
    readTime: '5分',
    thumbnail: '⚛️',
    category: 'Frontend'
  },
  {
    id: 2,
    title: 'TypeScript実践パターン',
    type: 'Guide',
    readTime: '12分',
    thumbnail: '🟦',
    category: 'Language'
  },
  {
    id: 3,
    title: 'デザインシステム構築',
    type: 'Tutorial',
    readTime: '25分',
    thumbnail: '🎨',
    category: 'Design'
  }
]

export default function QuickActions() {
  const [hoveredAction, setHoveredAction] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">クイックアクション</h3>
            <p className="text-sm text-gray-500">よく使用する機能への素早いアクセス</p>
          </div>
          <div className="text-xs text-gray-400">
            キーボードショートカット対応
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            
            return (
              <div
                key={action.id}
                className={`
                  group relative p-6 rounded-2xl border border-gray-100 cursor-pointer
                  transition-all duration-500 hover:shadow-2xl hover:scale-105
                  bg-gradient-to-br ${action.bgGradient} hover:border-gray-200
                  ${hoveredAction === action.id ? 'shadow-xl' : 'hover:shadow-lg'}
                `}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                {/* Popular Badge */}
                {action.popular && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`
                    inline-flex p-3 rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-lg mb-4
                    group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500
                    ${action.hoverGradient}
                  `}>
                    <Icon />
                  </div>

                  {/* Title and Description */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  {/* Shortcut and Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                        <span className="text-xs font-mono font-semibold text-gray-600">
                          ⌘ {action.shortcut}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
                      transition-all duration-300 text-gray-400 group-hover:text-gray-600
                    `}>
                      <Icons.ArrowRight />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`
                  absolute -inset-1 bg-gradient-to-r ${action.gradient} rounded-3xl blur-xl opacity-0 
                  group-hover:opacity-20 transition-opacity duration-500 -z-10
                `} />

                {/* Interactive Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className={`
                    absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${action.gradient}
                    opacity-0 group-hover:opacity-60 animate-ping transition-opacity duration-300
                  `} />
                  <div className={`
                    absolute bottom-4 left-4 w-1 h-1 rounded-full bg-gradient-to-r ${action.gradient}
                    opacity-0 group-hover:opacity-40 animate-pulse transition-opacity duration-500
                  `} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Resources */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">おすすめリソース</h3>
            <p className="text-sm text-gray-500">あなたの学習に役立つコンテンツ</p>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200">
            すべて見る
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentResources.map((resource) => (
            <div
              key={resource.id}
              className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-xl group-hover:shadow-lg transition-all duration-300">
                  {resource.thumbnail}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {resource.title}
                  </h4>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 group-hover:bg-blue-100 text-xs font-medium text-gray-600 group-hover:text-blue-600 rounded-full transition-all duration-300">
                      {resource.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {resource.readTime}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-1">
                    {resource.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}