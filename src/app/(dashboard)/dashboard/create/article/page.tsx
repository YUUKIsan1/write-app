'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

type SaveMode = 'draft' | 'publish'
type VisibilityMode = 'public' | 'private'

interface ArticleData {
  title: string
  content: string
  tags: string[]
  visibility: VisibilityMode
}

export default function CreateArticlePage() {
  const router = useRouter()
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    content: '',
    tags: [],
    visibility: 'public'
  })
  
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const addTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !articleData.tags.includes(trimmedTag) && articleData.tags.length < 10) {
      setArticleData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setArticleData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addTag()
    }
  }

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    if (!articleData.title.trim()) {
      newErrors.title = 'タイトルを入力してください'
    }

    if (!articleData.content.trim()) {
      newErrors.content = 'コンテンツを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (mode: SaveMode) => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Article saved:', { ...articleData, saveMode: mode })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Save error:', error)
      setErrors({ submit: '保存に失敗しました。もう一度お試しください。' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-xl hover:bg-blue-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
              >
                <Icons.ArrowLeft />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📄
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">記事を作成</h1>
                  <p className="text-gray-500 text-sm">知識や学びを体系的に記録・共有</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <Icons.Home />
                <span className="ml-2">Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                📝 記事タイトル *
              </label>
              <input
                type="text"
                value={articleData.title}
                onChange={(e) => setArticleData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="魅力的なタイトルを入力してください..."
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 text-lg font-medium 
                  ${errors.title ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                ✍️ 記事内容 * 
                <span className="text-gray-500 font-normal text-base ml-2">（マークダウン形式をサポート）</span>
              </label>
              <textarea
                ref={textareaRef}
                value={articleData.content}
                onChange={(e) => {
                  setArticleData(prev => ({ ...prev, content: e.target.value }))
                  adjustTextareaHeight()
                }}
                placeholder={`# 記事タイトル

## はじめに
この記事では...

## 主要なポイント

### 1. ポイント１
詳細な説明...

### 2. ポイント２
詳細な説明...

## まとめ
この記事のポイントをまとめると...

---

## 使用可能な記法
- **太字**
- *斜体*
- [リンク](URL)
- \`インラインコード\`
- > 引用

\`\`\`javascript
// コードブロック
console.log("Hello, World!");
\`\`\`

読者にとって価値のある情報を提供しましょう。`}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 font-mono text-sm min-h-96 resize-none 
                  ${errors.content ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`}
                onInput={adjustTextareaHeight}
              />
              {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                🏷️ タグ <span className="text-gray-500 font-normal text-base">（最大10個まで）</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {articleData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-blue-900 transition-colors"
                    >
                      <Icons.X />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="タグを入力してEnterキー..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim() || articleData.tags.length >= 10}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  追加
                </button>
              </div>
            </div>

            {/* Visibility Settings */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                🌐 公開設定
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setArticleData(prev => ({ ...prev, visibility: 'public' }))}
                  className={`flex items-center px-6 py-3 rounded-2xl border-2 transition-all duration-200 font-medium
                    ${articleData.visibility === 'public' 
                      ? 'border-green-400 bg-green-50 text-green-800 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  🌍 公開
                </button>
                <button
                  onClick={() => setArticleData(prev => ({ ...prev, visibility: 'private' }))}
                  className={`flex items-center px-6 py-3 rounded-2xl border-2 transition-all duration-200 font-medium
                    ${articleData.visibility === 'private' 
                      ? 'border-orange-400 bg-orange-50 text-orange-800 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                >
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  🔒 非公開
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => router.back()}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                <Icons.ArrowLeft />
                <span className="ml-2">戻る</span>
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSubmit('draft')}
                  disabled={isSubmitting}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl 
                    hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  📄 下書き保存
                </button>
                
                <button
                  onClick={() => handleSubmit('publish')}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl 
                    hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:scale-105"
                >
                  {isSubmitting ? '投稿中...' : '🚀 記事を投稿'}
                </button>
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-center">{errors.submit}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}