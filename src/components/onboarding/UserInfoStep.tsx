'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import { OnboardingData } from '@/app/(onboarding)/onboarding/page'

interface UserInfoStepProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  canGoBack: boolean
}

const ageOptions = [
  { value: '10s', label: '10代' },
  { value: '20s-early', label: '20代前半' },
  { value: '20s-late', label: '20代後半' },
  { value: '30s-early', label: '30代前半' },
  { value: '30s-late', label: '30代後半～' }
]

const industryOptions = [
  { value: 'engineer', label: 'エンジニア' },
  { value: 'marketer', label: 'マーケター' },
  { value: 'designer', label: 'デザイナー' },
  { value: 'other', label: 'その他' }
]

const purposeOptions = [
  { value: 'value-creation', label: '価値提供', icon: '💎' },
  { value: 'skill-acquisition', label: 'スキル習得', icon: '🚀' },
  { value: 'information-gathering', label: '情報収集', icon: '📚' },
  { value: 'networking', label: '横とのつながり', icon: '🤝' }
]

const engineerGoals = [
  { value: 'solve-problems', label: '技術的な問題を解決したい' },
  { value: 'share-projects', label: 'プロジェクトやコードを共有したい' },
  { value: 'learn-technology', label: '新しい技術を学びたい' },
  { value: 'follow-trends', label: '業界のトレンドを追いかけたい' }
]

const marketerGoals = [
  { value: 'learn-strategy', label: '新しいマーケティング戦略を学びたい' },
  { value: 'analyze-cases', label: '成功事例を分析したい' },
  { value: 'connect-marketers', label: '他のマーケターと交流したい' },
  { value: 'promote-activities', label: '自身の活動を広めたい' }
]

export default function UserInfoStep({ data, onNext, onBack, canGoBack }: UserInfoStepProps) {
  const [age, setAge] = useState(data.age || '')
  const [industry, setIndustry] = useState(data.industry || '')
  const [customIndustry, setCustomIndustry] = useState(data.customIndustry || '')
  const [purpose, setPurpose] = useState<string[]>(data.purpose || [])
  const [goals, setGoals] = useState<string[]>(data.goals || [])

  const handlePurposeToggle = (value: string) => {
    setPurpose(prev => 
      prev.includes(value) 
        ? prev.filter(p => p !== value)
        : [...prev, value]
    )
  }

  const handleGoalToggle = (value: string) => {
    setGoals(prev => 
      prev.includes(value) 
        ? prev.filter(g => g !== value)
        : [...prev, value]
    )
  }

  const handleNext = () => {
    if (age && industry && purpose.length > 0 && (goals.length > 0 || industry === 'other')) {
      onNext({
        age,
        industry,
        customIndustry: industry === 'other' ? customIndustry : '',
        purpose,
        goals
      })
    }
  }

  const isValid = age && industry && purpose.length > 0 && 
    (industry === 'other' ? customIndustry.trim() : true) &&
    (industry === 'other' || goals.length > 0)

  const currentGoals = industry === 'engineer' ? engineerGoals : 
                      industry === 'marketer' ? marketerGoals : []

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl">
            <Icons.User className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
            あなたについて教えてください
          </h2>
          
          <p className="text-xl text-white/70">
            より良い学習体験を提供するために、いくつか質問させてください
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Age Selection */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">1</span>
              年代をお選びください
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {ageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAge(option.value)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    age === option.value
                      ? 'border-blue-400 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/25'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Selection */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">2</span>
              業界をお選びください
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {industryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setIndustry(option.value)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    industry === option.value
                      ? 'border-green-400 bg-green-500/20 text-green-300 shadow-lg shadow-green-500/25'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Custom Industry Input */}
            {industry === 'other' && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="職種を入力してください"
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors duration-300"
                />
              </div>
            )}
          </div>

          {/* Purpose Selection */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">3</span>
              目的をお選びください（複数選択可）
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {purposeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePurposeToggle(option.value)}
                  className={`group p-6 rounded-xl border transition-all duration-300 text-left ${
                    purpose.includes(option.value)
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className={`font-medium ${
                      purpose.includes(option.value) ? 'text-purple-300' : 'text-white/80'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          {(industry === 'engineer' || industry === 'marketer') && (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">4</span>
                {industry === 'engineer' ? 'エンジニアとしての' : 'マーケターとしての'}目標（複数選択可）
              </h3>
              
              <div className="space-y-3">
                {currentGoals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => handleGoalToggle(goal.value)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                      goals.includes(goal.value)
                        ? 'border-orange-400 bg-orange-500/20 text-orange-300 shadow-lg shadow-orange-500/25'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        goals.includes(goal.value) 
                          ? 'border-orange-400 bg-orange-400' 
                          : 'border-white/40'
                      }`}>
                        {goals.includes(goal.value) && (
                          <Icons.Check className="w-2 h-2 text-white" />
                        )}
                      </div>
                      <span>{goal.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
              canGoBack 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-white/40 cursor-not-allowed'
            }`}
          >
            <Icons.ArrowLeft className="w-5 h-5 mr-2" />
            戻る
          </button>

          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isValid
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            次へ
            <Icons.ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}