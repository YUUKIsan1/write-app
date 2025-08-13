'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  effect?: 'fadeUp' | 'typewriter' | 'glitch' | 'wave'
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  staggerDelay = 30,
  effect = 'fadeUp'
}: AnimatedTextProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5 })
  const [visibleChars, setVisibleChars] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (!isIntersecting) return

    const timer = setTimeout(() => {
      if (effect === 'typewriter') {
        const interval = setInterval(() => {
          setVisibleChars(prev => {
            if (prev >= text.length) {
              clearInterval(interval)
              return prev
            }
            return prev + 1
          })
        }, 100)
        return () => clearInterval(interval)
      } else {
        setVisibleChars(text.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [isIntersecting, text.length, delay, effect])

  useEffect(() => {
    if (effect === 'glitch' && isIntersecting) {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }, 3000)
      return () => clearInterval(glitchInterval)
    }
  }, [effect, isIntersecting])

  const renderText = () => {
    if (effect === 'typewriter') {
      return (
        <>
          {text.slice(0, visibleChars)}
          <span className="animate-pulse">|</span>
        </>
      )
    }

    return text.split('').map((char, index) => {
      const isVisible = isIntersecting && index < visibleChars
      
      let charClass = 'inline-block transition-all duration-400 '
      
      switch (effect) {
        case 'fadeUp':
          charClass += isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
          break
        case 'wave':
          charClass += isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0'
          charClass += ' transform-gpu'
          break
        case 'glitch':
          charClass += isVisible ? 'opacity-100' : 'opacity-0'
          if (isGlitching) {
            charClass += ' animate-pulse text-red-500'
          }
          break
      }

      const style = effect === 'wave' ? {
        animationDelay: `${index * 100}ms`,
        animation: isVisible ? 'wave 2s ease-in-out infinite' : undefined
      } : {
        transitionDelay: `${index * staggerDelay}ms`
      }

      return (
        <span
          key={index}
          className={charClass}
          style={style}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  return (
    <span ref={elementRef} className={className}>
      {renderText()}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </span>
  )
}