'use client'

import { useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  speed: number
}

export default function FloatingElements() {
  const mousePosition = useMousePosition()
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const initialElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      opacity: Math.random() * 0.3 + 0.1,
      color: `hsl(${200 + Math.random() * 100}, 70%, 60%)`,
      speed: Math.random() * 0.5 + 0.1
    }))

    setElements(initialElements)
  }, [])

  useEffect(() => {
    const animate = () => {
      setElements(prev => prev.map(element => {
        // Mouse attraction effect
        const dx = mousePosition.x - element.x
        const dy = mousePosition.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        let newX = element.x
        let newY = element.y

        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.3
          newX += (dx / distance) * force
          newY += (dy / distance) * force
        }

        // Gentle floating animation
        newX += Math.sin(Date.now() * 0.001 + element.id) * element.speed
        newY += Math.cos(Date.now() * 0.0015 + element.id) * element.speed

        // Keep elements in bounds
        newX = Math.max(0, Math.min(window.innerWidth, newX))
        newY = Math.max(0, Math.min(window.innerHeight, newY))

        return {
          ...element,
          x: newX,
          y: newY
        }
      }))
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute rounded-full blur-xl transition-all duration-1000 ease-out"
          style={{
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
            backgroundColor: element.color,
            opacity: element.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}