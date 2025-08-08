'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WelcomeStep from '@/components/onboarding/WelcomeStep'
import UserInfoStep from '@/components/onboarding/UserInfoStep'
import InterestsStep from '@/components/onboarding/InterestsStep'
import CompletionStep from '@/components/onboarding/CompletionStep'

export interface OnboardingData {
  age?: string
  industry?: string
  customIndustry?: string
  purpose?: string[]
  goals?: string[]
  interests?: string[]
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({})
  const router = useRouter()

  const steps = [
    { component: WelcomeStep, title: 'ようこそ', subtitle: 'TechKnotへようこそ！' },
    { component: UserInfoStep, title: 'プロフィール', subtitle: 'あなたについて教えてください' },
    { component: InterestsStep, title: '興味・関心', subtitle: 'トピックを登録してフィードを構築しましょう' },
    { component: CompletionStep, title: '完了', subtitle: 'セットアップが完了しました！' }
  ]

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }))
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    // オンボーディングデータをローカルストレージに保存（実際の実装では API に送信）
    localStorage.setItem('onboardingData', JSON.stringify(data))
    localStorage.setItem('onboardingCompleted', 'true')
    
    // ダッシュボードに移行
    router.push('/dashboard')
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="h-1 bg-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step Indicator */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-white/80">
            <div>
              <div className="text-sm font-medium">{steps[currentStep].title}</div>
              <div className="text-xs text-white/60">{steps[currentStep].subtitle}</div>
            </div>
            <div className="text-sm">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        <CurrentStepComponent
          data={data}
          onNext={handleNext}
          onBack={handleBack}
          onComplete={handleComplete}
          canGoBack={currentStep > 0}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
    </div>
  )
}