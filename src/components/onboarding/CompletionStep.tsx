'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import AnimatedText from '@/components/effects/AnimatedText'
import { OnboardingData } from '@/app/(onboarding)/onboarding/page'

interface CompletionStepProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  onComplete: () => void
  canGoBack: boolean
  isLastStep: boolean
}

export default function CompletionStep({ data, onComplete }: CompletionStepProps) {
  const [animationStep, setAnimationStep] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // アニメーション段階的実行
    const timer1 = setTimeout(() => setAnimationStep(1), 500)
    const timer2 = setTimeout(() => setAnimationStep(2), 1200)
    const timer3 = setTimeout(() => setAnimationStep(3), 2000)
    const timer4 = setTimeout(() => setIsReady(true), 2500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  // データの要約を取得
  const getSummary = () => {
    const ageMap: { [key: string]: string } = {
      '10s': '10代',
      '20s-early': '20代前半',
      '20s-late': '20代後半',
      '30s-early': '30代前半',
      '30s-late': '30代後半～'
    }

    const industryMap: { [key: string]: string } = {
      'engineer': 'エンジニア',
      'marketer': 'マーケター',
      'designer': 'デザイナー',
      'other': data.customIndustry || 'その他'
    }

    return {
      age: ageMap[data.age || ''] || '',
      industry: industryMap[data.industry || ''] || '',
      purposeCount: data.purpose?.length || 0,
      goalsCount: data.goals?.length || 0,
      interestsCount: data.interests?.length || 0
    }
  }

  const summary = getSummary()

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Success Animation */}
        <div className={`mb-12 transition-all duration-1000 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
            {/* Rotating Success Ring */}
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border-4 border-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-full animate-spin opacity-30"></div>
              <div className="absolute inset-2 border-4 border-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                <Icons.Check className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            
            {/* Confetti Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-bounce opacity-80"
                  style={{
                    background: `hsl(${i * 45}, 70%, 60%)`,
                    left: `${(i - 4) * 20}px`,
                    top: `${-20 - (i % 2) * 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>
          
          <AnimatedText
            text="セットアップ完了！"
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={100}
          />
        </div>

        {/* Welcome Message */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-light">
            🎉 ようこそ、<span className="text-cyan-300 font-semibold">TechKnot</span>の世界へ！
          </h3>
          
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            あなたのプロフィールが完成しました。<br />
            これから<span className="text-emerald-300 font-semibold">技術への情熱が人をつなぐ</span>コミュニティで、<br />
            素晴らしい学習の旅を始めましょう。
          </p>
        </div>

        {/* Profile Summary */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h4 className="text-xl font-bold text-white mb-6">あなたのプロフィール</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/70 flex items-center">
                    <Icons.User className="w-4 h-4 mr-2" />
                    年代
                  </span>
                  <span className="text-white font-semibold">{summary.age}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/70 flex items-center">
                    <Icons.Briefcase className="w-4 h-4 mr-2" />
                    業界
                  </span>
                  <span className="text-white font-semibold">{summary.industry}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/70 flex items-center">
                    <Icons.Target className="w-4 h-4 mr-2" />
                    選択した目的
                  </span>
                  <span className="text-cyan-300 font-semibold">{summary.purposeCount}個</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white/70 flex items-center">
                    <Icons.Heart className="w-4 h-4 mr-2" />
                    興味のあるトピック
                  </span>
                  <span className="text-emerald-300 font-semibold">{summary.interestsCount}個</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className={`mb-16 transition-all duration-1000 delay-1000 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h4 className="text-2xl font-bold text-white mb-8">これから何ができるのか？</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Icons.BookOpen,
                title: 'パーソナライズされた学習',
                description: 'あなたの興味に基づいたコンテンツとコースが表示されます',
                gradient: 'from-blue-500 to-indigo-600',
                bgGradient: 'from-blue-50/10 to-indigo-50/10'
              },
              {
                icon: Icons.Users,
                title: 'コミュニティとつながり',
                description: '同じ目標を持つ仲間と出会い、一緒に成長しましょう',
                gradient: 'from-green-500 to-emerald-600',
                bgGradient: 'from-green-50/10 to-emerald-50/10'
              },
              {
                icon: Icons.TrendingUp,
                title: '成長を追跡',
                description: 'あなたの学習進捗とスキル向上を可視化します',
                gradient: 'from-purple-500 to-violet-600',
                bgGradient: 'from-purple-50/10 to-violet-50/10'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-white/10 hover:border-white/20 transition-all duration-500`}
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-2">{feature.title}</h5>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={`transition-all duration-1000 delay-1200 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onComplete}
            className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
            disabled={!isReady}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex items-center">
              <Icons.Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              <span>ダッシュボードへ進む</span>
              <Icons.ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Sparkle Effects */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-200 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </button>
          
          <p className="text-white/50 text-sm mt-6">
            🎯 あなた専用の学習体験が待っています
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-emerald-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-10 w-3 h-3 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  )
}