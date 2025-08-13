'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

export default function BookTitlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleSubmit = () => {
    if (!title.trim()) {
      setErrors({ title: 'タイトルを入力してください' })
      return
    }

    setErrors({})
    // タイトルをURLパラメータとして本作成ページに渡す
    router.push(`/dashboard/create/book?title=${encodeURIComponent(title.trim())}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-100 to-teal-100 px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
              bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 text-white text-4xl shadow-2xl mb-6">
              📚
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">本のタイトルを決めましょう</h1>
            <p className="text-gray-600">
              読者の心を掴む魅力的なタイトルをつけてください。後から変更することも可能です。
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4">
                📖 本のタイトル *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="例: React完全ガイド - 基礎から実践まで"
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 
                  transition-all duration-300 text-lg font-medium placeholder-gray-400 
                  ${errors.title ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 
                  'border-gray-200 focus:border-green-400 focus:ring-green-100'}`}
                autoFocus
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            {/* Tips */}
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">💡 良いタイトルのコツ</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>具体的で分かりやすい言葉を使う</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>読者のメリットや解決できる問題を示す</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>適切な長さ（15-50文字程度）を保つ</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>サブタイトルで詳細を補足する</span>
                </li>
              </ul>
            </div>

            {/* Sample Titles */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">📝 タイトル例</h3>
              <div className="space-y-2">
                {[
                  'JavaScript入門 - ゼロから始めるプログラミング',
                  'デザイン思考の実践ガイド',
                  'リモートワークで成功する7つの習慣',
                  'データ分析の基礎から応用まで'
                ].map((sampleTitle, index) => (
                  <button
                    key={index}
                    onClick={() => setTitle(sampleTitle)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-600 
                      hover:bg-green-50 rounded-lg transition-colors duration-200 border border-transparent hover:border-green-200"
                  >
                    &ldquo;{sampleTitle}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => router.back()}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 
                  font-medium transition-colors duration-200"
              >
                <Icons.ArrowLeft />
                <span className="ml-2">戻る</span>
              </button>

              <button
                onClick={handleSubmit}
                className="px-8 py-4 rounded-2xl font-semibold text-white shadow-lg 
                  transition-all duration-300 hover:shadow-xl hover:scale-105 
                  bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              >
                📚 本の作成を開始
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}