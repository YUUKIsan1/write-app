'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import SlideEmbed from '@/components/ui/SlideEmbed'
import SlideEmbedModal from '@/components/ui/SlideEmbedModal'

type SaveMode = 'draft' | 'publish'
type VisibilityMode = 'public' | 'private'

interface SlideData {
  id: string
  url: string
  title: string
}

interface BookData {
  title: string
  content: string
  tags: string[]
  visibility: VisibilityMode
  slides: SlideData[]
}

export default function CreateBookPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [bookData, setBookData] = useState<BookData>({
    title: '',
    content: '',
    tags: [],
    visibility: 'public',
    slides: []
  })
  
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [showSlideModal, setShowSlideModal] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // URLパラメータからタイトルを取得
  useEffect(() => {
    const title = searchParams?.get('title')
    if (title) {
      setBookData(prev => ({ ...prev, title: decodeURIComponent(title) }))
    }
  }, [searchParams])

  const addTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !bookData.tags.includes(trimmedTag) && bookData.tags.length < 10) {
      setBookData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setBookData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addSlide = (url: string, title: string) => {
    const newSlide: SlideData = {
      id: Date.now().toString(),
      url,
      title
    }
    setBookData(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }))
  }

  const removeSlide = (slideId: string) => {
    setBookData(prev => ({
      ...prev,
      slides: prev.slides.filter(slide => slide.id !== slideId)
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

    if (!bookData.title.trim()) {
      newErrors.title = 'タイトルを入力してください'
    }

    if (!bookData.content.trim()) {
      newErrors.content = 'コンテンツを入力してください'
    }

    if (bookData.content.length < 100) {
      newErrors.content = '本は最低100文字以上で記述してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (mode: SaveMode) => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Book saved:', { ...bookData, saveMode: mode })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Save error:', error)
      setErrors({ submit: '保存に失敗しました。もう一度お試しください。' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-green-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-xl hover:bg-green-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
              >
                <Icons.ArrowLeft />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📚
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">本を作成</h1>
                  <p className="text-gray-500 text-sm">知識と経験を包括的にまとめる</p>
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                📖 本のタイトル *
              </label>
              <input
                type="text"
                value={bookData.title}
                onChange={(e) => setBookData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="読者の心を掴む魅力的なタイトルを入力..."
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 text-xl font-bold 
                  ${errors.title ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-green-400 focus:ring-green-100'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                ✍️ 本の内容 * 
                <span className="text-gray-500 font-normal text-base ml-2">（マークダウン形式・最低100文字以上）</span>
              </label>
              <textarea
                ref={textareaRef}
                value={bookData.content}
                onChange={(e) => {
                  setBookData(prev => ({ ...prev, content: e.target.value }))
                  adjustTextareaHeight()
                }}
                placeholder={`# ${bookData.title || 'あなたの本のタイトル'}

## 目次
1. [はじめに](#はじめに)
2. [第1章: 基礎知識](#第1章-基礎知識)
3. [第2章: 実践編](#第2章-実践編)
4. [第3章: 応用編](#第3章-応用編)
5. [まとめ](#まとめ)

---

## はじめに

この本では...

## 第1章: 基礎知識

### 1.1 基本概念
ここで基本概念について説明します...

### 1.2 重要なポイント
重要なポイントについて詳しく...

## 第2章: 実践編

### 2.1 実際の手順
具体的な手順を説明します...

\`\`\`javascript
// サンプルコード
function example() {
    console.log("実践的な例");
}
\`\`\`

### 2.2 よくある問題と解決方法
実際に遭遇する問題とその解決策...

## 第3章: 応用編

高度なテクニックや応用的な内容...

## まとめ

この本で学んだことを振り返り...

---

## 使用可能な記法
- **太字**
- *斜体*
- [リンク](URL)
- \`インラインコード\`
- > 引用
- ![画像](URL)

章ごとに構成して、読みやすい本を作成しましょう。`}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 font-mono text-sm min-h-[600px] resize-none 
                  ${errors.content ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-green-400 focus:ring-green-100'}`}
                onInput={adjustTextareaHeight}
              />
              {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>現在の文字数: {bookData.content.length}</span>
                <span className={bookData.content.length < 100 ? 'text-red-500' : 'text-green-600'}>
                  最低文字数: 100文字
                </span>
              </div>
            </div>

            {/* Slides */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                🎭 スライド埋め込み <span className="text-gray-500 font-normal text-base">（Canva、Google Slides等）</span>
              </label>
              
              {bookData.slides.length > 0 && (
                <div className="space-y-4 mb-4">
                  {bookData.slides.map((slide) => (
                    <SlideEmbed
                      key={slide.id}
                      url={slide.url}
                      title={slide.title}
                      onRemove={() => removeSlide(slide.id)}
                    />
                  ))}
                </div>
              )}
              
              <button
                type="button"
                onClick={() => setShowSlideModal(true)}
                className="flex items-center px-6 py-3 border-2 border-dashed border-green-300 text-green-700 rounded-2xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 font-medium w-full justify-center"
              >
                <Icons.Plus />
                <span className="ml-2">
                  {bookData.slides.length === 0 ? 'スライドを追加' : '他のスライドを追加'}
                </span>
              </button>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                🏷️ タグ <span className="text-gray-500 font-normal text-base">（最大10個まで）</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {bookData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 border border-green-200"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-green-900 transition-colors"
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
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim() || bookData.tags.length >= 10}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
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
                  onClick={() => setBookData(prev => ({ ...prev, visibility: 'public' }))}
                  className={`flex items-center px-6 py-3 rounded-2xl border-2 transition-all duration-200 font-medium
                    ${bookData.visibility === 'public' 
                      ? 'border-green-400 bg-green-50 text-green-800 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  🌍 公開
                </button>
                <button
                  onClick={() => setBookData(prev => ({ ...prev, visibility: 'private' }))}
                  className={`flex items-center px-6 py-3 rounded-2xl border-2 transition-all duration-200 font-medium
                    ${bookData.visibility === 'private' 
                      ? 'border-orange-400 bg-orange-50 text-orange-800 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                >
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  🔒 非公開
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">📈 執筆の進捗</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${bookData.title ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={bookData.title ? 'text-green-700' : 'text-gray-500'}>
                    タイトル {bookData.title ? '✓' : ''}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${bookData.content.length >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={bookData.content.length >= 100 ? 'text-green-700' : 'text-gray-500'}>
                    本文 ({bookData.content.length}/100文字)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${bookData.slides.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={bookData.slides.length > 0 ? 'text-green-700' : 'text-gray-500'}>
                    スライド ({bookData.slides.length}個)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${bookData.tags.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={bookData.tags.length > 0 ? 'text-green-700' : 'text-gray-500'}>
                    タグ ({bookData.tags.length}/10個)
                  </span>
                </div>
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
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl 
                    hover:from-green-600 hover:to-teal-700 hover:shadow-xl transition-all duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:scale-105"
                >
                  {isSubmitting ? '出版中...' : '📚 本を出版'}
                </button>
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-center">{errors.submit}</p>
            )}
          </div>
        </div>
      </div>

      {/* Slide Embed Modal */}
      <SlideEmbedModal
        isOpen={showSlideModal}
        onClose={() => setShowSlideModal(false)}
        onAdd={addSlide}
      />
    </div>
  )
}