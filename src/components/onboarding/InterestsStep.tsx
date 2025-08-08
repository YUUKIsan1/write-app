'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import { OnboardingData } from '@/app/(onboarding)/onboarding/page'

interface InterestsStepProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
  canGoBack: boolean
}

const engineerTags = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨', popular: true },
  { value: 'python', label: 'Python', icon: '🐍', popular: true },
  { value: 'react', label: 'React', icon: '⚛️', popular: true },
  { value: 'nodejs', label: 'Node.js', icon: '🟢', popular: false },
  { value: 'typescript', label: 'TypeScript', icon: '🟦', popular: true },
  { value: 'cloud-computing', label: 'クラウドコンピューティング', icon: '☁️', popular: true },
  { value: 'devops', label: 'DevOps', icon: '⚙️', popular: true },
  { value: 'ai-ml', label: 'AI/ML', icon: '🤖', popular: true },
  { value: 'docker', label: 'Docker', icon: '🐳', popular: false },
  { value: 'kubernetes', label: 'Kubernetes', icon: '☸️', popular: false },
  { value: 'aws', label: 'AWS', icon: '🟠', popular: false },
  { value: 'firebase', label: 'Firebase', icon: '🔥', popular: false },
  { value: 'graphql', label: 'GraphQL', icon: '💜', popular: false },
  { value: 'mongodb', label: 'MongoDB', icon: '🍃', popular: false },
  { value: 'vue', label: 'Vue.js', icon: '💚', popular: false },
  { value: 'angular', label: 'Angular', icon: '🅰️', popular: false }
]

const marketerTags = [
  { value: 'seo', label: 'SEO', icon: '🔍', popular: true },
  { value: 'content-marketing', label: 'コンテンツマーケティング', icon: '📝', popular: true },
  { value: 'ppc-ads', label: 'PPC広告', icon: '💰', popular: true },
  { value: 'social-media', label: 'ソーシャルメディア', icon: '📱', popular: true },
  { value: 'marketing-analytics', label: 'マーケティング分析', icon: '📊', popular: true },
  { value: 'email-marketing', label: 'メールマーケティング', icon: '📧', popular: false },
  { value: 'conversion-optimization', label: 'コンバージョン最適化', icon: '📈', popular: false },
  { value: 'brand-strategy', label: 'ブランド戦略', icon: '🎯', popular: false },
  { value: 'marketing-automation', label: 'マーケティング自動化', icon: '🤖', popular: false },
  { value: 'growth-hacking', label: 'グロースハッキング', icon: '🚀', popular: false },
  { value: 'influencer-marketing', label: 'インフルエンサーマーケティング', icon: '👑', popular: false },
  { value: 'video-marketing', label: '動画マーケティング', icon: '🎥', popular: false },
  { value: 'affiliate-marketing', label: 'アフィリエイトマーケティング', icon: '🤝', popular: false },
  { value: 'crm', label: 'CRM', icon: '👥', popular: false },
  { value: 'market-research', label: '市場調査', icon: '🔬', popular: false }
]

const generalTags = [
  { value: 'web-design', label: 'Webデザイン', icon: '🎨', popular: true },
  { value: 'ui-ux', label: 'UI/UX', icon: '📱', popular: true },
  { value: 'project-management', label: 'プロジェクト管理', icon: '📋', popular: false },
  { value: 'startup', label: 'スタートアップ', icon: '🚀', popular: false },
  { value: 'freelancing', label: 'フリーランス', icon: '💼', popular: false },
  { value: 'career-development', label: 'キャリア開発', icon: '📈', popular: false }
]

export default function InterestsStep({ data, onNext, onBack, canGoBack }: InterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || [])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTags, setFilteredTags] = useState<typeof engineerTags>([])

  // Get available tags based on industry
  const getAvailableTags = () => {
    const industry = data.industry
    let baseTags = []
    
    if (industry === 'engineer') {
      baseTags = engineerTags
    } else if (industry === 'marketer') {
      baseTags = marketerTags
    } else {
      baseTags = [...engineerTags.slice(0, 8), ...marketerTags.slice(0, 8)]
    }
    
    return [...baseTags, ...generalTags]
  }

  useEffect(() => {
    const availableTags = getAvailableTags()
    const filtered = availableTags.filter(tag =>
      tag.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTags(filtered)
  }, [searchQuery, data.industry])

  const handleInterestToggle = (value: string) => {
    setSelectedInterests(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    )
  }

  const handleNext = () => {
    if (selectedInterests.length >= 3) {
      onNext({ interests: selectedInterests })
    }
  }

  const popularTags = filteredTags.filter(tag => tag.popular)
  const otherTags = filteredTags.filter(tag => !tag.popular)

  const isValid = selectedInterests.length >= 3

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl">
            <Icons.Heart className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            トピックを登録して、あなたのフィードを構築しましょう
          </h2>
          
          <p className="text-xl text-white/70 mb-2">
            興味のある分野を選択して、パーソナライズされたコンテンツを受け取りましょう
          </p>
          
          <p className="text-white/50 text-sm">
            最低3つ以上お選びください（{selectedInterests.length}/3+ 選択済み）
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="興味のあるトピックを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-xl"
            />
          </div>
        </div>

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-400/20 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
              <Icons.Check className="w-5 h-5 mr-2" />
              選択済みトピック ({selectedInterests.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => {
                const tag = getAvailableTags().find(t => t.value === interest)
                return tag ? (
                  <span
                    key={interest}
                    className="inline-flex items-center px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-400/30"
                  >
                    <span className="mr-2">{tag.icon}</span>
                    {tag.label}
                  </span>
                ) : null
              })}
            </div>
          </div>
        )}

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-sm mr-3">
                ⭐
              </span>
              人気のトピック
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularTags.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => handleInterestToggle(tag.value)}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                    selectedInterests.includes(tag.value)
                      ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/25 scale-105'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{tag.icon}</span>
                    <span className={`text-sm font-medium text-center leading-tight ${
                      selectedInterests.includes(tag.value) ? 'text-cyan-300' : 'text-white/80'
                    }`}>
                      {tag.label}
                    </span>
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedInterests.includes(tag.value) && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icons.Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Popular Badge */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">🔥</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Other Tags */}
        {otherTags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-sm mr-3">
                📚
              </span>
              その他のトピック
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherTags.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => handleInterestToggle(tag.value)}
                  className={`group relative p-4 rounded-xl border transition-all duration-300 ${
                    selectedInterests.includes(tag.value)
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25 scale-105'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{tag.icon}</span>
                    <span className={`text-sm font-medium text-center leading-tight ${
                      selectedInterests.includes(tag.value) ? 'text-purple-300' : 'text-white/80'
                    }`}>
                      {tag.label}
                    </span>
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedInterests.includes(tag.value) && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icons.Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTags.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Icons.Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">検索結果が見つかりません</h3>
            <p className="text-gray-500">
              「{searchQuery}」に関連するトピックが見つかりませんでした。
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-white/10 text-white/80 rounded-xl hover:bg-white/20 transition-colors duration-300"
            >
              検索をクリア
            </button>
          </div>
        )}

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

          <div className="flex items-center space-x-4">
            <span className={`text-sm ${isValid ? 'text-green-400' : 'text-white/50'}`}>
              {selectedInterests.length >= 3 ? '✓ 準備完了' : `あと${3 - selectedInterests.length}つ選択してください`}
            </span>
            
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isValid
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              次へ
              <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}