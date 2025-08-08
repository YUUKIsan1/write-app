'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import OverviewCards from '@/components/dashboard/OverviewCards'
import RecentActivity from '@/components/dashboard/RecentActivity'
import ProgressCharts from '@/components/dashboard/ProgressCharts'
import QuickActions from '@/components/dashboard/QuickActions'
import { Icons } from '@/components/ui/icons'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 animate-pulse" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/50 via-purple-700/50 to-pink-700/50 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black mb-2">おかえりなさい！ 🎉</h1>
                  <p className="text-blue-100 text-lg">
                    今日も<span className="text-yellow-300 font-semibold">TechKnot</span>で新しい知識を身につけましょう
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                    <div className="text-6xl animate-bounce">🚀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <OverviewCards />

          {/* Charts and Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProgressCharts />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </main>
      </div>
    </div>
  )
}