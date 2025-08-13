'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'

interface SlideEmbedProps {
  url: string
  title?: string
  onRemove?: () => void
  className?: string
}

interface SlideService {
  name: string
  pattern: RegExp
  embedTemplate: (url: string) => string
  iconColor: string
}

const SLIDE_SERVICES: SlideService[] = [
  {
    name: 'Canva',
    pattern: /canva\.com/i,
    embedTemplate: (url: string) => {
      // Canvaの埋め込みURL形式に変換
      const canvaId = url.match(/design\/([^/]+)/)?.[1]
      if (canvaId) {
        return `https://www.canva.com/design/${canvaId}/view?embed`
      }
      return url
    },
    iconColor: 'text-purple-600'
  },
  {
    name: 'Google Slides',
    pattern: /docs\.google\.com\/presentation/i,
    embedTemplate: (url: string) => {
      // Google Slidesの埋め込みURL形式に変換
      if (url.includes('/edit')) {
        return url.replace('/edit', '/embed?start=false&loop=false&delayms=3000')
      }
      return url
    },
    iconColor: 'text-yellow-600'
  },
  {
    name: 'SlideShare',
    pattern: /slideshare\.net/i,
    embedTemplate: (url: string) => url,
    iconColor: 'text-blue-600'
  },
  {
    name: 'Speaker Deck',
    pattern: /speakerdeck\.com/i,
    embedTemplate: (url: string) => url,
    iconColor: 'text-green-600'
  },
  {
    name: 'Figma',
    pattern: /figma\.com/i,
    embedTemplate: (url: string) => {
      // Figmaの埋め込みURL形式に変換
      if (url.includes('/file/')) {
        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
      }
      return url
    },
    iconColor: 'text-pink-600'
  }
]

export default function SlideEmbed({ url, title, onRemove, className = '' }: SlideEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [service, setService] = useState<SlideService | null>(null)
  const [embedUrl, setEmbedUrl] = useState('')

  useEffect(() => {
    // URLからサービスを特定
    const detectedService = SLIDE_SERVICES.find(s => s.pattern.test(url))
    setService(detectedService || null)
    
    if (detectedService) {
      setEmbedUrl(detectedService.embedTemplate(url))
    } else {
      setEmbedUrl(url)
    }
  }, [url])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white shadow-sm ${service?.iconColor || 'text-gray-600'}`}>
            <Icons.Presentation />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {title || `${service?.name || '外部'} スライド`}
            </h3>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">
              {url}
            </p>
          </div>
        </div>
        
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
            title="スライドを削除"
          >
            <Icons.X />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">スライドを読み込み中...</p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="p-8 text-center bg-gray-50">
            <div className="text-red-500 mb-3">
              <Icons.AlertCircle />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              スライドの読み込みに失敗しました
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Icons.ExternalLink />
              <span className="ml-2">外部で開く</span>
            </a>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className="w-full"
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <span>
          {service?.name || '外部サービス'} による提供
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-gray-700 transition-colors"
        >
          <Icons.ExternalLink />
          <span className="ml-1">外部で開く</span>
        </a>
      </div>
    </div>
  )
}