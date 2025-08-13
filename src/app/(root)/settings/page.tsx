'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { useTheme } from '@/contexts/ThemeContext'

interface SettingItem {
  icon: string;
  title: string;
  description: string;
  action?: () => void;
  component?: 'theme';
  danger?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export default function SettingsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // ログアウト処理のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // ローカルストレージのクリア
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
      
      // ランディングページにリダイレクト
      router.push('/landing')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const settingSections: SettingSection[] = [
    {
      title: 'アカウント設定',
      items: [
        {
          icon: '👤',
          title: 'プロフィール',
          description: '名前、プロフィール画像、自己紹介を編集',
          action: () => router.push('/profile')
        },
        {
          icon: '🔒',
          title: 'プライバシー',
          description: '公開設定とプライバシー設定を管理',
          action: () => {}
        },
        {
          icon: '📧',
          title: 'メール設定',
          description: '通知メールの設定と配信停止',
          action: () => {}
        }
      ]
    },
    {
      title: 'アプリ設定',
      items: [
        {
          icon: '🎨',
          title: 'テーマ設定',
          description: 'ライト・ダークテーマの切り替え',
          component: 'theme'
        },
        {
          icon: '🔔',
          title: '通知設定',
          description: 'プッシュ通知と通知音の設定',
          action: () => {}
        },
        {
          icon: '🌐',
          title: '言語設定',
          description: '表示言語の変更',
          action: () => {}
        }
      ]
    },
    {
      title: 'ヘルプ・サポート',
      items: [
        {
          icon: '❓',
          title: 'よくある質問',
          description: 'よくある質問と回答を確認',
          action: () => {}
        },
        {
          icon: '📖',
          title: '使い方ガイド',
          description: 'アプリの基本的な使い方を学ぶ',
          action: () => {}
        },
        {
          icon: '📞',
          title: 'お問い合わせ',
          description: 'サポートチームに連絡する',
          action: () => {}
        },
        {
          icon: '📄',
          title: '利用規約',
          description: 'サービスの利用規約を確認',
          action: () => {}
        },
        {
          icon: '🛡️',
          title: 'プライバシーポリシー',
          description: 'プライバシーポリシーを確認',
          action: () => {}
        }
      ]
    },
    {
      title: 'データ管理',
      items: [
        {
          icon: '📊',
          title: 'データのエクスポート',
          description: '投稿データのダウンロード',
          action: () => {}
        },
        {
          icon: '🗑️',
          title: 'アカウント削除',
          description: 'アカウントと全データの削除',
          action: () => {},
          danger: true
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <DashboardHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => router.back()}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icons.ArrowLeft />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">設定</h1>
                  <p className="text-gray-600 dark:text-gray-400">アカウントとアプリの設定を管理</p>
                </div>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
              {settingSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 text-2xl mr-4 mt-1">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-base font-medium mb-1 ${item.danger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Theme Toggle Component */}
                          {item.component === 'theme' ? (
                            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => setTheme('light')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                  theme === 'light'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                              >
                                ☀️ ライト
                              </button>
                              <button
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                  theme === 'dark'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                              >
                                🌙 ダーク
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={item.action}
                              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                item.danger
                                  ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className="w-4 h-4 -rotate-90">
                                <Icons.ChevronDown />
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logout Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-2xl mr-4 mt-1">
                      🚪
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-red-600 dark:text-red-400 mb-1">
                        ログアウト
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        現在のセッションを終了してログアウト
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        ログアウト中...
                      </>
                    ) : (
                      <>
                        <Icons.LogIn />
                        <span className="ml-2">ログアウト</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© 2024 TechKnot. All rights reserved.</p>
              <p className="mt-2">Version 1.0.0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}