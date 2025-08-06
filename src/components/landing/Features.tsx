'use client'

import { useState, useRef } from 'react'
import { Icons } from '@/components/ui/icons'
import AnimatedText from '@/components/effects/AnimatedText'
import MagneticButton from '@/components/effects/MagneticButton'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  gradient: string;
  hoverColor: string;
}

const features: Feature[] = [
  {
    icon: <Icons.Brain />,
    title: 'AI駆動学習',
    description: '最先端のAIがあなたの学習スタイルを分析し、パーソナライズされた学習パスを提供。',
    details: ['個別学習プラン', 'リアルタイム進捗分析', '弱点自動検出', 'スマート復習システム'],
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    hoverColor: 'hover:shadow-blue-500/25'
  },
  {
    icon: <Icons.Rocket />,
    title: '実践プロジェクト',
    description: '実際の企業課題を題材にした本格的なプロジェクトで、即戦力となるスキルを習得。',
    details: ['企業連携プロジェクト', '実装からデプロイまで', 'コードレビュー', 'プレゼンテーション'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    hoverColor: 'hover:shadow-green-500/25'
  },
  {
    icon: <Icons.Users />,
    title: 'エキスパート・コミュニティ',
    description: '業界のトップエンジニアとマーケターが集う、ハイレベルな学習コミュニティ。',
    details: ['専門家による直接指導', 'ペアプログラミング', '業界ネットワーキング', '24/7サポート'],
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    hoverColor: 'hover:shadow-purple-500/25'
  },
  {
    icon: <Icons.Target />,
    title: '成果保証システム',
    description: 'データに基づく成長トラッキングと、確実な成果を保証する独自のメソッド。',
    details: ['スキル診断テスト', 'KPI追跡システム', '成長レポート', '改善提案AI'],
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    hoverColor: 'hover:shadow-orange-500/25'
  },
  {
    icon: <Icons.Award />,
    title: 'キャリア・アクセラレーション',
    description: '転職から独立まで、あなたのキャリア目標実現を徹底サポート。',
    details: ['専属キャリアコンサル', '企業マッチング', '面接対策・練習', 'ポートフォリオ支援'],
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    hoverColor: 'hover:shadow-pink-500/25'
  },
  {
    icon: <Icons.Trending />,
    title: '未来スキル・ラボ',
    description: '常に最新技術にアップデートされるカリキュラムで、未来を見据えたスキルを獲得。',
    details: ['最新技術トレンド', 'ベータ版アクセス', '技術研究プロジェクト', 'イノベーション・チャレンジ'],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    hoverColor: 'hover:shadow-cyan-500/25'
  }
];

interface FeaturesProps {
  className?: string;
}

export default function Features({ className }: FeaturesProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      id="features" 
      className={`relative pt-0 pb-32 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden ${className}`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 relative">
          {/* Glowing badge */}
          <div 
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-full text-sm font-semibold mb-6 border border-white/30 shadow-2xl transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'
            }`}
            style={{ 
              boxShadow: '0 0 50px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
            }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></div>
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">
              ✨ 革新的機能
            </span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse ml-3" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Main title with enhanced styling */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-full"></div>
            <AnimatedText
              text="限界を超える6つの革新"
              className="relative text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent"
              effect="wave"
              staggerDelay={60}
            />
          </div>
          
          {/* Enhanced description */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              <span className="text-blue-300 font-semibold">AI</span>、
              <span className="text-purple-300 font-semibold">実践</span>、
              <span className="text-pink-300 font-semibold">コミュニティ</span>が融合した、
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              これまでにない学習体験で<span className="text-yellow-300 font-semibold">あなたのポテンシャル</span>を最大限に引き出します
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`relative h-full p-8 bg-gradient-to-br ${feature.gradient} rounded-3xl border border-white/10 shadow-2xl ${feature.hoverColor} hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles effect */}
                {hoveredFeature === index && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 200}ms`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-200 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div 
                        key={detailIndex}
                        className={`flex items-center text-white/80 text-sm transition-all duration-300 ${
                          hoveredFeature === index ? 'translate-x-2' : ''
                        }`}
                        style={{ transitionDelay: `${detailIndex * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full mr-3 group-hover:bg-yellow-300 transition-colors duration-300"></div>
                        {detail}
                      </div>
                    ))}
                  </div>

                  {/* Hover indicator */}
                  <div className={`absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredFeature === index ? 'scale-110 bg-white/30' : 'scale-100'
                  }`}>
                    <Icons.ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div 
          className={`relative transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '1500ms' }}
        >
          <div className="relative group">
            {/* Animated border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative bg-black/50 backdrop-blur-2xl rounded-3xl p-12 border border-white/10">
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  革命はここから始まる
                </h3>
                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  10,000人以上のプロフェッショナルが選んだ、未来の学習プラットフォーム。
                  <br />
                  あなたも今すぐ、この革命に参加しませんか？
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <MagneticButton
                    variant="gradient"
                    size="lg"
                    className="text-xl px-12 py-6 shadow-2xl shadow-blue-500/25 border border-white/20"
                    strength={0.4}
                  >
                    <Icons.Rocket />
                    <span className="ml-3">無料で革命を体験</span>
                    <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </MagneticButton>

                  <MagneticButton
                    variant="outline"
                    size="lg"
                    className="text-xl px-12 py-6 bg-white/5 backdrop-blur-xl border-white/30 text-white hover:bg-white/10 shadow-2xl"
                    strength={0.3}
                  >
                    <Icons.Play />
                    <span className="ml-3">プラットフォームツアー</span>
                  </MagneticButton>
                </div>

                {/* Trust indicators */}
                <div className="flex justify-center items-center space-x-8 mt-10 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Icons.Check />
                    <span>30日間返金保証</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Check />
                    <span>クレジットカード不要</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Check />
                    <span>即座にアクセス</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}