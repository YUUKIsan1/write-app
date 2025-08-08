'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'

const weeklyData = [
  { day: '月', hours: 4, completed: 2 },
  { day: '火', hours: 6, completed: 3 },
  { day: '水', hours: 3, completed: 1 },
  { day: '木', hours: 8, completed: 4 },
  { day: '金', hours: 5, completed: 2 },
  { day: '土', hours: 7, completed: 5 },
  { day: '日', hours: 4, completed: 2 }
]

const skillAreas = [
  { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-orange-500', icon: '🟨' },
  { name: 'React', level: 78, color: 'from-blue-400 to-cyan-500', icon: '⚛️' },
  { name: 'TypeScript', level: 72, color: 'from-blue-500 to-indigo-600', icon: '🟦' },
  { name: 'Node.js', level: 65, color: 'from-green-400 to-green-600', icon: '🟢' },
  { name: 'CSS/Styling', level: 88, color: 'from-pink-400 to-purple-500', icon: '🎨' },
  { name: 'Database', level: 58, color: 'from-gray-400 to-gray-600', icon: '🗄️' }
]

const recentCourses = [
  {
    id: 1,
    title: 'React 18 完全マスター',
    progress: 87,
    timeSpent: '12h',
    difficulty: 'Advanced',
    instructor: '山田エキスパート',
    dueDate: '2024年8月15日',
    thumbnail: '⚛️'
  },
  {
    id: 2,
    title: 'TypeScript 実践開発',
    progress: 64,
    timeSpent: '8h',
    difficulty: 'Intermediate',
    instructor: '佐藤先生',
    dueDate: '2024年8月20日',
    thumbnail: '🟦'
  },
  {
    id: 3,
    title: 'Next.js アプリケーション構築',
    progress: 23,
    timeSpent: '3h',
    difficulty: 'Advanced',
    instructor: 'エンジニア田中',
    dueDate: '2024年8月25日',
    thumbnail: '▲'
  }
]

export default function ProgressCharts() {
  const [activeTab, setActiveTab] = useState('weekly')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const maxHours = Math.max(...weeklyData.map(d => d.hours))

  return (
    <div className="space-y-6">
      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">週間学習統計</h3>
            <p className="text-sm text-gray-500">今週の学習時間とコース完了数</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'weekly'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              週間
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === 'monthly'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              月間
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="flex items-end justify-between h-40 space-x-3">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-2 mb-2">
                  <div className="text-xs font-semibold text-gray-600">{data.completed}</div>
                  <div className="w-full relative">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg shadow-lg transition-all duration-500 hover:shadow-xl"
                      style={{ 
                        height: `${(data.hours / maxHours) * 120}px`,
                        minHeight: '20px'
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-700">{data.day}</div>
                <div className="text-xs text-gray-500">{data.hours}h</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              <span className="text-sm text-gray-600">学習時間</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">完了コース数</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">スキル進捗</h3>
            <p className="text-sm text-gray-500">各技術領域の習熟度</p>
          </div>
          <Icons.TrendingUp className="w-5 h-5 text-green-500" />
        </div>

        <div className="space-y-4">
          {skillAreas.map((skill) => (
            <div 
              key={skill.name}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-gray-900">{skill.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
              </div>
              
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out rounded-full shadow-sm`}
                  style={{ 
                    width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                    transitionDelay: hoveredSkill === skill.name ? '0ms' : '0ms'
                  }}
                />
                {hoveredSkill !== skill.name && (
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">進行中のコース</h3>
            <p className="text-sm text-gray-500">現在受講中のコース一覧</p>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            すべて見る
          </button>
        </div>

        <div className="space-y-4">
          {recentCourses.map((course) => (
            <div 
              key={course.id}
              className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-xl group-hover:shadow-lg transition-all duration-300">
                    {course.thumbnail}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {course.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>講師: {course.instructor}</span>
                      <span>•</span>
                      <span>{course.difficulty}</span>
                      <span>•</span>
                      <span>{course.timeSpent} 完了</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{course.progress}%</div>
                  <div className="text-xs text-gray-500">{course.dueDate}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>進捗</span>
                  <span>{course.progress}% 完了</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}