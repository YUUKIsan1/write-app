'use client'

import { Icons } from '@/components/ui/icons'
import DetailedFeature from './Features/DetailedFeature'
import AnimatedText from '@/components/effects/AnimatedText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const features = [
  {
    title: "AI駆動の個別学習体験",
    subtitle: "🧠 LEARNING",
    description: "あなたの学習スタイルを深く理解し、最適化されたパーソナル学習パスを提供。従来の一律教育を超越した、TechKnotの完全個別対応学習体験をお楽しみください。",
    benefits: [
      "AIが分析する個別学習プラン - あなただけの最短成長ルート",
      "リアルタイム理解度分析 - 躓きポイントを即座に特定・解決",
      "適応的難易度調整 - 常に最適なチャレンジレベルを維持",
      "スマート復習システム - 記憶の科学に基づく効率的な定着",
      "業界トレンド連動 - 市場価値の高いスキルを優先学習"
    ],
    stats: [
      { number: "3.2倍", label: "学習効率向上" },
      { number: "92%", label: "継続率" },
      { number: "AI分析", label: "個別最適化" }
    ],
    gradient: "from-blue-500 to-indigo-600",
    testimonial: {
      text: "従来の学習方法とは次元が違う。AIが私の弱点を正確に把握し、最適な学習順序を提案してくれるおかげで、3ヶ月でエンジニア転職を実現できました。",
      author: "田中 健太",
      role: "フロントエンドエンジニア",
      company: "株式会社テックイノベーション"
    },
    image: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-2xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">学習進捗ダッシュボード</h4>
            <div className="text-green-400 text-sm">🟢 学習中</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">JavaScript ES6</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-16 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-400 text-sm">85%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">React Hooks</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-12 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 text-sm">65%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">TypeScript</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-8 h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                </div>
                <span className="text-purple-400 text-sm">45%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">127</div>
            <div className="text-gray-400 text-sm">完了したレッスン</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400">98%</div>
            <div className="text-gray-400 text-sm">理解度スコア</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "実践プロジェクトで即戦力育成",
    subtitle: "🚀 OUTPUT",
    description: "学んだ知識を即座に実践で活用。企業の実課題を解決しながら、市場価値の高いポートフォリオを構築。理論だけでなく、実務で通用する真のスキルを身につけます。",
    benefits: [
      "企業連携リアルプロジェクト - 実際のビジネス課題に挑戦",
      "プロダクト開発全行程体験 - 企画からリリースまで完全習得",
      "コードレビュー＆フィードバック - 現役エンジニアによる徹底指導",
      "GitHub実績構築 - 採用担当者が注目するポートフォリオ作成",
      "プレゼンテーション技術 - 技術を伝える力も同時に向上"
    ],
    stats: [
      { number: "95%", label: "転職成功率" },
      { number: "50+", label: "実践プロジェクト" },
      { number: "企業連携", label: "リアル課題" }
    ],
    gradient: "from-green-500 to-emerald-600",
    testimonial: {
      text: "単なる学習ではなく、実際の企業プロジェクトに参加できたことで、転職面接で具体的な実績をアピールできました。おかげで希望していた企業から内定を獲得！",
      author: "佐藤 美咲",
      role: "デジタルマーケター",
      company: "株式会社グロースハッカー"
    },
    image: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-green-400/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">進行中プロジェクト</h4>
            <div className="text-orange-400 text-sm">🟡 開発中</div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">ECサイト リニューアル</span>
                <span className="text-green-400 text-sm">80% 完了</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">React + TypeScript でのモダンフロントエンド開発</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">TypeScript</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Node.js</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">マーケティング分析ツール</span>
                <span className="text-yellow-400 text-sm">60% 完了</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">データビジュアライゼーション & 分析システム</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">Python</span>
                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">D3.js</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-green-400">24</div>
            <div className="text-gray-400 text-xs">完了プロジェクト</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-blue-400">12</div>
            <div className="text-gray-400 text-xs">企業パートナー</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-purple-400">∞</div>
            <div className="text-gray-400 text-xs">成長可能性</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "エキスパートコミュニティで加速成長",
    subtitle: "👥 COMMUNITY",
    description: "業界トップクラスのエンジニアとマーケターが集う、ハイレベルな成長コミュニティ。単なる質問サイトではなく、共に高め合う真の仲間と出会い、キャリアを飛躍させます。",
    benefits: [
      "業界エキスパート直接指導 - 第一線で活躍するプロからの生きた知識",
      "24時間サポート体制 - 困った時にいつでも相談できる安心感",
      "ペアプログラミング - 実践的スキル向上と仲間との絆構築",
      "キャリア相談＆転職支援 - 専門カウンセラーによる個別サポート",
      "業界ネットワーキング - 将来のビジネスパートナーとの出会い"
    ],
    stats: [
      { number: "10,000+", label: "アクティブメンバー" },
      { number: "24/7", label: "サポート体制" },
      { number: "業界TOP", label: "専門家陣" }
    ],
    gradient: "from-purple-500 to-violet-600",
    testimonial: {
      text: "コミュニティで出会った仲間たちと一緒に起業しました。技術的なサポートだけでなく、ビジネス面でのアドバイスも得られる素晴らしい環境です。",
      author: "山田 拓也",
      role: "CTO & Co-Founder",
      company: "スタートアップ株式会社ネクスト"
    },
    image: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500/20 to-violet-600/20 rounded-2xl p-6 border border-purple-400/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">今日のコミュニティ活動</h4>
            <div className="text-green-400 text-sm">🟢 2,847人 オンライン</div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <div>
                  <span className="text-white font-medium">田中エキスパート</span>
                  <span className="text-purple-400 ml-2 text-xs">🏆 React専門家</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                「useCallbackとuseMemoの使い分けについて詳しく解説しました！」
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>👍 124</span>
                <span>💬 45</span>
                <span>📋 保存済み</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div>
                  <span className="text-white font-medium">佐藤マーケター</span>
                  <span className="text-green-400 ml-2 text-xs">🚀 成長ハッカー</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                「今日のペアプログラミングセッション、参加者募集中！」
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>👥 12人参加予定</span>
                <span>⏰ 20:00〜</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-1">156</div>
            <div className="text-gray-400 text-sm">今日の質問解決</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400 mb-1">89</div>
            <div className="text-gray-400 text-sm">アクティブセッション</div>
          </div>
        </div>
      </div>
    )
  }
];

