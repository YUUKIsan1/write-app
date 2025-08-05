'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl'
  className?: string
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function MagneticButton({ 
  children, 
  variant = 'gradient',
  size = 'lg',
  className = '',
  strength = 0.3,
  onClick,
  type = 'button',
  disabled = false
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0)`)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform('translate3d(0, 0, 0)')
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size === 'xl' ? 'lg' : size}
      type={type}
      disabled={disabled}
      className={`transition-all duration-300 transform-gpu ${size === 'xl' ? 'px-8 py-4 text-xl' : ''} ${className} ${
        isHovered ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{ 
        transform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      <span className="relative z-10">
        {children}
      </span>
      {isHovered && (
        <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
      )}
    </Button>
  )
}