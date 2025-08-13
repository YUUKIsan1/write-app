'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from '@/components/ui/icons'
import AppLayout from '@/components/layout/AppLayout'

type TabType = 'following' | 'tags' | 'recommended'
type ContentType = 'memo' | 'article' | 'book'

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

// 充実したモックデータ
const mockPosts: Post[] = [
  {
    id: '1',
    type: 'article',
    title: 'React 18の新機能 - Concurrent Featuresで変わるフロントエンド開発',
    content: `# React 18の革新的な新機能

React 18で導入されたConcurrent Featuresは、フロントエンド開発に革命をもたらします。

## Automatic Batching
React 18では、複数のstate更新を自動的にバッチ処理します。これにより、パフォーマンスが大幅に向上します。

\`\`\`javascript
// React 18では自動的にバッチ処理される
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 2つの更新が1回の再レンダリングにまとめられる
}
\`\`\`

## Suspenseの進化
新しいSuspenseは、データフェッチングをより直感的に扱えます。

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <UserProfile userId={userId} />
  <PostList userId={userId} />
</Suspense>
\`\`\`

## まとめ
React 18のConcurrent Featuresにより、よりスムーズで高速なユーザー体験を提供できるようになりました。`,
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
    id: '2',
    type: 'memo',
    content: `# 今日の学習ログ 📚

## TypeScriptの型システム深掘り

### Union型とIntersection型の使い分け
- **Union型**: \`A | B\` - AまたはBのどちらか
- **Intersection型**: \`A & B\` - AとBの両方の特性を持つ

### 実際のコード例
\`\`\`typescript
// Union型の例
type Status = 'loading' | 'success' | 'error';

// Intersection型の例
type User = {
  id: string;
  name: string;
} & {
  email: string;
  createdAt: Date;
};
\`\`\`

## Next.js 13のApp Router
今日はApp Routerの新機能を触ってみました。

### 学んだポイント
- Server ComponentとClient Componentの違い
- Layoutの入れ子構造
- Loading UIとError Boundaryの統合

### 明日やること
- [ ] Suspense Boundaryの実装
- [ ] Server Actionsの検証
- [ ] Streaming SSRのパフォーマンス測定

## 感想
TypeScriptの型システムは本当に奥が深い。毎日新しい発見があります 🚀

明日はもう少し実践的なプロジェクトで試してみよう！`,
    excerpt: 'TypeScriptの型システムとNext.js 13のApp Routerについて学んだことをまとめました。Union型、Intersection型、Server Componentなど。',
    readingTime: '3分',
    author: {
      name: '佐藤花子',
      avatar: '👩‍🎨',
      username: 'sato_hanako',
      bio: 'UIデザイナー兼フロントエンドエンジニア'
    },
    tags: ['TypeScript', '学習メモ', 'Next.js', 'App Router'],
    createdAt: '6時間前',
    likes: 64,
    comments: 12,
    views: 234,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    type: 'book',
    title: 'モダンWeb開発完全ガイド - 基礎から実践まで',
    content: `# モダンWeb開発完全ガイド

## はじめに
このガイドでは、現代のWeb開発に必要な技術スタックを包括的にカバーします。

## 目次
1. [フロントエンド基礎](#フロントエンド基礎)
2. [React生態系](#react生態系)
3. [バックエンド設計](#バックエンド設計)
4. [デプロイメント戦略](#デプロイメント戦略)

---

## フロントエンド基礎

### HTML5セマンティック要素
現代のWebアプリケーションでは、セマンティックなHTMLが重要です。

\`\`\`html
<article>
  <header>
    <h1>記事タイトル</h1>
    <time datetime="2024-01-15">2024年1月15日</time>
  </header>
  <main>
    <p>記事の内容...</p>
  </main>
</article>
\`\`\`

### CSS Grid & Flexbox
レスポンシブレイアウトの基盤技術です。

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
\`\`\`

## React生態系

### 状態管理の選択肢
- **React Context**: 軽量な状態管理
- **Redux Toolkit**: 複雑なアプリケーション向け
- **Zustand**: シンプルで高性能

### パフォーマンス最適化
\`\`\`jsx
// メモ化を活用した最適化
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  return <div>{processedData}</div>;
});
\`\`\`

## バックエンド設計

### RESTful API設計
適切なHTTPメソッドとステータスコードを使用します。

\`\`\`javascript
// Express.js例
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
\`\`\`

### データベース設計
正規化とパフォーマンスのバランスを取ります。

## デプロイメント戦略

### CI/CD パイプライン
GitHub Actionsを使用した自動デプロイです。

\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Production
        run: npm run deploy
\`\`\`

## まとめ
モダンWeb開発は複雑ですが、適切な知識とツールがあれば効率的に開発できます。

継続的な学習と実践が成功への鍵です。`,
    excerpt: 'モダンWeb開発に必要な技術を網羅的にまとめました。HTML5、CSS、React、バックエンド、デプロイまで実践的な内容をカバーしています。',
    readingTime: '15分',
    author: {
      name: '山田一郎',
      avatar: '📚',
      username: 'yamada_author',
      bio: 'フルスタックエンジニア | 技術書執筆者'
    },
    tags: ['Web開発', '初心者向け', 'HTML', 'CSS', 'React', 'Node.js'],
    createdAt: '1日前',
    likes: 256,
    comments: 48,
    views: 1847,
    isLiked: false,
    isBookmarked: true,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    type: 'article',
    title: 'デザインシステム構築の実践ガイド',
    content: `# デザインシステム構築の実践ガイド

効率的なプロダクト開発のためのデザインシステム構築方法を解説します。`,
    excerpt: 'スケーラブルなデザインシステムの構築方法とベストプラクティス。Figma、Storybook、トークン管理まで実践的に解説。',
    readingTime: '8分',
    author: {
      name: '鈴木美咲',
      avatar: '🎨',
      username: 'suzuki_misaki',
      bio: 'プロダクトデザイナー | デザインシステム専門'
    },
    tags: ['デザインシステム', 'Figma', 'Storybook', 'デザイン'],
    createdAt: '3日前',
    likes: 89,
    comments: 16,
    views: 445,
    isLiked: true,
    isBookmarked: false
  }
]

