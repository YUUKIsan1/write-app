'use client'

import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import MagneticButton from '@/components/effects/MagneticButton'
import AnimatedText from '@/components/effects/AnimatedText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface CTAProps {
  className?: string;
}

export default function CTA({ className }: CTAProps) {
  const { isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className={`relative py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="text-center">
          <div 
            className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-yellow-300">🚀 限定オファー</span>
          </div>

          <AnimatedText
            text="あなたのキャリア革命が、今始まる"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={50}
          />
          
          <p 
            className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/90 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="text-yellow-300 font-semibold">10,000人以上</span>が選んだ学習プラットフォームで、
            <br className="hidden md:block" />
            理想のキャリアを実現しませんか？今なら<span className="text-pink-300 font-semibold">特別価格</span>でご提供
          </p>

          {/* Urgency Indicators */}
          <div 
            className={`flex flex-col sm:flex-row justify-center items-center gap-6 mb-12 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-center bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
              <span className="text-2xl mr-3">⏰</span>
              <span className="text-sm font-medium">今なら早期割引で<span className="text-yellow-300 font-bold">20%OFF</span></span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
              <span className="text-2xl mr-3">🛡️</span>
              <span className="text-sm font-medium"><span className="text-green-300 font-bold">30日間</span>返金保証</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
              <span className="text-2xl mr-3">👥</span>
              <span className="text-sm font-medium">限定<span className="text-pink-300 font-bold">100名</span>の特別サポート</span>
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <Link href="/register" className="inline-block">
              <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl px-12 py-6 rounded-xl shadow-2xl border border-white/20 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 flex items-center">
                <Icons.Rocket />
                <span className="ml-3">今すぐ無料で革命を体験</span>
                <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
            </Link>

            <Link href="/login">
              <MagneticButton
                variant="outline"
                size="xl"
                className="text-xl px-12 py-6 bg-white/5 backdrop-blur-xl border-white/30 text-white hover:bg-white/10 shadow-2xl"
                strength={0.3}
              >
                <Icons.Users />
                <span className="ml-3">ログイン</span>
              </MagneticButton>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className="text-center">
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10,000+</div>
              <div className="text-white/80">受講生が成長を実感</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">85%</div>
              <div className="text-white/80">転職成功率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">3.2倍</div>
              <div className="text-white/80">平均年収アップ</div>
            </div>
          </div>
        </div>

        {/* Bottom Premium Section */}
        <div 
          className={`border-t border-white/20 pt-16 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '1100ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Free Trial Benefits */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <Icons.Target />
                  </div>
                  まずは無料体験から
                </h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">クレジットカード不要</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">30日間すべての機能を無料体験</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">いつでもキャンセル可能</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">専門カウンセラーによる個別相談</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Support Benefits */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Icons.Award />
                  </div>
                  安心のサポート体制
                </h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">24時間質問サポート</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">専属メンターによる個別指導</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">転職成功まで無期限サポート</span>
                  </li>
                  <li className="flex items-center">
                    <Icons.Check />
                    <span className="ml-3">卒業後も継続的なキャリア支援</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p className="text-white/90 leading-relaxed max-w-3xl mx-auto mb-10 text-lg">
              今始めれば<strong className="text-yellow-300">3ヶ月後</strong>には新しいキャリアの扉が開かれているかもしれません。
              <br />
              一歩踏み出す勇気が、あなたの人生を<strong className="text-pink-300">大きく変えます</strong>。
            </p>
            
            <Link href="/register" className="inline-block">
              <button className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-2xl px-16 py-8 rounded-xl shadow-2xl border border-white/20 font-bold transition-all duration-300 hover:scale-105 animate-pulse flex items-center">
                <Icons.Trending />
                <span className="ml-4">✨ 今すぐ人生を変える</span>
                <div className="ml-4 w-3 h-3 bg-white rounded-full animate-bounce"></div>
              </button>
            </Link>

            <p className="text-white/60 text-sm mt-6">
              ※ 30日間無料体験。満足いただけなければ全額返金いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}