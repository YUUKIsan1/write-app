'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import AppLayout from '@/components/layout/AppLayout'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  enrolled: number
  price: number
  thumbnail: string
  tags: string[]
  progress?: number
  type?: 'course' | 'skill' | 'consultation'
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React完全マスターコース',
    description: 'ReactとTypeScriptを使った実践的なWeb開発を学習します。初心者から上級者まで対応したカリキュラム。',
    instructor: '田中太郎',
    duration: '40時間',
    level: 'intermediate',
    rating: 4.8,
    enrolled: 1250,
    price: 29800,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    tags: ['React', 'TypeScript', 'JavaScript', 'Web開発'],
    progress: 65,
    type: 'course'
  },
  {
    id: '2',
    title: 'Next.js実践ガイド',
    description: 'Next.jsを使ったフルスタック開発を実践的に学習。SSR、SSG、API Routesまで網羅。',
    instructor: '佐藤花子',
    duration: '35時間',
    level: 'advanced',
    rating: 4.9,
    enrolled: 890,
    price: 34800,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
    tags: ['Next.js', 'React', 'フルスタック', 'API'],
    type: 'course'
  },
  {
    id: '3',
    title: 'プログラミング基礎講座',
    description: '完全初心者向けのプログラミング基礎コース。HTML、CSS、JavaScriptから丁寧に解説。',
    instructor: '山田一郎',
    duration: '25時間',
    level: 'beginner',
    rating: 4.7,
    enrolled: 2340,
    price: 19800,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    tags: ['HTML', 'CSS', 'JavaScript', '初心者向け'],
    type: 'course'
  }
]

const mockSkills: Course[] = [
  {
    id: '4',
    title: 'UI/UXデザインレビュー・コンサルティング',
    description: 'あなたのプロダクトのUI/UXを専門的な観点からレビュー・改善提案します。デザイン業界7年の経験を活かしてアドバイス。',
    instructor: '鈴木デザイナー',
    duration: '2時間/回',
    level: 'intermediate',
    rating: 4.9,
    enrolled: 45,
    price: 8000,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    tags: ['UI/UX', 'デザイン', 'コンサルティング', 'レビュー'],
    type: 'consultation'
  },
  {
    id: '5',
    title: 'フロントエンド開発スキル支援',
    description: 'React, Vue.js, Next.jsを使った開発でお困りの方をサポート。コードレビューから設計相談まで幅広く対応。',
    instructor: '高橋エンジニア',
    duration: '1時間/回',
    level: 'intermediate',
    rating: 4.8,
    enrolled: 78,
    price: 6000,
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop',
    tags: ['React', 'Vue.js', 'フロントエンド', '技術支援'],
    type: 'skill'
  },
  {
    id: '6',
    title: 'キャリア相談・転職支援',
    description: 'IT業界での転職・キャリアアップを支援。履歴書添削、面接対策、キャリアプラン設計を行います。',
    instructor: '佐々木キャリアコンサルタント',
    duration: '90分/回',
    level: 'beginner',
    rating: 4.7,
    enrolled: 123,
    price: 5000,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    tags: ['キャリア', '転職', '相談', 'IT業界'],
    type: 'consultation'
  },
  {
    id: '7',
    title: 'Python・機械学習スキル指導',
    description: 'Pythonを使った機械学習・データサイエンスのスキルを教えます。実務経験5年の現役エンジニアが指導。',
    instructor: '石井データサイエンティスト',
    duration: '2時間/回',
    level: 'advanced',
    rating: 4.9,
    enrolled: 67,
    price: 9000,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop',
    tags: ['Python', '機械学習', 'データサイエンス', 'AI'],
    type: 'skill'
  }
]

const levelColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
}

const levelLabels = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<'learning' | 'marketplace'>('learning')
  const [subTab, setSubTab] = useState<'all' | 'enrolled' | 'completed' | 'popular' | 'new'>('all')

  const mainTabs = [
    { id: 'learning' as const, label: '学習コンテンツ', icon: 'BookOpen', description: '自分の学習コース' },
    { id: 'marketplace' as const, label: 'マーケットプレイス', icon: 'Award', description: 'スキルを提供・購入' }
  ]

  const learningTabs = [
    { id: 'all' as const, label: '全てのコース', count: mockCourses.length },
    { id: 'enrolled' as const, label: '受講中', count: 2 },
    { id: 'completed' as const, label: '完了済み', count: 5 }
  ]

  const marketplaceTabs = [
    { id: 'all' as const, label: 'すべて', count: mockSkills.length },
    { id: 'popular' as const, label: '人気', count: mockSkills.length },
    { id: 'new' as const, label: '新着', count: mockSkills.length }
  ]

  const filteredCourses = (() => {
    const dataSource = activeTab === 'learning' ? mockCourses : mockSkills
    
    if (activeTab === 'learning' && subTab === 'enrolled') {
      return dataSource.filter(course => course.progress !== undefined)
    }
    return dataSource
  })()

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* ページタイトル */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            学習・スキルマーケット
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            学習とスキル提供の統合プラットフォーム
          </p>
        </div>

        {/* メインタブナビゲーション */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {mainTabs.map((tab) => {
              const IconComponent = Icons[tab.icon as keyof typeof Icons]
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 mr-3 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      <IconComponent />
                    </div>
                    <h3 className={`font-semibold ${activeTab === tab.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                      {tab.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tab.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* サブタブナビゲーション */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-1 inline-flex">
            {(activeTab === 'learning' ? learningTabs : marketplaceTabs).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  subTab === tab.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* コースグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* サムネイル */}
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 text-white">
                      <Icons.Play />
                    </div>
                  </div>
                </div>
                
                {/* 進捗バー（受講中の場合） */}
                {course.progress !== undefined && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span>進捗</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* コンテンツ */}
              <div className="p-6">
                {/* レベルと評価 */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[course.level]}`}>
                    {levelLabels[course.level]}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <div className="w-4 h-4 mr-1">
                      <Icons.Star />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* タイトル */}
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>

                {/* 説明 */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* 講師と時間 */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.instructor}</span>
                  <span className="flex items-center">
                    <div className="w-4 h-4 mr-1">
                      <Icons.Clock />
                    </div>
                    {course.duration}
                  </span>
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                      +{course.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* 価格と受講者数/利用者数 */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ¥{course.price.toLocaleString()}
                      {activeTab === 'marketplace' && course.type === 'skill' && <span className="text-sm font-normal">/回</span>}
                      {activeTab === 'marketplace' && course.type === 'consultation' && <span className="text-sm font-normal">/セッション</span>}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {course.enrolled.toLocaleString()}人
                    {activeTab === 'learning' ? '受講中' : activeTab === 'marketplace' && course.type === 'skill' ? '利用済み' : '相談済み'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状態 */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <Icons.BookOpen />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              コースが見つかりません
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              条件に一致するコースがありません
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}