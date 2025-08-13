'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

export interface OnboardingData {
  age: string
  occupation: string
  purpose: string[]
  goals: string
}

const purposeOptions = [
  { id: 'skill-up', label: 'スキルアップ', emoji: '📈', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 'career-change', label: '転職・キャリアチェンジ', emoji: '🚀', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
  { id: 'side-business', label: '副業・フリーランス', emoji: '💼', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  { id: 'knowledge', label: '知識習得', emoji: '📚', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
  { id: 'networking', label: 'ネットワーキング', emoji: '🤝', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400' },
  { id: 'teaching', label: '教える・共有', emoji: '🎓', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400' },
  { id: 'hobby', label: '趣味・興味', emoji: '🎨', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
  { id: 'startup', label: '起業・事業立ち上げ', emoji: '⚡', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' }
]

const occupationOptions = [
  'エンジニア・プログラマー',
  'デザイナー',
  'マーケティング・営業',
  '企画・プロダクトマネージャー',
  'データサイエンティスト',
  'コンサルタント',
  '学生',
  'フリーランス',
  '経営者・役員',
  'その他'
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    age: '',
    occupation: '',
    purpose: [],
    goals: ''
  })

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePurposeToggle = (purposeId: string) => {
    setData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(purposeId)
        ? prev.purpose.filter(id => id !== purposeId)
        : [...prev.purpose, purposeId]
    }))
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // オンボーディングデータを保存
      localStorage.setItem('onboardingCompleted', 'true')
      localStorage.setItem('userProfile', JSON.stringify(data))
      
      // 初回ログインフラグを更新
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}')
      
      if (user.email) {
        localStorage.setItem('user', JSON.stringify({
          ...user,
          isFirstLogin: false
        }))
      }
      
      if (registeredUser.email) {
        localStorage.setItem('registeredUser', JSON.stringify({
          ...registeredUser,
          isFirstLogin: false
        }))
      }
      
      // 少し待ってからHome画面に遷移
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/')
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return data.age !== ''
      case 2: return data.occupation !== ''
      case 3: return data.purpose.length > 0
      case 4: return data.goals.trim() !== ''
      default: return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎂</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              年齢を教えてください
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              より良い学習体験を提供するために使用します
            </p>
            <div className="max-w-xs mx-auto">
              <select
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">選択してください</option>
                <option value="18-22">18-22歳</option>
                <option value="23-27">23-27歳</option>
                <option value="28-32">28-32歳</option>
                <option value="33-37">33-37歳</option>
                <option value="38-42">38-42歳</option>
                <option value="43-47">43-47歳</option>
                <option value="48+">48歳以上</option>
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">💼</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              現在のお仕事は？
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              あなたに最適なコンテンツをおすすめします
            </p>
            <div className="max-w-sm mx-auto">
              <select
                value={data.occupation}
                onChange={(e) => setData({ ...data, occupation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">選択してください</option>
                {occupationOptions.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              アプリの利用目的は？
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              複数選択可能です（最低1つ選択してください）
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {purposeOptions.map((purpose) => (
                <button
                  key={purpose.id}
                  onClick={() => handlePurposeToggle(purpose.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    data.purpose.includes(purpose.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-2xl">{purpose.emoji}</span>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${purpose.color}`}>
                    {purpose.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              あなたの目標を教えてください
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              具体的な目標があるとより効果的な学習ができます
            </p>
            <div className="max-w-lg mx-auto">
              <textarea
                value={data.goals}
                onChange={(e) => setData({ ...data, goals: e.target.value })}
                placeholder="例：3ヶ月でReactをマスターして転職したい、副業でWebサイト制作を始めたい、データ分析スキルを身につけて業務効率を上げたい..."
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-left">
                {data.goals.length}/500文字
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            プロフィールを設定中...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            あなた専用の学習環境を準備しています
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechKnot
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            はじめまして！
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            あなたに最適な学習体験を提供するため、いくつかの質問にお答えください
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ステップ {step} / {totalSteps}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            {renderStep()}
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.ArrowLeft />
              <span className="ml-2">戻る</span>
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span>次へ</span>
                <Icons.ArrowRight />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Icons.Check />
                <span className="ml-2">完了</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}