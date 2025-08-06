'use client'

import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (link) {
        e.preventDefault()
        const targetId = link.getAttribute('href')?.substring(1)
        
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          
          if (targetElement) {
            // 洗練されたスクロール体験の開始
            document.body.style.overflow = 'hidden' // スクロール中は他の操作を無効化
            
            // プレミアムな視覚効果
            const scrollIndicator = document.createElement('div')
            scrollIndicator.className = 'fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-1000 ease-out'
            scrollIndicator.style.transform = 'scaleX(0)'
            scrollIndicator.style.transformOrigin = 'left'
            document.body.appendChild(scrollIndicator)
            
            // 進行バーのアニメーション開始
            requestAnimationFrame(() => {
              scrollIndicator.style.transform = 'scaleX(1)'
            })
            
            const headerOffset = 32 // より精密な位置調整
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            
            // 高級感のあるイージング関数を使用
            const startPosition = window.pageYOffset
            const distance = offsetPosition - startPosition
            const duration = Math.min(1500, Math.max(800, Math.abs(distance) * 0.8)) // 動的な時間調整
            let start: number | null = null
            
            // カスタムイージング関数 (Cubic Bezier)
            const easeInOutCubic = (t: number): number => {
              return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            }
            
            const smoothScroll = (currentTime: number) => {
              if (start === null) start = currentTime
              const timeElapsed = currentTime - start
              const run = easeInOutCubic(timeElapsed / duration) * distance
              
              window.scrollTo(0, startPosition + run)
              
              if (timeElapsed < duration) {
                requestAnimationFrame(smoothScroll)
              } else {
                // スクロール完了時の洗練された処理
                window.scrollTo(0, offsetPosition)
                
                // 目標要素にスポットライト効果
                targetElement.style.position = 'relative'
                const spotlight = document.createElement('div')
                spotlight.className = 'absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl animate-pulse pointer-events-none'
                spotlight.style.zIndex = '-1'
                targetElement.appendChild(spotlight)
                
                // 3秒後にスポットライト効果を除去
                setTimeout(() => {
                  if (spotlight.parentNode) {
                    spotlight.parentNode.removeChild(spotlight)
                  }
                }, 3000)
                
                // インジケーターをフェードアウト
                scrollIndicator.style.opacity = '0'
                setTimeout(() => {
                  if (scrollIndicator.parentNode) {
                    scrollIndicator.parentNode.removeChild(scrollIndicator)
                  }
                  document.body.style.overflow = '' // スクロール制御を解除
                }, 500)
                
                // 到達した要素にマイクロアニメーション
                const elements = targetElement.querySelectorAll('.animate-fade-in-up, [class*="transition"]')
                elements.forEach((el, index) => {
                  const element = el as HTMLElement
                  element.style.transform = 'translateY(10px)'
                  element.style.opacity = '0.7'
                  
                  setTimeout(() => {
                    element.style.transform = 'translateY(0)'
                    element.style.opacity = '1'
                    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }, index * 100)
                })
              }
            }
            
            requestAnimationFrame(smoothScroll)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}