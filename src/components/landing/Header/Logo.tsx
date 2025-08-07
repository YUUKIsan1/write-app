import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <span className="text-white font-bold text-lg">T</span>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
        TechKnot
      </span>
    </Link>
  )
}