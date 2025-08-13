'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

interface MemoData {
  title?: string
  content: string
  folder?: string
  tags: string[]
}

export default function CreateMemoPage() {
  const router = useRouter()
  const [memoData, setMemoData] = useState<MemoData>({
    content: '',
    tags: []
  })
  
  const [tagInput, setTagInput] = useState('')
  const [folderInput, setFolderInput] = useState('')
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [existingFolders, setExistingFolders] = useState(['作業メモ', 'アイデア', '学習ノート', 'プロジェクト'])

  useEffect(() => {
    // フォルダー一覧をローカルストレージから読み込み
    const savedFolders = localStorage.getItem('memoFolders')
    if (savedFolders) {
      const folders = JSON.parse(savedFolders)
      setExistingFolders(folders.map((f: any) => f.name))
    }
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const addTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !memoData.tags.includes(trimmedTag) && memoData.tags.length < 10) {
      setMemoData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setMemoData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const createNewFolder = () => {
    if (folderInput.trim() && !existingFolders.includes(folderInput.trim())) {
      setMemoData(prev => ({ ...prev, folder: folderInput.trim() }))
      setFolderInput('')
      setShowNewFolderInput(false)
    }
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

    if (!memoData.content.trim()) {
      newErrors.content = 'メモの内容を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Memo saved:', memoData)
      
      // 保存後はダッシュボードに戻る
      router.push('/dashboard')
    } catch (error) {
      console.error('Save error:', error)
      setErrors({ submit: '保存に失敗しました。もう一度お試しください。' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-orange-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-xl hover:bg-orange-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
              >
                <Icons.ArrowLeft />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📝
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">個人メモを作成</h1>
                  <p className="text-gray-500 text-sm">アイデアや備忘録を素早く記録</p>
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
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Folder Selection */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                📁 フォルダ選択 <span className="text-gray-500 font-normal text-base">（メモを整理）</span>
              </label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {existingFolders.map((folder) => (
                    <button
                      key={folder}
                      onClick={() => setMemoData(prev => ({ ...prev, folder }))}
                      className={`px-5 py-3 rounded-2xl border-2 transition-all duration-200 font-medium
                        ${memoData.folder === folder 
                          ? 'border-orange-400 bg-orange-50 text-orange-800 shadow-md' 
                          : 'border-gray-200 hover:border-orange-300 text-gray-600 hover:bg-orange-50'}`}
                    >
                      📁 {folder}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setShowNewFolderInput(true)}
                    className="px-5 py-3 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-400 
                      text-gray-500 hover:text-orange-600 transition-all duration-200 font-medium"
                  >
                    ➕ 新しいフォルダ
                  </button>
                </div>

                {showNewFolderInput && (
                  <div className="flex gap-3 items-center p-4 bg-orange-50 rounded-2xl border border-orange-200">
                    <input
                      type="text"
                      value={folderInput}
                      onChange={(e) => setFolderInput(e.target.value)}
                      placeholder="フォルダ名を入力..."
                      className="flex-1 px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      maxLength={20}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          createNewFolder()
                        } else if (e.key === 'Escape') {
                          setShowNewFolderInput(false)
                          setFolderInput('')
                        }
                      }}
                      autoFocus
                    />
                    <button
                      onClick={createNewFolder}
                      disabled={!folderInput.trim() || existingFolders.includes(folderInput.trim())}
                      className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                        disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      作成
                    </button>
                    <button
                      onClick={() => {
                        setShowNewFolderInput(false)
                        setFolderInput('')
                      }}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                )}

                {memoData.folder && (
                  <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl">
                    <span className="text-gray-600">選択中:</span>
                    <span className="ml-2 font-medium text-orange-600">📁 {memoData.folder}</span>
                    <button
                      onClick={() => setMemoData(prev => ({ ...prev, folder: undefined }))}
                      className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Icons.X />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                ✍️ メモ内容 * 
                <span className="text-gray-500 font-normal text-base ml-2">（マークダウン形式をサポート）</span>
              </label>
              <textarea
                ref={textareaRef}
                value={memoData.content}
                onChange={(e) => {
                  setMemoData(prev => ({ ...prev, content: e.target.value }))
                  adjustTextareaHeight()
                }}
                placeholder={`# メモタイトル

マークダウン形式で自由に記述できます。

## 使用可能な記法
- **太字**
- *斜体*
- [リンク](URL)
- \`コード\`
- > 引用

## アイデア
- [ ] TODO項目
- [x] 完了項目

個人的なメモや備忘録として活用してください。`}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 font-mono text-sm min-h-96 resize-none 
                  ${errors.content ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-orange-400 focus:ring-orange-100'}`}
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
                {memoData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-orange-100 text-orange-800 border border-orange-200"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-orange-900 transition-colors"
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
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  maxLength={20}
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim() || memoData.tags.length >= 10}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  追加
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

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl 
                  hover:from-orange-600 hover:to-red-700 hover:shadow-xl transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:scale-105"
              >
                {isSubmitting ? '保存中...' : '💾 メモを保存'}
              </button>
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