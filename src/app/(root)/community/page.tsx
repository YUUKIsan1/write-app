'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import AppLayout from '@/components/layout/AppLayout'

interface Message {
  id: string
  user: {
    id: string
    name: string
    username: string
    avatar: string
    status: 'online' | 'offline' | 'away'
    lastSeen?: string
  }
  lastMessage: {
    content: string
    timestamp: string
    unread: boolean
  }
  messageCount: number
}

interface Community {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  avatar: string
  isJoined: boolean
  lastActivity: string
  tags: string[]
  privacy: 'public' | 'private'
}

interface CommunityPost {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  tags: string[]
  type: 'discussion' | 'question' | 'announcement' | 'showcase'
  community?: string
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: '田中太郎',
      username: 'tanaka_dev',
      avatar: '👨‍💻',
      status: 'online'
    },
    lastMessage: {
      content: 'React 19の新機能について詳しく教えてください',
      timestamp: '2分前',
      unread: true
    },
    messageCount: 3
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: '佐藤花子',
      username: 'sato_designer',
      avatar: '👩‍🎨',
      status: 'online'
    },
    lastMessage: {
      content: 'デザインシステムのFigmaファイル共有しました！',
      timestamp: '15分前',
      unread: true
    },
    messageCount: 7
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: '山田一郎',
      username: 'yamada_fullstack',
      avatar: '🚀',
      status: 'away'
    },
    lastMessage: {
      content: 'ありがとうございます！とても参考になりました',
      timestamp: '1時間前',
      unread: false
    },
    messageCount: 12
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: '鈴木美咲',
      username: 'suzuki_pm',
      avatar: '📊',
      status: 'offline',
      lastSeen: '3時間前'
    },
    lastMessage: {
      content: 'プロジェクト管理のツールについて相談があります',
      timestamp: '3時間前',
      unread: false
    },
    messageCount: 5
  }
]

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'フロントエンド開発者',
    description: 'React、Vue.js、Angular等のフロントエンド技術について議論',
    category: 'テクノロジー',
    memberCount: 1247,
    avatar: '⚛️',
    isJoined: true,
    lastActivity: '5分前',
    tags: ['React', 'Vue.js', 'TypeScript'],
    privacy: 'public'
  },
  {
    id: '2',
    name: 'UI/UXデザイナー',
    description: 'デザインのトレンドやベストプラクティスを共有',
    category: 'デザイン',
    memberCount: 892,
    avatar: '🎨',
    isJoined: true,
    lastActivity: '12分前',
    tags: ['Figma', 'デザインシステム', 'UX'],
    privacy: 'public'
  },
  {
    id: '3',
    name: 'スタートアップ起業家',
    description: '起業・事業開発・投資について語り合う場',
    category: 'ビジネス',
    memberCount: 634,
    avatar: '🚀',
    isJoined: false,
    lastActivity: '23分前',
    tags: ['起業', 'VC', 'ピッチ'],
    privacy: 'public'
  },
  {
    id: '4',
    name: 'エンジニア転職相談',
    description: 'キャリアチェンジや転職活動について情報交換',
    category: 'キャリア',
    memberCount: 2156,
    avatar: '💼',
    isJoined: true,
    lastActivity: '1時間前',
    tags: ['転職', 'キャリア', '面接'],
    privacy: 'private'
  }
]

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: '田中太郎',
      username: 'tanaka_dev',
      avatar: '👨‍💻',
      verified: true
    },
    content: 'React 19のServer Componentsについて、皆さんはどう思われますか？実際にプロダクションで使ってみた方の感想をお聞きしたいです。パフォーマンス面での変化が特に気になっています。',
    timestamp: '2時間前',
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    tags: ['React', 'Server Components'],
    type: 'discussion'
  },
  {
    id: '2',
    author: {
      name: '佐藤花子',
      username: 'sato_designer',
      avatar: '👩‍🎨',
      verified: false
    },
    content: 'TypeScriptの型定義で困っています。ジェネリクスを使った複雑な型の定義方法について、良いリソースがあれば教えてください！',
    timestamp: '4時間前',
    likes: 15,
    comments: 12,
    shares: 2,
    isLiked: true,
    tags: ['TypeScript', '質問'],
    type: 'question'
  },
  {
    id: '3',
    author: {
      name: 'TechKnot運営',
      username: 'techknot_official',
      avatar: '🏢',
      verified: true
    },
    content: '【お知らせ】来週火曜日（19:00-21:00）にReact勉強会をオンラインで開催します！初心者の方も大歓迎です。参加希望の方はコメントでお知らせください。',
    timestamp: '6時間前',
    likes: 45,
    comments: 23,
    shares: 15,
    isLiked: true,
    tags: ['イベント', 'React', '勉強会'],
    type: 'announcement'
  },
  {
    id: '4',
    author: {
      name: '山田一郎',
      username: 'yamada_fullstack',
      avatar: '🚀',
      verified: false
    },
    content: 'Next.js 15とSupabaseを使ってポートフォリオサイトを作りました！レスポンシブデザインとダークモードにも対応しています。フィードバックをいただけると嬉しいです。',
    timestamp: '1日前',
    likes: 67,
    comments: 18,
    shares: 9,
    isLiked: false,
    tags: ['Next.js', 'Supabase', 'ポートフォリオ'],
    type: 'showcase'
  }
]

