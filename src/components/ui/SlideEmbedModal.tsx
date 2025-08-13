'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'

interface SlideEmbedModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (url: string, title: string) => void
}

const SUPPORTED_SERVICES = [
  {
    name: 'Canva',
    description: 'Canvaで作成したプレゼンテーション',
    example: 'https://www.canva.com/design/XXXXX',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'Google Slides',
    description: 'Googleスライドのプレゼンテーション',
    example: 'https://docs.google.com/presentation/d/XXXXX',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    name: 'SlideShare',
    description: 'SlideShareの公開スライド',
    example: 'https://www.slideshare.net/XXXXX',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Speaker Deck',
    description: 'Speaker Deckの公開スライド',
    example: 'https://speakerdeck.com/XXXXX',
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Figma',
    description: 'Figmaのプロトタイプやデザイン',
    example: 'https://www.figma.com/file/XXXXX',
    color: 'bg-pink-100 text-pink-800'
  }
]

export default function SlideEmbedModal({ isOpen, onClose, onAdd }: SlideEmbedModalProps) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(false)

  if (!isOpen) return null

  const validateUrl = (inputUrl: string) => {
    try {
      new URL(inputUrl)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    validateUrl(newUrl)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidUrl && url.trim()) {
      onAdd(url.trim(), title.trim())
      setUrl('')
      setTitle('')
      onClose()
    }
  }

  const detectServiceFromUrl = (inputUrl: string) => {
    return SUPPORTED_SERVICES.find(service => 
      service.example.includes(new URL(inputUrl).hostname)
    )
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-51 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">スライドを埋め込み</h2>
              <p className="text-sm text-gray-600 mt-1">
                プレゼンテーションやスライドを本に追加できます
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Icons.X />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* URL Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スライドのURL *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://www.canva.com/design/xxxxx または https://docs.google.com/presentation/d/xxxxx"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                    url && isValidUrl 
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                      : url && !isValidUrl
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  required
                />
                {url && !isValidUrl && (
                  <p className="text-red-500 text-sm mt-1">有効なURLを入力してください</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル（オプション）
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="スライドのタイトルを入力（省略可）"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={!isValidUrl || !url.trim()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  スライドを追加
                </button>
              </div>
            </form>

            {/* Supported Services */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                対応サービス
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SUPPORTED_SERVICES.map((service) => (
                  <div
                    key={service.name}
                    className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.color}`}>
                        {service.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {service.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      例: {service.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Icons.Info />
                <span className="ml-2">使い方のコツ</span>
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Canvaの場合：「共有」→「その他」→「埋め込み」のリンクをコピー</li>
                <li>• Google Slidesの場合：「ファイル」→「ウェブに公開」→リンクをコピー</li>
                <li>• 公開設定されているスライドのみ埋め込み可能です</li>
                <li>• スライドの読み込みに時間がかかる場合があります</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}