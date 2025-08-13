'use client'

import { Icons } from '@/components/ui/icons'

const stats = [
  {
    id: 1,
    title: '完了コース',
    value: '12',
    change: '+3',
    changeType: 'increase',
    icon: Icons.BookOpen,
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    description: '今月完了したコース数',
    detail: 'React、TypeScript、Node.js'
  },
  {
    id: 2,
    title: '学習時間',
    value: '127h',
    change: '+15h',
    changeType: 'increase',
    icon: Icons.Clock,
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    description: '今月の総学習時間',
    detail: '平均: 4.1時間/日'
  },
  {
    id: 3,
    title: '完了プロジェクト',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: Icons.Code,
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    description: '完了した実践プロジェクト',
    detail: 'Eコマース、ブログアプリ'
  },
  {
    id: 4,
    title: 'スキルレベル',
    value: '78%',
    change: '+12%',
    changeType: 'increase',
    icon: Icons.TrendingUp,
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-50',
    description: '総合スキル達成度',
    detail: 'フロントエンド: 85%'
  }
]

export default function OverviewCards() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        
        return (
          <div
            key={stat.id}
            className={`
              group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl 
              transition-all duration-500 cursor-pointer transform hover:scale-105
              border border-gray-100 overflow-hidden
            `}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg 
                  group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500
                `}>
                  <Icon />
                </div>
                
                <div className={`
                  flex items-center text-sm font-semibold px-2 py-1 rounded-full
                  ${stat.changeType === 'increase' 
                    ? 'text-green-600 bg-green-100 group-hover:bg-green-200' 
                    : 'text-red-600 bg-red-100 group-hover:bg-red-200'
                  }
                  transition-all duration-300
                `}>
                  <Icons.TrendingUp />
                  {stat.change}
                </div>
              </div>

              {/* Main Value */}
              <div className="mb-2">
                <div className="text-3xl font-black text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {stat.title}
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                {stat.description}
              </div>

              {/* Additional Detail on Hover */}
              <div className={`
                mt-3 text-xs font-medium text-gray-700 opacity-0 transform translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300
                ${stat.gradient.includes('green') ? 'text-green-700' :
                  stat.gradient.includes('blue') ? 'text-blue-700' :
                  stat.gradient.includes('purple') ? 'text-purple-700' : 'text-orange-700'
                }
              `}>
                {stat.detail}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Icon />
              </div>

              {/* Progress Indicator */}
              {stat.id === 4 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 group-hover:h-3 transition-all duration-300">
                    <div 
                      className={`h-2 group-hover:h-3 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-500`}
                      style={{ width: stat.value }}
                    />
                  </div>
                </div>
              )}

              {/* Animated Border */}
              <div className={`
                absolute inset-0 rounded-3xl border-2 border-transparent 
                bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 
                transition-opacity duration-500
              `} 
              style={{
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor'
              }}
              />
            </div>

            {/* Hover Glow Effect */}
            <div className={`
              absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-3xl blur-xl opacity-0 
              group-hover:opacity-20 transition-opacity duration-500 -z-10
            `} />
          </div>
        )
      })}
    </div>
  )
}