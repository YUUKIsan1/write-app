import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
  return (
    <Card 
      className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${gradient}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-white mb-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-white/90 text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}