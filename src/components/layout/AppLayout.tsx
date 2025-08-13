'use client'

import { useState, ReactNode } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import BottomNavigation from '@/components/mobile/BottomNavigation'

interface AppLayoutProps {
  children: ReactNode
  showBottomNav?: boolean
  showSidebar?: boolean
  showHeader?: boolean
}

export default function AppLayout({ 
  children, 
  showBottomNav = true,
  showSidebar = true,
  showHeader = true 
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* デスクトップ用サイドバー */}
      {showSidebar && (
        <div className="hidden md:block">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      )}
      
      {/* メインコンテンツエリア */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        showSidebar ? (sidebarOpen ? 'md:ml-64' : 'md:ml-20') : ''
      }`}>
        {/* ヘッダー */}
        {showHeader && (
          <DashboardHeader 
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
          />
        )}

        {/* コンテンツ */}
        <main className={`flex-1 ${showBottomNav ? 'pb-20 md:pb-0' : ''}`}>
          {children}
        </main>
      </div>

      {/* モバイル用下部ナビゲーション */}
      {showBottomNav && <BottomNavigation />}
    </div>
  )
}