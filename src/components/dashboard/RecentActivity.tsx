'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'

const activities = [
  {
    id: 1,
    type: 'course_complete',
    title: 'React Hooks完了',
    description: 'useState、useEffectの実践コースを修了しました',
    time: '2時間前',
    icon: Icons.BookOpen,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    id: 2,
    type: 'project_submit',
    title: 'プロジェクト提出',
    description: 'Todo アプリケーションを提出しました',
    time: '4時間前',
    icon: Icons.Code,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    id: 3,
    type: 'mentoring',
    title: 'メンタリング参加',
    description: '「キャリア戦略」セッションに参加しました',
    time: '6時間前',
    icon: Icons.Users,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    id: 4,
    type: 'achievement',
    title: '新しいバッジ獲得',
    description: '「JavaScript Master」バッジを獲得しました',
    time: '1日前',
    icon: Icons.Award,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  },
  {
    id: 5,
    type: 'community',
    title: 'フォーラム投稿',
    description: '「React vs Vue.js」のディスカッションに参加',
    time: '1日前',
    icon: Icons.MessageCircle,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600'
  },
  {
    id: 6,
    type: 'skill_up',
    title: 'スキルレベルアップ',
    description: 'TypeScriptスキルが中級にアップしました',
    time: '2日前',
    icon: Icons.TrendingUp,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-600'
  }
]

const quickStats = [
  {
    title: '今日の学習',
    value: '4.2h',
    target: '5h',
    progress: 84,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: '週間目標',
    value: '28h',
    target: '35h',
    progress: 80,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'ストリーク',
    value: '12',
    target: '30',
    progress: 40,
    color: 'from-orange-500 to-red-600'
  }
]

export default function RecentActivity() {
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">今日の進捗</h3>
        
        <div className="space-y-4">
          {quickStats.map((stat, index) => (
            <div key={stat.title} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stat.title}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stat.value} / {stat.target}
                </span>
              </div>
              
              <div className="relative">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                
                {/* Progress indicator */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-300 rounded-full shadow-sm transition-all duration-300 group-hover:scale-125`}
                  style={{ 
                    left: `${Math.min(stat.progress, 95)}%`,
                    transform: `translateX(-50%) translateY(-50%)`,
                    borderColor: stat.color.includes('blue') ? '#3b82f6' : 
                                  stat.color.includes('green') ? '#10b981' : '#f59e0b'
                  }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {stat.progress}% 達成
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">最近のアクティビティ</h3>
            <p className="text-sm text-gray-500">あなたの学習履歴</p>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200">
            すべて見る
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            
            return (
              <div
                key={activity.id}
                className={`
                  group p-4 rounded-2xl border border-gray-100 hover:border-gray-200 
                  transition-all duration-300 cursor-pointer relative overflow-hidden
                  ${hoveredActivity === activity.id ? activity.bgColor : 'hover:bg-gray-50'}
                `}
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`
                    relative p-2 rounded-xl bg-gradient-to-br ${activity.color} text-white shadow-lg
                    transform group-hover:scale-110 transition-all duration-300
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`
                      font-semibold transition-colors duration-300
                      ${hoveredActivity === activity.id ? activity.textColor : 'text-gray-900'}
                    `}>
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{activity.time}</span>
                      
                      {/* Activity Type Badge */}
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${activity.bgColor} ${activity.textColor}
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                      `}>
                        {activity.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className={`
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    transform translate-x-2 group-hover:translate-x-0
                    ${activity.textColor}
                  `}>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Timeline Connector */}
                {index < activities.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-px h-4 bg-gray-200" />
                )}

                {/* Hover Background Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${activity.color} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300 rounded-2xl
                `} />
              </div>
            )
          })}
        </div>

        {/* Load More */}
        <div className="text-center pt-4 border-t border-gray-100 mt-4">
          <button className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200">
            さらに読み込む
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">今後の予定</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">メンタリングセッション</div>
              <div className="text-xs text-gray-600">明日 15:00 - 16:00</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">プロジェクト締切</div>
              <div className="text-xs text-gray-600">8月15日 23:59</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">ライブセミナー</div>
              <div className="text-xs text-gray-600">8月16日 19:00 - 20:30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}