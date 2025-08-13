'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import AnimatedText from '@/components/effects/AnimatedText'
import { OnboardingData } from '@/app/(onboarding)/onboarding/page'

interface WelcomeStepProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  onComplete: () => void
  canGoBack: boolean
  isFirstStep: boolean
  isLastStep: boolean
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const [mounted, setMounted] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    
    // アニメーション段階的実行
    const timer1 = setTimeout(() => setAnimationStep(1), 500)
    const timer2 = setTimeout(() => setAnimationStep(2), 1200)
    const timer3 = setTimeout(() => setAnimationStep(3), 2000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleGetStarted = () => {
    onNext({})
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Logo */}
        <div className={`mb-12 transition-all duration-1000 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/25">
            <span className="text-white font-black text-4xl">T</span>
          </div>
          
          <AnimatedText
            text="TechKnot へようこそ！"
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={100}
          />
        </div>

        {/* Welcome Message */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-light">
              <span className="text-cyan-300 font-semibold">技術への情熱が人をつなぐ</span>
              コミュニティで、あなたの学習の旅を始めましょう
            </p>
            
            <p className="text-lg text-white/70 leading-relaxed">
              数分で簡単なセットアップを完了し、<br className="hidden md:block" />
              パーソナライズされた学習体験をお楽しみください
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Icons.Brain,
                title: 'AI学習プラン',
                description: 'あなた専用の学習パスを自動生成',
                gradient: 'from-blue-500 to-indigo-600',
                bgGradient: 'from-blue-50/10 to-indigo-50/10'
              },
              {
                icon: Icons.Users,
                title: '仲間とのつながり',
                description: '志を同じくする学習者との交流',
                gradient: 'from-green-500 to-emerald-600',
                bgGradient: 'from-green-50/10 to-emerald-50/10'
              },
              {
                icon: Icons.TrendingUp,
                title: 'キャリア成長',
                description: '実践的なスキル習得とキャリア支援',
                gradient: 'from-purple-500 to-violet-600',
                bgGradient: 'from-purple-50/10 to-violet-50/10'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-105`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                    <Icon />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`transition-all duration-1000 delay-1000 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={handleGetStarted}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex items-center">
              <span className="mr-3">始めましょう</span>
              <Icons.ArrowRight />
              
              {/* Sparkle Effect */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-200 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </button>
          
          <p className="text-white/50 text-sm mt-6">
            セットアップは約2分で完了します
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-10 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-indigo-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  )
}