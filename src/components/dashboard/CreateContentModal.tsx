'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

interface CreateContentModalProps {
  isOpen: boolean
  onClose: () => void
}

type ContentType = 'memo' | 'article' | 'book'

export default function CreateContentModal({ isOpen, onClose }: CreateContentModalProps) {
  const router = useRouter()

  const handleContentTypeSelect = (type: ContentType) => {
    onClose()
    
    switch (type) {
      case 'memo':
        router.push('/dashboard/create/memo')
        break
      case 'article':
        router.push('/dashboard/create/article')
        break
      case 'book':
        router.push('/dashboard/create/book/title')
        break
    }
  }

  if (!isOpen) return null

  const contentTypes = [
    {
      id: 'memo' as const,
      title: '個人メモ',
      description: '簡単な記録やアイデアを\n素早く書き留める',
      icon: '📝',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-400',
      features: ['ファイル管理', 'プライベート保存', 'クイック編集']
    },
    {
      id: 'article' as const,
      title: '記事',
      description: '詳細な内容や学んだこと\nを体系的に記録',
      icon: '📄',
      gradient: 'from-blue-400 via-purple-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      features: ['マークダウン', 'タグ管理', '公開設定']
    },
    {
      id: 'book' as const,
      title: '本',
      description: '長期間に渡る知識や経験\nを包括的にまとめる',
      icon: '📚',
      gradient: 'from-green-400 via-teal-500 to-cyan-600',
      bgGradient: 'from-green-50 to-cyan-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      features: ['章立て構成', 'バージョン管理', 'コラボレーション']
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto my-auto transform transition-all duration-500 scale-100"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: 'calc(100vh - 3rem)' }}
        >
          {/* Header */}
          <div className="relative px-10 py-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/80 transition-all duration-200 text-gray-500 hover:text-gray-700 shadow-sm"
            >
              <Icons.X />
            </button>
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl shadow-lg mb-6">
                ✨
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                何を作成しますか？
              </h2>
              <p className="text-gray-600 text-lg">
                あなたのアイデアを形にする最初の一歩を選択してください
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleContentTypeSelect(type.id)}
                  className={`group relative p-8 rounded-3xl border border-gray-200 
                    bg-white hover:shadow-2xl hover:shadow-gray-300/20 
                    transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 text-left
                    hover:border-gray-300`}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} opacity-0 
                    group-hover:opacity-100 rounded-3xl transition-all duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                        bg-gradient-to-r ${type.gradient} text-white text-2xl shadow-lg 
                        group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        {type.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {type.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed whitespace-pre-line transition-colors mb-6 text-sm">
                      {type.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-500 group-hover:text-gray-600">
                          <div className="w-2 h-2 bg-gray-300 group-hover:bg-gray-400 rounded-full mr-3 transition-colors"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 border-2 ${type.borderColor} opacity-0 
                    group-hover:opacity-100 rounded-3xl transition-opacity duration-300`} />
                  
                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 
                    transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-20">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center text-white shadow-lg`}>
                      <Icons.ArrowRight />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-4">
                または、既存のテンプレートから始めることもできます
              </p>
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
                >
                  ダッシュボードに戻る
                </button>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <button 
                  onClick={() => router.push('/')}
                  className="text-gray-400 hover:text-gray-600 text-sm transition-colors duration-200"
                >
                  ホームに戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}