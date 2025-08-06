'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/effects/AnimatedText'
import MagneticButton from '@/components/effects/MagneticButton'
import ParticleBackground from '@/components/effects/ParticleBackground'
import FloatingElements from '@/components/effects/FloatingElements'
import { Icons } from '@/components/ui/icons'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const { isIntersecting } = useIntersectionObserver()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `
      }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <FloatingElements />
        <ParticleBackground />
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            transform: `translate3d(${-parallaxOffset}px, ${parallaxOffset * 0.3}px, 0)`,
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'linear-gradient(225deg, #a8e6cf, #ffd3a5)',
            transform: `translate3d(${parallaxOffset * 0.5}px, ${-parallaxOffset * 0.2}px, 0)`,
            top: '60%',
            right: '10%',
          }}
        />
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        style={{
          transform: `translate3d(0, ${parallaxOffset * -0.1}px, 0)`
        }}
      >
        {/* Animated Trust Badge */}
        <div 
          className={`inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-12 border border-white/20 shadow-2xl transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="w-3 h-3 bg-emerald-400 rounded-full mr-4 animate-pulse shadow-lg shadow-emerald-400/50"></div>
          <span className="text-white font-semibold">
            🚀 10,000+ プロフェッショナルが成長中
          </span>
          <div className="ml-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-400/30">
            LIVE
          </div>
        </div>

        {/* Revolutionary Main Heading */}
        <div className="mb-12">
          <AnimatedText
            text="未来を創る"
            className="block text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tight"
            effect="wave"
            staggerDelay={100}
          />
          <AnimatedText
            text="学習革命"
            className="block text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent mb-8 tracking-tight"
            effect="glitch"
            delay={1000}
            staggerDelay={150}
          />
        </div>

        {/* Premium Subtitle */}
        <div 
          className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
            エンジニアとマーケターのための
            <span className="font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"> AIパワード </span>
            学習プラットフォーム
          </p>
          <p className="text-lg md:text-xl text-white/70 mt-4 leading-relaxed">
            最先端のテクノロジーと革新的な学習手法で、あなたのキャリアを次のレベルへ
          </p>
        </div>

        {/* Premium CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <MagneticButton
            variant="gradient"
            size="lg"
            className="text-xl px-12 py-6 shadow-2xl shadow-blue-500/25 border border-white/20"
            strength={0.4}
          >
            <Icons.Rocket />
            <span className="ml-3">今すぐ体験する</span>
            <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            className="text-xl px-12 py-6 bg-white/5 backdrop-blur-xl border-white/30 text-white hover:bg-white/10 shadow-2xl"
            strength={0.3}
          >
            <Icons.Play />
            <span className="ml-3">デモを見る</span>
          </MagneticButton>
        </div>

        {/* Enhanced Stats Display */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          {[
            { number: '10,000+', label: '学習者', icon: '👥', color: 'from-blue-400 to-cyan-400' },
            { number: '98%', label: '満足度', icon: '⭐', color: 'from-yellow-400 to-orange-400' },
            { number: '50+', label: 'コース', icon: '📚', color: 'from-green-400 to-emerald-400' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 cursor-pointer shadow-2xl"
              style={{ animationDelay: `${1800 + index * 200}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className="text-white/80 text-lg font-medium">
                {stat.label}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Revolutionary Platform Preview */}
        <div 
          className={`relative max-w-7xl mx-auto transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
          style={{ 
            transitionDelay: '2000ms',
            transform: `translate3d(0, ${parallaxOffset * -0.2}px, 0)`
          }}
        >
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden relative border border-white/10">
                {/* Mock Browser UI */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-lg px-4 py-1 text-gray-300 text-sm">
                      https://learnhub.ai ✨
                    </div>
                  </div>
                </div>
                
                {/* Platform Interface Mock */}
                <div className="pt-12 p-8 h-full flex flex-col justify-center items-center relative">
                  <div className="text-center space-y-6">
                    <div className="text-6xl md:text-8xl animate-bounce">🧠</div>
                    <div className="text-white text-2xl md:text-3xl font-bold">
                      AI Learning Platform
                    </div>
                    <div className="text-gray-400">
                      Your personalized learning journey starts here
                    </div>
                    
                    {/* Interactive Elements */}
                    <div className="flex justify-center space-x-4 mt-8">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-4 h-4 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>

                  {/* Floating UI Elements */}
                  <div className="absolute top-20 left-8 bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-400/30 animate-pulse">
                    <div className="text-blue-300 text-xs">AI Progress</div>
                    <div className="text-white font-bold">87%</div>
                  </div>
                  
                  <div className="absolute bottom-20 right-8 bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-400/30 animate-pulse" style={{ animationDelay: '1.5s' }}>
                    <div className="text-green-300 text-xs">Live Users</div>
                    <div className="text-white font-bold">2,847</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">スクロールして詳細を見る</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}