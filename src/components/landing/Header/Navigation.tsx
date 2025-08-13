'use client'

import Link from 'next/link'

interface NavigationProps {
  isMobile?: boolean
  onItemClick?: () => void
}

const navigationItems = [
  { href: '#features', label: '機能' },
  { href: '#testimonials', label: '実績' },
  { href: '#pricing', label: '料金' },
  { href: '#contact', label: 'お問い合わせ' },
]

export default function Navigation({ isMobile = false, onItemClick }: NavigationProps) {
  const baseClasses = "text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
  const mobileClasses = isMobile ? "block py-3 px-4 hover:bg-blue-50 rounded-lg" : ""
  
  return (
    <nav className={isMobile ? "flex flex-col space-y-1" : "hidden md:flex items-center space-x-8"}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${baseClasses} ${mobileClasses}`}
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}