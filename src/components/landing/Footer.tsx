'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import AnimatedText from '@/components/effects/AnimatedText'

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)
  const [emailSubscribe, setEmailSubscribe] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', color: 'from-blue-400 to-cyan-400', bgColor: 'hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500' },
    { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-indigo-600', bgColor: 'hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600' },
    { name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-500', bgColor: 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500' },
    { name: 'YouTube', icon: '📺', color: 'from-red-500 to-pink-500', bgColor: 'hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500' }
  ]

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailSubscribe) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmailSubscribe('')
    }
  }

  return (
    <footer className={`relative bg-gradient-to-b from-gray-900 via-slate-900 to-black text-white overflow-hidden ${className}`}>
      {/* 魅力的な背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* 動的パーティクル */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* プレミアムヘッダーセクション */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20">
            <span className="text-cyan-300">✨ 限界を超える学習体験</span>
          </div>
          
          <AnimatedText
            text="未来への扉を開こう"
            className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={80}
          />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            最先端のAIと実践的な学習で、あなたの可能性を無限大に広げる
          </p>
        </div>

        {/* メインフッターコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* 企業情報 - 革命的デザイン */}
          <div className="lg:col-span-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-black text-xl">L</span>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">LearnHub</span>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed">
                <span className="text-cyan-300 font-semibold">10,000人以上</span>が選んだ<br />
                次世代学習プラットフォーム。<br />
                <span className="text-purple-300 font-semibold">あなたの限界</span>を超えましょう。
              </p>
              
              {/* ソーシャルリンク - 超プレミアム */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${social.color} rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500`}></div>
                    <a 
                      href="#" 
                      className={`relative w-12 h-12 bg-gradient-to-br from-slate-800 to-gray-900 ${social.bgColor} rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 border border-white/10 group-hover:border-white/30`}
                    >
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">{social.icon}</span>
                      {hoveredSocial === index && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 学習コース - 魅力的デザイン */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent flex items-center">
              <div className="w-6 h-6 mr-2 text-cyan-400">
                <Icons.Brain />
              </div>
              学習コース
            </h3>
            <ul className="space-y-4">
              {['プログラミング', 'デジタルマーケティング', 'データ分析', 'AI・機械学習', 'プロダクトマネジメント'].map((course, index) => (
                <li key={index} className="group/item">
                  <a href="#" className="flex items-center text-gray-300 hover:text-cyan-300 transition-all duration-300 group-hover/item:translate-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300"></div>
                    {course}
                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <div className="w-4 h-4 text-cyan-400">
                        <Icons.ArrowRight />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* コミュニティ - インタラクティブデザイン */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center">
              <div className="w-6 h-6 mr-2 text-purple-400">
                <Icons.Users />
              </div>
              コミュニティ
            </h3>
            <ul className="space-y-4">
              {['コミュニティ参加', 'イベント情報', 'メンタリング', '転職支援', 'ブログ'].map((item, index) => (
                <li key={index} className="group/item">
                  <a href="#" className="flex items-center text-gray-300 hover:text-purple-300 transition-all duration-300 group-hover/item:translate-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300"></div>
                    {item}
                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <div className="w-4 h-4 text-purple-400">
                        <Icons.ArrowRight />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート - プレミアムデザイン */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent flex items-center">
              <div className="w-6 h-6 mr-2 text-green-400">
                <Icons.Award />
              </div>
              サポート
            </h3>
            <ul className="space-y-4">
              {['ヘルプセンター', 'お問い合わせ', 'よくある質問', '利用規約', 'プライバシーポリシー'].map((item, index) => (
                <li key={index} className="group/item">
                  <a href="#" className="flex items-center text-gray-300 hover:text-green-300 transition-all duration-300 group-hover/item:translate-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300"></div>
                    {item}
                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <div className="w-4 h-4 text-green-400">
                        <Icons.ArrowRight />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 革命的ニュースレター登録 */}
        <div className="relative mb-16">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full text-sm font-medium mb-6 border border-cyan-300/20">
                <span className="text-cyan-300">🚀 限定情報をお届け</span>
              </div>
              
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                最新アップデートを見逃すな
              </h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                新機能・特別イベント・限定オファーを<br />
                <span className="text-cyan-300 font-semibold">いち早く</span>お届けします
              </p>
            </div>
            
            <form onSubmit={handleEmailSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                <input 
                  type="email" 
                  placeholder="メールアドレスを入力"
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  className="relative w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 backdrop-blur-xl transition-all duration-300 focus:bg-white/20"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubscribed}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-70"
              >
                {isSubscribed ? '✓ 登録完了!' : '🚀 登録する'}
              </button>
            </form>
            
            {isSubscribed && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                <p className="text-green-300 font-semibold">🎉 ご登録ありがとうございます！</p>
              </div>
            )}
          </div>
        </div>

        {/* スタイリッシュ連絡先情報 */}
        <div className="border-t border-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📧', title: 'メール', value: 'info@learnhub.jp', color: 'from-cyan-400 to-blue-400' },
              { icon: '📞', title: '電話', value: '03-1234-5678', color: 'from-blue-400 to-purple-400' },
              { icon: '📍', title: '住所', value: '東京都渋谷区道玄坂1-1-1', color: 'from-purple-400 to-pink-400' }
            ].map((contact, index) => (
              <div key={index} className="group text-center md:text-left">
                <div className="relative inline-block mb-4">
                  <div className={`absolute -inset-2 bg-gradient-to-r ${contact.color} rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500`}></div>
                  <div className="relative w-16 h-16 mx-auto md:mx-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                </div>
                <h4 className={`font-bold text-lg mb-3 bg-gradient-to-r ${contact.color} bg-clip-text text-transparent`}>
                  {contact.title}
                </h4>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                  {contact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 最終CTA */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full text-lg font-bold mb-6 border border-yellow-400/30">
            <span className="text-yellow-300">🔥 今すぐ始めよう</span>
          </div>
          
          <p className="text-2xl font-bold text-gray-200 mb-8 max-w-2xl mx-auto">
            <span className="text-yellow-300">10,000人以上</span>が選んだ学習プラットフォームで<br />
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">あなたも今日から成長を</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center">
                <div className="w-6 h-6 mr-3">
                  <Icons.Rocket />
                </div>
                無料で始める
                <div className="ml-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
            </button>
            
            <button className="group px-12 py-6 bg-white/5 border-2 border-white/20 backdrop-blur-xl text-white text-xl font-bold rounded-2xl hover:bg-white/10 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105">
              <span className="flex items-center">
                <div className="w-6 h-6 mr-3 text-cyan-400">
                  <Icons.Play />
                </div>
                デモを見る
              </span>
            </button>
          </div>
        </div>

        {/* 革命的ボトムセクション */}
        <div className="border-t border-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-gray-300 text-lg mb-2">
                © 2024 <span className="font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">LearnHub Inc.</span> All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                🚀 限界を超える学習体験を提供し続けます
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              {['利用規約', 'プライバシーポリシー', '特定商取引法', 'Cookie ポリシー'].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:translate-y-1 relative group"
                >
                  {link}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>
          
          {/* 最後のスパークル */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              🌟 Made with ❤️ in Tokyo by the LearnHub Team
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse opacity-60"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}