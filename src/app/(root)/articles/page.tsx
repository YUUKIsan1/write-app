'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import Sidebar from '@/components/dashboard/Sidebar'

type ContentType = 'memo' | 'article' | 'book'
type TabType = 'following' | 'tags' | 'recommended'

interface Post {
  id: string
  type: ContentType
  title?: string
  content: string
  excerpt: string
  readingTime: string
  author: {
    name: string
    avatar: string
    username: string
    bio: string
  }
  tags: string[]
  createdAt: string
  likes: number
  comments: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
  coverImage?: string
}

// 拡張されたモックデータ
const mockPosts: Post[] = [
  {
    id: '1',
    type: 'article',
    title: 'React 18の新機能 - Concurrent Featuresで変わるフロントエンド開発',
    content: `# React 18の革新的な新機能

React 18で導入されたConcurrent Featuresは、フロントエンド開発に革命をもたらします。

## Automatic Batching
React 18では、複数のstate更新を自動的にバッチ処理します。これにより、パフォーマンスが大幅に向上します。`,
    excerpt: 'React 18で導入されたConcurrent Featuresの詳細解説。Automatic BatchingやSuspenseの進化について実際のコード例と共に学びましょう。',
    readingTime: '5分',
    author: {
      name: '田中太郎',
      avatar: '👨‍💻',
      username: 'tanaka_dev',
      bio: 'フロントエンドエンジニア | React/TypeScript愛好家'
    },
    tags: ['React', 'JavaScript', 'フロントエンド', 'Concurrent Features'],
    createdAt: '2時間前',
    likes: 128,
    comments: 24,
    views: 847,
    isLiked: false,
    isBookmarked: true,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    type: 'article',
    title: 'Vue.js 3 Composition APIの実践的活用法',
    excerpt: 'Vue.js 3のComposition APIを使った実践的なアプリケーション開発手法を詳しく解説します。',
    readingTime: '7分',
    author: {
      name: '山田花子',
      avatar: '🌸',
      username: 'yamada_vue',
      bio: 'Vue.jsエンジニア | フロントエンド設計者'
    },
    tags: ['Vue.js', 'Composition API', 'フロントエンド'],
    createdAt: '4時間前',
    likes: 95,
    comments: 18,
    views: 523,
    isLiked: true,
    isBookmarked: false,
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    content: ''
  },
  {
    id: '6',
    type: 'article', 
    title: 'TypeScript 5.0新機能完全解説',
    excerpt: 'TypeScript 5.0で導入された新機能とパフォーマンス改善について実例を交えて解説します。',
    readingTime: '6分',
    author: {
      name: '佐藤次郎',
      avatar: '💼',
      username: 'sato_ts',
      bio: 'TypeScript エバンジェリスト | バックエンドエンジニア'
    },
    tags: ['TypeScript', 'JavaScript', '型システム'],
    createdAt: '6時間前',
    likes: 156,
    comments: 32,
    views: 789,
    isLiked: false,
    isBookmarked: true,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    content: ''
  },
  // 追加のモックデータ
  ...Array.from({length: 20}, (_, index) => ({
    id: `${index + 7}`,
    type: 'article' as ContentType,
    title: `サンプル記事 ${index + 1} - 技術ブログのタイトル例`,
    excerpt: `これはサンプル記事の抜粋です。記事番号${index + 1}の内容について簡潔に説明しています。実際のプロジェクトでは、ここに記事の概要が表示されます。`,
    readingTime: `${Math.floor(Math.random() * 10) + 3}分`,
    author: {
      name: `ユーザー${index + 1}`,
      avatar: ['👨‍💻', '👩‍💻', '🎨', '📚', '⚡'][index % 5],
      username: `user${index + 1}`,
      bio: `エンジニア | 技術ブロガー ${index + 1}`
    },
    tags: [
      ['React', 'Next.js'], 
      ['Vue.js', 'Nuxt.js'], 
      ['TypeScript', 'JavaScript'], 
      ['CSS', 'Tailwind'],
      ['Node.js', 'Express']
    ][index % 5],
    createdAt: `${Math.floor(Math.random() * 24) + 1}時間前`,
    likes: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 50) + 5,
    views: Math.floor(Math.random() * 1000) + 100,
    isLiked: Math.random() > 0.7,
    isBookmarked: Math.random() > 0.8,
    coverImage: `https://images.unsplash.com/photo-${1516321318423 + index}?w=800&h=400&fit=crop`,
    content: ''
  }))
]

export default function ArticlesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const tab = (searchParams.get('tab') as TabType) || 'following'
  const genre = searchParams.get('genre')
  const subgenre = searchParams.get('subgenre')
  
  const postsPerPage = 12
  const totalPages = Math.ceil(mockPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = mockPosts.slice(startIndex, startIndex + postsPerPage)

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'memo': return '📝'
      case 'article': return '📄'  
      case 'book': return '📚'
    }
  }

  const getContentTypeName = (type: ContentType) => {
    switch (type) {
      case 'memo': return 'メモ'
      case 'article': return '記事'
      case 'book': return '本'
    }
  }

  const getPageTitle = () => {
    if (genre && subgenre) {
      return `${genre} > ${subgenre}の記事`
    } else if (genre) {
      return `${genre}の記事`
    }
    switch (tab) {
      case 'following': return 'フォロー中の記事'
      case 'tags': return '登録タグの記事'
      case 'recommended': return 'おすすめ記事'
      default: return '記事一覧'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <DashboardHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => window.history.back()}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icons.ArrowLeft />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getPageTitle()}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockPosts.length.toLocaleString()}件の記事を表示しています
                  </p>
                </div>
              </div>

              {/* フィルター情報 */}
              {(genre || subgenre) && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">フィルター:</span>
                  {genre && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                      {genre}
                    </span>
                  )}
                  {subgenre && (
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm">
                      {subgenre}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Content Type Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {getContentTypeIcon(post.type)} {getContentTypeName(post.type)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.readingTime}</span>
                    </div>

                    {/* Title */}
                    {post.title && (
                      <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>
                    )}

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center mb-4">
                      <span className="text-lg mr-3">{post.author.avatar}</span>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{post.author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <div className={post.isLiked ? 'w-4 h-4 mr-1 text-red-500' : 'w-4 h-4 mr-1'}>
                            <Icons.Heart />
                          </div>
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 mr-1">
                            <Icons.MessageCircle />
                          </div>
                          {post.comments}
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 mr-1">
                            <Icons.Eye />
                          </div>
                          {post.views}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">+{post.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  前へ
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  次へ
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}