const typeColors = {
  discussion: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  question: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  announcement: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  showcase: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
}

const typeLabels = {
  discussion: '議論',
  question: '質問',
  announcement: 'お知らせ',
  showcase: 'ショーケース'
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'talk' | 'content'>('talk')
  const [activeFilter, setActiveFilter] = useState<'all' | CommunityPost['type']>('all')

  const mainTabs = [
    { id: 'talk' as const, label: 'トーク', icon: 'MessageCircle', description: 'ダイレクトメッセージとチャット' },
    { id: 'content' as const, label: 'コンテンツ', icon: 'Users', description: 'コミュニティとディスカッション' }
  ]

  const contentFilters = [
    { id: 'all' as const, label: '全て', icon: 'Globe', count: mockPosts.length },
    { id: 'discussion' as const, label: '議論', icon: 'MessageCircle', count: 1 },
    { id: 'question' as const, label: '質問', icon: 'HelpCircle', count: 1 },
    { id: 'announcement' as const, label: 'お知らせ', icon: 'Bell', count: 1 },
    { id: 'showcase' as const, label: 'ショーケース', icon: 'Star', count: 1 }
  ]

  const filteredPosts = mockPosts.filter(post => {
    if (activeFilter === 'all') return true
    return post.type === activeFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* ページヘッダー */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  コミュニティ
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  エンジニア同士でつながり、知識を共有しましょう
                </p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center shadow-lg">
                <div className="w-5 h-5 mr-2">
                  <Icons.Plus />
                </div>
                新規投稿
              </button>
            </div>
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
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        <IconComponent />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-1 ${
                          activeTab === tab.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {tab.label}
                        </h3>
                        <p className={`text-sm ${
                          activeTab === tab.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {tab.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-3">
              {activeTab === 'talk' ? (
                /* トークセクション */
                <div className="space-y-6">
                  {/* 検索バー */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="w-5 h-5 text-gray-400">
                        <Icons.Search />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="メッセージを検索..."
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* メッセージ一覧 */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-start space-x-4">
                            {/* アバター */}
                            <div className="relative flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                                {message.user.avatar}
                              </div>
                              {/* オンラインステータス */}
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(message.user.status)} rounded-full border-2 border-white dark:border-gray-800`}></div>
                            </div>

                            {/* メッセージ内容 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                    {message.user.name}
                                  </h3>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    @{message.user.username}
                                  </span>
                                  {message.user.status === 'online' && (
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                      オンライン
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {message.lastMessage.timestamp}
                                  </span>
                                  {message.lastMessage.unread && (
                                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                              
                              <p className={`text-sm leading-relaxed truncate ${
                                message.lastMessage.unread 
                                  ? 'text-gray-900 dark:text-white font-medium' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {message.lastMessage.content}
                              </p>
                              
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {message.messageCount} メッセージ
                                </span>
                                {message.lastMessage.unread && (
                                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 text-xs px-2 py-1 rounded-full font-medium">
                                    未読
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* コンテンツセクション */
                <div className="space-y-6">
                  {/* フィルター */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-3">
                      {contentFilters.map((filter) => {
                        const IconComponent = Icons[filter.icon as keyof typeof Icons]
                        return (
                          <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
                              activeFilter === filter.id
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            <div className="w-4 h-4 mr-2">
                              <IconComponent />
                            </div>
                            {filter.label}
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              activeFilter === filter.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                            }`}>
                              {filter.count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 投稿一覧 */}
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 group cursor-pointer"
                      >
                        {/* ヘッダー */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            {/* アバター */}
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                              {post.author.avatar}
                            </div>
                            
                            {/* 投稿者情報 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {post.author.name}
                                </h3>
                                {post.author.verified && (
                                  <div className="w-4 h-4 text-blue-500">
                                    <Icons.Check />
                                  </div>
                                )}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  @{post.author.username}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {post.timestamp}
                              </p>
                            </div>
                          </div>

                          {/* 投稿タイプ */}
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeColors[post.type]}`}>
                            {typeLabels[post.type]}
                          </span>
                        </div>

                        {/* 投稿内容 */}
                        <div className="mb-4">
                          <p className="text-gray-900 dark:text-white leading-relaxed">
                            {post.content}
                          </p>
                        </div>

                        {/* タグ */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* アクションボタン */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-6">
                            {/* いいね */}
                            <button className={`flex items-center space-x-2 text-sm transition-colors group-hover:scale-105 ${
                              post.isLiked 
                                ? 'text-red-500 hover:text-red-600' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                            }`}>
                              <div className="w-5 h-5">
                                <Icons.Heart />
                              </div>
                              <span className="font-medium">{post.likes}</span>
                            </button>

                            {/* コメント */}
                            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors group-hover:scale-105">
                              <div className="w-5 h-5">
                                <Icons.MessageCircle />
                              </div>
                              <span className="font-medium">{post.comments}</span>
                            </button>

                            {/* シェア */}
                            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors group-hover:scale-105">
                              <div className="w-5 h-5">
                                <Icons.ArrowRight />
                              </div>
                              <span className="font-medium">{post.shares}</span>
                            </button>
                          </div>

                          {/* メニュー */}
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100">
                            <div className="w-5 h-5">
                              <Icons.Menu />
                            </div>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* 空状態 */}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 text-gray-300 dark:text-gray-600">
                        <Icons.Users />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        投稿が見つかりません
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        条件に一致する投稿がありません
                      </p>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        新しい投稿を作成
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                {activeTab === 'talk' ? (
                  /* オンラインユーザー */
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      オンライン ({mockMessages.filter(m => m.user.status === 'online').length})
                    </h3>
                    <div className="space-y-3">
                      {mockMessages
                        .filter(message => message.user.status === 'online')
                        .map((message) => (
                        <div key={message.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {message.user.avatar}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {message.user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              @{message.user.username}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* 人気コミュニティ */
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      人気コミュニティ
                    </h3>
                    <div className="space-y-4">
                      {mockCommunities.slice(0, 3).map((community) => (
                        <div key={community.id} className="group cursor-pointer">
                          <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                              {community.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {community.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {community.memberCount.toLocaleString()} メンバー
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  community.isJoined
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                  {community.isJoined ? '参加済み' : '未参加'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* クイックアクション */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    クイックアクション
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-medium transition-colors text-sm border border-gray-200 dark:border-gray-600">
                      💡 質問を投稿
                    </button>
                    <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-medium transition-colors text-sm border border-gray-200 dark:border-gray-600">
                      🚀 プロジェクトをシェア
                    </button>
                    <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-medium transition-colors text-sm border border-gray-200 dark:border-gray-600">
                      👥 新しいコミュニティ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}