const mockUserTags = ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Node.js', 'デザインシステム']

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('following')
  const [posts] = useState(mockPosts)

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

  const filteredPosts = posts // タブに応じたフィルタリング（今回は全て表示）

  const tabs = [
    { id: 'following' as const, label: 'フォロー中', icon: '👥', count: 124 },
    { id: 'tags' as const, label: '登録タグ', icon: '🏷️', count: mockUserTags.length },
    { id: 'recommended' as const, label: 'おすすめ', icon: '✨', count: null }
  ]

  return (
    <AppLayout>
      <div className="w-full">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            {/* Page Title - full width responsive */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">ホーム</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">コミュニティの最新コンテンツを発見しましょう</p>
            </div>

            {/* モバイル用人気ランキング - mobile only */}
            <div className="lg:hidden mb-4 sm:mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
                  <h2 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">人気ランキング</h2>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-orange-500">
                    <Icons.TrendingUp />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {mockPosts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex-shrink-0 w-48 sm:w-56 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-green-500 text-xs sm:text-sm">↗</span>
                      </div>
                      <h4 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 mb-1 leading-snug">
                        {post.title || post.excerpt}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{post.author.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Layout - responsive */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Desktop Sidebar - desktop only */}
              <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sticky top-4">
                  <div className="flex items-center mb-5">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">人気ランキング</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {mockPosts.slice(0, 5).map((post, index) => (
                      <div key={post.id} className="group cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                        <div className="flex items-center mb-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white mr-2 ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-green-500 text-sm">↗</span>
                        </div>
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
                          {post.title || post.excerpt}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.name}</p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{post.views}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/articles?tab=trending">
                    <button className="w-full mt-5 py-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors font-medium">
                      すべて見る
                    </button>
                  </Link>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  {/* Tabs - モバイル最適化 */}
                  <div className="p-2 sm:p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex gap-1 sm:gap-2 lg:gap-6 overflow-x-auto scrollbar-hide pb-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`min-h-[44px] py-2.5 sm:py-3 px-4 sm:px-4 border-b-2 font-semibold text-sm sm:text-sm lg:text-base transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 active:text-gray-800 dark:active:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{tab.icon}</span>
                            <span>{tab.label}</span>
                            {tab.count && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                {tab.count}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Content Grid - responsive */}
                  <div className="p-3 sm:p-4 lg:p-5">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredPosts.map((post) => (
                        <article
                          key={post.id}
                          className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-4 sm:p-4 lg:p-5 hover:shadow-md active:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-600 min-h-[120px] flex flex-col"
                        >
                          <div className="flex gap-3 sm:gap-4">
                            {/* Cover Image - responsive size */}
                            {post.coverImage && (
                              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={post.coverImage}
                                  alt={post.title || 'Cover image'}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              {/* Content Type Badge */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                                  <span className="mr-1.5">{getContentTypeIcon(post.type)}</span>
                                  <span>{getContentTypeName(post.type)}</span>
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{post.readingTime}</span>
                              </div>

                              {/* Title */}
                              {post.title && (
                                <h2 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                  {post.title}
                                </h2>
                              )}

                              {/* Excerpt */}
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                                {post.excerpt}
                              </p>

                              {/* Bottom Section */}
                              <div className="flex items-center justify-between">
                                {/* Author */}
                                <div className="flex items-center min-w-0">
                                  <span className="text-base mr-2 flex-shrink-0">{post.author.avatar}</span>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{post.author.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                                  </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
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
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Tags - bottom */}
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block px-2 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">+{post.tags.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                    
                    {/* Load More */}
                    <div className="mt-6 text-center">
                      <Link href={`/articles?tab=${activeTab}`}>
                        <button className="min-h-[48px] px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 active:bg-blue-200 dark:active:bg-blue-900/40 transition-colors font-medium flex items-center mx-auto text-base">
                          <div className="w-5 h-5 mr-2">
                            <Icons.ArrowRight />
                          </div>
                          さらに読み込む
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Genre - responsive */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                  <h2 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">ジャンル別記事</h2>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 ml-3 text-blue-500">
                    <Icons.BookOpen />
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {[
                    { name: 'フロントエンド', icon: '🎨', count: 1247, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
                    { name: 'バックエンド', icon: '⚙️', count: 892, color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
                    { name: 'モバイル', icon: '📱', count: 634, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
                    { name: 'AI・機械学習', icon: '🤖', count: 567, color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
                    { name: 'デザイン', icon: '✨', count: 423, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' },
                    { name: 'キャリア', icon: '🚀', count: 389, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' }
                  ].map((genre) => (
                    <Link
                      key={genre.name}
                      href={`/articles?genre=${encodeURIComponent(genre.name)}`}
                      className="group p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3">{genre.icon}</div>
                        <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                          {genre.name}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${genre.color}`}>
                          {genre.count}記事
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </AppLayout>
  )
}