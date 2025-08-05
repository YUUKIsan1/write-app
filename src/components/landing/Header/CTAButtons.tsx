import Link from 'next/link'
import MagneticButton from '@/components/effects/MagneticButton'
import { Icons } from '@/components/ui/icons'

interface CTAButtonsProps {
  isMobile?: boolean
}

export default function CTAButtons({ isMobile = false }: CTAButtonsProps) {
  const containerClasses = isMobile 
    ? "flex flex-col space-y-3 pt-6 border-t border-gray-200"
    : "hidden md:flex items-center space-x-4"

  return (
    <div className={containerClasses}>
      <Link href="/login">
        <MagneticButton 
          variant="ghost" 
          className={`${isMobile ? "w-full justify-center" : ""} text-gray-600 hover:text-blue-600`}
          strength={0.2}
        >
          <Icons.Users />
          <span className="ml-2">ログイン</span>
        </MagneticButton>
      </Link>
      
      <Link href="/register" className={isMobile ? "w-full" : ""}>
        <button className={`${isMobile ? "w-full justify-center" : ""} bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center`}>
          <Icons.Rocket />
          <span className="ml-2">無料で始める</span>
        </button>
      </Link>
    </div>
  )
}