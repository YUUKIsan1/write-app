'use client'

import React, { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import MagneticButton from '@/components/effects/MagneticButton'
import AnimatedText from '@/components/effects/AnimatedText'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // パスワード確認
    if (password !== confirmPassword) {
      setError('パスワードが一致しません')
      setIsLoading(false)
      return
    }

    // 新規登録処理のシミュレーション
    setTimeout(() => {
      if (email && password && name) {
        setStep(2) // 成功画面に移行
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleContinue = () => {
    router.push('/onboarding')
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-pulse">
                <Icons.Check />
              </div>
              
              <AnimatedText
                text="アカウント作成完了！"
                className="text-3xl font-black mb-4 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
                effect="wave"
                staggerDelay={80}
              />
              
              <p className="text-white/80 mb-2">
                ようこそ、<span className="text-blue-300 font-semibold">{name}</span>さん！
              </p>
              <p className="text-white/60 text-sm mb-8">
                あなたの学習の旅がいよいよ始まります。<br />
                AI駆動の個別学習プランで、理想のキャリアを実現しましょう。
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Icons.Brain />
                </div>
                <span className="text-white/80">AI個別学習プランが自動生成されました</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Icons.Users />
                </div>
                <span className="text-white/80">10,000+ のコミュニティにアクセス可能</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Icons.Rocket />
                </div>
                <span className="text-white/80">実践プロジェクトがスタンバイ中</span>
              </div>
            </div>

            <MagneticButton
              variant="gradient"
              size="lg"
              className="w-full mb-4"
              onClick={handleContinue}
              strength={0.3}
            >
              <Icons.ArrowRight />
              <span className="ml-2">学習を開始</span>
            </MagneticButton>

            <p className="text-white/50 text-xs">
              確認メールを送信しました。メールボックスをご確認ください。
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
        
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl">
              <Icons.Rocket />
            </div>
            
            <AnimatedText
              text="無料で革命を体験"
              className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              effect="wave"
              staggerDelay={80}
            />
            
            <p className="text-white/80 text-sm leading-relaxed">
              30日間完全無料。クレジットカード不要。<br />
              <span className="text-cyan-300 font-semibold">TechKnot</span>で<span className="text-blue-300 font-semibold">技術への情熱が人をつなぐ</span>体験を
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <Icons.User />
                </div>
                <input
                  type="text"
                  placeholder="お名前"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-black/50 focus:shadow-lg focus:shadow-blue-400/25"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <Icons.Mail />
                </div>
                <input
                  type="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-black/50 focus:shadow-lg focus:shadow-blue-400/25"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <Icons.Lock />
                </div>
                <input
                  type="password"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-black/50 focus:shadow-lg focus:shadow-blue-400/25"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <Icons.Lock />
                </div>
                <input
                  type="password"
                  placeholder="パスワード（確認）"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-black/50 focus:shadow-lg focus:shadow-blue-400/25"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3">
                <Icons.AlertCircle />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  <span className="ml-2">アカウント作成中...</span>
                </>
              ) : (
                <>
                  <Icons.Rocket />
                  <span className="ml-2">無料で革命を体験</span>
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-6 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Icons.Check />
                <span>30日間無料</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.Check />
                <span>カード不要</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.Check />
                <span>即座にアクセス</span>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-white font-medium">
                または
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center space-y-4">
            <Link
              href="/login"
              className="inline-block"
            >
              <MagneticButton
                variant="outline"
                size="lg"
                className="w-full bg-white/5 border-white/30 text-white hover:bg-white/10"
                strength={0.2}
              >
                <Icons.LogIn />
                <span className="ml-2">既にアカウントをお持ちですか？</span>
              </MagneticButton>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center text-white/60 text-sm transition-all duration-300 hover:text-blue-300"
            >
              <Icons.ArrowLeft />
              <span className="ml-2">ホームに戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage