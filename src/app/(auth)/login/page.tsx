'use client'

import React, { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import AnimatedText from '@/components/effects/AnimatedText'
import GoogleLoginButton from './components/GoogleLoginButton'

// ⚠️ Demo-only hash helper (base64). Never store plaintext in production.
const hash = (str: string) => {
  try {
    return typeof window !== 'undefined' ? btoa(str) : str
  } catch {
    return str
  }
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Google認証エラーハンドラー
  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // 簡単なバリデーション
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください')
      setIsLoading(false)
      return
    }

    // ログイン処理のシミュレーション
    setTimeout(() => {
      const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}')

      // 入力情報と保存データを比較
      if (
        registeredUser.email === email &&
        registeredUser.passwordHash === hash(password)
      ) {
        // ユーザー情報を保存
        localStorage.setItem(
          'user',
          JSON.stringify({
            email,
            name: registeredUser.name || 'ユーザー',
          }),
        )
        localStorage.setItem('authToken', 'mock-token')

        // Home へ遷移
        router.push('/')
      } else {
        setError('メールアドレスまたはパスワードが正しくありません')
      }
      setIsLoading(false)
    }, 2000)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
        
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl">
              <Icons.Users />
            </div>
            
            <AnimatedText
              text="おかえりなさい"
              className="text-3xl font-black mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              effect="wave"
              staggerDelay={80}
            />
            
            <p className="text-white/80 text-sm leading-relaxed">
              学習コミュニティに再び参加しましょう。<br />
              <span className="text-indigo-300 font-semibold">新しい発見</span>があなたを待っています
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-black/50 focus:shadow-lg focus:shadow-indigo-400/25"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-white/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="relative w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl bg-black/30 text-white transition-all duration-300 backdrop-blur-sm placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-black/50 focus:shadow-lg focus:shadow-indigo-400/25"
                />
                {/* Toggle visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.05.164-2.061.467-3.012m3.11-3.11A9.962 9.962 0 0112 3c5.523 0 10 4.477 10 10 0 1.05-.164 2.06-.468 3.012M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.271 4.271l15.458 15.458M9.88 9.88a3 3 0 104.242 4.242M6.51 6.508A9.977 9.977 0 002 12c0 5.523 4.477 10 10 10a9.977 9.977 0 005.492-1.51M17.49 17.492A9.977 9.977 0 0022 12c0-5.523-4.477-10-10-10a9.977 9.977 0 00-5.492 1.51" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/resetpassword"
                className="text-indigo-300 text-sm hover:text-indigo-200 transition-colors duration-300"
              >
                パスワードをお忘れですか？
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  <span className="ml-2">ログイン中...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="ml-2">ログイン</span>
                </>
              )}
            </button>

            {/* Quick Login Options */}
            <div className="flex justify-center items-center space-x-6 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Icons.Check />
                <span>安全な接続</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icons.Check />
                <span>暗号化済み</span>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white font-medium">
                または
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <GoogleLoginButton 
            className="mb-6 bg-white hover:bg-gray-50 text-gray-900 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-300"
            onError={handleGoogleError}
          />

          {/* Register Link */}
          <div className="text-center space-y-4">
            <Link
              href="/register"
              className="inline-block w-full"
            >
              <button className="w-full bg-white/5 border border-white/30 text-white hover:bg-white/10 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <Icons.Rocket />
                <span className="ml-2">アカウントを作成</span>
              </button>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center text-white/60 text-sm transition-all duration-300 hover:text-indigo-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>ホームに戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage