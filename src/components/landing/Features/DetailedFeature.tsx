'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import MagneticButton from '@/components/effects/MagneticButton'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface DetailedFeatureProps {
  title: string
  subtitle: string
  description: string
  benefits: string[]
  stats: { number: string; label: string }[]
  image: React.ReactNode
  reversed?: boolean
  gradient: string
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

export default function DetailedFeature({
  title,
  subtitle,
  description,
  benefits,
  stats,
  image,
  reversed = false,
  gradient,
  testimonial
}: DetailedFeatureProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      ref={elementRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 ${reversed ? 'lg:grid-flow-col-dense' : ''}`}
    >
      {/* Content Side */}
      <div className={`space-y-8 ${reversed ? 'lg:col-start-2' : ''}`}>
        <div 
          className={`transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
            <span className="text-blue-300">{subtitle}</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {title}
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Benefits List */}
        <div 
          className={`space-y-4 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`flex items-start space-x-4 transition-all duration-500 ${
                isIntersecting ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center flex-shrink-0 mt-1`}>
                <div className="w-3 h-3 text-white">
                  <Icons.Check />
                </div>
              </div>
              <span className="text-gray-200 text-lg leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-6 py-8 transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <MagneticButton
            variant="gradient"
            size="lg"
            className="px-8 py-4 text-lg shadow-2xl"
            strength={0.3}
          >
            <Icons.ArrowRight />
            <span className="ml-2">詳しく見る</span>
          </MagneticButton>
        </div>

        {/* Testimonial */}
        {testimonial && (
          <div 
            className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-1000 ${
              isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <p className="text-gray-200 italic mb-4 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-white font-semibold">{testimonial.author}</div>
                <div className="text-gray-400 text-sm">{testimonial.role} • {testimonial.company}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual Side */}
      <div 
        className={`relative ${reversed ? 'lg:col-start-1' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`relative transition-all duration-1000 ${
            isIntersecting ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          } ${isHovered ? 'scale-105' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Glow effect */}
          <div className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
          
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              {image}
            </div>

            {/* Floating indicators */}
            {isHovered && (
              <>
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}