'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import CreateContentModal from './CreateContentModal'

interface DashboardHeaderProps {
  onSidebarToggle: () => void
}

export default function DashboardHeader({ onSidebarToggle }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const notifications = [
    {
      id: 1,
      title: '新しいコースが追加されました',
      message: 'React 18の新機能について学習できます',
      time: '2時間前',
      type: 'course',
      unread: true
    },
    {
      id: 2,
      title: 'メンタリングセッション予約完了',
      message: '明日15:00からのセッションが確定しました',
      time: '5時間前',
      type: 'mentoring',
      unread: true
    },
    {
      id: 3,
      title: 'プロジェクト評価が完了',
      message: 'Eコマースサイトプロジェクトに高評価をいただきました',
      time: '1日前',
      type: 'project',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <Icons.Menu />
          </button>

          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-80 text-sm transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Button */}
          <button className="sm:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <div className="w-5 h-5">
              <Icons.Search />
            </div>
          </button>

          {/* Create Content Button */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="group relative px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center">
                <div className="sm:mr-1">
                  <Icons.Plus />
                </div>
                <span className="hidden sm:inline">投稿</span>
                
                {/* Sparkle Effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
              </div>
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative"
            >
              <Icons.Bell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">通知</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{unreadCount}件の未読通知があります</p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer ${
                        notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${notification.unread ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    すべての通知を見る
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}

      {/* Create Content Modal */}
      <CreateContentModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </header>
  )
}