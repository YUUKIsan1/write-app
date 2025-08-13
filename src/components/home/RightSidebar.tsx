'use client'

import Image from 'next/image'
import { Icons } from '@/components/ui/icons'

interface AdSlot {
  id: string
  type: 'sponsored' | 'community' | 'premium'
  title: string
  description: string
  image?: string
  link: string
  price?: string
}

const mockAds: AdSlot[] = [
  {
    id: '1',
    type: 'sponsored',
    title: 'TechKnot Premium',
    description: 'すべての機能を解除して、学習を加速させましょう',
    link: '/premium',
    price: '月額 ¥980'
  },
  {
    id: '2', 
    type: 'community',
    title: 'React勉強会開催',
    description: '毎週土曜日にオンライン勉強会を開催中！',
    link: '/events',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    type: 'sponsored',
    title: 'Web開発コース',
    description: 'ゼロからプロレベルまで。転職保証付き',
    link: '/courses',
    price: '期間限定 30% OFF'
  }
]

interface PersonalAdSlot {
  id: string
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  title: string
  description: string
  category: string
  budget: string
  duration: string
}

const mockPersonalAds: PersonalAdSlot[] = [
  {
    id: '1',
    user: {
      name: '株式会社テックイノベーション',
      avatar: '🏢',
      verified: true
    },
    title: 'フロントエンドエンジニア募集',
    description: 'React/TypeScriptの経験者歓迎。リモートワーク可能',
    category: '求人',
    budget: '¥50,000/月',
    duration: '30日間'
  },
  {
    id: '2',
    user: {
      name: 'フリーランス田中',
      avatar: '👨‍💻',
      verified: false
    },
    title: 'Webサイト制作承ります',
    description: 'LP、コーポレートサイト、ECサイトなど',
    category: 'サービス',
    budget: '¥20,000/月',
    duration: '14日間'
  }
]

export default function RightSidebar() {
  return (
    <div className="w-80 space-y-6">
      {/* スポンサー広告 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2"></div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">スポンサー</h3>
            <span className="ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
              AD
            </span>
          </div>
        </div>
        
        <div className="space-y-4 p-4">
          {mockAds.map((ad) => (
            <div key={ad.id} className="group cursor-pointer p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200">
              {ad.image && (
                <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                  <Image 
                    src={ad.image} 
                    alt={ad.title}
                    width={320}
                    height={180}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ad.title}
                </h4>
                {ad.type === 'premium' && (
                  <div className="w-4 h-4 text-yellow-500">
                    <Icons.Star />
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {ad.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  ad.type === 'sponsored' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                  ad.type === 'premium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {ad.type === 'sponsored' ? 'スポンサー' : ad.type === 'premium' ? 'プレミアム' : 'コミュニティ'}
                </span>
                {ad.price && (
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {ad.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 個人広告枠 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">コミュニティ広告</h3>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              広告を出す
            </button>
          </div>
        </div>
        
        <div className="space-y-4 p-4">
          {mockPersonalAds.map((ad) => (
            <div key={ad.id} className="group cursor-pointer p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-200">
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-lg">{ad.user.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h5 className="font-medium text-xs text-gray-900 dark:text-white">
                      {ad.user.name}
                    </h5>
                    {ad.user.verified && (
                      <div className="w-3 h-3 ml-1 text-blue-500">
                        <Icons.Check />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                      {ad.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                {ad.title}
              </h4>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {ad.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-3">
                  <span>予算: {ad.budget}</span>
                  <span>期間: {ad.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
            あなたも広告を出してみませんか？
          </button>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 text-white">
              <Icons.Plus />
            </div>
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            投稿してみませんか？
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            あなたの知識をコミュニティとシェアしましょう
          </p>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            今すぐ投稿
          </button>
        </div>
      </div>
    </div>
  )
}