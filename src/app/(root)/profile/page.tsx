'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/ui/icons'
import AppLayout from '@/components/layout/AppLayout'
import { PostManager, type Post } from '@/utils/postManager'
import MyMemoTab from '@/components/memo/MyMemoTab'

type TabType = 'story' | 'memo' | 'article' | 'book'
type ContentType = 'memo' | 'article' | 'book'

interface UserProfile {
  name: string
  username: string
  bio: string
  avatar: string
  backgroundImage?: string
  location: string
  website: string
  joinDate: string
  followers: number
  following: number
  totalPosts: number
  totalLikes: number
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
    instagram?: string
    youtube?: string
    dribbble?: string
  }
  skills: string[]
  achievements: string[]
  professionalInfo: {
    title: string
    company: string
    experience: string
  }
}

// モックユーザープロフィール
const mockUserProfile: UserProfile = {
  name: '山田花子',
  username: 'hanako_dev',
  bio: 'フロントエンドエンジニア兼UIデザイナー。美しいWebアプリケーションの設計・開発に情熱を注いでいます。React/TypeScript/Figmaを愛用中。日々の学びや制作物をここでシェアしています。',
  avatar: '👩‍💻',
  backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
  location: '東京, 日本',
  website: 'https://hanako-dev.com',
  joinDate: '2023年4月',
  followers: 2847,
  following: 392,
  totalPosts: 156,
  totalLikes: 8920,
  socialLinks: {
    twitter: 'https://twitter.com/hanako_dev',
    github: 'https://github.com/hanako-dev',
    linkedin: 'https://linkedin.com/in/hanako-dev',
    dribbble: 'https://dribbble.com/hanako_dev'
  },
  skills: ['React', 'TypeScript', 'Next.js', 'Figma', 'UI/UX Design', 'Node.js', 'TailwindCSS', 'GraphQL'],
  achievements: ['Google Developer Expert', 'Design Award Winner 2024', 'Speaker at Tech Conference'],
  professionalInfo: {
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    experience: '5年'
  }
}


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('story')
  const [isEditing, setIsEditing] = useState(false)
  const [userPosts, setUserPosts] = useState<Post[]>([])

  useEffect(() => {
    // 投稿データを読み込み
    const posts = PostManager.getUserPosts()
    setUserPosts(posts)
  }, [])

  // URL パラメータからタブを設定
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')
    if (tabParam && ['story', 'memo', 'article', 'book'].includes(tabParam)) {
      setActiveTab(tabParam as TabType)
    }
  }, [])

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'memo': return '📝'
      case 'article': return '📄'
      case 'book': return '📚'
    }
  }

  const getTabCounts = () => {
    return {
      story: 0,
      memo: userPosts.filter(post => post.type === 'memo').length,
      article: userPosts.filter(post => post.type === 'article').length,
      book: userPosts.filter(post => post.type === 'book').length
    }
  }

  const filteredPosts = activeTab === 'story' ? [] : userPosts.filter(post => post.type === activeTab)
  const tabCounts = getTabCounts()

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '🐦'
      case 'github': return '💻'
      case 'linkedin': return '💼'
      case 'dribbble': return '🏀'
      case 'instagram': return '📸'
      case 'youtube': return '📹'
      default: return '🔗'
    }
  }

  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="relative">
          {/* Background Header - full width responsive */}
          <div className="relative h-48 sm:h-56 lg:h-72 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
            {mockUserProfile.backgroundImage && (
              <Image 
                src={mockUserProfile.backgroundImage} 
                alt="Profile background"
                fill
                className="object-cover opacity-30"
                priority
              />
            )}
            
            {/* Profile Header Content */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-xl">
                      <div className="w-full h-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl sm:text-3xl lg:text-5xl text-white">
                        {mockUserProfile.avatar}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="flex-1 text-white min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 truncate">
                      {mockUserProfile.name}
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-1">@{mockUserProfile.username}</p>
                    <p className="text-sm sm:text-base opacity-80 truncate">{mockUserProfile.professionalInfo.title}</p>
                  </div>
                  
                  {/* Action Buttons - モバイル最適化 */}
                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-4 py-2.5 sm:py-2.5 bg-white/20 border border-white/30 text-white rounded-lg sm:rounded-xl hover:bg-white/30 active:bg-white/40 transition-all font-medium flex items-center justify-center text-sm sm:text-sm lg:text-base"
                    >
                      <div className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-2">
                        <Icons.Edit />
                      </div>
                      {isEditing ? '完了' : '編集'}
                    </button>
                    <button className="flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-4 py-2.5 sm:py-2.5 bg-white text-indigo-600 rounded-lg sm:rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all font-medium text-sm sm:text-sm lg:text-base">
                      メッセージ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Left Sidebar - Profile Details */}
                <div className="w-full lg:w-80 xl:w-96 space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Bio Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                        プロフィール
                      </h3>
                      {isEditing && (
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                          <div className="w-5 h-5">
                            <Icons.Edit />
                          </div>
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-sm lg:text-base">
                      {mockUserProfile.bio}
                    </p>
                  
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5">
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg sm:rounded-xl">
                        <div className="text-base sm:text-lg lg:text-xl font-bold text-indigo-600 dark:text-indigo-400">{mockUserProfile.followers.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">フォロワー</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg sm:rounded-xl">
                        <div className="text-base sm:text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400">{mockUserProfile.following.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">フォロー中</div>
                      </div>
                    </div>
                    
                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5">
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg sm:rounded-xl">
                        <div className="text-base sm:text-lg lg:text-xl font-bold text-green-600 dark:text-green-400">{mockUserProfile.totalPosts}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">投稿</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 lg:p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg sm:rounded-xl">
                        <div className="text-base sm:text-lg lg:text-xl font-bold text-orange-600 dark:text-orange-400">{mockUserProfile.totalLikes.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">いいね</div>
                      </div>
                    </div>
                  
                    {/* Basic Info */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <div className="w-4 h-4 mr-3 flex-shrink-0">
                          <Icons.MapPin />
                        </div>
                        <span className="truncate">{mockUserProfile.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <div className="w-4 h-4 mr-3 flex-shrink-0">
                          <Icons.Calendar />
                        </div>
                        <span className="truncate">{mockUserProfile.joinDate}に参加</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <div className="w-4 h-4 mr-3 flex-shrink-0">
                          <Icons.Globe />
                        </div>
                        <a href={mockUserProfile.website} className="text-indigo-600 dark:text-indigo-400 hover:underline truncate min-w-0">
                          {mockUserProfile.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Links Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        SNSリンク
                      </h3>
                      {isEditing && (
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                          <div className="w-5 h-5">
                            <Icons.Edit />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {Object.entries(mockUserProfile.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                        >
                          <span className="text-lg mr-3 flex-shrink-0">{getSocialIcon(platform)}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 dark:text-white capitalize text-sm">{platform}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                              {url.replace('https://', '').split('/')[0]}
                            </div>
                          </div>
                          <div className="w-4 h-4 ml-3 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0">
                            <Icons.ExternalLink />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Skills Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        スキル
                      </h3>
                      {isEditing && (
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <div className="w-5 h-5">
                            <Icons.Edit />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockUserProfile.skills.map((skill, index) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            index % 4 === 0 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400' :
                            index % 4 === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                            index % 4 === 2 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          } ${isEditing ? 'cursor-pointer hover:opacity-75 hover:scale-105' : ''}`}
                        >
                          {skill}
                          {isEditing && <span className="ml-2 text-red-500 hover:text-red-700">×</span>}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors">
                          + スキル追加
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Achievements Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        実績・資格
                      </h3>
                      {isEditing && (
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <div className="w-5 h-5">
                            <Icons.Edit />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {mockUserProfile.achievements.map((achievement) => (
                        <div key={achievement} className={`flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 ${isEditing ? 'group hover:bg-yellow-100 dark:hover:bg-yellow-900/30' : ''} transition-all`}>
                          <div className="flex items-center">
                            <span className="text-lg mr-3">🏆</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{achievement}</span>
                          </div>
                          {isEditing && (
                            <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20">
                              <Icons.X />
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button className="w-full p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-yellow-400 hover:text-yellow-600 dark:hover:border-yellow-500 dark:hover:text-yellow-400 transition-colors text-sm font-medium">
                          + 実績・資格を追加
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Content Area - Posts */}
                <div className="flex-1 min-w-0">
                  {/* Tab Navigation - モバイル最適化 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-4 sm:mb-6">
                    <nav className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {[
                        { id: 'story' as const, label: 'ストーリー', icon: '🌟' },
                        { id: 'memo' as const, label: 'メモ', icon: '📝' },
                        { id: 'article' as const, label: '記事', icon: '📄' },
                        { id: 'book' as const, label: '本', icon: '📚' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-shrink-0 min-h-[44px] px-4 sm:px-4 py-2.5 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-sm transition-all flex items-center justify-center whitespace-nowrap ${
                            activeTab === tab.id
                              ? 'bg-indigo-500 text-white shadow-lg'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          <span>{tab.label}</span>
                          {tab.id !== 'story' && (
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              activeTab === tab.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                            }`}>
                              {tabCounts[tab.id]}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Content Area */}
                  <div className="space-y-4 sm:space-y-6">
                  {activeTab === 'story' ? (
                    <div className="space-y-3 sm:space-y-4">
                      {/* これまでやってきたこと */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            これまでやってきたこと
                          </h3>
                          {isEditing && (
                            <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                              <div className="w-3 h-3 sm:w-4 sm:h-4">
                                <Icons.Edit />
                              </div>
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              className="w-full h-28 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                              placeholder="これまでの経験や実績について書いてください..."
                              defaultValue="フロントエンドエンジニアとして5年間、様々なWebアプリケーションの開発に携わってきました。特にReactを使った大規模なSPAの設計・開発において豊富な経験があります。UI/UXデザインにも深い興味があり、Figmaを使ったデザインシステムの構築も手がけています。"
                            />
                            <div className="flex justify-end gap-2">
                              <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                                キャンセル
                              </button>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                                保存
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            フロントエンドエンジニアとして5年間、様々なWebアプリケーションの開発に携わってきました。特にReactを使った大規模なSPAの設計・開発において豊富な経験があります。UI/UXデザインにも深い興味があり、Figmaを使ったデザインシステムの構築も手がけています。
                          </p>
                        )}
                      </div>

                      {/* 今挑戦していること */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            今挑戦していること
                          </h3>
                          {isEditing && (
                            <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                              <div className="w-3 h-3 sm:w-4 sm:h-4">
                                <Icons.Edit />
                              </div>
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              className="w-full h-28 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                              placeholder="現在取り組んでいることや学習していることを書いてください..."
                              defaultValue="現在はNext.js 13のApp Routerを使ったモダンなWebアプリケーション開発に取り組んでいます。また、TypeScriptの高度な型システムを活用した型安全な開発手法についても深く学習中です。最近はAI技術を活用したコード生成ツールの研究にも興味を持って取り組んでいます。"
                            />
                            <div className="flex justify-end gap-2">
                              <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                                キャンセル
                              </button>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                                保存
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            現在はNext.js 13のApp Routerを使ったモダンなWebアプリケーション開発に取り組んでいます。また、TypeScriptの高度な型システムを活用した型安全な開発手法についても深く学習中です。最近はAI技術を活用したコード生成ツールの研究にも興味を持って取り組んでいます。
                          </p>
                        )}
                      </div>

                      {/* 今後の目標 */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            今後の目標
                          </h3>
                          {isEditing && (
                            <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                              <div className="w-3 h-3 sm:w-4 sm:h-4">
                                <Icons.Edit />
                              </div>
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              className="w-full h-28 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                              placeholder="将来の目標や達成したいことを書いてください..."
                              defaultValue="将来的にはフルスタック開発者として、フロントエンドからバックエンド、インフラまでを一気通貫で設計・開発できるエンジニアになりたいと考えています。また、技術コミュニティでの発信活動も積極的に行い、知識の共有を通じて業界全体の発展に貢献したいと思います。"
                            />
                            <div className="flex justify-end gap-2">
                              <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                                キャンセル
                              </button>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                                保存
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            将来的にはフルスタック開発者として、フロントエンドからバックエンド、インフラまでを一気通貫で設計・開発できるエンジニアになりたいと考えています。また、技術コミュニティでの発信活動も積極的に行い、知識の共有を通じて業界全体の発展に貢献したいと思います。
                          </p>
                        )}
                      </div>

                      {/* スキル */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            スキル
                          </h3>
                          {isEditing && (
                            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                              <div className="w-4 h-4 sm:w-5 sm:h-5">
                                <Icons.Edit />
                              </div>
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mockUserProfile.skills.map((skill, index) => (
                            <span
                              key={skill}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                index % 4 === 0 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400' :
                                index % 4 === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                                index % 4 === 2 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              } ${isEditing ? 'cursor-pointer hover:opacity-75 hover:scale-105' : ''}`}
                            >
                              {skill}
                              {isEditing && <span className="ml-2 text-red-500 hover:text-red-700">×</span>}
                            </span>
                          ))}
                          {isEditing && (
                            <button className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors">
                              + スキル追加
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 実績・資格 */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                            実績・資格
                          </h3>
                          {isEditing && (
                            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                              <div className="w-4 h-4 sm:w-5 sm:h-5">
                                <Icons.Edit />
                              </div>
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          {mockUserProfile.achievements.map((achievement) => (
                            <div key={achievement} className={`flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 ${isEditing ? 'group hover:bg-yellow-100 dark:hover:bg-yellow-900/30' : ''} transition-all`}>
                              <div className="flex items-center">
                                <span className="text-lg mr-3">🏆</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{achievement}</span>
                              </div>
                              {isEditing && (
                                <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20">
                                  <div className="w-4 h-4">
                                    <Icons.X />
                                  </div>
                                </button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <button className="w-full p-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-yellow-400 hover:text-yellow-600 dark:hover:border-yellow-500 dark:hover:text-yellow-400 transition-colors text-sm font-medium">
                              + 実績・資格を追加
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : activeTab === 'memo' ? (
                    <MyMemoTab isEditing={isEditing} />
                  ) : (
                    filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                      >
                        {post.coverImage && (
                          <div className="aspect-video overflow-hidden">
                            <Image
                              src={post.coverImage}
                              alt={post.title || 'Post image'}
                              width={800}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        
                        <div className="p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
                              <span className="mr-1">{getContentTypeIcon(post.type)}</span>
                              <span className="hidden sm:inline">{post.type === 'memo' ? 'メモ' : post.type === 'article' ? '記事' : '本'}</span>
                            </span>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <div className="w-3 h-3 mr-1">
                                <Icons.Clock />
                              </div>
                              {post.readingTime}
                            </div>
                          </div>
                          
                          {post.title && (
                            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                              {post.title}
                            </h2>
                          )}
                          
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-xs sm:text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 sm:px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">+{post.tags.length - 3}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${post.isLiked ? 'text-red-500' : ''}`}>
                                  <Icons.Heart />
                                </div>
                                <span className="text-xs">{post.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
                                  <Icons.MessageCircle />
                                </div>
                                <span className="text-xs">{post.comments}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
                                  <Icons.Eye />
                                </div>
                                <span className="text-xs">{post.views}</span>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                              {post.publishedAt}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}