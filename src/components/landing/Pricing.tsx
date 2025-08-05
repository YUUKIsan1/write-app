'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import MagneticButton from '@/components/effects/MagneticButton'
import AnimatedText from '@/components/effects/AnimatedText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string | null;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  gradient: string;
  buttonText: string;
  popular: boolean;
  ctaColor: 'gradient' | 'outline';
}

const pricingPlans: PricingPlan[] = [
  {
    name: "スターター",
    subtitle: "学習を始めたい方に",
    price: "無料",
    originalPrice: null,
    period: "30日間",
    description: "まずは体験から。基本的な学習機能を30日間無料で利用できます。",
    features: [
      "基本カリキュラムへのアクセス",
      "AIによる学習診断",
      "コミュニティ参加",
      "基本サポート",
      "進捗トラッキング"
    ],
    limitations: [
      "プロジェクト数制限: 2個まで",
      "専門家相談: 月1回まで"
    ],
    gradient: "from-gray-600 to-gray-700",
    buttonText: "今すぐ無料で始める",
    popular: false,
    ctaColor: "gradient"
  },
  {
    name: "プロフェッショナル",
    subtitle: "本格的にスキルアップしたい方に",
    price: "¥29,800",
    originalPrice: "¥37,250",
    period: "/月",
    description: "AI駆動の個別学習と実践プロジェクトで、短期間でのスキル習得を実現。",
    features: [
      "全カリキュラム無制限アクセス",
      "AI個別学習プラン",
      "実践プロジェクト参加",
      "専門家による直接指導",
      "24/7 プレミアムサポート",
      "キャリア相談",
      "面接対策支援",
      "履歴書添削"
    ],
    limitations: [],
    gradient: "from-blue-600 to-purple-600",
    buttonText: "プロになる",
    popular: true,
    ctaColor: "gradient"
  },
  {
    name: "エンタープライズ",
    subtitle: "チーム・企業での導入に",
    price: "要相談",
    originalPrice: null,
    period: "",
    description: "企業・チーム向けの包括的なスキル開発ソリューション。カスタマイズ対応。",
    features: [
      "プロフェッショナルプランの全機能",
      "チーム管理ダッシュボード",
      "企業専用プロジェクト",
      "専属コンサルタント",
      "カスタムカリキュラム",
      "進捗レポート分析",
      "オンサイト研修",
      "API統合サポート"
    ],
    limitations: [],
    gradient: "from-purple-600 to-pink-600",
    buttonText: "相談する",
    popular: false,
    ctaColor: "outline"
  }
];

export default function Pricing() {
  const { isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section id="pricing" className="relative pt-20 pb-32 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-500 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-green-300">💰 投資収益率 1000%超え</span>
          </div>
          
          <AnimatedText
            text="成長への投資、リターンは無限大"
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={50}
          />
          
          <p 
            className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-500 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            あなたのキャリアへの投資が、<span className="text-yellow-300 font-semibold">生涯年収3000万円アップ</span>を実現します
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${plan.popular ? 'lg:-mt-8' : ''}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 最も人気
                  </div>
                </div>
              )}

              <div className={`relative h-full transition-all duration-500 ${
                hoveredPlan === index ? 'scale-105' : 'scale-100'
              }`}>
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${plan.gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                
                <div className={`relative h-full bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden ${
                  plan.popular ? 'border-yellow-400/50' : ''
                }`}>
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${plan.gradient} p-6 text-center`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/80 text-sm mb-6">{plan.subtitle}</p>
                    
                    <div className="mb-4">
                      {plan.originalPrice && (
                        <div className="text-white/60 text-lg line-through mb-1">
                          {plan.originalPrice}
                        </div>
                      )}
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-black text-white">{plan.price}</span>
                        <span className="text-white/80 text-lg ml-2">{plan.period}</span>
                      </div>
                    </div>
                    
                    {plan.originalPrice && (
                      <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm inline-block">
                        20% OFF 早期割引中！
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-300 text-center mb-8 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <h4 className="text-white font-semibold mb-4">✨ 含まれる機能</h4>
                      {plan.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className={`flex items-start space-x-3 transition-all duration-300 ${
                            hoveredPlan === index ? 'translate-x-2' : ''
                          }`}
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <Icons.Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="space-y-3 mb-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <h4 className="text-yellow-300 font-semibold text-sm">⚠️ 制限事項</h4>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start space-x-3">
                            <div className="w-4 h-4 border border-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                            <span className="text-gray-300 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link 
                      href={plan.name === "スターター" ? "/register" : plan.name === "プロフェッショナル" ? "/register" : "/contact"}
                    >
                      <MagneticButton
                        variant={plan.ctaColor}
                        size="lg"
                        className="w-full py-4 text-lg font-semibold shadow-2xl"
                        strength={0.3}
                      >
                        {plan.buttonText}
                      </MagneticButton>
                    </Link>

                    {/* Trust indicators */}
                    <div className="text-center mt-6 space-y-2">
                      <div className="text-gray-400 text-sm">
                        {plan.name === "スターター" && "📱 即座にアクセス・CC不要"}
                        {plan.name === "プロフェッショナル" && "🛡️ 30日間返金保証"}
                        {plan.name === "エンタープライズ" && "🤝 専属サポート付き"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats & Guarantees */}
        <div 
          className={`text-center transition-all duration-700 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-8 border border-green-400/30 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">💰 投資収益率の実例</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-green-400 mb-2">¥29,800</div>
                <div className="text-gray-300 mb-2">月額投資</div>
                <div className="text-sm text-gray-400">プロフェッショナルプラン</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">+¥180万</div>
                <div className="text-gray-300 mb-2">年収アップ</div>
                <div className="text-sm text-gray-400">平均実績（6ヶ月後）</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">6,040%</div>
                <div className="text-gray-300 mb-2">年間ROI</div>
                <div className="text-sm text-gray-400">投資収益率</div>
              </div>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-6xl">🛡️</div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">100% 満足保証</h4>
                <p className="text-gray-300">
                  30日以内に満足いただけない場合、<span className="text-green-400 font-semibold">全額返金</span>いたします。
                  質問なし、理由なし、即座に返金。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}