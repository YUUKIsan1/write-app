import Link from 'next/link'
import MagneticButton from '@/components/effects/MagneticButton'
import { Icons } from '@/components/ui/icons'

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
      <Link href="/register" className="inline-block">
        <button className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl px-10 py-5 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center">
          <Icons.Rocket />
          <span className="ml-2">今すぐ無料で始める</span>
        </button>
      </Link>
      
      <MagneticButton 
        variant="outline" 
        size="lg"
        className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg backdrop-blur-sm"
        strength={0.3}
      >
        <Icons.Play />
        <span className="ml-2">デモを見る</span>
      </MagneticButton>
    </div>
  )
}