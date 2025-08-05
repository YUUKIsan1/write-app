'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import MagneticButton from '@/components/effects/MagneticButton'
import AnimatedText from '@/components/effects/AnimatedText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const contactMethods = [
  {
    icon: <Icons.Brain />,
    title: "AIチャットサポート",
    description: "24時間365日、AIアシスタントが即座に回答",
    response: "即座",
    availability: "24/7",
    action: "チャット開始",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: <Icons.Users />,
    title: "専門コンサルタント",
    description: "業界エキスパートによる個別カウンセリング",
    response: "1時間以内",
    availability: "平日 9:00-21:00",
    action: "予約する",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: <Icons.Play />,
    title: "ライブデモセッション",
    description: "プラットフォーム機能の詳細デモンストレーション",
    response: "希望日時",
    availability: "毎日開催",
    action: "デモ予約",
    gradient: "from-purple-500 to-violet-600"
  }
];

const faqs = [
  {
    question: "未経験でも本当に転職できますか？",
    answer: "はい、95%の未経験者が3-6ヶ月で転職成功しています。AI個別学習プランと実践プロジェクト、専門家サポートにより、確実にスキルを身につけられます。"
  },
  {
    question: "学習時間はどのくらい必要ですか？",
    answer: "平日2-3時間、週末4-5時間程度が目安です。AIが効率的な学習順序を提案するため、従来の学習方法の3分の1の時間で同等のスキルを習得できます。"
  },
  {
    question: "サポート体制はどうなっていますか？",
    answer: "24/7のAIサポートに加え、専門エンジニア・マーケターによる直接指導、コミュニティでのピアサポートなど、多層的なサポート体制を提供しています。"
  },
  {
    question: "返金保証の条件を教えてください",
    answer: "30日以内であれば、理由を問わず100%返金いたします。質問や手続きも最小限で、1-3営業日以内に返金処理を完了します。"
  }
];

export default function Contact() {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'general'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="relative pt-20 pb-32 bg-gradient-to-b from-gray-800 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={elementRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div 
            className={`inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-500 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-green-300">🤝 いつでもサポート</span>
          </div>
          
          <AnimatedText
            text="あなたの成功を全力でサポート"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            effect="wave"
            staggerDelay={50}
          />
          
          <p 
            className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-500 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            疑問、不安、相談したいこと。何でもお気軽にお聞かせください。
            <br />
            専門チームが<span className="text-yellow-300 font-semibold">あなたの成功まで</span>伴走します。
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div className={`relative h-full p-8 bg-gradient-to-br ${method.gradient} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer group`}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{method.title}</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">{method.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">応答時間</span>
                      <span className="text-white font-semibold">{method.response}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">対応時間</span>
                      <span className="text-white font-semibold">{method.availability}</span>
                    </div>
                  </div>
                  
                  <MagneticButton
                    variant="outline"
                    size="lg"
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                    strength={0.2}
                  >
                    {method.action}
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div 
            className={`transition-all duration-700 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">💬 個別相談フォーム</h3>
              <p className="text-gray-300 mb-8">
                具体的な質問やご相談内容をお聞かせください。専門コンサルタントが24時間以内に詳細な回答をお送りします。
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">お名前 *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">メールアドレス *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">会社名（任意）</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="株式会社〇〇"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">お問い合わせ内容 *</label>
                  <select
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors mb-4"
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  >
                    <option value="general">一般的な質問</option>
                    <option value="pricing">料金について</option>
                    <option value="demo">デモ・体験について</option>
                    <option value="enterprise">企業導入について</option>
                    <option value="support">サポートについて</option>
                  </select>
                  
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="具体的な質問内容やご相談事項をお聞かせください..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <MagneticButton
                  variant="gradient"
                  size="lg"
                  className="w-full py-4 text-lg font-semibold"
                  strength={0.3}
                >
                  <Icons.ArrowRight />
                  <span className="ml-2">送信する</span>
                </MagneticButton>
                
                <p className="text-gray-400 text-sm text-center">
                  送信後24時間以内に専門コンサルタントからご連絡いたします
                </p>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div 
            className={`transition-all duration-700 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">❓ よくある質問</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-white font-semibold pr-4">{faq.question}</span>
                    <div className={`transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}>
                      <Icons.ArrowRight className="w-5 h-5 text-white rotate-90" />
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-400/30">
              <h4 className="text-white font-bold mb-2">💡 さらに詳しく知りたい方へ</h4>
              <p className="text-gray-300 mb-4">
                個別のご相談や詳細なデモンストレーションをご希望の方は、
                専門コンサルタントとの1対1セッションをお申し込みください。
              </p>
              <MagneticButton
                variant="gradient"
                size="lg"
                className="w-full"
                strength={0.2}
              >
                <Icons.Users />
                <span className="ml-2">個別相談を予約</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div 
          className={`mt-20 text-center transition-all duration-700 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="bg-red-600/10 border border-red-400/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-4xl">🚨</div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">緊急サポート</h4>
                <p className="text-gray-300">
                  技術的な問題や緊急の相談事項がある場合：
                  <span className="text-red-400 font-semibold ml-2">support@learnhub.ai</span>
                  <br />
                  通常1時間以内に対応いたします
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}