interface FeaturesDetailedProps {
  className?: string;
}

export default function FeaturesDetailed({ className }: FeaturesDetailedProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className={`relative pt-8 pb-32 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={elementRef} className="text-center mb-24">
          <div 
            className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-gradient bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              💎 3つの成長エンジン
            </span>
          </div>
          
          <AnimatedText
            text="学び × アウトプット × コミュニティ"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
            effect="wave"
            staggerDelay={100}
          />
          
          <p 
            className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            従来の学習プラットフォームの常識を覆す、革新的な3つの柱。
            <br className="hidden md:block" />
            これらが融合することで、あなたの成長速度は<span className="text-yellow-300 font-semibold">10倍加速</span>します。
          </p>
        </div>

        {/* Features */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <DetailedFeature
              key={index}
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              benefits={feature.benefits}
              stats={feature.stats}
              image={feature.image}
              reversed={index % 2 === 1}
              gradient={feature.gradient}
              testimonial={feature.testimonial}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-32 pt-16 border-t border-white/10">
          <div 
            className={`transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              あなたの成長ストーリーを始めよう
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              10,000人以上が実証した成長メソッド。
              <br />
              今日から、あなたも限界を超える学習体験を始めませんか？
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <div className="mr-3">
                    <Icons.Rocket />
                  </div>
                  今すぐ無料で革命を体験
                  <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Icons.Check />
                <span>完全無料で30日間</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.Check />
                <span>クレジットカード不要</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.Check />
                <span>今すぐアクセス</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}