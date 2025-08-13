'use client'

import { Icons } from '@/components/ui/icons'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const processSteps = [
  {
    step: "01",
    title: "AIスキル診断",
    description: "現在のスキルレベルと学習スタイルを詳細に分析",
    icon: <Icons.Brain />,
    color: "from-blue-500 to-indigo-600",
    duration: "5分"
  },
  {
    step: "02", 
    title: "個別学習プラン生成",
    description: "あなた専用の最短成長ルートを自動生成",
    icon: <Icons.Target />,
    color: "from-green-500 to-emerald-600",
    duration: "即座に"
  },
  {
    step: "03",
    title: "実践プロジェクト開始",
    description: "学んだスキルを即座に実際のプロジェクトで活用",
    icon: <Icons.Rocket />,
    color: "from-purple-500 to-violet-600",
    duration: "初日から"
  },
  {
    step: "04",
    title: "コミュニティ参加",
    description: "エキスパートと仲間からのサポートを受けながら成長加速",
    icon: <Icons.Users />,
    color: "from-orange-500 to-red-500",
    duration: "24/7"
  },
  {
    step: "05",
    title: "キャリア実現",
    description: "転職・昇進・独立など、理想のキャリアゴールを達成",
    icon: <Icons.Award />,
    color: "from-pink-500 to-rose-500",
    duration: "3-6ヶ月"
  }
];

export default function ProcessFlow() {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className="relative pt-8 pb-24 bg-gradient-to-b from-gray-800 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={elementRef} className="text-center mb-16">
          <div 
            className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-blue-300">🎯 成功への道筋</span>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            5ステップで理想のキャリアを実現
          </h2>
          
          <p 
            className={`text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            科学的に実証された学習メソッドで、
            最短距離でプロフェッショナルへの道を歩みます
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden lg:block"></div>
          
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className="flex-1 max-w-lg">
                    <div className={`p-8 bg-gradient-to-br ${step.color} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer group`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                            {step.icon}
                          </div>
                          <div>
                            <div className="text-white/70 text-sm font-medium">STEP {step.step}</div>
                            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                          </div>
                        </div>
                        <div className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded-full">
                          {step.duration}
                        </div>
                      </div>
                      
                      <p className="text-white/90 text-lg leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Progress Indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i <= index ? 'bg-white' : 'bg-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-white/60 text-sm">
                          {index + 1}/5 完了
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle (Desktop) */}
                  <div className="hidden lg:block relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white font-bold text-xl`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Visual/Animation Area */}
                  <div className="flex-1 max-w-lg">
                    <div className="relative h-64 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      
                      {/* Step-specific visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {index === 0 && (
                          <div className="text-center space-y-4">
                            <div className="text-6xl animate-pulse">🧠</div>
                            <div className="text-white/80">AI分析中...</div>
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="text-center space-y-4">
                            <div className="text-6xl animate-spin">🎯</div>
                            <div className="text-white/80">プラン生成中...</div>
                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="w-24 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="text-center space-y-4">
                            <div className="text-6xl animate-bounce">🚀</div>
                            <div className="text-white/80">プロジェクト開始！</div>
                            <div className="grid grid-cols-3 gap-2">
                              {Array.from({length: 6}).map((_, i) => (
                                <div key={i} className={`w-4 h-4 rounded ${i < 4 ? 'bg-purple-400' : 'bg-gray-600'} animate-pulse`} style={{animationDelay: `${i * 100}ms`}}></div>
                              ))}
                            </div>
                          </div>
                        )}
                        {index === 3 && (
                          <div className="text-center space-y-4">
                            <div className="text-6xl animate-pulse">👥</div>
                            <div className="text-white/80">コミュニティ参加</div>
                            <div className="flex justify-center space-x-2">
                              {Array.from({length: 4}).map((_, i) => (
                                <div key={i} className="w-6 h-6 bg-orange-400 rounded-full animate-ping" style={{animationDelay: `${i * 200}ms`}}></div>
                              ))}
                            </div>
                          </div>
                        )}
                        {index === 4 && (
                          <div className="text-center space-y-4">
                            <div className="text-6xl animate-bounce">🏆</div>
                            <div className="text-white/80">目標達成！</div>
                            <div className="text-yellow-400 text-2xl animate-pulse">✨ SUCCESS ✨</div>
                          </div>
                        )}
                      </div>

                      {/* Floating particles */}
                      <div className="absolute inset-0">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${10 + i * 20}%`,
                              animationDelay: `${i * 500}ms`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div 
          className={`mt-24 pt-16 border-t border-white/10 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                平均3ヶ月
              </div>
              <div className="text-gray-400">転職成功までの期間</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-gray-400">プログラム完走率</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                3.2倍
              </div>
              <div className="text-gray-400">平均年収アップ率</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}