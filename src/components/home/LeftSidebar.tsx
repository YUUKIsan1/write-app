'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'

interface RankingItem {
  id: string
  title: string
  author: string
  views: number
  trend: 'up' | 'down' | 'same'
}

interface Genre {
  id: string
  name: string
  icon: string
  count: number
  color: string
  subcategories?: SubCategory[]
}

interface SubCategory {
  id: string
  name: string
  count: number
}

const mockRankings: RankingItem[] = [
  {
    id: '1',
    title: 'React 18の新機能完全ガイド',
    author: '田中太郎',
    views: 12547,
    trend: 'up'
  },
  {
    id: '2', 
    title: 'TypeScript 5.0新機能解説',
    author: '佐藤花子',
    views: 9823,
    trend: 'up'
  },
  {
    id: '3',
    title: 'Next.js App Router徹底解説',
    author: '山田一郎',
    views: 8764,
    trend: 'same'
  },
  {
    id: '4',
    title: 'Web3.0開発入門',
    author: '鈴木美咲',
    views: 7652,
    trend: 'down'
  },
  {
    id: '5',
    title: 'AI活用したコード生成術',
    author: '高橋健太',
    views: 6891,
    trend: 'up'
  }
]

const mockGenres: Genre[] = [
  { 
    id: 'frontend', 
    name: 'フロントエンド', 
    icon: '🎨', 
    count: 1247, 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    subcategories: [
      { id: 'react', name: 'React', count: 456 },
      { id: 'vue', name: 'Vue.js', count: 234 },
      { id: 'angular', name: 'Angular', count: 178 },
      { id: 'typescript', name: 'TypeScript', count: 379 }
    ]
  },
  { 
    id: 'backend', 
    name: 'バックエンド', 
    icon: '⚙️', 
    count: 892, 
    color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    subcategories: [
      { id: 'node', name: 'Node.js', count: 312 },
      { id: 'python', name: 'Python', count: 276 },
      { id: 'java', name: 'Java', count: 189 },
      { id: 'go', name: 'Go', count: 115 }
    ]
  },
  { 
    id: 'mobile', 
    name: 'モバイル', 
    icon: '📱', 
    count: 634, 
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    subcategories: [
      { id: 'reactnative', name: 'React Native', count: 234 },
      { id: 'flutter', name: 'Flutter', count: 198 },
      { id: 'ios', name: 'iOS', count: 123 },
      { id: 'android', name: 'Android', count: 79 }
    ]
  },
  { 
    id: 'ai', 
    name: 'AI・機械学習', 
    icon: '🤖', 
    count: 567, 
    color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    subcategories: [
      { id: 'ml', name: '機械学習', count: 234 },
      { id: 'dl', name: 'ディープラーニング', count: 156 },
      { id: 'nlp', name: '自然言語処理', count: 89 },
      { id: 'cv', name: 'コンピュータビジョン', count: 88 }
    ]
  },
  { 
    id: 'design', 
    name: 'デザイン', 
    icon: '✨', 
    count: 423, 
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
    subcategories: [
      { id: 'ui', name: 'UI/UX', count: 198 },
      { id: 'figma', name: 'Figma', count: 123 },
      { id: 'css', name: 'CSS', count: 67 },
      { id: 'designsystem', name: 'デザインシステム', count: 35 }
    ]
  },
  { 
    id: 'career', 
    name: 'キャリア', 
    icon: '🚀', 
    count: 389, 
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    subcategories: [
      { id: 'jobhunt', name: '転職活動', count: 156 },
      { id: 'interview', name: '面接対策', count: 89 },
      { id: 'skills', name: 'スキルアップ', count: 98 },
      { id: 'freelance', name: 'フリーランス', count: 46 }
    ]
  }
]

export default function LeftSidebar() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null)

  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗</span>
      case 'down':
        return <span className="text-red-500">↘</span>
      default:
        return <span className="text-gray-400">→</span>
    }
  }

  return (
    <div className="w-72 space-y-6">
      {/* 人気ランキング */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">人気ランキング</h3>
          <div className="w-4 h-4 ml-2 text-orange-500">
            <Icons.TrendingUp />
          </div>
        </div>
        
        <div className="space-y-3">
          {mockRankings.map((item, index) => (
            <div key={item.id} className="group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                    {getTrendIcon(item.trend)}
                  </div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.author}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-3 h-3 mr-1">
                        <Icons.TrendingUp />
                      </div>
                      {item.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Link href="/articles?tab=trending">
          <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            すべて見る
          </button>
        </Link>
      </div>

      {/* ジャンル別記事 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">ジャンル</h3>
            <div className="w-4 h-4 ml-2 text-blue-500">
              <Icons.BookOpen />
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {mockGenres.map((genre) => (
            <div key={genre.id} className="border-b border-gray-50 dark:border-gray-700 last:border-b-0">
              <button
                onClick={() => setActiveGenre(activeGenre === genre.id ? null : genre.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{genre.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        {genre.name}
                      </h4>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${genre.color} mt-1`}>
                        {genre.count}記事
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    activeGenre === genre.id ? 'rotate-180' : ''
                  }`}>
                    <Icons.ChevronDown />
                  </div>
                </div>
              </button>
              
              {/* サブカテゴリの展開 */}
              {activeGenre === genre.id && genre.subcategories && (
                <div className="bg-gray-50 dark:bg-gray-700 px-4 pb-2">
                  {genre.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/articles?genre=${encodeURIComponent(genre.name)}&subgenre=${encodeURIComponent(sub.name)}`}
                      className="block py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 my-1"
                    >
                      <div className="flex items-center justify-between">
                        <span>{sub.name}</span>
                        <span className="text-xs text-gray-400">{sub.count}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 今週のスライド */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2"></div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">今週のスライド</h3>
          <div className="w-4 h-4 ml-2 text-green-500">
            <Icons.Play />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
          <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2">
                <Icons.Play />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">React Hooks深掘り</p>
            </div>
          </div>
          
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
            React Hooks完全マスター
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            useState、useEffect、カスタムフックまで
          </p>
          
          <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
            スライドを見る
          </button>
        </div>
      </div>
    </div>
  )
}